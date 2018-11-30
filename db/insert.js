let mongoose = require("mongoose");
let DB_URL='mongodb://localhost/nodeTest';

// 连接字符串格式为mongodb://主机/数据库名
mongoose.connect(DB_URL,{
    useNewUrlParser: true,
});

let Schema = mongoose.Schema;
//骨架模版
let movieSchema = new Schema({
    name   : String,
    age    : Number,
    time : Date,
})
//模型
let Movie = mongoose.model('Movie', movieSchema);

module.exports=Movie;
