<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <%@include file="/resources/commons/basejs.jsp" %>
</head>
<body>
    <div style="width: 400px;padding-top: 10px;">
        <form id="form_submit" class="layui-form">
            <input type="hidden" name="id">
            <div class="layui-form-item">
                <label class="layui-form-label">名称</label>
                <div class="layui-input-inline">
                    <input type="text" name="name" lay-verify="required" placeholder="请输入图书名称" class="layui-input" value="">
                </div>
                <label class="layui-form-label">作者</label>
                <div class="layui-input-inline">
                    <input type="text" name="writer" lay-verify="required" placeholder="请输入作者" class="layui-input" value="">
                </div>
                <label class="layui-form-label">简介</label>
                <div class="layui-input-inline">
                    <input type="text" name="des" lay-verify="required" placeholder="请输入简介" class="layui-input" value="">
                </div>
                <label class="layui-form-label">图片</label>
                <div class="layui-input-inline" style="position: relative">
                    <button type="button" class="layui-btn layui-btn-normal" id="image-upload-show">
                        <i class="layui-icon layui-icon-upload"></i>上传图片
                    </button>
                    <div class="image-upload-show"></div>
                </div>
                <label class="layui-form-label">价格</label>
                <div class="layui-input-inline">
                    <input type="text" name="price" lay-verify="required|number" placeholder="请输入价格" class="layui-input" value="">
                </div>
                <label class="layui-form-label">所属分类</label>
                <div class="layui-input-inline">
                    <select name="typeId" id="typeId" lay-verify="required"></select>
                </div>
                <label class="layui-form-label">是否精品</label>
                <div class="layui-input-inline">
                    <input type="radio" name="ishot" value="1" title="是">
                    <input type="radio" name="ishot" value="2" title="否" checked>
                </div>

            </div>
            <div class="layui-form-item" style="display: none">
                <button type="button" lay-submit lay-filter="btn_form_submit" id="btn_form_submit" class="layui-btn layui-btn-lg"></button>
            </div>
        </form>
    </div>
</body>
<script>
    var modleName = "${ctxPath}/goods";
    //用layui加载数据
    function onLayuiInit() {
        //加载分类下拉选择框
        loadOptionList({
            url:'${ctxPath}/goodsType/getList',
            elementId:'typeId',
            selectedValue:currentItemData.typeId
        });
        //绑定图片上传的内容(规则就是按你的id名字一定要和图片容器的class名字一样)
        bindUpload("image-upload-show","coverImage",currentItemData.coverImage);
        //绑定监听表单提交事件
        bindSubmit(modleName,'update','btn_form_submit','form_submit');
        //是否精品赋值
        $("input:radio[name='ishot'][value='"+currentItemData.ishot+"']").attr("checked","checked");
    }
</script>
</html>














