$(function(){

    var form = layui.form;

    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ],
        somePwd:function(value){
             if(value === $("[name=oldPwd]").val()){
                 return "新旧密码不能相同"
             }
        },
        rePwd:function(value){
            if(value !== $("[name=newPwd]").val()){
                return "两次密码不一致"
            }
        }
    });

    rePwd();

    function rePwd(){
        $(".layui-form").on('submit',function(e){
            e.preventDefault();
            var arr = $(this).serialize();
            console.log(arr);
            
            $.ajax({
                url:'http://api-breakingnews-web.itheima.net/my/updatepwd',
                method:"POST",
                data:$(this).serialize(),
                success:function(res){
                    console.log(res);
                    if(res.status != 0){
                         return layui.layer.msg('重置密码失败');

                    }
                    layui.layui.msg('重置密码成功');
                    $(".layui-form")[0].reset();
                }
            });
        });
    }
});