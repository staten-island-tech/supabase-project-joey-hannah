<template>
  <div class="profile-container">
    <div class="profile-grid">
      <div v-for="profile in profiles" :key="profile.id" class="profile-card">
        <div class="profile-header">
          <img :src="profile.profile_pic" alt="Profile Picture" class="profile-pic" />
          <h2 class="username">{{ profile.username }}</h2>
        </div>

        <div class="profile-field"><strong>Bio:</strong> {{ profile.bio }}</div>

        <div class="profile-field">
          <strong>Favorite Artist:</strong><br />
          <img :src="profile.fav_artist" alt="Favorite Artist" class="media-image" />
        </div>

        <div class="profile-field">
          <strong>Favorite Album:</strong><br />
          <img :src="profile.fav_album" alt="Favorite Album" class="media-image" />
        </div>

        <div class="profile-field"><strong>Lyric:</strong> {{ profile.lyric }}</div>
      </div>
    </div>

    <ProfilePage />
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
  grid-template-columns: repeat(3, 1fr); /* 3 columns */
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
