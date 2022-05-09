import xhrRequest from 'axios/lib/adapters/xhr'
import httpRequest from 'axios/lib/adapters/http'

function Defer() {
  this.promise = new Promise((resolve, reject) => {
    this.resolve = resolve;
    this.reject = reject;
  })
}

function retryAdapter(config){
  const adapter = getDefaultAdapter()
  const defer = new Defer()
  const maxRetry = config.maxRetry || MAX_TRY;
  const retry = config.retry || 0;

  const request = adapter(config)

  request.then(response => {
    defer.resolve(response)
  }).catch(error =>{
    if(error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !==- 1 && retry < maxRetry){
      config.retry = retry + 1;
      retryAdapter(config)
    } else {
      defer.resolve(error);
    }
  })

  return defer.promise
}

const getDefaultAdapter = () => {
  let adapter
  if(typeof XMLHttpRequest !== "undefined") {
    adapter = xhrRequest
  } else {
    // For node use HTTP adapter
    adapter = httpRequest
  }
  return adapter;
}

export default retryAdapter
