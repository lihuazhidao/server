var express = require('express');
var router = express.Router();
var WeiboUser=require('../models/WeiboUser');
var _=require('lodash');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Weibo' });
});





//检测是否已经创建用户
router.get("/checkuser/:uid",function(req,res,next){
    var uid=req.params.uid;
    if(!uid){
        res.render('index', { title: 'User' });
    }
    WeiboUser.findOne({
        'uid':uid
    },function (err,exsit) {
        if(err){
            res.send('server err',JSON.stringify(err));
        }
        if(exsit==null){
            res.json({
                msg:"用户未创建",
                state:false
            });
        }else{
            res.json({
                msg:"用户已经创建",
                state:true,
                missing:exsit.missing
            });
        }
    });
});



//微博用户列表
router.get("/users",function(req,res,next){

   WeiboUser.find({},'username img uid ',function(err,users){
       res.render('weibo-users',{title:'微博用户列表',users:users});
   });

});

//微博用户个人


router.get("/user/:uid",function(req,res,next){
        var uid=req.params.uid;

        if(!uid){
            res.redirect("weibo/users");
        }



        var query=WeiboUser.findOne({'uid':uid});

            query.select('username img desc uid fans weibo views missing weiboList')
                .populate({
                    path:'weiboList',
                    options:{
                        limit:10
                    }
                })
                 .exec(function(err,user){
                if(err){
                    res.redirect("weibo/users");
                }


                if(user==null){
                    res.redirect("weibo/users");
                }else{
                    res.render('weibo-user',{title:'微博用户',user:user});
                }


                });


});




//保存微博用户
router.post('/user',function(req,res,next){
    var user=req.body.user;
    //检测是否已经存在用户
    WeiboUser.findOne({
        'uid':user.uid
    },function (err,exsit) {
        if(err){
            res.send('server err',JSON.stringify(err));
        }

        if(exsit==null){
            //未存在用户，则保存用户
            var weiboUser=new WeiboUser(user);
                weiboUser.save(function (err,saveUser) {
                if(err){
                    res.send('server err',JSON.stringify(err));
                }
                res.json({
                    "msg":"用户保存成功",
                    "state":true
                })
            });
        }else{

            //用户已经存在
            res.json({
                "msg":"用户已经存在",
                "state":false
            });
        }
    });
});




//个人微博列表
router.get('/lists',function(req,res,next){
    res.render('index', { title: 'Weibo List' });
});



//个人微博列表
router.post('/lists',function(req,res,next){
var uid=req.body.uid;
var weiboList=req.body.lists;
var currentPage=req.body.currentPage;


    //检测lists 是否为空
    if(weiboList.length==0){
        res.json({
            state:false,
            msg:"无数据"
        });
    }


    //查询该用户
    WeiboUser.findOne({
        'uid':uid
    },function (err,exsit) {

        if(err){
            res.send('server err',JSON.stringify(err));
        }

        if(exsit==null){
            res.json({
                state:false,
                msg:"用户不存在"
            });
        }else{

            //默认是每次10条
            //最后一页不计算丢失数据 ，因为很可能都不足10条
            console.log(currentPage,Math.ceil(exsit.weibo/10))
            if(Math.ceil(exsit.weibo/10)!=currentPage){
                var missing=10-weiboList.length;
                    missing=missing<0?"0":missing;
                exsit.missing=exsit.missing+missing;
            }

            lists=exsit.weiboList.concat(weiboList);
            lists=_.unionBy(lists,"mid");

            if(lists.length===exsit.weiboList.length){
                //无数据添加
                res.json({
                    msg:"success",
                    state:true,
                    allreadyUpdate:true
                });

            }else{
                //有新数据入库
                exsit.weiboList=lists;
                exsit.save(function(err,user){
                    if(err){
                        res.send('server err',JSON.stringify(err));
                    }

                    res.json({
                        msg:"success",
                        state:true,
                        missing:user.missing,
                        collectNum:user.weiboList.length,
                        allreadyUpdate:false
                    });

                });
            }
        }
    });
});



//单条微博

router.get('/piece',function (req,res,next) {
    res.render('index', { title: 'Weibo Piece' });
});
/*


//单条微博
router.post('/piece',function (req,res,next) {
    var weipoPiece=req.body.weibo;
        console.log(req.body.weibo);
    var weibo=new WeiboPiece(weipoPiece);
        weibo.save(function (err,saveWeibo) {
            if(err){
                console.log(err);
                next(err);
            }
            console.log(saveWeibo);
            res.send("save weibo success");
        });
});

//添加评论

router.post('/comment',function (req,res,next) {
   var weiboId=req.body.weiboId;
   var comments=req.body.comments;
    WeiboPiece.findOne({
       "weiboId":weiboId
    },function (err,weibo) {
        if(!err){
            weibo.comments=weibo.comments.concat(comments);
            weibo.save(function (err,saveWeibo) {
                if(!err){
                    res.send("save comment success");
                }else{
                    res.send(err);
                }
            });
        }else{
            res.send("not found weiboid");
        }
    });
});


//添加转发

router.post('/repost',function (req,res,next) {
    var weiboId=req.body.weiboId;
    var reposts=req.body.reposts;
    WeiboPiece.findOne({
        "weiboId":weiboId
    },function (err,weibo) {
        if(!err){
            weibo.reposts=weibo.reposts.concat(reposts);
            weibo.save(function (err,saveWeibo) {
                if(!err){
                    res.send("save repost success");
                }else{
                    res.send(err);
                }
            });
        }else{
            res.send("not found weiboid");
        }
    });
});
*/


module.exports = router;
