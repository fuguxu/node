
const fs=require('fs');
const path = require('path');

let fn_uploadFile=async (ctx,next)=>{
    let file=ctx.request.files.file;
    let oldPath=file.path;
    let newPath=path.join(__dirname,'../uploads/'+file.name);
    await fs.rename(oldPath,newPath,(err,fie)=>{
        if(err){
            console.log(err);
            return;
        }
        console.log(fie)
    });
    ctx.body={
        status:200,
        msg:'success',
        url:newPath
    }
}



module.exports={
    'POST /upload':fn_uploadFile,
}