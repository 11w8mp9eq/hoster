<template>
      <form @submit.prevent="handleSubmit">
        <h3>Sign up</h3>
        <input type="text" placeholder="Your name" v-model="name">
        <input type="email" placeholder="Email" v-model="email">
        <input type="password" placeholder="Password" v-model="password">
        <div v-if="error" class="error">{{ error }} </div>
        <button v-if="!loading">Sign up</button>
        <button v-if="loading" disabled>Please wait</button>
    </form>
</template>

<script>
import useSignup from '@/composables/useSignup'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {

    setup() {
        const { error, signup, loading } = useSignup()
        const router = useRouter()

        const email = ref('')
        const password = ref('')
        const name = ref('')

        const handleSubmit = async () => {
            const res = await signup(email.value, password.value, name.value)
            if (!error.value) {
                router.push({ name: 'MyImages' })

            }
        }

        return { email, password, name, loading, handleSubmit, error }

    }

}
</script>

<style>

</style>