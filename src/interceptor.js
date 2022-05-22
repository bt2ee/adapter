export default function (axios) {
  axios.interceptors.response.use(null, async error => {
    if (error.code == 'ECONNABORTED' && error.message.indexOf('timeout') != -1) {
      const config = error.config;
      config.__retryCount = config.__retryCount || 0;
      if (config.__retryCount >= config.retry) {
        return Promise.reject(error);
      }
      config.__retryCount += 1;
      const delay = new Promise(function (resolve) {
        setTimeout(function () {
          resolve();
        }, config.retryDelay || 1);
      });
      return delay.then(function () {
        return axios(config);
      });
    } else {
      return Promise.reject(error);
    }
  })
}
