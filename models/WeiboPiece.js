/**
 * Created by zhichaoshen on 2016/8/2.
 */
/*
* 单条微博信息
* */

/*
 *
 * 单条微博
 *  username 用户名
 *  userid 用户id
 *  headerLink 头像链接
 *  userLink 用户主页链接
 *  createAt 发博时间
 *  content 微博内容
 *  source 来源
 *  weiboId 微博ID
 *  weiboLink 微博链接
 *  forwardsCount 转发数
 *  commentsCount 评论数
 *  praiseCount 点赞数
 *  comments 评论
 *  reposts 转发
 */



var mongoose=require('mongoose');


/*微博转发*/
var weiboRepostSchema=mongoose.Schema({
    username:String,
    headerLink:String,
    userId:String,
    comment:String,
    forwardsCount:Number,
    praiseCount:Number
});

/*微博评论*/

var weiboCommentSchema=mongoose.Schema({
    username:String,
    headLink:String,
    userId:String,
    comment:String,
    commentsCount:Number,
    praiseCount:Number
});


/*单条微博*/
var weiboPieceSchema=mongoose.Schema({
        id:String,
        username:String,
        userId:String,
        headerLink:String,
        userLink:String,
        createAt:String,
        content:String,
        source:String,
        weiboId:String,
        weiboLink:String,
        forwardsCount:Number,
        commentsCount:Number,
        praiseCount:Number,
        comments:[weiboCommentSchema],
        reposts:[weiboRepostSchema]
});



var WeiboPiece=mongoose.model("WeiboPiece",weiboPieceSchema);
    module.exports=  WeiboPiece;