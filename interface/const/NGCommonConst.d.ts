// 用于快捷开发，整合常用的常量(越搞越麻烦了)
declare namespace NG {
    /**
     * 全局
     */
    export const enum CommonGlobalTrigeer {
        /** 游戏发牌后 */
        gameDrawAfter = "gameDrawAfter",
        /** 一轮开始时 */
        roundStart = "roundStart",
    }

    export const enum CommonSourceTrigeer {
        /** 造成伤害结束时 */
        damageEnd = "damageEnd"
    }

    export const enum CommonPlayerTrigeer {
        /** 回合开始时(已被"phaseZhunbeiBegin"取代) */
        phaseBegin = "phaseBegin",
        /** 回合结束时(已被"phaseJieshuBegin"取代) */
        phaseEnd = "phaseEnd",
        /** 判定阶段结束时 */
        phaseJudgeEnd = "phaseJudgeEnd",
        /** 摸牌阶段结束时 */
        phaseDrawEnd = "phaseDrawEnd",
        /** 出牌阶段结束时 */
        phaseUseEnd = "phaseUseEnd",
        /** 弃牌判定阶段结束时 */
        phaseDiscardEnd = "phaseDiscardEnd",
        /** 受到伤害结束时 */
        damageEnd = "damageEnd",
        /** 你使用杀结算开始时 */
        shaBegin = "shaBegin",
        /** 你的濒死阶段开始时 */
        dyingBegin = "dyingBegin",
        /** 确定死亡开始时 */
        dieBegin = "dieBegin",
        /** 使用牌结束时 */
        useCardEnd = "useCardEnd",
        /** 你使用牌对目标结算结束时 */
        useCardToEnd = "useCardToEnd",
        /** 需要响应牌开始时 */
        chooseToRespondBegin = "chooseToRespondBegin",
        /** 需要使用牌开始时 */
        chooseToUseBegin = "chooseToUseBegin",
        /** 拼点后 */
        chooseToCompareAfter = "chooseToCompareAfter",
        /** 判定时 */
        judge = "judge",
        /** 选牌时 */
        chooseCard = "chooseCard",
        /** 响应时 */
        respond = "respond",
        /** 失去牌结束时 */
        loseEnd = "loseEnd",
        /** 获得牌结束时 */
        gainEnd = "gainEnd",
        /** 连环后 */
        linkAfter = "linkAfter",
        /** 翻面后 */
        turnOverAfter = "turnOverAfter",
    }

    export const enum CommonTargetTrigeer {
        /** 你成为杀的目标结算开始时 */
        shaBegin = "shaBegin",
    }
}