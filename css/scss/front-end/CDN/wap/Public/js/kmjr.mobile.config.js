//hetao
//2012-11-23
//global config for mobile/wap
//爱家宝收益率
;
var _KMJR_YIELD   = 0.0818;
//爱家分期费率
var _KMJR_RATE    = {
    //婚宴
    _WEDDING:{
        _MONTH_3 : 0.01,
        _MONTH_6 : 0.009,
        _MONTH_ALL:[0.01,0.009]
    },
    //装修
    _RENOVATION:{
        _MONTH_6 : 0.009,
        _MONTH_9 : 0.0085,
        _MONTH_12 : 0.008,
        _MONTH_18 : 0.0078,
        _MONTH_24 : 0.0075,
        _MONTH_ALL:[0.009,0.0085,0.008,0.0078,0.0075]
    },
    //教育
    _EDU:{
        _MONTH_3 : 0.01,
        _MONTH_6 : 0.009,
        _MONTH_ALL:[0.01,0.009]
    },
    //旅行
    _TRAVEL:{
        _MONTH_3 : 0.01,
        _MONTH_6 : 0.009,
        _MONTH_ALL:[0.01,0.009]
    }
};
//银行活期利率
var _BANK_YIELD   = 0.02;
//通用连接
var _URL={
        _CALLBACK:{
            _LOGIN:'http://192.168.1.198:8093/login/verifycode'
        },
        _AJAX:{
            _LOGIN:{
                _VERIFY_CODE:'http://192.168.1.198:8093/login/verifycode'
            }
        },
        _WEB : 'www.kmjr.com.cn',
        _MOBILE : 'm.kmjr.com.cn',
        _APP_IOS:'',
        _APP_ANDROID:''
};
