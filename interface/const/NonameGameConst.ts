namespace NG {
    /** 导入类型 */
    enum ImportType {
        Extension = "extension",
        Character = "character",
        Card = "card"
    }

    /** 玩家区域的位置类型 */
    enum PositionType {
        /** 手牌区 */
        shoupai="h",
        /** 装备区 */
        zhuangbei="e",
        /** 判定区 */
        panding="j"
    }

    /** 性别 */
    enum Sex {
        /** 男 */
        male = "male",
        /** 女 */
        female = "female"
    }

    enum Force {
        /** 魏 */
        wei = "wei",
        /** 蜀 */
    　　shu = "shu",
        /** 吴 */
    　　wu = "wu",
        /** 群 */
    　　qun = "qun"
    }

//trigger： 触发类
//     gameDrawAfter 所有人摸牌结束之后，游戏开始
// 　　phaseBofore 回合开始前
// 　　phaseBegin 回合开始阶段
// 　　phaseJudgeBegin 判定阶段开始时
// 　　phaseJudgeBefore判定阶段开始前
// 　　phaseJudge 判定阶段
// 　　phaseDrawBefore摸牌之前
// 　　phaseDrawBegin摸牌之时
// 　　phaseDrawEnd摸牌结束
// 　　phaseUseBefore出牌阶段之前
// 　　phaseUseBegin出牌阶段开始时
// 　　phaseUseEnd出牌阶段结束时
// 　　phaseDiscardBefore弃牌阶段之前
// 　　phaseDiscardBegin弃牌阶段开始时
// 　　phaseDiscardEnd弃牌阶段结束时
// 　　phaseEnd回合结束时
// 　　loseEnd失去一张牌时
// 　　gainEnd获得一张牌后
// 　　chooseToRespondBegin打出一张牌响应之前
// 　　chooseToUseBegin使用一张牌后
// 　　damageEnd受伤害后
// 　　shaMiss杀被闪避

/**
 * 阶段类触发时机：
 */
enum Phase_Trigger_Enum {
    /** 所有人都展示武将牌后 (前缀必须为global) */
    gameStart = "gameStart",

    /** 游戏开始阶段 前(前缀必须为global) */
    gameDrawBefore = "gameDrawBefore",
    /** 游戏开始阶段 时(前缀必须为global) */
    gameDrawBegin = "gameDrawBegin",
    /** 游戏开始阶段 后(前缀必须为global) */
    gameDrawEnd = "gameDrawEnd",
    /** 游戏开始阶段 结束后(前缀必须为global) */
    gameDrawAfter = "gameDrawAfter",

    /** 回合阶段 开始前 */
    phaseBefore = "phaseBefore",
    /** 回合阶段 时 */
    phaseBegin = "phaseBegin",
    /** 回合阶段 后 */
    phaseEnd = "phaseEnd",
    /** 回合阶段 结束后 */
    phaseAfter = "phaseAfter",

    /** 判定阶段 开始前 */
    judgeBefore = "judgeBefore",
    /** 判定阶段 时 */
    judgeBegin = "judgeBegin",
    /** 判定阶段 后 */
    judgeEnd = "judgeEnd",
    /** 判定阶段 结束后 */
    judgeAfter = "judgeAfter",

    /** 摸牌阶段 开始前 */
    phaseDrawBefore = "phaseDrawBefore",
    /** 摸牌阶段 时 */
    phaseDrawBegin = "phaseDrawBegin",
    /** 摸牌阶段 后 */
    phaseDrawEnd = "phaseDrawEnd",
    /** 摸牌阶段 结束后 */
    phaseDrawAfter = "phaseDrawAfter",

    /** 出牌阶段 开始前 */
    phaseUseBefore = "phaseUseBefore",
    /** 出牌阶段 时 */
    phaseUseBegin = "phaseUseBegin",
    /** 出牌阶段 后 */
    phaseUseEnd = "phaseUseEnd",
    /** 出牌阶段 结束后 */
    phaseUseAfter = "phaseUseAfter",

    /** 弃牌阶段 开始前 */
    discardBefore = "discardBefore",
    /** 弃牌阶段 时 */
    discardBegin = "discardBegin",
    /** 弃牌阶段 后 */
    discardEnd = "discardEnd",
    /** 弃牌阶段 结束后 */
    discardAfter = "discardAfter",
}

/**
 * 卡牌类触发时机：
 */
enum Card_Trigger_Enum {
    /** 使用杀 之前 */
    shaBefore = "shaBefore",
    /** 使用杀 时 */
    shaBegin = "shaBegin",
    /** 使用杀 后 */
    shaEnd = "shaEnd",
    /** 使用杀 结束后 */
    shaAfter = "shaAfter",
    /** 使用杀 被闪后 （前缀player，使用杀未命中） */
    shaMiss = "shaMiss",

    /** 使用决斗 之前 */
    juedouBefore = "juedouBefore",
    /** 使用决斗 时 */
    juedouBegin = "juedouBegin",
    /** 使用决斗 后 */
    juedouEnd = "juedouEnd",
    /** 使用决斗 结束后 */
    juedouAfter = "juedouAfter",

    /** 失去卡牌 之前 */
    loseBefore = "loseBefore",
    /** 失去卡牌 时 */
    loseBegin = "loseBegin",
    /** 失去卡牌 后 */
    loseEnd = "loseEnd",
    /** 失去卡牌 结束后 */
    loseAfter = "loseAfter",
}
// 　　【卡牌类】
// 　　shaBefore/Begin/End/After/Miss
// 　　使用杀 之前/时/后/结束后/被闪后
// 　　juedouBefore/Begin/End/After
// 　　使用决斗 之前/时/后/结束后
// 　　loseBefore/Begin/End/After
// 　　失去卡牌 之前/时/后/结束后

// 　　gainBefore/Begin/End/After
// 　　获得卡牌 之前/时/后/结束后
// 　　useCardBefore/Begin/End/After
// 　　使用卡牌 之前/时/后/结束后
// 　　useCardToBefore/Begin/End/After
// 　　使用卡牌指定 之前/时/后/结束后
// 　　respondBefore/Begin/End/After
// 　　打出卡牌 之前/时/后/结束后
// 　　drawBefore/Begin/End/After
// 　　从牌堆摸牌 之前/时/后/结束后
// 　　equipBefore/Begin/End/After
// 　　装备装备牌 之前/时/后/结束后

/**
 * 体力类触发时机：
 */
enum HP_Trigger_Enum {
    /** 受到伤害 之前(若前缀为source则为你造成伤害) */
    damageBefore = "damageBefore",
    /** 受到伤害 时(若前缀为source则为你造成伤害) */
    damageBegin = "damageBegin",
    /** 受到伤害 后(若前缀为source则为你造成伤害) */
    damageEnd = "damageEnd",
    /** 受到伤害 结束后(若前缀为source则为你造成伤害) */
    damageAfter = "damageAfter",

    /** 失去(流失)体力 之前 */
    loseHpBefore = "loseHpBefore",
    /** 失去(流失)体力 时 */
    loseHpBegin = "loseHpBegin",
    /** 失去(流失)体力 后 */
    loseHpEnd = "loseHpEnd",
    /** 失去(流失)体力 结束后 */
    loseHpAfter = "loseHpAfter",

    /** 回复体力 之前 */
    recoverBefore = "recoverBefore",
    /** 回复体力 时 */
    recoverBegin = "recoverBegin",
    /** 回复体力 后 */
    recoverEnd = "recoverEnd",
    /** 回复体力 结束后 */
    recoverAfter = "recoverAfter",

    /** 体力值发生改变后 */
    changeHp = "changeHp",

    /** 减少体力上限 之前 */
    loseMaxHpBefore = "loseMaxHpBefore",
    /** 减少体力上限 之前 */
    loseMaxHpBegin = "loseMaxHpBegin",
    /** 减少体力上限 之前 */
    loseMaxHpEnd = "loseMaxHpEnd",
    /** 减少体力上限 之前 */
    loseMaxHpAfter = "loseMaxHpAfter",

    /** 增加体力上限 之前 */
    gainMaxHpBefore = "gainMaxHpBefore",
    /** 增加体力上限 时 */
    gainMaxHpBegin = "gainMaxHpBegin",
    /** 增加体力上限 后 */
    gainMaxHpEnd = "gainMaxHpEnd",
    /** 增加体力上限 结束后 */
    gainMaxHpAfter = "gainMaxHpAfter",
}

/**
 * 状态类触发时机：
 */
enum State_Trigger_Enum {
    /** 打出卡牌 之前 */
    chooseToRespondBefore = "chooseToRespondBefore",
    /** 打出卡牌 时 */
    chooseToRespondBegin = "chooseToRespondBegin",
    /** 打出卡牌 后 */
    chooseToRespondEnd = "chooseToRespondEnd",
    /** 打出卡牌 结束后 */
    chooseToRespondAfter = "chooseToRespondAfter",

    /** 武将牌翻面 之前 */
    turnOverBefore = "turnOverBefore",
    /** 武将牌翻面 时 */
    turnOverBegin = "turnOverBegin",
    /** 武将牌翻面 后 */
    turnOverEnd = "turnOverEnd",
    /** 武将牌翻面 结束后 */
    turnOverAfter = "turnOverAfter",

    /** 武将牌横置(连环) 之前 */
    linkBefore = "linkBefore",
    /** 武将牌横置(连环) 时 */
    linkBegin = "linkBegin",
    /** 武将牌横置(连环) 后 */
    linkEnd = "linkEnd",
    /** 武将牌横置(连环) 结束后 */
    linkAfter = "linkAfter",

    /** 进入濒临状态 之前 */
    dyingBefore = "dyingBefore",
    /** 进入濒临状态 时 */
    dyingBegin = "dyingBegin",
    /** 进入濒临状态 后 */
    dyingEnd = "dyingEnd",
    /** 进入濒临状态 结束后 */
    dyingAfter = "dyingAfter",

    /** 死亡 之前 */
    dieBefore = "dieBefore",
    /** 死亡 时 */
    dieBegin = "dieBegin",
}

/**
 * 主动技触发时机
 * 用于主动技的enable中
 */
enum Enable_Trigger_Enum {
    /**  主动用/挑选卡牌以使用 */
    chooseToUse = "chooseToUse",
    /** 响应/挑选卡牌以响应 */
    chooseToRespond = "chooseToRespond",
    /** 回合使用 */
    phaseUse = "phaseUse"
}

//     延时锦囊牌delay
// 　　锦囊牌trick
// 　　基本牌basic
// 　　红桃heart
// 　　黑桃spade
// 　　草花club
// 　　方块diamond
// 　　红red
// 　　黑black
// 　　gain获得
// 　　recover恢复

//     equip1武器
// 　　equip2防具
// 　　equip3攻马
// 　　equip4防马
// 　　equip5法宝
}