/*hetao 2015-11-13*/
;var km={
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

    //计息
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
    },
    //拨盘加载
    rangeSlide : function(o){
        'use strict';
        var c   = {};
        c.$rangeScale       = o.$rangeScale ||$('#range-scale')||{};
        c._rangeScale       = o._rangeScale||document.getElementById('range-scale')||[];
        c.$rangeTotal       = o.$rangeTotal||$('#range-total')||{};
        c._rangeTotal       = o._rangeTotal||document.getElementById('range-total')||[];
        c._rangeAjProfit    = o._rangeAjProfit||$('#range-aj-profit')||{};
        c._rangeBankProfit  = o._rangeBankProfit||$('#range-bank-profit')||{};
        c._dataBalanceMax   = o._dataBalanceMax||$('#range-scale').attr('data-balance-max')||0;
        c._dataBalanceMin   = o._dataBalanceMin||$('#range-scale').attr('data-balance-min')||0;
        c._dataDefault      = o._dataDefault||$('#range-scale').attr('data-default')||0;
        c._ajProfit         = o._ajProfit||$('#range-aj-profit')||{};
        c._bankProfit       = o._bankProfit||$('#range-bank-profit')||{};
        c._stageRadio       = o._stageRadio||$('[data-stage-radio]')||{}
        c._iptRangeVal      = o._iptRangeVal||$('#range-scale-value')||{};
        c.unit              = o.unit||'yuan';//元全部显示，万小数点后进一位
        c.type              = o.type||0;//0:理财||1:分期

        var _rangeSlide={
             touch: ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,//是否支持touch事件
             events:{
                 _startPos:{},
                 _endPos:{},
                 _rangePosLeft:Number(c.$rangeScale.css('left').replace(/px/g,'')),
                 handleEvent:function(event){
                     var self = this;
                     if(event.type=='touchstart'){
                         self.start(event);
                     }else if(event.type=='touchmove'){
                         self.move(event);
                     }else if(event.type=='touchend'){
                         self.end(event);
                     }else if(event.type=='change'){
                         self.change(event);
                     }
                     //console.log(self._range);
                 },
                 start:function(event){
                     //console.log(_rangeScale);
                     //多点触摸，返回
                     if(event.targetTouches.length>1||event.scale && event.scale !== 1) return;
                     var _touch = event.targetTouches[0];
                     this._startPos = {x:_touch.pageX,y:_touch.pageY,time:+new Date()};
                     this._rangePosLeft = Number(c.$rangeScale.css('left').replace(/px/g,''));
                     c._rangeScale.addEventListener('touchmove',this,false);
                     c._rangeScale.addEventListener('touchend',this,false);
                 },
                 move:function(event){
                     var _touch = event.targetTouches[0];
                     this._endPos = {x:_touch.pageX-this._startPos.x,y:_touch.pageY-this._startPos.y,time:+new Date};
                     var isVertical = Math.abs(this._endPos.x)>Math.abs(this._endPos.y)?1:0;//垂直滑动
                     var isHorizontal = 0;//水平滑动 1：left,0;right
                     if(isVertical){
                         //禁止上下滑动默认行为
                         event.preventDefault();
                         var self = this;
                         if(self._rangePosLeft+Number(self._endPos.x)>= -c._dataBalanceMax && self._rangePosLeft+Number(self._endPos.x)<=-c._dataBalanceMin){
                             c.$rangeScale.css('left',(self._rangePosLeft+Number(self._endPos.x)) +'px');
                             //计算当前存入总值
                             var calculatedValue =  Math.abs(self._rangePosLeft+Number(self._endPos.x));

                             //当前转入额是否可input输入
                             if(c.$rangeTotal.val()){
                                 //单位万||元
                                 if(c.unit==='yuan'){
                                     c.$rangeTotal.val(calculatedValue);
                                     //理财，区分爱家与银行收益；分期，区分各个分期额度
                                     if(o.type==0){
                                         c._rangeAjProfit.text(self.calculatedValueProfit(_KMJR_YIELD,calculatedValue).toFixed(2));
                                         c._rangeBankProfit.text(self.calculatedValueProfit(_BANK_YIELD,calculatedValue).toFixed(2));
                                     }
                                 }else{
                                     c.$rangeTotal.val(calculatedValue/10);
                                     c._iptRangeVal.val(calculatedValue/10);
                                 }
                             }else{
                                 //单位万||元
                                 if(c.unit==='yuan'){
                                     c.$rangeTotal.text(calculatedValue);
                                 }else{
                                     c.$rangeTotal.text(calculatedValue/10);
                                     //理财，区分爱家与银行收益；分期，区分各个分期额度
                                     if(o.type==1){
                                         self.calculatedStage(_KMJR_RATE,calculatedValue/10);
                                     }
                                 }
                             }
                         }

                     }
                 },
                 end:function(event){
                     c._rangeScale.removeEventListener('touchmove',this,false);
                     c._rangeScale.removeEventListener('touchend',this,false);
                 },
                 //input输入类型，值改变的状态
                 change:function(){
                     var _iptVal = c.$rangeTotal.val();
                     c.$rangeScale.css('left',-_iptVal+'px');
                     var calculateValueProfit = function(p,deposit){
                         return deposit*p*30/365
                     }
                     c._rangeAjProfit.text(calculateValueProfit(_KMJR_YIELD,_iptVal).toFixed(2));
                     c._rangeBankProfit.text(calculateValueProfit(_BANK_YIELD,_iptVal).toFixed(2));
                 },
                 //计算存入爱家宝一月的收益
                 calculatedValueProfit: function(p,deposit){
                     return deposit*p*30/365;
                 },
                 //计算分期偿还额 r:费率 b:借款额 s:分期数
                 calculatedValueStage:function(r,b,s){
                    return ((b*r+b/s)*10000).toFixed(2)+'x'+s+'期';
                 },
                 //各种分期类型 r:费率 b:借款额
                 calculatedStage : function(r,b){
                     var _rate = r||{}
                     var _borrow = b|| 0;
                     var _self = this;
                     c._stageRadio.each(function(i,n){
                         //console.log($(this));
                         var _type = $(this).attr('data-stage-radio');
                         var _stage = $(this).attr('data-stage-type');
                         switch(_type){
                             //婚宴
                             case "wedding":
                                 $(this).find('label.ui-btn').text(_self.calculatedValueStage(_rate._WEDDING._MONTH_ALL[i],_borrow,_stage));
                                 break;
                             //教育
                             case "edu":
                                 $(this).find('label.ui-btn').text(_self.calculatedValueStage(_rate._EDU._MONTH_ALL[i],_borrow,_stage));
                                 break;
                             //装修
                             case "renovation":
                                 $(this).find('label.ui-btn').text(_self.calculatedValueStage(_rate._RENOVATION._MONTH_ALL[i],_borrow,_stage));
                                 break;
                             //旅行
                             case "travel":
                                 $(this).find('label.ui-btn').text(_self.calculatedValueStage(_rate._TRAVEL._MONTH_ALL[i],_borrow,_stage));
                                 break;
                         }


                     });
                 }

             },
             init:function(){
                 var self = this;
                 //滑动监听
                 if(!!self.touch) c._rangeScale.addEventListener('touchstart',self.events,false);
                 //输入框值改变
                 if(c._rangeTotal) c._rangeTotal.addEventListener('change',self.events,false);
                 $(document).ready(function(){
                     c.$rangeScale.css('left',-c._dataDefault+'px');
                     if(c.$rangeTotal.val()){
                         c.$rangeTotal.val(c._dataDefault);
                     }else{
                         if(c.unit==='wan'){
                             c.$rangeTotal.text(c._dataDefault/10);
                             c._iptRangeVal.val(c._dataDefault/10);
                         }

                     }
                 });
             }
        };
        _rangeSlide.init();
     },
    //对话框
    dailog : function(o){
        //
        'use strict';
        var o = o||{};
        var c = {};
        //窗口打开按钮
        c.$openBtn = o.$openBtn|| $('[data-open-btn="open-dialog"]')||{};
        //窗口关闭按钮
        c.$closeBtn =o.$closeBtn|| $('[data-close-btn="close-dialog"]')||{};
        c.$openBtn.on('click',function(){
            //即将要打开窗口的ID
            var openDialogName = $(this).attr('data-open-name');
            $("#"+openDialogName).fadeIn(100);
        });
        c.$closeBtn.on('click',function(){
            //即将要打开窗口的ID
            //var openDialogName = $(this).attr('data-open-name');
            $(this).parents('[data-name="msg-dialog"]').fadeOut(100);
        });
    },
    event:{
        _listeners:{},
        addEvent:function(type,fn){
            if(typeof this._listeners[type] === 'undefined'){
                this._listeners[type] = [];
            }
            if(typeof fn === 'function'){
                this._listeners[type].push(fn);
            }
            return this;
        },
        actionEvent:function(){},
        touchLeft:function(type){

        },
        touchRight:function(){},
        touchTop:function(){},
        touchBottom:function(){},
        removeEvent:function(type,fn){

        }
    },
    sliderImg:function(o){
        'use strict';
        var o                   = o||{};
        var c                   = {};
            c._imgList          = o._imgList || $('[data-slider="images-list"]') ||{};
            c._imgActiveBtn     = o._imgActiveBtn || $('[data-slider="images-active-btn"] li a') ||{};
            c._sliderContainer  = o._sliderContainer || document.getElementsByTagName('body') ||{};

        var  sliderImg  = {
            //是否支持touch事件
            touch : ('ontouchstart' in window)||window.DocumentTouch && document instanceof DocumentTouch,
            events:{
                    handleEvent:function(event){
                        var self = this;
                        if(event.type       ==  'touchstart'){
                            self.start(event);
                        }else if(event.type =='touchmove'){
                            self.move(event);
                        }else if(event.type =='touchend'){
                            self.end(event);
                        }
                    },
                    //开始滑动
                    start:function(event){
                        //多点触摸，返回
                        if(event.touches.length>1||event.scale&&event.scale!==1) return;
                        var _touchesTarget  = event.touches[0];
                        //var _this = this;
                        console.log(window.screen);
                        this._startPos =  {x:_touchesTarget.pageX,y:_touchesTarget.pageY,screenWidth:_touchesTarget};
                        window.addEventListener('touchmove',this,false);
                        window.addEventListener('touchend',this,false);
                        //console.log(_startPos)
                        //alert(event.touches.rotationAngle)
                        //console.log(event.touches);
                        //console.log(event.targetTouches);
                        //console.log(event.changedTouches);

                    },
                    //滑动方向
                    move:function(event){
                        event.preventDefault();
                        var _touchesEnd     = event.touches[0];
                        var _endPos         = {x:_touchesEnd.pageX,y:_touchesEnd.pageY};
                        //滑动方向
                        this._startPos.x > _endPos.x?this._isMoveLeft = false:this._isMoveLeft = true;
                    },
                    //释放滑动监听
                    end:function(event){
                        //屏幕宽度
                        var _winWidth           = window.screen.width;
                        //imglist偏移量
                        var _imgListPosition    = c._imgList.offset().left;
                        //当前第几张图片
                        var _imgStep            = Math.abs(_imgListPosition/_winWidth)+1;
                        
                        if(this._isMoveLeft==true&&_imgStep>1&&_imgStep<=3){
                            //手指向右划
                            //图片组往上一张滚动
                            c._imgList.animate({'left': -(_imgStep-2)*_winWidth});
                            //状态按钮选中效果全部清除
                            c._imgActiveBtn.removeClass('active');
                            //状态按钮
                            c._imgActiveBtn.eq(_imgStep-2).addClass('active')
                        }else if(this._isMoveLeft==false&&_imgStep<=2){
                            //手指向左划
                            //图片组往下一张滚动
                            c._imgList.animate({'left':-_imgStep*_winWidth});
                            //状态按钮选中效果全部清除
                            c._imgActiveBtn.removeClass('active');
                            //状态按钮
                            c._imgActiveBtn.eq(_imgStep).addClass('active')
                            
                        }
                        
                    }
                },
            init:function(){
                    var self = this;
                    if(!!self.touch){
                        //document.getElementById('sliderImg-01').addEventListener('touchstart',self.events,false);
                       window.addEventListener('touchstart',self.events,false);
                    }
                }
            };
        //初始slider
        sliderImg.init();
    }
};

/*
(function($){
    //km._range.init();
})(jQuery);*/
