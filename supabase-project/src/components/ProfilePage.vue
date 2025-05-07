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

const fav_artist_file = ref(null)
const fav_album_file = ref(null)
const lyric = ref('')
const bio = ref('')
const successMessage = ref('')
const errorMessage = ref('')
const loggedIn = ref(true)

function onArtistFileSelected(e) {
  fav_artist_file.value = e.target.files[0]
}

function onAlbumFileSelected(e) {
  fav_album_file.value = e.target.files[0]
}

async function uploadFile(path, file) {
  const { data, error } = await supabase.storage.from('profile-assets').upload(path, file)

  if (error) throw error
  return data.path
}

async function createProfilePage() {
  successMessage.value = ''
  errorMessage.value = ''

  let favArtistUrl = ''
  let favAlbumUrl = ''

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError) throw authError
    if (!user) throw new Error('User not logged in.')

    if (fav_artist_file.value) {
      const path_artist = `fav_artist_${Date.now()}_${fav_artist_file.value.name}`
      favArtistUrl = await uploadFile(path_artist, fav_artist_file.value)
    }

    if (fav_album_file.value) {
      const path_album = `fav_album_${Date.now()}_${fav_album_file.value.name}`
      favAlbumUrl = await uploadFile(path_album, fav_album_file.value)
    }

    const { error } = await supabase
      .from('profiles')
      .update({
        fav_artist: favArtistUrl,
        fav_album: favAlbumUrl,
        lyric: lyric.value,
        bio: bio.value,
      })
      .eq('id', user.id)

    if (error) throw error

    successMessage.value = 'Profile saved successfully!'
  } catch (err) {
    console.error(err)
    errorMessage.value = err.message
  }
}
</script>
