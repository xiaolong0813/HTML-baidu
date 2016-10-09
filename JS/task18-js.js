var log = function() {
    console.log.apply(console, arguments)
}
//左边插入
var leftIn = function() {
    var numDiv = document.querySelector('.numEnter')
    var input = document.querySelector('#input')
    var value = input.value
    if (value) {
        var t = `<div class="num">${value}</div>`
        numDiv.insertAdjacentHTML('afterbegin',t)
        input.value = ''
    }
}

//右边插入
var rightIn = function() {
    var numDiv = document.querySelector('.numEnter')
    var input = document.querySelector('#input')
    var value = input.value
    if (value) {
        var t = `<div class="num">${value}</div>`
        numDiv.insertAdjacentHTML('beforeend',t)
        input.value = ''
    }
}


//左边删除
var leftOut = function() {
    var numDiv = document.querySelector('.numEnter')
    var first = numDiv.children[0]
    if (first) {
        var value = first.innerHTML
        first.remove()
        alert(`被删除的是第一个${value}`)
    }
}

//右边删除
var rightOut = function() {
    var numDiv = document.querySelector('.numEnter')
    var len = numDiv.children.length
    if (len) {
        var end = numDiv.children[len - 1]
        var value = end.innerHTML
        end.remove()
        alert(`被删除的是最后一个${value}`)
    }
}


//给按钮绑定左边插入函数
var bindLeftin = function() {
    var button = document.querySelector('#leftIn')
    button.addEventListener('click',leftIn)
}
//给按钮绑定右边插入函数
var bindRightin = function() {
    var button = document.querySelector('#rightIn')
    button.addEventListener('click',rightIn)
}
//给按钮绑定左边删除函数
var bindLeftout = function() {
    var button = document.querySelector('#leftOut')
    button.addEventListener('click',leftOut)
}
//给按钮绑定右边删除函数
var bindRightout = function() {
    var button = document.querySelector('#rightOut')
    button.addEventListener('click',rightOut)
}

var __main = function() {
    bindLeftin()
    bindRightin()
    bindLeftout()
    bindRightout()
}


__main()
