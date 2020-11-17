<template>
  <el-card class="box-card">
    <zh-bread :level1="'商品管理'" :level2="'商品分类'"></zh-bread>
    <el-button type="success" @click="clickAddCate()" class="add-user">添加分类</el-button>
    <el-table :data="cateList" class="table-container" row-key="cat_id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column prop="cat_name" label="分类名称">
      </el-table-column>
      <el-table-column prop="cat_level" label="级别">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level===0">一级</span>
          <span v-else-if="scope.row.cat_level===1">二级</span>
          <span v-else-if="scope.row.cat_level===2">三级</span>
        </template>
      </el-table-column>
      <el-table-column prop="cat_deleted" label="是否有效">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_deleted===false">有效</span>
          <span v-else-if="scope.row.cat_deleted===true">无效</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="openEditWindow(scope.row)" size="mini" plain icon="el-icon-edit" circle>
          </el-button>
          <el-button type="danger" @click="deleteGoods(scope.row)" size="mini" plain icon="el-icon-delete" circle>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[2, 4, 6, 8]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

    <el-dialog title="添加分类" :visible.sync="addCateWindow">
      <el-form :model="form">
        <el-form-item label="分类名称" :label-width="'100px'">
          <el-input v-model="form.cat_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类名称" :label-width="'100px'">
          <el-cascader v-model="selectedOptions" :options="options" :props="defaultPro" filterable style="width: 100%" clearable>
          </el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCateWindow = false">取 消</el-button>
        <el-button type="primary" @click="addCateHandle()">确 定</el-button>
      </div>
    </el-dialog>

  </el-card>
</template>

<script>
export default {
  name: 'categories',
  components: {},
  props: {},
  data() {
    return {
      cateList: [],
      pagenum: 1,
      pagesize: 15,
      total: -1,
      addCateWindow: false,
      form: {
        cat_pid: -1,
        cat_name: '',
        cat_level: -1
      },
      selectedOptions: [],
      options: [],
      defaultPro: {
        expandTrigger: 'hover',
        label: 'cat_name',
        value: 'cat_id',
        children: 'children',
        checkStrictly: true
      },
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    async getCateList() {
      const res = await this.$axios.get(`categories?type=3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);
      console.log(res);
      if (res.data.meta.status === 200) {
        this.cateList = res.data.data.result;
        this.total = res.data.data.total;
      }
    },
    handleSizeChange(value) {
      this.pagenum = 1;
      this.pagesize = value;
      this.getCateList();
    },
    handleCurrentChange(value) {
      this.pagenum = value;
      this.getCateList();
    },
    async clickAddCate() {
      this.addCateWindow = true;
      // 只拿两级的，第三级不能添加分类
      const res = await this.$axios.get(`categories?type=2`);
      this.options = res.data.data;
    },
    async addCateHandle() {
      if (this.selectedOptions.length === 0) {
        this.form.cat_pid = 0;
        this.form.cat_level = 0;
      } else if (this.selectedOptions.length === 1) {
        this.form.cat_pid = this.selectedOptions[0];
        this.form.cat_level = 1;
      } else if (this.selectedOptions.length === 2) {
        this.form.cat_pid = this.selectedOptions[1];
        this.form.cat_level = 2;
      }

      const res = await this.$axios.post(`categories`, this.form);
      console.log(res);
      if (res.data.meta.status === 201) {
        this.$message.success(res.data.meta.msg);
        this.addCateWindow = false;
        this.getCateList();
        this.form = {};
      } else {
        this.$message.error(res.data.meta.msg);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.add-user {
  margin-top: 16px;
}
</style>