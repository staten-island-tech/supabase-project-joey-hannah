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
          <img
            v-if="profile.fav_artist"
            :src="`https://your-supabase-url.supabase.co/storage/v1/object/public/profile-assets/${profile.fav_artist}`"
            alt="Favorite Artist"
            class="media-image"
          />
        </div>

        <div class="profile-field">
          <strong>Favorite Album:</strong><br />
          <img
            v-if="profile.fav_album"
            :src="`https://your-supabase-url.supabase.co/storage/v1/object/public/profile-assets/${profile.fav_album}`"
            alt="Favorite Album"
            class="media-image"
          />
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
img {
  border-radius: 50%;
  margin-top: 10px;
}
</style>
