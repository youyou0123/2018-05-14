/*
    处理路径栏
*/
//获取路径栏
const breadmenu = document.querySelector('.breadmenu');
//获取路径栏下的第一个子级
const breadNav = breadmenu.children[1];
//获取全选按钮
const checkedAll = document.querySelector('#checkedAll');
renderNav(0);
//封装函数
function renderNav(id){
    //通过当前的id找到他的父级数据
    let arr =t.getParents(id);
    let html = '';
    //首先判断当前数据有没有父级,如果有，执行下面代码
    if(arr){
        arr.forEach((e,i,all)=>{
            //设置导航栏中最后一个为span，不可点击，其他全部为a
            //判断如果当前是最后一个
            if(i == all.length-1){
                //拼接结构
                html += '<span data-id="'+e.id+'">'+e.title+'</span>'
            }else{
                html += '<a data-id="'+e.id+'" href="javascript:;">'+e.title+'</a>'
            }
        });
        breadNav.innerHTML = html;
    }

    //路径栏中的第一个的内容为html
    breadNav.innerHTML = html;
    //为导航栏绑定点击事件 传入ev
    breadNav.onclick = function(ev){
        if(ev.target.tagName === 'A'){
             /*
                通过id控制文件夹的内容和面包屑的内容
            */
            render(ev.target.dataset.id);
            renderNav(ev.target.dataset.id);
        }
    }
}