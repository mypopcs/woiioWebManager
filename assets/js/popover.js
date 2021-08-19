import dataHand from "./dataMode.js"

//获取 ID 的公共方法
const elById = (IdName) => document.getElementById(IdName);

class popover {
    //添加新网站
    AddDialogShow(){
        $('#add_dialog').addClass('show')
    }
    //隐藏弹窗
    dialogHidden(){
        $('.cancel-btn').closest('.modal').removeClass('show')
    }
    /*---------------编辑弹窗-----------------*/
    showEditModal(a) {
        a.preventDefault(),
        a.stopPropagation();
        const b = $(a.target).closest('.col-xl-4').index(), c = dataHand.bookmarks[b]
        $('#save-bookmark-btn').attr('data-item-id', b)
        elById('save_bookmark_btn').innerHTML = '保存更新'
        elById('add_title').innerHTML = '编辑书签'
        elById('form_url').value = c.url
        elById('form_title').value = c.title
        elById('web_preview').src = c.preview
        this.AddDialogShow()
        dataHand.bodyClick()
    }
    /*---------------删除弹窗-----------------*/
    showRemoveModal(event) {
        /*
         * preventDefault() 该方法将通知 Web 浏览器不要执行与事件关联的默认动作（如果存在这样的动作）
         * stopPropagation() 该方法将停止事件的传播，阻止它被分派到其他 Document 节点。
         * closest() 方法获得匹配选择器的第一个祖先元素，从当前元素开始沿 DOM 树向上。
         * attr() 方法设置或返回被选元素的属性和值。当该方法用于返回属性值，则返回第一个匹配元素的值。当该方法用于设置属性值，则为匹配元素设置一个或多个属性/值对。
        */
        event.preventDefault()
        event.stopPropagation()
        //获得具体哪条书签的位置编号
        const b = $(event.target).closest('.col-xl-4').index();
        console.log(b)
        //将位置编号赋予弹出窗的一个值
        $('#remove_confire_btn').attr('data-item-id', b)
        $('#delete_confire_dialog').addClass('show')
        //隐藏其他
        dataHand.bodyClick()
    }
}

const DomPopover = new popover()

export default DomPopover