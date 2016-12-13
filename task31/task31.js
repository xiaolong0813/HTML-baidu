var log = function() {console.log.apply(this, arguments)}
//////////////
var radioFunc = function(){
        var radioDiv = document.querySelector('.radioDiv'),
            selectDiv = document.querySelector('.selectDiv'),
            schoolDiv = document.querySelector('.schoolDiv'),
            city = schoolDiv.querySelector('.city'),
            school = schoolDiv.querySelector('.school'),
            toggleClass = function () {
                selectDiv.querySelector('.workDiv').classList.toggle('hide')
                selectDiv.querySelector('.schoolDiv').classList.toggle('hide')
            },
            data = {
                '北京' : ['北京大学','清华大学','人民大学'],
                '上海' : ['复旦大学','上海交通大学','上海大学'],
                '青岛' : ['青岛大学','中国海洋大学','中国石油大学'],
            },
            contact = function(array) {
                return (array.map(function(element, index){
                   return `<option value=${index}>${element}</option>`
               }).join(''))
            }
        return {
            bindRadio : function() {
            radioDiv.addEventListener('change', function(e){
                // var self = e.target
                // if (self.id === 'inSchool') {
                //     selectDiv.querySelector('.workDiv').classList.toggle('hide')
                //     selectDiv.querySelector('.schoolDiv').classList.toggle('hide')
                // } else if (self.id === 'outSchool') {
                //     selectDiv.querySelector('.workDiv').classList.toggle('hide')
                //     selectDiv.querySelector('.schoolDiv').classList.toggle('hide')
                // }
                toggleClass()
            })
        },
            bindSelect : function() {
            var keys = Object.keys(data),
            t = contact(keys),
            s = contact(data[keys[0]])
            log(keys)
            city.insertAdjacentHTML('beforeend', t)
            school.insertAdjacentHTML('beforeend', s)
            city.addEventListener('change', function(e){
                school.innerHTML = ''
                var self = e.target,
                    value = self.value,
                c = contact(data[keys[value]])
                school.insertAdjacentHTML('beforeend', c)
            })
        }
    }
}()

radioFunc.bindRadio()
radioFunc.bindSelect()
