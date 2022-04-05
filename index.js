export default function(axios) {
  axios.interceptors.response.use(null, async error => {
    if(error.code == 'ECONNABORTED' && error.message.indexOf('timeout')!=-1){
      var config = error.config;
      config.__retryCount = config.__retryCount || 0;
      if(config.__retryCount >= config.retry) {
        return Promise.reject(error);
      }
      config.__retryCount += 1;
      var newHttp = new Promise(function(resolve) {
          setTimeout(function() {
            //console.log('resolve');
            resolve();
          }, config.retryDelay || 1);
      });
      return newHttp.then(function() {
        return axios(config);
      });
    }else{
      return Promise.reject(error);
    }
  })
}
