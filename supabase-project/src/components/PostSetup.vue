<template>
  <div>
    <form @submit.prevent="createPost">
      <label for="image_url">Link to Image</label>
      <input type="text" v-model="image_url" />
      
      <label for="caption">Caption</label>
      <input type="text" v-model="caption" />

      <button type="submit">Create Post</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../supabaseClient.js'

const image_url = ref('')
const caption = ref('')

function createPost{
  const { error } = await supabase
  .from('posts')
  .insert({ image_url: image_url.value, caption: caption.value })
}



</script>

<style lang="scss" scoped></style>
