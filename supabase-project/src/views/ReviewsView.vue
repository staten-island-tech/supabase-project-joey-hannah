<template>
  <div class="max-w-3xl mx-auto p-6 space-y-6">
    <ReviewSetup />

    <div
      v-for="review in reviews"
      :key="review.id"
      class="post bg-white rounded-lg shadow-md p-4 flex space-x-6 items-start"
    >
      <img
        :src="review.cover_image"
        alt="Cover Image"
        class="w-40 h-40 object-cover rounded-md flex-shrink-0"
      />
      <div class="flex flex-col flex-grow space-y-2">
        <h2 class="text-xl font-semibold text-gray-800">{{ review.title }} ({{ review.year }})</h2>
        <p class="text-gray-600 font-medium">{{ review.artist }}</p>
        <p v-if="review.rating !== null" class="text-indigo-600 font-semibold">
          {{ review.rating }}/10
        </p>
        <p v-if="review.review" class="text-gray-700 whitespace-pre-wrap">
          {{ review.review }}
        </p>
        <button
          @click="goToReview(review.id)"
          class="self-start mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition"
        >
          View Review
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabaseClient.js'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import ReviewSetup from '../components/ReviewSetup.vue'

const reviews = ref([])
const router = useRouter()
const auth = useAuthStore()

async function getReviews() {
  const userId = auth.user?.id
  if (!userId) return

  const { data, error } = await supabase.from('reviews').select().eq('user_id', userId)

  if (error) {
    console.error('Error fetching reviews:', error.message)
    return
  }

  reviews.value = data
}

onMounted(async () => {
  if (!auth.user) {
    await auth.fetchUser()
  }
  if (!auth.user) {
    router.replace('/')
    return
  }
  await getReviews()
})

function goToReview(id) {
  router.push(`/reviews/${id}`)
}
</script>
