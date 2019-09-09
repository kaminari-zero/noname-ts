/** 这里主要是声明各种游戏内常用的对象的结构 */
type testTypeFun = {};

/** key为字符串的map */
interface SMap<V> {
    [key: string]: V
}

/** key为number的map */
interface NMap<V> {
    [key: number]: V
}

/** 菜单的选项的配置 */
interface SelectConfigData {
    /** 功能名 */
    name: string,
    /** 初始化时默认的选项/配置/模式 */
    init: boolean | string,
    /** 功能说明 */
    intro: string,

    restart?: boolean,
    frequent?: boolean,
    unfrequent?: boolean,
    /** 清理游戏，核心选项，应该默认是false，具体到时看代码 */
    clear?: boolean,

    /** 指定该项没有功能，仅展示，项目内多用于描述上 */
    nopointer?: boolean,
    input?: boolean,

    /** 二级菜单配置 */
    item?: SMap<string>,

    visualBar?: (node: any, item: any, create: any, switcher?: any) => void
    visualMenu?: (node: any, link: any, name?: any, config?: any) => void

    content?: (bool: any) => void

    textMenu?: (node: any, link: any) => void

    onswitch?: (bool: any) => void

    /** 点击触发事件（好像是有返回值的） */
    onclick?: (...args: any[]) => void | boolean
}

/** 通常菜单的标准配置 */
interface CommonMenuConfigData {
    name: string,
    /** 估计是联机配置，具体要看代码 */
    connect?: {
        // update(config: any, map: any):any;
        /** 其余配置(混合两种写法，不知怎么写) */
        [key: string]: SelectConfigData;
    }
    config: {
        // update(config: any, map: any):any;
        /** 其余配置(混合两种写法，不知怎么写) */
        [key: string]: SelectConfigData,
    }
}

/** 扩展菜单的标准配置 */
interface ExtensionMenuConfigData {
    /** 开启 */
    enable: SelectConfigData,
    /** 功能描述 */
    intro: SelectConfigData,
    /** 作者信息栏 */
    author: SelectConfigData,
    /** 隐藏此扩展 */
    hide: SelectConfigData,
    /** 其余配置 */
    [key: string]: SelectConfigData,
}

/** 技能的配置信息 */
interface ExSkillData {
    /** 
     * 触发的时机 
     * 一般用于触发技能（被动技能）
     */
    trigger: ExTriggerData;

    /** 是否实时更新(例如标记) */
    locked:boolean;
    unique:boolean;
    silent:boolean;
    /**
     * 此技能是否可以被设置为自动发动（不询问）
     */
    frequent:boolean|string;
    /** 
     * 此技能是否能固定触发（即自动发动）。
     * true为固定触发（锁定技）
     * 国战可以触发亮将。
     */
    forced:boolean;
    /**
     * player是否logSkill('此技能').
     * true为不
     */
    nopop:boolean;
    /** 功能相当于forced+nopop */
    direct:boolean;
    /** 
     * 获得技能时是否显示此标记，
     * 若为false，可以用markSkill()来显示此标记
     */
    mark:boolean;
    popup:boolean;
    noLose:boolean;
    noDeprive:boolean;
    noRemove:boolean;
    noDisable:boolean;
    notarget:boolean;
    property:boolean;
    /**
     * 是否每个目标都结算一次
     * true为否
     */
    multitarget: boolean|number;
    multiline: boolean;
    /**
     * 是否弃牌
     * 若没有这一行，选择牌发动技能后，被选择的牌都要弃置
     */
    discard:boolean;
    /** 
     * 是否为主公技：
     * true时，将这个技能设置为主公技 
     */
    zhuSkill:boolean;
    /** 是否开启觉醒动画 */
    skillAnimation:boolean;
    /** 觉醒文字 */
    animationStr:string;
    /** 觉醒文字颜色 */
    animationColor:string;

    /** 同时机技能发动的优先度 */
    priority:number;
    /** 每回合限制使用次数（限制使用次数为变量时需写在filter内） */
    usable:number;
    /**
     * 需要选择多少张牌才能发动
     * 选择的牌数
     * -1时，选择所有牌,否则就是指定数量的牌
     * 数组时，这个数组就是选择牌数的区间
     * 为变量时（具体情况具体分析），例：()=>number
     */
    selectCard:number|number[]|CardFun<number>;
    /**
     * 需要选择多少个目标才能发动
     * 选择的目标数：
     * 为-1时，选择全部人
     * 为数组时，这个数组就是选择目标数的区间
     */
    selectTarget:number|number[];
    
    /** 技能按钮名字，不写则默认为此技能的翻译 */
    name:string;
    /**
     * 配音:
     * 为数字事，数字为配音数量索引，从1开始，使用无名杀目录\audio\skill内的配音
     * 为字符串时，使用无名杀录目\extension\扩展名内的配音，命名方法：技能名+这是第几个配音
     */
    audio:number|string;
    /** 
     * 技能组:
     * 拥有这个技能时相当于拥有技能组内的技能
     */
    group:string[];
    /** 标记显示文本，一般为一个字 */
    marktext:string;
    /** 
     * 可使用的阶段 
     * 一般用于主动技能
     */
    enable:string|string[];
    derivation:string[];
    /** 
     * 指定位置：
     * 'h'：手牌区, 'e'：装备区, 'j'：判定区 
     */
    position:string;
    /**
     * 不弃牌，准备用这些牌来干什么
     */
    prepare:string|CardAndPlayerFun<string>;
    /**
     * 选择的目标武将牌上出现什么字，
     * 数组第几元素对应第几个目标
     */
    targetprompt:string[];
    /**
     * 选择时弹出的提示
     */
    prompt:string;
    /**
     * 全局技能:
     * 你拥有此技能时，所有角色拥有此技能（global的值为技能名）
     * 注：无论是否拥有此技能，此技能都为全局技能写法：技能名前+_
     */
    global:string;

    intro: {
        /** 
         * 标记显示内容:
         * 为cards时显示标记内的牌.
         * 
         * 当标记显示内容是文本时，
         * 例：标记显示内容为当前有多少个标记
         */
        content:string|IntroContentFun,
    };
    /** 
     * 子技能:
     * 你不会拥有写在这里面的技能，可以调用，可以用技能组联系起来;
     * 子技能名字:“主技能_子技能”，翻译为主技能翻译
     * 结构存在争议，往后继续研究 
     */
    subSkill:SMap<ExSkillData>;
    /** 锁定技 */
    mod: ExModData;
    /**
     * 选择按钮（牌）
     */
    chooseButton: ChooseButtonConfigData;
    /**
     * 选择的牌需要满足的条件
     * 可以使用键值对的简便写法
     * 也可以使用函数返回值（推荐）
     */
    filterCard:SMap<string>|CardFun<boolean>;
    /**
     * (视为)目标卡牌
     * 一般用于视为技能
     */
    viewAs:SMap<string>;
    ai: ExAIData;

    /**
     * 获得技能时发动
     * @param player 
     */
    init(player):void;
    /**
     * 失去技能时发动
     * @param player 
     */
    onremove(player):void;
    /** 
     * ai如何选牌
     */
    check(card) :boolean;
    /**
     * 告诉ai是否发动这个技能
     * 返回true则发动此技能
     * @param event 
     * @param player 
     */
    check(event, player) :boolean;
    /**
     * 第一个参数好想有些不一样：event，card,子技能button
     * @param arg 
     */
    check(...arg):any;
    /**
     * 过滤发动条件，返回true则可以发动此技能
     * @param event 事件 相当于trigger时机
     * @param player 
     */
    filter(event, player):boolean;
    /**
     * 选择的目标需要满足的条件
     * @param card 
     * @param player 
     * @param target 
     */
    filterTarget(card, player, target):boolean;
    /**
     * 触发内容（技能内容），
     *  当有filterCard时，有参数cards
     *  当有filterTarget时，有参数target和targets
     * 分步执行
     */
    content(...args):void;

    /**
     * 视为技按钮出现条件（即发动条件）
     * @param player 
     */
    viewAsFilter(player):boolean;
    /**
     * 使用视为牌时触发内容。
     * result.cards是视为前的牌
     * @param result 
     * @param player 
     */
    onuse(result, player):void;

}

/** 时机的配置信息 */
interface ExTriggerData {
    /** 
     * 全场任意一个 
     * 代表所有人
     */
    global: string | string[];
    /** 
     * 玩家自己 
     * 触发时件中，技能拥有者的角色为事件的发起者
     */
    player: string | string[];
    /**
     * 你自己成为目标
     */
    target: string | string[];
    /**
     * 来源是你自己
     */
    source: string | string[];
}

/** ai的配置信息 */
interface ExAIData {
    /** 
     * ai发动技能的优先度
     * 要具体比什么先发发动，可以使用函数返回结果
     */
    order: number|NoParamFun<number>,
    /** 
     * 发动技能是身份暴露度（0~1，相当于概率）
     * 取值范围为0~1,用于帮助AI判断身份,AI中未写expose其他AI将会无法判断其身份
     */
    expose:number;
    /** 
     * 嘲讽值：
     * 嘲讽值越大的角色越容易遭受到敌方的攻击,默认为1,一般在0~4中取值即可(缔盟threaten值为3)
     */
    threaten: number | PlayerTargetFun<number>; 
    /**
     * 态度：
     * 态度只由identity决定。不同身份对不同身份的att不同。
     * 例如在身份局中,主对忠att值为6,忠对主att值为10;
     */
    attitude:number;

    /** 
     * 此技能可以用于自救 
     */
    save:boolean;
    /** 此技能可以用于救人，一般用于视为技 */
    respondTao:boolean;
    /** 
     * 此技能可以响应闪，一般用于视为技 
     * 作用是告诉AI手里没『闪』也可能出『闪』,防止没『闪』直接掉血
     */
    respondShan:boolean;
    /** 此技能可以响应杀，一般用于视为技 */
    respondSha:boolean;
    /** 
     * 卖血（技能标签）：
     * 用于其他AI检测是否是卖血流(if(target.hasSkillTag('maixie')))。并非加了这个AI就会卖血。
     */
    maixie:boolean;
    maixie_hp:boolean;
    /**
     * 无牌（技能标签）：
     * 目前只出现在“连营”和“伤逝”中,用于其它AI检测是否含有标签『无牌』,
     * 从而告诉其他AI不要拆迁(因为生生不息)。
     */
    noh:boolean,
    notrick: boolean,
    nosha: boolean,
    noe2: boolean,
    reverseEquip:boolean;
    
    basic:any;
    tag:any;
    
    /** 
     * 效果：
     * 影响ai出牌（例如什么时候不出杀）等 
     * 效果值为正代表正效果,反之为负效果,AI会倾向于最大效果的目标/卡牌;
     */
    effect: {
        target(card, player, target, current):string|number;
    }
    /** 
     * 收益：
     * 收益值未在AI声明默认为0(对玩家对目标均是如此)。
     * 一般用于主动技
     * 关于收益的算法，待会再详细描述
     */
    result: {
        /**
         * ai如何选择目标（对目标的收益）：
         * 返回负，选敌人，返回正，选队友;
         * 没有返回值则不选;
         * 注：写了这个就不用写player(player){}了，因为player可以在这里进行判断
         * @param player 
         * @param target 
         */
        target(player,target):number|void;
        /**
         * ai是否发动此技能（对玩家（自身）的收益）：
         * 返回正，发动，否则不发动
         * @param player 
         */
        player(player):number;
    }
    /**
     * 视为技专属，ai什么时候可以发动视为技
     * @param player 
     */
    skillTagFilter(player):boolean;
}

/** 锁定技的配置 */
interface ExModData {
    /**
     * 卡牌是否可弃置
     * @param card 牌
     * @param player 玩家
     */
    cardDiscardable(card, player):boolean;
    /**
     * 卡牌是否可用
     * cardEnabled一起使用
     * @param card 牌
     * @param player 玩家
     */
    cardEnabled(card, player): boolean;
    /**
     * 卡牌是否可用
     * 要与cardEnabled一起使用（目前看来两个效果一致）
     * @param card 牌
     * @param player 玩家
     */
    cardUsable(card, player): boolean;
    /**
     * 卡牌是否可以响应
     * 要与cardEnabled一起使用（目前看来两个效果一致）
     * @param card 牌
     * @param player 玩家
     */
    cardRespondable(card, player): boolean;
    /**
     * 卡牌是否可以救人
     * 要与cardEnabled一起使用（目前看来两个效果一致）
     * @param card 牌
     * @param player 玩家
     */
    cardSavable(card, player): boolean;
    /** 在全局的防御范围 */
    globalTo(from, to, current):number;
    /** 在全局的进攻距离 */
    globalFrom(from, to, distance):number;
    /** 手牌上限 */
    maxHandcard(player, num):number;
    /**
     * 选择的目标
     * card：牌；
     * player：玩家；
     * range：
     *      range[1]：目标个数; 
     */
    selectTarget(card, player, range): void;
    /** 
     * 是否能成为目标 
     * card：牌；
     * player：使用牌的角色；t
     * arget：玩家
     */
    targetEnabled(card, player, target): boolean;
    /**
     * 可以指定任意目标
     * @param card 牌
     * @param player 玩家
     * @param target 目标
     */
    targetInRange(card, player, target):boolean;
}

/** 选择按钮配置 */
interface ChooseButtonConfigData {
    /** 
     * 选择内容 （目前只支持寻找卡牌）
     */
    dialog():any;
    /**
     * 卡牌选择条件
     * @param button 
     * @param player 
     */
    filter (button, player) :void;
    /**
     * ai如何选牌
     * @param button 
     */
    check(button):any;
    /**
     * 返回“视为”部分（即当作该选择为视为的操作逻辑）
     * @param links 
     * @param player 
     */
    backup(links, player): ExSkillData;
    /**
     * 选择时弹出的提示
     * @param links 
     * @param player 
     */
    prompt(links, player):string;
}

/**
 * 武将包的配置信息
 */
interface CharacterConfigData {
    /** 武将包名(英文) */
    name:string;
    /** 该武将包是否可以联机 */
    connect:boolean;

    /** 
     * 武将基本配置信息
     * "武将名字":[ "性别","势力",体力,["技能"],[] ]
     */
    character:SMap<HeroData>;
    /** 武将介绍 */
    characterIntro?:SMap<string>;
    /** 武将标题（用于写称号或注释） */
    characterTitle?:SMap<string>;
    /** 技能 */
    skill:SMap<ExSkillData>;
    /** 翻译 */
    translate:SMap<string>;
    /** 珠联璧合武将 */
    perfectPair?:SMap<string[]>;
}

/** 
 * 武将信息:
 * [ "性别","势力",体力,["技能"],["图片"] ]
 */
type HeroData = [string,string,number,string[],string[]];

/**
 * 卡包配置信息
 */
interface CardHolderConfigData {
    /** 卡包名 */
    name:string;
    /** 该卡包是否可以联机 */
    connect:boolean;
    /** 卡牌 */
    card:SMap<any>;
    /** 技能 */
    skill:SMap<any>;
    /** 翻译 */
    translate:SMap<any>;
    /** 牌堆添加 */
    list:string[][];
}

/**
 * 卡牌信息配置
 */
interface CardConfigData {
    
}

type CardAndPlayerFun<T> = (card,player) => T;
type CardPlayerAndTargetFun<T> = (card, player, target) => T;
type CardFun<T> = (card) => T;
type PlayerTargetFun<T> = (player, target) => T;
type NoParamFun<T> = () => T;
/**
 * 标记显示内容为文本时的返回字符串方法
 */
type IntroContentFun = (storage,player,skill) => string;
