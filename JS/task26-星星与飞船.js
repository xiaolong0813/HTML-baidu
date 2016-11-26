var log = function(){console.log.apply(console, arguments)}
//建立飞船对象
var Airship = function(id) {
    this.id = id,
    this.state = 'stop',
    this.deg = 0,
    this.power = 100,
    this.speed = 100,
    this.chargeSpeed = 30,
    this.dischargeSpeed = 20,
    this.shipDiv
}
//创建飞船
Airship.prototype.create = function() {
    let id = this.id
    var t = `<div class="ship-${id}" data-ship=${id}>
                <span>100%</span>
                <div class="power">
                </div>
            </div>`
    var path = $(`[data-path=${id}]`)
    path.append(t)
    this.shipDiv = $(`[data-ship=${id}]`)
    //把信息在控制台list中显示出来
    consoler(`创建飞船${id}号`)
}
//飞船动力系统,包括飞行和停止
Airship.prototype.dynamic = function() {
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
                self.state = 'fly'
                $(this).css('transform', `rotate(${n}deg)`)
                if (n === fx.end) {
                    self.state = 'stop'
                }
            },
            duration : time * 1000
        })
    }
    var stop = function() {
        self.shipDiv.stop()
        self.state = 'stop'
    }
    return {
        fly: fly,
        stop: stop
    }
}
//飞船能量系统，包括充能和放能
Airship.prototype.power = function() {

}

var test = function() {
    var a = new Airship(1)
    a.create()
    a.dynamic().fly()
    a.dynamic().stop()
}




// //动画工具,用于集体处理飞船的各个行为
var animater = {
    // create : function(id) {
    //     // log('create')
    //     var t = `<div class="ship-${id}" data-ship=${id}>
    //                 <span>100%</span>
    //                 <div class="power">
    //                 </div>
    //             </div>`
    //     var path = $($(`[data-path=${id}]`)[0])
    //     path.append(t)
    //     //把信息在控制台list中显示出来
    //     consoler('创建飞船')
    // },
    //// 参数为：id，开始和结束的角度，速度(每秒飞行的度数)
    // fly : function(id, degStart, degEnd, rate) {
    //     var ship = $(`[data-ship=${id}]`)
    //     //时间
    //     var time = (degEnd - degStart) / rate * 1000
    //     // 注意，这里animate不支持transform,不可直接用，但是可以用step函数实现
    //     ship.animate({xx: 0},{
    //         step: function(n, fx) {
    //             // 这里指定了start，前面的xx就和这里无关了，随便写个数就好
    //             fx.start = degStart
    //             fx.end = degEnd
    //             $(this).css('transform', `rotate(${n}deg)`)
    //         },
    //         duration : time
    //     })
    // },
    // stop : function(id) {
    //     var ship = $(`[data-ship=${id}]`)
    //     ship.stop()
    // },
    destroy : function(id) {
        var ship = $(`[data-ship=${id}]`)
        ship.remove()
    },
    //放电相关，power为当前能量，rate为放电速度
    discharge : function(id, power, rate) {
        //在ship中选择对应的能量和数值
        var ship = $(`[data-ship=${id}]`)
        var time = power / rate * 1000
        ship.animate({xx: 0}, {
            step: function(n, fx) {
                fx.start = power
                fx.end = 0
                $('.power', this).css('width', `${n}%`)
                let m = Math.floor(n)
                $('span', this).text(`${m}%`)
                return m
            },
            duration : time
        })
    },
    //充电相关
    charge : function(id, power, rate) {
        var ship = $(`[data-ship=${id}]`)
        var time = (100 - power) / rate *1000
        ship.animate({x: 0}, {
            step: function(n, fx) {
                fx.start = power
                fx.end = 100
                $('.power', this).css('width', `${n}%`)
                let m = Math.floor(n)
                $('span', this).text(`${m}%`)
            },
            duration: time
        })
    }
}

//控制台工具
var consoler = function(msg) {
    var t = `<li>${msg}</li>`
    $('.list').find('ul').prepend(t)
}
