var log = function() {
    console.log.apply(console, arguments)
}
//声明一个对象，可以识别输入
var checkInput = function(str) {
    this.str = str
}
//检查字符数，其中中文算两个字符
checkInput.prototype.check = function() {
    var str = this.str.trim()
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
var bindButton = function() {
    var button = document.querySelector('.checkButton')
    // log(1,button)
    button.addEventListener('click', function(event){
        var str = document.querySelector('.checkInput').value
        // log(str)
        var judge = new checkInput(str)
        // log(judge)
        var len = judge.check()
        // log(len)
        if (len === 0) {
            outPut('姓名不能为空')
        } else if (len <= 16 && len >= 4) {
            outPut('名称格式正确')
        } else if (len < 4) {
            outPut('名称过短')
        }else if (len > 16) {
            outPut('名称过长')
        }
    })
}

//输出文字并改变样式
var outPut = function(str) {
    var note = document.querySelector('.note')
    var input = document.querySelector('.checkInput')
    note.innerHTML = str
    if (str === '名称格式正确') {
        input.classList.remove('note-wrong')
        input.classList.add('note-right')
    } else {
        input.classList.remove('note-right')
        input.classList.add('note-wrong')
    }
}

bindButton()
