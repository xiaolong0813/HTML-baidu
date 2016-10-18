var log = function() {
    console.log.apply(console, arguments)
}
//在head里面插入active的style
var activeCSS = function() {
    var head = document.querySelector('head')
    var t = `<style>
                .active {
                    background-color: black;
                }
                .findone {
                    color: red;
                }
            </style>`
    head.insertAdjacentHTML('beforeend', t)
}
// var arrayOrigin = []
//处理输入的值并保存如数组
var inputValue = function() {
    var a = ''
    var char = '\n,，、 \t\r'
    var input = document.querySelector('#input')
    var str = input.value.trim()
    // log(str)
    for (var i = 0; i < str.length; i++) {
        if (char.includes(str[i])) {
            a += ' '
        } else {
            a += str[i]
        }
    }
    var array = a.split(' ')
    return array
}
//插入
var In = function() {
    var numDiv = document.querySelector('.numEnter')
    var input = document.querySelector('#input')
    var len = numDiv.children.length
    var array = inputValue()
    // log(array)
    var lenArray = array.length
    if (len + lenArray > 10) {
        for (var i = 0; i < len + lenArray - 10; i++) {
            numDiv.children[i].remove()
        }
    }
    for (var i = 0; i < array.length; i++) {
        var value = array[i]
        if (!numDisplay().includes(value)) {
            var t = `<div class="num">${value}</div>`
            numDiv.insertAdjacentHTML('beforeend',t)
        }
    }
    input.value = ''
}
//获取已展示的项目
var numDisplay = function() {
    var d = []
    var numDiv = document.querySelector('.numEnter')
    for (var i = 0; i < numDiv.children.length; i++) {
        d.push(numDiv.children[i].innerHTML)
    }
    return d
}
//查找辅助，把s里面的所有old转换为new
var replaceAll = function(s, old, newString) {
    var len = old.length
    var span = newString.length
    for (var i = 0; i < s.length; i++) {
        if (s.slice(i,i + len) === old) {
            s = s.slice(0,i) + newString + s.slice(i + len)
            i = i + span - 1
            // log(s,i)
        }
    }
    return s
}
//查找
var search = function() {
    var words = document.querySelector('#search')
    var str = words.value.trim()
    var numDiv = document.querySelector('.numEnter')
    var children = numDiv.children
    var find = false
    if (str) {
        for (var i = 0; i < children.length; i++) {
            var cell = children[i].innerHTML
            children[i].classList.remove('active')
            var span = children[i].querySelectorAll('span')
            if (span) {
                var del = replaceAll(cell, `<span class="findone">`, '')
                del = replaceAll(del, `</span>`, '')
                children[i].innerHTML = del
                cell = del
            }
            if (cell.includes(str)) {
                children[i].classList.add('active')
                find = true
                var newStr = `<span class="findone">${str}</span>`
                var newCell = replaceAll(cell, str, newStr)
                children[i].innerHTML = newCell
            }
        }
        if (!find) {
            alert('没有找到该元素')
        }
    }
}
//删除
var Out = function(a) {
    var numDiv = document.querySelector('.numEnter')
    // var chartDiv = document.querySelector('.chart')
    var ele = numDiv.children[a]
    if (ele) {
        var value = ele.innerHTML
        ele.remove()
        // chartDiv.children[a].remove()
        alert(`被删除的是第一个${value}`)
        // arrayOrigin.splice(a,1)
        // log(arrayOrigin)
    }
}
//给按钮绑定函数
var bind = function() {
    var form = document.querySelector('.container')
    // var newa = arrayOrigin.slice(0)
    form.addEventListener('click',function(event){
        var self = event.target
        if (self.id === 'leftIn') {
            In()
        } else if (self.id === 'rightIn') {
            In('beforeend')
        } else if (self.id === 'leftOut') {
            Out(0)
        } else if (self.id === 'rightOut') {
            // var numDiv = document.querySelector('.numEnter')
            var div = document.querySelector('.numEnter')
            var len = div.children.length
            Out(len - 1)
        } else if (self.id === 'searchButton') {
            search()
        }
    })
}
//主函数
var __main = function() {
    activeCSS()
    bind()
}

__main()
