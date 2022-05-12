$(function () {

    var layer = layui.layer;
    var form = layui.form;
    initCate();
    initEditor();

    function initCate() {
        $.ajax({
            method: "GET",
            url: "http://ajax.frontend.itheima.net/my/article/add",
            success: function (res) {

                console.log(res);
                if (res.status !== 0) {
                    return layer.msg("初始化文章失败");
                }

                var sel = template('tpl-cate', res);
                $("[name=cate_id]").html(sel);
                form.render();
            }
        });
    }


    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    $('#btnChooseImage').on('click', function () {
        $("#coverFile").click();
    });

    $("#coverFile").on('change', function (e) {
        var files = e.target.files;

        if(files.length === 0) {
            return
        }

        var newImgURL = URL.createObjectURL(files[0]);

        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域

    });

    var art_state = "已发布";

    $("#btnSave2").on('click',function(){
        art_state = "草稿";
    });

    $('#form-pub').on('submit', function(e) {
        
        e.preventDefault();
        location.href = '/article/article_list.html'
        fd = new FormData($(this)[0]);
        fd.append('state', art_state);
        console.log($('#form-pub')[0]);

        $image
        .cropper('getCroppedCanvas', {
          // 创建一个 Canvas 画布
          width: 400,
          height: 280
        })
        .toBlob(function(blob) {
            fd.append('cover_img', blob);
            publishArticle(fd)
        })

      
        
    })

    function publishArticle(fd){
        $.ajax({
            method: 'POST',
            url: 'http://ajax.frontend.itheima.net/my/article/add',
            data: fd,
            // 注意：如果向服务器提交的是 FormData 格式的数据，
            // 必须添加以下两个配置项
            contentType: false,
            processData: false,
            success: function(res) {
              if (res.status !== 0) {
                location.href = '/article/article_list.html'
              }
              layer.msg('发布文章成功！')
              // 发布文章成功后，跳转到文章列表页面
              
            }
          })
    }

    
});