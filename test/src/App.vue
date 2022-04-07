<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'
import settle from 'axios/lib/core/settle'

const customAdapter = config =>
  new Promise((resolve, reject) => {
    let retry = 0
    console.log('=== 呵呵呵', config)
    // TODO 判断 xhr 还是 http
    httpAdapter(config).then(response => {
      console.log(response, '=== response')
      settle(resolve, reject, response);
    }).catch(e => {
      console.log(e, '这是error')
        // TODO 判断是否重试
      retry += 1
      if(config.retry && config.retry >= retry) {
        // TODO 重试
      }
    }) ;
  });

const request = axios.create({
  baseURL: 'http://localhost:7600/',
  adapter: customAdapter
});

request('/user-time?ID=12345', {
  headers: {'X-Requested-With': 'XMLHttpRequest'},
  timeout: 10000,
  retry: 3
})

// .then(function (response) {
//   // 处理成功情况
//   console.log(response, 'response 挺正常的');
// }).catch(function (error) {
//   console.log(error, '===== 😁😁', error.config)
//   // 处理错误情况
//   if(error.code === 'ECONNABORTED' && error.message.indexOf('timeout') != -1) {
//     const config = error.config
//     console.log(config, '=config', config.__retryCount);

//     config.__retryCount = config.__retryCount || 0
//     if(config.__retryCount >= config.retry) {
//       return Promise.reject(error)
//     }
//     config.__retryCount += 1
//     return request(config)
//   } else {
//     return Promise.reject(error)
//   }
// })

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
