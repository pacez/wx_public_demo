var root=process.cwd();
var express = require('express');
var tools = require(root+'/modules/pana-tools.js');
var db = require(root+'/modules/pana-db.js');
var response = require(root+'/modules/pana-response.js');
var validator = require(root+'/modules/pana-validator.js');
var constant = require(root+'/modules/constant.js');
var logger = require(root+'/modules/pana-log4js');
var communicator=new (require(root+'/modules/pana-get'));
var cipher = require(root+'/modules/pana-crypto.js');
var router = express.Router();


<!-- 获取微信配置 -->
//定义获取微信配置的接口路由
router.get('/getWxConfig', function(req, res, next) {
  var appid="wx428d986694914c8b",
      appsecret="295e4213fbf89dd52e1d26581d51cfbc",
      cgiUrl="https://api.weixin.qq.com/cgi-bin",
      url=req.query.url; //前端传入的url

  //获取token by appid & appsecret
  communicator.get(cgiUrl+"/token?grant_type=client_credential&appid="+appid+"&secret="+appsecret,function(data){
    //获取ticket
    communicator.get(cgiUrl+"/ticket/getticket?access_token="+data.access_token+"&type=jsapi",function(data){
      var timestamp=new Date().getTime(), //时间戳
          nonceStr="123456", //自定义的随机码，用于加密
          ticket=data.ticket; //用于生成签名的票据

      //生成用于生成签名的字符串
      signatureString="jsapi_ticket="+ticket+"&noncestr="+nonceStr+"&timestamp="+timestamp+"&url="+url;
      //进行sha1加密，此处核心是调用的node-crypto,出于方便自己封装了一层。
      signature=new cipher().encrypt(signatureString);

      //定义回传给前端wx.confing的权限验证配置。
      wxConfig={
        appId: appid,
        timestamp: timestamp,
        nonceStr: nonceStr,
        signature: signature,
        jsApiList: [
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "onMenuShareQQ",
          "onMenuShareWeibo",
          "onMenuShareQZone",
          "startRecord",
          "stopRecord",
          "onVoiceRecordEnd",
          "playVoice",
          "pauseVoice",
          "stopVoice",
          "onVoicePlayEnd",
          "uploadVoice",
          "downloadVoice",
          "chooseImage",
          "previewImage",
          "uploadImage",
          "downloadImage",
          "translateVoice",
          "getNetworkType",
          "openLocation",
          "getLocation",
          "hideOptionMenu",
          "showOptionMenu",
          "hideMenuItems",
          "showMenuItems",
          "hideAllNonBaseMenuItem",
          "showAllNonBaseMenuItem",
          "closeWindow",
          "scanQRCode",
          "chooseWXPay",
          "openProductSpecificView",
          "addCard",
          "chooseCard",
          "openCard"
        ]
      };
      //响应给前端配置对象
      res.json(wxConfig);
    });
  });
});


module.exports = router;
