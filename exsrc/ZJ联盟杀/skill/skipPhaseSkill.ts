module ZJNGEx {
    export let SkipPhaseSkill = {
        zj_skip_Judge:{
            name:"判定阶段",
            description:"跳过玩家判定阶段",
            trigger:{
                player:NG.PhaseTrigger.judge+NG.TriggerEnum.Before
            },
            forced:true,
            content: function (event: GameEvent, player: Player, trigger: GameEvent, result: BaseResultData){
                trigger.cancel();
            }
        },
        zj_skip_PhaseDraw:{
            name:"抽牌阶段",
            description:"跳过玩家抽牌阶段",
            trigger:{
                player:NG.PhaseTrigger.phaseDraw+NG.TriggerEnum.Before
            },
            forced:true,
            content: function (event: GameEvent, player: Player, trigger: GameEvent, result: BaseResultData){
                trigger.cancel();
            }
        },
        zj_skip_PhaseUse:{
            name:"出牌阶段",
            description:"跳过玩家出牌阶段",
            trigger:{
                player:NG.PhaseTrigger.phaseUse+NG.TriggerEnum.Before
            },
            forced:true,
            content: function (event: GameEvent, player: Player, trigger: GameEvent, result: BaseResultData){
                trigger.cancel();
            }
        },
        zj_skip_PhaseDiscard:{
            name:"弃牌阶段",
            description:"跳过玩家弃牌阶段",
            trigger:{
                player:NG.PhaseTrigger.phaseDiscard+NG.TriggerEnum.Before
            },
            forced:true,
            content: function (event: GameEvent, player: Player, trigger: GameEvent, result: BaseResultData){
                trigger.cancel();
            }
        },
        zj_skip_Phase:{
            name:"当前回合",
            description:"跳过玩家当前回合",
            trigger:{
                player:NG.PhaseTrigger.phase+NG.TriggerEnum.Before
            },
            forced:true,
            content: function (event: GameEvent, player: Player, trigger: GameEvent, result: BaseResultData){
                // player.phaseSkipped = true;
                //跳过回合好像需要自己手动进行计数（稍后研究跳过回合的方式）
            }
        },
    }
}