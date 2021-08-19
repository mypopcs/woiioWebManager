import pubModel from "./public.js";
import index from "./index.js";
import DomPopover from "./popover.js"

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

const _CONTEXT_MENU_BOX = `<div class="card-menu">
                                <button class="card-menu-button button fade">
                                    <span class="icon">
                                        <i class="mdi mdi-menu"></i>
                                    </span>
                                </button>
                                <div class="dropdown-menu" id="dropdown-menu">
                                    <div class="dropdown-content">
                                        <a href="#" class="dropdown-item open-in-new-tab">新标签页打开</a>
                                        <a class="dropdown-item open-in-private">隐私模式打开</a>
                                        <hr class="dropdown-divider">
                                        <a href="#" id="edit_tile" class="dropdown-item edit-tile">编辑</a>
                                        <a href="#" id="remove_tile" class="dropdown-item remove-tile">删除</a>
                                    </div>
                                </div>
                           </div>`

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
            if(reload){
                chrome.tabs.reload();
            }
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
    saveBookmark(a){
        const eventId = $(a.target).attr('data-item-id'),
            //定义存储数据模型
            initBookmarkValue = {
            url: pubModel.addHttp(elById('form_url').value),
            title: elById('form_title').value,
            preview: elById('web_preview').src.replace(/"/g, ''),
            initPreview: !0
        };
        if(initBookmarkValue.url && pubModel.isValidUrl(initBookmarkValue.url)){
            eventId === void 0 ? this.bookmarks.push(initBookmarkValue) : this.bookmarks[+eventId] = initBookmarkValue,
            DomPopover.dialogHidden()
            this.saveData(true),
            this.renderTiles(),
            //保存后清空内容
            pubModel.clearForm()
            console.log(initBookmarkValue.url)
            return
        } else {
            alert('错误')
            return
        }
    }

    /*---------------获取数据方法-----------------*/
    renderTiles() {
        let masterDom = ''
        this.bookmarks.forEach((b) => {
            masterDom += `<div class="col-xl-4">
                            <div class="card">
                                <div class="card-image">
                                    <figure class="image is-4by3">
                                        <img class="preview" src="${b.preview||'none'}" alt="${b.title}">
                                    </figure>
                                    ${_CONTEXT_MENU_BOX}
                                </div>
                                <div class="card-content">
                                    <div class="media">
                                        <div class="media-left">
                                            <figure class="image is-24x24">
                                                <img src="http://www.google.com/s2/favicons?domain=${b.url}" alt="${b.title}">
                                            </figure>
                                        </div>
                                        <div class="media-content">
                                            <p class="title is-size-6">${b.title}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`
        });
        elById('tiles')['innerHTML'] = masterDom
    }
    
    //隐藏菜单
    bodyClick(a) {
        a && 0 < $(a.target).closest('#sidebar, #settings-btn, .context-menu-box').length || ($('#sidebar, #settings-btn').removeClass('active'),
        $('.context-menu').slideUp(100),
        $('.context-menu-button').removeClass('focus'))
    }

    //删除书签
    removeBookmark(event) {
        const b = +$(event.target).attr('data-item-id');
        console.log(b)
        //splice() 方法向/从数组中添加/删除项目，然后返回被删除的项目
        this.bookmarks.splice(b, 1),
        this.saveData(true)
    }
}

const dataHand = new datahand()

export default dataHand