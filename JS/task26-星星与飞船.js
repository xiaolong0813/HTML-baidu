var log = function(){console.log.apply(console, arguments)}
//建立飞船对象
var Airship = function(id) {
    this.id = id,
    this.state = 'stop',
    this.deg = 0,
    this.power = 100,
    this.speed = 70,
    this.chargeSpeed = 10,
    this.dischargeSpeed = 15,
    this.shipDiv,
    this.powerDiv
}
//创建飞船
Airship.prototype.create = function() {
    let id = this.id
    var t = `<div class="ship-${id}" data-ship=${id}>
                <div class="power"><span>100%</span></div>
            </div>`
    var path = $(`[data-path=${id}]`)
    path.append(t)
    this.shipDiv = $(`[data-ship=${id}]`)
    this.powerDiv = $('.power', this.shipDiv)
    //把信息在控制台list中显示出来
    consoler(`创建飞船${id}号`)
}
//飞船动力系统,包括飞行和停止和销毁
Airship.prototype.dynamicSystem = function() {
    //用一个参数self把this传进去,和bind(this)的效果相同
    var self = this
    var fly = function() {
        //剩下的能量还能飞多久(单位是s)，以及开始的角度，和这段时间能飞多少角度
        //注意这里不能在step里面直接用self.deg，否则无法在动画的过程中同步self.deg
        var time = self.power / self.dischargeSpeed
        var deg = self.deg
        var degEnd = self.deg + self.speed * time
        self.shipDiv.animate({xx: 0},{
            // 注意，这里animate不支持transform,不可直接用，但是可以用step函数实现
            step: function(n, fx) {
                // 这里指定了start，前面的xx就和这里无关了，随便写个数就好
                fx.start = deg
                fx.end = degEnd
                self.deg = n % 360
                // log(n)
                $(this).css('transform', `rotate(${n}deg)`)
            },
            duration : time * 1000
        })
    }
    var stop = function() {
        self.shipDiv.stop()
        self.state = 'stop'
    }
    var destroy = function() {
        self.shipDiv.stop()
        self.powerDiv.stop()
        self.shipDiv.remove()
    }
    return {
        fly: fly,
        stop: stop,
        destroy: destroy
    }
}
//飞船能量系统，包括充能和放能
Airship.prototype.powerSystem = function() {
    var self = this
    var power = self.power
    var powerCharge = function(pStart, pEnd) {
        var time = Math.abs(pEnd - pStart) / self.dischargeSpeed
        self.powerDiv.animate({x: 0}, {
            step: function(n, fx) {
                fx.start = pStart
                fx.end = pEnd
                self.power = n
                //这里的this指的是调用动画的对象，即self.powerDiv
                $(this).css('width', `${n}%`)
                let m = Math.floor(n)
                $('span', this).text(`${m}%`)
                if (n > 50) {
                    $(this).css('background-color', `green`)
                } else if (n > 25) {
                    $(this).css('background-color', `orange`)
                } else {
                    $(this).css('background-color', `red`)
                }
            },
            //这里定义结束后执行的函数，如果能量为0，则飞船状态改为stop
            complete: function() {
                if (self.power === 0) {
                    self.stateManager().changeState('stop')
                }
            },
            duration : time * 1000,
        })
    }
    var discharge = function() {
        self.powerDiv.stop()
        self.powerSystem().powerCharge(power, 0)
    }
    var charge = function() {
        self.powerDiv.stop()
        self.powerSystem().powerCharge(power, 100)
    }
    return {
        powerCharge : powerCharge,
        discharge : discharge,
        charge : charge
    }
}
//不同状态时的相应行为
Airship.prototype.stateManager = function() {
    var self = this
    //不同状态时的行为函数
    var states = {
        flyState : function() {
            self.state = 'fly'
            self.dynamicSystem().fly()
            self.powerSystem().discharge()
            consoler(`${self.id}号飞船起飞了,耗能率每秒${self.dischargeSpeed}%~`)
        },
        stopState : function() {
            self.state = 'stop'
            self.dynamicSystem().stop()
            self.powerSystem().charge()
            consoler(`${self.id}号飞船停止了,充能率每秒${self.chargeSpeed}%~`)
        },
        destroyState : function() {
            self.dynamicSystem().destroy()
            consoler(`${self.id}号飞船已销毁~`)
        }
    }
    var changeState = function(state) {
        if (state !== self.state) {
            states[`${state}State`]()
        }
    }
    return {changeState : changeState}
}
//接受信号系统，用于通过信号做出相应行为
Airship.prototype.getMessage = function(id, msg) {
    var self = this
    if (id === self.id) {
        switch (msg) {
            case 'fly':
            case 'stop':
            case 'destroy':
                self.stateManager().changeState(msg)
                break;
            default:
                alert("invalid command")
        }
    }
}

//指挥官对象
var commander = function() {
    

}

var test = function() {
    var a = new Airship(1)
    a.create()
    a.getMessage(1, 'fly')
    var b = new Airship(2)
    b.create()
    b.getMessage(2, 'fly')

}

// //动画工具,用于集体处理飞船的各个行为
// var animater = {
//     // create : function(id) {
//     //     // log('create')
//     //     var t = `<div class="ship-${id}" data-ship=${id}>
//     //                 <span>100%</span>
//     //                 <div class="power">
//     //                 </div>
//     //             </div>`
//     //     var path = $($(`[data-path=${id}]`)[0])
//     //     path.append(t)
//     //     //把信息在控制台list中显示出来
//     //     consoler('创建飞船')
//     // },
//     //// 参数为：id，开始和结束的角度，速度(每秒飞行的度数)
//     // fly : function(id, degStart, degEnd, rate) {
//     //     var ship = $(`[data-ship=${id}]`)
//     //     //时间
//     //     var time = (degEnd - degStart) / rate * 1000
//     //     // 注意，这里animate不支持transform,不可直接用，但是可以用step函数实现
//     //     ship.animate({xx: 0},{
//     //         step: function(n, fx) {
//     //             // 这里指定了start，前面的xx就和这里无关了，随便写个数就好
//     //             fx.start = degStart
//     //             fx.end = degEnd
//     //             $(this).css('transform', `rotate(${n}deg)`)
//     //         },
//     //         duration : time
//     //     })
//     // },
//     // stop : function(id) {
//     //     var ship = $(`[data-ship=${id}]`)
//     //     ship.stop()
//     // },
//     // destroy : function(id) {
//     //     var ship = $(`[data-ship=${id}]`)
//     //     ship.remove()
//     // },
//     //放电相关，power为当前能量，rate为放电速度
//     discharge : function(id, power, rate) {
//         //在ship中选择对应的能量和数值
//         var ship = $(`[data-ship=${id}]`)
//         var time = power / rate * 1000
//         ship.animate({xx: 0}, {
//             step: function(n, fx) {
//                 fx.start = power
//                 fx.end = 0
//                 $('.power', this).css('width', `${n}%`)
//                 let m = Math.floor(n)
//                 $('span', this).text(`${m}%`)
//             },
//             duration : time
//         })
//     },
//     //充电相关
//     charge : function(id, power, rate) {
//         var ship = $(`[data-ship=${id}]`)
//         var time = (100 - power) / rate *1000
//         ship.animate({x: 0}, {
//             step: function(n, fx) {
//                 fx.start = power
//                 fx.end = 100
//                 $('.power', this).css('width', `${n}%`)
//                 let m = Math.floor(n)
//                 $('span', this).text(`${m}%`)
//             },
//             duration: time
//         })
//     }
// }

//控制台工具
var consoler = function(msg) {
    var t = `<li><i class="fa fa-volume-up"></i> ${msg}</li>`
    $('.list').find('ul').prepend(t)
}
