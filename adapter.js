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
      console.log('到这里1111', error, retry)
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
    adapter = require("axios/lib/adapters/xhr")
    console.log(3456)
  } else {
    // For node use HTTP adapter
    console.log(1234)
    adapter = require("axios/lib/adapters/http");
  }
  return adapter;
}

export default retryAdapter
// module.exports = retryAdapter;
// module.exports.default = retryAdapter
