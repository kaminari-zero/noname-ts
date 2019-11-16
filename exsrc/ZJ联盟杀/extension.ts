/**
 * ZJ联盟杀
 */
module ZJNGEx {
    export let type = NG.ImportType.Extension;
    export function extensionFun(lib: Lib, game: Game, ui: UI, get: Get, ai: AI, _status: Status): ExtensionInfoConfigData {
        //武将
        //zjm01
        let heros: CharacterConfigData = {
            // name: "ZJShaHero",
            // connect: true,
            character: {
                zjm01_yangjuebo: [NG.Sex.MALE, NG.Group.WOOD, 5, ["zj_laobo"],[]],
                zjm01_zhengbosen: [NG.Sex.MALE, NG.Group.WOOD, 4, ["zj_bosen"],[]],
                zjm01_huanghuafu: [NG.Sex.MALE, NG.Group.WATER, 4, ["zj_ganglie"],[]],
            },
            characterTitle: {
                zjm01_yangjuebo:"盟主捞波",
                zjm01_zhengbosen:"老鬼"
            },
            characterIntro:{

            },
            skill: {
                zj_laobo:{
                    name:"捞波",
                    enable: NG.EnableTrigger.phaseUse,
                    usable:1,
                    // selectCard:[1,Infinity],
                    // discard:false,
                    // prepare:NG.PrepareConst.Give,
                    // filterTarget: (card: Card, player: Player, target: Target)=>{
                    //     return player!=target; //目标不能是自己
                    // },
                    precontent: function (event: GameEvent, step: number, source: Player, player: Player, target: Player, targets: Player[], card: Card, cards: Card[], skill: string, forced: boolean, num: number, trigger: GameEvent, result: BaseResultData){
                        //初始化标记（扩展一个全局性质的变量）
                        player.storage.zj_laobo_targets = [];//对哪些目标使用
                        player.storage.zj_laobo_num = 0;//总共给出的牌数
                    },
                    content: function (event: GameEvent, step: number, source: Player, player: Player, target: Player, targets: Player[], card: Card, cards: Card[], skill: string, forced: boolean, num: number, trigger: GameEvent, result: BaseResultData){
                        let storageTargets:Player[] = player.storage.zj_laobo_targets;
                        let storageNum:number = player.storage.zj_laobo_num;
                        let haveHandCard = player.countCards(NG.PositionType.Shoupai) > 0;
                        'step 0'
                        if (NG.ObjectUtil.isUndefined(storageTargets) || NG.ObjectUtil.isUndefined(storageNum)){
                            console.error("不明原因，zj_laobo的标记变量没有生成！");
                            event.finish();
                            return;
                        }
                        'step 1'
                        //将任意数量的手牌交给任意角色(至少1张)
                        //选择角色和交给的牌
                        if(haveHandCard){
                            player.chooseCardTarget({
                                filterCard:true,
                                selectCard:[1,Infinity],
                                filterTarget: (card: Card, player: Player, target: Target) => {
                                    return player != target; //目标不能是自己
                                },
                                prompt:"选择要交给牌与玩家",
                                forced:true
                            });
                        } else {
                            event.finish();
                        }
                        'step 2'
                        if(result.bool){
                            storageTargets.push(target);
                            // target.gain(cards,player);
                            result.targets[0].gain(result.cards, player,"gain");
                            player.storage.zj_laobo_num += result.cards.length;
                        }
                        'step 3'
                        if (haveHandCard){ //为了能及时刷新手牌数另开一个步骤
                            event.goto(1);
                        }
                        'step 4'
                        //你摸X张牌且血量+1(X为你已损失的血量)
                        let loseHp = player.maxHp - player.hp;
                        player.draw(loseHp);
                        player.recover(1);
                        //若其获得你给出的牌张数不小于2
                        if(storageNum >=2){
                            let list = [];
                            if(player.canUse({name:"tao"},player)){ //是否能用血
                                list.push("tao");
                            }
                            if(player.canUse({name:"jiu"},player)){ //是否能用魔
                                list.push("jiu");
                            }
                            if(list.length){
                                player.chooseButton([
                                    "是否视为视为对你使用一张【血】或【魔】？",
                                    [list,NG.ButtonType.VCARD]
                                ]);
                            } else {
                                event.finish();
                            }
                        } 
                        'step 5'
                        //你可以视为对你使用一张【血】或【魔】
                        if (result && result.bool && result.links[0]) {
                            let vard = { name: result.links[0][2], nature: result.links[0][3] };
                            player.chooseUseTarget(vard, true);
                        }
                    },
                    contentAfter: function (event: GameEvent, step: number, source: Player, player: Player, target: Player, targets: Player[], card: Card, cards: Card[], skill: string, forced: boolean, num: number, trigger: GameEvent, result: BaseResultData) {
                        //移除标记
                        delete player.storage.zj_laobo_targets;
                        delete player.storage.zj_laobo_num;
                    }
                },
                zj_bosen:{
                    name: "博森",
                    group: ["zj_bosen_zj_bosen_1", "zj_bosen_zj_bosen_2"],
                    subSkill:{
                        zj_bosen_1:{
                            trigger:{
                                player:[
                                    NG.StateTrigger.loseHp + NG.TriggerEnum.End,
                                    NG.StateTrigger.damage + NG.TriggerEnum.End,
                                ]
                            },
                            filter: function (event: Trigger, player: Player) {
                                window.gameTestLog("filter触发",event);
                                return event.num>0;
                            },
                            //设置强制触发的话，不受条件影响
                            forced:true,
                            content: function (event: GameEvent, step: number, source: Player, player: Player, target: Player, targets: Player[], card: Card, cards: Card[], skill: string, forced: boolean, num: number, trigger: GameEvent, result: BaseResultData){
                                "step 0"
                                player.storage.zj_bosen_1_flag = trigger.num;
                                "step 1"
                                //不能同时选择同一个玩家
                                // player.chooseTarget(
                                //     trigger.num,
                                //     `请选择${trigger.num}位玩家`
                                // );
                                player.chooseTarget(lib.translate.zj_bosen_zj_bosen_1_info);
                                "step 2"
                                // window.gameTestLog("当前还剩次数", player.storage.zj_bosen_1_flag);
                                //指定失去得体力数得玩家抽牌
                                if(result.bool && result.targets.length>0){
                                    result.targets[0].draw(2);
                                }
                                player.storage.zj_bosen_1_flag--;
                                if (player.storage.zj_bosen_1_flag > 0) {
                                    event.goto(1);
                                }
                                // window.gameTestLog("zj_bosen_zj_bosen_1触发时：", _status.event);
                                "step 3"
                                delete player.storage.zj_bosen_1_flag;
                            },
                            description:"当你除去1点血量后，你令任一角色摸两张牌"
                        },
                        zj_bosen_2:{
                            trigger:{
                                player:NG.StateTrigger.die+NG.TriggerEnum.Begin
                            },
                            content: function (event: GameEvent, player: Player, trigger: GameEvent, result: BaseResultData){
                                "step 0"
                                player.chooseTarget(
                                    lib.translate.zj_bosen_zj_bosen_2_info,
                                );
                                "step 1"
                                if(result.bool && result.targets.length>0){
                                    //获取玩家所有的牌：
                                    result.targets[0].gain(player.getCards(NG.PositionType.All),player);
                                    result.targets[0].gainMaxHp(1);
                                }
                            },
                            description:"当你死亡时，你可以将你的所有牌交给任一其他角色，然后令其血量+1"
                        }
                    }
                },
                zj_ganglie:{
                    name:"肛裂",
                    trigger:{
                        player:NG.StateTrigger.damage+NG.TriggerEnum.End,
                    },
                    filter: function (event: Trigger, player: Player){
                        //必须要有伤害来源，必须产生大于1点的伤害
                        return event.source && event.num>0;
                    },
                    logTarget:"source",//骚后仔细研究该作用
                    content: function (event: GameEvent, player: Player, trigger: GameEvent, result: BaseResultData){
                        "step 0"
                        //第一步，初始化好需要使用的变量
                        event.num = trigger.num; //如果是技能执行过程中需要某些临时变量，在执行完就不用了，可以直接设置在content中的event上
                        "step 1"
                        //当你受到1点伤害后，你可以进行一次判定
                        player.judge((jResult:JudgeResultData)=>{
                            // window.gameTestLog("肛裂判定结果",jResult);
                            return jResult.color == NG.CardColor.Black?1:0;
                        });
                        "step 2"
                        // let jResult = <JudgeResultData>result;
                        //若判定结果为黑色牌，你选择一项：(1)令其弃置两张手牌；(2)你对其造成的1点伤害。
                        if(result.bool){
                            player.chooseControlList(
                                [
                                    "(1)令其弃置两张手牌",
                                    "(2)你对其造成的1点伤害"
                                ],
                                true
                            );
                        } else {
                            event.goto(4);
                        }
                        "step 3"
                        //触发所选效果
                        if(result.index == 0){
                            trigger.source.discard(2);
                        } else {
                            trigger.source.damage(1);
                        }
                        "step 4"
                        event.num--;
                        if(event.num>0) {
                            //询问继续肛裂不
                            player.chooseBool(get.prompt2("zj_ganglie"));
                        } else {
                            event.finish();
                        }
                        "step 5"
                        if(result.bool){
                            event.goto(1);//继续
                        }
                    }
                },
                zj_huafu:{
                    name:"华富",
                    enable:NG.EnableTrigger.phaseUse,
                    // subSkill:{
                    //     famian: { //当你的角色牌被翻面时，你可以摸等同于你已损失的血量的牌(至少1张)。
                    //     }
                    // }
                    filter: function (event: Trigger, player: Player){
                        return player.hasCard(lib.filter.all,NG.PositionType.Shoupai);
                    },
                    content: function (event: GameEvent, player: Player, trigger: GameEvent, result: BaseResultData){
                        "step 0"
                        //计算手牌数：
                        let shoupaiCount = player.countCards(NG.PositionType.Handcard);
                        let discardCount = 1;
                        if(shoupaiCount>=10){
                            discardCount = shoupaiCount-10;
                        }

                    },
                    //通过主动技跳过弃牌阶段的解决方案：
                    //1.在使用技能时，增加一个标记在玩家身上，在弃牌阶段之前触发一个子技能，根据标记跳过trigger.cancel();
                    //2.动态添加一个跳过阶段的技能
                },

                
                //通用阶段技能
                zj_skip_Judge:{
                    trigger:{
                        player:NG.PhaseTrigger.judge+NG.TriggerEnum.Before
                    },
                    forced:true,
                    content: function (event: GameEvent, player: Player, trigger: GameEvent, result: BaseResultData){
                        trigger.cancel();
                    }
                },
                zj_skip_PhaseDraw:{
                    trigger:{
                        player:NG.PhaseTrigger.phaseDraw+NG.TriggerEnum.Before
                    },
                    forced:true,
                    content: function (event: GameEvent, player: Player, trigger: GameEvent, result: BaseResultData){
                        trigger.cancel();
                    }
                },
                zj_skip_PhaseUse:{
                    trigger:{
                        player:NG.PhaseTrigger.phaseUse+NG.TriggerEnum.Before
                    },
                    forced:true,
                    content: function (event: GameEvent, player: Player, trigger: GameEvent, result: BaseResultData){
                        trigger.cancel();
                    }
                },
                zj_skip_PhaseDiscard:{
                    trigger:{
                        player:NG.PhaseTrigger.phaseDiscard+NG.TriggerEnum.Before
                    },
                    forced:true,
                    content: function (event: GameEvent, player: Player, trigger: GameEvent, result: BaseResultData){
                        trigger.cancel();
                    }
                },
                zj_skip_Phase:{
                    trigger:{
                        player:NG.PhaseTrigger.phase+NG.TriggerEnum.Before
                    },
                    forced:true,
                    content: function (event: GameEvent, player: Player, trigger: GameEvent, result: BaseResultData){
                        // player.phaseSkipped = true;
                        //跳过回合好像需要自己手动进行计数（稍后研究跳过回合的方式）
                    }
                },
            },
            translate: {
                zjm01_yangjuebo:"杨爵波",
                zj_laobo:"捞波",
                zj_laobo_info:"阶段技，你可以将任意数量的手牌交给任意角色(至少1张)，你摸X张牌且血量+1，若其获得你给出的牌张数不小于2，你可以视为对你使用一张【血】或【魔】(X为你已损失的血量)。",
                zjm01_zhengbosen:"郑博森",
                zj_bosen:"博森",
                zj_bosen_info:"锁定技，当你除去1点血量后，你令任一角色摸两张牌；当你死亡时，你可以将你的所有牌交给任一其他角色，然后令其血量+1。",
                zjm01_huanghuafu:"黄华富",
                zj_ganglie:"肛裂",
                zj_ganglie_info:"当你受到1点伤害后，你可以进行一次判定，若判定结果为黑色牌，你选择一项：(1)令其弃置两张手牌；(2)你对其造成的1点伤害。",
                zj_huafu:"华富",
                zj_huafu_info:"你可以弃置X张手牌令你的手牌数不大于10（X至少为1），然后跳过你的弃牌阶段，将你的角色牌翻面；当你的角色牌被翻面时，你可以摸等同于你已损失的血量的牌(至少1张)。",
                
                
                zj_skip_Judge:"判定阶段",
                zj_skip_Judge_info:"跳过玩家判定阶段",
                zj_skip_PhaseDraw:"抽牌阶段",
                zj_skip_PhaseDraw_info:"跳过玩家抽牌阶段",
                zj_skip_PhaseUse:"出牌阶段",
                zj_skip_PhaseUse_info:"跳过玩家出牌阶段",
                zj_skip_PhaseDiscard:"弃牌阶段",
                zj_skip_PhaseDiscard_info:"跳过玩家弃牌阶段",
                zj_skip_Phase:"当前回合",
                zj_skip_Phase_info:"跳过玩家当前回合",
            }
        };
        //技能
        let skills: ExSkillConifgData = {
            // name: "ZJShaSkill",
            skill: {
                
            },
            translate: {

            }
        };
        //卡牌
        let cards: CardHolderConfigData = {
            // name: "ZJShaCard",
            // connect: true,
            card: {

            },
            skill: {

            },
            list: [],
            translate: {

            }
        };
        //extension扩展数据
        let extensionData: ExtensionInfoConfigData = {
            name: "ZJ_Sha",
            editable: true,
            //选项
            config: {
                start_wuxing:{
                    name:"启用五行属性",
                    init:true,
                    intro:"将”魏蜀吴群神“变为”水火木土金“",
                    frequent:true,
                    // onclick:(item)=>{
                    //     console.log("点击后输出的结果为：",item);
                    // }
                    onclick: updateWuxingName
                },
                start_wuxingSkill:{
                    name:"启用五行属性主公技",
                    init:true,
                    intro:"在身份局中，不同属性的身份会拥有不同的主公技",
                    frequent:true,
                    onclick:(item)=>{
                        console.log("点击后输出的结果为111：",item);
                    }
                }
            },
            precontent: function (data: SMap<any>){
                //若需要联机，请将下面package的扩展，移动到这里，在源码中加入
                //（因为正常导入时，需要!_status.connectMode结果为true时，才能导入该扩展）
            },
            content: function (config: SMap<any>, pack: PackageData){
                // console.log("检测默认选项：",config,pack);
                if (config.start_wuxing){
                    updateWuxingName(true);
                }
            },
            //删除扩展时
            onremove:function(){
    
            },
            package: {
                author: "神雷zero",
                intro: "ZJ联盟杀",
                version: "1.0.0",

                character: heros,
                skill: skills,
                card: cards,
            },
            translate: {
                ZJ_Sha:"ZJ联盟杀",
            },
            help:{
                ZJ联盟杀: NG.Utils.createHelp([
                    "先测试下1",
                    "先测试下2",
                    ["先测试下2.1", "先测试下2.2"],
                    "先测试下3",
                    "先测试下4",
                    ["先测试下4.1", "先测试下4.2"]
                ])
            }
            
        };

        return extensionData;
    }

    //选项得方法实现
    /**
     * 将”魏蜀吴群神“变为”水火木土金“
     * @param bool 
     */
    function updateWuxingName(bool:boolean){
        //目前还暂时做不到独立显示，独立该包才显示得势力，需要自己独立造势力，或者修改源代码；
        //独立造势力，也要修改源代码，ui相关的，具体后面详细了解ui后再看看
        if(bool){
            lib.translate.wei = "水";
            lib.translate.shu = "火";
            lib.translate.wu = "木";
            lib.translate.qun = "土";
            lib.translate.shen = "金";
        } else {
            lib.translate.wei = "魏";
            lib.translate.shu = "蜀";
            lib.translate.wu = "吴";
            lib.translate.qun = "群";
            lib.translate.shen = "神";
        }
    }

    /**
     * 在身份局中，不同属性的身份会拥有不同的主公技
     * 
     * 启用后，会添加一个对应主公属性的全局技能，再选主公后，或者游戏开始后生效
     * @param bool 
     */
    function updateWuxingSkill(bool:boolean){

    }
}

//执行导入扩展
game.import(ZJNGEx.type, ZJNGEx.extensionFun);

// namespace NG {
//     /**
//      * 游戏内常用工具
//      */
//     export class Utils {
//         /**
//          * 创建帮助文本
//          * @param content 
//          * @param type 
//          */
//         public static createHelp(content:any[],type?:number|string){
//             // "帮助条目": "<ul><li>列表1-条目1<li>列表1-条目2</ul><ol><li>列表2-条目1<li>列表2-条目2</ul>" 
//             let str = "";
//             let itemTag = ""
//             for (let index = 0; index < content.length; index++) {
//                 let element = content[index];
//                 if (ObjectUtil.isString(element)) {
//                     let [text, curType] = [element,type?type:"0"];
//                     // if(element.indexOf("|")> -1) {
//                     //     [text,curType] = element.split(",");
//                     // }
//                     switch(curType){
//                         case "0"://序号1，2，3
//                             itemTag = "ol";
//                             break;
//                         case "1"://点
//                             itemTag = "ul";
//                             break;
                        
//                     }
//                     //后期采用#{xxxxxx}文本来指定特殊格式
//                     str+=`<li>${text}</li>`;
//                 } else if (ObjectUtil.isArray(element)) {
//                     (<Array<any>>element).forEach((value,index,array)=>{
//                         this.createHelp(value,1);
//                     });
//                 }
//             }
//             str = `<${itemTag}>${str}</${itemTag}>`;
//             return str;
//         }

//         /**
//          * 使用 #xxxx 标记替换文本（日后再使用）
//          * @param desc 
//          */
//         public static getDesc(desc: string): string{
//             desc = desc.replace(/\#\{[a-zA-Z]+\}/g, (sub) => {
//                 switch (sub) {
//                     case "${content}":
//                         return "";
//                 }
//                 return sub;
//             })
//             return desc;
//         }
        
//     }

//     /**
//      * 对象工具，copy过来
//      */
//     export class ObjectUtil {
//         /**
//          * 搜索对象中是否包含一个属性
//          * @param obj
//          * @param member
//          * @returns {boolean}
//          */
//         public static contains(obj: any, member: any): boolean {
//             for (var prop in obj) {
//                 if (obj.hasOwnProperty(prop) && obj[prop] == member) {
//                     return true;
//                 }
//             }
//             return false;
//         }

//         /**
//          * @description 深拷贝对象
//          * @returns Object
//          */
//         public static deepClone(obj: Object, isDeep: boolean = true): Object {
//             if (!obj || typeof obj !== 'object') {
//                 throw new Error("error type");
//             }

//             var targetObj = obj.constructor === Array ? [] : {};
//             for (var keys in obj) {
//                 if (obj.hasOwnProperty(keys)) {
//                     if (obj[keys] && typeof obj[keys] === 'object' && isDeep) {
//                         targetObj[keys] = obj[keys].constructor === Array ? [] : {};
//                         targetObj[keys] = this.deepClone(obj[keys], isDeep);
//                     } else {
//                         targetObj[keys] = obj[keys];
//                     }
//                 }
//             }
//             return targetObj;
//         }


//         /**
//          * 克隆数据，可深度克隆
//          * 这里列出了原始类型，时间、正则、错误、数组、对象的克隆规则，其他的可自行补充
//          */
//         public static clone(value, deep) {
//             if (this.isPrimitive(value)) {
//                 return value;
//             }

//             if (this.isArrayLike(value)) { //是类数组
//                 value = Array.prototype.slice.call(value);
//                 return value.map(item => deep ? this.clone(item, deep) : item);
//             } else if (this.isPlainObject(value)) { //是对象
//                 let target = {}, key;
//                 for (key in value) {
//                     value.hasOwnProperty(key) && (target[key] = deep ? this.clone(value[key], deep) : value[key]);
//                 }
//             }

//             let type = this.getRawType(value);

//             switch (type) {
//                 case 'Date':
//                 case 'RegExp':
//                 case 'Error': value = new Window[type](value); break;
//             }
//             return value;
//         }

//         /**
//          * 数组克隆
//          * @param obj
//          * @param deep
//          * @returns {Array<any>}
//          */
//         public static arrayClone(obj: Array<any>, deep: boolean = false): Array<any> {
//             var buf: Array<any> = [];
//             var i = obj.length;
//             while (i--) {
//                 buf[i] = deep ? arguments.callee(obj[i]) : obj[i];
//             }
//             return buf;
//         }

//         /**
//          * 获取对象所有键存成数组
//          * @param obj
//          * @returns {Array<any>}
//          */
//         public static getKeys(obj: any): Array<any> {
//             var keys: Array<any> = [];
//             for (var i in obj)
//                 if (obj.hasOwnProperty(i))
//                     keys.push(i);
//             return keys;
//         }

//         /**
//          * 检测数据是不是除了symbol外的原始数据
//          */
//         public static isStatic(value) {
//             return (
//                 typeof value === 'string' ||
//                 typeof value === 'number' ||
//                 typeof value === 'boolean' ||
//                 typeof value === 'undefined' ||
//                 value === null
//             )
//         }

//         /**
//          * 检测数据是不是原始数据
//          */
//         public static isPrimitive(value) {
//             return this.isStatic(value) || typeof value === 'symbol';//synbol,是es6新增的一个特殊属性
//         }

//         /**
//          * 检查 value 是否是类数组
//          * 如果一个值被认为是类数组，那么它不是一个函数，并且value.length是个整数，大于等于 0，小于或等于 Number.MAX_SAFE_INTEGER。这里字符串也将被当作类数组
//          */
//         public static isArrayLike(value) {
//             return value != null && this.isLength(value.length) && !this.isFunction(value);
//         }

//         /**
//          * 检查 value 是否为有效的类数组长度
//          */
//         public static isLength(value) {
//             return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= Number.MAX_SAFE_INTEGER;
//         }

//         /**
//          * 判断一个对象是否包含一个特定的方法
//          * @param obj
//          * @param methodName
//          * @returns {boolean}
//          */
//         public static isMethod(obj: any, methodName: string): boolean {
//             if (obj.hasOwnProperty(methodName))
//                 return obj[methodName] instanceof Function;
//             return false;
//         }

//         /**
//          * 对象是否未定义
//          * @param obj
//          * @returns {boolean}
//          */
//         public static isUndefined(obj: any): boolean {
//             return this.isNull(obj) || obj === undefined || typeof obj === 'undefined';
//         }

//         /**
//          * 对象是否为null
//          * @param obj
//          * @returns {boolean}
//          */
//         public static isNull(obj: any): boolean {
//             //todo 运算符“==”不能应用于类型““string”“number”“boolean”“symbol”“undefined”“object”“function””和““null”。
//             //第一种：(Number(null) === 0 && obj !== 0) //也可以通过这种方式判断，Number(null) = 0，Number(undefined) = NaN
//             //第二种：obj == null && typeof obj === "object"
//             //第三种：Object.prototype.toString.call(obj) == "[object Null]"
//             return obj === null;
//         }

//         /**
//          * 判断对象是否为空: 0,[],"",{}
//          * @param obj
//          * @returns {boolean}
//          */
//         public static isEmpty(obj: any): boolean {
//             if (obj == undefined)
//                 return true;

//             if (typeof (obj) == "number")
//                 return isNaN(obj) || obj == 0;

//             if (obj instanceof Array || typeof (obj) == "string")
//                 return obj.length == 0;

//             if (obj instanceof Object) {
//                 for (var prop in obj)
//                     if (obj.hasOwnProperty(prop))
//                         return false;
//                 return true;
//             }

//             return false;
//         }

//         /**
//          * 判断数据是不是引用类型的数据 
//          * (例如： arrays, functions, objects, regexes, new Number(0),以及 new String(''))
//          */
//         public static isObject(value) {
//             let type = typeof value;
//             return value != null && (type == 'object' || type == 'function');
//         }

//         /**
//          * 获取数据类型，
//          * 返回结果为 Number、String、Object、Array
//          */
//         public static getRawType(value) {
//             return Object.prototype.toString.call(value).slice(8, -1);
//         }

//         /**
//          * 判断数据是不是普通Object类型的数据
//          * 注：Array,Date,RegExp,Function非普通对象
//          */
//         public static isPlainObject(obj) {
//             return Object.prototype.toString.call(obj) === '[object Object]'
//         }

//         /**
//          * 判断数据是不是正则对象
//          */
//         public static isRegExp(value) {
//             return Object.prototype.toString.call(value) === '[object RegExp]'
//         }

//         /**
//          * 判断数据是不是时间对象
//          */
//         public static isDate(value) {
//             return Object.prototype.toString.call(value) === '[object Date]'
//         }

//         /** 
//          * 判断数据是不是数组类型的数据
//          */
//         public static isArray(arr) {
//             return Object.prototype.toString.call(arr) === '[object Array]'
//         }

//         /**
//          * 判断是否是数字
//          * @param value 
//          */
//         public static isNumber(value) {
//             return typeof value == "number" || (!isNaN(value) && !this.isNaN2(value));
//         }

//         /**
//          * 判断是否时NaN,在js定义中，NaN时不等于自身
//          */
//         public static isNaN2(value) {
//             return value != value;
//         }

//         /**
//          * 判断是否是字符串
//          * @param value 
//          */
//         public static isString(value) {
//             return typeof value == "string" || Object.prototype.toString.call(value) == "[object String]";
//         }

//         /** 
//          * 检查 value 是不是函数
//          */
//         public static isFunction(value) {
//             return Object.prototype.toString.call(value) === '[object Function]'
//         }

//         /**
//          * 判断 value 是不是浏览器内置函数：
//          * 内置函数toString后的主体代码块为 [native code] ，而非内置函数则为相关代码，所以非内置函数可以进行拷贝(toString后掐头去尾再由Function转)
//          */
//         public static isNative(value) {
//             return typeof value === 'function' && /native code/.test(value.toString());
//         }

//         /**
//          * 将属性复制到目标对象上
//          */
//         public static extend(to, _from) {
//             for (let key in _from) {
//                 to[key] = _from[key];
//             }
//             return to;
//         }

//         /** 获取对象的类名 */
//         public static getClassName(obj): string {
//             //__proto__这个虽然现在流浪器大部分都支持，但是不建议使用，而且标准也只支持流浪器支持
//             if (obj.__proto__ && obj.__proto__.constructor) {
//                 return obj.__proto__.constructor.name;
//             } else if (Object.getPrototypeOf(obj) && Object.getPrototypeOf(obj).constructor) { //一般使用Object的方式获取prototype
//                 return Object.getPrototypeOf(obj).constructor.name;
//             } else {
//                 throw "不支持__proto__.constructor 或者没有 prototype";
//             }
//         }

//         /** 获取对象的类 */
//         public static getClass(obj) {
//             if (obj.__proto__ && obj.__proto__.constructor) {
//                 return obj.__proto__.constructor;
//             } else if (Object.getPrototypeOf(obj) && Object.getPrototypeOf(obj).constructor) {
//                 return Object.getPrototypeOf(obj).constructor;
//             } else {
//                 throw "不支持__proto__.constructor 或者没有 prototype";
//             }
//         }

//     }

//     /**
//      * 数学工具
//      */
//     export class MathUtil {
//         /**
//          * 获取某个区间的随机数
//          */
//         public static getLimitRandom(min: number, max: number, type: number = 0) {
//             switch (type) {
//                 case 1://如果想获得 [min, max）
//                     return Math.floor(Math.random() * (max - min)) + min;;
//                 case 2://如果想获得 (min, max]
//                     return Math.ceil(Math.random() * (max - min)) + min;;
//                 case 0: // 如果想获得 [min, max]
//                 default:
//                     return Math.floor(Math.random() * (max - min + 1)) + min;
//             }
//         }

//         /**
//          * 值映射
//          * value:
//          * start,end:value值的范围
//          * targetStart，targetEnd：要映射的目标的范围
//          * 
//          * 返回：返回映射目标范围内对应的映射值
//          */
//         public static map(value: number, start: number, end: number, targetStart: number, targetEnd: number) {
//             return ((end - start) / (value - start)) * (targetEnd - targetStart) + targetStart;
//         }

//         /**
//          * 获得两个值中线性插值
//          * start：开始的点
//          * end:结束的点
//          * amt：参数为两个值之间的插值量，0.0 为第一个值，0.1 为非常接近第一个值，0.5 为两者之间，1为最后一个值等等。
//          */
//         public static lerp(start: number, end: number, amt: number) {
//             return start + (end - start) * amt;
//         }
//     }

//     /**
//      * 字符串工具
//      */
//     class StringUtil {
//         /**
//          * 多级分割字符串
//          * @str 目标字符串
//          * @separators 分割符数组
//          */
//         public static multiSplit(str: string, separators: string[], Split: boolean = false): any[] {
//             function split2(strs: any[], separators: string[], separatorIndex): any[] {
//                 let separator = separators[separatorIndex];
//                 if (separator && strs) {
//                     for (let i in strs) {
//                         let stra = strs[i];
//                         if (stra == "") {
//                             delete strs[i];
//                             strs.length = strs.length - 1;
//                             continue
//                         }
//                         if (stra == separator) {
//                             strs[i] = []
//                         }
//                         if (stra.indexOf(separator) >= 0) {
//                             strs[i] = split2(stra.split(separator), separators, separatorIndex + 1);
//                         } else {
//                             if (Split) {
//                                 strs[i] = split2([stra], separators, separatorIndex + 1)
//                             }
//                         }
//                     }
//                 }
//                 return strs
//             }
//             if (str) {
//                 let r = split2([str], separators, 0)[0]
//                 if (r == str) {
//                     return [r]
//                 } else {
//                     return r
//                 }
//             } else {
//                 return []
//             }

//         }

//         /**
// 		 * 格式化替换字符串里面的$符号 
// 		 * @param str 要替换的字符串
//          * @param params 替换字符串中$标志的参数列表
//          * @return 
// 		 * 
// 		 */
//         public static format(str: string, ...params): string {
//             var index: number = str.indexOf("$");
//             while (index != -1 && params.length > 0) {
//                 str = str.substring(0, index) + params.shift() + str.substring(index + 1);
//                 index = str.indexOf("$");
//             }
//             return str;
//         }


//         /**
//          * 格式化时间
//          * formater 格式：yyyy/yy年，MM月，DD日，hh时，mm分，ss秒例:YYYY-MM-DD HH:mm,YYYYMMDDHHmm
//          * t:时间，可以是毫秒，可以时间格式字符串
//          */
//         public static dateFormater(formater: string, t) {
//             let date = t ? new Date(t) : new Date(),
//                 Y = date.getFullYear() + '',
//                 M = date.getMonth() + 1,
//                 D = date.getDate(),
//                 H = date.getHours(),
//                 m = date.getMinutes(),
//                 s = date.getSeconds();
//             return formater.replace(/YYYY|yyyy/g, Y)
//                 .replace(/YY|yy/g, Y.substr(2, 2))
//                 .replace(/MM/g, (M < 10 ? '0' : '') + M)
//                 .replace(/DD/g, (D < 10 ? '0' : '') + D)
//                 .replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
//                 .replace(/mm/g, (m < 10 ? '0' : '') + m)
//                 .replace(/ss/g, (s < 10 ? '0' : '') + s)
//         }

//         /**
//          * 将指定字符串由一种时间格式转化为另一种
//          * 
//          * 例：
//          * // dateStrForma('20190626', 'YYYYMMDD', 'YYYY年MM月DD日') ==> 2019年06月26日
//             // dateStrForma('121220190626', '----YYYYMMDD', 'YYYY年MM月DD日') ==> 2019年06月26日
//             // dateStrForma('2019年06月26日', 'YYYY年MM月DD日', 'YYYYMMDD') ==> 20190626
//         */
//             public static dateStrForma(str, from, to) {
//             //'20190626' 'YYYYMMDD' 'YYYY年MM月DD日'
//             str += ''
//             let Y = ''
//             if (~(Y = from.indexOf('YYYY'))) {
//                 Y = str.substr(Y, 4)
//                 to = to.replace(/YYYY|yyyy/g, Y)
//             } else if (~(Y = from.indexOf('YY'))) {
//                 Y = str.substr(Y, 2)
//                 to = to.replace(/YY|yy/g, Y)
//             }

//             let k, i
//             ['M', 'D', 'H', 'h', 'm', 's'].forEach(s => {
//                 i = from.indexOf(s + s)
//                 k = ~i ? str.substr(i, 2) : ''
//                 to = to.replace(s + s, k)
//             })
//             return to;
//         }
//     }
// }

