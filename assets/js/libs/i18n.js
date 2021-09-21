class i18n{
    //获取并替换预言的函数
    replace_i18n(obj, tag){
        //字符串.replace(regexp,replacement)，regexp规定子字符串或要替换的模式的 RegExp 对象。replacement(字符串值)规定了替换文本或生成替换文本的函数
        var msg = tag.replace(/__MSG_(\w+)__/g, function(match, v1){
            //三元运算符，条件 ? 表达式1 : 表达式2，如果条件为true，返回表达式1，否则返回表达式2
            return v1 ? chrome.i18n.getMessage(v1) : '';
        });
        if(msg != tag){
            obj.innerHTML = msg;
        }
    }
    localizeHtmlPage(){
        // Localize using __MSG_***__ data tags
        //querySelectorAll() 方法返回文档中匹配指定 CSS 选择器的所有元素，返回 NodeList 对象。
        var data = document.querySelectorAll('[data-localize]');

        //Object的hasOwnProperty()方法返回一个布尔值，判断对象是否包含特定的自身（非继承）属性
        for (var i in data) if (data.hasOwnProperty(i)) {
            var obj = data[i];
            //getAttribute() 方法返回指定属性名的属性值。
            var tag = obj.getAttribute('data-localize').toString();
            //执行替换函数
            this.replace_i18n(obj, tag);
        }

        // Localize everything else by replacing all __MSG_***__ tags
        var page = document.getElementsByTagName('html');
        for (var j = 0; j < page.length; j++) {
            var obj = page[j];
            var tag = obj.innerHTML.toString();
            this.replace_i18n(obj, tag);
        }
    }
    doI18n(){
        this.localizeHtmlPage()
    }
}

const i18nMod = new i18n()

export default i18nMod