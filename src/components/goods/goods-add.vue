<template>
  <el-card class="box-card">
    <zh-bread :level1="'商品管理'" :level2="'商品列表'"></zh-bread>
    <el-alert class="alert" title="添加商品信息" type="success" center show-icon>
    </el-alert>
    <el-steps class="steps" :active="1*active" finish-status="success">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>

    <el-form :label-position="'top'" label-width="80px" :model="form">
      <el-tabs @tab-click="tabClick($event)" v-model="active" :tab-position="'left'">
        <el-tab-pane name="1" label="基本信息">
          <el-form-item label="名称">
            <el-input v-model="form.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="价格">
            <el-input v-model="form.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="数量">
            <el-input v-model="form.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="重量">
            <el-input v-model="form.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-cascader v-model="form.goods_cat" :options="options" :props="defaultPro" clearable @change="handleChange">
            </el-cascader>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="2" label="商品参数">
          <el-form-item :label="item.attr_name" v-for="(item,index) in goodsAttributes" :key="index">
            <el-checkbox-group v-model="checkList">
              <el-checkbox border :label="item1" v-for="(item1,index) in item.attr_vals" :key="index"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="3" label="商品属性">
          <el-form-item :label="item.attr_name" v-for="(item,index) in staticAttributes" :key="index">
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="4" label="商品图片">
          <el-upload class="upload-demo" :headers="headers" action="http://127.0.0.1:8888/api/private/v1/upload" :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleSuccess" :file-list="fileList" list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane name="5" label="商品图片">
          <el-button type="primary" @click="addGoods()">添加商品</el-button>
          <quill-editor :content="form.goods_introduce"></quill-editor>
        </el-tab-pane>
      </el-tabs>
    </el-form>

  </el-card>
</template>

<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';
export default {
  name: 'goods-add',
  components: { quillEditor },
  props: {},
  data() {
    return {
      active: '1',
      form: {
        goods_name: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_cat: [1, 3, 6],
        goods_introduce: '测试富文本',
        pics: [],
        attrs: []
      },
      options: [],
      defaultPro: {
        expandTrigger: 'hover',
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      // 动态商品参数
      goodsAttributes: [],
      checkList: [],
      // 静态商品参数
      staticAttributes: [],
      fileList: [],
      headers: {
        Authorization: sessionStorage.getItem("token")
      }
    };
  },
  created() {
    this.getGoodsCategory();
  },
  methods: {
    async addGoods() {
      this.form.goods_cat = this.form.goods_cat.join(',');
      const arr1 = this.goodsAttributes.map(item => {
        return { attr_id: item.attr_id, attr_value: item.attr_vals };
      });
      const arr2 = this.staticAttributes.map(item => {
        return { attr_id: item.attr_id, attr_value: item.attr_vals };
      });
      this.form.attrs = [...arr1, ...arr2];
      const res = await this.$axios.post(`goods`, this.form);
      console.log('保存商品结果', res);
      if (res.data.meta.status === 201) {
        this.$message.success(res.data.meta.msg);
        this.$router.push({ path: 'goods' });
      } else {
        this.$message.error(res.data.meta.msg);
      }
    },
    handleChange() { },
    handlePreview(file) { },
    handleRemove(file) {
      const index = this.form.pics.findIndex((item) => {
        return item.pic === file.response.data.tmp_path
      });
      this.form.pics.splice(index, 1);
    },
    handleSuccess(file) {
      this.form.pics.push({
        pic: file.data.tmp_path
      })
    },
    async getGoodsCategory() {
      const res = await this.$axios.get(`categories?type=3`);
      this.options = res.data.data;
    },
    async tabClick() {
      if (this.active === '2') {
        if (this.form.goods_cat.length === 0) {
          this.$message.error('请先选择商品分类');
          this.active = '1';
          return;
        }
        // 获取商品参数
        const res = await this.$axios.get(`categories/${this.form.goods_cat[2]}/attributes?sel=many`);
        this.goodsAttributes = res.data.data;
        this.checkList = [];
        this.goodsAttributes.forEach(item => {
          if (item.attr_vals.length > 0) {
            item.attr_vals = item.attr_vals.trim().split(',');
            this.checkList = [...this.checkList, ...item.attr_vals];
          } else {
            item.attr_vals = [];
          }
        });
        console.log('商品分类', this.goodsAttributes);
      } else if (this.active === '3') {
        if (this.form.goods_cat.length === 0) {
          this.$message.error('请先选择商品分类');
          this.active = '1';
          return;
        }
        const res = await this.$axios.get(`categories/${this.form.goods_cat[2]}/attributes?sel=only`);
        this.staticAttributes = res.data.data;
      } else if (this.active === '4') {
        if (this.form.goods_cat.length === 0) {
          this.$message.error('请先选择商品分类');
          this.active = '1';
          return;
        }
      }
    }
  }
};
</script>
<style lang="scss" scoped>
::v-deep .ql-editor {
  min-height: 300px;
}
.box-card {
  //   height: 100%;
  .alert {
    margin-top: 16px;
  }
  .steps {
    margin: 16px;
  }
}
</style>