module ZJNGEx {
    (function () {
        NG.Utils.importCurContent(this.ZJNGEx, "测试技能组2", NG.ImportFumType.skill,

            function (lib: Lib, game: Game, ui: UI, get: Get, ai: AI, _status: Status) {

                //炼狱   【被动技】  [自][反面]，[自][翻面][自]视为对[他]使用一张《杀》。
                let skill1: ExSkillData = {
                    name:"炼狱",
                    description:"",//
                    //【被动技】  [自][反面]
                    trigger: {
                        player: NG.StateTrigger.turnOver+NG.TriggerEnum.End,
                    },
                    //[反面]
                    filter: function (event: Trigger, player: Player) {
                        console.log(`炼狱发动过滤是的翻面状态：${player.isTurnedOver()?"翻面":"翻回正面"}`);
                        return player.isTurnedOver();
                    },
                    //[自][翻面][自]视为对[他]使用一张《杀》。
                    content: function (event: GameEvent, player: Player, trigger: GameEvent, result: BaseResultData) {
                        "step 0"
                        //[自][翻面]
                        player.turnOver(!player.isTurnedOver());
                        "step 1"
                        //[自]视为对[他]
                        player.chooseTarget(
                            1,
                            true,
                            function(card: Card, player: Player, target: Target){
                                return target != player;
                            },
                            `选择一名其他角色，视为对其使用一张《${lib.translate[NG.CardNameConst.sha]}》`
                        );
                        "step 2"
                        //视为对[他]使用一张《杀》。
                        if(result && result.bool) {
                            let target = (<BaseCommonResultData>result).targets[0];
                            if(target) {
                                player.useCard({name:NG.CardNameConst.sha,isCard:true},target,false);
                            }
                        }
                    }
                };


                //华富   【阶段技】  [自]弃置X张手牌令手牌数为≤10（X至少为1），[自]须跳过<弃牌>，[自][翻面]。
                let skill2:ExSkillData = {
                    name:"新华富测试",
                    enable:NG.EnableTrigger.phaseUse,
                    filter:function(event: Trigger, player: Player){
                        return player.countCards(NG.PositionType.Handcard)>0;
                    },
                    content:function(event: GameEvent, player: Player, trigger: GameEvent, result: BaseResultData) {
                        "step 0"
                        //[自]弃置X张手牌令手牌数为≤10（X至少为1）
                        var hCount = player.countCards(NG.PositionType.Handcard);
                        var minCount = hCount>=10?1:hCount-10;
                        player.chooseToDiscard([minCount,hCount],NG.PositionType.Handcard);
                        "step 1"
                        //[自]须跳过<弃牌>，[自][翻面]
                        if(result && result.bool) {
                            //跳过<弃牌>
                            player.addTempSkill("zj_skip_PhaseDiscard");
                            //[自][翻面]
                            player.turnOver(true);
                        }
                    }
                };

                //佛门   【被动技】  [自]手牌上限+X(X=现存[佛]数+1)。
                let skill3:ExSkillData = {
                    name:"新佛门测试",

                    //实际上为锁定技
                    mod:{
                        //手牌上限+X(X=现存[佛]数+1)
                        maxHandcard:function(player: Player, num: number){ 
                            //(X=现存[佛]数+1),目前还没开始做势力标记
                            return num+get.getZJShaShiliCount(ZJNGEx.ZJShaGroupConst.fo); 
                        },
                    },
                };

                //间反   【阶段技】  [自]展示一张手牌并交给[他]，其选择一项：(1)其展示所有手牌并弃置与此牌花色相同的所有牌；(2)其除去1点血量。
                let skill4:ExSkillData = {
                    enable:NG.EnableTrigger.phaseUse,
                    filter:function(event,player) {
                        return player.countCards(NG.PositionType.Handcard)>0;
                    },
                    content:function(event: GameEvent, player: Player, trigger: GameEvent, result: BaseCommonResultData){
                        "step 0"
                        player.chooseCard();
                        "step 1"
                        if(result) {
                            
                        }
                    }
                };

                //通用技能：时机gameStart,属性主公技，血量上限变血槽技，势力标记

                let output = {
                    test_skill1:skill1,
                }
                
                return output;
            });
    })();
}