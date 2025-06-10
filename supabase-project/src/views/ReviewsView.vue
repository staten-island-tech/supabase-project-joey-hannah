<template>
  <div>
    <ReviewSetup />
    <div v-for="review in reviews" :key="review.id" class="post">
      <img :src="review.cover_image" class="cover-image" />
      <h2>{{ review.title }} ({{ review.year }})</h2>
      <p>{{ review.artist }}</p>
      <p v-if="review.review">See Review</p>
      <button @click="goToReview(review.id)">View Review</button>
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
  const { data } = await supabase.from('reviews').select()
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
  getReviews()
})

function goToReview(id) {
  router.push(`/reviews/${id}`)
}
</script>

<style lang="scss" scoped></style>
