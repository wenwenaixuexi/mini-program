var menus = [

    {
        name: '订单管理',
        menus: [
            {
                name: '订单管理',
                url: 'orders/listPage'
            }
        ]
    },


    {
        name: '图书管理',
        menus: [
            {
                name: '图书管理',
                url: 'goods/listPage'
            }
        ]
    },

    {
        name: '轮播图管理',
        menus: [
            {
                name: '轮播图管理',
                url: 'advertisement/listPage'
            }
        ]
    },

    {
        name: '微信用户管理',
        menus: [
            {
                name: '微信用户管理',
                url: 'user/listPage'
            }
        ]
    },
]
//JavaScript代码区域
layui.use('element', function () {
    var element = layui.element;
    initMenu();
    element.render('nav_layui');
});

function initMenu() {
    $('#nav_layui').empty();
    var leftMenu = '';
    $.each(menus, function (index, parent) {
        leftMenu += '<li class="layui-nav-item">';
        leftMenu += '<a class="" href="javascript:;">' + parent.name + '</a>';
        leftMenu += '<dl class="layui-nav-child">';
        $.each(parent.menus, function (childIndex, child) {
            var childEl = '<dd>' +
                '<a href="' + child.url + '" target="myframe">' + child.name + '</a>' +
                '</dd>';
            leftMenu += childEl;
        });
        leftMenu += '</dl>';
        leftMenu += '</li>';
    });
    $('#nav_layui').html(leftMenu);
}

