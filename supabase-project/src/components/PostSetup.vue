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

const caption = ref('')
const image_url = ref('')
const successMessage = ref('')
const errorMessage = ref('')
const loggedIn = ref(true)  

async function createPost() {
  successMessage.value = ''
  errorMessage.value = ''

  const { error } = await supabase
    .from('posts')
    .insert([
      {
        caption: caption.value,
        image_url: image_url.value
      }
    ])

  if (error) {
    console.error("Error:", error.message)
    errorMessage.value = error.message
  } else {
    successMessage.value = 'Post created successfully!'
    caption.value = ''
  }
}
</script>
