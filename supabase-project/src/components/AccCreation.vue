<template>
  <div class="create-acc">
    <h2>Create Account</h2>
    <form @submit.prevent="createUser">
      <label for="username">Username</label>
      <input type="text" v-model="username" />

      <label for="email">Email</label>
      <input type="text" v-model="email" />

      <label for="password">Password</label>
      <input type="password" v-model="password" />

      <button type="submit">Create Account</button>
    </form>

    <h2 v-if="loggedIn">Welcome, {{ username }}!</h2>
    <p v-if="errorMessage">{{ errorMessage }}</p>
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

const createUser = async () => {
  errorMessage.value = ''

  const { data: userData, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  })

  if (error) {
    errorMessage.value = 'Signup failed: ' + error.message
    return
  }

  const user = userData?.user

  if (user) {
    const { error: insertError } = await supabase.from('profiles').insert([
      {
        email: email.value,
        username: username.value,
        id: user.id,
      },
    ])

    if (insertError) {
      errorMessage.value = 'Profile insert failed: ' + insertError.message
    } else {
      loggedIn.value = true
    }
  }
  loggedIn.value = true
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 300px;
  padding: 2px;
}
</style>
