module ZJNGEx {
    (function(){
        NG.Utils.importCurContent(this.ZJNGEx,"Yangjuebo",NG.ImportFumType.none,
        
        function(lib: Lib, game: Game, ui: UI, get: Get, ai: AI, _status: Status) {
            let Yangjuebo: DevCharacterData = { 
                name:"yangjuebo",
                nickName:"杨爵波",
                character:  [NG.Sex.MALE, NG.Group.WOOD, 5, ["zj_laobo"],[]],
                characterTitle:"盟主捞波",
                characterIntro:"",
                skill:{
                    zj_laobo:{
                        name:"捞波",
                        description:"阶段技，你可以将任意数量的手牌交给任意角色(至少1张)，你摸X张牌且血量+1，若其获得你给出的牌张数不小于2，你可以视为对你使用一张【血】或【魔】(X为你已损失的血量)。",
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
                                // event.finish();
                                event.goto(4);
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
                                // event.goto(1);
                                // console.log("当前的skill:",skill)
                                player.chooseBool(`是否继续使用【${lib.translate["zj_laobo"]}】？`);
                            }
                            'step 4'
                            if(result.bool) {
                                event.goto(1);
                            }
                            'step 5'
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
                            'step 6'
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
                },
        
                // translate: {
                //     zjm01_yangjuebo:"测试人物1",
                //     zj_laobo:"捞波",
                //     zj_laobo_info:"阶段技，你可以将任意数量的手牌交给任意角色(至少1张)，你摸X张牌且血量+1，若其获得你给出的牌张数不小于2，你可以视为对你使用一张【血】或【魔】(X为你已损失的血量)。",
                // }
            }

            return Yangjuebo;
        });
    })();
}