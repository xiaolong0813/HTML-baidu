
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
Diamond.prototype.move = function() {
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
            if (Math.abs(self.deg) >= 360) {
                setTimeout(function(){
                    self.deg = self.deg % 360
                    self.dia.style.transition = '0s'
                    self.dia.style.transform = `rotate(${self.deg}deg)`
                },1000)
            }
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
            self.dia.style.transform = `rotate(-180deg)`
            self.move().transLeft()
        },
        moveTop : function() {
            self.dia.style.transform = `rotate(-90deg)`
            self.move().transTop()
        },
        moveRight : function() {
            self.dia.style.transform = `rotate(0deg)`
            self.move().transRight()
        },
        moveBottom : function() {
            self.dia.style.transform = `rotate(90deg)`
            self.move().transBottom()
        }
    }
}
Diamond.prototype.getMsg = function(msg) {
    var self = this
    var msg = msg.toLowerCase()
    switch (msg) {
        case 'go':
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
            self.move().transLeft()
            break;
        case 'tra top':
            self.move().transTop()
            break;
        case 'tra rig':
            self.move().transRight()
            break;
        case 'tra bot':
            self.move().transBottom()
            break;
        case 'mov lef':
            self.move().moveLeft()
            break;
        case 'mov top':
            self.move().moveTop()
            break;
        case 'mov rig':
            self.move().moveRight()
            break;
        case 'mov bot':
            self.move().moveBottom()
            break;
        default:
            alert('无效指令！')
    }
}
////////////绑定输入命令事件
var bindButton = function() {
    var btn = e('#id-button')
    var input = e('#id-input')
    var count = 0
    bindEvent(btn, 'click', function(e){
        var value = input.value
        this.getMsg(value)
        //为防止重复调用动画，在点击后将按钮失效，等1s后(动画结束后),再使其有效
        btn.disabled = true
        setTimeout(function(){
            btn.disabled = false
        },1000)
    }.bind(this))
}

var __main = function() {
    fill()
    // var dia = e('.diamond')
    var sq = e('.square')
    var d = new Diamond(sq)
    d.createAndSet()
    bindButton.call(d)
    // bindTransitionEnd()
}
