import pubModel from "./public.js";

//获取 ID 的公共方法
const elById = (IdName) => document.getElementById(IdName);

class datahand {

    //constructor方法，这就是构造方法，而this关键字则代表实例对象
    constructor(){
        this.data = {
            version: 103,
            titlesCount : 0,
            columnCount: 6, //列
            backgroundImg: ''
        },
        this.bookmarks = [],
        this.history = [],
        this.ref = ''
    }

    /*---------------存储数据方法-----------------*/
    //存储数据方法
    saveData(reload) {
        chrome.storage.local.set({
            data: this.data,
            bookmarks: this.bookmarks
        }, function(){
            //存储后自动刷新
            if(reload){chrome.tabs.reload();}
        })
    }
    //获取数据方法
    getData(){
        chrome.storage.local.get((bookmarkList) => {
            if (bookmarkList.data) {
                this.data = bookmarkList.data;
            }
            if (bookmarkList.bookmarks) {
                this.bookmarks = bookmarkList.bookmarks;
            }
            if (bookmarkList.ref) {
                this.ref = bookmarkList.ref
            }
        })
    }

    /*---------------执行存储方法-----------------*/
    saveBookmark(){
        //定义存储数据模型
        const initBookmarkValue = {
            url: pubModel.addHttp(elById('form_url').value),
            title: elById('form_title').value,
            preview: elById('web_preview').style.backgroundImage.replace(/"/g, ''),
            initPreview: !0
        };
        console.log(this.bookmarks)

        if(initBookmarkValue.url && pubModel.isValidUrl(initBookmarkValue.url)){
            this.bookmarks.push(initBookmarkValue),
            this.saveData(),
            //保存后清空内容
            pubModel.clearForm()
            console.log('保存成功')
        } else {
            alert('错误')
        }
        
    }
}

const dataHand = new datahand()

export default dataHand