/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
var log = function() {
    console.log.apply(console, arguments)
}

// var $ = function(s) {
//   return document.querySelectorAll(s)
// }


// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "成都",
  nowGraTime: "week"
}

/**
 * 渲染图表
 */
//根据数值确定颜色
function colorSelector(n) {
    if (n < 120) {
        return 'green'
    } else if (n < 240) {
        return 'blue'
    } else if (n < 360) {
        return 'red'
    } else if (n < 480) {
        return 'purple'
    } else {
        return 'black'
    }
}
//根据时间选择对应的宽度
function widSelector(s) {
    if (s === 'day') {
        return 10
    } else if (s === 'week') {
        return 50
    } else if (s === 'month') {
        return 80
    }
}
//根据时间选择对应的间距
function space(s) {
    if (s === 'day') {
        return 2
    } else if (s === 'week') {
        return 30
    } else if (s === 'month') {
        return 80
    }
}
//根据所选的城市和时间，定义指标数据（全局变量里）
function dataCalculate(city, gratime) {
    var cell = aqiSourceData[city]
    if (gratime === 'day') {
        return cell
    } else if (gratime === 'week') {
        var week = {}
        var sum = 0
        var i = 1
        var k = Object.keys(cell)
        for (var key in cell) {
            sum += cell[key]
            var dat = new Date(key)
            var day = dat.getDay()
            if (day === 0) {
                k.splice(0,i)
                var average = sum / i
                // log(key,i)
                sum = 0
                i = 0
                week[key] = average
            }
            i++
        }
        // log(k,sum,cell)
        week[k[k.length - 1]] = sum / k.length
        return week
    } else if (gratime === 'month') {
        var month = {}
        var sum = 0
        var i = 1
        for(var key in cell) {
            sum += cell[key]
            if (key === '2016-01-31') {
                month[key] = sum / 31
                sum = 0
            } else if (key === '2016-02-29') {
                month[key] = sum / 29
                sum = 0
            } else if (key === '2016-03-31') {
                month[key] = sum / 31
            }
        }
        return month
    }
}
//根据指标数据，更新图表
function renderChart() {
    var chartData = dataCalculate(pageState.nowSelectCity, pageState.nowGraTime)
    var chart = document.querySelector('.aqi-chart-wrap')
    var keys = Object.keys(chartData)
    var len = keys.length
    var co = 1.2
    var column = document.createElement('div')
    // column.id = 'column-1'
    // column.style.height = chartData['2016-01-01'] * co
    // column.style.width = 10
    // column.style.position = "absolute"
    // column.style.background = 'red'
    // column.style.display = 'block'
    // column.style.left = 0
    // column.style.bottom = 0
    // chart.appendChild(column)
    var i = 0
    for(var key in chartData) {
        var height = chartData[key] * co
        var wid = widSelector(pageState.nowGraTime)
        var spaceC = space(pageState.nowGraTime)
        var color = colorSelector(height)
        var left = (1200 - len * (wid + spaceC)) / 2 + (wid + spaceC) * i++
        var t = `<div id=${key} class='columnCell' style="height: ${height}px; width: ${wid}px; position: absolute; background:${color}; display: block; left: ${left}px; bottom: 0px;"></div>`
        // var t = `<div id="column-1" style="height: ${height}px; width: ${wid}px; background: ${color}; display: inline-block;"></div>`
        chart.insertAdjacentHTML('beforeend',t)
    }
    var note = `<div id='note' style="height: 50px; width: 1200px; line-height:50px;color:red; font-weight:bolder; display: block; text-align: center;"></div>`
    chart.insertAdjacentHTML('afterend',note)
    var noteArea = document.querySelector('#note')
    chart.addEventListener('mouseover',function(){
        var self = event.target
        if (self.classList.contains('columnCell')) {
            // log(self)
            var h = Math.floor(chartData[self.id])
            noteArea.innerHTML = self.id + ':' + h
        }
    })
    chart.addEventListener('mouseout',function(){
        var self = event.target
        if (self.classList.contains('columnCell')) {
            noteArea.innerHTML = ""
        }
    })


}
//清除图像以显示其他图像
function clearChart() {
    var chart = document.querySelector('.aqi-chart-wrap')
    var children = chart.querySelectorAll('div')
    for (var i = 0; i < children.length; i++) {
        children[i].remove()
    }
    var note = document.querySelector('#note')
    if (note) {
        note.remove()
    }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
 function graTimeChange() {
  // 确定是否选项发生了变化
    // 设置对应数据
    // 调用图表渲染函数
  var form = document.querySelector('#form-gra-time')
  var radio = form.querySelectorAll('input')
  for (var i = 0; i < radio.length; i++) {
      if (radio[i].checked) {
          pageState.nowGraTime = radio[i].value
      }
  }
  clearChart()
  renderChart()
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化
  // 设置对应数据
  // 调用图表渲染函数
  var select = document.querySelector('#city-select')
  pageState.nowSelectCity = select.value
  clearChart()
  renderChart()
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
 //给点击事件绑定函数
function initGraTimeForm() {
    var form = document.querySelector('#form-gra-time')
    var radio = form.querySelectorAll('input')
    radio[0].checked = true
    form.addEventListener('click',function(){
        graTimeChange()
    })
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
 //给选择事件绑定函数
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
    var keys = Object.keys(aqiSourceData)
    var select = document.querySelector('#city-select')
    for (var i = 0; i < keys.length; i++) {
        var t = `<option>${keys[i]}</option>`
        select.insertAdjacentHTML('beforeend',t)
    }
    select.addEventListener('change',function(){
        citySelectChange()
    })
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 初始化数据和图表
    pageState.nowSelectCity = "北京"
    pageState.nowGraTime = "day"
    clearChart()
    renderChart()
}

/**
 * 初始化函数
 */
function init() {
  initAqiChartData()
  initGraTimeForm()
  initCitySelector();
}

init();
