<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import axios from 'axios'
import retryAdapter from './../../adapter.js'

axios.interceptors.request.use((config) => {
  console.log('axios123😁😁rrrr')
  return config
  }, async error => {
      console.log('axios123😁😁')
    })

axios.defaults.adapter = retryAdapter

// const request = axios.create({
  // baseURL: 'http://localhost:7600/',
//   adapter: retryAdapter
// });

axios.get('/user-time?ID=12345', {
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  baseURL: 'http://localhost:7600/',
  timeout: 10000,
  maxRetry: 3
})


</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
