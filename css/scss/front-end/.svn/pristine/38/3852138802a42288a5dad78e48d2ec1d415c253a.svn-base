//hetao138@gmail.com  2015-11-4
//
;var k = {
    //浏览器适配
    browserAdapter:function(){
        var userAgent = window.navigator.userAgent.toLowerCase();
        var uaMatch;

        if(userAgent.match(/msie ([\d.]+)/)==null){
            return true
        }else{
            uaMatch =userAgent.match(/msie ([\d.]+)/);
            if(uaMatch[1] <= 8){
                return false;
            }else{
                return true;
            }
        }
    },
    placeHolderLable:function(){
        //var label = $('input[type=text],textarea').pre('label');
        $('input[type=text],textarea').on('focus',function(){
            $(this).prev('label').hide();
        });
        $('input[type=text],textarea').on('blur',function(){
            $(this).prev('label').show();
        });
    },
    msgUpgradeBrowser:function(msg){
        var isCookie = document.cookie.toLocaleLowerCase();
        var isCloseMsg = isCookie.indexOf('closemsgupgradebrowser');
        if(isCloseMsg<0){
            var msg = msg || '您的浏览器版本太低，为了您的财务安全，请尽快升级到最新的浏览器。<a href="javascript:;" id="closeMsg">我知道了,以后不提醒</a>';
            var temp ='<div class="alert fadeOut text-center" id="msgUpgradeBrowser">';
            temp=temp+'<button type="button" class="close" data-dismiss="alert">&times;</button>';
            temp=temp+msg;
            temp=temp+'</div>';
            $('body').prepend(temp);
            var setTimeoutDown = self.setTimeout(function(){
                $('#msgUpgradeBrowser').slideDown(2000,function(){
                    //添加不在提醒事件
                    closeMsg();
                });
            },3000);
            var setTimeoutUp = self.setTimeout(function(){
                $('#msgUpgradeBrowser').slideUp(2000,function(){$(this).remove()});
            },10000);

            var closeMsg = function(){
                $('#closeMsg').on('click',function(){
                    document.cookie = 'closeMsgUpgradeBrowser=true;';
                    $('#msgUpgradeBrowser').slideUp(2000,function(){$(this).remove()});
                    clearTimeout(setTimeoutUp);
                });
            };
        }else{
            return;
        }
    },
    startIntereatPin:function(){

        var amount      = 10000.0000;
        var mBase       = 10000;
        var interest    = 0;

        var pin = {
            wan : $('.rate-wan'),
            qian : $('.rate-qian'),
            bai : $('.rate-bai'),
            shi : $('.rate-shi'),
            yuan : $('.rate-yuan'),
            jiao : $('.rate-jiao'),
            fen : $('.rate-fen'),
            hao : $('.rate-hao'),
            li : $('.rate-li'),
            si : $('.rate-si')
        };
        var startIntereat = self.setInterval(function(){
            interest  = mBase  * 0.0818 / 365 / 24 / 3600;
            amount = Number(amount);
            amount = amount + interest;
            amount = amount.toString();
            var getAmount = []; getAmountYun = [],getAmountJiao = [];
            getAmount = amount.split('.');
            if(getAmount.length>1){
                getAmountYun  = getAmount[0].split('');
                getAmountJiao = getAmount[1].split('');
            }else{
                getAmountYun  = [1,0,0,0,0];
                getAmountJiao = [0,0,0,0,0];
            }
            //
            pin.wan.text(getAmountYun[0]);
            pin.qian.text(getAmountYun[1]);
            pin.bai.text(getAmountYun[2]);
            pin.shi.text(getAmountYun[3]);
            pin.yuan.text(getAmountYun[4]);
            //
            pin.jiao.text(getAmountJiao[0]);
            pin.fen.text(getAmountJiao[1]);
            pin.li.text(getAmountJiao[2]);
            pin.hao.text(getAmountJiao[3]);
            pin.si.text(getAmountJiao[4]);
        },100)
    },
    scrollListener:function(){
        var topStep = 420;
        if($(window).width()<=1280){
            topStep = 780;
        }else{
            topStep = 420;
        }
        $(window).on('scroll',function(){
            var scrollTop = $(window).scrollTop();
            var sNum = [];
            var sDiv = $('section');
            $('section').each(function (i) {
                sNum[i] = $(this).offset().top
            })

            for(var i = 0;i<sNum.length;i++){
                if((scrollTop+topStep) > sNum[i]){
                    k.sectionFunction(i);
                }
            }
        });
    },
    sectionFunction:function(i){
        switch (i){
            //a
            case 0:
                break;
            //b
            case 1:
                //$('.k-h-section-b ').find('.thumbnail').addClass('thumbnail-b');
                $('.k-h-section-b .thumbnail').eq(0).fadeIn(1000);
                $('.k-h-section-b .thumbnail').eq(1).fadeIn(1500);
                $('.k-h-section-b .thumbnail').eq(2).fadeIn(2000);

                //console.log( $('.k-h-section-b .thumbnail').eq(0))
                break;
            //c
            case 2:
                break;
            //d
            case 3:
                //$('.k-h-section-d .section-t-pr').removeClass('section-t-pr').toggleClass('section-t-p-r');
                $('.k-h-section-d .sec-d-pin').slideDown(1000);
                break;
            //e
            case 4:
                break;
            //f
            case 5:
                var $f_thumb = $('.k-h-section-f .thumbnail');
                $f_thumb.addClass('sec-f sec-f-1');
                for(var i = 0;i<$f_thumb.length;i++){
                    $f_thumb.eq(i).addClass('sec-f-'+(i+1));
                }
                //$('.k-h-section-f .section-t-pr').removeClass('section-t-pr').toggleClass('section-t-p-r');
                break;
            //g
            case 6:
                break;
            //h
            case 7:
                //$('.k-h-section-h .section-t-pr').removeClass('section-t-pr').toggleClass('section-t-p-r');
                $('.k-h-section-h .thumbnail').eq(0).fadeIn(1000);
                $('.k-h-section-h .thumbnail').eq(1).fadeIn(1500);
                $('.k-h-section-h .thumbnail').eq(2).fadeIn(2000);
                break;
            //i
            case 8:
                break;
            //j
            case 9:
                //$('.k-h-section-j .section-t-pr').removeClass('section-t-pr').toggleClass('section-t-p-r');
                $('.k-h-section-j .thumbnail').eq(0).fadeIn(1000);
                $('.k-h-section-j .thumbnail').eq(1).fadeIn(1500);
                $('.k-h-section-j .thumbnail').eq(2).fadeIn(2000);
                $('.k-h-section-j .thumbnail').eq(3).fadeIn(2500);
                break;
            //k
            case 10:
                break;
            //o
            case 11:
                break;
        }
    },
    imgFix:function(){
        $(window).on('resize ',function(){
            if( $(window).width()<1024&& $('.imgfixIs').hasClass('imgfix')==false){
                $('.imgfixIs').addClass('imgfix');
                //
            }else if( $(window).width()>1024&& $('.imgfixIs').hasClass('imgfix')==true){
                $('.imgfixIs').removeClass('imgfix');
            }
        });
        if( $(window).width()<1024&& $('.imgfixIs').hasClass('imgfix')==false){
            $('.imgfixIs').addClass('imgfix');
        }
    },
    screenFix:function(){
        $(window).on('resize ',function(){
            if( $(window).width()<1024){
                $('.kmjr-container').addClass('kmjr-container-action');
                //
            }else if( $(window).width()>1024){
                $('.kmjr-container').removeClass('kmjr-container-action');
            }
        });
        if( $(window).width()<1024){
            $('.kmjr-container').addClass('kmjr-container-action');
        }

    }/*,
    qqGetOnline:function(){
        var _qqInline = $('#qq-online');
        if(online[0]>0){
            _qqInline.attr({'src':'http://pub.idqqimg.com/qconn/wpa/button/button_21.gif'})
        }else{
            _qqInline.attr({'src':'http://pub.idqqimg.com/qconn/wpa/button/button_20.gif'})
        }
    }*/
};

(function(a,b,c){

    k.startIntereatPin();
    if(k.browserAdapter()){
        k.scrollListener();
        k.screenFix();
    }else{
        k.placeHolderLable();
        k.msgUpgradeBrowser();
    }

})(jQuery);