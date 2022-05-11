$(function(){
   
    getUserinfo();
    
    var layer = layui.layer;
    $("#btnLogout").on('click',function(){
        layer.confirm('退出？', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token');
            location.href = "/zlogin.html";
            layer.close(index);
          });
        
    });
   
});

function getUserinfo(){
    $.ajax({
        url:"/my/userinfo",
        method:"GET",
        // headers:{},
        success:function(res){
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            renderAvatar(res.data);
            
        },
        complete:function(res){
            console.log("返回");
            if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
                localStorage.removeItem('token')
                location.href = '/login.html'
            } 
        }
    });
}

function renderAvatar(data){
    var name = data.nickname || data.username;
    $("#welcome").html('欢迎&nbsp;&nbsp;' + name);
    if(data.user_pic !== null){
         $(".layui-nav-img").attr('src',data.user_pic).show();
         $(".text-avatar").hide();
    }else{
        var first = name[0].toUpperCase();
        $(".text-avatar").html(first).show();
    }

} 