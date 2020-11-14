<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item>{{home}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{level1}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{level2}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  // 面包屑组件
  name: 'zh-bread',
  components: {},
  props: {
    home: {
      type: String,
      default: function () {
        return '首页'
      }
    },
    level1: String,
    level2: String
  },
  data() {
    return {
    };
  }
};
</script>
<style lang="scss" scoped>
</style>