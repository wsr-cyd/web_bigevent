$(function () {

    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: 2,
        state: 3
    }

    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage

    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date);
        var y = dt.getFullYear();
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss


    }

    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    initTable();

    function initTable() {
        console.log(q);
        var htmlStr = template('tpl-table', q)
        $('tbody').html(htmlStr)
        // 调用渲染分页的方法
        // renderPage(res.total)
        $.ajax({
            method: 'GET',
            url: 'http://ajax.frontend.itheima.net/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {


                    layer.msg('获取文章列表失败！')
                }
                // 使用模板引擎渲染页面的数据
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                renderPage(res.total);
            }
        })
    }


    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败！')
                }
                // 调用模板引擎渲染分类的可选项
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr);
                form.render()
            }
        })
    }

    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        // // 获取表单中选中项的值
        // var cate_id = $('[name=cate_id]').val()
        // var state = $('[name=state]').val()
        // // 为查询参数对象 q 中对应的属性赋值
        // q.cate_id = cate_id
        // q.state = state
        // // 根据最新的筛选条件，重新渲染表格的数据
        // initTable()

        var cate_id = $('[name=cate_id]').val();
        var state = $('[name=state]').val();
        q.cate_id = cate_id;
        q.state = state;

        initTable()

    })

    renderPage(8);

    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                console.log(obj.curr);
                q.pagenum = obj.curr;
                q.pagesize = obj.limit;
                if (!first) {
                    initTable()
                }

            }
        })

    }

    $(".btn-delete").on('click', function () {
        var len = $('.btn-delete').length
        var id = $(this).attr("data-id");
        layer.confirm('is not?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章失败！')
                    }
                    layer.msg('删除文章成功！')
                    
                     if(len === 1){
                          q.pagenum = pagenum === 1 ? 1: pagenum - 1;
                     }

                    initTable();
                }
            });
            layer.close(index);
        });

       
    });

});