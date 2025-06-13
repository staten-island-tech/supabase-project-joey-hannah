<template>
  <div class="user-profile-page">
    <button @click="goBack" class="back-button">← Back to Discovery</button>

    <div v-if="loading">Loading profile...</div>

    <div v-else>
      <div v-if="profile" class="flex flex-wrap gap-8 justify-center">
        <div class="profile-grid grid grid-cols-2 justify-center grid-rows-3 gap-4 p-4">
          <div class="tile w-[200px] h-[200px] overflow-hidden rounded-lg shadow">
            <img
              :src="profile.profile_pic"
              alt="Profile Picture"
              class="w-full h-full object-cover"
            />
          </div>

          <div
            class="tile bg-white w-[200px] h-[200px] rounded-lg shadow flex items-center justify-center text-center"
          >
            <h2 class="text-plum text-lg font-semibold">@{{ profile.username }}</h2>
          </div>

          <div
            class="tile bg-white w-[200px] h-[200px] rounded-lg shadow p-4 flex items-center justify-center text-center"
          >
            <p class="text-plum text-lg">{{ profile.bio }}</p>
          </div>

          <div class="tile w-[200px] h-[200px] overflow-hidden rounded-lg shadow">
            <img
              :src="profile.fav_artist"
              alt="Favorite Artist"
              class="w-full h-full object-cover"
            />
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

        <!-- POSTS SECTION -->
        <section class="w-full max-w-5xl mt-8">
          <h3 class="mb-4 text-xl font-semibold">Posts by {{ profile.username }}:</h3>
          <div v-if="posts.length === 0" class="text-gray-500">No posts found.</div>
          <div v-else class="posts-grid grid grid-cols-3 gap-4">
            <div v-for="post in posts" :key="post.id" class="post">
              <img
                :src="post.image_url"
                alt="Post Image"
                class="w-[200px] h-[200px] rounded-lg object-cover mb-2"
              />
              <p class="text-sm text-gray-700">{{ post.caption }}</p>
            </div>
          </div>
        </section>

        <!-- REVIEWS SECTION -->
        <section class="w-full max-w-5xl mt-12">
          <h3 class="mb-4 text-xl font-semibold">Reviews by {{ profile.username }}:</h3>
          <div v-if="reviews.length === 0" class="text-gray-500">NO REVIEWS FOUND</div>
          <div v-else class="reviews-grid grid grid-cols-3 gap-6">
            <div
              v-for="review in reviews"
              :key="review.id"
              class="review rounded-lg shadow p-4 bg-white flex flex-col items-center"
            >
              <img
                :src="review.cover_image"
                alt="Cover Image"
                class="w-[180px] h-[180px] object-cover rounded-md mb-4"
              />
              <h2 class="text-lg font-semibold text-plum text-center mb-1">
                {{ review.title }} ({{ review.year }})
              </h2>
              <p class="text-sm text-gray-600 mb-1">{{ review.artist }}</p>
              <p class="text-sm font-medium text-yellow-500 mb-2">Rating: {{ review.rating }}</p>
              <p class="text-sm text-gray-700 text-center">Review: {{ review.review }}</p>
            </div>
          </div>
        </section>
      </div>

      <div v-else>
        <p>Profile not found.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../supabaseClient'

const route = useRoute()
const router = useRouter()
const userId = route.params.id

const profile = ref(null)
const posts = ref([])
const reviews = ref([])
const loading = ref(true)

async function fetchProfileAndPosts() {
  if (!userId) {
    router.push('/discovery')
    return
  }

  // Fetch profile
  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select()
    .eq('id', userId)
    .single()

  if (profileError || !profileData) {
    console.error('Error fetching profile:', profileError)
    router.push('/discovery')
    return
  }
  profile.value = profileData

  // Fetch posts for this user
  const { data: postsData, error: postsError } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', userId)

  if (postsError) {
    console.error('Error fetching posts:', postsError)
    posts.value = []
  } else {
    posts.value = postsData
  }

  const { data: reviewsData, error: reviewsError } = await supabase
    .from('reviews')
    .select('*')
    .eq('user_id', userId)

  if (reviewsError) {
    console.error('Error fetching revs:', reviewsError)
    reviews.value = []
  } else {
    reviews.value = reviewsData
  }

  loading.value = false
}

function goBack() {
  router.push('/discovery')
}

onMounted(fetchProfileAndPosts)
</script>

<style scoped></style>
