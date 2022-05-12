$(function() {
  var layer = layui.layer

  initArtCateList()

  // 获取文章分类的列表
  function initArtCateList() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function(res) {
        console.log(res);
        
        var htmlStr = template('tpl-table', res)
        $('tbody').html(htmlStr)
      }
    })
  }

  var indexAdd = null
  $('#btnAddCate').on('click', function() {
    console.log("334");
    indexAdd = layer.open({
      title: '在线调试',
      type: 1, 
      area: ['500px', '300px'],
      content: $("#table").html()
    });     
    
    var indexEdit = null;

    $('.btn-edit').on('click', function(){
     console.log("335");
     
      indexEdit = layer.open({
        title: '在线调试',
        type: 1, 
        area: ['500px', '300px'],
        content: $("#dialog-edit").html()
        
      

      });     
      var id = $(this).attr('data-id')
      $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
              form.val('form-edit', res.data)
            }
      })

    })
    // $('tbody').on('click', '.btn-edit', function() {
    //   // 弹出一个修改文章分类信息的层
    //   indexEdit = layer.open({
    //     type: 1,
    //     area: ['500px', '250px'],
    //     title: '修改文章分类',
    //     content: $('#dialog-edit').html()
    //   })
  
    //   var id = $(this).attr('data-id')
    //   // 发起请求获取对应分类的数据
    //   $.ajax({
    //     method: 'GET',
    //     url: '/my/article/cates/' + id,
    //     success: function(res) {
    //       form.val('form-edit', res.data)
    //     }
    //   })
    // })
    // $("#reset").on('click',function(){
    //   $(".layui-form")[0].reset();
    // });
      
    // 通过代理的形式，为 form-add 表单绑定 submit 事件
  $('#form-add').on('submit',  function(e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('新增分类失败！')
        }
        initArtCateList()
        layer.msg('新增分类成功！')
        // 根据索引，关闭对应的弹出层
        layer.close(indexAdd)
      }
    })
  })

  $('body').on('submit', '#form-edit', function(e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('更新分类数据失败！')
        }
        layer.msg('更新分类数据成功！')
        layer.close(indexEdit)
        initArtCateList()
      }
    })
  })

  // 为添加类别按钮绑定点击事件
  
  // $('#btnAddCate').on('click', function() {
  //   indexAdd = layer.open({
  //     type: 1,
  //     area: ['500px', '250px'],
  //     title: '添加文章分类',
  //     content: $('#dialog-add').html()
  //   })
  // })

})
})
