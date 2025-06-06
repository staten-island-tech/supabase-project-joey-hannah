<template>
  <div>
    <ul v-if="profiles.length">
      <li v-for="profile in allProfiles" :key="profile.id"></li>
      <div class="card">
        <img v-if="profile.profile_pic" :src="profile.profile_pic" alt="pfp" class="pfp" />
        <p>@{{ profile.username }}</p>
        <p>{{ profile.bio }}</p>
      </div>
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
