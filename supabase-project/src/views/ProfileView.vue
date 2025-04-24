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
<<<<<<< HEAD
import { ref, onMounted } from 'vue'
import { supabase } from '../supabaseClient.js'
=======
import { ref, onMounted } from 'vue';
import { supabase } from '../supabaseClient.js'; 
>>>>>>> main

const profiles = ref([]);

async function getProfiles() {
<<<<<<< HEAD
  const { data } = await supabase.from('profiles').select()
  profiles.value = data
=======
  const { data } = await supabase.from('profiles').select(); 
   profiles.value = data; 
>>>>>>> main
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