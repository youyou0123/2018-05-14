/*
    移动到按钮
*/
console.log(111)
//获取移动到按钮
const remove = document.getElementById('remove');
//获取弹框
const modelTree = document.querySelector('.modal-tree');
//获取弹框内容区域
const contentTree = document.querySelector('.content');
//获取取消按钮
const cancel = document.querySelector('.cancel');
//获取关闭按钮
const iconClose = document.querySelector('.icon_close');
//选中要移动的id
let checkedId = -1;
//为移动按钮绑定点击事件
remove.onclick = function(){
    //获取导航栏下面第0个span下面有自定义id这个元素  赋值给pid
    let pid = breadNav.getElementsByTagName('span')[0].dataset.id;
    //获取当前元素下面的子级的pip
    let arr = t.getChild(pid);
    //判断被框选或者勾选出来的id
    if( arr.some(e=>e.checked)){
        //渲染目录树
        contentTree.innerHTML = renderTree(-1,-1);
        //获取弹框下面的所有子级元素
        let contentTreeChilds = contentTree.querySelectorAll('.tree-title');
        //循环所有的元素  用以选择要移动的地方
        for( let i = 0; i < contentTreeChilds.length; i++){
            //当前元素绑定点击事件
            contentTreeChilds[i].onclick = function(){
                //循环所有元素 为当前元素的第i 个清空背景色 保证同时只能有一个被选中
                for(let i = 0; i <contentTreeChilds.length; i++){
                    contentTreeChilds[i].style.background = '';
                }
                //为当前点击的元素添加背景色
                this.style.background = 'rgba(204, 204,204,1)';
                //得到选中要移动的id
                //得到当前所有子元素中额第0个下面有自定义标识的数据
                checkedId = this.children[0].dataset.id;
            }

            //获取确定按钮
            let ok = modelTree.querySelector('.ok');
            //绑定点击事件
            ok.onclick = function(){
                //哪几个是要移动的
                //将选中的元素放入要创建的新数组中
                let checkedData = arr.filter(e=>e.checked);
                let dataLine = [];
                checkedData.forEach(e=>{
                    //每一次的数据线索
                    let arr = t.getChilds(e.id).concat(data[e.id])
                    //将新数据放到数组中
                    dataLine.push(...arr);
                });
                /*
                    如果说所有的线索中都没有移动到的id
                    就可以更改pid的值
                */
                if(!dataLine.some(e=>e.id == checkedId)){
                    checkedData.forEach(ee=>{
                        ee.pid = checkedId*1;
                        ee.checked = false;
                    });
                }else{
                    openFullTip('非法移动,报警了!');
                }
                render(pid);
                //重新渲染树形菜单
                treeMenu.innerHTML = renderTree(-1,-1);
                //隐藏弹框
                modelTree.style.display = 'none';
            }
        }
        //点击时显示弹框
        modelTree.style.display = 'block';
    }else{
        //没有选择时弹框提醒
    }
}
//如果点击取消按钮
cancel.onclick = iconClose.onclick = function(){
    //直接隐藏弹框 不修改数据
    modelTree.style.display = 'none';
}