<template>
  <div class="user-playlists">
    <h2>My Images</h2>
        <div v-if="images">
      <Content :images="images" />
    </div>
  </div>
</template>

<script>
import getUser from '@/composables/getUser'
import getCollection from '@/composables/getCollection'
import Content from '@/components/Content.vue'
export default {
  components: { Content },
  setup() {
    const { user } = getUser()
    const { documents: images } = getCollection(
      'images', 
      ['userId', '==', user.value.uid]
    )
    return { images }
  }
}
</script>

<style scoped>
  h2 {
    padding-bottom: 10px;
    margin-bottom: 30px;
    border-bottom: 1px solid var(--secondary)
  }
  .btn {
    margin-top: 20px;
  }
</style>