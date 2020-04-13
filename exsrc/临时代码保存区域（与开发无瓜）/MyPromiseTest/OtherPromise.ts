//目前因为ts编译问题，先用this顶着，想办法实现globalThis
// (function (Object) {
//   typeof this.globalThis !== 'object' && (
//     this ?
//       get() :
//       (Object.defineProperty(Object.prototype, '_T_', {
//         configurable: true,
//         get: get
//       }), _T_)
//   );
//   function get() {
//     this.globalThis = this;
//     delete Object.prototype._T_;
//   }
// }(Object));
// var globalThis = this.globalThis;

var executeAsync;
if (typeof this.process == 'object' && this.process.nextTick) {
    executeAsync = this.process.nextTick;
} 
// 貌似只有ie10有，window.setImmediate
// else if (typeof setImmediate == 'function') {
//     executeAsync = setImmediate
// } 
else {
    executeAsync = function (fn) { setTimeout(fn, 0) }
}
function callAsync(fn, arg, callback, onError) {
    executeAsync(function () {
        try {
            callback ? callback(fn(arg)) : fn(arg)
        } catch (e) {
            onError(e)
        }
    })
}

class MyPromise2 {
    /** 
     * 当前操作状态
     * 
     * 状态只能由 Pending 变为 Fulfilled 或由 Pending 变为 Rejected ，且状态改变之后不会在发生变化，会一直保持这个状态。
     */
    private _status: string = PENDING;
    /** 
     * 当前保存的值
     * 
     * Promise的值是指状态改变时传递给回调函数的值
     */
    private _value: any;
    /** 成功回调函数队列 */
    private _fulfilledQueue = [];
    /** 失败回调函数队列 */
    private _rejectedQueue = [];

    constructor(handle) {
        if (!isFunction(handle)) {
            throw new Error('MyPromise2 must accept a function as a parameter')
        }
        // 添加状态
        this._status = PENDING
        // 添加状态
        this._value = null
        // 添加成功回调函数队列
        this._fulfilledQueue = []
        // 添加失败回调函数队列
        this._rejectedQueue = []
        // 执行handle
        try {
            handle(this._resolve.bind(this), this._reject.bind(this))
        } catch (err) {
            this._reject(err)
        }
    }
    // 添加resovle时执行的函数
    _resolve(val) {
        if (this._status !== PENDING) return
        this._status = FULFILLED
        // 依次执行成功队列中的函数，并清空队列
        const runFulfilled = (value) => {
            let cb;
            while (cb = this._fulfilledQueue.shift()) {
                cb(value)
            }
        }
        // 依次执行失败队列中的函数，并清空队列
        const runRejected = (error) => {
            let cb
            while (cb = this._rejectedQueue.shift()) {
                cb(error)
            }
        }
        /* 如果resolve的参数为Promise对象，则必须等待该Promise对象状态改变后,
          当前Promsie的状态才会改变，且状态取决于参数Promsie对象的状态
        */
        if (val instanceof MyPromise2) {
            val.then(value => {
                this._value = value
                runFulfilled(value)
            }, err => {
                this._value = err
                runRejected(err)
            })
        } else {
            this._value = val
            runFulfilled(val)
        }
    }
    // 添加reject时执行的函数
    _reject(err) {
        if (this._status !== PENDING) return
        // 依次执行失败队列中的函数，并清空队列
        this._status = REJECTED
        this._value = err
        let cb
        while (cb = this._rejectedQueue.shift()) {
            cb(err)
        }
    }
    // 添加then方法
    then(onFulfilled?, onRejected?) {
        // 返回一个新的Promise对象
        return new MyPromise2((onFulfilledNext, onRejectedNext) => {
            // 封装一个成功时执行的函数
            let fulfilled = value => {
                if (isFunction(onFulfilled)) {
                    callAsync(onFulfilled, value, res => {
                        if (res instanceof MyPromise2) {
                            // 如果当前回调函数返回MyPromise2对象，必须等待其状态改变后在执行下一个回调
                            res.then(onFulfilledNext, onRejectedNext)
                        } else {
                            // 否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
                            onFulfilledNext(res)
                        }
                    }, onRejectedNext)
                } else {
                    try {
                        onFulfilledNext(value)
                    } catch (err) {
                        // 如果函数执行出错，新的Promise对象的状态为失败
                        onRejectedNext(err)
                    }
                }
            }
            // 封装一个失败时执行的函数
            let rejected = error => {
                if (isFunction(onRejected)) {
                    callAsync(onRejected, error, res => {
                        if (res instanceof MyPromise2) {
                            // 如果当前回调函数返回MyPromise2对象，必须等待其状态改变后在执行下一个回调
                            res.then(onFulfilledNext, onRejectedNext)
                        } else {
                            // 否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
                            onFulfilledNext(res)
                        }
                    }, onRejectedNext)
                } else {
                    try {
                        onRejectedNext(error)
                    } catch (err) {
                        // 如果函数执行出错，新的Promise对象的状态为失败
                        onRejectedNext(err)
                    }
                }
            }

            switch (this._status) {
                // 当状态为pending时，将then方法回调函数加入执行队列等待执行
                case PENDING:
                    this._fulfilledQueue.push(fulfilled)
                    this._rejectedQueue.push(rejected)
                    break
                // 当状态已经改变时，立即执行对应的回调函数
                case FULFILLED:
                    fulfilled(this._value)
                    break
                case REJECTED:
                    rejected(this._value)
                    break
            }
        })
    }
    // 添加catch方法
    catch(onRejected) {
        return this.then(null, onRejected)
    }
    // 添加静态resolve方法
    static resolve(value?) {
        // 如果参数是MyPromise2实例或thenable对象，直接返回value
        return value instanceof MyPromise2 ||
            (value && isFunction(value.then)) ? value :
            new MyPromise2(resolve => resolve(value))
    }
    // 添加静态reject方法
    static reject(value?) {
        return new MyPromise2((resolve, reject) => reject(value))
    }
    // 添加静态all方法
    static all(list) {
        return new MyPromise2((resolve, reject) => {
            let values = [], count = list.length
            for (let i in list) {
                // 数组参数如果不是MyPromise2实例，先调用MyPromise2.resolve
                this.resolve(list[i]).then(res => {
                    values[i] = res
                    // 所有状态都变成fulfilled时返回的MyPromise2状态就变成fulfilled
                    --count < 1 && resolve(values)
                }, reject)
            }
        })
    }
    // 添加静态race方法
    static race(list) {
        return new MyPromise2((resolve, reject) => {
            for (let p of list) {
                // 只要有一个实例率先改变状态，新的MyPromise2的状态就跟着改变
                this.resolve(p).then(res => {
                    resolve(res)
                }, reject)
            }
        })
    }
    finally(cb) {
        return this.then(
            value => MyPromise2.resolve(cb()).then(() => value),
            reason => MyPromise2.resolve(cb()).then(() => { throw reason })
        )
    }
}

function test20(){
    // 测试代码
    new MyPromise2(resolve => {
        console.log(1);
        resolve(3);
        MyPromise2.resolve()
                    .then(() => console.log(4))
                    .then(() => console.log(5))
    }).then(num => { console.log(num) })
        .then(() => { console.log(6) });
    console.log(2)
    // 新实现 依次输出：1 2 4 3 5 6
}