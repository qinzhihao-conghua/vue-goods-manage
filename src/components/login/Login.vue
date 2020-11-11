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
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password"></el-input>
      </el-form-item>
      <el-button class="login-btn" @click.prevent="login()" type="primary"
        >登陆</el-button
      >
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
        username: "",
        password: "",
      },
    };
  },

  methods: {
    async login() {
      const res = await this.$axios.post("login", this.formData);
      const { data, meta } = res.data;
      if (meta.status === 200) {
        this.$message({ message: meta.msg, type: "success" });
        sessionStorage.setItem("token", data.token);
        this.$router.push({ name: "home" });
      } else {
        this.$message({ message: meta.msg, type: "warning" });
      }
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
  background-color: #2b4b6b;
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