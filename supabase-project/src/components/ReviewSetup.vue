<template>
  <div v-if="loggedIn">
    <form @submit.prevent="createCard">
      <label for="cover_image">Cover Image</label>
      <input type="file" @change="onFileSelected" />
      <label for="artist">Artist</label>
      <input type="text" v-model="artist" />
      <label for="title">Title</label>
      <input type="text" v-model="title" />
      <label for="year">Year</label>
      <input type="text" v-model="year" />
      <button type="submit">Create Card</button>
    </form>
    <div v-if="cardCreated">
      <form @submit.prevent="writeReview">
        <label for="review">Review</label>
        <input type="text" v-model="review" />
        <button type="submit">Save</button>
      </form>
    </div>

    <h1 v-if="successMessage">{{ successMessage }}</h1>
    <h1 v-if="errorMessage">{{ errorMessage }}</h1>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../supabaseClient.js'

const cover_image = ref('')
const successMessage = ref('')
const errorMessage = ref('')
const artist = ref('')
const title = ref('')
const year = ref('')
const loggedIn = ref(true)
const cardCreated = ref(false)

async function onFileSelected(event) {
  const avatarFile = event.target.files[0]
  const filePath = `public/${Date.now()}-${avatarFile.name}`

  const { data, error } = await supabase.storage
    .from('reviews-assets')
    .upload(filePath, avatarFile, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    errorMessage.value = 'Image upload failed: ' + error.message
    return
  }

  const { data: publicUrlData, error: urlError } = supabase.storage
    .from('reviews-assets')
    .getPublicUrl(filePath)

  if (urlError) {
    errorMessage.value = 'Image URL retrieval failed: ' + urlError.message
    return
  }

  cover_image.value = publicUrlData.publicUrl
  successMessage.value = 'Image uploaded successfully!'
}

async function createCard() {
  successMessage.value = ''
  errorMessage.value = ''

  const { error } = await supabase.from('reviews').insert([
    {
      artist: artist.value,
      title: title.value,
      year: year.value,
      cover_image: cover_image.value,
    },
  ])

  if (error) {
    console.error('Post error:', error.message)
    errorMessage.value = error.message
  } else {
    successMessage.value = 'Review card created successfully!'
  }
}
</script>

<style lang="scss" scoped></style>
