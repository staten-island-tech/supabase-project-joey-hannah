<template>
  <div>
    <h1 v-if="profiles.length">Profiles:</h1>
      <li v-for="profile in profiles" :key="profile.id">
        <h2>{{ profile.username }}</h2>
        <p>{{ profile.name }}</p>
        <img :src="profile.profile_pic" alt="Profile Picture"/>
      </li>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabaseClient.js'

const profiles = ref([]);

async function getProfiles() {
  const { data } = await supabase.from('profiles').select()
  profiles.value = data
}

onMounted(() => {
  getProfiles();
});
</script>

<style scoped>
img {
  border-radius: 50%;
  margin-top: 10px;
}
</style>