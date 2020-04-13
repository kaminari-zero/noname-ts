module ZJNGEx {
    (function(){
        NG.Utils.importCurContent(this.ZJNGEx,"Zhengbosen",NG.ImportFumType.hero,
        
        function(lib: Lib, game: Game, ui: UI, get: Get, ai: AI, _status: Status) {
            
            let Zhengbosen: DevCharacterData = {
                name:"zhengbosen",
                nickName:"郑博森",
                character:  [NG.Sex.MALE, NG.Group.WOOD, 4, ["zj_bosen"],[]],
                characterTitle: "老鬼",
                characterIntro:"",
                skill: {
                    zj_bosen:{
                        name: "博森",
                        description:"锁定技，当你除去1点血量后，你令任一角色摸两张牌；当你死亡时，你可以将你的所有牌交给任一其他角色，然后令其血量+1。",
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
                                    // player.chooseTarget(lib.translate.zj_bosen_zj_bosen_1_info);
                                    player.chooseTarget(lib.skill.zj_bosen_1.description);
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
                },
                // translate: {
                //     zjm01_zhengbosen:"测试人物2",
                //     zj_bosen:"博森",
                //     zj_bosen_info:"锁定技，当你除去1点血量后，你令任一角色摸两张牌；当你死亡时，你可以将你的所有牌交给任一其他角色，然后令其血量+1。",
                // }
            };
    
            return Zhengbosen;
        });
    })();
}