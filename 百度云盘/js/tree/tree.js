/*
    渲染树形菜单
*/
//获取菜单区域
const treeMenu = document.querySelector('.tree-menu');
//封装渲染函数
function renderTree(pid,num){
    //调用工具函数，传参pid,用来获取数据下所有子级元素
    let child = t.getChild(pid);
    //判断如果没有子级就返回空字符串
    if(!child)return '';

    num ++;
    //获取到子级元素后，拼接生成数据
    //首先拼接最外层ul  处理左侧距离逐渐缩进问题
    let html = `<ul style="padding-left:${num*10}px">`;
    //循环所有子级元素
    child.forEach(e=>{
        //拼接li结构  寻找当前结构下所有的子级，如果有，就继续生成，没有，就为空
        html +=`
            <li>
                <div class="tree-title">
                    <span data-id="${e.id}" class="${t.getChild(e.id)?('open'):('')}"><i></i>${e.title}</span>
                </div>
                ${renderTree(e.id,num)/*如果有子数据就调用自己，递归生成下级结构*/}
            </li>
        `
    })
    //拼合ul
    html += '</ul>';
    //将拼接好的结构return出去
    return html;
}
//将拼接好的结构放入区域中
treeMenu.innerHTML = renderTree(-1,-1);