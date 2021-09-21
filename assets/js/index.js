import pubModel from "./public.js";
import dataHand from "./dataMode.js";
import DomPopover from "./popover.js";
import i18nMod from "./libs/i18n.js"

//获取 ID 的公共方法
const elById = (IdName) => document.getElementById(IdName);

class newTab {
    //方法激活
    initHandlers(){
        const doc = $(document.body)
        doc.on('change', '#form_url', () => pubModel.changeInputUrl()),
        doc.on('click', '#save_bookmark_btn', (a) => dataHand.saveBookmark(a)),
        doc.on('click', '#edit_tile', (a) => DomPopover.showEditModal(a)),
        doc.on('click', '#remove_tile', (a) => DomPopover.showRemoveModal(a)),
        doc.on('click', '#remove_confire_btn', (a) => dataHand.removeBookmark(a)),
        doc.on('click', '#new_web', () => DomPopover.AddDialogShow()),
        doc.on('click', '.cancel-btn', () => DomPopover.dialogHidden()),
        doc.on('click', '.card-menu-button', (event) => pubModel.openCardMenu(event))
    }

    //总入口
    init(){
        dataHand.renderTiles(),
        this.initHandlers()
        // console.log(window.screen.width, window.screen.availWidth, document.body.clientWidth)
        // this.initPreview()
        i18nMod.doI18n()
    }
}
var index = new newTab;

// index.init()

export default index