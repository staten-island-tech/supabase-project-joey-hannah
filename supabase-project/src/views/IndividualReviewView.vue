<template>
  <div v-if="review">
    <h1>{{ review.title }}</h1>
    <img :src="review.cover_image" />
    <p>{{ review.artist }} ({{ review.year }})</p>

    <textarea v-model="updatedReviewText" rows="5" cols="50" placeholder="Edit your review..." />
    <button @click="saveReview">Save & Return</button>
  </div>

  <div v-else>
    <p>Review not found.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../supabaseClient.js'

const route = useRoute()
const router = useRouter()
const review = ref(null)
const updatedReviewText = ref('')

onMounted(async () => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('id', route.params.id)
    .single()

  if (!error) {
    review.value = data
    updatedReviewText.value = data.review
  }
})

async function saveReview() {
  if (!review.value) return

  const { error } = await supabase
    .from('reviews')
    .update({ review: updatedReviewText.value })
    .eq('id', review.value.id)

  if (!error) {
    router.push('/reviews')
  }
}
</script>
