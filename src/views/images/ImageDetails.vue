<template>
  <div class="error" v-if="error">{{ error }}</div>
      <div class="responsive">
      <div class="gallery">
        <div class="desc"><h3>{{ image.title }} </h3></div>
          <img :src="image.imageUrl" width="800" height="450">
          <div v-if="image" class="desc"> 

          <p >{{ image.description }}</p>
          <div class="comments"><p>by {{ image.userName }}<button v-if="ownership" @click="handleDelete">Delete image</button></p></div>

            
            </div>


  
        </div>
      </div>
            <div class="responsive">
              <div class="gallery">
            <div class="comments">
            <AddComment :image="image" />
                        
            <p v-if="image.comments.length > 0">{{ image.comments.length }} comments</p>
            <div v-if="!image.comments.length">No comments yet.</div>
            <div v-for="comment in image.comments" :key="comment.id">
            <div class="comment"><p>{{ comment.author }}: {{ comment.comment }} <button v-if="ownership" @click="handleClick(comment.id)">delete</button></p></div>
            


      </div>

</div>
           </div>
</div>
</template>

<script>
import AddComment from '@/components/AddComment.vue'
import useStorage from '@/composables/useStorage'
import useDocument from '@/composables/useDocument'
import getDocument from '@/composables/getDocument'
import getUser from '@/composables/getUser'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  props: ['id'],
  components: { AddComment },
  setup(props) {
    const { error, document: image } = getDocument('images', props.id)
    const { user } = getUser()
    const { deleteDoc, updateDoc } = useDocument('images', props.id)
    const { deleteImage } = useStorage()
    const router = useRouter()

    const ownership = computed(() => {
      return image.value 
        && user.value 
        && (user.value.uid == image.value.userId || user.value.uid == 'A3m12d38kvMVqQrijpvcEiBLRkx1')
    })

    const handleDelete = async () => {
      await deleteDoc()
      await deleteImage(image.value.filePath)
      router.push({ name: 'Home' })
    }

    const handleClick = async (id) => {
      const comments = image.value.comments.filter((comment) => comment.id != id)
      await updateDoc({ comments })
    }
    
    return { error, image, ownership, handleDelete, handleClick }
  }
}
</script>

<style scoped>
div.gallery {
  border: 1px solid #ccc;

}

div.gallery img {
  width: 100%;
  max-height: 450px;
  object-fit: cover;
}

div.desc {
  padding: 10px;
  text-align: center;
}
div.comments {
  padding: 10px;
  text-align: left;
}
div.comment {
  margin: 20px;
}
button {
  padding: 3px;
  margin-top: 0px;
  float: right;

}


* {
  box-sizing: border-box;
}

.responsive {
  padding: 0 6px;
  width: 24.99999%;
  margin-bottom: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

@media only screen and (max-width: 700px) {
  .responsive {
    width: 49.99999%;
    margin: 6px 0;
  }
}

@media only screen and (max-width: 500px) {
  .responsive {
    width: 100%;
  }
}

  

</style>