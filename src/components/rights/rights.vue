<template>
  <el-card class="box-card">
    <zh-bread :level1="'权限管理'" :level2="'权限列表'"></zh-bread>
    <el-table :data="rightsList" border height="100%" class="table-container">
      <el-table-column type="index" label="#" width="60"> </el-table-column>
      <el-table-column prop="authName" label="权限名称"> </el-table-column>
      <el-table-column prop="path" label="路径"> </el-table-column>
      <el-table-column label="层级">
        <template slot-scope="scope">
          <span v-if="scope.row.level==='0'">一级</span>
          <span v-else-if="scope.row.level==='1'">二级</span>
          <span v-else="">三级</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>

export default {
  name: 'rights',
  components: {},
  props: {},
  data() {
    return {
      rightsList: []
    };
  },
  created() {
    this.getRightList();
  },
  methods: {
    async getRightList() {
      const res = await this.$axios.get(`rights/list`);
      if (res.data.meta.status === 200) {
        this.rightsList = res.data.data;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.box-card {
  height: 100%;
  ::v-deep .el-card__body {
    height: calc(100% - 45px);
  }
  .table-container {
    margin-top: 16px;
    height: 100%;
  }
}
</style>