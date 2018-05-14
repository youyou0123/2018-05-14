/*
    封装警告弹框
*/

//获取弹框
const fullTipBox = document.querySelector('.full-tip-box');

//封装弹框函数
function openFullTip(txt){
    let s = fullTipBox.querySelector('.tip-text');
    //设置初始透明度，方便出现时的动画效果
    fullTipBox.style.opacity = 0;
    //填充内容
    s.innerHTML = txt;
    //调用运动函数
    t.moveFn({
        el:fullTipBox,
        attr:{
            top:28,
            opacity:1
        },
        sportName:'bounceOut',
        //回调函数
        callback:function(){
            //设置延时定时器来控制出现和消失的时间
            setTimeout(function(){
                t.moveFn({
                    el:fullTipBox,
                    attr:{
                        top:-50,
                        opacity:0
                    }
                })
            },1000)
        }
    });
}