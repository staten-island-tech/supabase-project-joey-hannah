<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
    <form @submit.prevent="createPost" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
        <label
          class="flex items-center justify-center w-full px-4 py-2 bg-indigo-100 text-indigo-700 border border-indigo-300 rounded-md cursor-pointer hover:bg-indigo-200 transition"
        >
          <span>Select Image</span>
          <input
            type="file"
            @change="onFileSelected"
            class="hidden"
          />
        </label>
      </div>
      <div>
        <label for="caption" class="block text-sm font-medium text-gray-700">Caption</label>
        <input
          type="text"
          v-model="caption"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <button
        type="submit"
        class="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
      >
        Create Post
      </button>
    </form>
    <div class="mt-4 text-center">
      <h1 v-if="successMessage" class="text-green-600 font-semibold">{{ successMessage }}</h1>
      <h1 v-if="errorMessage" class="text-red-600 font-semibold">{{ errorMessage }}</h1>
    </div>
  </div>
</template>



<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabaseClient.js'

const caption = ref('')
const image_url = ref('')
const successMessage = ref('')
const errorMessage = ref('')
const username = ref(null)

onMounted(async () => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    errorMessage.value = 'Not logged in.'
    return
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', user.id)
    .single()

  if (profileError || !profile) {
    errorMessage.value = 'User profile not found.'
    return
  }

  username.value = profile.username
})

async function onFileSelected(event) {
  const avatarFile = event.target.files[0]
  const filePath = `public/${Date.now()}-${avatarFile.name}`

  const { error: uploadError } = await supabase.storage
    .from('post-images')
    .upload(filePath, avatarFile, {
      cacheControl: '3600',
      upsert: false,
    })

  if (uploadError) {
    errorMessage.value = 'Image upload failed: ' + uploadError.message
    return
  }

  const { data: publicUrlData, error: urlError } = supabase.storage
    .from('post-images')
    .getPublicUrl(filePath)

  if (urlError) {
    errorMessage.value = 'Image URL retrieval failed: ' + urlError.message
    return
  }

  image_url.value = publicUrlData.publicUrl
  successMessage.value = 'Image uploaded successfully!'
}

async function createPost() {
  successMessage.value = ''
  errorMessage.value = ''

  if (!username.value) {
    errorMessage.value = 'Username not loaded. Please wait.'
    return
  }

  const { error } = await supabase.from('posts').insert([
    {
      caption: caption.value,
      image_url: image_url.value,
      username: username.value,
    },
  ])

  if (error) {
    console.error('Post error:', error.message)
    errorMessage.value = error.message
  } else {
    successMessage.value = 'Post created successfully!'
    caption.value = ''
    image_url.value = ''
  }
}
</script>
