var log = function() {
    console.log.apply(console, arguments)
}
// var arrayOrigin = []
//声明一个对象，用于插入值
var Showtag = function(element) {
    this.element = element
}
//在head里面插入active的style
Showtag.prototype.activeCSS = function() {
    // var head = document.querySelector('head')
    var t = `<style class='removeCss'>
                .active {
                    background-color: black;
                }
                .findone {
                    color: red;
                }
            </style>`
    // // head.insertAdjacentHTML('beforeend', t)
    // var ele = document.querySelector(this.element)
    //     ele.insertAdjacentHTML('afterbegin', t)
    return t
}
//处理输入的值并保存如数组
Showtag.prototype.inputValue = function(text) {
    //获取输入值
    // var input = document.querySelector('#input')
    // var str = input.value.trim()
    // // 以下方法为手动逐步筛选，较麻烦
    // var a = ''
    // var char = '\n,，、 \t\r'
    // // log(str)
    // for (var i = 0; i < str.length; i++) {
    //     if (char.includes(str[i])) {
    //         a += ' '
    //     } else {
    //         a += str[i]
    //     }
    // }
    // var array = a.split(' ')
    // // 可以用以下方法，用正则表达式表示分隔符，较方便
    var array = text.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(e) {
            if (e != null && e.length > 0) {
                return true
            } else {
                return false
            }
        })
    return array

}
//插入
Showtag.prototype.In = function(text) {
    var numDiv = document.querySelector(this.element)
    // var input = document.querySelector('#input')
    var len = numDiv.children.length
    var array = this.inputValue(text)
    // log(array)
    var lenArray = array.length
    if (len + lenArray > 10) {
        for (var i = 0; i < len + lenArray - 10; i++) {
            numDiv.children[i].remove()
        }
    }
    for (var i = 0; i < array.length; i++) {
        var value = array[i]
        if (!this.numDisplay().includes(value)) {
            var t = `<div class="num">${value}</div>`
            numDiv.insertAdjacentHTML('beforeend',t)
        }
    }
    // input.value = ''
}
//获取已展示的项目
Showtag.prototype.numDisplay = function() {
    var d = []
    var numDiv = document.querySelector(this.element)
    for (var i = 0; i < numDiv.children.length; i++) {
        d.push(numDiv.children[i].innerHTML)
    }
    return d
}
//查找辅助，把s里面的所有old转换为new
Showtag.prototype.replaceAll = function(s, old, newString) {
    var len = old.length
    var span = newString.length
    for (var i = 0; i < s.length; i++) {
        if (s.slice(i,i + len) === old) {
            s = s.slice(0,i) + newString + s.slice(i + len)
            i = i + span - 1
        }
    }
    return s
}
//查找
Showtag.prototype.search = function(s) {
    // var words = document.querySelector('#search')
    // var str = words.value.trim()
    //向目标元素里面加入css模板字符串
    var c = this.activeCSS()
    var str = s.trim()
    var numDiv = document.querySelector(this.element)
    var head = document.querySelector('head')
    if (!head.querySelector('.removeCss')) {
        head.insertAdjacentHTML('beforeend', c)
    }
    var children = numDiv.children
    var find = false
    if (str) {
        for (var i = 0; i < children.length; i++) {
            var cell = children[i].innerHTML
            children[i].classList.remove('active')
            var span = children[i].querySelectorAll('span')
            if (span) {
                var del = this.replaceAll(cell, `<span class="findone">`, '')
                del = this.replaceAll(del, `</span>`, '')
                children[i].innerHTML = del
                cell = del
            }
            if (cell.includes(str)) {
                children[i].classList.add('active')
                find = true
                var newStr = `<span class="findone">${str}</span>`
                var newCell = this.replaceAll(cell, str, newStr)
                children[i].innerHTML = newCell
            }
        }
        if (!find) {
            alert('没有找到该元素')
        }
    }
}
// //删除
// var Out = function(a) {
//     var numDiv = document.querySelector('.numEnter')
//     // var chartDiv = document.querySelector('.chart')
//     var ele = numDiv.children[a]
//     if (ele) {
//         var value = ele.innerHTML
//         ele.remove()
//         // chartDiv.children[a].remove()
//         alert(`被删除的是第一个${value}`)
//         // arrayOrigin.splice(a,1)
//         // log(arrayOrigin)
//     }
// }
//定义新的对象，作用于多行文本框，插入兴趣爱好
var hobby = new Showtag('.numEnter')
//给按钮绑定函数
var bindButton = function() {
    var form = document.querySelector('.container')
    // var newa = arrayOrigin.slice(0)
    form.addEventListener('click',function(event){
        var self = event.target
        if (self.id === 'leftIn') {
            var input = document.querySelector('#input')
            var str = input.value.trim()
            hobby.In(str)
            input.value = ''
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
            var words = document.querySelector('#search')
            var str = words.value.trim()
            hobby.search(str)
        }
    })
}

//定义新的对象，作用于tag文本框，插入tag
var tag = new Showtag('.tagShow')
//给键盘绑定事件
var bindKey = function() {
    var tagInput = document.querySelector('.tagInput')
    tagInput.addEventListener('keydown', function(event){
        var self = event.which
        // log(self)
        if ([13, 32, 188, 229].includes(self)) {
            var str = tagInput.value.trim()
            tag.In(str)
            tagInput.value = ''
        }
    })
}
//给tag标签绑定mouse事件
var bindMouse = function() {
    var tagDiv = document.querySelector('.tagShow')
    tagDiv.addEventListener('mouseover', function(event){
        var self = event.target
        //用tagName可以获取其元素类型名称，根据这个可以判断是不是子元素div
        if (self.classList.contains('num')) {
            var value = self.innerHTML
            var newValue = '点击删除' + value
            self.innerHTML = newValue
            //添加鼠标进入的css样式
            var newC = `<style class='removeMouse'>
                        .tagActive {
                            background-color: black;
                        }
                    </style>`
            var head = document.querySelector('head')
                head.insertAdjacentHTML('beforeend', newC)
            //添加上这个样式
            self.classList.add('tagActive')
        }
    })
    tagDiv.addEventListener('mouseout', function(event){
        var self = event.target
        if (self.classList.contains('num')) {
            var value = self.innerHTML
            self.innerHTML = value.slice(4)
            self.classList.remove('tagActive')
            var head = document.querySelector('head')
            head.querySelector('.removeMouse').remove()
        }
    })
}
//给tag绑定点击事件
var bindClick = function() {
    var tagDiv = document.querySelector('.tagShow')
    tagDiv.addEventListener('click', function(event){
        var self = event.target
        // log(self)
        if (self.classList.contains('num')) {
            self.remove()
        }
    })
}

//主函数
var __main = function() {
    // activeCSS()
    bindButton()
    bindKey()
    bindMouse()
    bindClick()
}

__main()
