$(function(){
  $loginBox=$("#loginBox");
  $loginForm=$("#loginForm")
  $loginBtn=$("#loginBtn");
  $loginBtn.click(function(){
    //window.location.href="/channel/help"
    api.post({
      url: api.url.login,
      data:$loginForm.serialize(),
      abort: true,
      success: function(data){
        console.log(data)
        alert("登陆成功！")
        $loginBox.closeModal();
      },
      error: function(data){
        console.log(data)
        alert("登陆失败！")
      }
    });
  })
});
