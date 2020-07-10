<template>
<div id = "poster">
  <el-main>
    <el-form 
      :model="RegisterForm" 
      ref="RegisterForm" 
      :rules="rule"
      label-width="0"
      class="login-form">
      <h3>报账系统</h3>

      <el-form-item prop="username">
        <el-input 
          type="text" 
          v-model="RegisterForm.username" 
          placeholder="username" >
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input 
          type="password" 
          v-model="RegisterForm.password" 
          placeholder="password" >
        </el-input>
      </el-form-item>
      
      <el-form-item prop="password">
        <el-input 
          type="password" 
          v-model="RegisterForm.passwordTmp" 
          placeholder="password" >
        </el-input>
      </el-form-item>
      <el-form-item >
        <el-button 
          type="danger" 
          class="submitBtn"
          round
          @click.native.prevent="submit"
          :loading="logining">
          注册
        </el-button>
        <el-button 
          type="primary"
          class="resetBtn" 
          round
          @click.native.prevent="reset">
          重置
        </el-button>
        <hr>
        <p>已有账号？前往<span class="to" @click="toregin">登录</span></p>
      </el-form-item>
    </el-form>
  </el-main>
  </div>
</template>

<script>
import { userRegister} from "@/api/common.js";
export default {
  // ....
  data () {
    return {
      RegisterForm: {
        username: '',
        password: '',
        passwordTmp: '',
      },
      logining: false,
      rule: {
        username: [
          {
            required: true,
            max: 14,
            min: 7,
            message: '用户名是必须的，长度为7-14位',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '密码是必须的！',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // ...
    submit () {
      this.$refs.LoginForm.validate(valid => {
        if (valid) {
          this.logining = true
          // console.log('开始请求后台数据，验证返回之类的操作！')
          // 登录作为参数的用户信息
          let LoginParams = {
            username: this.LoginForm.username,
            password: this.LoginForm.password
          }
          // 调用axios登录接口
          userRegister(LoginParams).then(res => {
            this.logining = false
            // 根据返回的code判断是否成功
            let {code, msg, user} = res.data
            if (code !== 200) {
              this.$message({
                type: 'error',
                message: msg
              })
            } else {
              this.$message({
                type: 'success',
                message: msg
              })
              // 跳转到我的信息的页面
              this.$router.push('/login')
            }
          })
        } else {
          console.log('submit err')
        }
      })
    },
    reset () {
      this.$refs.LoginForm.resetFields()
    },
    toregin () {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
#poster {
    background:url("../assets/bg.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
.login-form {
  margin: 20px auto;
  width: 310px;
  background: #fff;
  box-shadow: 0 0 35px #B4BCCC;
  padding: 30px 30px 0 30px;
  border-radius: 25px; 
}
.submitBtn {
  width: 65%;
}
.to {
  color: #67C23A;
  cursor: pointer;
}
</style>