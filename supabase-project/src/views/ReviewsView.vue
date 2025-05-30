<template>
  <div>
    <ReviewSetup />
    <div>
      <div v-for="review in reviewsw" :key="review.id" class="post">
        <img :src="review.cover_page" alt="Post Image" class="post-image" />
        <p class="caption">{{ post.caption }}</p>
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
