<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <a href="">Need an account?</a>
          </p>

          <ul class="error-messages" v-if="loginError">
            <li>Invalid username or password</li>
          </ul>

          <form @submit.prevent="login" @keydown.prevent.enter>
            <fieldset class="form-group">
              <input v-model="email" class="form-control form-control-lg" type="text" placeholder="Email">
            </fieldset>
            <fieldset class="form-group">
              <input v-model="password" class="form-control form-control-lg" type="password" placeholder="Password">
            </fieldset>
            <button type="submit" class="btn btn-lg btn-primary pull-xs-right">
              Sign up
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import users from '@/store/modules/users'

@Component
export default class Login extends Vue {
 email = ''
 password = ''
 loginError = ''
 
 login() {
   users.login({
     email: this.email,
     password: this.password
   }).then(() => {
     this.$router.push('/')
   }).catch((err) => {
     console.error(this.loginError)
     this.loginError = "Invalid username or password"
   })
 }
}
</script>
