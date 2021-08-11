//获取 ID 的公共方法
const elById = (IdName) => document.getElementById(IdName);

class popover {
    dialogShow(){
        // console.log('1232')
        $('#add_dialog').addClass('show')
    }
    dialogHidden(){
        // $('add_dialog').hide()
        $('#add_dialog').removeClass('show')
    }
}

const DomPopover = new popover()

export default DomPopover