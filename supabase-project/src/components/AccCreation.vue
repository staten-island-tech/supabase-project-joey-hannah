<template>
  <div>
    <form action="submit" @submit.prevent="createUser">
      <label for="username"> Username</label>
      <input type="text" v-model="username" />
      <label for="username"> Email</label>
      <input type="text" v-model="email" />
      <label for="password"> Password</label>
      <input type="text" v-model="password" />
      <button type="submit">Create Account</button>
    </form>
    <h2 v-if="loggedIn">Hello, {{ username }}! You are logged in.</h2>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import supabase from '@supabase/supabase-js'

const username = ref('')
const email = ref('')
const password = ref('')
const loggedIn = ref(false)

const createUser = async () => {
  const { user } = await supabase.auth.signUp({
    username: '',
    email: '',
    password: '',
  })

  const { data } = await supabase
    .from('Profile')
    .insert([{ username: username.value, email: email.value, password: password.value }])
}
</script>

<style lang="scss" scoped></style>
