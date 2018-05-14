/*
    获取内容区域的高度
*/
//获取内容区域
const section = document.getElementById('section');
//获取头部区域
const head = document.getElementById('head');
//获取头部高度
let headH = head.offsetHeight;
//获取屏幕高度
let iH = window.innerHeight;
//计算内容区域的高度
section.style.height = iH - headH + 'px';
