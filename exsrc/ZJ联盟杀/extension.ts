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
