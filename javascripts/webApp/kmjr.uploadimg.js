/**
 * upload img kmjr.uploadimg.js
 * hetao
 * 20160121
 */

define(['jquery'],function(require){
    'use strict';
    var _img        = document.getElementById('upload-img');
    var _canvas     = document.getElementById('upload-canvas');
    var _context    = _canvas.getContext('2d');
    var _getPic     = document.getElementById('upload-getPicture');
    var _reChoose   = document.getElementById('upload-re-choose');
    var _container  = document.getElementById('upload-container');
    var _loading    = document.getElementById('upload-loading');
    var _submit     = document.getElementById('upload-re-submit');
    var _packImgSize= 620;
    var _errorocb = function(){
        console.log('thr error !');
    };

    //
    _getPic.addEventListener('change',chooseImg,false);
    //选择图片
    function chooseImg(e){
        console.log(e)
        loadingToggle();
        //将本地图片写入内存
        var _file = e.currentTarget.files[0];
        //将文件读取为DataUrl
        if(_file && _file.typeOf!='undefined'){
            //debugger
            var _reader =  new FileReader();
            _reader.readAsDataURL(_file);
        }else{
            alert('图片读取失败，请重新选择图片！');
            return;
        }
        //从内存获取图片位置
        _reader.onload =function(e){
            //将预览图设置为选中图片
            _img.src= this.result;
            //图片渲染完成，并置于垂直居中
            _img.onload= function(){setImgViewer();}
        };

    }

    //
    _reChoose.addEventListener('click',reChooseImg,false);
    //rechoose
    function reChooseImg(){
        _getPic.click();
    }

    //设置图片位置
    var setImgViewer =function(){
        //当前图片原始高宽
        var _img            = document.getElementById('upload-img');
        var _srcImg         = document.createElement('img');
        _srcImg.src      =  _img.src;
        var _imgWidth       = _srcImg.width;
        var _imgHeight      = _srcImg.height;
        //当前容器高宽
        var _contWidth    = _container.clientWidth;
        var _contHeight   = _container.clientHeight;
        //debugger;

        //由容器高宽比，确定图片以高还是宽显示
        if((_contWidth/_contHeight)>=(_imgWidth/_imgHeight)){
            _img.style.width='';
            _img.style.height= _contHeight*0.8+'px';
            //debugger;
        }else{
            _img.style.width= _contWidth*0.8+'px';
            _img.style.height='';
            //debugger;
        }
        //
        loadingToggle();
        compressImg(_img,_imgWidth/_imgHeight);
    };

    //
    var loadingToggle = function(){
        if(_loading.style.display=='none'){
            _loading.style.display='block'
        }else{
            _loading.style.display='none'
        }
    }

    //压缩图片
    var compressImg = function(_img,ratio){
        //设置画布高宽
        _canvas.width = _packImgSize;
        _canvas.height = _packImgSize/ratio;
        //清除画布
        _context.clearRect(0,0,_canvas.clientWidth,_canvas.clientHeight);
        //将图片绘入画布
        _context.drawImage(_img,0,0,_canvas.clientWidth,_canvas.clientHeight);
        var _getImg = _canvas.toDataURL('image/jpeg');
        //console.log(_canvas.toDataURL('image/jpeg'))
        window.open(_canvas.toDataURL('image/jpeg'))
    };

    //send img
    var sendImg = function(){

    };

    //清除事件监听
    //_getPic.removeEventListener('change')
});