var https = require('https');

/*
https.get("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+appid+"&secret="+appsecret, function(res) {
  //console.log("statusCode: ", res.statusCode);
  //console.log("headers: ", res.headers);
  res.on('data', function(d) {
    console.log(d);
    console.log(JSON.stringify(d));
  });
}).on('error', function(e) {
  console.error(e);
});
var getData=function(){
  this.https=https;
};
*/
var communicator=function(){
  this.https=https;
};
communicator.prototype.get=function(url,callback){
  https.get(url, function(res) {
    //console.log("statusCode: ", res.statusCode);
    //console.log("headers: ", res.headers);
    res.on('data', function(d) {
      callback(JSON.parse(d.toString()));
      //callback(d);
    });
  }).on('error', function(e) {
    console.error(e);
  });
};

module.exports=communicator;
