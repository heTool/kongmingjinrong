/**
 * hetao
 * 20160128
 * loading
 */

'use strict';
define(function(){
    //在body中插入加载框html
    var _loadingImg = 'http://statics.aijialicai.com.cn/CDN/app/Public/images/kmjrApp/loader02.gif';
    var _loading    = document.createElement('div');
        _loading.id = 'kmwd-loading';
        _loading.className = 'kmwd-loading';
        _loading.style.display = 'none';

    var str = '<div class="kmwd-loading-bg"></div>';
        str += '<div class="loading-circle">';
        str += '<img src="'+_loadingImg+'" width="100%">';
        str += '</div>';
    _loading.innerHTML= str;
    document.body.appendChild(_loading);

    //
    return {
        //显示加载框
        loadingShow:function(){
            var elem= document.getElementById('kmwd-loading');
            if(elem){
                elem.style.display = 'block';
            }
        },
        //隐藏加载框
        loadingHide:function(){
            var elem= document.getElementById('kmwd-loading');
            if(elem){
                elem.style.display = 'none';
            }
        }
    };
});