<template>
  <div>
    <div class="posts-grid">
      <div v-for="post in posts" :key="post.id" class="post">
        <img :src="post.image_url" alt="Post Image" class="post-image" />
        <p class="caption">{{ post.caption }}</p>
        <p>Posted by: {{ post.username }}</p>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabaseClient.js'
import { gsap } from 'gsap'
import { nextTick } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const posts = ref([])
const auth = useAuthStore()
const router = useRouter()

async function getPosts() {
  const { data } = await supabase.from('posts').select()
  posts.value = data
  await nextTick()

  gsap.from('.post', {
    opacity: 0,
    y: 50,
    scale: 0.8,
    rotate: -5,
    stagger: {
      each: 0.1,
      from: 'random'
    },
    duration: 0.8,
    ease: 'back.out(1.7)'
  })
}

onMounted(async () => {
  if (!auth.user) {
    await auth.fetchUser()
  }
  if (!auth.user) {
    router.replace('/')
    return
  }
  getPosts()
})
</script>

<style>
.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
  padding: 0 1rem;
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
