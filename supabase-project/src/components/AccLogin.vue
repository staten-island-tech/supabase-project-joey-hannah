<template>
  <div class="min-h-screen bg-indigo-100 flex items-center justify-center p-6">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md h-[500px]">
      <h2 class="text-2xl font-bold text-indigo-700 mb-6 text-center">Or Log In</h2>
      <form @submit.prevent="loginUser" class="space-y-4">
        <div>
          <label class="block text-indigo-700 font-semibold mb-1" for="username">Username</label>
          <input
            type="text"
            v-model="username"
            class="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label class="block text-indigo-700 font-semibold mb-1" for="email">Email</label>
          <input
            type="email"
            v-model="email"
            class="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label class="block text-indigo-700 font-semibold mb-1" for="password">Password</label>
          <input
            type="password"
            v-model="password"
            class="w-full px-4 py-2 border border-indigo-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <button
          type="submit"
          class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          Login
        </button>

        <h2 v-if="loggedIn" class="text-indigo-700 font-semibold text-center mt-4">
          Welcome, {{ username }}!
        </h2>
        <p v-if="errorMessage" class="text-red-600 text-center">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../supabaseClient.js'

const username = ref('')
const email = ref('')
const password = ref('')
const loggedIn = ref(false)
const errorMessage = ref('')

const loginUser = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    username: username.value,
    email: email.value,
    password: password.value,
  })
  if (error) {
    errorMessage.value = 'Login failed: ' + error.message
    return
  }
  loggedIn.value = true
}
</script>

<style scoped></style>
