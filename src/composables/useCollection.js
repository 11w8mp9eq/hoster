import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const useCollection = (collection) => {

  const error = ref(null)
  const loading = ref(false)

  const addDoc = async (doc) => {
    error.value = null
    loading.value = true

    try {
      const res = await projectFirestore.collection(collection).add(doc)
      loading.value = false
      return res
    }
    catch(err) {
      console.log(err.message)
      error.value = 'message sending problem'
      loading.value = false
    }
  }

  return { error, addDoc, loading }

}

export default useCollection