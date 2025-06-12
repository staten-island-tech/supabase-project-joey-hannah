<template>
  <div class="user-profile-page">
    <button @click="goBack" class="back-button">← Back to Discovery</button>

    <div v-if="loading">Loading profile...</div>

    <div v-else>
      <div v-if="profile">
        <img :src="profile.profile_pic" alt="Profile Picture" class="profile-pic" />
        <h2>{{ profile.username }}</h2>
        <p>{{ profile.bio }}</p>

        <h3>Posts by {{ profile.username }}:</h3>
        <div v-if="posts.length === 0">No posts found.</div>
        <div v-else class="posts-grid">
          <div v-for="post in posts" :key="post.id" class="post">
            <img :src="post.image_url" alt="Post Image" />
            <p>{{ post.caption }}</p>
          </div>
        </div>

        <h3>Reviews by {{ profile.username }}:</h3>
        <div v-if="reviews.length === 0">NO REVIEWS FOUND</div>
        <div v-else class="reviews-grid">
          <div v-for="review in reviews" :key="review.id" class="review">
            <img :src="review.cover_image" />
            <h2>{{ review.title }} ({{ review.year }})</h2>
            <p>{{ review.artist }}</p>
            <p>{{ review.rating }}</p>
            <p>{{ review.review }}</p>
          </div>
        </div>
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
    .select()
    .eq('user_id', userId)

  if (postsError) {
    console.error('Error fetching posts:', postsError)
    posts.value = []
  } else {
    posts.value = postsData
  }

  const { data: reviewsData, error: reviewsError } = await supabase
    .from('reviews')
    .select()
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

<style scoped>
.user-profile-page {
  max-width: 800px;
  margin: auto;
  padding: 2rem 1rem;
}

.back-button {
  margin-bottom: 1rem;
  cursor: pointer;
}

.profile-pic {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 1rem;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}

.post img {
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
}
</style>
