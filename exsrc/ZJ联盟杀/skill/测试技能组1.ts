module ZJNGEx {
    (function () {
        NG.Utils.importCurContent(this.ZJNGEx, "测试技能组1", NG.ImportFumType.skill,

            function (lib: Lib, game: Game, ui: UI, get: Get, ai: AI, _status: Status) {

                //天使  【主动技】  [自]使用一张《血》时，[自]摸一张牌。
                let skill1: ExSkillData = {
                    //【主动技】 条件：[自]使用一张《血》时
                    //使用...时
                    trigger: {
                        player: NG.CardTrigger.useCard,
                    },
                    //《血》
                    filter: function (event: Trigger, player: Player) {
                        return event.card.name == NG.CardNameConst.血;
                    },
                    //[自]摸一张牌
                    content: function (event: GameEvent, player: Player, trigger: GameEvent, result: BaseResultData) {
                        player.draw(1);
                    }
                };

                //老鬼  【阶段技】  [自]可除去[自]1点血量，[他]摸一张牌。
                let skill2: ExSkillData = {
                    //【阶段技】
                    enable: NG.EnableTrigger.phaseUse,
                    //[自]可除去[自]1点血量，[他]摸一张牌。
                    content: function (event: GameEvent, player: Player, trigger: GameEvent, result: BaseResultData) {
                        //[自]可除去[自]1点血量
                        "step 0"
                        player.loseHp(1);
                        //[他]摸一张牌
                        "step 1"
                        player.chooseTarget(
                            1,
                            function (card: Card, player: Player, target: Target) {
                                return target != player;
                            }
                        );
                    }
                };


                let output = {
                    test_skill1:skill1,
                    test_skill2:skill2
                }

                return output;
            });
    })();
}