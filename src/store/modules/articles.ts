import { Module, VuexModule, getModule, Mutation, Action } from 'vuex-module-decorators'
import store from '@/store'
import { Article } from '../models'
import * as API from '@/store/api'
type FeedType = 'global' | 'user'

@Module({
  dynamic: true,
  namespaced: true,
  name: 'articles',
  store
})
class ArticlesModule extends VuexModule {
  feed: Article[] = []

  @Mutation
  SET_FEED(articles: Article[]) {
    this.feed = articles
  }

  @Action({ commit: 'SET_FEED' })
  async refreshFeed(feedType: FeedType) {
    const globalFeed = await API.fetchFeed()
    return globalFeed.articles
  }

} 

export default getModule(ArticlesModule)