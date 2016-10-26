var log = function() {
    console.log.apply(console, arguments)
}
//声明一个对象，可以识别输入
var checkInput = function() {
    // this.str = str
    this.outputText = {
        normal:  '必填，长度为4~16个字符',
        empty: '姓名不能为空',
        right: '名称格式正确',
        long: '名称过长',
        short: '名称过短',
    }
}
//检查字符数，其中中文算两个字符
checkInput.prototype.check = function(str) {
    var str = str.trim()
    // log(str)
        var length = 0
        var reg = /.*[\u4e00-\u9fa5]+.*$/      //表示中文的正则表达式
        var eng = /^[a-z]*|[A-Z]*$/      //字母，数字 ，下划线
        for (var i = 0; i < str.length; i++) {
            // log(str[i])
            if (reg.test(str[i])) {
                length += 2
            } else if (eng.test(str[i])) {
                length += 1
            }
        }
        return length
}
//按钮绑定事件
checkInput.prototype.bindButton = function() {
    var button = document.querySelector('.long-button')
    // log(1,button)
    window.check = this.check
    window.out = this.outputText
    window.outPut = this.outPut
    button.addEventListener('click', function(event){
        var str = document.querySelector('.long-input').value
        var len = check(str)
        // log(len)
        if (len === 0) {
            outPut(out.empty)
        } else if (len <= 16 && len >= 4) {
            outPut(out.right)
        } else if (len < 4) {
            outPut(out.short)
        }else if (len > 16) {
            outPut(out.long)
        }
    })
}

//输出文字并改变样式
checkInput.prototype.outPut = function(str) {
    var note = document.querySelector('.long-row2').querySelector('.long-col2')
    var input = document.querySelector('.long-input')
    note.innerHTML = str
    if (str === out.right) {
        input.classList.remove('note-wrong')
        input.classList.add('note-right')
    } else {
        input.classList.remove('note-right')
        input.classList.add('note-wrong')
    }
}
//输入框获取焦点还原
checkInput.prototype.recover = function() {
    // log(this.outputText.normal)
    var normal = this.outputText.normal
    var input = document.querySelector('.long-input')
    // input.addEventListener('focus', (event) => {input.classList.remove('note-right') && input.classList.remove('note-wrong')})
    input.addEventListener('focus', function(){
        event.target.classList.remove('note-right')
        event.target.classList.remove('note-wrong')
        var note = document.querySelector('.long-row2').querySelector('.long-col2')
        note.innerHTML = normal
    })
}
var judge = new checkInput()
judge.bindButton()
judge.recover()
