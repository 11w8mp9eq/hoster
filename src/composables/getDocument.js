import { watchEffect, ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const getDocument = (collection, id) => {

  let document = ref(null)
  let error = ref(null)

  let documentRef = projectFirestore.collection(collection).doc(id)

  const unsub = documentRef.onSnapshot(doc => {
    if(doc.data()) {
      document.value = {...doc.data(), id: doc.id}
      error.value = null
    }
    else {
      error.value = 'there is no document'
    }
  }, err => {
    console.log(err.message)
    error.value = 'document fetching error'
  })

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub())
  });

  return { error, document }

}

export default getDocument