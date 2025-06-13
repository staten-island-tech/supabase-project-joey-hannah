<template>
  <div class="discovery max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Discovery</h1>
    <div
      v-for="post in posts"
      :key="post.id"
      class="post-item mb-8 border-b pb-6 last:border-b-0 last:pb-0"
    >
      <router-link
        :to="{ name: 'user-profile', params: { id: post.user_id } }"
        class="text-indigo-600 font-semibold hover:underline"
      >
        {{ post.username }}
      </router-link>
      <p class="mt-2 text-gray-700">{{ post.caption }}</p>
      <img
        :src="post.image_url"
        alt="Post Image"
        class="mt-3 w-full max-w-[300px] aspect-square rounded-lg shadow-md object-cover"
      />
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
  if (!auth.isLoggedIn) {
    router.replace('/')
    return
  }

  const { data, error } = await supabase.from('posts').select()
  if (error) {
    console.error('Error fetching posts:', error)
  } else {
    posts.value = data
  }
})
</script>
