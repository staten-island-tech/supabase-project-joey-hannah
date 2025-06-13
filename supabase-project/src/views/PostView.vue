<template>
  <div class="about px-4 py-6">
    <PostSetup />
    <div>
      <h2 class="text-2xl font-semibold mb-4">Your Posts:</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        <div
          v-for="post in posts"
          :key="post.id"
          class="post flex flex-col items-center text-center"
          ref="postRefs"
        >
          <img
            :src="post.image_url"
            alt="Post Image"
            class="w-full max-w-[200px] aspect-square object-cover rounded-lg shadow-md"
          />
          <p class="caption mt-2 text-gray-800 text-sm">{{ post.caption }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import PostSetup from '../components/PostSetup.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { supabase } from '../supabaseClient'
import gsap from 'gsap'

const router = useRouter()
const posts = ref([])
const auth = useAuthStore()
const postRefs = ref([])

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

    await nextTick()

    gsap.from(postRefs.value, {
      duration: 0.8,
      opacity: 0,
      scale: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
    })
  }
})
</script>
