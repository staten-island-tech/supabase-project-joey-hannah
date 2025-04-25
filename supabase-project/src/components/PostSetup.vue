<template>
  <div v-if="loggedIn">
    <form @submit.prevent="createPost">
      <label for="image_url">Link to Image</label>
      <input type="text" v-model="image_url" />
      
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

async function createPost() {
  successMessage.value = ''
  errorMessage.value = ''  

  const { data, error } = await supabase
    .from('posts')
    .insert([
      {
        image_url: image_url.value, 
        caption: caption.value
      }
    ])

  if (error) {
    console.error("Error:", error.message); 
    errorMessage.value = error.message;  
  } else {
    successMessage.value = 'Post created successfully!'; 
    image_url.value = ''
    caption.value = ''
  }
}
</script>
