/**
 * @param {path}
 * @param {shim}
 * */
require.config({
    baseUrl:'http://statics.aijialicai.com.cn/CDN/',
    paths:{
        'jquery':'lib/jquery/jquery-1.11.3.min',
        'bootstrap':'lib/bootstrap/js/bootstrap.min'
    },
    shim:{
        'bootstrap':['jquery'],
        'jquery':{}
    }
});