const Koa=require('koa');
const koaBody=require('koa-body');
const koaStatic = require('koa-static');
const cors = require('koa2-cors');
const path = require('path');
const controller = require('./controller');
const app = new Koa();
const socketIo = require('socket.io');
require('./db/insert.js');

app.use(cors({
    origin: function (ctx) {
        // if (ctx.url === '/test') {
        //     return "*"; // 允许来自所有域名请求
        // }
        return '*'; // 这样就能只允许 http://localhost:8002 这个域名的请求了
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

app.use(async (ctx,next)=>{
    await next();//先去执行下面的路由中间件 再根据判断状态判断
    let status=ctx.status;
    switch(status){
        case 404:
        ctx.redirect('/404');
        return;
        case 500:
        ctx.redirect('/500');
        return;
    }
})

app.use(koaBody({
    multipart:true, // 支持文件上传
    // encoding:'gzip',
    formidable:{
      uploadDir:path.join(__dirname,'uploads/'), // 设置文件上传目录
      keepExtensions: true,    // 保持文件的后缀
      maxFieldsSize:2 * 1024 * 1024, // 文件上传大小
      onFileBegin:(name,file) => { // 文件上传前的设置
        // console.log(`name: ${name}`);
        // console.log(file);
      },
    }
}));

const staticPath = './www';

app.use(koaStatic(
    path.join(__dirname,staticPath)
))

app.use(controller());



const server = require('http').createServer(app.callback()).listen(8001);
const io = socketIo.listen(server);
// app.listen(8001);
io.on('connection',function(socket){ 
    socket.on('message', (data)=>{
        console.log('客户端有消息过来:'+data);
        io.emit('message2',data);
    });
    console.log('有客户端连接');
});

console.log('server is running at port 8001');