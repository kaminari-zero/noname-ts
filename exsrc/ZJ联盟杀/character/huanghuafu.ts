module ZJNGEx {

    export let Huanghuafu: DevCharacterData = {
        name: "huanghuafu",
        nickName:"黄华富",
        character:[NG.Sex.MALE, NG.Group.WATER, 4, ["zj_ganglie"],[]],
        characterTitle: "",
        characterIntro:"",
        skill: {
            zj_ganglie:{
                name:"肛裂",
                description:"当你受到1点伤害后，你可以进行一次判定，若判定结果为黑色牌，你选择一项：(1)令其弃置两张手牌；(2)你对其造成的1点伤害。",
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
                description:"你可以弃置X张手牌令你的手牌数不大于10（X至少为1），然后跳过你的弃牌阶段，将你的角色牌翻面；当你的角色牌被翻面时，你可以摸等同于你已损失的血量的牌(至少1张)。",
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
        },
        // translate: {
        //     zjm01_huanghuafu:"黄华富",
        //     zj_ganglie:"肛裂",
        //     zj_ganglie_info:"当你受到1点伤害后，你可以进行一次判定，若判定结果为黑色牌，你选择一项：(1)令其弃置两张手牌；(2)你对其造成的1点伤害。",
        //     zj_huafu:"华富",
        //     zj_huafu_info:"你可以弃置X张手牌令你的手牌数不大于10（X至少为1），然后跳过你的弃牌阶段，将你的角色牌翻面；当你的角色牌被翻面时，你可以摸等同于你已损失的血量的牌(至少1张)。",
        // },


    };

}