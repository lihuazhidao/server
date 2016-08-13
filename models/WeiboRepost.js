/**
 * Created by zhichaoshen on 2016/8/2.
 */


/*
*
* 微博转发信息
*  username 用户名
*  headerLink 头像链接
*  userId 用户id
*  comment 评论内容
*  forwardsCount 转发数
*  praiseCount 点赞数
* */


var mongoose=require('mongoose');
var weiboRepostSchema=mongoose.Schema({
                                    username:String,
                                    headerLink:String,
                                    userId:String,
                                    comment:String,
                                    forwardsCount:Number,
                                    praiseCount:Number
                                });





var WeiboRepost=mongoose.model('WeiboRepost',weiboRepostSchema);
module.exports=WeiboRepost;