<template>
  <div>
    <form action="submit" @submit.prevent="">
      <label for="username"> Username</label>
      <input type="text" v-model="username" />
      <label for="username"> Email</label>
      <input type="text" v-model="email" />
      <label for="password"> Password</label>
      <input type="text" v-model="password" />
    </form>
    <h2 v-if="loggedIn">Hello Peter</h2>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import supabase from '../supabase'

const username = ref('')
const email = ref('')
const password = ref('')

const createUser = async () => {
  const { data, error } = await supabase.auth.signUp({
    username: '',
    email: '',
    password: '',
  })

  const { error } = await supabase
    .from('Profile')
    .insert([{ username: username.value, email: email.value, password: password.value }])
}
</script>

<style lang="scss" scoped></style>
