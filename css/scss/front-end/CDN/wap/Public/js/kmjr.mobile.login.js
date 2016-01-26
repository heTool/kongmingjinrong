//2015-11-23
//file of login&&function


/*getVerifyCode:function(e){
    'use strict';
    var _step = 60;
    var _btnGet = $('#getVerifyCode');
    var _mobile = $('#mobile').val();
    _btnGet.on('click',function(e){
        console.log(e)
        //ajax请求发送验证码
        $.ajax({
            url:'http://192.168.1.166/kongmingjinrong/html/kmjrMobile/mobile_temp.html',
            type:'GET',
            data:'mobile='+_mobile,
            success:function(d){
                console.log(d);
                _btnGet.attr('disabled','disabled');
                var st = self.setInterval(function(e){
                    _btnGet.val((_step--)+'s后重新获取');
                    //_step=_step--;
                    if(_step<0) self.clearInterval(st);
                },1000);
            }
        });
    });
}*/

;(function($){;
    //
    $('#mobileLogin').on('submit',function() {
        var _mobile = $('#mobile').val();
        var _matchTel = !!_mobile.match(/^(0|86)?(15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
        var _verifyCode = $('#verifyCode').val();

        if (_mobile == '') {
            alert('请输入手机号码');
            return false;
        } else if (_matchTel == false) {
            alert('请输入正确的手机号码');
            return false;
        }else if (_verifyCode == '') {
            alert('请点击获取并输入验证码');
            return false;
        }else if(_verifyCode != ''){
            //TODO 验证码是否输入正确
        }
    });



    //get verify code
    var _mobile = $('#mobile').val();
    var _btnGet = $('#getVerifyCode');
    var _step = 6;

    _btnGet.on('click', function (e) {
        //ajax请求发送验证码
        $.ajax({
            url: _URL._AJAX._LOGIN._VERIFY_CODE,
            type: 'GET',
            data: 'mobile=' + _mobile,
            success: function (d) {
                console.log(d);
                _btnGet.attr('disabled', 'disabled');
                var st = self.setInterval(function (e) {
                    _btnGet.val((_step--) + 's后重新获取');
                    //_step=_step--;
                    if (_step < 0){
                        _btnGet.attr('disabled', 'false');
                        _btnGet.val((_step--) + '点击获取验证码');
                        self.clearInterval(st);
                    }

                }, 1000);
            }
        });
    });




})(jQuery);