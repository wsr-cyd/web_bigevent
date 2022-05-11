$(function(){
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nickname:function(value){
            if(value.length > 6){
                return "昵称长度必须在1-6之间";
            }
        },
    });

    getData();

    function getData(){
        $.ajax({
             method:"GET",
             url:"http://api-breakingnews-web.itheima.net/my/userinfo",
             success:function(res){
                 console.log(res);
                 if(res.status !== 0){
                      return layer.msg("获取用户信息失败");
                 }

                 form.val('formUserInfo',res.data);
             }
        });
    }

    $("#btnReset").on('click',function(e){
        e.preventDefault();
        getData();
    });

    $(".layui-form").on('submit',function(e){
          e.preventDefault();
          $.ajax({
              method:"post",
              url:"http://api-breakingnews-web.itheima.net/my/userinfo",
              data:$(this).serialize(),
              success:function(res){
                   console.log(res);
                   if(res.status !== 0){
                       return layer.msg('更新系统的数据失败'); 
                   }
                   
                   layer.msg('更新系统的数据成功'); 
                   window.parent.getUserinfo();
              }
          });
    });
});