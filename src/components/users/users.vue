<template>
  <el-card class="box-card">
    <zh-bread :level1="'用户管理'" :level2="'用户列表'"></zh-bread>
    <el-input placeholder="请输入内容" clearable v-model="query" @clear="clearQuery()" class="input-with-select">
      <el-button slot="append" @click="searchUser()" icon="el-icon-search"></el-button>
    </el-input>
    <el-button type="success" @click="addUser()" class="add-user">添加用户</el-button>
    <el-table :data="userlist" class="table-container">
      <el-table-column type="index" label="#" width="60"> </el-table-column>
      <el-table-column prop="username" label="姓名"> </el-table-column>
      <el-table-column prop="role_name" label="角色"> </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="mobile" label="电话"> </el-table-column>
      <el-table-column label="创建日期">
        <!-- template内部要使用数据，需要设置slot-scope属性，属性值是该字段所在数据源userlist，它是自动找到上级数据 -->
        <!-- scope.row是数组中的每个对象 这个应该是针对element组件的 -->
        <template slot-scope="scope">
          {{ scope.row.create_time | frmDate }}
        </template>
      </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949" @change="changeState(scope.row, $event)">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="openEditWindow(scope.row)" size="mini" plain icon="el-icon-edit" circle>
          </el-button>
          <el-button type="danger" @click="deleteUser(scope.row)" size="mini" plain icon="el-icon-delete" circle>
          </el-button>
          <el-button type="success" @click="openArrageUserWindow(scope.row)" size="mini" plain icon="el-icon-check" circle>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[2, 4, 6, 8]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
    <el-dialog title="添加用户" :visible.sync="addUserWindow">
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
    </el-dialog>
    <el-dialog title="编辑用户" :visible.sync="editUserWindow">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="'100px'">
          <el-input v-model="form.username" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="'100px'">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="'100px'">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editUserWindow = false">取 消</el-button>
        <el-button type="primary" @click="editUserHandle()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="权限分配" :visible.sync="arrageUserWindow">
      <el-form :model="currentUser">
        <el-form-item label="用户名" :label-width="'100px'">
          {{ currentUser.username }}
        </el-form-item>
        <el-form-item label="角色" :label-width="'100px'">
          <el-select v-model="currentUser.rid" placeholder="请选择">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option v-for="item in usersRole" :key="item.id" :label="item.roleName" :value="item.id" :disabled="item.disabled">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="arrageUserWindow = false">取 消</el-button>
        <el-button type="primary" @click="arrageUserHandle()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  name: "users",
  components: {},
  props: {},
  data() {
    return {
      query: '',
      userlist: [],
      pagenum: 1,
      pagesize: 3,
      total: -1,
      addUserWindow: false,
      editUserWindow: false,
      arrageUserWindow: false,
      form: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      usersRole: [],
      currentUser: {},
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {

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
    searchUser() {
      this.getUserList();
    },
    clearQuery() {
      this.query = "";
      this.getUserList();
    },
    addUser() {
      this.addUserWindow = true;
    },
    async addUserHandle() {
      const res = await this.$axios.post(`users`, this.form);
      const {
        meta: { msg, status },
        data,
      } = res.data;
      // console.log("-----", res);
      if (status === 201) {
        this.$message.success(msg);
        this.addUserWindow = false;
        this.query = "";
        this.form = {};
        this.getUserList();
      } else {
        this.$message.error(msg);
      }
    },
    deleteUser(userItem) {
      console.log("删除的用户", userItem);
      this.$confirm("确定要删除用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$axios.delete(`users/${userItem.id}`);
          const {
            meta: { status, msg },
          } = res.data;
          if (status === 200) {
            this.$message({ type: "success", message: msg });
            this.pagenum = 1;
            this.getUserList();
          }
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消删除" });
        });
    },
    openEditWindow(userItem) {
      this.editUserWindow = true;
      this.form = userItem;
    },
    async editUserHandle() {
      const res = await this.$axios.put(`users/${this.form.id}`, this.form);
      const {
        meta: { status, msg },
      } = res.data;
      if (status === 200) {
        this.editUserWindow = false;
        this.$message.success(msg);
        this.query = "";
        this.form = {};
        this.getUserList();
      } else {
        this.$message.error(msg);
      }
    },
    async changeState(useritem, state) {
      // console.log(useritem,status);
      const res = await this.$axios.put(`users/${useritem.id}/state/${state}`);
      const {
        meta: { msg, status },
      } = res.data;
      if (status === 200) {
        this.$message.success(msg);
      } else {
        this.$message.error(msg);
      }
    },
    async openArrageUserWindow(userItem) {
      this.arrageUserWindow = true;
      const userRoles = await this.$axios.get(`roles`);
      const userInfo = await this.$axios.get(`users/${userItem.id}`);
      console.log("1111", userInfo);
      const { meta: { msg, status }, data } = userInfo.data;
      if (status === 200) {
        this.currentUser = data;
      }
      if (userRoles.data.meta.status === 200) {
        this.usersRole = userRoles.data.data;
      }
    },
    async arrageUserHandle() {
      const res = await this.$axios.put(`users/${this.currentUser.id}/role`, { rid: this.currentUser.rid });
      const { meta: { msg, status } } = res.data;
      if (status === 200) {
        this.$message.success(msg);
        this.arrageUserWindow = false;
        this.pagenum = 1;
        this.getUserList();
      } else {
        this.$message.error(msg);
      }
    },
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