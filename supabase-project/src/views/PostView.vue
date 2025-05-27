<template>
  <div class="about">
        <PostSetup />
    <div v-if="posts.length === 0">No posts available.</div>
    <div v-else>
      <div v-for="post in posts" :key="post.id" class="post">
        <img :src="post.image_url" alt="Post Image" class="post-image" />
        <p class="caption">{{ post.caption }}</p>
      </div>
    </div>
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
.post-image {
  width: 15px;      /* super small width */
  height: 15px;     /* super small height */
  object-fit: cover;  /* keep aspect ratio but cropped */
  display: block;  /* remove inline spacing */
  margin-bottom: 5px;
  border: 1px solid #ccc; /* optional: visible border to see the tiny image */
}

</style>
