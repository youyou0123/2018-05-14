/*
    新建文件夹按钮
*/
const create = document.getElementById('create');

//为按钮创建点击事件
create.onclick = function(){
    //获取路径导航下所有span标签中第一个有自定义标识的元素
    //用于显示当前的数据
    let pid = breadNav.getElementsByTagName('span')[0].dataset.id;   
   
    //获取当前父级下所有的子数据
    let arr = t.getChild(pid); 
    //清空全选按钮   避免新建一个时候全选被勾选
    checkedAll.className = '';
    //调用新建文件夹函数，传参父级下的所有子数据 
    createItem(arr,pid);
   
}

//封装函数，创建新文件夹
let num = 0;
let onOff = true;
function createItem(arr,pid){
   
    //首先判断有没有子级元素，如果有，才执行新建
    // if(arr){
    //     //查询title中是否包含新建文件夹这几个字，查完后将结果放入新的数组中
    //     let filterArr = arr.filter(e=>e.title.includes('新建文件夹'));
    //     //设置新建文件夹名字递增
    //     if(filterArr.length){
    //         num = filterArr.length+1;
    //     }

    // }else{
    //     //如果没有，隐藏背景图
    //     fEmpty.style.display = 'none';
    // }
    num++;
    if(num == 1 && onOff){
       num= '';
        onOff = false;
    }
    if(num == 1){
        num =2;
    }

    //新建最初，创建节点
    let div = document.createElement('div');
    div.className = 'file-item lang';
    let img = document.createElement('img')
    img.src =  'img/folder-b.png';
    let input = document.createElement('input');
    input.className = 'editor';
    input.style.display = 'block';
    //判断一下是否需要顺序增加名字  需要就增加，不需要就为空
    input.value = '新建文件夹'+(num?num:'');
    //为input绑定失焦事件
    input.onblur = function(){
        let val = this.value;
        //判断是否重名
        if( arr && arr.some(e=>e.title == val)){
            //如果名字一致，就绑定焦点事件
            this.focus();
            //同时绑定文字聚焦，方便修改文件夹名字
            this.select();
            //调用弹框，提示重复了
            openFullTip('名字重复!');
        }else{
            //如果没有重名，就可以继续添加数据
            //赋值时间戳，创建绝不重复的值
            let createId = +new Date;
            data[createId] = {
                "id": createId,
                // "pid":pid,
                pid,
                "title": val,
                "type": "file",
                "checked":false
            }
            //不重名是返回当前新的pid
            render(pid);
            //将当前新建的文件夹数据渲染到树形菜单
            treeMenu.innerHTML = renderTree(-1,-1);

        }
    }

    let i = document.createElement('i');

    //创建节点后，将新建节点放入div中
    div.appendChild(img);
    div.appendChild(input);
    div.appendChild(i);
    //将div放入folders
    folders.appendChild(div);
    //新建完成时，默认文字聚焦
    input.select();

}