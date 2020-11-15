<template>
  <el-container class="home-container">
    <el-header class="header">
      <el-row class="header-row">
        <el-col :span="4">
          <div class="grid-content bg-purple">logo</div>
        </el-col>
        <el-col :span="18">
          <h2>商品后台管理系统</h2>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <a @click.prevent="logout()">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="main-container">
      <el-aside class="aside" width="200px">
        <el-col :span="12" class="aside-content">
          <el-menu unique-opened class="el-menu-vertical" :router="true" @open="handleOpen" @close="handleClose">
            <el-submenu :index="''+item.order" v-for="(item,index) in menus" :key="index">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.authName}}</span>
              </template>
              <el-menu-item :index="item1.path" v-for="(item1,index) in item.children" :key="index">
                <i class="el-icon-menu"></i>
                <span>{{item1.authName}}</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "home",
  components: {},
  props: {},
  data() {
    return {
      menus: []
    };
  },
  created() {
    this.getMenus();
  },
  methods: {
    async getMenus() {
      const res = await this.$axios.get(`menus`);
      if (res.data.meta.status === 200) {
        this.menus = res.data.data;
      }
    },
    handleOpen() { },
    handleClose() { },
    logout() {
      sessionStorage.clear();
      this.$message.success("退出成功");
      this.$router.push({ name: "login" });
    },
  }
};
</script>
<style lang="scss" scoped>
.home-container {
  height: 100%;
  .header {
    background-color: #b3d0b1;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
    .header-row {
      width: 100%;
    }
  }
  .main-container {
    height: calc(100% - 60px);
    .aside {
      background-color: #d3dce6;
      height: 100%;
      overflow: auto;
      .aside-content {
        width: 100%;
        height: 100%;
        .el-menu-vertical {
          height: 100%;
        }
      }
    }
  }
  .main {
    background-color: #e9eef3;
  }
}
</style>
