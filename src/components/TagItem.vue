<template>
    <a href="" class="tag-pill tag-default">{{ tag }}</a>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Tag } from '@/store/models'

@Component
export default class TagItem extends Vue {
  @Prop() tag?: Tag

}
</script>


