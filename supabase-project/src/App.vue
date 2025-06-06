<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="You did it!" />
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/reviews">Reviews</RouterLink>
        <RouterLink to="/discovery">Discovery</RouterLink>
        <RouterLink to="/posts">Posts</RouterLink>
        <RouterLink to="/profile">Profile</RouterLink>
      </nav>
      <RouterView />
    </div>
  </header>
</template>

<style scoped>
header {
  line-height: 1.5;
  height: 100vh;
  width: 100%; /* Stretches to parent width */
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden; /* Prevents internal overflow */
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

<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  display: flex; /* Flex container */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  overflow: hidden; /* Prevent scrollbars */
}
</style>
