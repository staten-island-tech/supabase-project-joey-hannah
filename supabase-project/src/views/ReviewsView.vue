<template>
  <div>
    <ReviewSetup />
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
