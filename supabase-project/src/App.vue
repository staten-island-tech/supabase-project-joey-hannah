<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(
  'https://apmxcwvtfsozwvhqdlpt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwbXhjd3Z0ZnNvend2aHFkbHB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3MDE0OTEsImV4cCI6MjA1OTI3NzQ5MX0.J6s8woR1FqFj9CMyUXHZQOvBGceSmCeJ5VLQRhw2sx8',
)
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
<RouterView>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/reviews">Reviews</RouterLink>
        <RouterLink to="/discovery">Discovery</RouterLink>
        <RouterLink to="/posts">Posts</RouterLink>
        <RouterLink to="/profile">Profile</RouterLink>
      </nav>
        </RouterView>
    </div>
  </header>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
