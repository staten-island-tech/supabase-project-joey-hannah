<template>
  <div v-if="loggedIn" class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <form @submit.prevent="createCard" class="space-y-4">
      <div>
        <label for="cover_image" class="block text-sm font-medium text-gray-700 mb-1"
          >Cover Image</label
        >
        <label
          class="flex items-center justify-center w-full px-4 py-2 bg-indigo-100 text-indigo-700 border border-indigo-300 rounded-md cursor-pointer hover:bg-indigo-200 transition"
          for="cover_image"
        >
          <span>Select Image</span>
          <input type="file" id="cover_image" @change="onFileSelected" class="hidden" />
        </label>
      </div>

      <div>
        <label for="artist" class="block text-sm font-medium text-gray-700 mb-1">Artist</label>
        <input
          type="text"
          id="artist"
          v-model="artist"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          type="text"
          id="title"
          v-model="title"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <div>
        <label for="year" class="block text-sm font-medium text-gray-700 mb-1">Year</label>
        <input
          type="text"
          id="year"
          v-model="year"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>

      <button
        type="submit"
        class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
      >
        Create Card
      </button>
    </form>

    <div class="mt-4 text-center space-y-2">
      <h1 v-if="successMessage" class="text-green-600 font-semibold">{{ successMessage }}</h1>
      <h1 v-if="errorMessage" class="text-red-600 font-semibold">{{ errorMessage }}</h1>
    </div>
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
const review = ref('')
const loggedIn = ref(true)

const cardCreated = ref(false)
const selectedCard = ref(null)

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

  const { data: userData, error: userError } = await supabase.auth.getUser()
  const userId = userData?.user?.id

  console.log('Creating card as user:', userId)

  if (!userId) {
    errorMessage.value = 'User not authenticated.'
    return
  }

  const insertData = {
    artist: artist.value,
    title: title.value,
    year: year.value,
    cover_image: cover_image.value,
    review: '',
    rating: null,
    user_id: userId,
  }

  console.log('Insert data:', insertData)

  const { data, error } = await supabase.from('reviews').insert([insertData]).select()

  if (error) {
    console.error('Insert failed:', error)
    errorMessage.value = 'Insert failed: ' + error.message
    return
  }

  console.log('Insert success:', data)
  selectedCard.value = data[0]
  cardCreated.value = true
  successMessage.value = 'Review card created successfully!'
}
</script>
