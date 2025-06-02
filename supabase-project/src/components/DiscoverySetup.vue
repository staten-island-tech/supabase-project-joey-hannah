<template>
  <div>
    <ul v-if="profiles.length">
      <li v-for="profile in allProfiles" :key="profile.id"></li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabaseClient.js'

const allProfiles = ref([])

onMounted(async () => {
  const { data, error } = await supabase.from('profiles').select('*')

  if (error) {
    console.error('Error fetching profiles:', error)
  } else {
    allProfiles.value = data
  }
})
</script>

<style lang="scss" scoped></style>
