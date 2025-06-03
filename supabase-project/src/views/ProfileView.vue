<template>
  <div class="profile-container p-6">
    <ProfilePage />

    <div class="profile-grid grid grid-cols-2 grid-rows-3 gap-6">
      <div
        v-for="profile in profiles"
        :key="profile.id"
        class="profile-card bg-white p-4 shadow-md rounded-lg"
      >
        <div class="profile-field text-center">
          <img
            :src="profile.profile_pic"
            alt="Profile Picture"
            class="media-image mx-auto rounded-full w-24 h-24 object-cover"
          />
          <h2 class="username mt-2 text-lg font-semibold">{{ profile.username }}</h2>
        </div>

        <div class="profile-field mt-2"><strong>Bio:</strong> {{ profile.bio }}</div>

        <div class="profile-field mt-2">
          <strong>Favorite Artist:</strong><br />
          <img
            :src="profile.fav_artist"
            alt="Favorite Artist"
            class="media-image mt-1 w-full rounded"
          />
        </div>

        <div class="profile-field mt-2">
          <strong>Favorite Album:</strong><br />
          <img
            :src="profile.fav_album"
            alt="Favorite Album"
            class="media-image mt-1 w-full rounded"
          />
        </div>

        <div class="profile-field mt-2"><strong>Lyric:</strong> {{ profile.lyric }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabaseClient.js'
import ProfilePage from '@/components/ProfilePage.vue'

const profiles = ref([])

async function getProfiles() {
  const { data } = await supabase.from('profiles').select()
  profiles.value = data
}

onMounted(() => {
  getProfiles()
})
</script>
<style scoped>
.profile-container {
  padding: 20px;
  max-width: 1400px;
  margin: auto;
}

.profile-grid {
  display: grid;
  grid-template-columns: repeat(3, 2fr);
  gap: 20px;
}

.profile-card {
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 12px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-subgrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  width: 100%;
  margin-top: 12px;
}

.profile-field {
  text-align: center;
  width: 100%;
}

.media-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-top: 8px;
}
</style>
