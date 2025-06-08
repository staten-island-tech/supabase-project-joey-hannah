<template>
  <div>
    <div>
      <div v-for="post in posts" :key="post.id" class="post">
        <img :src="post.image_url" alt="Post Image" class="post-image" />
        <p class="caption">{{ post.caption }}</p>
        <p>Posted by: {{post.username}}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabaseClient.js'
import DiscoverySetup from '@/components/DiscoverySetup.vue' //I am not sure what discovery setup is supposed to do but it is not working so I removed it from the template or else nothing will show up 

const posts = ref([])

async function getPosts() {
  const { data } = await supabase.from('posts').select()
  posts.value = data
}

onMounted(() => {
    getPosts()
})
</script>

<style scoped>
.about > div:nth-child(2) {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1rem;
}

.post {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.post-image {
  width: 100%;
  max-width: 200px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.caption {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #333;
}
</style>
