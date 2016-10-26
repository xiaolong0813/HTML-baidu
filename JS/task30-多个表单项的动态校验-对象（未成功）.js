var log = function() {
    console.log.apply(console, arguments)
}

//声明一个对象，可以识别输入
var checkInput = function(div, name, message) {
    this.div = document.querySelector(div)
    this.name = name
    this.message = message
}
//插入模板字符串
checkInput.prototype.insertContainer = function() {
    // log(this.name, this.message)
    var t = `<div class="long-container1">
                    <div class="long-row long-row1">
                        <div class="long-name long-col long-col1">${this.name}</div>
                        <input type="text" class="long-input long-col long-col2" value="">
                    </div>
                    <div class="long-row long-row2">
                        <div class="long-col long-col1"></div>
                        <div class="long-col long-col2">${this.message.normal}</div>
                    </div>
                </div>`
    this.div.insertAdjacentHTML('beforeend', t)
}
// //检查字符数，其中中文算两个字符
// checkInput.prototype.checkName = function(str, expression) {
//     var str = str.trim()
//     // log(str)
//         var length = 0
//         var reg = /.*[\u4e00-\u9fa5]+.*$/      //表示中文的正则表达式
//         var eng = /^[a-z]*|[A-Z]*$/      //字母，数字 ，下划线
//         for (var i = 0; i < str.length; i++) {
//             // log(str[i])
//             if (reg.test(str[i])) {
//                 length += 2
//             } else if (eng.test(str[i])) {
//                 length += 1
//             }
//         }
//         return length
// }
//检查字符数，其中中文算两个字符
checkInput.prototype.checkName = function(str, expression) {
    var str = str.trim()
    log(`${this.message}`)
    var input = document.querySelector('.long-input')
    var note = document.querySelector('.long-row2').querySelector('.long-col2')
    if (expression.test(str)) {
        log('if', this.message)
        input.style.borderColor = 'green'
        note.innerHTML = this.message.right
    } else {
        input.style.borderColor = 'red'
        note.innerHTML = this.message.wrong
    }

    note.innerHTML = str
}
//按钮绑定事件
checkInput.prototype.bindButton = function(expression) {
    var button = document.querySelector('.long-button')
    // log(1,button)
    var check = this.checkName
    // window.out = this.message
    // window.outPut = this.outPut
    button.addEventListener('click', function(event){
        var str = document.querySelector('.long-input').value
        check(str, expression)
        // var len = check(str)
        // log(len)
        // if (len === 0) {
        //     outPut(out.empty)
        // } else if (len <= 16 && len >= 4) {
        //     outPut(out.right)
        // } else if (len < 4) {
        //     outPut(out.short)
        // }else if (len > 16) {
        //     outPut(out.long)
        // }
    })
}

// //输出文字并改变样式
// checkInput.prototype.outPut = function(str) {
//     var note = document.querySelector('.long-row2').querySelector('.long-col2')
//     var input = document.querySelector('.long-input')
//     note.innerHTML = str
//     if (str === out.right) {
//         input.style.borderColor = 'green'
//     } else {
//         input.style.borderColor = 'red'
//     }
// }
//输入框获取焦点还原
checkInput.prototype.recover = function() {
    // log(this.outputText.normal)
    var normal = this.message.normal
    var input = document.querySelector('.long-input')
    // input.addEventListener('focus', (event) => {input.classList.remove('note-right') && input.classList.remove('note-wrong')})
    input.addEventListener('focus', function(){
        input.style.borderColor = 'grey'
        var note = document.querySelector('.long-row2').querySelector('.long-col2')
        note.innerHTML = normal
    })
}
var judge = new checkInput('.long-container', '名称', {
        normal:  '必填，长度为4~16个字符',
        empty: '姓名不能为空',
        right: '名称格式正确',
        wrong: '格式错误，长度为4~16个字符',
    })
judge.insertContainer()
judge.bindButton(/^.{4,16}$/)
// judge.recover()
