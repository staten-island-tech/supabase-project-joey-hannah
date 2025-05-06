<template>
  <div class="about">
    <div v-for="post in posts" :key="post.id" class="post">
      <img :src="post.image_url" alt="Post Image" class="post-image" />
      <p class="caption">{{ post.caption }}</p>
    </div>
        <PostSetup/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabaseClient.js'
import PostSetup from '../components/PostSetup.vue'

const posts = ref([])

async function getPosts() {
  const { data } = await supabase.from('posts').select()
  posts.value = data
}

onMounted(() => {
  getPosts()
})
</script>

<style>
</style>
