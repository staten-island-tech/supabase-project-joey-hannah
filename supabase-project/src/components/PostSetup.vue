<template>
  <div v-if="loggedIn">
    <form @submit.prevent="createPost">
      <label for="image_url">Link to Image</label>
      <input type="file" @change="onFileSelected" />
      
      <label for="caption">Caption</label>
      <input type="text" v-model="caption" />

      <button type="submit">Create Post</button>
    </form>
    <h1 v-if="successMessage">{{ successMessage }}</h1>
    <h1 v-if="errorMessage">{{ errorMessage }}</h1>  
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../supabaseClient.js'

const image_url = ref('')
const caption = ref('')
const successMessage = ref('')
const errorMessage = ref('')
const loggedIn = ref(true)
const file = ref(null)

function onFileSelected(event) {
  file.value = event.target.files[0]
}

async function createPost() {
  successMessage.value = ''
  errorMessage.value = ''

  if (!file.value) {
    errorMessage.value = 'No image selected'
    return
  }

  const filePath = `public/${Date.now()}_${file.value.name}`

  const { error: uploadError } = await supabase
    .storage
    .from('images') // your bucket name
    .upload(filePath, file.value)

  if (uploadError) {
    errorMessage.value = uploadError.message
    return
  }

  const { data: { publicUrl } } = supabase
    .storage
    .from('images')
    .getPublicUrl(filePath)

  image_url.value = publicUrl

  const { error } = await supabase
    .from('posts')
    .insert([
      {
        image_url: image_url.value,
        caption: caption.value
      }
    ])

  if (error) {
    errorMessage.value = error.message
  } else {
    successMessage.value = 'Post created successfully!'
    caption.value = ''
    image_url.value = ''
    file.value = null
  }
}
</script>
