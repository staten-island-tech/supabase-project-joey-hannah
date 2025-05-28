<template>
  <div v-if="loggedIn">
    <form @submit.prevent="createCard">
      <label for="image_url">Link to Image</label>
      <input type="file" @change="onFileSelected" />
      <label for="artist">Artist</label>
      <input type="text" v-model="artist" />
      <label for="year">Year</label>
      <input type="text" v-model="year" />
      <button type="submit">Create Card</button>
    </form>
    <form @submit.prevent="writeReview">
      <label for="review">Review</label>
      <input type="text" v-model="review" />
      <button type="submit">Save</button>
    </form>

    <h1 v-if="successMessage">{{ successMessage }}</h1>
    <h1 v-if="errorMessage">{{ errorMessage }}</h1>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../supabaseClient.js'
</script>

<style lang="scss" scoped></style>
