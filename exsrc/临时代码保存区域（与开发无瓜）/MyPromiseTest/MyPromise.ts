/** 判断变量否为function */
const isFunction = variable => typeof variable === 'function';

// 定义Promise的三种状态常量
/** 进行中 */
const PENDING = 'PENDING';
/** 已完成 */
const FULFILLED = 'FULFILLED';
/** 已失败 */
const REJECTED = 'REJECTED';


class MyPromise {
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
    private _fulfilledQueues = [];
    /** 失败回调函数队列 */
    private _rejectedQueues = [];

    constructor(handler) {
        if (!isFunction(handler)) {
            throw new Error("不是一个方法");
        }

        //执行传入的handler:
        try {
            //因为方法将会被传递出去，注册this，避免失去当前对象的引用
            handler(this._resolve.bind(this), this._reject.bind(this));
            //注：handle函数包含 resolve 和 reject 两个参数，它们是两个函数，可以用于改变 Promise 的状态和传入 Promise 的值
            //其在代码操作的表现就是，需要操作这个参数方法，才能使当前promise异步函数的状态变化（否则一直运行中）。
        } catch (error) {
            this._reject(error);
        }
    }

    /** ********************************看大佬的最终实现************************************* */

    /**
     * 添加resovle时执行的函数
     * 
     * resolve : 将Promise对象的状态从 Pending(进行中) 变为 Fulfilled(已成功)
     */
    private _resolve(val) {
        const run = () => {
            if (this._status !== PENDING) return
            // 依次执行成功队列中的函数，并清空队列
            const runFulfilled = (value) => {
                let cb;
                while (cb = this._fulfilledQueues.shift()) {
                    cb(value)
                }
            }
            // 依次执行失败队列中的函数，并清空队列
            const runRejected = (error) => {
                let cb;
                while (cb = this._rejectedQueues.shift()) {
                    cb(error)
                }
            }
            /* 如果resolve的参数为Promise对象，则必须等待该Promise对象状态改变后,
              当前Promsie的状态才会改变，且状态取决于参数Promsie对象的状态
            */
            if (val instanceof MyPromise) {
                val.then(value => {
                    this._value = value
                    this._status = FULFILLED
                    runFulfilled(value)
                }, err => {
                    this._value = err
                    this._status = REJECTED
                    runRejected(err)
                })
            } else {
                this._value = val
                this._status = FULFILLED
                runFulfilled(val)
            }
        }
        // 为了支持同步的Promise，这里采用异步调用
        setTimeout(run, 0)
    }

    /**
     * 添加reject时执行的函数
     * 
     * reject : 将Promise对象的状态从 Pending(进行中) 变为 Rejected(已失败)
     * @param err 
     */
    private _reject(err) {
        if (this._status !== PENDING) return
        // 依次执行失败队列中的函数，并清空队列
        const run = () => {
            this._status = REJECTED
            this._value = err
            let cb;
            while (cb = this._rejectedQueues.shift()) {
                cb(err)
            }
        }
        // 为了支持同步的Promise，这里采用异步调用
        setTimeout(run, 0)
    }

    /**
     * 添加then方法
     * 
     * 当 resolve 或 reject 方法执行时，我们依次提取成功或失败任务队列当中的函数开始执行，并清空队列，从而实现 then 方法的多次调用
     * @param onFulfilled 
     * @param onRejected 
     */
    then(onFulfilled?, onRejected?) {
        const { _value, _status } = this;

        // 返回一个新的Promise对象
        // 返回的新的 Promise 对象的状态依赖于当前 then 方法回调函数执行的情况以及返回值
        // 当 resolve 或 reject 方法执行时，我们依次提取成功或失败任务队列当中的函数开始执行，并清空队列，从而实现 then 方法的多次调用
        return new MyPromise((onFulfilledNext, onRejectedNext) => {
            // 封装一个成功时执行的函数
            let fulfilled = value => {
                try {
                    if (!isFunction(onFulfilled)) {
                        onFulfilledNext(value)
                    } else {
                        let res = onFulfilled(value);
                        if (res instanceof MyPromise) {
                            // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
                            res.then(onFulfilledNext, onRejectedNext)
                        } else {
                            //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
                            onFulfilledNext(res)
                        }
                    }
                } catch (err) {
                    // 如果函数执行出错，新的Promise对象的状态为失败
                    onRejectedNext(err)
                }
            }
            // 封装一个失败时执行的函数
            let rejected = error => {
                try {
                    if (!isFunction(onRejected)) {
                        onRejectedNext(error)
                    } else {
                        let res = onRejected(error);
                        if (res instanceof MyPromise) {
                            // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
                            res.then(onFulfilledNext, onRejectedNext)
                        } else {
                            //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
                            onFulfilledNext(res)
                        }
                    }
                } catch (err) {
                    // 如果函数执行出错，新的Promise对象的状态为失败
                    onRejectedNext(err)
                }
            }

            switch (_status) {
                // 当状态为pending时，将then方法回调函数加入执行队列等待执行
                case PENDING:
                    this._fulfilledQueues.push(fulfilled)
                    this._rejectedQueues.push(rejected)
                    break
                // 当状态已经改变时，立即执行对应的回调函数
                case FULFILLED:
                    fulfilled(_value)
                    break
                case REJECTED:
                    rejected(_value)
                    break
            }
        })
    }

    /**
     * 添加catch方法
     * 
     * 相当于调用 then 方法, 但只传入 Rejected 状态的回调函数
     * @param onRejected 
     */
    catch(onRejected) {
        return this.then(undefined, onRejected)
    }

    /**
     * finally 方法
     * 
     * finally 方法用于指定不管 Promise 对象最后状态如何，都会执行的操作
     * @param cb 
     */
    finally(cb) {
        return this.then(
            value => MyPromise.resolve(cb()).then(() => value),
            reason => MyPromise.resolve(cb()).then(() => { throw reason })
        );
    };

    /*********************************静态方法*********************** */
    /**
     * 添加静态resolve方法
     */
    static resolve(value?) {
        // 如果参数是MyPromise实例，直接返回这个实例
        if (value instanceof MyPromise) return value
        return new MyPromise(resolve => resolve(value))
    }

    /**
     * 添加静态reject方法
     * @param value 
     */
    static reject(value?) {
        return new MyPromise((resolve, reject) => reject(value))
    }

    /**
     * 添加静态all方法
     * @param list 
     */
    static all(list) {
        return new MyPromise((resolve, reject) => {
            /**
             * 返回值的集合
             */
            let values = []
            let count = 0
            for (let [i, p] of list.entries()) {
                // 数组参数如果不是MyPromise实例，先调用MyPromise.resolve
                this.resolve(p).then(res => {
                    values[i] = res
                    count++
                    // 所有状态都变成fulfilled时返回的MyPromise状态就变成fulfilled
                    if (count === list.length) resolve(values)
                }, err => {
                    // 有一个被rejected时返回的MyPromise状态就变成rejected
                    reject(err)
                })
            }
        })
    }

    /**
     * 添加静态race方法
     * @param list 
     */
    static race(list) {
        return new MyPromise((resolve, reject) => {
            for (let p of list) {
                // 只要有一个实例率先改变状态，新的MyPromise的状态就跟着改变
                this.resolve(p).then(res => {
                    resolve(res)
                }, err => {
                    reject(err)
                })
            }
        })
    }
    
    //-------------后续优化，可以引入对象池，对promise对象进行管理-----------------
}

/*
Promise 的执行规则，包括“值的传递”和“错误捕获”机制：
1、如果 onFulfilled 或者 onRejected 返回一个值 x ，则运行下面的 Promise 解决过程：[[Resolve]](promise2, x)
    若 x 不为 Promise ，则使 x 直接作为新返回的 Promise 对象的值， 即新的onFulfilled 或者 onRejected 函数的参数.
    若 x 为 Promise ，这时后一个回调函数，就会等待该 Promise 对象(即 x )的状态发生变化，才会被调用，并且新的 Promise 状态和 x 的状态相同。

2、如果 onFulfilled 或者onRejected 抛出一个异常 e ，则 promise2 必须变为失败（Rejected），并返回失败的值 e

3、如果onFulfilled 不是函数且 promise1 状态为成功（Fulfilled）， promise2 必须变为成功（Fulfilled）并返回 promise1 成功的值

4、如果 onRejected 不是函数且 promise1 状态为失败（Rejected），promise2必须变为失败（Rejected） 并返回 promise1 失败的值

5.一种特殊的情况，就是当 resolve 方法传入的参数为一个 Promise 对象时，则该 Promise 对象状态决定当前 Promise 对象的状态:
        const p1 = new Promise(function (resolve, reject) {
        // ...
        });

        const p2 = new Promise(function (resolve, reject) {
        // ...
        resolve(p1);
        })

    p1 和 p2 都是 Promise 的实例，但是 p2 的resolve方法将 p1 作为参数，即一个异步操作的结果是返回另一个异步操作。
    注意，这时 p1 的状态就会传递给 p2，也就是说，p1 的状态决定了 p2 的状态。如果 p1 的状态是Pending，那么 p2 的回调函数就会等待 p1 的状态改变；如果 p1 的状态已经是 Fulfilled 或者 Rejected，那么 p2 的回调函数将会立刻执行。

*/

function test1() {
    let promise1 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })
    let promise2 = promise1.then(res => {
        // 返回一个普通值
        return '这里返回一个普通值'
    })
    promise2.then(res => {
        console.log(res) //1秒后打印出：这里返回一个普通值
    })
}

function test2() {
    let promise1 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })
    let promise2 = promise1.then(res => {
        // 返回一个Promise对象
        return new MyPromise((resolve, reject) => {
            setTimeout(() => {
                resolve('这里返回一个Promise')
            }, 2000)
        })
    })
    promise2.then(res => {
        console.log(res) //3秒后打印出：这里返回一个Promise
    })

}

function test3() {
    let promise1 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
            resolve('success')
        }, 1000)
    })
    let promise2 = promise1.then(res => {
        throw new Error('这里抛出一个异常e')
    })
    promise2.then(res => {
        console.log(res)
    }, err => {
        console.log(err) //1秒后打印出：这里抛出一个异常e
    })
}

function test4() {
    let promise1 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
            resolve('success')
        }, 1000)
    })
    let promise2 = promise1.then('这里的onFulfilled本来是一个函数，但现在不是')
    promise2.then(res => {
        console.log(res) // 1秒后打印出：success
    }, err => {
        console.log(err)
    })
}

function test5() {
    let promise1 = new MyPromise((resolve, reject) => {
        setTimeout(() => {
            reject('fail')
        }, 1000)
    })
    let promise2 = promise1.then(res => res, '这里的onRejected本来是一个函数，但现在不是')
    promise2.then(res => {
        console.log(res)
    }, err => {
        console.log(err)  // 1秒后打印出：fail
    })
}

/**
 * 该实现是否有这种问题（关于宏任务 与 微任务）
 */
function test6(){
    // 测试代码
    new MyPromise(resolve => {
        console.log(1);
        resolve(3);
        MyPromise.resolve().then(() => console.log(4)).then(() => console.log(5))
    }).then(num => { console.log(num) }).then(() => { console.log(6) });
    console.log(2)
   // 旧实现的输出：1 2 3 4 6 5
}