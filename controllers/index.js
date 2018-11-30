const Movie=require('../db/insert');


let fn_login=async (ctx,next)=>{
    ctx.response.body = `
    <form action="/sigin" method="post">
      <p>Name: <input name="name" value="koa"></p>
      <p>Password: <input name="password" value="88888" type="password"></p>
      <p><input type="submit" value="Submit"></p>
    </form>`;
    // console.log(ctx);
}

let fn_signin=async (ctx,next)=>{
    let name =ctx.request.body.name;
    let password=ctx.request.body.password;
    ctx.body={name:name,password:password};
}

let fn_deleMovie=async (ctx,next)=>{
      let data=await  Movie.deleteOne({_id:ctx.request.body._id},function(err){
        if(err){
            ctx.body=err;
            return;
        }
      })
      ctx.body={
        success:true
      }
}

let fn_finddeleMovie=async (ctx,next)=>{
      let data=await  Movie.find({},function(err,data){
        if(err){
            ctx.body=err;
            return;
        }
      })
    ctx.body=data
}

let fn_addMovie=async (ctx,next)=>{
    //存储数据
    let moive = new Movie({
      name: ctx.request.body.name,
      age: ctx.request.body.age,
      time: ctx.request.body.time,
    })
    //保存数据库
    await moive.save(function(err) {
      if (err) {
          console.log('保存失败')
          return;
      }
    });
    ctx.body={
      success:true
    }
}

let fn_updateMovie=async (ctx,next)=>{
      let data=await  Movie.update({_id:ctx.request.body._id},ctx.request.body,function(err,data){
        if(err){
            ctx.body=err;
            return;
        }
      })
      ctx.body={
        success:true
      }
}


let fn_404=async (ctx,next)=>{
  ctx.response.body={
    status:404,
    msg:'文件找不到'
  };
}

let fn_500=async (ctx,next)=>{
  ctx.response.body= ctx.response.body={
    status:404,
    msg:'服务器错误'
  };
}

module.exports={
    'GET /login' :fn_login,
    'POST /sigin':fn_signin,
    'GET /404':fn_404,
    'GET /500':fn_500,
    'POST /findMovie':fn_finddeleMovie,
    'POST /deleMovie':fn_deleMovie,
    'POST /addMovie':fn_addMovie,
    'POST /updateMovie':fn_updateMovie,
}