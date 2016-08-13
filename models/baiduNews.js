var mongoose=require('mongoose');
var baiduNewsSchema=mongoose.Schema({
                                      abs:String,
                                      author:String,
                                      imgUrl:String,
                                      publicTime:Number,
                                      sortTime:Number,
                                      title:String,
                                      url:String
                                });
  //ways
      baiduNewsSchema.methods.time=function(){
        return new Date(this.publicTime*1000);
      }
var BaiduNews=mongoose.model("BaiduNews",baiduNewsSchema);



module.exports=BaiduNews;
