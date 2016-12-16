var log = function() {
    console.log.apply(this, arguments)
}
var $ = function(item) {
    return document.querySelector(item)
}

var FormObj = function(id, type, name, method, style, necessary, min, max, tagArray) {
    this.id = id,
    this.type = type,
    this.name = name,
    this.method = method,
    this.style = style,
    this.necessary = necessary,              //true是必填，false是选填
    this.min = min,
    this.max = max,
    this.tagArray = tagArray,
    this.success,
    this.fail
}

FormObj.prototype.createManager = function() {
    var self = this
    var judgeType = function() {
        log(self)
        switch (self.type) {
            case 'text':
                createText()
                break;
            case 'radio':
                createRadio()
                break;
            default:
                log('error')
        }
    }
    var baseHTML = function(temp) {
        var nec = self.necessary ? '必填' : '选填'
        var t = `<div class="long-cell">
                    <div class="long-row-${self.style} long-row1-${self.style}">
                        <div class="long-name long-col-${self.style} long-col1-${self.style}">${self.name}: </div>
                        <div>${temp}</div>
                    </div>
                    <div class="long-row-${self.style} long-row2-${self.style}">
                        <div class="long-col-${self.style} long-col1-${self.style}"></div>
                        <div class="long-col-${self.style} long-col2-${self.style}">${nec}，字符长度为${self.min}-${self.max}</div>
                    </div>
                 </div>`
        return t
    }

    var createText = function() {
        var t = baseHTML(`<input type="text" class="long-col-${self.style} long-col2-${self.style}" value="">`)
        $('#submit-button').insertAdjacentHTML('beforebegin', t)
    }
    var createRadio = function() {
        if (self.tagArray.length === 0) {
            alert('请输入选项')
        } else {
            var tags = self.tagArray.map(function(e, i){
                return `<label><input type="radio" name="radio-${self.id}">${e}</label>`
            }).join('\n')
            var t = baseHTML(tags)
            $('#submit-button').insertAdjacentHTML('beforebegin', t)
        }

    }


    return {
        judgeType : judgeType
    }
}




__main = function() {
    // log('ready')
}
