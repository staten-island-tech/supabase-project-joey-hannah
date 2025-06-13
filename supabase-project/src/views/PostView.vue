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
        >
          <img
            :src="post.image_url"
            alt="Post Image"
            class="w-full max-w-[200px] aspect-square object-cover rounded-lg shadow-md"
          />
          <p class="caption mt-2 text-gray-800 text-sm">{{ post.caption }}</p>
          <button
            @click="deletePost(post.id)"
            class="mt-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded text-sm transition"
          >
            Delete
          </button>
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

async function deletePost(id) {
  const confirmed = confirm('Confirm: I want to delete this post')
  if (!confirmed) return

  const { error } = await supabase.from('posts').delete().eq('id', id)

  if (error) {
    console.error('Error deleting post:', error.message)
  } else {
    posts.value = posts.value.filter((post) => post.id !== id)
  }
}
</script>
