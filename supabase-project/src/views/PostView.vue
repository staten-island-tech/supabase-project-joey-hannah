<template>
  <div class="about">
    <PostSetup  />
  
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabaseClient.js'
import PostSetup from '@/components/PostSetup.vue'

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
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>


