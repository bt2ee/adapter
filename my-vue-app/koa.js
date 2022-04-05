var Koa = require('koa' );
var route = require('koa-route');
const app = new Koa();
var cors = require('koa-cors');

const delay = (time) => {
  return new Promise((res, reject) => {
    setTimeout(() => {
      res()
    }, time)
  })
}

app.use(cors());

app.use(route.get('/', function() {
  this.body = { msg: 'Hello World!' };
}));

app.use(route.get('/user', function() {
  console.log('/user')
  this.body = { msg: 'user' };
}));

app.use(route.get('/user-time', async function() {
  console.log('/user-time')
  await delay(12000)
  this.body = { msg: 'user' };
}));

app.listen(7600, () => {
  console.log('监听 7600')
});
