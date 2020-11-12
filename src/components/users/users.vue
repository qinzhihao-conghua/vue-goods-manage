<template>
  <el-card class="box-card">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-input
      placeholder="请输入内容"
      v-model="query"
      class="input-with-select"
    >
      <el-button slot="append" icon="el-icon-search"></el-button>
    </el-input>
    <el-button type="success" class="add-user">添加用户</el-button>
    <el-table :data="userlist" class="table-container">
      <el-table-column type="index" label="#" width="60"> </el-table-column>
      <el-table-column prop="role_name" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"> </el-table-column>
      <el-table-column prop="mobile" label="电话" width="180">
      </el-table-column>
      <el-table-column label="创建日期" width="180">
        <!-- template内部要使用数据，需要设置slot-scope属性，属性值是该字段所在数据源userlist，它是自动找到上级数据 -->
        <!-- scope.row是数组中的每个对象 这个应该是针对element组件的 -->
        <template slot-scope="scope">
          {{ scope.row.create_time | frmDate }}
        </template>
      </el-table-column>
      <el-table-column label="用户状态" width="180">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeState($event)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <!-- slot-scope="scope" -->
        <template>
          <el-button
            type="primary"
            size="mini"
            plain
            icon="el-icon-edit"
            circle
          ></el-button>
          <el-button
            type="danger"
            size="mini"
            plain
            icon="el-icon-delete"
            circle
          ></el-button>
          <el-button
            type="success"
            size="mini"
            plain
            icon="el-icon-check"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  name: "users",
  components: {},
  props: {},
  data() {
    return {
      query: "",
      userlist: [],
      pagenum: 1,
      pagesize: 2,
      total: -1,
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const token = sessionStorage.getItem("token");
      this.$axios.defaults.headers.common["Authorization"] = token;
      const res = await this.$axios.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      );
      console.log("用户列表", res);
      const {
        meta: { status, msg },
        data: { users, total },
      } = res.data;
      if (status === 200) {
        this.userlist = users;
        this.total = total;
      }
    },
    changeState(status) {
      console.log(status);
    },
    handleSizeChange(value) {
      this.pagenum = 1;
      this.pagesize = value;
      this.getUserList();
    },
    handleCurrentChange(value) {
      this.pagenum = value;
      this.getUserList();
    },
  },
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