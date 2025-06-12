<template>
  <div class="profile-container p-6" v-if="auth.user">
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
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const profiles = ref([])
const auth = useAuthStore()
const router = useRouter()

async function getProfiles() {
  const userId = auth.user?.id
  if (!userId) return

  const { data, error } = await supabase.from('profiles').select().eq('id', userId).single()

  if (error) {
    console.error('Error fetching profile:', error.message)
    return
  }

  profiles.value = [data]
}

onMounted(async () => {
  if (!auth.user) {
    await auth.fetchUser()
  }

  if (!auth.user) {
    router.replace('/')
    return
  }

  await getProfiles()
})
</script>
