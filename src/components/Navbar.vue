<template>
  <div class="navbar">
      <nav>
          <h1><router-link :to="{ name: 'Home' }">Hoster!</router-link></h1>
            <div class="links">
                <router-link class="btn" v-if="user" :to="{ name: 'UploadImage' }">Upload Image</router-link>
                <router-link class="btn" v-if="user" :to="{ name: 'MyImages' }">{{ user.displayName }}</router-link>
                <router-link class="btn" @click="handleSubmit" v-if="user" :to="{ name: 'Login' }">Logout</router-link>
                <router-link class="btn" v-if="!user" :to="{ name: 'Login' }">Login</router-link>
                <router-link class="btn" v-if="!user" :to="{ name: 'Signup' }">Signup</router-link>
            </div>
      </nav>
  </div>
</template>

<script>
import useLogout from '@/composables/useLogout'
import getUser from '@/composables/getUser'


export default {
    setup() {
        const { error, logout, loading } = useLogout()


        const handleSubmit = async() => {
            const res = await logout()
            if (!error.value) {
                console.log('logged out')
            }
        }
        const { user } = getUser()

        return { handleSubmit, error, loading, user }
    }
}
</script>

<style scoped>

nav {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: white;
    margin: 5px 5px 15px 5px ;
}

nav .links {

    margin-left: auto;
}

nav .links a, button {

    font-size: 15px;
    margin-left: 5px;
}

</style>