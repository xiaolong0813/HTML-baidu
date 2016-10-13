var log = function() {
    console.log.apply(console, arguments)
}
//原始数组
var arrayOrigin = []
//获取输入的值
var inputValue = function() {
    var input = document.querySelector('#input')
    var value = input.value
    if (value >= 10 && value <= 100) {
        // log(value)
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
    if (len < 60) {
        var value = inputValue()
        // log(value)
        if (value) {
            var h = value * 3
            var s = 320 - h
            var t = `<div class="num">${value}</div>`
            var c = `<div class="column" style="height:${h}px; margin-top:${s}px;"></div>`
            numDiv.insertAdjacentHTML(loc,t)
            chartDiv.insertAdjacentHTML(loc,c)
            arrayIn(loc,value)
            // log(arrayOrigin)
            input.value = ''
        }
    } else {
        input.value = ''
        alert('数据个数限制为10')
    }
}
//数组插入元素
var arrayIn = function(loc, value) {
    if (loc === 'afterbegin') {
        // log(arrayOrigin)
        arrayOrigin.unshift(value)
        log(value,arrayOrigin)
    } else if (loc === 'beforeend') {
        arrayOrigin.push(value)
    }
    // log(array)
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
        arrayOrigin.splice(a,1)
        // log(arrayOrigin)
    }
}
//根据array画图
var arrayChart = function(a) {
    // log(a)
    var chartDiv = document.querySelector('.chart')
    var numDiv = document.querySelector('.numEnter')
    if (a) {
        clearChart()
        clearNum()
        for (var i = 0; i < a.length; i++) {
            var value = a[i]
            var h = value * 3
            var s = 320 - h
            var t = `<div class="num">${value}</div>`
            var c = `<div class="column" style="height:${h}px; margin-top:${s}px;"></div>`
            numDiv.insertAdjacentHTML('beforeend',t)
            chartDiv.insertAdjacentHTML('beforeend',c)
        }
    }
}
//清除图像
function clearChart() {
    var chart = document.querySelector('.chart')
    var children = chart.querySelectorAll('div')
    for (var i = 0; i < children.length; i++) {
        children[i].remove()
    }
}
//清除数字
function clearNum() {
    var numDiv = document.querySelector('.numEnter')
    var children = numDiv.querySelectorAll('div')
    for (var i = 0; i < children.length; i++) {
        children[i].remove()
    }
}
//升序排列
// [100,15,25,54,73]
var up = function() {
    var upArray = arrayOrigin.slice(0)
    // log(upArray)
    var len = upArray.length
    var temp
    for (var i = 0; i < len - 1; i++) {
        for (var j = i + 1; j < len; j++) {
            if (Number(upArray[i]) > Number(upArray[j])) {
                temp = upArray[j]
                upArray[j] = upArray[i]
                upArray[i] = temp
                // arrayChart(upArray)
            }
            // arrayChart(upArray)
        }
    }
    // log(upArray)

    return upArray
}
//降序排列
var down = function() {
    var downArray = arrayOrigin.slice(0)
    var temp
    for (var i = 0; i < downArray.length - 1; i++) {
        for (var j = i + 1; j < downArray.length; j++) {
            if (Number(downArray[i]) < Number(downArray[j])) {
                temp = downArray[i]
                downArray[i] = downArray[j]
                downArray[j] = temp
            }
        }
    }
    // log(downArray)
    return downArray
}

//生成随机数并画图
var ran = function() {
    arrayOrigin = []
    for (var i = 0; i < 60; i++) {
        var n = Math.random() * 90 + 10
        var m = Math.round(n)
        arrayOrigin.push(m)
    }
    arrayChart(arrayOrigin)
}
//给按钮绑定函数
var bind = function() {
    var form = document.querySelector('.form')
    // var newa = arrayOrigin.slice(0)
    form.addEventListener('click',function(event){
        var self = event.target
        if (self.id === 'leftIn') {
            In('afterbegin')
        } else if (self.id === 'rightIn') {
            In('beforeend')
        } else if (self.id === 'leftOut') {
            Out(0)
        } else if (self.id === 'rightOut') {
            // var numDiv = document.querySelector('.numEnter')
            var len = arrayOrigin.length
            Out(len - 1)
        } else if (self.id === 'up') {
            arrayOrigin = up()
            arrayChart(arrayOrigin)
        } else if (self.id === 'down') {
            arrayOrigin = down()
            arrayChart(arrayOrigin)
        } else if (self.id === 'random') {
            ran()
        }
        // else if (self.id === 'return') {
        //     // arrayOrigin = newa.slice(0)
        //     arrayChart(arrayOrigin)
        // }
    })
}
//主函数
var __main = function() {
    bind()
}


__main()
