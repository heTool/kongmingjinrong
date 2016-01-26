var barNum, barLoad, loadCircle;
var _p, _c, _a, _pca;
var _s1, _s2, _s3, _s4, _s5, _s6;
var _has_married = false;
var _has_house = false;
var _has_car = false;

$(document).ready(function () {
    $("form").keypress(function (e) {
        if (e.which == 13) return false;
    });
    barNum = $('.progress-bar-num');
    barLoad = $('.progress-bar-load');
    loadCircle = $('.loading-circle');
    $('#btnTab2').find('a').on('click', function () {
        if ($(this).hasClass('button-l')) {
            tabSwitch(2, 0);
        }
    });
    $('#btnTab3').find('a').on('click', function () {
        if ($(this).hasClass('button-l')) {
            if (_has_house) tabSwitch(3, 0);
            else tabSwitch(2, 0);
        }
    });
    $('#btnTab4').find('a').on('click', function () {
        if ($(this).hasClass('button-l')) {
            if (_has_car) tabSwitch(4, 0);
            else if (_has_house) tabSwitch(3, 0);
            else tabSwitch(2, 0);
        }
    });
    $('#btnTab5').find('a').on('click', function () {
        if ($(this).hasClass('button-l')) {
            tabSwitch(5, 0);
        }
    });

    $("#frmStep1").Validform({
        tiptype: function (msg, o, cssctl) {
            if (o.type != 2) app_toast(msg);
        },
        beforeSubmit: function (curform) {
            update(1);
            return false;
        }
    });
    $("#frmStep2").Validform({
        tiptype: function (msg, o, cssctl) {
            if (o.type != 2) app_toast(msg);
        },
        beforeSubmit: function (curform) {
            update(2);
            return false;
        }
    });
    $("#frmStep3").Validform({
        tiptype: function (msg, o, cssctl) {
            if (o.type != 2) app_toast(msg);
        },
        beforeSubmit: function (curform) {
            update(3);
            return false;
        }
    });
    $("#frmStep4").Validform({
        tiptype: function (msg, o, cssctl) {
            if (o.type != 2) app_toast(msg);
        },
        beforeSubmit: function (curform) {
            update(4)
            return false;
        }
    });
    $("#frmStep5").Validform({
        tiptype: function (msg, o, cssctl) {
            if (o.type != 2) app_toast(msg);
        },
        beforeSubmit: function (curform) {
            update(5);
            return false;
        }
    });
});
function tabSwitch(step, action) {
    //step:第几步
    //action:1 下一步 action:0 上一步
    $("#btnTab1,#btnTab2,#btnTab3,#btnTab4,#btnTab5,#btnTab6,#btnTab7").css('display', 'none');
    if (action > 0) {
        $('.tab-content').css({'display': 'none'});
        $('#tab' + (step + 1)).fadeIn(200);
        $('#btnTab' + (step + 1)).fadeIn(200);
    } else {
        $('.tab-content').css({'display': 'none'});
        $('#tab' + (step - 1)).fadeIn(200);
        $('#btnTab' + (step - 1)).fadeIn(200);
    }
    doLoadCircle(jsPercent());
    //app_scroll_top();
}
function doLoadCircle(per) {
    if (per >= 0 && per <= 100) {
        loadCircle.removeClass();
        loadCircle.addClass('loading-circle loading-circle-' + per);
    }
}
function jsPercent() {
    var _percent = 0;
    if (_s1 == 'true') {
        _percent += 20;
        if ($("#marry").val() != '已婚' || _s5 == 'true') _percent += 20;
        if ($("#has_house").val() == 0 || _s2 == 'true') _percent += 15;
        if ($("#has_car").val() == 0 || _s3 == 'true') _percent += 15;
    }
    if (_s4 == 'true') _percent += 20;
    if (_s6 == 'true') _percent += 10;
    return _percent;
}
function update(_step) {
    app_show_loading('');
    $.ajax({
        url: ROOT + '/member/step',
        data: $('#frmStep' + _step).serialize(),
        type: "POST",
        cache: false,
        success: function (msg) {
            app_cancel_loading('');
            if (msg.status) {
                update_step(_step);
            } else {
                app_toast(msg.info);
            }
        }
    });
}
function update_step(_step) {
    switch (_step) {
        case 1:
            _s1 = "true";
            if ($("#marry").val() == '已婚') _has_married = true;
            else _has_married = false;
            if ($("#has_house").val() == 1) _has_house = true;
            else _has_house = false;
            if ($("#has_car").val() == 1) _has_car = true;
            else _has_car = false;
            if (_has_house) tabSwitch(1, 1);
            else if (_has_car) tabSwitch(2, 1);
            else tabSwitch(3, 1);
            break;
        case 2:
            _s2 = "true";
            if (_has_car) tabSwitch(2, 1);
            else tabSwitch(3, 1);
            break;
        case 3:
            _s3 = "true";
            tabSwitch(3, 1);
            break;
        case 4:
            _s4 = "true";
            if (_has_married) tabSwitch(4, 1);
            else tabSwitch(5, 1);
            break;
        case 5:
            _s5 = "true";
            tabSwitch(5, 1);
            break;
        case 6:
            _s6 = "true";
            tabSwitch(6, 1);
            break;
    }
}
function step1() {
    _pca = '';
    _p = $("#province").val();
    _c = $("#city").val();
    _a = $("#area").val();
    if (_p != '') _pca = $("#province").find('option:selected').text();
    if (_c != '') _pca += $("#city").find('option:selected').text();
    if (_a != '') _pca += $("#area").find('option:selected').text();
    $("#pca").val(_pca);
    $("#frmStep1").submit();
}
function step2() {
    _pca = '';
    _p = $("#house_province").val();
    _c = $("#house_city").val();
    _a = $("#house_area").val();
    if (_p != '') _pca = $("#house_province").find('option:selected').text();
    if (_c != '') _pca += $("#house_city").find('option:selected').text();
    if (_a != '') _pca += $("#house_area").find('option:selected').text();
    $("#house_pca").val(_pca);
    $("#frmStep2").submit();
}
function step3() {
    $("#frmStep3").submit();
}
function step4() {
    $("#frmStep4").submit();
}
function step5() {
    $("#frmStep5").submit();
}
function contact() {
    app_contact('contact_back');
}
function contact_back(_back) {
    if (_back) {
        $("#contact").val(_back);
        update(6);
    } else {
        app_alert('通讯录无法获取');
    }
}
function finish() {
    app_wv_close();
}
function change_house_mortgage(_obj) {
    if ($(_obj).val() == 0) {
        $("#trigger_house_mortgage").css('display', 'none');
    } else {
        $("#trigger_house_mortgage").css('display', '');
    }
}
function change_car_mortgage(_obj) {
    if ($(_obj).val() == 0) {
        $("#trigger_car_mortgage").css('display', 'none');
    } else {
        $("#trigger_car_mortgage").css('display', '');
    }
}
function get_city(_obj, _target, _relation, _default) {
    if ($(_obj).val() > 0) {
        $.get(ROOT + "/common/getCity", {code: $(_obj).val(), default: _default}, function (msg) {
            $("#" + _target).html(msg.info);
            if (_relation != '') $("#" + _relation).find('option').not(':first').remove();
        });
    } else {
        $("#" + _target).find('option').not(':first').remove();
        $("#" + _relation).find('option').not(':first').remove();
    }
}