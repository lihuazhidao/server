/**
 * Created by zhichaoshen on 2016/8/5.
 */

var weiboIndividualSchema=require('./WeiboIndividual');


var q=require('q');
var mongoose=require('mongoose');
    mongoose.Promise=q.Promise;

var weiboUserSchema=mongoose.Schema({
    uid:String,//用户uid
    img:String,
    desc:String,//用户简介
    username:String,//用户名
    missing:Number,//采集丢失数量,
    fans:Number,//粉丝量
    weibo:Number,//微博数量
    views:Number,//关注量,
    weiboList:[weiboIndividualSchema],//发布微博
    fansList:[],//粉丝列表
    viewsList:[]//关注者列表
});


var WeiboUser=mongoose.model('WeiboUser',weiboUserSchema);

module.exports= WeiboUser;