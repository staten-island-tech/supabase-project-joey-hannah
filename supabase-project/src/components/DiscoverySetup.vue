<template>
  <div class="p-6 max-w-7xl mx-auto">
    <ul v-if="allProfiles.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <li v-for="profile in allProfiles" :key="profile.id" class="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center">
        <img
          v-if="profile.profile_pic"
          :src="profile.profile_pic"
          alt="Profile Picture"
          class="w-24 h-24 rounded-full object-cover mb-4 border-2 border-plum"
        />
        <p class="font-semibold text-plum mb-1">@{{ profile.username }}</p>
        <p class="text-gray-600 text-sm">{{ profile.bio || 'No bio available' }}</p>
      </li>
    </ul>
    <p v-else class="text-center text-gray-500 mt-12">No profiles found.</p>
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
