<template>
  <el-card class="box-card">
    <zh-bread :level1="'商品管理'" :level2="'商品列表'"></zh-bread>
    <el-input placeholder="请输入内容" clearable v-model="query" @clear="clearQuery()" class="input-with-select">
      <el-button slot="append" @click="searchGoods()" icon="el-icon-search"></el-button>
    </el-input>
    <el-button type="success" @click="$router.push({path:'/goods/goods-add'})" class="add-user">添加商品</el-button>
    <el-table :data="goodsList" class="table-container">
      <el-table-column type="index" label="#" width="60"> </el-table-column>
      <el-table-column prop="username" label="商品名称"> </el-table-column>
      <el-table-column prop="role_name" label="商品价格(元)"> </el-table-column>
      <el-table-column prop="email" label="商品重量"> </el-table-column>
      <el-table-column prop="mobile" label="电话"> </el-table-column>
      <el-table-column label="创建日期">
        <template slot-scope="scope">
          {{ scope.row.create_time | frmDate }}
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
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
    <!-- <el-dialog title="添加用户" :visible.sync="addUserWindow">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="'100px'">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="'100px'">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="'100px'">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="'100px'">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserWindow = false">取 消</el-button>
        <el-button type="primary" @click="addUserHandle()">确 定</el-button>
      </div>
    </el-dialog> -->
  </el-card>
</template>

<script>
export default {
  name: 'goods-list',
  components: {},
  props: {},
  data() {
    return {
      query: '',
      goodsList: [],
      pagenum: 1,
      pagesize: 3,
      total: -1,
    };
  },
  methods: {
    clearQuery() { },
    searchGoods() { },
    // addGoods() { },
    deleteGoods(goodsItem) { },
    openEditWindow(goodsItem) { },
    handleSizeChange(value) {
      this.pagenum = 1;
      this.pagesize = value;
      this.getUserList();
    },
    handleCurrentChange(value) {
      this.pagenum = value;
      this.getUserList();
    }
  }

};
</script>
<style lang="scss" scoped>
.box-card {
  height: 100%;
  .el-input-group {
    margin-top: 16px;
    width: 300px;
  }
  .add-user {
    height: 40px;
    vertical-align: bottom;
    margin-left: 12px;
  }
  .table-container {
    margin-top: 16px;
    width: 100%;
  }
}
</style>