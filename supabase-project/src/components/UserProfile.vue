<template>
  <div class="max-w-3xl mx-auto p-6">
    <button
      @click="goBack"
      class="mb-6 text-indigo-600 hover:text-indigo-800 font-semibold transition cursor-pointer"
    >
      ← Back to Discovery
    </button>

    <div v-if="loading" class="text-center text-gray-500">Loading profile...</div>

    <div v-else>
      <div v-if="profile" class="space-y-6">
        <div class="flex flex-col items-center">
          <img
            :src="profile.profile_pic"
            alt="Profile Picture"
            class="w-36 h-36 rounded-full object-cover mb-4 shadow-md"
          />
          <img
            :src="profile.fav_artist"
            alt="Favorite Artist"
            class="w-36 h-36 rounded-full object-cover mb-4 shadow-md"
          />
          <img
            :src="profile.fav_album"
            alt="Favorite Album"
            class="w-36 h-36 rounded-full object-cover mb-4 shadow-md"
          />
          <h2 class="text-3xl font-bold text-gray-900">{{ profile.username }}</h2>
          <p class="text-gray-700 text-center max-w-xl mt-2">{{ profile.bio }}</p>
          <p class="text-gray-700 text-sm text-center max-w-xl mt-2 italic">
            "{{ profile.lyric }}"
          </p>
        </div>

        <section>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">Posts by {{ profile.username }}:</h3>
          <div v-if="posts.length === 0" class="text-gray-500 italic">No posts found.</div>
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div
              v-for="post in posts"
              :key="post.id"
              class="rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              <img :src="post.image_url" alt="Post Image" class="w-full h-40 object-cover" />
              <p class="p-2 text-gray-800 truncate">{{ post.caption }}</p>
            </div>
          </div>
        </section>

        <section>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">
            Reviews by {{ profile.username }}:
          </h3>

          <div class="flex gap-4 mb-4 justify-center">
            <button
              @click="filterCategory = 'all'"
              :class="[
                'px-3 py-1 rounded font-semibold transition',
                filterCategory === 'all'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-indigo-100',
              ]"
            >
              All
            </button>

            <button
              @click="filterCategory = 'low'"
              :class="[
                'px-3 py-1 rounded font-semibold transition',
                filterCategory === 'low'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-red-100',
              ]"
            >
              Low (0–4)
            </button>

            <button
              @click="filterCategory = 'medium'"
              :class="[
                'px-3 py-1 rounded font-semibold transition',
                filterCategory === 'medium'
                  ? 'bg-yellow-400 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-yellow-100',
              ]"
            >
              Medium (4–7)
            </button>

            <button
              @click="filterCategory = 'high'"
              :class="[
                'px-3 py-1 rounded font-semibold transition',
                filterCategory === 'high'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-green-100',
              ]"
            >
              High (7–10)
            </button>
          </div>

          <div v-if="filteredAndSortedReviews.length === 0" class="text-gray-500 italic">
            No reviews found.
          </div>
          <div v-else class="space-y-6">
            <div
              v-for="review in filteredAndSortedReviews"
              :key="review.id"
              class="flex flex-col sm:flex-row items-start gap-4 bg-white rounded-lg shadow p-4"
            >
              <img
                :src="review.cover_image"
                alt="Review Cover"
                class="w-28 h-28 object-cover rounded"
              />
              <div>
                <h2 class="text-lg font-bold text-gray-900">
                  {{ review.title }} ({{ review.year }})
                </h2>
                <p class="text-indigo-600 font-semibold">{{ review.artist }}</p>
                <p :class="[getRatingColor(review.rating), 'font-semibold']">
                  Rating: {{ review.rating }}/10
                </p>
                <p class="mt-2 text-gray-700 whitespace-pre-line">Review: {{ review.review }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div v-else class="text-center text-red-600 font-semibold">Profile not found.</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '../supabaseClient'

const route = useRoute()
const router = useRouter()
const userId = route.params.id

const profile = ref(null)
const posts = ref([])
const reviews = ref([])
const loading = ref(true)
const filterCategory = ref('all')

function getRatingColor(rating) {
  if (rating <= 4) return 'text-red-500'
  if (rating <= 7) return 'text-yellow-500'
  return 'text-green-600'
}

const filteredAndSortedReviews = computed(() => {
  let filtered = [...reviews.value]

  if (filterCategory.value === 'low') {
    filtered = filtered.filter((rev) => rev.rating <= 4)
  } else if (filterCategory.value === 'medium') {
    filtered = filtered.filter((rev) => rev.rating > 4 && rev.rating <= 7)
  } else if (filterCategory.value === 'high') {
    filtered = filtered.filter((rev) => rev.rating > 7)
  }

  return filtered.sort((a, b) => b.rating - a.rating)
})

async function fetchProfileAndPosts() {
  if (!userId) {
    router.push('/discovery')
    return
  }

  const { data: profileData, error: profileError } = await supabase
    .from('profiles')
    .select()
    .eq('id', userId)
    .single()

  if (profileError) {
    console.error('Error fetching profile:', profileError)
    router.push('/discovery')
    return
  }
  profile.value = profileData

  const { data: postsData } = await supabase.from('posts').select('*').eq('user_id', userId)
  posts.value = postsData

  const { data: reviewsData } = await supabase.from('reviews').select('*').eq('user_id', userId)
  reviews.value = reviewsData
  loading.value = false
}

function goBack() {
  router.push('/discovery')
}

onMounted(fetchProfileAndPosts)
</script>

<style scoped></style>
