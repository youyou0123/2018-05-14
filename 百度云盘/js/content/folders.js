/*
    通过数据，渲染出当前文件夹区域的内容
*/
const folders = document.querySelector('.folders');
const fEmpty = document.querySelector('.f-empty');
//调用函数，传入id
render(0);
//封装函数，渲染当前文件夹
function render(id){
    //渲染是先清理
    folders.innerHTML = '';
    // 首先调用函数 获取当前数据下第一层子级结构的所有数据
    let arr = t.getChild(id);
    //首先判断一下当前数据究竟有没有子级结构，有就循环，没有就跳出
    if(!arr){
        //设置背景图显示
        fEmpty.style.display = 'block';
        //设置全选按钮样式为空
        checkedAll.className = '';
        return;
    }else{
        //如果有子级结构，隐藏背景图
        fEmpty.style.display = 'none';
        /*
            只要点击选择，一定走render函数
        */
        checkedAll.className = arr.every(e=>e.checked)?' checked':'';
        arr.forEach(e=>{
            //创建元素
            let div = document.createElement('div');
             //判断当前div是否选中，选中就添加hov样式，否则为空
            div.className =  'file-item' + `${e.checked?' hov':''}`;
             //设置自定义样式，为了后期分辨是否选中
            div.dataset.id = e.id;
            
            //创建元素
            let img = document.createElement('img');
            img.src = 'img/folder-b.png';
            //双击图片的时候，进入下一层
            img.ondblclick = function(){
                //将它同层的变为
                arr.forEach(e=>e.checked = false);
                //获取当前数据下的子级结构
                let childArr = t.getChild(e.id)
                
                if(childArr){
                    childArr.forEach(e=>e.checked = false);
                }
                //
                render(e.id);
                renderNav(e.id);

            }

            let span = document.createElement('span');
            span.className = 'folder-name';
            span.innerHTML = e.title;
    
            let input = document.createElement('input');
            input.className = 'editor';
            input.value =  e.title;

            let i = document.createElement('i');
            console.log(i)
            i.onclick = function(){
                //设置选中就取消，取消就选中
                e.checked = !e.checked;
                render(id);

            }

            i.className = e.checked?'checked':'';
            div.appendChild(img);
            div.appendChild(span);
            div.appendChild(input);
            div.appendChild(i);
            folders.appendChild(div);

        });
        //为全选按钮绑定点击事件
        checkedAll.onclick = function(){
            //设置只有有数据的时候才能点击全选按钮
            //如果没有数据的时候，执行下列操作
            if(fEmpty.style.display == 'none'){
                //为当前按钮设置选中状态   添加选中的class
                let onOff = this.classList.toggle('checked');

                arr.forEach(e=>e.checked = onOff);
                render(id);

            }
        }

    }
    
}