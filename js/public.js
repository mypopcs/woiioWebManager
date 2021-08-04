const elById = (IdName) => document.getElementById(IdName)

class pub{
    //网址拼合
    addHttp(webUrl){
        return -1 === webUrl.indexOf('http') ? 'http://' + webUrl : webUrl;
    }
    //网址自动替换前缀
    getRootDomain(url) {
        return url.replace(/https?:\/\//, '').replace(/\?.+/, '').replace(/\/$/, '')
    }
    //判断是否为域名地址
    isValidUrl(str){
        var pattern = new RegExp(
            '^(https?:\\/\\/)?'+ // protocol（协议)
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
			'(\\#[-a-z\\d_]*)?$','i' // fragment locator
        );
        return !!pattern.test(str);
    }

    /*---------------输入框自动填写标题-----------------*/
    changeInputUrl(){
        //获取输入的网址
        const urlValue = elById('form_url').value;

        /*chrome.history.search在历史记录中搜索与查询匹配的每个页面的上次访问记录
         * text: '' 在访问历史中查询的文本。若想获取所有页面的信息，把此参数设置为空
         * maxResults 所获取结果的最大数目。默认值为100
         * 如果有值的简写
         * find() 方法返回通过测试（函数内判断）的数组的第一个元素的值
         * val() 方法返回或设置被选元素的 value 属性，当用于返回，该方法返回第一个匹配元素的 value 属性的值，当用于设置，该方法设置所有匹配元素的 value 属性的值。
         */
        urlValue, chrome.history.search({text: '',maxResults: 1e3}, (history) => {
            // 通过find 获取到第一个匹配的数据信息
            const findResult = history.find((history) => history.url === urlValue), FormTitle = $('#form_title');
            /*
             * ? : 三元运算符判断，?前为判断式，:前为真取值，后为假取值
             * 如果有值，并且 title 有内容就执行val赋值，没有就模拟访问获取值
             */
            findResult && findResult.title ? FormTitle.val(findResult.title) : FormTitle.val('请输入已访问过网址')
        }), this.PreviewInit()

    }

    /*---------------自动清空内容-----------------*/
    clearForm(){
        elById('form_url').value = '',
        elById('form_title').value = '',
        elById('web_preview').style.backgroundImage = 'none'
    }

    /*---------------生成缩略图-----------------*/

    //图片尺寸调整
    resizeImg(url, urlFunction) {
        let Img = new Image;
        // console.log(c)
        Img.src = url, Img.onload = () => {
            //Math 对象用于执行数学任务, 返回小于等于x的最大整数:
            var MathF = Math.floor;
            const canvasEle = document.createElement('canvas');
            let e, f, g = MathF(Img.width / 280);
            //判断图的尺寸是否大于 2
            2 <= g ? (5 <= g && (g = MathF(g / 1.3)), 1 & g && g--, e = Img.width / g, f = Img.height * (e / Img.width), 140 > f && (e *= 140 / f, f = 140)) : (e = Img.width, f = Img.height), canvasEle.width = e, canvasEle.height = f;
            const h = canvasEle.getContext('2d');
            h.drawImage(Img, 0, 0, e, f);

            //将图片转换为Base64编码
            const ImgBs64 = canvasEle.toDataURL('image/png');
            urlFunction(ImgBs64)
        }, Img.onerror = () => {
            urlFunction(null)
        }
    }
    //隐藏式截图方法
    hiddenCapture(urlVal, urlFunction) {
        //创建（打开）一个新的浏览器窗口，可以提供大小、位置或默认 URL 等可选参数, 然后执行后面函数
        chrome.windows.create({
            url: urlVal,
            width: 10,
            height: 10,
            left: 1e5,
            top: 1e5,
            type: 'popup'
        }, (urlVal) => {
            //判断有网址信息后关闭窗口
			if (!urlVal.tabs || !urlVal.tabs.length) return chrome.windows.remove(urlVal.id), urlFunction(null);
            const webTabId = urlVal.tabs[0].id;
            let d;
            //修改标签页属性，updateProperties 中未指定的属性保持不变。
            chrome.tabs.update(webTabId, {muted: !0});
            const setTime = setTimeout(() => {
                //clearInterval()方法能够取消setInterval()方法设置的定时器
                clearInterval(d), chrome.windows.remove(urlVal.id), urlFunction(null)
            }, 6e4);
            d = setInterval(() => {
                //chrome.tabs.get获得指定标签页的有关详情
                chrome.tabs.get(webTabId, (webTabId) => {
                   'complete' === webTabId.status && (clearInterval(d), clearTimeout(setTime), setTimeout(() => {
					   chrome.windows.update(urlVal.id, {
							width: 1200,
							height: 800,
							left: 1e6,
							top: 1e6 
						}, () => {
							setTimeout(() => {
                            //chrome自带截屏方法(chrome.tabs.captureVisibleTab)，回调函数返回图片类型和数据信息
							chrome.tabs.captureVisibleTab(urlVal.id, (webTabId) => {
								chrome.windows.remove(urlVal.id, () => urlFunction(webTabId))
							})
							}, 500)
						});
                    }, 200))
                })
            }, 200)
        })
    }
    
    //生成预览
    createPreview(url, b) {
        this.hiddenCapture(url, (url) => this.resizeImg(url, (url) => b(url)))
    }

    //预览调用
    PreviewInit() {
        const urlVal = elById('form_url').value, urlInit = this.addHttp(urlVal);
        urlVal && urlInit && (this.createPreview(urlInit, (urlVal) => {
            elById('web_preview').style.backgroundImage = `url(${urlVal})`
        }))
    }
}

const pubModel = new pub()

export default pubModel