/*
    重命名
*/
//获取重命名按钮
const rename = document.getElementById('rename');
//绑定点击事件
rename.onclick = function(){
    ////获取导航栏下面第0 个span下面有自定义id的这个元素  赋值给pid
    let pid = breadNav.getElementsByTagName('span')[0].dataset.id;
    //将当前元素的子级结构赋值给arr
    let arr = t.getChild(pid);
    //在arr下面创建一个新数组，过滤出选中的元素赋值给arr2
    let arr2 = arr.filter(e=>e.checked);
    /*
        处理同名
    */
    //判断如果选中arr2有长度 并且小于2
    if(arr2.length && arr2.length < 2){
        //将文件夹区域下所有子级放入div中
        let divs = folders.children;
        //循环当前页面中的文件夹
        for(let i=0;i<divs.length;i++){
            //判断当前的divs中是否包含hov这个class名
            //如果包含证明是选中状态
            if(divs[i].classList.contains('hov')){
                //获取当前元素下的第0个span 和 input
                let span = divs[i].getElementsByTagName('span')[0];
                let txt = divs[i].getElementsByTagName('input')[0];
                //设置span隐藏 tex显示，用以修改
                span.style.display = 'none';
                txt.style.display = 'block';
                //文字聚焦
                txt.select();
                //文字失焦时
                txt.onblur = function(){
                    //获取当前value
                    let val = this.value;
                    let o = arr.some(e=>{
                    //设置循环检测元素中的新名字是否等于原来的名字
                    //如果不等于，证明不重名，将当前的名字返出去赋值作为新修改的名字
                    if(e.title != arr2[0].title){
                            //将当前的val值赋值给e.title 并return出去  重命名成功
                            return e.title == val;
                        }
                    });
                    
                    //如果重名
                    if(arr && o){
                        //弹框提示
                        openFullTip('命名冲突!');
                        //当前元素自动聚焦，同时文字聚焦，方便修改
                        this.focus();
                        this.select();
                    }else{
                        
                        //可以改变数据
                        //如果没有重名，将新的val赋值给当前数据有标识的这个id
                        data[divs[i].dataset.id].title = val;
                        //重新渲染数据
                        render(pid);
                        //将当前新的数据关联入树形菜单
                        treeMenu.innerHTML = renderTree(-1,-1);
                    }
                }
            }
        }
    }else{
        //如果没有选中弹框提示
        openFullTip('请选择一个文件!');
    }
}
