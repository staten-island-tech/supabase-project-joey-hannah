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
  <header class="fixed top-0 left-0 w-full bg-white z-50 shadow-sm h-16 flex items-center px-8">
    <nav class="flex justify-center items-center gap-6 flex-grow relative">
      <RouterLink to="/" class="text-gray-800 hover:text-indigo-600 px-3 py-1 rounded transition">
        Home
      </RouterLink>
      <RouterLink to="/reviews" class="text-gray-800 hover:text-indigo-600 px-3 py-1 rounded transition">
        Reviews
      </RouterLink>
      <RouterLink to="/discovery" class="text-gray-800 hover:text-indigo-600 px-3 py-1 rounded transition">
        Discovery
      </RouterLink>
      <RouterLink to="/posts" class="text-gray-800 hover:text-indigo-600 px-3 py-1 rounded transition">
        Posts
      </RouterLink>
      <RouterLink to="/profile" class="text-gray-800 hover:text-indigo-600 px-3 py-1 rounded transition">
        Profile
      </RouterLink>

      <div
        v-if="username"
        @click="toggleMenu"
        class="absolute right-0 top-1/2 -translate-y-1/2 font-semibold text-gray-600 cursor-pointer select-none"
      >
        {{ username }}

        <div
          v-if="showMenu"
          class="absolute right-0 mt-10 bg-white border border-gray-300 rounded shadow-lg min-w-[120px] z-50"
        >
          <button
            @click.stop="logout"
            class="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  </header>

  <main class="pt-16 min-h-[calc(100vh-4rem)] px-4 flex flex-col">
    <RouterView class="flex-grow" />
  </main>
</template>

<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  font-family: sans-serif;
}
</style>
