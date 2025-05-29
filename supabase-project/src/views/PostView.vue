<template>
  <div class="about">
    <PostSetup />
    <div>
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
.about > div:nth-child(2) {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1rem;
}

/* Style individual post items */
.post {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* Make the image readable but not huge */
.post-image {
  width: 100%;
  max-width: 200px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

/* Caption styling */
.caption {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #333;
}
</style>
