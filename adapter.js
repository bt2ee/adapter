import xhrRequest from 'axios/lib/adapters/xhr'
import httpRequest from 'axios/lib/adapters/http'

function Defer() {
  this.promise = new Promise((resolve, reject) => {
    this.resolve = resolve;
    this.reject = reject;
  })
}

function retryAdapter(config){
  console.log(1234, config)
  const adapter = getDefaultAdapter()
  const defer = new Defer()
  var maxRetry = config.maxRetry || MAX_TRY;
  var retry = config.retry || 0;
  console.log(22345, config)

  const request = adapter(config)

  request.then(response => {
    console.log(response, '=== response')
    defer.resolve(response)
  }).catch(error =>{
    if(error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !==- 1 && retry < maxRetry){
      config.retry = retry + 1;
      console.log(22345)
      // retry += 1
      retryAdapter(config)
    } else {
      console.log(44567)
      defer.resolve(error);
    }
  })

  return defer.promise
}

const getDefaultAdapter = () => {
  let adapter
  if(typeof XMLHttpRequest !== "undefined") {
    adapter = xhrRequest
    console.log(3456)
  } else {
    // For node use HTTP adapter
    console.log(1234)
    adapter = httpRequest
  }
  return adapter;
}

export default retryAdapter
