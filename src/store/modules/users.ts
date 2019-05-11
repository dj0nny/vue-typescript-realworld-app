import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators'
import store from '@/store'
import { User, Profile, UserSubmit } from '../models';
import { loginUser, fetchProfile } from '../api';

@Module({
  dynamic: true,
  namespaced: true,
  name: 'users',
  store
})
class UsersModule extends VuexModule {
  user: User | null = null
  profile: Profile | null = null

  @Mutation
  SET_USER (user: User) {
    this.user = user
  }

  @Mutation
  SET_PROFILE (profile: Profile) {
    this.profile = profile 
  }

  get username() {
    return this.user && this.user.username || null
  }

  @Action({ commit: 'SET_USER' })
  async login(userSubmit: UserSubmit) {
    try {
      const user = await loginUser(userSubmit)
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

}

export default getModule(UsersModule)