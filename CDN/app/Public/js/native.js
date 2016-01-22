function app_alert(_msg, _callback){
    if(dType == 'android'){
        window.ajlc.alert(_msg, _callback);
    }else if(dType == 'ios'){
        document.location = 'ajlc:alert:' + _msg + ':' + _callback;
    }
}

function app_confirm(_msg, _callback){
    if(dType == 'android'){
        window.ajlc.confirm(_msg, _callback);
    }else if(dType == 'ios'){
        document.location = 'ajlc:confirm:' + _msg + ':' + _callback;
    }
}

function app_toast(_msg){
    if(dType == 'android'){
        window.ajlc.toast(_msg);
    }else if(dType == 'ios'){
        document.location = 'ajlc:toast:' + _msg;
    }
}

function app_show_loading(_msg){
    if(dType == 'android'){
        window.ajlc.loading(_msg);
    }else if(dType == 'ios'){
        document.location = 'ajlc:loading:' + _msg;
    }
}

function app_cancel_loading(_callback){
    if(dType == 'android'){
        window.ajlc.cancel_loading(_callback);
    }else if(dType == 'ios'){
        document.location = 'ajlc:cancel_loading:' + _callback;
    }
}

function app_share(_json){
    if(dType == 'android'){
        window.ajlc.share(_json);
    }else if(dType == 'ios'){
        document.location = 'ajlc:share:' + _json;
    }
}

function app_share_one(_json, _callback){
    if(dType == 'android'){
        window.ajlc.share_one(_json, _callback);
    }else if(dType == 'ios'){
        document.location = 'ajlc:share_one:' + _json + ':' + _callback;
    }
}

function app_wv_close(){
    if(dType == 'android'){
        window.ajlc.wv_close();
    }else if(dType == 'ios'){
        document.location = 'ajlc:wv_close';
    }
}

function app_contact(_callback){
    if(dType == 'android'){
        window.ajlc.contact(_callback);
    }else if(dType == 'ios'){
        document.location = 'ajlc:contact:' + _callback;
    }
}

function app_scroll_top(){
    if(dType == 'android'){
        window.ajlc.scroll_top();
    }else if(dType == 'ios'){
        document.location = 'ajlc:scroll_top';
    }
}

function app_login(){
    if(dType == 'android'){
        window.ajlc.login();
    }else if(dType == 'ios'){
        document.location = 'ajlc:login';
    }
}