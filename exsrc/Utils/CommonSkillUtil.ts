namespace NG {
    //使用该函数时，暴力导入game的六大成员：
    export var lib: Lib;
    export var status: Status;
    export var game: Game;
    export var ui: UI;
    export var get: Get;
    export var ai: AI;

    /** 初始化该工具的原始环境，使其可以获得game的六大成员 */
    export function initContent(_lib: Lib, _status: Status, _game: Game, _ui: UI, _get: Get, _ai: AI) {
        lib = _lib;
        status = _status;
        game = _game;
        ui = _ui;
        get = _get;
        ai = _ai;
    }

    /** 简化开发技能框架 */
    export class SimpleSkillFrame {

        /** 简单的主动技1:主动用/挑选卡牌以使用 */
        static simpleZhuDongJi() {
            let skill: ExSkillData = {
                enable: EnableTrigger.chooseToUse,
            };
        }

        /** 是过滤某个卡牌(卡牌的属性)【似乎有点复杂，估计会隐藏很多bug在里面】 */
        static isFilterCard(data: CardConditionData) {
            let condis:ConditionFun[] = [];
            for (const key in data) {
                const element = data[key];
                if (element) {
                    let subCondis:ConditionFun[] = [];
                    let condType = data[`${key}_condType`];
                    if(condType===undefined) { //拥有特定条件
                        condType = ConditionType.equal;
                    } 
                    if(Array.isArray(element)) {
                        for (let j = 0; j < element.length; j++) {
                            const value = element[j];
                            subCondis.push(this.CardFilterFun(key,value,condType));
                            // subCondis.push((event: Trigger, player: Player)=> {
                            //     //todo:目前有个问题，就是get是否能取到，如果取不到get该怎么办
                            //     //该key不知道会不会有影响
                            //     if (get[key]) { //有对应的get方法，则使用get方法获取
                            //         let condType = data[`${key}_condType`];
                            //         if(condType===undefined) { //拥有特定条件
                            //             condType = ConditionType.equal;
                            //         } 
                            //         let result = this.setCondition(condType,
                            //             [
                            //                 (event: Trigger, player: Player)=>{
                            //                     return get[key](event.card);
                            //                 },
                            //                 ()=>{
                            //                     return value;
                            //                 }
                            //             ]);
                            //         return result(event,player);//这边即时求值
                            //     } else {
                            //         return event.card[key] == name;
                            //     }
                            // });
                        }
                        condis.push(this.setCondition(ConditionType.or,subCondis)); //或者的关系
                    } else {
                        condis.push(this.CardFilterFun(key,element,condType));
                        // condis.push((event: Trigger, player: Player)=>{
                        //     if (get[key]) { //有对应的get方法，则使用get方法获取
                        //         let condType = data[`${key}_condType`];
                        //         if(condType===undefined) { //拥有特定条件
                        //             condType = ConditionType.equal;
                        //         } 
                        //         let result = this.setCondition(condType,
                        //             [
                        //                 (event: Trigger, player: Player)=>{
                        //                     return get[key](event.card);
                        //                 },
                        //                 ()=>{
                        //                     return element;
                        //                 }
                        //             ]);
                        //         return result(event,player);//这边即时求值
                        //     } else {
                        //         return event.card[key] == element;
                        //     }
                        // });
                    }
                    
                }
            }
            //必须所有条件都通过
            return this.setCondition(data.conditionType, condis);
        }

        /** 用于构建卡牌的过滤条件 */
        private static CardFilterFun(key:string,value:any,condType:number) {
            return (event: Trigger, player: Player)=> {
                //todo:目前有个问题，就是get是否能取到，如果取不到get该怎么办(解决方法，将get注入当前环境)
                if (get[key]) { //有对应的get方法，则使用get方法获取
                    let result = this.setCondition(condType,
                        [
                            (event: Trigger, player: Player)=>{
                                return get[key](event.card);
                            },
                            ()=>{
                                return value;
                            }
                        ]);
                    return result(event,player);//这边即时求值
                } else {
                    return event.card[key] == name;
                }
            }
        }

        /** 是过滤玩家 */
        static isFilterPlayer(data) {

        }

        /** 用于构建玩家的过滤条件 */
        private static PlayerFilterFun(key:string,value:any,condType:number) {
        }

        /** 是过滤目标玩家 */
        static isFilterTarget(data) {
            
        }

        /** 用于构建目标的过滤条件 */
        private static TargetFilterFun(key:string,value:any,condType:number) {
        }

        /** 返回条件方法 */
        static setCondition(type: ConditionType, condis: ConditionFun[], ...args: any[]) {
            let fun = FunctionUtil.getConditon(type, condis);
            return fun;
        }
    }

    /** 技能工具 */
    export class SkillUtil {

    }

    

    /**
     * 检测卡牌条件(基本卡牌信息，作为基本的参数结构)
     */
    interface CardConditionData {
        conditionType:ConditionType;

        //数组形式是或者的关系
        name?: string[];
        suit?: string[];
        number?: number;
        nature?: string[];

        //用于某些方法，用于过滤卡牌的额外结构
        type?: string[];
        subtype?: string[];
        color?: string[];

        /** 数字的大小条件 */
        number_condType:ConditionType;
    }

    /** 检测玩家条件 */
    interface PlayerConditionData {
        conditionType:ConditionType;
        name?: string[];
        sex?:string;

        position:string;
        countCards:number;
    }
}



// function test() {
//     let arr = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 };

//     let funs = [];
//     for (const key in arr) {
//         const element = arr[key];
//         funs.push(function () {
//             console.log(`key=${key};value=${arr[key]}`);
//         });
//     }

//     (function print() {
//         for (let i = 0; i < funs.length; i++) {
//             const element = funs[i];
//             element();
//         }
//     })();
// }

// function test2() {
//     var print;
//     (function (obj) {
//         function print(a) {
//             console.log("print start：");
//             return function () {
//                 console.log(a); //这里的a是拿不到的
//             }
//         }

//         // print()();

//         obj = print;
//     })(print);
//     console.log("print成功设置了吗:", print);
//     (function () {
//         var a = { a: 1, b: 2, c: 3 };
//         console.log("this:", this, this.a, this.print);
//         let temp = print(a);
//         temp();
//     })();
// }