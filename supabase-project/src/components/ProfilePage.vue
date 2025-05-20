<template>
  <div v-if="loggedIn">
    <form @submit.prevent="createProfilePage">
      <label for="fav_artist_url">Favorite Artist</label>
      <input type="file" @change="onArtistFileSelected" />

      <label for="lyric">Lyrics</label>
      <input type="text" v-model="lyric" />
      <label for="fav_album_url">Favorite Album</label>
      <input type="file" @change="onAlbumFileSelected" />

      <label for="bio">Bio</label>
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

const fav_artist_url = ref('')
const fav_album_url = ref('')
const lyric = ref('')
const bio = ref('')
const successMessage = ref('')
const errorMessage = ref('')
const loggedIn = ref(true)

async function onArtistFileSelected(event) {
  const avatarFile = event.target.files[0]
  const filePath = `public/${Date.now()}-${avatarFile.name}`

  const { data, error } = await supabase
    .storage
    .from('favartist-image')
    .upload(filePath, avatarFile, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) {
    errorMessage.value = 'Image upload failed: ' + error.message
    return
  }

  const { data: publicUrlData, error: urlError } = supabase
    .storage
    .from('favartist-image')
    .getPublicUrl(filePath)

  if (urlError) {
    errorMessage.value = 'Image URL retrieval failed: ' + urlError.message
    return
  }

fav_artist_url.value = publicUrlData.publicUrl
  successMessage.value = 'Image uploaded successfully!'
}

async function onAlbumFileSelected(event) {
  const avatarFile = event.target.files[0]
  const filePath = `public/${Date.now()}-${avatarFile.name}`

  const { data, error } = await supabase
    .storage
    .from('favalbum-image')
    .upload(filePath, avatarFile, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) {
    errorMessage.value = 'Image upload failed: ' + error.message
    return
  }

  const { data: publicUrlData, error: urlError } = supabase
    .storage
    .from('favalbum-image')
    .getPublicUrl(filePath)

  if (urlError) {
    errorMessage.value = 'Image URL retrieval failed: ' + urlError.message
    return
  }

fav_album_url.value = publicUrlData.publicUrl
  successMessage.value = 'Image uploaded successfully!'
}

async function createPost() {
  successMessage.value = ''
  errorMessage.value = ''

  const { error } = await supabase
    .from('profiles')
    .update([
      {
      fav_artist_url: fav_artist_url.value,
      fav_album_url: fav_album_url.value,
      lyric: lyric.value,
      bio: bio.value,
      }
    ])

  if (error) {
    console.error("Post error:", error.message)
    errorMessage.value = error.message
  } else {
    successMessage.value = 'Post created successfully!'
    fav_artist_url.value = ''
    fav_album_url.value = ''
    lyric.value = ''
    bio.value = ''
  }
}
</script>
