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
        var msg = msg || '您的浏览器版本太低，为了您的财务安全，请尽快升级到最新的浏览器。<a href="javascript:;" id="bowserUpdateMsg">不在提醒</a>';
        var temp ='<div class="alert fadeOut text-center" id="msgUpgradeBrowser">';
        temp=temp+'<button type="button" class="close" data-dismiss="alert">&times;</button>';
        temp=temp+msg;
        temp=temp+'</div>';
        $('body').prepend(temp);
        var setTimeoutDown = self.setTimeout(function(){
            $('#msgUpgradeBrowser').slideDown(2000);
        },3000);
        var setTimeoutUp = self.setTimeout(function(){
            $('#msgUpgradeBrowser').slideUp(2000,function(){$(this).remove()});
        },10000)
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
        },1000)
    }
};