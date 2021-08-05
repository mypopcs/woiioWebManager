import pubModel from "./public.js";
import dataHand from "./dataMode.js";


//获取 ID 的公共方法
const elById = (IdName) => document.getElementById(IdName);

class newTab {

    //方法激活
    initHandlers(){
        const doc = $(document.body)
        doc.on('change', '#form_url', () => pubModel.changeInputUrl()),
        doc.on('click', '#save_bookmark_btn', () => dataHand.saveBookmark())
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
        dataHand.renderTiles()
        this.initHandlers()
        // this.initPreview()
    }
}
var index = new newTab;

index.init()

export default index