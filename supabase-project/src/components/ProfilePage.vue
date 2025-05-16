<template>
  <div v-if="loggedIn">
    <form @submit.prevent="createProfilePage">
      <label for="fav_artist">Favorite Artist</label>
      <input type="file" @change="onArtistFileSelected" />

      <label for="lyric">Lyrics</label>
      <input type="text" v-model="lyric" />
      <label for="fav_album">Favorite Album</label>
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
  const artistFile = event.target.files[0]
  const filePath = `fav_artist_${Date.now()}-${artistFile.name}`

  const { error: uploadError } = await supabase
    .storage
    .from('favartist-image')
    .upload(filePath, artistFile, {
      cacheControl: '3600',
      upsert: false
    })

  if (uploadError) {
    errorMessage.value = 'Artist image upload failed: ' + uploadError.message
    return
  }

  const { data: publicUrlData, error: urlError } = supabase
    .storage
    .from('favartist-image')
    .getPublicUrl(filePath)

  if (urlError) {
    errorMessage.value = 'Artist image URL retrieval failed: ' + urlError.message
    return
  }

  fav_artist_url.value = publicUrlData.publicUrl
  successMessage.value = 'Artist image uploaded successfully!'
}

async function onAlbumFileSelected(event) {
  const albumFile = event.target.files[0]
  const filePath = `fav_album_${Date.now()}-${albumFile.name}`

  const { error: uploadError } = await supabase
    .storage
    .from('favalbum-image')
    .upload(filePath, albumFile, {
      cacheControl: '3600',
      upsert: false
    })

  if (uploadError) {
    errorMessage.value = 'Album image upload failed: ' + uploadError.message
    return
  }

  const { data: publicUrlData, error: urlError } = supabase
    .storage
    .from('favalbum-image')
    .getPublicUrl(filePath)

  if (urlError) {
    errorMessage.value = 'Album image URL retrieval failed: ' + urlError.message
    return
  }

  fav_album_url.value = publicUrlData.publicUrl
  successMessage.value = 'Album image uploaded successfully!'
}

async function createProfilePage() {
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError) throw authError
    if (!user) throw new Error('User not logged in.')

    const { error } = await supabase
      .from('profiles')
      .update({
        fav_artist: fav_artist_url.value,
        fav_album: fav_album_url.value,
        lyric: lyric.value,
        bio: bio.value,
      })
      .eq('id', user.id)

    if (error) {
      errorMessage.value = error.message
    } else {
      successMessage.value = 'Profile saved successfully!'
      lyric.value = ''
      bio.value = ''
      fav_artist_url.value = ''
      fav_album_url.value = ''
    }
  } catch (err) {
    console.error(err)
    errorMessage.value = err.message
  }
}
</script>
