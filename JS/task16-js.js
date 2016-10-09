/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var log = function() {
 console.log.apply(console, arguments)
 }

var aqiData = {};
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function isCity(s) {
    var letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (s) {
        for (var i = 0; i < s.length; i++) {
            if (!(letters.includes(s[i]) || s.charCodeAt(i) > 255)) {
                return false
            }
        }
        return true
    } else {
        return false
    }
}
var isNum = function(s) {
    var len = s.length
    var num = '0123456789'
    if(s) {
        for (var i = 0; i < len; i++) {
            if (!num.includes(s[i])) {
                return false
            }
        }
        return true
    }else {
        return false
    }
}
var strip_left = function(s) {
    while(s[0] == ' ') {
        s = s.slice(1)
    }
    return s
}
var strip_right = function(s) {
    var len = 0
    while(s.slice(-1) == ' ') {
        len = s.length
        s = s.slice(0,len - 1)
    }
    return s
}
var strip = function(s) {
    var str = strip_left(s)
    var str1 = strip_right(str)
    return str1
}


function addAqiData() {
    var inputCity = strip(document.querySelector('#aqi-city-input').value)
    var inputData = strip(document.querySelector('#aqi-value-input').value)
    if (isCity(inputCity) && isNum(inputData)) {
        aqiData[inputCity] = inputData
        saveTodos()
        // log(aqiData)
        return inputCity
    } else {
        alert('输入错误！请重新输入')
    }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList(inputCity) {
    if (inputCity) {
        var table = document.querySelector('#aqi-table')
        var t = `<tr>
                    <td class='city'>${inputCity}</td><td class='value'>${aqiData[inputCity]}</td><td><button class='delete'>删除</button></td>
                </tr>`
        table.insertAdjacentHTML('beforeend',t)
    }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    var add = document.querySelector('#add-btn')
    add.addEventListener('click',function(){
        var city = addAqiData();
        renderAqiList(city);
    })
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.
  var table = document.querySelector('#aqi-table')
  table.addEventListener('click',function(event){
      var self = event.target
      if (self.classList.contains('delete')) {
          var parent = self.parentElement.parentElement
          var city = parent.querySelector('.city').innerHTML
        //   log(city)
          delete aqiData[city]
        //   log(aqiData)
          saveTodos()
          parent.remove()
      }
  })
  // renderAqiList();
}

var saveTodos = function() {
        var s = JSON.stringify(aqiData)
        localStorage.aqiData = s
    }

var loadTodos = function() {
        var a = localStorage.aqiData
        return JSON.parse(a)
    }
var initTodos = function() {
    aqiData = loadTodos()
    // log(aqiData)
    for(var key in aqiData) {
        renderAqiList(key)
    }
}


function init() {
    addBtnHandle()

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    delBtnHandle()
    initTodos()
}

init();
