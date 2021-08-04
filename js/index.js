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

    //总入口
    init(){
        this.initHandlers()
    }
}
var index = new newTab;

index.init()