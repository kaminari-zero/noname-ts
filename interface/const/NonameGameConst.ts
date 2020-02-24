namespace NG {
    /** 导入类型 */
    export const enum ImportType {
        Extension = "extension",
        Character = "character",
        Card = "card",
        Mode = "mode",
        Player = "player"
    }

    /** 玩家区域的位置类型 */
    export const enum PositionType {
        /** 手牌区 */
        Shoupai = "h",
        Handcard = "h",
        /** 装备区 */
        Zhuangbei = "e",
        Equip = "e",
        /** 判定区 */
        Panding = "j",
        Judge = "j",

        /** 抽牌区/牌堆 */
        CardPlie = "c",
        /** 弃牌区 */
        Discard = "d",
        /** 
         * 特殊显示区
         * (特殊卡牌去，游戏外卡牌区，在该区域的卡牌，会被排除出上面那些区域，
         * 而上面那些区域是在游戏内的卡牌，
         * 所以该区域是指例如：“移除出游戏外”，“某些技能的标记，例如周泰的不屈”......)
         */
        Special = "s",

        /** 玩家场上的牌（武器，判定） */
        Area = "ej",
        /** 玩家操作的牌 */
        Use = "he",
        /** 玩家所有的牌 */
        All = "hej",

        //ui上指定的区域，用于某些特殊字段，统一归类到这里(玩家的牌应该都在player对象内)：
        //场上卡牌所在位置：
        // ui.control=ui.create.div('#control',ui.arena).animate('nozoom');
        // ui.cardPile=ui.create.div('#cardPile');
        // ui.discardPile=ui.create.div('#discardPile');
        // ui.special=ui.create.div('#special');
        /** 牌堆 */
        c = "cardPile",
        /** 弃牌堆 */
        d = "discardPile",
        /** 特殊卡牌区，游戏外卡牌区 */
        s = "special",
    }

    /** 性别 */
    export const enum Sex {
        /** 男 */
        MALE = "male",
        /** 女 */
        FEMALE = "female"
    }

    /**
     * 势力名
     */
    export const enum Group {
        /** 魏(水) */
        WEI = "wei",
        /** 水 */
        WATER = "wei",
        /** 蜀（火） */
        SHU = "shu",
        /** 火 */
        FIRE = "shu",
        /** 吴（木） */
        WU = "wu",
        /** 木 */
        WOOD = "wu",
        /** 群（土） */
        QUN = "qun",
        /** 土 */
        SOIL = "qun",
        /** 神（金） */
        SHEN = "shen",
        /** 金 */
        GOLD = "shen",

    }

    //阶段重新整理：阶段名+时机
    export const enum TriggerEnum {
        /** 开始前 */
        Before = "Before",
        /** 开始时/时 */
        Begin = "Begin",
        /** 触发后/后 */
        End = "End",
        /** 触发结束后/结束后 */
        After = "After",
        /** 忽略/跳过 */
        Omitted = "Omitted"
    }

    /**
     * 阶段类触发时机：
     */
    export const enum PhaseTrigger {
        /** 所有人都展示武将牌后 (前缀必须为global)，暂时只有一个阶段 */
        gameStart = "gameStart",

        /** 游戏开始阶段（所有人摸牌结束之后，游戏开始） (前缀必须为global) */
        gameDraw = "gameDraw",

        /** 回合阶段 */
        phase = "phase",

        /** 判定阶段 */
        judge = "judge",

        /** 摸牌阶段 */
        phaseDraw = "phaseDraw",

        /** 出牌阶段 */
        phaseUse = "phaseUse",

        /** 弃牌阶段 */
        phaseDiscard = "phaseDiscard",
        
        //新版2020-2-24增加的时机：(流程阶段更细致)
        /** 准备阶段 */
        phaseZhunbei = "phaseZhunbei",
        /** 结束阶段 */
        phaseJieshu = "phaseJieshu",

        //特化出来的常用阶段，不需要拼接
        /** 准备阶段时(同“phaseBegin”) */
        phaseZhunbeiBegin = "phaseZhunbeiBegin",
        /** 结束阶段后（同“phaseEnd”） */
        phaseJieshuBegin = "phaseJieshuBegin",
    }

    /**
     * 卡牌类触发时机：（卡牌类,技能类只要符合条件都会触发其对应名的阶段触发）
     */
    export const enum CardTrigger {
        /** 使用杀 */
        sha = "sha",
        /** 使用杀 被闪后（被响应） （前缀player，使用杀未命中） */
        shaMiss = "shaMiss",

        /** 使用决斗 */
        juedou = "juedou",

        /** 失去卡牌 */
        lose = "lose",

        /** 获得卡牌 */
        gain = "gain",

        /** 使用卡牌 */
        useCard = "useCard",

        /** 使用卡牌指定 */
        useCardTo = "useCardTo",

        /** 打出卡牌 */
        respond = "respond",

        /** 从牌堆摸牌 */
        draw = "draw",

        /** 装备装备牌 */
        equip = "equip",

        /** 打出卡牌 */
        chooseToRespond = "chooseToRespond",

        /** 弃牌 */
        discard = "discard",

        /** 失去某张牌 */
        lose_ = "lose_"
    }
    
    /**
     * 状态类触发时机：
     */
    export const enum StateTrigger {
        /** 受到伤害 (若前缀为source则为你造成伤害) */
        damage = "damage",
    
        /** 失去(流失)体力 */
        loseHp = "loseHp",
    
        /** 回复体力 */
        recover = "recover",
    
        /** 体力值发生改变后 */
        changeHp = "changeHp",
    
        /** 减少体力上限 */
        loseMaxHp = "loseMaxHp",
    
        /** 增加体力上限 */
        gainMaxHp = "gainMaxHp",

        /** 武将牌翻面 */
        turnOver = "turnOver",

        /** 武将牌横置(连环) */
        link = "link",

        /** 进入濒临状态 */
        dying = "dying",

        /** 死亡 */
        die = "die",

        //新增特殊受伤时机(不需要拼接) by2020-2-23
        /*
        新版本的伤害事件中 
        添加了damageBegin1 damageBegin2 damageBegin3 damageBegin4这四个新时机
        分别对应图中的造成伤害时1 造成伤害时2 受到伤害时2 受到伤害时3
        1，2是造成伤害时
        3，4是受到伤害时
        这么规定的
        1，3可以改变伤害大小
        2，4不能
        (具体到时分析)
        */
        /** 造成伤害时1 */
        damageBegin1 = "damageBegin1",
        /** 造成伤害时2 */
        damageBegin2 = "damageBegin2",
        /** 受到伤害时2 */
        damageBegin3 = "damageBegin3",
        /** 受到伤害时3 */
        damageBegin4 = "damageBegin4"
    }

    /**
     * 特殊阶段（后面根据代码需要补充）
     */
    export const enum SuperTrigger {
        /** 触发 */
        trigger = "trigger"
    }

    /**
     * 主动技触发时机
     * 
     * （也可以使用上面得阶段触发，以下为比较常用）
     * 
     * 用于主动技的enable中
     */
    export const enum EnableTrigger {
        /**  主动用/挑选卡牌以使用 */
        chooseToUse = "chooseToUse",
        /** 响应/挑选卡牌以响应 */
        chooseToRespond = "chooseToRespond",
        /** 回合使用(出牌阶段) */
        phaseUse = "phaseUse"
    }

    /** 卡牌花色 */
    export const enum CardColor {
        /** 黑桃 */
        Spade = "spade",
        /** 红桃 */
        Heart = "heart",
        /** 草花 */
        Club = "club",
        /** 方块 */
        Diamond = "diamond",

        /** 指无花色，颜色，一般多用于多张卡牌花色不同时，若需要把其视为一种，花色时，则为none */
        None = "none",

        /** 红 */
        Red = "red",
        /** 黑 */
        Black = "black",
    }

    /** 卡牌类型（包括子类型） */
    export const enum CardType {
        /** 基本牌 */
        Basic = "basic",
        /** 锦囊牌（指非延时锦囊） */
        Trick = "trick",
        /** 延时锦囊牌 */
        Delay = "delay",
        /** 装备牌 */
        Equip = "equip",

        //子类型subtype
        /** 武器 */
        Equip1 = "equip1",
        /** 防具 */
        Equip2 = "equip2",
        /** 防马（+1） */
        Equip3 = "equip3",
        /** 攻马（-1） */
        Equip4 = "equip4",
        /** 法宝 */
        Equip5 = "equip5",
    }

    /**
     * 伤害的属性（属性伤害）
     */
    export const enum Nature {
        /** 雷属性 */
        Thunder = "thunder",
        /** 火属性 */
        Fire = "fire",
        /** 毒 */
        Poison = "poison"
    }

    /**
     * 常用的item类型常量（主要是get.itemtype）
     */
    export const enum ItemType {
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
        DIALOG = "dialog",

    }
    
    /**
     * 创建按钮/div类型常量
     */
    export const enum ButtonType {
        /** 
         * 背面：
         * 
         * 对应item为card，
         * 效果：不显示卡面，显示背面； 
         */
        BLANK ="blank",
        /**
         * 卡牌：
         * 
         * 对应item为card，
         * 效果：展示卡牌；
         */
        CARD ="card",
        /** 
         * 虚拟卡牌:
         * 
         * 对应item为string,则是卡牌名；否则类型为CardBaseUIData或者CardBaseUIData2，
         * 效果：展示虚构卡牌（非卡堆里的）； 
         */
        VCARD="vcard",
        /**
         * 武将卡：
         * 
         * 对应item为string,则是武将名，
         * 效果：展示武将并附带一个功能按钮；
         */
        Character ="character",
        /**
         * 玩家：
         * 
         * 对应的item为Player，则是玩家，
         * 效果：展示玩家的武将；
         */
        PLAYER ="player",
        /**
         * 文本：
         * 
         * 对应的item为“html文档文本”，则是html文档的显示，
         * 效果：展示这段文档；
         */
        TEXT ="text",
        /**
         * （纯）可点击文本：
         * 
         * 对应的item为“html文档文本”，则是html文档的显示，
         * 效果：应该是按钮功能的文本，例如链接，暂不明确，待后期观察
         */
        TextButton ="textButton",
    }

    /**
     * 对象类型
     */
    export const enum ObjType {
        Array = "array",
        Object = "object",
        Div = "div",
        Table = "table",
        Tr = "tr",
        Td = "td",
        Body = "body",
    }

    /**
     * 不弃牌，准备用这些牌来干什么的常量
     */
    export const enum PrepareConst {
        /** 交给玩家 */
        Give ="give",
        Give2 ="give2",
        Throw ="throw",
        Throw2 = "throw2"
    }

    /**
     * 装备栏位置
     * 1=武器栏 2=防具栏 3=加一马栏 4=减一马栏 5=宝物栏
     */
    export const enum EquipPos {
        /** 武器 */
        E1 = 1,
        /** 防具 */
        E2 = 2,
        /** 防马（+1） */
        E3 = 3,
        /** 攻马（-1） */
        E4 = 4,
        /** 法宝 */
        E5 = 5,

        /** 武器 */
        Equip1 = "equip1",
        /** 防具 */
        Equip2 = "equip2",
        /** 防马（+1） */
        Equip3 = "equip3",
        /** 攻马（-1） */
        Equip4 = "equip4",
        /** 法宝 */
        Equip5 = "equip5",
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
