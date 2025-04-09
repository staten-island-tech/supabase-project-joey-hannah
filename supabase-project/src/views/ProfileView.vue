<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabaseClient.js'

const profiles = ref([])

async function getProfiles() {
  const { data } = await supabase.from('profiles').select()
  profiles.value = data
}

onMounted(() => {
  getProfiles()
})
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
