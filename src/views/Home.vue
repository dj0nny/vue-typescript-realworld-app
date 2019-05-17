<template>
  <div class="home-page">

    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">

        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <a class="nav-link disabled" href="">Your Feed</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" href="">Global Feed</a>
              </li>
            </ul>
          </div>

          <ArticlePreview v-for="article in feed" :key="article.slug" :article="article" ></ArticlePreview>
              
        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <TagItem v-for="tag in tags" :key="tag" :tag="tag"></TagItem>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import articles from '@/store/modules/articles'
import tags from '@/store/modules/tags'
import users from '@/store/modules/users'
import { Article, Tag } from '@/store/models'

import ArticlePreview from '@/components/ArticlePreview.vue'
import TagItem from '@/components/TagItem.vue'

@Component({
  components: {
    ArticlePreview,
    TagItem
  }
})
export default class Home extends Vue {
  feed: Article[] = []
  tags: Tag[] = []

  async created() {
    await articles.refreshFeed('global').then(() => {
      this.feed = articles.feed
    })

    await tags.getTags().then(() => {
      this.tags = tags.tags
    })

    users.checkSession()
  }
}

</script>
