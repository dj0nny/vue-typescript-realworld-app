<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">conduit</router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <router-link class="nav-link active" to="/">Home</router-link>
        </li>
        <li v-if="logged.status.loggedIn" class="nav-item">
          <router-link class="nav-link" to="/editor">
            <i class="ion-compose"></i>&nbsp;New Article
          </router-link>
        </li>
        <li v-if="logged.status.loggedIn" class="nav-item">
          <router-link class="nav-link" to="/setting">
            <i class="ion-gear-a"></i>&nbsp;Settings
          </router-link>
        </li>
        <li v-if="logged.status.loggedIn" class="nav-item">
          <router-link class="nav-link" :to="'/@' + logged.userLogged.username">
            {{ logged.userLogged.username }}
          </router-link>
        </li>
        <li v-if="!logged.status.loggedIn" class="nav-item">
          <router-link class="nav-link" to="/register">Sign up</router-link>
        </li>
        <li v-if="!logged.status.loggedIn" class="nav-item">
          <router-link class="nav-link" to="/login">Sign in</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import users from '@/store/modules/users'

@Component
export default class Header extends Vue {

  created() {
    users.checkSession()
  }
  
  get logged() {
    return users.userSession
  }

}
</script>

