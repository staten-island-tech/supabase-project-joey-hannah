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
  <header class="fixed top-0 left-0 w-full bg-white z-[1000] shadow-sm">
    <nav class="flex justify-center items-center gap-4 px-8 py-4 relative text-base">
      <div class="flex gap-4 flex-grow justify-center">
        <RouterLink to="/" class="text-gray-800 hover:bg-gray-100 rounded px-3 py-1 transition">
          Home
        </RouterLink>
        <RouterLink to="/reviews" class="text-gray-800 hover:bg-gray-100 rounded px-3 py-1 transition">
          Reviews
        </RouterLink>
        <RouterLink to="/discovery" class="text-gray-800 hover:bg-gray-100 rounded px-3 py-1 transition">
          Discovery
        </RouterLink>
        <RouterLink to="/posts" class="text-gray-800 hover:bg-gray-100 rounded px-3 py-1 transition">
          Posts
        </RouterLink>
        <RouterLink to="/profile" class="text-gray-800 hover:bg-gray-100 rounded px-3 py-1 transition">
          Profile
        </RouterLink>
      </div>

      <div
        v-if="username"
        @click="toggleMenu"
        class="font-semibold text-gray-600 cursor-pointer absolute right-8"
      >
        {{ username }}

        <div
          v-if="showMenu"
          class="absolute right-0 top-full mt-2 bg-white border border-gray-300 rounded shadow-md min-w-[100px] z-10"
        >
          <button
            @click.stop="logout"
            class="w-full text-left px-4 py-2 font-semibold text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  </header>

  <main class="pt-20 px-4 min-h-screen">
    <RouterView />
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
