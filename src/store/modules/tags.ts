import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators'
import store from '@/store'
import { Tag } from '@/store/models'
import { fetchTags } from '../api';

@Module({
  namespaced: true,
  name: 'tags',
  dynamic: true,
  store
})
class TagsModule extends VuexModule {
  tags: Tag[] = []

  @Mutation
  GET_TAGS(tagList: Tag[]) {
    this.tags = tagList
  }

  @Action({ commit: 'GET_TAGS' })
  async getTags() {
    const tagsRes = await fetchTags()
    return tagsRes.tags
  }

}

export default getModule(TagsModule)