$(function(){
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
      })
    
      // 点击“去登录”的链接
      $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
      })


      
    var form = layui.form
    var layer =  layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value){
             var psw = $(".reg-box [name=password]").val();
             if(psw !== value){
                  return '两次密码不一致！'
             }
        }
        
    });

    $("#form_reg").on('submit',function(e){
        e.preventDefault();
        alert("d因");
        $.post('http://www.liulongbin.top:3007/api/reguser',{username:$("#form_reg [name=username]").val(),password:$("#form_reg [name=password]").val()},function(res){
             console.log(res);
             if(res.status !== 0){
                console.log(res);
                 return layer.msg(res.message);  
             }

             $("#link_login").click();
        });
    });

  
    $('#form_login').submit(function(e) {
        // 阻止默认提交行为
        e.preventDefault()
        // alert("d因");
        $.ajax({
          url: 'http://api-breakingnews-web.itheima.net/api/login',
          method: 'POST',
          // 快速获取表单中的数据
          data: $(this).serialize(),
          success: function(res) {
            console.log(res.message);
            
            if (res.status !== 0) {
              return layer.msg('登录失败！')
              location.href = '/zindex.html'
            }
            layer.msg('登录成功！')
            // 将登录成功得到的 token 字符串，保存到 localStorage 中
            localStorage.setItem('token', res.token)
            // 跳转到后台主页
            
          }
        })
      })
});