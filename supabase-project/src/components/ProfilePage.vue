<template>
  <div v-if="loggedIn" class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md space-y-4">
    <form @submit.prevent="createProfilePage" class="space-y-4">
      <div>
        <label for="profile_pic_url" class="block text-sm font-medium text-gray-700 mb-1">
          Profile Picture
        </label>
        <input
          type="file"
          @change="onPicFileSelected"
          class="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
        />
      </div>

      <div>
        <label for="fav_artist_url" class="block text-sm font-medium text-gray-700 mb-1">
          Favorite Artist
        </label>
        <input
          type="file"
          @change="onArtistFileSelected"
          class="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
        />
      </div>

      <div>
        <label for="fav_album_url" class="block text-sm font-medium text-gray-700 mb-1">
          Favorite Album
        </label>
        <input
          type="file"
          @change="onAlbumFileSelected"
          class="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
        />
      </div>

      <div>
        <label for="bio" class="block text-sm font-medium text-gray-700 mb-1">Bio</label>
        <input
          type="text"
          v-model="bio"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label for="lyric" class="block text-sm font-medium text-gray-700 mb-1">Lyrics</label>
        <input
          type="text"
          v-model="lyric"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <button
        type="submit"
        class="w-full py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Save Profile
      </button>
    </form>

    <h1 v-if="successMessage" class="text-green-600 text-sm font-medium mt-4">
      {{ successMessage }}
    </h1>
    <h1 v-if="errorMessage" class="text-red-600 text-sm font-medium mt-4">
      {{ errorMessage }}
    </h1>
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
