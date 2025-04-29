<template>
  <div v-if="loggedIn">
    <form @submit.prevent="createProfilePage">
      <label for="fav_artist">Favorite Artist</label>
      <input type="image" v-model="fav_artist" />

      <label for="lyric">Lyrics</label>
      <input type="text" v-model="lyric" />
      <label for="fav_album">Favorite Album</label>
      <input type="image" v-model="fav_album" />

      <label for="lyric">Bio</label>
      <input type="text" v-model="bio" />

      <button type="submit">Save Profile</button>
    </form>
    <h1 v-if="successMessage">{{ successMessage }}</h1>
    <h1 v-if="errorMessage">{{ errorMessage }}</h1>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../supabaseClient.js'

const fav_artist = ref('')
const fav_album = ref('')
const lyric = ref('')
const bio = ref('')
const successMessage = ref('')
const errorMessage = ref('')
const loggedIn = ref(true)

async function createProfilePage() {
  successMessage.value = ''
  errorMessage.value = ''

  const { error } = await supabase.from('profile').insert([
    {
      fav_artist: fav_artist.value,
      lyric: lyric.value,
      fav_album: fav_album.value,
      bio: bio.value,
    },
  ])

  if (error) {
    console.error('Error:', error.message)
    errorMessage.value = error.message
  } else {
    successMessage.value = 'Post created successfully!'
    image_url.value = ''
    caption.value = ''
  }
}
</script>
