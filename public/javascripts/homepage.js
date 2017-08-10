$(function(){
  //调用后端接口
  $.get("/api/getWxConfig?url="+encodeURIComponent(location.href.split('#')[0]),function(config){

    wx.config(config);

    wx.ready(function(data){

      $("#goHome").click(function(){
        //调用微信定位服务
        wx.getLocation({
          type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: function (res) {
            console.log(res)
            //alert(JSON.stringify(res));
            var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            //打开地图导航程序，进行导航。呵呵，此处为demo, 本地导航到本地，仅为效果展示
            wx.openLocation({
              latitude: latitude, // 纬度，浮点数，范围为90 ~ -90
              longitude: longitude, // 经度，浮点数，范围为180 ~ -180。
              name: '空港之星', // 位置名
              address: '我的家', // 地址详情说明
              scale: 28, // 地图缩放级别,整形值,范围从1~28。默认为最大
              infoUrl: 'http://www.baidu.com' // 在查看位置界面底部显示的超链接,可点击跳转
            });
          }
        });
      })

    });
    wx.error(function(error){
      //配置出错，弹出报错信息
    });
  });
})
