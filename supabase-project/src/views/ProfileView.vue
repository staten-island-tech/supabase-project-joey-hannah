<template>
  <div
    class="profile-container p-6 flex flex-col lg:flex-row lg:gap-12 justify-center items-stretch"
    v-if="auth.user"
  >
    <!-- Profile form/component -->
    <div class="flex-shrink-0 w-full lg:w-1/3 h-full">
      <ProfilePage class="h-full" />
    </div>

    <!-- Profile grid -->
    <div class="profile-grid flex flex-wrap gap-8 justify-center w-full lg:w-2/3 h-full">
      <div
        v-for="profile in profiles"
        :key="profile.id"
        class="profile-card grid grid-cols-2 grid-rows-3 gap-4 p-4 bg-cream shadow-md rounded-xl"
      >
        <div class="tile w-[200px] h-[200px] overflow-hidden rounded-lg shadow">
          <img
            :src="profile.profile_pic"
            alt="Profile Picture"
            class="w-full h-full object-cover"
          />
        </div>

        <div
          class="tile bg-white w-[200px] h-[200px] rounded-lg shadow flex flex-col items-center justify-center text-center"
        >
          <h2 class="text-plum text-lg font-semibold">@{{ profile.username }}</h2>
          <p class="text-sm text-gray-600 mb-2 text-center">
            <span class="font-semibold text-indigo-700">{{ followerCount }}</span>
            follower<span v-if="followerCount !== 1">s</span>
            &nbsp;|&nbsp;
            <span class="font-semibold text-indigo-700">{{ followingCount }}</span>
            following
          </p>
        </div>

        <div
          class="tile bg-white w-[200px] h-[200px] rounded-lg shadow p-4 flex items-center justify-center text-center"
        >
          <p class="text-plum text-lg"><strong></strong> {{ profile.bio }}</p>
        </div>

        <div class="tile w-[200px] h-[200px] overflow-hidden rounded-lg shadow">
          <img :src="profile.fav_artist" alt="Favorite Artist" class="w-full h-full object-cover" />
        </div>

        <div class="tile w-[200px] h-[200px] overflow-hidden rounded-lg shadow">
          <img :src="profile.fav_album" alt="Favorite Album" class="w-full h-full object-cover" />
        </div>

        <div
          class="tile bg-white w-[200px] h-[200px] rounded-lg shadow p-4 flex items-center justify-center text-center"
        >
          <p class="text-plum italic text-lg">“{{ profile.lyric }}”</p>
        </div>
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
const followerCount = ref(0)
const followingCount = ref(0)

const profiles = ref([])
const auth = useAuthStore()
const router = useRouter()

async function fetchFollowCounts() {
  const userId = auth.user?.id
  if (!userId) return

  const { count: followers, error: followerError } = await supabase
    .from('followers')
    .select('*', { count: 'exact', head: true })
    .eq('following_id', userId)

  if (followerError) console.error('Error fetching follower count:', followerError)
  else followerCount.value = followers

  const { count: following, error: followingError } = await supabase
    .from('followers')
    .select('*', { count: 'exact', head: true })
    .eq('follower_id', userId)

  if (followingError) console.error('Error fetching following count:', followingError)
  else followingCount.value = following
}

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
  await fetchFollowCounts()
})
</script>
