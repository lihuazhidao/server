/**
 * Created by zhichaoshen on 2016/8/2.
 */


/*
*
* 微博评论信息
*  username 用户名
*  headLink 头像链接
*  userId 用户主页链接
*  comment 评论内容
*  commentsCount 评论数
*  praiseCount 点赞数
*
* */

var mongoose=require('mongoose');
var weiboCommentSchema=mongoose.Schema({
                                        username:String,
                                        headLink:String,
                                        userId:String,
                                        comment:String,
                                        commentsCount:Number,
                                        praiseCount:Number
                                    });


var WeiboComment=mongoose.model('WeiboComment',weiboCommentSchema);
module.exports=WeiboComment;