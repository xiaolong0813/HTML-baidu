
var fill = function() {
    var liArray = []
    for (var i = 0; i < 100; i++) {
        liArray.push(`<li></li>`)
    }
    var t = liArray.join('\n')
    appendHtml(e('.square'), t)
}
//////////////////////////////////////
var Diamond = function(dia) {
    this.dia = dia,
    this.deg = 0,
    this.top = 0,
    this.left = 0,
    onAnimate = false
}
Diamond.prototype.move = function() {
    var self = this
    return {
        forword : function() {
            var dir = self.deg % 360
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
        turnLeft : function() {
            log(self.deg)
            self.deg -= 90
            self.dia.style.transition = '1s'
            self.dia.style.transform = `rotate(${self.deg}deg)`
            // 由于存在变量提升，必须等transition动画之后再执行下面的代码，将360变为0°
            if (self.deg === -360) {
                setTimeout(function(){
                    self.deg = 0
                    self.dia.style.transition = '0s'
                    self.dia.style.transform = `rotate(0deg)`
                },1000)
            }
        },
        turnRight : function() {
            self.deg += 90
            self.dia.style.transform = `rotate(${self.deg}deg)`
        },
        turnBack : function() {
            self.deg += 180
            self.dia.style.transform = `rotate(${self.deg}deg)`
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
        }
    }
}
Diamond.prototype.getMsg = function(msg) {
    var self = this
    // return {
    //     response : function() {
    var msg = msg.toLowerCase()
    if (msg === 'go') {
        self.move().forword()
    } else if (msg === 'tun lef') {
        self.move().turnLeft()
    } else if (msg === 'tun rig') {
        self.move().turnRight()
    } else if (msg === 'tun bac') {
        self.move().turnBack()
    }
        // }
    // }
}
////////////绑定输入命令事件
var bindButton = function() {
    var btn = e('#id-button')
    var input = e('#id-input')
    bindEvent(btn, 'click', function(e){
        var value = input.value
        // log(this)
        this.getMsg(value)
    }.bind(this))
}
var bindTransitionEnd = function() {
    bindEvent(e('.diamond'), 'transitionend', function(e){
        log('end')
    })
}

var __main = function() {
    fill()
    var dia = e('.diamond')
    var d = new Diamond(dia)
    bindButton.call(d)
    bindTransitionEnd()
}
