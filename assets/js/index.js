import pubModel from "./public.js";
import dataHand from "./dataMode.js";
import DomPopover from "./popover.js"

//获取 ID 的公共方法
const elById = (IdName) => document.getElementById(IdName);

class newTab {

    //方法激活
    initHandlers(){
        const doc = $(document.body)
        doc.on('change', '#form_url', () => pubModel.changeInputUrl()),
        doc.on('click', '#save_bookmark_btn', () => dataHand.saveBookmark()),
        doc.on('click', '#edit_tile', (a) => dataHand.showEditModal(a)),
        doc.on('click', '#remove_tile', (a) => dataHand.showRemoveModal(a)),
        doc.on('click', '#remove-bookmark-btn', (a) => dataHand.removeBookmark(a)),
        doc.on('click', '#new_web', () => DomPopover.dialogShow()),
        doc.on('click', '#close_dialog', () => DomPopover.dialogHidden())
    }

    //缩略图
    // initPreview() {
    //     const a = dataHand.bookmarks.find((a) => !1 === a.initPreview);
    //     a && this.createPreview(a.url, (b) => {
    //         b && (a.preview = `url(${b})`), a.initPreview = !0, dataHand.saveData(), dataHand.renderTiles(), this.initPreview()
    //     })
    // }

    //总入口
    init(){
        dataHand.renderTiles(),
        this.initHandlers()
        // this.initPreview()
    }
}
var index = new newTab;

index.init()

export default index