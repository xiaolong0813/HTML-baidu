var log = function() {
    console.log.apply(console, arguments)
}

var array = []
//获取输入的值
var inputValue = function() {
    var input = document.querySelector('#input')
    var value = input.value
    if (value >= 10 && value <= 100) {
        return value
    } else {
        alert('输入限制为10-100')
    }
}


//插入
var In = function(loc) {
    var numDiv = document.querySelector('.numEnter')
    var input = document.querySelector('#input')
    var chartDiv = document.querySelector('.chart')
    var len = numDiv.children.length
    if (len < 10) {
        var value = inputValue()
        if (value) {
            var h = value * 3
            var s = 300 - h
            var t = `<div class="num">${value}</div>`
            var c = `<div class="column" style="height:${h}px; margin-top:${s}px;"></div>`
            numDiv.insertAdjacentHTML(loc,t)
            chartDiv.insertAdjacentHTML(loc,c)
            input.value = ''
        }
    } else {
        input.value = ''
        alert('数据个数限制为10')
    }
}

//删除
var Out = function(a) {
    var numDiv = document.querySelector('.numEnter')
    var chartDiv = document.querySelector('.chart')
    var ele = numDiv.children[a]
    if (ele) {
        var value = ele.innerHTML
        ele.remove()
        chartDiv.children[a].remove()
        alert(`被删除的是第一个${value}`)
    }
}

//给按钮绑定函数
var bind = function() {
    var form = document.querySelector('.form')
    form.addEventListener('click',function(event){
        var self = event.target
        if (self.id === 'leftIn') {
            In('afterbegin')
        } else if (self.id === 'rightIn') {
            In('beforeend')
        } else if (self.id === 'leftOut') {
            Out(0)
        } else if (self.id === 'rightOut') {
            var numDiv = document.querySelector('.numEnter')
            var len = numDiv.children.length
            Out(len - 1)
        }
    })
}

var __main = function() {
    bind()
}


__main()
