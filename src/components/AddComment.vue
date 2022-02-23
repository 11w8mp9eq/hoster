<template>
  <div class="add-comment">
    <form @submit.prevent="handleSubmit">
      <h4>Add a New Comment</h4>
      <input type="text" placeholder="Comment" required v-model="comment">
      <button>Add</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import useDocument from '../composables/useDocument'
import getUser from '@/composables/getUser'

export default {
  props: ['image'],
  setup(props) {
    const { user } = getUser()
    const comment = ref('')
    const author = ref('')
    const showForm = ref(false)
    const { updateDoc } = useDocument('images', props.image.id)
    const handleSubmit = async () => {
      const newComment = {
        comment: comment.value,
        author: user.value.displayName,
        id: Math.floor(Math.random() * 1000000)
      }
      const res = await updateDoc({
        comments: [...props.image.comments, newComment]
      })
      comment.value = ''
      author.value = user.value.displayName
    }
    return { comment, author, showForm, handleSubmit }
  }
}
</script>

<style scoped>
  .add-comment {
    text-align: center;
    margin-top: 40px;
  }
  form {
    max-width: 100%;
    text-align: left;
  }
</style>