//个人微博列表
var mongoose=require('mongoose');

var pictureSchema=mongoose.Schema({
        pid:String,
        url:String,
        size:String,
        geo:{}
});

var weiboIndividualSchema=mongoose.Schema({
                                       appid:Number,
                                       bid:String,
                                       mid:String,
                                       id:Number,
                                       attitudes_count: Number,
                                       comments_count: Number,
                                       reposts_count:Number,
                                       created_at:String,
                                       created_timestamp: Number,
                                       text:String,
                                       source:String,
                                       pic_ids:[String],
                                       pics:[pictureSchema],
                                       comments:[],//评论内容
                                       reposts:[],//转发内容,
										hasCollectComment:Number,
										hasCollectRepost:Number,
										missingComment:Number,
										missingRepost:Number

                                });



module.exports= weiboIndividualSchema;
