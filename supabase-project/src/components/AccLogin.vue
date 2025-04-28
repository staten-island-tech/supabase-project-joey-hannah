<template>
  <div class="acc-login">
    <h2>Or Log In</h2>
    <form @submit.prevent="loginUser">
      <label for="email">Email</label>
      <input type="text" v-model="email" />

      <label for="password">Password</label>
      <input type="password" v-model="password" />

      <button type="submit">Login</button>
      <h2 v-if="loggedIn">Welcome, {{ username }}!</h2>
      <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
    </form>
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

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 300px;
  padding: 2px;
}
</style>
