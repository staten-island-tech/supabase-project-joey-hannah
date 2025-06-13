<template>
  <div class="discovery" v-if="auth.isLoggedIn">
    <h1>Discovery</h1>
    <div v-for="post in posts" :key="post.id" class="post-item">
      <router-link :to="{ name: 'user-profile', params: { id: post.user_id } }">
        {{ post.username }}
      </router-link>
      <p>{{ post.caption }}</p>
      <img :src="post.image_url" alt="Post Image" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { supabase } from '../supabaseClient'

const router = useRouter()
const posts = ref([])
const auth = useAuthStore()

onMounted(async () => {
  const { data, error } = await supabase.from('posts').select()
  if (error) {
    console.error('Error fetching posts:', error)
  } else {
    posts.value = data
  }
})
</script>

<style scoped>
.post-item {
  margin-bottom: 2rem;
}
.post-item img {
  max-width: 300px;
  display: block;
  margin-top: 0.5rem;
}
</style>
