<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { computed, onMounted, ref } from 'vue'

const auth = useAuthStore()

const showMenu = ref(false)

onMounted(() => {
  if (!auth.user) {
    auth.fetchUser()
  }
})

const username = computed(() => auth.username || null)

function toggleMenu() {
  showMenu.value = !showMenu.value
}

function logout() {
  auth.logout()
  showMenu.value = false
}
</script>

<template>
  <header>
    <nav class="nav-bar">
      <div class="nav-links">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/reviews">Reviews</RouterLink>
        <RouterLink to="/discovery">Discovery</RouterLink>
        <RouterLink to="/posts">Posts</RouterLink>
        <RouterLink to="/profile">Profile</RouterLink>
      </div>

      <div
        v-if="username"
        class="username"
        @click="toggleMenu"
        style="cursor: pointer; position: relative;"
      >
        {{ username }}

        <div v-if="showMenu" class="dropdown-menu">
          <button @click.stop="logout">Logout</button>
        </div>
      </div>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  font-size: 1rem;
  position: relative;
}

.nav-links {
  display: flex;
  gap: 1rem;
  flex-grow: 1;
  justify-content: center;
}

.nav-bar a {
  text-decoration: none;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.username {
  position: absolute;
  right: 2rem;
  font-weight: 600;
  color: #555;
}

.dropdown-menu {
  position: absolute;
  right: 0;
  top: 100%;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 0.5rem;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  z-index: 10;
  min-width: 100px;
}

.dropdown-menu button {
  background: none;
  border: none;
  width: 100%;
  padding: 0.5rem 1rem;
  text-align: left;
  cursor: pointer;
  font-weight: 600;
  color: #333;
}

.dropdown-menu button:hover {
  background-color: #f0f0f0;
}
</style>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  font-family: sans-serif;
}

main {
  padding: 5rem 1rem 1rem;
  min-height: 100vh;
}
</style>
