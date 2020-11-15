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
      <el-tabs v-model="active" :tab-position="'left'">
        <el-tab-pane name="1" label="基本信息">
          <el-form-item label="名称      ">
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
          <!-- <el-form-item label="商品分类">
            <el-input v-model="form.goods_cat"></el-input>
          </el-form-item>
          <el-form-item label="商品介绍">
            <el-input v-model="form.goods_introduce"></el-input>
          </el-form-item>
          <el-form-item label="商品图片">
            <el-input v-model="form.pics"></el-input>
          </el-form-item> -->
          <el-form-item label="描述">
            <el-input v-model="form.attrs"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="2" label="商品参数">商品参数</el-tab-pane>
        <el-tab-pane name="3" label="商品属性">商品属性</el-tab-pane>
        <el-tab-pane name="4" label="商品图片">商品图片</el-tab-pane>
        <el-tab-pane name="5" label="商品图片">商品内容</el-tab-pane>
      </el-tabs>
    </el-form>
    <!-- <el-form-item label="名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="活动区域">
      <el-input v-model="form.region"></el-input>
    </el-form-item>
    <el-form-item label="活动形式">
      <el-input v-model="form.type"></el-input>
    </el-form-item> -->

  </el-card>
</template>

<script>
export default {
  name: 'goods-add',
  components: {},
  props: {},
  data() {
    return {
      active: '1',
      form: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: '',
        attrs: '',
      }
    };
  }
};
</script>
<style lang="scss" scoped>
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