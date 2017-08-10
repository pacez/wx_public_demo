var express = require('express');
var router = express.Router();
var root=process.cwd();
var markdown = require( "markdown" ).markdown;
var fs = require( "fs" );
var pageConfig=require(root+'/pageConfig');


var menus=pageConfig.menus;

/* 主页 */
router.get('/index', function(req, res, next) {
  //console.log(req.query.echostr)
  //res.send(req.query.echostr);
  //渲染主页
  //return;
  res.render('index', {
    pageConfig: pageConfig,
    pageName: 'homepage',
    readme: markdown.toHTML(fs.readFileSync(root+'/README.md','utf-8'))
  });
});



module.exports = router;
