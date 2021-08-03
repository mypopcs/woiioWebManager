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
    // urlRegex(url) {
    //     //replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。
    //     return (url + '').replace(/(&amp;)/g, '&').replace(/(&lt;)/g, '').replace(/(&gt;)/g, '').replace(/(&quot;)/g, '"').replace(/(&#39;)/g, '\'').replace(/(&#58;)/g, ':').replace(/(&#x2F;)/g, '/')
    // }
    
    // getTitleFormSite(url, b) {
    //     const newUrl = this.addHttp(url), http = new XMLHttpRequest;
    //     // onload 请求成功完成时触发后面函数
    //     http.onload = () => {
    //         //exec() 方法用于检索字符串中的正则表达式的匹配。
    //         const regRule = /(<title>)\s*(.+)\s*(<\/title>)/, runReg = regRule.exec(http.responseText) || [], url = runReg[2] ? urlRegex(runReg[2]) : '';
    //         b(url)
    //     }, http.onerror = () => b(''), http.open('GET', newUrl, !0), http.send()
    // }

    //input
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
            //如果有值，并且 title 有内容就执行val赋值，没有就模拟访问获取值
            findResult && findResult.title ? FormTitle.val(findResult.title) : console.log('请输入已访问过网址')
            // findResult && findResult.title ? FormTitle.val(findResult.title) : this.getTitleFormSite(urlValue, (history) => {
            //     const findResult = history ? history : pubModel.getRootDomain(urlValue);
            //     FormTitle.val(findResult)
            // })
        })

    }
}

const pubModel = new pub()

export default pubModel