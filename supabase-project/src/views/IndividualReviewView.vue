<template>
  <div v-if="review">
    <h1>{{ review.title }}</h1>
    <img :src="review.cover_image" />
    <p>{{ review.artist }} ({{ review.year }})</p>
    <label for="rating">Rating: </label>
    <input type="number" step="0.1" min="0" max="10" v-model.number="rating" />
    <textarea
      v-model="updatedReviewText"
      rows="5"
      cols="50"
      placeholder="Edit your review..."
    ></textarea>

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
const rating = ref(null)

onMounted(async () => {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('id', route.params.id)
    .single()

  if (!error && data) {
    review.value = data
    updatedReviewText.value = data.review || ''
    rating.value = data.rating ?? null
  } else {
    console.error('Error fetching review:', error)
  }
})

async function saveReview() {
  if (!review.value) return
  console.log('review.value:', review.value)
  console.log('review.value.id:', review.value.id)
  console.log('updatedReviewText.value:', updatedReviewText.value)
  console.log('rating.value:', rating.value)
  const { data, error } = await supabase
    .from('reviews')
    .update({
      review: updatedReviewText.value,
      rating: rating.value,
    })
    .eq('id', review.value.id)

  console.log('Update data:', data)
  console.log('Update error:', error)

  if (error) {
    console.error('Failed to save review:', error.message)
    alert('Error saving review: ' + error.message)
  } else {
    router.push('/reviews')
  }
}
</script>
