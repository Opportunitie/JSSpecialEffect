/**
 * Created by wangtao on 2018/7/30.
 */
$(function(){

    var liNum = 125;
    init();
    function init() {
        //给#main里面添加liNum个li标签
        for(var i = 0;i < liNum;i++){
            var $li = $('<li></li>');//创建一个节点，把这节点变成一个js对象；
            var x = (Math.random() - 0.5) * 500;
            var y = (Math.random() - 0.5) * 500;
            var z = (Math.random() - 0.5) * 500;
            $li.css({
                'transform':'translate3d('+ x +'px, '+ y +'px,'+ z +'px)'
            });
            $('#main').append($li);
        }
        setTimeout(function () {
            Grid();
        },30);
    }


    function Grid() {
        $("li").each(function(i){
            var hGrep = 500,vGrep = 500, zGrep = 800;//水平垂直间隔
            var firstX = -2*hGrep;//第一个水平偏移量
            var firstY = -2*vGrep;//第一个垂直偏移量
            var firstZ = -2 * zGrep;//第一个z轴的偏移量
            var iX = (i %25) % 5;//x方向要加还上的倍数
            var iY = parseInt((i %25) / 5);//Y方向要增加的倍数
            var iZ = parseInt(i / 25);//z轴方向增加的倍数
            $(this).css({
                "-webkit-transform":"translate3d("+(firstX  + iX * hGrep)+ "px," + (firstY +iY * vGrep) + "px," + (firstZ + iZ *zGrep)+"px)",
                'transition':'4s'

            });

        });

    }
    
    
    
    
    (function () {
        var nowX,lastX,minusX, nowY, lastY, minusY;
        var rowY = 0,rowX = 0,tz = -2000;
        var timer1,timer2;
        $(document).mousedown(function (ev) {
            //console.log("鼠标按下");
            ev = ev || window.event;
            lastX = ev.clientX;
            lastY = ev.clientY;
            clearInterval(timer1);
            $(this).on("mousemove",function (ev) {
                //console.log("鼠标移动！")
                //console.log(ev);
                ev = ev||window.event;//事件对象，存放事件的相关信息
                nowX = ev.clientX;//当前鼠标X的坐标
                nowY = ev.clientY;
                minusX = nowX - lastX;
                minusY = nowY -lastY;
                //console.log(minusY);
                rowY += minusX * 0.2;
                rowX -= minusY * 0.2;
                //console.log(rowX);
                //console.log(rowY+"hai");
                $('#main').css({
                    'transform':'translateZ('+tz+'px) rotateX('+rowX+'deg) rotateY('+rowY+'deg)'
                });
                lastX = nowX;//存方前一点的X坐标
                lastY = nowY;
            });
        }).mouseup(function () {
            $(this).off('mousemove');
            timer1 = setInterval(function () {
                minusX *= 0.9;
                minusY *= 0.9;
                //console.log(minusX);
                if(Math.abs(minusX < 1) && Math.abs(minusY) < 1)
                    clearInterval(timer1);
                rowY += minusX * 0.2;
                rowX -= minusY * 0.2;
                $('#main').css({
                    'transform':'translateZ('+tz+'px) rotateX('+rowX+'deg) rotateY('+rowY+'deg)'
                });
            },50);
           // console.log("鼠标抬起！")
            // 滚轮
        }).mousewheel(function (e,d) {
            //var d = arguments[1]
            //console.log(d);
            clearInterval(timer2);
            tz += d * 80;
            tz = Math.min(0,tz);//取参数最小的
            tz = Math.max(-8000,tz);
            $('#main').css({
                'transform':'translateZ('+tz+'px) rotateX('+rowX+'deg) rotateY('+rowY+'deg)'
            });
            timer2 = setInterval(function () {
                d *= 0.85;
                if(Math.abs(d) < 0.01){
                    clearInterval(tiemr2);
                }
                tz += d * 80;
                tz = Math.min(0,tz);//取参数最小的
                tz = Math.max(-8000,tz);
                $('#main').css({
                    'transform':'translateZ('+tz+'px) rotateX('+rowX+'deg) rotateY('+rowY+'deg)'
                });
            },13)
        });
    })()
});

