<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center p-6">
    <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-xl">
      <div v-if="review">
        <h1 class="text-2xl font-bold text-indigo-700 mb-4">
          {{ review.title }} - {{ review.artist }} ({{ review.year }})
        </h1>

        <label for="rating" class="block text-gray-700 font-medium mb-1">Rating:</label>
        <input
          class="mb-4 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          type="number"
          step="0.1"
          min="0"
          max="10"
          v-model.number="rating"
        />

        <label class="block text-gray-700 font-medium mb-1">Edit your review:</label>
        <textarea
          v-model="updatedReviewText"
          rows="5"
          class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none mb-4"
          placeholder="Edit your review..."
        ></textarea>

        <button
          @click="saveReview"
          class="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-md transition duration-200"
        >
          Save & Return
        </button>
      </div>

      <div v-else class="text-center text-gray-600">
        <p>Review not found.</p>
      </div>
    </div>
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
