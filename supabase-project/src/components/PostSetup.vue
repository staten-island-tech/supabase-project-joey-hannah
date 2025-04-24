<template>
  <div v-if="loggedIn">
    <form @submit.prevent="createPost">
      <label for="image_url">Link to Image</label>
      <input type="text" v-model="image_url" />
      
      <label for="caption">Caption</label>
      <input type="text" v-model="caption" />

      <button type="submit">Create Post</button>
    </form>
    <h1 v-if="success">Post created successfully!</h1>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../supabaseClient.js'

const image_url = ref('')
const caption = ref('')
const success = ref()
const loggedIn = ref(true)



async function createPost(){
  const { error } = await supabase
  .from('posts')
.insert([{ image_url: image_url.value, caption: caption.value }])

  if (error) {
    console.error('Error creating post:', error.message)
    success.value = false;
  } else {
    success.value = true
    image_url.value = ''
    caption.value = ''
  }
}



</script>

<style lang="scss" scoped></style>
