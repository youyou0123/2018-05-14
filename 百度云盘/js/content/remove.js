/*
    删除按钮
*/
//获取删除按钮
const del = document.getElementById('del');
//获取确认弹框
const tanbox = document.getElementById('tanbox');

//为删除按钮绑定点击事件
del.onclick = function(){
    //点击删除按钮的时候获取可视区中的同一级数据  赋值给pid  用以判断哪个被选中
    //获取导航栏下面第0 个span下面有自定义id的这个元素  赋值给pid
    let pid = breadNav.getElementsByTagName('span')[0].dataset.id;
   
    //获取当前元素下面的子级  赋值arr
    let arr = t.getChild(pid);
    //判断这些数据中有没有选中，有选中就把弹框打开
    if(arr.some(e=>e.checked)){
        tanbox.style.display = 'block';
    }
    //为弹框绑定点击事件
    tanbox.onclick = function(ev){
        //判断如果点击了确定按钮
        if(ev.target.innerHTML == '确定'){
            /*
                循环数组，如果是选中状态的，套拿到选中id下所有的数据
                并且删除
            */
            arr.forEach(e=>{
                //如果当前是选中状态
                if(e.checked){
                    //浅拷贝一份当前元素下所有子节点的id 重新赋值
                    //找到当前元素下面的所有子级同时加上他自己
                    let removeArr = t.getChilds(e.id).concat(data[e.id]);
                    //循环并且删除这个文件夹及下面的所有子级
                    removeArr.forEach(e=>delete data[e.id]);
                }
            });
            //数据删除后就重新渲染
            render(pid);
            //将当前新的数据放入树形菜单
            treeMenu.innerHTML = renderTree(-1,-1);
            //将提示弹框隐藏
            tanbox.style.display = 'none';
        }
        //如果点击了取消按钮和 X 号
        if(ev.target.innerHTML == '取消' || ev.target.innerHTML == 'X'){
            //隐藏提示弹框，不改变数据
            tanbox.style.display = 'none';
        }
    }
}

