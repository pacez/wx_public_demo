$(function(){
  //调用后端接口
  $.get("/api/getWxConfig?url="+encodeURIComponent(location.href.split('#')[0]),function(config){

    wx.config(config);

    wx.ready(function(data){
      $("#trigger").click(function(){
        weui.actionSheet([
          {
              label: '滴滴一下，马上约架！',
              onClick: function () {
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
                      name: '小赤佬，我知道你住哪儿！', // 位置名
                      address: '放学后单挑', // 地址详情说明
                      scale: 28, // 地图缩放级别,整形值,范围从1~28。默认为最大
                      infoUrl: 'http://www.baidu.com' // 在查看位置界面底部显示的超链接,可点击跳转
                    });
                  }
                });
              }
          },
          {
              label: '秒变美女照相机',
              onClick: function () {
                wx.chooseImage({
                    count: 1, // 默认9
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                        wx.previewImage({
                            urls: [
                            'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1502449372&di=44e6efc34f4f9cc79e6a8cd8d053f5d6&src=http://www.kelteri.com/uploads/allimg/150404/0RR2WZ_1.jpg',
                            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1502459370070&di=fc91b043163fcfcc8a70ce2644f91183&imgtype=0&src=http%3A%2F%2Fwww.gdjyw.com%2Fbj%2Fmtyy%2Fpic%2F14PMS5Ac60-1T39.jpg',
                              'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1503054084&di=a5f0db8afac5f1c277d270aa0d50f010&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.qqzhi.com%2Fupload%2Fimg_5_3997432227D4014422106_23.jpg'
                            ] // 需要预览的图片http链接列表
                        });
                    }
                });
              }
          },
          {
              label: '即将开通...',
              onClick: function () {
                weui.alert('烦不烦，说了即将开通...');
              }
          }
        ]);
      });

    });
    wx.error(function(error){
      //配置出错，弹出报错信息
    });
  });


})
