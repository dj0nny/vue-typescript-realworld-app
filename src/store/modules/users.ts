import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators'
import store from '@/store'
import { User, Profile, UserSubmit, UserForUpdate } from '../models';
import { loginUser, fetchProfile, updateUser, setJWT, fetchUser } from '../api';

@Module({
  dynamic: true,
  namespaced: true,
  name: 'users',
  store
})
class UsersModule extends VuexModule {
  user: User | null = null
  profile: Profile | null = null 
  userSession: any | null = null

  @Mutation
  SET_USER(user: User) {
    this.user = user
  }

  @Mutation
  SET_PROFILE(profile: Profile) {
    this.profile = profile 
  }

  @Mutation
  CHECK_LOGIN(initialState: any) {
    this.userSession = initialState
  }

  @Mutation
  UPDATE_USER(user: User) {
    this.user = user
  }

  @Mutation
  LOAD_USER(user: User) {
    this.user = user
  }

  // @Mutation
  // LOGOUT() {
  //   const resetState = {
  //     status: {},
  //     userLogged: false
  //   }
  //   this.userSession = resetState
  // }

  get username() {
    return this.user && this.user.username || null
  }

  @Action({ commit: 'SET_USER' })
  async login(userSubmit: UserSubmit) {
    try {
      const user = await loginUser(userSubmit)
      if(user.token) {
        localStorage.setItem('user', JSON.stringify(user))
      }
      return user
    } catch (e) {
      throw new Error('Invalid username or password')
    }
  }

  @Action({ commit: 'SET_PROFILE' }) 
  async loadProfile(username: string) {
    const profile = await fetchProfile(username)
    return profile
  }

  @Action({ commit: 'CHECK_LOGIN' })
  checkSession() {
    let userLogged: any | null = localStorage.getItem('user')
    // console.log(userLogged)
    let initialState: any
    userLogged = JSON.parse(userLogged)

    if(userLogged) {
      initialState = {
        status: {
          loggedIn: true
        },
        userLogged
      }
    } else {
      initialState = {
        status: {},
        userLogged: false
      }
    }

    return initialState
  }

  @Action({})
  logout() {
    localStorage.removeItem('user')
  }

  @Action({ commit: 'UPDATE_USER' })
  async updateSelfProfile(userUpdateFields: UserForUpdate) {
    const user = await updateUser(userUpdateFields)
    return user
  }

  @Action({ commit: 'LOAD_USER' })
  async loadUser() {
    const user = await fetchUser()
    return user
  }

}

export default getModule(UsersModule)