<template>
    <form @submit.prevent="handleSubmit">
        <h4>Upload New Image</h4>
        <input type="text" required placeholder="Title" v-model="title">
        <textarea required placeholder="Description" v-model="description"></textarea>
        <label>Upload</label>
        <input type="file" @change="handleChange">
        <div class="error">{{ fileError }} </div>
        <button v-if="!loading">Upload</button>
        <button v-if="loading" disabled>Saving...</button>
    </form>

</template>

<script>
import { ref } from 'vue'
import useStorage from '@/composables/useStorage'
import useCollection from '@/composables/useCollection'
import getUser from '@/composables/getUser'
import { timestamp } from '@/firebase/config'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const { filePath, url, uploadImage } = useStorage()
        const { error, addDoc } = useCollection('images')
        const { user } = getUser()
        const router = useRouter()

        const title = ref('')
        const description = ref('')
        const file = ref(null)
        const fileError = ref(null)
        const loading = ref(false)

        const handleSubmit = async () => {
            if (file.value) {
            loading.value = true
            await uploadImage(file.value)
            const res = await addDoc({
                title:title.value,
                description: description.value,
                userId: user.value.uid,
                userName: user.value.displayName,
                imageUrl: url.value,
                filePath: filePath.value,
                comments: [],
                createdAt: timestamp()
            })
            loading.value = false
            if (!error.value) {
                router.push({ name: 'ImageDetails', params: { id: res.id }})
              }
            }
        }

        const types = ['image/png', 'image/jpeg']

        const handleChange = (e) => {
            let selected = e.target.files[0]
            console.log(selected)

            if (selected && types.includes(selected.type)) {
                file.value = selected
                fileError.value = null
            } else {
                file.value = null
                fileError.value = "This is not an image file"


            }
        }
        return { title, description, handleSubmit, handleChange, fileError, loading}
    }

}
</script>

<style>
input[type="file"]{
    border:0;
    padding: 0;
}
label {
    font-size:12px;
    display:block;
    margin-top:30px;
}
button{
    margin-top: 20px;
}
</style>