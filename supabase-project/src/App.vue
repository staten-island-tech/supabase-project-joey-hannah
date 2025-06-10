<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav class="nav-bar">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/reviews">Reviews</RouterLink>
      <RouterLink to="/discovery">Discovery</RouterLink>
      <RouterLink to="/posts">Posts</RouterLink>
      <RouterLink to="/profile">Profile</RouterLink>
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
  gap: 1rem;
  padding: 1rem;
  font-size: 1rem;
}

.nav-bar a {
  text-decoration: none;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;
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
