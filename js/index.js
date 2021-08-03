import pubModel from "./public.js";

//获取 ID 的公共方法
const elById = (IdName) => document.getElementById(IdName);

class newTab {

    //方法激活
    initHandlers(){
        $(document.body).on('change', '#form_url', () => pubModel.changeInputUrl())
    }

    //总入口
    init(){
        this.initHandlers()
    }
}
var index = new newTab;

index.init()