<template>
  <el-card class="box-card">
    <zh-bread :level1="'商品管理'" :level2="'分类参数'"></zh-bread>
    <el-alert class="alert" title="只允许为第三级设置分类参数" type="error" center>
    </el-alert>
    <el-form :label-position="'left'" label-width="80px">
      <el-form-item label="商品分类">
        <el-cascader v-model="selectedOptions" :options="options" :show-all-levels="false" :props="defaultPro" clearable @change="handleChange">
        </el-cascader>
      </el-form-item>
    </el-form>
    <el-tabs @tab-click="tabClick($event)" v-model="active" :tab-position="'top'">
      <el-tab-pane name="1" label="动态参数">
        <el-button type="success" @click="$router.push({name:'goods-add'})" class="add-user">设置动态参数</el-button>
        <el-table :data="goodsAttributes" class="table-container">
          <el-table-column type="expand" label="#">
            <template slot-scope="scope">
              <el-tag :key="tag" v-for="tag in scope.row.attr_vals" closable :disable-transitions="false" @close="handleClose(scope.row,tag)">
                {{tag}}
              </el-tag>
              <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm(scope.row)" @blur="handleInputConfirm(scope.row)">
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="attr_name" label="属性名称">
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
      </el-tab-pane>
      <el-tab-pane name="2" label="静态参数">
        <el-button type="success" @click="$router.push({name:'goods-add'})" class="add-user">设置静态参数</el-button>
        <el-table :data="staticAttributes" class="table-container">
          <el-table-column type="index" label="#"> </el-table-column>
          <el-table-column prop="attr_name" label="属性名称">
          </el-table-column>
          <el-table-column prop="attr_vals" label="属性值">
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
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  name: 'params',
  components: {},
  props: {},
  data() {
    return {
      options: [],
      selectedOptions: [],
      defaultPro: {
        expandTrigger: 'hover',
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      // 动态商品参数
      goodsAttributes: [],
      // 静态商品参数
      staticAttributes: [],
      // 参数标记
      paramsFlag: 'many',
      active: '1',
      inputValue: '',
      inputVisible: false
    };
  },
  created() {
    this.getGoodsCategory();
  },
  methods: {
    // 获取商品参数
    async handleChange() {
      const len = this.selectedOptions.length;
      if (this.paramsFlag === 'many' && len > 0) {
        // 获取商品参数
        const res = await this.$axios.get(`categories/${this.selectedOptions[2]}/attributes?sel=many`);
        this.goodsAttributes = res.data.data;
        this.goodsAttributes.forEach(item => {
          if (item.attr_vals.length > 0) {
            item.attr_vals = item.attr_vals.trim().split(',');
          } else {
            item.attr_vals = [];
          }
        });
      } else if (this.paramsFlag === 'only' && len > 0) {
        const res = await this.$axios.get(`categories/${this.selectedOptions[2]}/attributes?sel=only`);
        this.staticAttributes = res.data.data;
      }
    },
    async getGoodsCategory() {
      const res = await this.$axios.get(`categories?type=3`);
      this.options = res.data.data;
    },
    tabClick() {
      if (this.active === '2') {
        this.paramsFlag = 'only';
      } else {
        this.paramsFlag = 'many';
      }
      if (this.paramsFlag && this.selectedOptions.length > 0) {
        this.handleChange();
      }
    },
    // 与handleClose方法重复太多，待优化
    async handleInputConfirm(dataItem) {
      let inputValue = this.inputValue;
      if (inputValue) {
        dataItem.attr_vals.push(inputValue);
        const putData = {
          attr_name: dataItem.attr_name,
          attr_sel: 'many',
          attr_vals: dataItem.attr_vals.join(',')
        }
        const res = await this.$axios.put(`categories/${this.selectedOptions[2]}/attributes/${dataItem.attr_id}`, putData);
        if (res.data.meta.status === 200) {
          this.$message.success(res.data.meta.msg);
        } else {
          this.$message.error(res.data.meta.msg);
        }
        console.log('添加结果', res);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    async handleClose(dataItem, tag) {
      dataItem.attr_vals.splice(dataItem.attr_vals.indexOf(tag), 1);
      const putData = {
        attr_name: dataItem.attr_name,
        attr_sel: 'many',
        attr_vals: dataItem.attr_vals.join(',')
      }
      const res = await this.$axios.put(`categories/${this.selectedOptions[2]}/attributes/${dataItem.attr_id}`, putData);
      console.log('删除结果', res);
      if (res.data.meta.status === 200) {
        this.$message.success(res.data.meta.msg);
      } else {
        this.$message.error(res.data.meta.msg);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.box-card {
  min-height: 100%;
  .alert {
    margin: 16px 0;
  }
}
</style>