/**
 *hetao
 * 20160125
 * wedding displine common js
 */

define(['jquery'],function(){
    'use strict';

    //set dialog
    var elemDialog = $('[data-elem="dialog"]')||{};
    if(elemDialog.length>0){
        $('[data-btn="dialog"]').on('click',function(){
            //TODO
            elemDialog.fadeIn(50);
        });
        $('[data-btn="close-dialog"]').on('click',function(){
            elemDialog.fadeOut(50);
        });
    }


    //set countDown 如果需要启用计时器，请添加元素属性 data-event="start-countdown"
    var eventCountdown = $('[data-event="start-countdown"]');
    if(eventCountdown.length>0){
        var btnCountdown    = $('[data-btn="countdown"]');
        var setSeconds      = 30;//允许的倒计时
            //设置倒计时剩余时间
            $('[data-elem="showSeconds"]').text(setSeconds);

            //倒计时被触发开始计时
            eventCountdown.on('click', function () {
                //开始倒计时
                setBtnTimer();
            });

            //监听按钮状态,并执行相应操作
            btnCountdown.on('click',function(){
                if( $('[data-btn="countdown"]').attr('disable')==false||typeof($('[data-btn="countdown"]').attr('disable'))=='undefined'){
                    //TODO 当前按钮可用，直接提交数据
                    console.log('直接提交');
                    //TODO 如果是窗口操作，关闭窗口
                    //$('[data-elem="dialog"]').fadeOut(50);
                }else{
                    //TODO 当前按钮禁用，重新获取验证码
                    console.log('重新获取验证码');
                    $.ajax({
                        url:'',
                        data:'',
                        success:function(){
                            //TODO ajax 完成验证码重新发送
                            btnCountdown.addClass('success').html('确定提交\(<span data-elem="showSeconds">'+setSeconds+'</span>\)');
                            //开始倒计时
                            setBtnTimer();
                        }
                    });
                }
            });

            //按钮状态设置
            function setBtnTimer(){
                var showSeconds     = $('[data-elem="showSeconds"]');
                var haveSeconds     = Number($('[data-elem="showSeconds"]').text())||0;
                var setTimer        = setInterval(function() {
                    haveSeconds--;
                    showSeconds.text(haveSeconds);
                    if(haveSeconds<0){
                        btnCountdown.attr({'disable': true});
                        btnCountdown.removeClass('success').html('重新获取');
                        clearInterval(setTimer);
                    }
                },1000);
            }
    }

});

