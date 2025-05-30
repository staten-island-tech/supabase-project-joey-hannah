<template>
  <div>
    <ReviewSetup />
    <div v-for="review in reviews" :key="review.id" class="post">
      <span
        ><h2 class="title">{{ review.title }}</h2>
        <h2 class="year">{{ review.year }}</h2></span
      >
      <img :src="review.cover_image" alt="cover Image" class="cover-image" />
      <p class="artist">{{ review.artist }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabaseClient.js'
import ReviewSetup from '../components/ReviewSetup.vue'

const reviews = ref([])

async function getReviews() {
  const { data } = await supabase.from('reviews').select()
  reviews.value = data
}

onMounted(() => {
  getReviews()
})
</script>

<style lang="scss" scoped></style>
