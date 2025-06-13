<template>
  <div class="discovery max-w-5xl mx-auto px-6 py-10">
    <h1 class="text-3xl font-extrabold mb-8 text-center text-indigo-900">Discovery</h1>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div
        v-for="post in posts"
        :key="post.id"
        class="post-item bg-white rounded-lg shadow-md p-4 border border-indigo-200 hover:shadow-lg transition-shadow duration-300 flex flex-col"
      >
        <router-link
          :to="{ name: 'user-profile', params: { id: post.user_id } }"
          class="text-indigo-800 font-semibold hover:text-indigo-600 hover:underline mb-2"
        >
          @{{ post.username }}
          <p class="text-gray-700 text-sm italic mb-1">bio: {{ post.profiles.bio }}</p>
        </router-link>
        <p class="text-gray-700 text-sm flex-grow">{{ post.caption }}</p>

        <img
          v-if="post.image_url"
          :src="post.image_url"
          alt="Post Image"
          class="mt-3 w-full h-48 object-cover rounded-md"
        />
      </div>
    </div>

    <p v-if="!posts.length" class="text-center text-gray-500 mt-12">
      No posts to show yet. Check back later!
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { supabase } from '../supabaseClient'
import FollowerSetup from '@/components/FollowerSetup.vue'

const router = useRouter()
const posts = ref([])
const auth = useAuthStore()

onMounted(async () => {
  if (!auth.isLoggedIn) {
    router.replace('/')
    return
  }
  const { data, error } = await supabase.from('posts').select(`
    *,
    profiles (
      bio
    )
  `)
  if (error) {
    console.error('Error fetching posts:', error)
  } else {
    posts.value = data
  }
})
</script>
