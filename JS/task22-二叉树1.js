var log = function() {console.log.apply(console, arguments)}

var divTree = function (div, left, right) {
    this.div = div || null
    this.left = left || null
    this.right = right || null
}

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








var a = [2, 5, 7, 1, 4, 10, 0]
var tree = new BinaryTree()
for (var i = 0; i < a.length; i++) {
    tree.add(a[i])
}

var vfunc = function(n, v) {
    if (n === 0) {
        return []
    } else {
        --n
        return [...(vfunc(n, v)), v]
    }
}




// BinaryTree.prototype = {
//     //也是一种声明其函数的方法
//     constructor : BinaryTree,
//     //增加node
//     add: function(value) {
//
//     },
//     remove: function(value) {
//
//     },
//     size: function() {
//
//     },
//     toArray: function() {
//
//     },
//     toString: function() {
//
//     }
// }
