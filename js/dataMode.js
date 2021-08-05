import pubModel from "./public.js";
import index from "./index.js";

//获取 ID 的公共方法
const elById = (IdName) => document.getElementById(IdName);

const _PRELOAD_WRAPPER = 	'<div id="preloader-in-modal" class="preloader-wrapper active">' + 
								'<div class="spinner-layer spinner-blue-only">' +
									'<div class="circle-clipper left">' + 
										'<div class="circle"></div>' + 
									'</div>' + 
									'<div class="gap-patch">' + 
										'<div class="circle"></div>' + 
									'</div>' + 
									'<div class="circle-clipper right">' + 
										'<div class="circle"></div>' + 
									'</div>' + 
								'</div>' + 
							'</div>';

const _CONTEXT_MENU_BOX =	'<div class="context-menu-box">' + 
    '<button class="context-menu-button icon"></button>' + 
    '<div class="context-menu">' + 
        '<ul role="menu" class="context-menu-list">' + 
            '<li class="context-menu-item open-in-new-tab"><span class="icon icon-spacer icon-new-window"></span>新标签页打开</li>' + 
            '<li class="context-menu-item open-in-private"><span class="icon icon-spacer icon-new-window-private"></span>隐私模式打开</li>' + 
            '<li class="separator"></li>' + 
            '<li class="context-menu-item edit-tile"><span class="icon icon-spacer icon-edit"></span>编辑</li>' + 
            '<li class="context-menu-item remove-tile"><span class="icon icon-spacer icon-delete"></span>删除</li>' + 
        '</ul>' + 
    '</div>' + 
'</div>';

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
        this.ref = '',
        this.getData()
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
            //执行一次数据获取
            index.init()
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

        if(initBookmarkValue.url && pubModel.isValidUrl(initBookmarkValue.url)){
            this.bookmarks.push(initBookmarkValue),
            this.saveData(),
            this.renderTiles(),
            //保存后清空内容
            pubModel.clearForm()
        } else {
            alert('错误')
        }
        
    }

    /*---------------获取数据方法-----------------*/
    renderTiles() {
        let a = '';
        this.bookmarks.forEach((b) => {
            a += `<div class="tile-box"><a class="tile" href="${b.url}" title="${b.title}"><div class="head"><div class="favicon"><img src="http://www.google.com/s2/favicons?domain=${b.url}"></div><div class="title">${b.title}</div>${_CONTEXT_MENU_BOX}</div><div class="body" style="background-image: ${b.preview||'none'};">${b.initPreview?'':_PRELOAD_WRAPPER}</div></a></div>`
        });
        elById('tiles')['innerHTML'] = a
    }
}

const dataHand = new datahand()

export default dataHand