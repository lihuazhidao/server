var express = require('express');
var router = express.Router();
var BaiduNews=require('../models/baiduNews');


/* GET home page. */
router.get('/', function(req, res, next) {

      BaiduNews.find({})
                .limit(10)
                .exec(function(err,news){
                  if(err){
                    next(err);
                  }
                  res.render('baidu', { title: 'Baidu News',news:news });
                })

});


router.post('/',function(req,res,next){
  var newsList=req.body.list;
      if(newsList.length){
        for(var i=0;i<newsList.length;i++){
           var news=new BaiduNews(newsList[i]);
               news.save(function(err,saveNews){
                   if(err){
                     console.log(err);
                     next(err);
                   }
                   console.log(saveNews);
               });
        }
        res.send("save news:"+newsList.length);
      }else{
        res.send("null");
      }
});


module.exports = router;
