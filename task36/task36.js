
var fill = function() {
    var liArray = []
    for (var i = 0; i < 100; i++) {
        liArray.push(`<li></li>`)
    }
    var t = liArray.join('\n')
    appendHtml(e('.square'), t)
}
//////////////////////////////////////
var Diamond = function(box) {
    this.box = box,
    this.dia,
    this.deg,
    this.top,
    this.left
}
Diamond.prototype.createAndSet = function() {
    var t = `<div class="diamond"></div>`,
        self = this
    appendHtml(self.box, t)
    self.dia = e('.diamond')
    self.top = Math.floor(Math.random() * 9) * 40
    self.left = Math.floor(Math.random() * 9) * 40
    // self.deg = Math.floor(Math.random() * 3) * 90
    self.deg = 0        //降低复杂度
    self.dia.style.top = `${self.top}px`
    self.dia.style.left = `${self.left}px`
    self.dia.style.transform = `rotate(${self.deg}deg)`
}
Diamond.prototype.move = function(num) {
    var self = this
    return {
        forword : function() {
            var dir = self.deg
            if ((dir === -90 || dir === 270) && (self.top > 0)) {
                self.top -= 40
                self.dia.style.top = `${self.top}px`
            } else if ((dir === 90 || dir === -270) && (self.top < 360)) {
                self.top += 40
                self.dia.style.top = `${self.top}px`
            } else if ((dir === 180 || dir === -180) && (self.left > 0)) {
                self.left -= 40
                self.dia.style.left = `${self.left}px`
            } else if ((dir === 0 || dir === -0) && (self.left < 360)) {
                self.left += 40
                self.dia.style.left = `${self.left}px`
            }
        },
        rotate : function(deg) {
            // log(self.deg)
            self.deg += deg
            self.dia.style.transition = '1s'
            self.dia.style.transform = `rotate(${self.deg}deg)`
            // 由于存在变量提升，必须等transition动画之后再执行下面的代码，将360变为0°
            // if (Math.abs(self.deg) >= 360) {
            //     setTimeout(function(){
            //         self.deg = self.deg % 360
            //         self.dia.style.transition = '0s'
            //         self.dia.style.transform = `rotate(${self.deg}deg)`
            //     },1000)
            // }
        },
        turnLeft : function() {
            self.move().rotate(-90)
        },
        turnRight : function() {
            self.move().rotate(90)
        },
        turnBack : function() {
            self.move().rotate(180)
        },
        transLeft : function() {
            if (self.left > 0) {
                self.left -= 40
                self.dia.style.left = `${self.left}px`
            }
        },
        transTop : function() {
            if (self.top > 0) {
                self.top -= 40
                self.dia.style.top = `${self.top}px`
            }
        },
        transRight : function() {
            if (self.left < 360) {
                self.left += 40
                self.dia.style.left = `${self.left}px`
            }
        },
        transBottom : function() {
            if (self.top < 360) {
                self.top += 40
                self.dia.style.top = `${self.top}px`
            }
        },
        moveLeft : function() {
            self.deg -= (Math.abs(self.deg % 360) === 180 ? (-180) : (self.deg % 360))  + 180
            log(self.deg)
            self.dia.style.transform = `rotate(${self.deg}deg)`
            self.move().transLeft()
        },
        moveTop : function() {
            self.deg -= (Math.abs(self.deg % 360) === 270 ? (-90) : (self.deg % 360))  + 90
            log(self.deg)
            self.dia.style.transform = `rotate(${self.deg}deg)`
            self.move().transTop()
        },
        moveRight : function() {
            self.deg -= self.deg % 360
            log(self.deg)
            self.dia.style.transform = `rotate(${self.deg}deg)`
            self.move().transRight()
        },
        moveBottom : function() {
            self.deg -= (Math.abs(self.deg % 360) === -270 ? (90) : (self.deg % 360))  - 90
            log(self.deg)
            self.dia.style.transform = `rotate(${self.deg}deg)`
            self.move().transBottom()
        }
    }
}
Diamond.prototype.getMsg = function(msg) {
    var self = this
    var com = msg.toLowerCase()
    // var num = msg.num
    switch (com) {
        case 'go':
            // loopRun(self.move().forword, num)
            self.move().forword()
            break;
        case 'tun lef':
            self.move().turnLeft()
            break;
        case 'tun rig':
            self.move().turnRight()
            break;
        case 'tun bac':
            self.move().turnBack()
            break;
        case 'tra lef':
            // loopRun(self.move().transLeft, num)
            self.move().transLeft()
            break;
        case 'tra top':
            // loopRun(self.move().transTop, num)
            self.move().transTop()
            break;
        case 'tra rig':
            // loopRun(self.move().transRight, num)
            self.move().transRight()
            break;
        case 'tra bot':
            // loopRun(self.move().transBottom, num)
            self.move().transBottom()
            break;
        case 'mov lef':
            // loopRun(self.move().moveLeft, num)
            self.move().moveLeft()
            break;
        case 'mov top':
            // loopRun(self.move().moveTop, num)
            self.move().moveTop()
            break;
        case 'mov rig':
            // loopRun(self.move().moveRight, num)
            self.move().moveRight()
            break;
        case 'mov bot':
            // loopRun(self.move().moveBottom, num)
            self.move().moveBottom()
            break;
        default:
            break;
    }
}
////////////绑定输入命令事件
var bindButton = function() {
    var btn = e('#id-button')
    var textarea = e('#id-textarea')
    var count = 0
    var oneMsg
    var runTimer
    bindEvent(btn, 'click', function(e){
        var valueArray = textarea.value.split('\n')
        var i = 0
        var runArray = []
        var wholeSec = 0      //统计一共多长时间
        //把所有的动画按顺序导入数组，其中对于有数字参数的命令，用循环导入相应个数的动画
        valueArray.forEach(function(e, i){
            var cell = check(e)
            if (cell) {
                for (let i = 0; i < cell.num; i++) {
                    runArray.push(cell.command)
                }
                // runArray.push(cell)
                // wholeSec += parseInt(cell.num)
            }
        })
        wholeSec = runArray.length
        // for (let i = 0; i < valueArray.length; i++) {
        //     var cell = check(valueArray[i])
        //     if (cell) {
        //         runArray.push(cell)
        //         wholeSec += parseInt(cell.num)
        //     }
        // }
        // 如果有元素的话
        if (runArray.length > 0) {
            //要先立即执行第一次，剩下的再按照次序隔1s执行一次
            this.getMsg(runArray[i])
            runTimer = setInterval(function(){
                i++
                if (i < runArray.length) {
                    this.getMsg(runArray[i])
                } else {
                    clearInterval(runTimer)
                }
            }.bind(this),1000)
        }
        //为防止重复调用动画，在点击后将按钮失效，等总共的时间后后(动画结束后),再使其有效
        btn.disabled = true
        setTimeout(function(){
            btn.disabled = false
        },1000 * wholeSec)
    }.bind(this))
}
/////////////检查是否为合格的命令,如果是，返回这个命令，如果不是，返回false
var check = function(command) {
    var orders = ['go','tun lef','tun rig','tun bac','tra lef','tra top','tra rig','tra bot','mov lef','mov top','mov rig','mov bot']
    var com = command.trim()
    var comArray = com.split(' ')
    var last = Number(comArray[comArray.length - 1])
    var num = 1            //默认等于1
    if (!isNaN(last) && (parseInt(last) === last)) {
        comArray.pop()
        com = comArray.join(' ')
        num = last
    }
    if (orders.includes(com.toLowerCase())) {
        return {
            command : com,
            num : num
        }
    } else {
        return false
    }
}
//////////代码行数列
var bindInput = function() {
    var ta = e('#id-textarea')
    var btn = e('#id-refresh')
    var rows = 1
    var rowDiv = e('.row')
    //根据每次输入的内容渲染行数列
    bindEvent(ta, 'input', function(e){
        var rowsArray = ta.value.split("\n")
        var newRows = rowsArray.length
        // if (newRows !== rows) {
        //     rows = newRows
            ////如果行数有变动,清空行数列，重新渲染这行之前的行数列
            //这里改了下，每次输入都检测，这样可以在输入的时候识别，而不只是回车的时候
        rowDiv.innerHTML = ''
        var errorClass
        for (let i = 0; i < rowsArray.length; i++) {
            if (check(rowsArray[i]) || rowsArray[i].length === 0) {
                errorClass = ''
            } else {
                errorClass = 'error'
            }
            // var errorClass = orders.includes(rowsArray[i].toLowerCase()) ? '' : 'error'
            appendHtml(rowDiv,`<li class=${errorClass}>${i + 1}</li>`)
        }
        // appendHtml(rowDiv,`<li>${rowsArray.length}</li>`)
            // log(rowsArray)
        // }
    })
    //使行数列随着滚动条scroll移动
    bindEvent(ta, 'scroll', function(e){
        rowDiv.style.top = `${-ta.scrollTop}px`
    })
    //绑定refresh按键
    bindEvent(btn, 'click', function(e){
        rowDiv.innerHTML = '<li>1</li>'
        ta.value = ''
    })
}()
///


var __main = function() {
    fill()
    // var dia = e('.diamond')
    var sq = e('.square')
    var d = new Diamond(sq)
    d.createAndSet()
    bindButton.call(d)
    // bindTransitionEnd()
}
