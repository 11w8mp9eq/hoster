<template>
 <div class="home">
    <div v-if="error" class="error">Data fetching problem</div>
    <div v-if="documents">
      <Content :images="documents" />
    </div>
  </div>
</template>

<script>
import getCollection from '@/composables/getCollection'
import Content from '../components/Content.vue'

export default {
  name: 'Home',
  components: { Content },
  setup() {
    const { error, documents } = getCollection('images')


        return {documents, error}

  }
}

</script>

