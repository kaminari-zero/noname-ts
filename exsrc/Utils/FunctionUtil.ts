namespace NG {
    /** 方法工具：函数式编程 */
    export module FunctionUtil {
        //======================条件方法============================
        function defaultTrue() {
            return true;
        }

        function defaultFalse() {
            return false;
        }

        /** 默认返回true的方法 */
        function getDefaultTrueFun() {
            return defaultTrue;
        }

        /** 默认返回false的方法 */
        function getDefaultFalseFun() {
            return defaultFalse;
        }

        /** 结果取非 */
        function resultNotFun(cond: ConditionFun, ...condis: any[]) {
            let result = cond.apply(null, condis);
            return !result;
        }

        /** 而且and:只要有一个是false，就返回false,都为true才返回true */
        function resultAndFun(conds: ConditionFun[], ...args: any[]) {
            let result = conds.every((element: ConditionFun) => {
                return element.apply(null, args);
            });
            return result;
        }

        /** 或者or:只要有一个是true，就返回true */
        function resultOrFun(conds: ConditionFun[], ...args: any[]) {
            let result = conds.some((element: ConditionFun) => {
                return element.apply(null, args);
            });
            return result;
        }

        /** 异或xor:如果a、b两个值不相同，则异或结果为1。如果a、b两个值相同，异或结果为0。 */
        function resultXorFun(cond1: ConditionFun, cond2: ConditionFun, ...args: any[]) {
            let result1 = cond1.apply(null, args);
            let result2 = cond2.apply(null, args);
            return result1 != result2;
        }

        /** 执行所有条件方法（把条件方法的返回值视为必定成功，单纯执行方法） */
        function defaultDoAllFun(conds: ConditionFun[], ...args: any[]) {
            conds.forEach((element: ConditionFun) => {
                element.apply(null, args);
            });
            return true;
        }

        /** 根据返回值，选择触发制定条件的，并返回其结果 */
        function selectedFun(conds: ConditionFun[], ...args: any[]) {
            let fristCond = conds.shift();
            let result = fristCond.apply(null, args);
            let seletedCond = conds[result];
            if (selectedFun) {
                return seletedCond.apply(null, args);
            } else {
                return false;
            }
        }

        /** 等于 */
        function equalFun(cond1: ConditionFun, cond2: ConditionFun, ...args: any[]) {
            let result1 = cond1.apply(null, args);
            let result2 = cond2.apply(null, args);
            return result1 == result2;
        }

        /** 等于 */
        function unequalFun(cond1: ConditionFun, cond2: ConditionFun, ...args: any[]) {
            let result1 = cond1.apply(null, args);
            let result2 = cond2.apply(null, args);
            return result1 != result2;
        }

        /** 大于 */
        function gtFun(cond1: ConditionFun, cond2: ConditionFun, ...args: any[]) {
            let result1 = cond1.apply(null, args);
            let result2 = cond2.apply(null, args);
            return result1 > result2;
        }

        /** 大于等于 */
        function gteFun(cond1: ConditionFun, cond2: ConditionFun, ...args: any[]) {
            let result1 = cond1.apply(null, args);
            let result2 = cond2.apply(null, args);
            return result1 >= result2;
        }

        /** 小于 */
        function ltFun(cond1: ConditionFun, cond2: ConditionFun, ...args: any[]) {
            let result1 = cond1.apply(null, args);
            let result2 = cond2.apply(null, args);
            return result1 < result2;
        }

        /** 小于等于 */
        function lteFun(cond1: ConditionFun, cond2: ConditionFun, ...args: any[]) {
            let result1 = cond1.apply(null, args);
            let result2 = cond2.apply(null, args);
            return result1 == result2;
        }

        /** 直接返回处理结果 */
        function resultFun(cond: ConditionFun, ...args: any[]) {
            return cond.apply(null, args);
        }

        /** 返回制定类型的一个条件 */
        export function getConditon(type: ConditionType, condis: ConditionFun[]): ConditionFun {
            switch (type) {
                case ConditionType.false:
                    return getDefaultTrueFun();
                case ConditionType.true:
                    return getDefaultTrueFun();

                //逻辑表达式
                case ConditionType.not:
                    //非只针对一个条件
                    return curry(resultNotFun, null, [condis[0]]);
                case ConditionType.and:
                    return curry(resultAndFun, null, condis);
                case ConditionType.or:
                    return curry(resultOrFun, null, condis);
                case ConditionType.xor:
                    return curry(resultXorFun, null, [condis[0], condis[1]]);
                case ConditionType.selete:
                    return curry(selectedFun, null, condis);
                case ConditionType.result:
                    return curry(resultFun, null, [condis[0]]);

                //条件表达式，两个条件之间的
                case ConditionType.equal:
                    return curry(equalFun, null, [condis[0], condis[1]]);
                case ConditionType.unequal:
                    return curry(unequalFun, null, [condis[0], condis[1]]);
                case ConditionType.gt:
                    return curry(gtFun, null, [condis[0], condis[1]]);
                case ConditionType.gte:
                    return curry(gteFun, null, [condis[0], condis[1]]);
                case ConditionType.lt:
                    return curry(ltFun, null, [condis[0], condis[1]]);
                case ConditionType.lte:
                    return curry(lteFun, null, [condis[0], condis[1]]);
            }
        }

        /** 嵌套条件实现:创建一个复杂的条件树 */
        export function createConditionTree(datas: BaseConditionNode) {
            let type = datas.type;
            let nodes = datas.nodes;
            let condis = datas.conditionFuns;
            let resultFun = [];
            //目前还是以综合条件展开：即当前条件列表里的条件和子节点的条件一起以type类型条件
            if (nodes && nodes.length) {
                for (let i = 0; i < nodes.length; i++) {
                    // nodes[i].root = datas;
                    let fun = createConditionTree(nodes[i]);
                    resultFun.push(fun);//创建子节点
                }
            }

            //用返回的条件和当前的条件合并成一个大条件：
            let lastFun = getConditon(type, resultFun.concat(condis));
            return lastFun;
        }

        /** 
         * 函数柯里化（简单实现）
         * 
         * 类似数学的交换率：
         *  只传递给函数一部分参数来调用它，
         *  让它返回一个函数去处理剩下的参数
         */
        export function curry(fn: Function, constext, ...arg) {
            let all = arg;
            return (...rest) => {
                all.push(...rest);
                return fn.apply(constext, all);
            }
        }

        /** 函数柯里化2:需要满足参数个数才执行函数，否则，一直返回柯里化函数 */
        export function curry2(fn, ...arg) {
            let all = arg || [],
                length = fn.length;
            return (...rest) => {
                let _args = all.slice(0); //拷贝新的all，避免改动公有的all属性，导致多次调用_args.length出错
                _args.push(...rest);
                if (_args.length < length) {
                    return curry2.call(this, fn, ..._args);
                } else {
                    return fn.apply(this, _args);
                }
            }
        }

        /** 函数柯里化3：参数不确定时，只要输入参数继续柯里化，否则执行最终的函数 */
        export function curry3(fn, ...arg) {
            let all = arg || [],
                length = fn.length;
            return (...rest) => {
                let _args = all;
                _args.push(...rest);
                if (rest.length === 0) {
                    all = [];
                    return fn.apply(this, _args);
                } else {
                    return curry3.call(this, fn, ..._args);
                }
            }
        }

        //实现一个复杂的条件树（还没想好）：
        // let tree:BaseConditionNode;//根节点树
        // let cacheCNodes:BaseConditionNode[] = [];//缓存节点池
        // /** 创建一个条件节点 */
        // function createConditionNode(type:ConditionType,root:BaseConditionNode) {
        //     let node:BaseConditionNode;
        //     if(cacheCNodes.length) {
        //         node = cacheCNodes.shift();
        //         node = initNode(node,type,root);
        //     } else {
        //         node = {
        //             /** 类型 */
        //             type:type,
        //             /** 当前的节点 */
        //             nodes:[],
        //             /** 当前节点的条件 */
        //             conditionFuns:[],
        //             /** 当前节点的父节点 */
        //             root:root
        //         };
        //     }
        //     return node;
        // }
        // function initNode(node:BaseConditionNode,type:ConditionType,root:BaseConditionNode) {
        //     node.root = root;
        //     node.type = type;
        //     node.nodes = [];
        //     node.conditionFuns = [];
        //     return node;
        // }

        //嵌合条件数据结构：
        // let data:BaseConditionNode = {
        //     type:ConditionType.and,
        //     conditionFuns:[],
        //     nodes:[
        //         {
        //             type:ConditionType.and,
        //             conditionFuns:[],
        //             nodes:[                       
        //             ]
        //         },
        //         {
        //             type:ConditionType.and,
        //             conditionFuns:[],
        //             nodes:[                     
        //             ]
        //         }
        //     ]
        // };
    }

    /** 条件类型 */
    export const enum ConditionType {
        false,
        true,

        //逻辑表达式
        not,
        and,
        or,
        xor,

        //条件表达式
        equal,
        unequal,
        gt,
        gte,
        lt,
        lte,
        /** 任意 */
        Infinity,
        /** 无 */
        NaN,

        /** 选择其中一项 */
        selete,
        /** 默认全执行，并返回1 */
        all,
        /** 返回一个结果 */
        result,
    }

    /** 条件方法(扩展1：返回数字可以扩展更多功能/...扩展2：直接什么都能返回) */
    export type ConditionFun = (...condis: any[]) => any;

    /** 基础条件树（实现起来好复杂） */
    interface BaseConditionNode {
        /** 类型 */
        type: ConditionType;
        /** 当前节点的条件 */
        conditionFuns: ConditionFun[];

        //为条件补充参数(暂时无用)
        /** 参数列表 */
        args?: any[];
        /** 绑定作用域 */
        thisObj?: any;

        //暂时不做树节点操作
        /** 当前的节点（若没有，则为叶子节点） */
        nodes?: BaseConditionNode[];
        /** 当前节点的父节点(执行时自动绑定,若没有则为根节点) */
        root?: BaseConditionNode;
    }

    // /** 条件表达式的类型（无用，统一到条件类型里去了） */
    // const enum CondExpreType {
    //     equal,
    //     unequal,
    //     gt,
    //     gte,
    //     lt,
    //     lte,
    //     Infinity,
    //     NaN,
    // }

    //实现测试：
    (function(){
        console.log("functionUtil test start!");
    })();
}