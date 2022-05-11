$(function () {
    var layer = layui.layer

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options);

    $("#btnChooseImage").on('click', function () {
        $("#file").click();
    });

    $("#file").on('change', function (e) {
        var img = e.target.files;
        console.log(img);
        if (img.lenght === 0) {
            return layer.msg('请上传图片');
        }
        var imgs = e.target.files[0];
        var imgURL = URL.createObjectURL(imgs);
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    });

    $('#btnUpload').on('click', function () {
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png');

        $.ajax({
            method: 'POST',
            url: 'http://api-breakingnews-web.itheima.net/my/update/avatar',
            data: {
              avatar: dataURL
            },
            headers: {
                Authorization: localStorage.getItem('token')
            },
            success:function(res){
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('更换头像失败！')
                  }
                layer.msg('更换头像成功！');
                window.parent.getUserInfo();
            },
            complete:function(res){
                console.log("返回");
                if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
                    localStorage.removeItem('token')
                    location.href = '/zlogin.html'
                } 
            }
        });
    })

});