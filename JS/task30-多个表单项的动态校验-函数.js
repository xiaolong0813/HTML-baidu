var log = function() {
    console.log.apply(console, arguments)
}

//插入按钮模板字符串
var insertButton = function(messageArray, expressionArray) {
    var div = document.querySelector('.long-container')
    var allCell = div.querySelectorAll('.long-cell')
    var t = `<button type="button" class="long-button">验证</button>`
    div.insertAdjacentHTML('beforeend', t)
    var button = document.querySelector('.long-button')
    button.addEventListener('click', function(){
        var bool = true
        for (var i = 0; i < allCell.length; i++) {
            var cellinput = allCell[i].querySelector('.long-input').value
            var cellbool = check(cellinput, expressionArray[i], messageArray[i])
            if (cellbool === false) {
                bool = false
            }
        }
        if (bool) {
            alert('表格填写正确')
        } else {
            alert('表格填写错误')
        }
    })
}
//插入container
var insertContainer = function(div) {
    var div = document.querySelector(div)
    var t = `<div class="long-container"></div>`
    div.insertAdjacentHTML('beforeend', t)
}
//插入cell模板字符串
var insertCell = function(message) {
    // log(this.name, this.message)
    var div = document.querySelector('.long-container')
    var t = `<div class="long-cell" data-id='${message.type}'>
                    <div class="long-row long-row1">
                        <div class="long-name long-col long-col1">${message.name}</div>
                        <input type="text" class="long-input long-col long-col2" value="">
                    </div>
                    <div class="long-row long-row2">
                        <div class="long-col long-col1"></div>
                        <div class="long-col long-col2 long-note">${message.normal}</div>
                    </div>
                </div>`
    div.insertAdjacentHTML('beforeend', t)
}
//检查输入
var check = function(str, expression, message) {
    var box = document.querySelector(`[data-id=${message.type}]`)
    var str = str.trim()
    var input = box.querySelector('.long-input')
    var note = box.querySelector('.long-row2').querySelector('.long-col2')
    if (message.type === 'passwordConfirm') {
        var pass = document.querySelector(`[data-id=password]`).querySelector('.long-input')
        if (str.length !== 0 && pass.value === str) {
            input.style.borderColor = 'green'
            note.innerHTML = message.right
            return true
        } else {
            input.style.borderColor = 'red'
            note.innerHTML = message.wrong
            return false
        }
    } else {
        if (str.length == 0 || !str) {
            input.style.borderColor = 'red'
            note.innerHTML = message.empty
            return false
        } else if (expression.test(str)) {
            input.style.borderColor = 'green'
            note.innerHTML = message.right
            return true
        } else {
            input.style.borderColor = 'red'
            note.innerHTML = message.wrong
            return false
        }
    }
}
//输入框绑定事件
var bindBlur = function(expression, message) {
    var box = document.querySelector(`[data-id=${message.type}]`)
    var input = box.querySelector('.long-input')
    input.addEventListener('blur', function(event){
        var str = input.value
        bool = check(str, expression, message)
    })
    input.addEventListener('focus', function(){
        input.style.borderColor = 'grey'
        var note = box.querySelector('.long-row2').querySelector('.long-col2')
        note.innerHTML = message.normal
    })
}
//定义创建一个表单的主函数
var __formcellMain = function(message, expression) {
    insertCell(message)
    bindBlur(expression, message)
}
//定义创建表单整体的主函数 最后一个参数表明是哪个参数，name,password,passwordConfirm,email,telephone
var __formcontainerMain = function(div, messageArray, expressionArray) {
    insertContainer(div)
    if (messageArray.length !== expressionArray.length) {
        alert('输入格式不正确！')
    }else {
        for (var i = 0; i < messageArray.length; i++) {
            __formcellMain(messageArray[i], expressionArray[i])
        }
        insertButton(messageArray, expressionArray)
    }
}

//要输入的文本
var messageArray = [
{type: 'name', name : '名称',normal: '必填，长度为4~16个字符',empty: '名称不能为空',right: '名称格式正确',wrong: '名称格式错误，长度为4~16个字符',},
{type: 'password', name : '密码',normal: '必填,长度为6-16个字符,字母或数字',empty: '密码不能为空',right: '密码格式正确',wrong: '密码格式错误，长度为6-16个字符,字母或数字',},
{type: 'passwordConfirm', name : '密码确认',normal: '再次输入相同的密码',empty: '密码不能为空',right: '密码确认正确',wrong: '密码不一致',},
{type: 'email', name : '邮箱',normal: '输入邮箱地址',empty: '邮箱不能为空',right: '邮箱格式正确',wrong: '邮箱格式错误',},
{type: 'telephone', name : '手机',normal: '输入手机号',empty: '手机不能为空',right: '手机格式正确',wrong: '手机格式错误',},
]
//需要的正则表达式
var expressionArray = [/^.{4,16}$/, /^[\dA-Za-z]{6,16}$/, /^[\dA-Za-z]{6,16}$/,  /^[\dA-Za-z_]+@[\dA-Za-z_]+\.[\dA-Za-z_]+$/, /^[\d]{11}$/]

__formcontainerMain('body',messageArray, expressionArray)

    // insertButton('.long-container')
