<template>
  <el-card class="box-card">
    <zh-bread :level1="'角色管理'" :level2="'角色列表'"></zh-bread>
    <el-button type="success" @click="addUser()" class="add-role">添加角色</el-button>
    <el-table :data="rolesList" height="100%" class="table-container">
      <el-table-column type="expand" label="#" width="60">
        <template slot-scope="scope">
          <!-- 数据三层套娃 -->
          <el-row v-for="(item,index) in scope.row.children" :key="index">
            <el-col :span="5">
              <el-tag type="" closable @close="cancelRights(scope.row,item.id)">{{item.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="19">
              <el-row v-for="(item1,index) in item.children" :key="index">
                <el-col :span="5">
                  <el-tag type="success" closable @close="cancelRights(scope.row,item1.id)">
                    {{item1.authName}}
                  </el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="19">
                  <el-tag type="warning" closable @close="cancelRights(scope.row,item2.id)" v-for="(item2,index) in item1.children" :key="index">
                    {{item2.authName}}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <span v-if="scope.row.children.length===0" style="color:#F56C6C;">未分配权限</span>
        </template>
      </el-table-column>
      <el-table-column type="index" label="id" width="60"></el-table-column>
      <el-table-column prop="roleName" label="角色名称">
      </el-table-column>
      <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
      <el-table-column prop="level" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="openEditWindow(scope.row)" size="mini" plain icon="el-icon-edit" circle>
          </el-button>
          <el-button type="danger" @click="deleteUser(scope.row)" size="mini" plain icon="el-icon-delete" circle>
          </el-button>
          <el-button type="success" @click="openArrangeWindow(scope.row)" size="mini" plain icon="el-icon-check" circle>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="修改权限" :visible.sync="arrangeRole">
      <!-- :default-expanded-keys="defaultExpanded" -->
      <el-tree :data="treeData" show-checkbox :check-strictly="true" node-key="id" ref="tree" highlight-current :props="defaultProps" default-expand-all :default-checked-keys="defaultchecked">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="arrangeRole = false">取 消</el-button>
        <el-button type="primary" @click="setUserRoles()">确 定</el-button>
      </div>
    </el-dialog>

  </el-card>
</template>

<script>
export default {
  name: 'roles',
  components: {},
  props: {},
  data() {
    return {
      rolesList: [],
      arrangeRole: false,
      roleId: -1,
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      defaultExpanded: [],
      defaultchecked: []
    };
  },
  created() {
    this.getRolesList();
  },
  methods: {
    addUser() { },
    async getRolesList() {
      const res = await this.$axios.get(`roles`);
      console.log('角色', res);
      if (res.data.meta.status === 200) {
        this.rolesList = res.data.data;
      }
    },
    async cancelRights(role, rid) {
      const res = await this.$axios.delete(`roles/${role.id}/rights/${rid}`);
      if (res.data.meta.status === 200) {
        this.$message.success(res.data.meta.msg);
        role.children = res.data.data;
      } else {
        this.$message.error(res.data.meta.msg);
      }
    },
    deleteUser(userRoles) {
      this.$confirm("确定要删除该角色?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          const res = await this.$axios.delete(`roles/${userRoles.id}`);
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
    openEditWindow() { },
    async openArrangeWindow(userRoles) {
      this.roleId = userRoles.id;
      this.arrangeRole = true;
      const res = await this.$axios.get(`rights/tree`);
      this.treeData = res.data.data;
      // 遍历获取用户的角色
      this.defaultchecked = this.getUserRoles(userRoles.children, []);
    },
    /**
     * 递归获取用户所有角色的id
     */
    getUserRoles(userRoles, temp = []) {
      userRoles.forEach(item => {
        temp.push(item.id);
        if (item.children && item.children.length > 0) {
          this.getUserRoles(item.children, temp);
        }
      })
      return temp;
    },
    async setUserRoles() {
      const temp = this.$refs.tree.getCheckedKeys();
      const temp1 = this.$refs.tree.getHalfCheckedKeys();
      const result = [...temp, ...temp1].join(',')
      const res = await this.$axios.post(`roles/${this.roleId}/rights`, { rids: result });
      const { meta: { msg, status } } = res.data;
      // 已经存库，但是获取失败
      if (status === 200) {
        this.$message.success(msg);
        this.arrangeRole = false;
        this.getRolesList();
      } else {
        this.$message.error(msg);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.box-card {
  height: 100%;
  ::v-deep .el-card__body {
    height: calc(100% - 100px);
  }
  .add-role {
    margin-top: 16px;
  }
  .table-container {
    margin-top: 16px;
    height: 100%;
  }
}
</style>