$(function(){
  $registerBox=$("#registerBox");
  $registerForm=$("#registerForm")
  $registerBtn=$("#registerBtn");
  $registerBtn.click(function(){
    api.post({
      url: api.url.register,
      data:$registerForm.serialize()+"&createTime="+new Date(),
      //async: false,
      abort: true,
      success: function(data){
        console.log(data)
        alert("注册成功！")
        $registerBox.closeModal();
      },
      error: function(data){
        console.log(data)
        alert(data.errorMsg)
      }
    });
  });
});
