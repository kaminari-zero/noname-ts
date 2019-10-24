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
        shoupai = "h",
        /** 装备区 */
        zhuangbei = "e",
        /** 判定区 */
        panding = "j"
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

    /**
     * 阶段类触发时机：
     */
    enum Phase_Trigger_Enum {
        /** 所有人都展示武将牌后 (前缀必须为global) */
        gameStart = "gameStart",

        /** 游戏开始阶段（所有人摸牌结束之后，游戏开始） 前(前缀必须为global) */
        gameDrawBefore = "gameDrawBefore",
        /** 游戏开始阶段（所有人摸牌结束之后，游戏开始） 时(前缀必须为global) */
        gameDrawBegin = "gameDrawBegin",
        /** 游戏开始阶段（所有人摸牌结束之后，游戏开始） 后(前缀必须为global) */
        gameDrawEnd = "gameDrawEnd",
        /** 游戏开始阶段（所有人摸牌结束之后，游戏开始） 结束后(前缀必须为global) */
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

        /** 获得卡牌 之前 */
        gainBefore = "gainBefore",
        /** 获得卡牌 时 */
        gainBegin = "gainBegin",
        /** 获得卡牌 后 */
        gainEnd = "gainEnd",
        /** 获得卡牌 结束后 */
        gainAfter = "gainAfter",

        /** 使用卡牌 之前 */
        useCardBefore = "useCardBefore",
        /** 使用卡牌 时 */
        useCardBegin = "useCardBegin",
        /** 使用卡牌 后 */
        useCardEnd = "useCardEnd",
        /** 使用卡牌 结束后 */
        useCardAfter = "useCardAfter",

        /** 使用卡牌指定 之前 */
        useCardToBefore = "useCardToBefore",
        /** 使用卡牌指定 时 */
        useCardToBegin = "useCardToBegin",
        /** 使用卡牌指定 后 */
        useCardToEnd = "useCardToEnd",
        /** 使用卡牌指定 结束后 */
        useCardToAfter = "useCardToAfter",

        /** 打出卡牌 之前 */
        respondBefore = "respondBefore",
        /** 打出卡牌 时 */
        respondBegin = "respondBegin",
        /** 打出卡牌 后 */
        respondEnd = "respondEnd",
        /** 打出卡牌 结束后 */
        respondAfter = "respondAfter",

        /** 从牌堆摸牌 之前 */
        drawBefore = "drawBefore",
        /** 从牌堆摸牌 时 */
        drawBegin = "drawBegin",
        /** 从牌堆摸牌 后 */
        drawEnd = "drawEnd",
        /** 从牌堆摸牌 结束后 */
        drawAfter = "drawAfter",

        /** 装备装备牌 之前 */
        equipBefore = "equipBefore",
        /** 装备装备牌 时 */
        equipBegin = "equipBegin",
        /** 装备装备牌 后 */
        equipEnd = "equipEnd",
        /** 装备装备牌 结束后 */
        equipAfter = "equipAfter",
    }

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
     * 特殊阶段
     */
    enum Super_Trigger_Enum {
        /** 触发结束后 */
        triggerAfter = "triggerAfter"
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

    /** 卡牌花色 */
    enum CardColor {
        /** 黑桃 */
        Spade = "spade",
        /** 红桃 */
        Heart = "heart",
        /** 草花 */
        Club = "club",
        /** 方块 */
        Diamond = "diamond",
        /** 红 */
        Red = "red",
        /** 黑 */
        Black = "black",
    }

    /** 卡牌类型（包括子类型） */
    enum CardType {
        /** 基本牌 */
        Basic = "basic",
        /** 锦囊牌（指非延时锦囊） */
        Trick = "trick",
        /** 延时锦囊牌 */
        Delay = "delay",
        /** 装备牌 */
        Equip = "equip",

        //子类型
        /** 武器 */
        Equip1 = "equip1",
        /** 防具 */
        Equip2 = "equip2",
        /** 攻马 */
        Equip3 = "equip3",
        /** 防马 */
        Equip4 = "equip4",
        /** 法宝 */
        Equip5 = "equip5",
    }

    /**
     * 伤害的属性（属性伤害）
     */
    enum HurtAttribute {
        /** 雷属性 */
        Thunder = "thunder",
        /** 火属性 */
        Fire = "fire",
        /** 毒 */
    }

    /**
     * 常用的类型常量
     */
    enum TypeConst {
        /** 位置 */
        POSITION = "position",
        /** 玩家 */
        PLAYER = "player",
        /** 玩家列表 */
        PLAYERS = "players",
        /** 卡牌 */
        CARD ="card",
        /** 卡牌列表 */
        CARDS ="cards",
        /** 伤害属性 */
        NATURE = "nature",
        /** 选择范围 */
        SELECT = "select",  
        /** 确认坐标的2对xy值 */
        DIV_POSITION = "divposition",
        /** 按钮 */
        BUTTON = "button",
        /** 会话面板 */
        DIALOG = "dialog"
    }

    // subCardType 卡牌子类型
    // food: 0.3
    // gwmaoxian: 0.5
    // hsbaowu: 0.5
    // hsdusu: 0.5
    // hsfashu: 0.5
    // hsjixie: 0.5
    // hslingjian: 0.5
    // hsmengjing: 0.5
    // hsqingyu: 0.5
    // hsqizhou: 0.5
    // hsshenqi: 0.5
    // hsyaoshui: 0.5
    // hszuzhou: 0.5
    // jiguan: 0.45
    // jiqi: 0.4
    // land: 0.6
    // spell: 0.5
    // spell_bronze: 0.2
    // spell_gold: 0.4
    // spell_silver: 0.3
}
