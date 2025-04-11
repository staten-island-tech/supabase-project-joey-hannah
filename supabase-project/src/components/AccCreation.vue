<template>
  <div>
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
    <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../supabaseClient'

const username = ref('')
const email = ref('')
const password = ref('')
const loggedIn = ref(false)
const errorMessage = ref('')

const createUser = async () => {
  errorMessage.value = ''

  const { data, error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  })

  if (error) {
    errorMessage.value = 'Signup failed: ' + error.message
    return
  }

  const user = data.user

  if (user) {
    const { error: insertError } = await supabase.from('Profile').insert([
      {
        id: user.id,
        username: username.value,
        email: email.value,
      },
    ])

    if (insertError) {
      errorMessage.value = 'Insert failed: ' + insertError.message
      return
    }

    loggedIn.value = true
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 300px;
}
</style>
