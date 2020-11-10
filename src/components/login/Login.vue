<template>
  <div class="login-container">
    <el-form
      class="login-form"
      label-position="top"
      label-width="80px"
      :model="formData"
    >
      <h2>登陆</h2>
      <el-form-item label="用户名">
        <el-input v-model="formData.userName"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password"></el-input>
      </el-form-item>
      <el-button class="login-btn" type="primary">登陆</el-button>
    </el-form>
  </div>
</template>

<script >
export default {
  name: "login",
  components: {},
  props: {},
  data() {
    return {
      formData: {
        userName: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      // this.$axios.get()
    },
  },
};
</script>

<style lang='scss' scoped>
.login-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    background-color: #fff;
    padding: 30px;
    width: 400px;
    border-radius: 8px;
  }
  .login-btn {
    width: 100%;
  }
}
</style>