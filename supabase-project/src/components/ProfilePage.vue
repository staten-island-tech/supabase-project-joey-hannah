<template>
  <div v-if="loggedIn">
    <form @submit.prevent="createProfilePage">
      <label for="fav_artist_url">Favorite Artist</label>
      <input type="file" @change="onArtistFileSelected" />

      <label for="profile_pic_url">Profile Picture</label>
      <input type="file" @change="onPicFileSelected" />

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
const profile_pic_url = ref('')
const lyric = ref('')
const bio = ref('')
const successMessage = ref('')
const errorMessage = ref('')
const loggedIn = ref(true)

//3x make storage buckets for the pics uploaded

async function onArtistFileSelected(event) {
  const avatarFile = event.target.files[0]
  const filePath = `public/${Date.now()}-${avatarFile.name}`

  const { data, error } = await supabase.storage
    .from('favartist-image')
    .upload(filePath, avatarFile, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    errorMessage.value = 'Image upload failed: ' + error.message
    return
  }

  const { data: publicUrlData, error: urlError } = supabase.storage
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

  const { data, error } = await supabase.storage
    .from('favalbum-image')
    .upload(filePath, avatarFile, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    errorMessage.value = 'Image upload failed: ' + error.message
    return
  }

  const { data: publicUrlData, error: urlError } = supabase.storage
    .from('favalbum-image')
    .getPublicUrl(filePath)

  if (urlError) {
    errorMessage.value = 'Image URL retrieval failed: ' + urlError.message
    return
  }

  fav_album_url.value = publicUrlData.publicUrl
  successMessage.value = 'Image uploaded successfully!'
}

async function onPicFileSelected(event) {
  const avatarFile = event.target.files[0]
  const filePath = `public/${Date.now()}-${avatarFile.name}`

  const { data, error } = await supabase.storage
    .from('profile-assets')
    .upload(filePath, avatarFile, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    errorMessage.value = 'Image upload failed: ' + error.message
    return
  }

  const { data: publicUrlData, error: urlError } = supabase.storage
    .from('profile-assets')
    .getPublicUrl(filePath)

  if (urlError) {
    errorMessage.value = 'Image URL retrieval failed: ' + urlError.message
    return
  }

  profile_pic_url.value = publicUrlData.publicUrl
  successMessage.value = 'Image uploaded successfully!'
}

async function createProfilePage() {
  successMessage.value = ''
  errorMessage.value = ''

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    errorMessage.value = 'No user logged in.'
    return
  }

  const userId = user.id
  const updateData = {}

  if (fav_artist_url.value) updateData.fav_artist = fav_artist_url.value
  if (fav_album_url.value) updateData.fav_album = fav_album_url.value
  if (profile_pic_url.value) updateData.profile_pic = profile_pic_url.value
  if (lyric.value) updateData.lyric = lyric.value
  if (bio.value) updateData.bio = bio.value

  if (Object.keys(updateData).length === 0) {
    errorMessage.value = 'No new information to update.'
    return
  }

  console.log('Updating user with ID:', user.id)

  const { data, error } = await supabase
    .from('profiles')
    .update(updateData)
    .eq('id', userId)
    .select()

  if (updateError) {
    console.error('Update error:', updateError)
  } else {
    successMessage.value = 'Profile created successfully!'
    fav_artist_url.value = ''
    fav_album_url.value = ''
    profile_pic_url.value = ''
    lyric.value = ''
    bio.value = ''
  }
}
</script>
