import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import UploadImage from '../views/images/UploadImage.vue'
import ImageDetails from '../views/images/ImageDetails.vue'
import MyImages from '../views/images/MyImages.vue'

// route guard

import { projectAuth } from '../firebase/config'

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser
  if (!user){
    next({ name: 'Login' })

  } else {
    next()
  }

}
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/images/upload',
    name: 'UploadImage',
    component: UploadImage,
    beforeEnter: requireAuth
  },
  {
    path: '/images/:id',
    name: 'ImageDetails',
    component: ImageDetails,
    props: true,
    beforeEnter: requireAuth
  },
  {
    path: '/images/my',
    name: 'MyImages',
    component: MyImages,
    props: true,
    beforeEnter: requireAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
