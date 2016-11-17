var log = function() {console.log.apply(console, arguments)}


///////////////////////////二叉树在js里的应用///////////////////////////////////
//建立二叉树
var BinaryTree = function() {
    this._root = null
}
////////////////////二叉树的各种方法///////////////////////////
//检查二叉树中是否拥有某元素
BinaryTree.prototype.contains = function(value) {
    var found = false, current = this._root
    //搜索树，从root开始，首先判断是否有root，再依次搜索，直到找到或者到某个null的元素
    while (!found && current) {
        //如果小于current，go left
        if (value < current.value) {
            current = current.left
        //如果大于current，go right
        } else if (value > current.value) {
            current = current.right
        //如果等于，找到了！
        } else {
            found = true
        }
    }
    return found
}
//往二叉树中添加一个新元素
BinaryTree.prototype.add = function(value) {
    //建立一个新的节点，存入数据value
    var node = {
        value: value,
        left: null,
        right: null,
    }
    //用current传输数据
    var current
    //如果没有root，就把这个传入的值作为root
    if (this._root === null) {
        this._root = node
    } else {
        //从root开始查找位置并添加，这里的current作用是传递数据
        current = this._root
        while (true) {
            //如果新value比current的小，go left
            if (value < current.value) {
                //如果没有left，新value就添加到这里,并结束循环
                if (current.left === null) {
                    current.left = node
                    break
                //如果有left，把left置于current，继续循环
                } else {
                    current = current.left
                }
            //如果新value比current的大，go right
            } else if (value > current.value) {
                //如果没有right，新value就添加到债诶，并结束循环
                if (current.right === null) {
                    current.right = node
                    break
                //如果有right，把right置于current，继续循环
                } else {
                    current = current.right
                }
            //如果新value和current的值相等，就忽略这个值，直接退出循环
            } else {
                break
            }
        }
    }
}
//以升序的方式遍历元素（即中序遍历），用一个辅助函数traverse表示,process表示处理每个元素所用的函数
BinaryTree.prototype.traverse = function(process) {
    //构造辅助函数，用于升序遍历二叉树,注意这里用的是递归。
    var inOrder = function(node) {
        //从某节点开始遍历
        if (node) {
            //先遍历左边的元素
            if (node.left !== null) {
                inOrder(node.left)
            }
            //这里用
            process.call(this, node)
            //再遍历右边的元素
            if (node.right !== null) {
                inOrder(node.right)
            }
        }
    }
    //从root根节点开始
    inOrder(this._root)
}
//剩下的需要遍历的函数只需要调用以上的traverse函数即可
//返回树的元素个数
BinaryTree.prototype.size = function() {
    var length = 0
    this.traverse(function(){
        length++
    })
    return length
}
//把所有元素存入数组并返回
BinaryTree.prototype.toArray = function() {
    var result = []
    this.traverse(function(node){
        result.push(node.value)
    })
    return result
}
//把数组导成字符串并返回
BinaryTree.prototype.toString = function() {
    return this.toArray().toString
}

/////////////////////////////////////////////////////////////////////////////
//声明用于存放循环改变颜色的元素的数组
var divs = [],
    timer
//中序遍历函数
var inOrder = function(node) {
    //这里应该对左右元素都进行检验是否存在，不过这里已知不会出现单侧节点，就简化为一个
    if (node) {
        inOrder(node.firstElementChild)
        divs.push(node)
        inOrder(node.lastElementChild)
    }
}
//前序遍历函数
var preOrder = function(node) {
    if (node) {
        divs.push(node)
        preOrder(node.firstElementChild)
        preOrder(node.lastElementChild)
    }
}
//后序遍历函数
var postOrder = function(node) {
    if (node) {
        postOrder(node.firstElementChild)
        postOrder(node.lastElementChild)
        divs.push(node)
    }
}
//循环改变divs颜色的函数
var colorChange = function() {
    //先把第一个置为蓝色
    divs[0].style.backgroundColor = 'blue'
    //从0开始，每隔500毫秒运行一次改变颜色
    var i = 0
    timer = setInterval(function(){
        i++
        //最后一次之前，每次修改不同div的颜色
        if (i < divs.length) {
            divs[i - 1].style.backgroundColor = 'white'
            divs[i].style.backgroundColor = 'blue'
        } else {
        //最后一个，停止动画，把最后一个的颜色清除
            clearInterval(timer)
            divs[divs.length - 1].style.backgroundColor = 'white'
        }
    }, 500)
}
//每次循环开始需要初始化条件，清空divs，把颜色清除
var reset = function() {
    divs = []
    clearInterval(timer)
    var divArray = document.querySelectorAll('div')
    for (var i = 0; i < divArray.length; i++) {
        divArray[i].style.backgroundColor = 'white'
    }
}
//bind所有按钮的事件
var bindButtons = function() {
    var buttons = document.querySelectorAll('button'),
        preBtn = buttons[0],
        inBtn = buttons[1],
        postBtn = buttons[2]
    //选取最外面的div为root元素
    var rootDiv = document.querySelector('.level-1')
    preBtn.onclick = function() {
        reset()
        preOrder(rootDiv)
        colorChange()
    }
    inBtn.onclick = function() {
        reset()
        inOrder(rootDiv)
        colorChange()
    }
    postBtn.onclick = function() {
        reset()
        postOrder(rootDiv)
        colorChange()
    }
}


window.onload = function() {
    bindButtons()
}
