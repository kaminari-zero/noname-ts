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
    enable?: SelectConfigData,
    /** 功能描述 */
    intro?: SelectConfigData,
    /** 作者信息栏 */
    author?: SelectConfigData,
    /** 隐藏此扩展(代码内部添加) */
    hide?: SelectConfigData,
    /** 其余配置 */
    [key: string]: SelectConfigData,
}

/** 技能的配置信息 */
interface ExSkillData {
    /** 
     * 触发的时机 
     * 一般用于触发技能（被动技能）
     */
    trigger?: ExTriggerData;

    /**
     * 为true时，将该技能加入到_hookTrigger
     * 具体作用尚为知晓
     */
    hookTrigger?:boolean;

    /** 是否实时更新(例如标记) */
    locked?:boolean;
    unique?:boolean;
    /**
     * 此技能是否可以被设置为自动发动（不询问）
     */
    frequent?:boolean|string;
    /** 
     * 此技能是否能固定触发（即自动发动）。
     * true为固定触发（锁定技）
     * 国战可以触发亮将。
     */
    forced?:boolean;
    /**
     * player是否logSkill('此技能').
     * true为不
     */
    nopop?:boolean;
    /** 功能相当于forced+nopop ,会不会是被托管时的标记呢，正在验证*/
    direct?:boolean;
    /** 
     * 获得技能时是否显示此标记，
     * 若为false，可以用markSkill()来显示此标记
     */
    mark?:boolean;
    /** 
     * 是否可以弹出选择
     * 用于在arrangeTrigger过滤出多个同时机的触发技能时
     */
    popup?:boolean;
    /** 目前具体不知什么功能，当前所知，和popup功能一致 */
    silent?:boolean;
    noLose?:boolean;
    noDeprive?:boolean;
    noRemove?:boolean;
    noDisable?:boolean;
    notarget?:boolean;
    property?:boolean;
    /**
     * 是否每个目标都结算一次
     * true为否
     */
    multitarget?: boolean|number;
    multiline?: boolean;
    /**
     * 是否弃牌
     * 若没有这一行，选择牌发动技能后，被选择的牌都要弃置
     */
    discard?:boolean;
    /** 
     * 是否为主公技：
     * true时，将这个技能设置为主公技 
     */
    zhuSkill?:boolean;
    /** 是否开启觉醒动画 */
    skillAnimation?:boolean;
    /** 觉醒文字 */
    animationStr?:string;
    /** 觉醒文字颜色 */
    animationColor?:string;

    logv?:boolean;

    delay?:number;
    /** 同时机技能发动的优先度 */
    priority?:number;
    /** 每回合限制使用次数（限制使用次数为变量时需写在filter内） */
    usable?:number;
    /** 目前还没确定具体，应该是一场游戏中，能使用的次数 */
    round?:number;
    /**
     * 需要选择多少张牌才能发动
     * 选择的牌数
     * -1时，选择所有牌,否则就是指定数量的牌
     * 数组时，这个数组就是选择牌数的区间
     * 为变量时（具体情况具体分析），例：()=>number
     */
    selectCard?:number|number[]|CardFun<number>;
    /**
     * 需要选择多少个目标才能发动
     * 选择的目标数：
     * 为-1时，选择全部人
     * 为数组时，这个数组就是选择目标数的区间
     */
    selectTarget?:number|number[];
    /**
     * 自动延迟的时间
     */
    autodelay?:number|TriggerAndPlayer<number>;
    
    /** 技能按钮名字，不写则默认为此技能的翻译 */
    name?:string;
    /**
     * 配音：
     * 为数字事，数字为配音数量索引，从1开始，使用无名杀目录\audio\skill内的配音
     * 为字符串时，使用无名杀录目\extension\扩展名内的配音，命名方法：技能名+这是第几个配音
     */
    audio?:number|string;
    /** 
     * 技能组：
     * 拥有这个技能时相当于拥有技能组内的技能
     */
    group?:string[];
    /** 标记显示文本，一般为一个字 */
    marktext?:string;
    /** 
     * 可使用的阶段 
     * 一般用于主动技能
     */
    enable?:string|string[];
    /** 
     * 来源：
     * 貌似时联机用的，具体还没确定
     */
    derivation?:string[]|string;
    /** 
     * 指定位置：
     * 'h'：手牌区, 'e'：装备区, 'j'：判定区 
     */
    position?:string;
    /**
     * 不弃牌，准备用这些牌来干什么
     */
    prepare?:string|CardAndPlayerFun<string>;
    /**
     * 选择的目标武将牌上出现什么字，
     * 数组第几元素对应第几个目标
     */
    targetprompt?:string[];
    /**
     * 选择时弹出的提示
     */
    prompt?:string|TriggerAndPlayer<string>;
    /**
     * 阶段日志
     * 配置一个触发阶段，或者一个方法直接返回文本
     * 若没有配置prompt，显示该配置的提示
     */
    logTarget?:string|TriggerAndPlayer<string>;
    /**
     * 二次提示，主要显示的时机暂未明确
     * 若是boolean类型，则使用lib.translate[“技能名_info”]的描述
     */
    prompt2?:string|TriggerAndPlayer<string>|boolean;
    /**
     * 全局技能?:
     * 你拥有此技能时，所有角色拥有此技能（global的值为技能名）
     * 注：无论是否拥有此技能，此技能都为全局技能写法：技能名前+_
     */
    global?:string;
    globalSilent?:any;

    intro?: {
        /** 
         * 标记显示内容？
         * 为cards时显示标记内的牌.
         * 
         * 当标记显示内容是文本时，
         * 例：标记显示内容为当前有多少个标记
         */
        content:string|IntroContentFun,
    };
    /** 
     * 子技能：
     * 你不会拥有写在这里面的技能，可以调用，可以用技能组联系起来;
     * 子技能名字：“主技能_子技能”，翻译为主技能翻译
     * 结构存在争议，往后继续研究 
     */
    subSkill?:SMap<ExSkillData>;
    /** 锁定技 */
    mod?: ExModData;
    /**
     * 选择按钮（牌）
     */
    chooseButton?: ChooseButtonConfigData;
    /**
     * 选择的牌需要满足的条件
     * 可以使用键值对的简便写法
     * 也可以使用函数返回值（推荐）
     */
    filterCard?:SMap<string>|CardFun<boolean>;
    /**
     * (视为)目标卡牌
     * 一般用于视为技能
     */
    viewAs?:SMap<string>;
    ai?: ExAIData;

    /**
     * 失去技能时发动
     * 当值为string时：
     * storage
     * 当值为true时，都是直接移除
     */
    onremove?:PlayerSkillFun<void>|string|string[]|boolean;
    /**
     * 获得技能时发动
     * @param player 
     */
    init?(player):void;
    /** 
     * ai如何选牌
     */
    check?(card):boolean;
    /**
     * 告诉ai是否发动这个技能
     * 返回true则发动此技能
     * @param event 
     * @param player 
     */
    check?(event, player):boolean;
    /**
     * 第一个参数好想有些不一样：event，card,子技能button
     * @param arg 
     */
    check?(...arg):any;
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
     * 分步执行(通过step x分割开执行逻辑步骤)
     */
    content?:ContentFunc;
    precontent?(config):void;

    /**
     * 视为技按钮出现条件（即发动条件）
     * @param player 
     */
    viewAsFilter?(player):boolean;
    /**
     * 使用视为牌时触发内容。
     * result.cards是视为前的牌
     * @param result 
     * @param player 
     */
    onuse?(result, player):void;

    /**
     * 在filterTrigger中执行，过滤发动条件，和filter有些类似，具体功能稍后分析
     * @param event 
     * @param player 
     * @param name 
     * @param skill 
     */
    block?(event,player,name,skill):void;

    /**
     * 取消触发后的处理
     * 在createTrigger中step 3处理
     * @param trigger 
     * @param player 
     */
    oncancel?(trigger,player):void;

    /**
     * 之后处理方法
     * 在createTrigger中最终步骤中，需要当前没有hookTrigger配置才调用到
     * 若返回true时，会触发“triggerAfter”
     * @param event 
     * @param player 
     * @param triggername 
     */
    after?(event,player,triggername):boolean;
}

/** 导入技能包的配置信息 */
interface ExSkillConifgData extends ExCommonConfig {
    /** 技能 */
    skill:SMap<ExSkillData>;
}

/** 时机的配置信息 */
interface ExTriggerData {
    /** 
     * 全场任意一个 
     * 代表所有人
     */
    global?: string | string[];
    /** 
     * 玩家自己 
     * 触发时件中，技能拥有者的角色为事件的发起者
     */
    player?: string | string[];
    /**
     * 你自己成为目标
     */
    target?: string | string[];
    /**
     * 来源是你自己
     */
    source?: string | string[];
}

/** ai的配置信息 */
interface ExAIData {
    /** 
     * ai发动技能的优先度
     * 要具体比什么先发发动，可以使用函数返回结果
     */
    order?: number|NoParamFun<number>,
    /** 
     * 发动技能是身份暴露度（0~1，相当于概率）
     * 取值范围为0~1,用于帮助AI判断身份,AI中未写expose其他AI将会无法判断其身份
     */
    expose?:number;
    /** 
     * 嘲讽值：
     * 嘲讽值越大的角色越容易遭受到敌方的攻击,默认为1,一般在0~4中取值即可(缔盟threaten值为3)
     */
    threaten?: number | PlayerTargetFun<number>; 
    /**
     * 态度：
     * 态度只由identity决定。不同身份对不同身份的att不同。
     * 例如在身份局中,主对忠att值为6,忠对主att值为10;
     */
    attitude?:number;

    /** 
     * 此技能可以用于自救 
     */
    save?:boolean;
    /** 此技能可以用于救人，一般用于视为技 */
    respondTao?:boolean;
    /** 
     * 此技能可以响应闪，一般用于视为技 
     * 作用是告诉AI手里没『闪』也可能出『闪』,防止没『闪』直接掉血
     */
    respondShan?:boolean;
    /** 此技能可以响应杀，一般用于视为技 */
    respondSha?:boolean;
    /** 
     * 卖血（技能标签）：
     * 用于其他AI检测是否是卖血流(if(target.hasSkillTag('maixie')))。并非加了这个AI就会卖血。
     */
    maixie?:boolean;
    maixie_hp?:boolean;
    /**
     * 无牌（技能标签）：
     * 目前只出现在“连营”和“伤逝”中,用于其它AI检测是否含有标签『无牌』,
     * 从而告诉其他AI不要拆迁(因为生生不息)。
     */
    noh?:boolean,
    notrick?: boolean,
    nosha?: boolean,
    noe2?: boolean,
    reverseEquip?:boolean;
    
    basic?:any;
    tag?:any;
    
    /** 
     * 效果：
     * 影响ai出牌（例如什么时候不出杀）等 
     * 效果值为正代表正效果,反之为负效果,AI会倾向于最大效果的目标/卡牌;
     */
    effect?: {
        target?(card, player, target, current):string|number;
    }
    /** 
     * 收益：
     * 收益值未在AI声明默认为0(对玩家对目标均是如此)。
     * 一般用于主动技
     * 关于收益的算法，待会再详细描述
     */
    result?: {
        /**
         * ai如何选择目标（对目标的收益）：
         * 返回负，选敌人，返回正，选队友;
         * 没有返回值则不选;
         * 注：写了这个就不用写player(player){}了，因为player可以在这里进行判断
         * @param player 
         * @param target 
         */
        target?(player,target):number|void;
        /**
         * ai是否发动此技能（对玩家（自身）的收益）：
         * 返回正，发动，否则不发动
         * @param player 
         */
        player?(player):number;
    }
    /**
     * 视为技专属，ai什么时候可以发动视为技
     * @param player 
     */
    skillTagFilter?(player):boolean;
}

/** 锁定技的配置 */
interface ExModData {
    /**
     * 卡牌是否可弃置
     * @param card 牌
     * @param player 玩家
     */
    cardDiscardable?(card, player):boolean;
    /**
     * 卡牌是否可用
     * cardEnabled一起使用
     * @param card 牌
     * @param player 玩家
     */
    cardEnabled?(card, player): boolean;
    /**
     * 卡牌是否可用
     * 要与cardEnabled一起使用（目前看来两个效果一致）
     * @param card 牌
     * @param player 玩家
     */
    cardUsable?(card, player): boolean;
    /**
     * 卡牌是否可以响应
     * 要与cardEnabled一起使用（目前看来两个效果一致）
     * @param card 牌
     * @param player 玩家
     */
    cardRespondable?(card, player): boolean;
    /**
     * 卡牌是否可以救人
     * 要与cardEnabled一起使用（目前看来两个效果一致）
     * @param card 牌
     * @param player 玩家
     */
    cardSavable?(card, player): boolean;
    /** 在全局的防御范围 */
    globalTo?(from, to, current):number;
    /** 在全局的进攻距离 */
    globalFrom?(from, to, distance):number;
    /** 手牌上限 */
    maxHandcard?(player, num):number;
    /**
     * 选择的目标
     * card：牌；
     * player：玩家；
     * range：
     *      range[1]：目标个数; 
     */
    selectTarget?(card, player, range): void;
    /** 
     * 是否能成为目标 
     * card：牌；
     * player：使用牌的角色；t
     * arget：玩家
     */
    targetEnabled?(card, player, target): boolean;
    /**
     * 可以指定任意目标
     * @param card 牌
     * @param player 玩家
     * @param target 目标
     */
    targetInRange?(card, player, target):boolean;
}

/** 选择按钮配置 */
interface ChooseButtonConfigData {
    /** 
     * 选择内容 （目前只支持寻找卡牌）
     */
    dialog?():any;
    /**
     * 卡牌选择条件
     * @param button 
     * @param player 
     */
    filter?(button, player) :void;
    /**
     * ai如何选牌
     * @param button 
     */
    check?(button):any;
    /**
     * 返回“视为”部分（即当作该选择为视为的操作逻辑）
     * @param links 
     * @param player 
     */
    backup?(links, player): ExSkillData;
    /**
     * 选择时弹出的提示
     * @param links 
     * @param player 
     */
    prompt?(links, player): string;
}

/**
 * 武将包的配置信息
 */
interface CharacterConfigData extends ExCommonConfig {
    /** 该武将包是否可以联机 */
    connect:boolean;

    /** 
     * 武将基本配置信息
     */
    character:SMap<HeroData>;
    /** 武将介绍 */
    characterIntro?:SMap<string>;
    /** 武将标题（用于写称号或注释） */
    characterTitle?:SMap<string>;
    /** 技能 */
    skill:SMap<ExSkillData>;
    /** 珠联璧合武将 */
    perfectPair?:SMap<string[]>;
}

/** 
 * 武将信息:
 * [ 0string,1string,2number,3string[],4string[],.....其他特殊扩展 ]
 * 0："性别",
 * 1："势力",
 * 2：体力,
 * 3：["技能"],
 * 4：[可以保持图片，一些卡片标记，如："zhu","boss",""...,或者一些带前缀的特殊文本，例如：des:xxxx，表示描述]
 */
type HeroData = [string,string,number,string[],string[]];

/**
 * 卡包配置信息
 */
interface CardHolderConfigData extends ExCommonConfig {
    /** 该卡包是否可以联机 */
    connect:boolean;
    /** 卡牌 */
    card:SMap<ExCardData>;
    /** 卡牌技能 */
    skill:SMap<any>;
    /** 牌堆添加 */
    list:string[][];
}

/**
 * 卡牌信息配置
 */
interface ExCardData {
    type: string;
    enable: boolean;
    filterTarget: boolean;
    content:ContentFunc;
    ai: ExAIData,
    fullskin: boolean,

    viewAs?:any,
    /** 当前判断阶段被取消 */
    cancel?:any,
    /** 卡牌效果 */
    effect?:any,

    /**
     * 在lose中使用
     * 若存在则设置在卡牌的destroyed
     */
    destroy?:any,
}

/**
 * 标记显示内容为文本时的返回字符串方法
 */
type IntroContentFun = (storage,player,skill) => string;

/** 扩展回调方法 */
type ExtensionFunc = (lib: Lib, game: Game, ui: UI, get: Get, ai: AI, _status: Status) => ExtensionInfoConfigData;

/**
 * extentsion扩展的配置
 * game.import的回调返回值结构
 */
interface ExtensionInfoConfigData extends ExCommonConfig {
    /** 
     * 是否可编辑该扩展（需要打开显示制作扩展）
     * （都满足条件，则可以开启“编辑此扩展”功能）
     */
    editable:boolean;
    
    /** 
     * 该扩展菜单的扩展 
     * (也是游戏编辑器中的选项代码部分)
     */
    config: SMap<SelectConfigData>;
    
    /**
     * 扩展的包信息
     * （主要是通过系统内部自带编译器编辑的代码，导入逻辑其实基本一致）
     */
    package:PackageData;

    game?:any;
    element?:any;

    skill:SMap<any>;
    card:SMap<any>;
    files:SMap<any[]>;
    
    /**
     * 函数执行时机为游戏数据加载之后、界面加载之前
     * （也是游戏编辑器中的主代码部分）
     * @param config 扩展选/配置
     * @param pack 扩展定义的武将、卡牌和技能等
     */
    content(config, pack):void;
    /**
     * 函数执行时机为游戏数据加载之前，且不受禁用扩展的限制
     * 除添加模式外请慎用
     * （也是游戏编辑器中的启动代码部分）
     * @param data 
     */
    precontent(data):any;
    /** 删除该扩展后调用 */
    onremove():void;
    
    init?():void;
    video?():void;
    arenaReady?():void;
}

/**
 * 玩法模式的扩展配置
 * game.import,type为mode的主要返回结构
 * 
 * 若想扩展一些项目内没有的对象，最好采用以下两种结构加入：
 * 1.数组:[];
 * 2.对象结构：{}
 * 要扩充方法，通过对象结构，都会以lib[新对象结构的key]={对象结构}的方式保存在本地。
 */
interface ExModeConfigData extends ExCommonConfig {
    /**
     * 对应lib.element,
     * 若里面是项目内的同名字段，将覆盖原方法
     */
    element:any,
    /**
     * 对应ai
     */
    ai:any,
    /**
     * 对应ui
     */
    ui:any,
    /**
     * 对应game
     */
    game:any,
    /**
     * 对应get
     */
    get:any,

    /** 技能（主要是放些该模式下特有的技能） */
    skill?:SMap<ExSkillData>;
    /** 
     * 武将包：
     * （主要导入该模式下特有的武将，角色）
     * 主要以一个个包形式导入，每个包包含这该包一系列武将信息
     */
    characterPack?:SMap<SMap<HeroData>>;
    /**
     * 武将分类排序：
     * 整合在该模式下的某些武将排序。
     */
    characterSort?:SMap<SMap<string[]>>;
    /** 卡牌（主要是放些该模式下特有的卡牌） */
    card?:SMap<ExCardData>;
    /** 
     * 卡包：
     * （主要导入该模式下特有的卡牌）
     * 主要以一个个包形式导入，每个包包含这该包一系列卡牌名
     */
    cardPack?:SMap<SMap<string[]>>;

    /**
     * mode的init方法
     * （若有，init是最早启动的方法）
     */
    init?():void;
    /**
     * mode的start启动方法
     */
    start():void;
    /**
     * mode的start启动之前的处理方法
     */
    startBefore?():void;
    /**
     * 重新初始化
     * 在lib.client.reinit中，
     * game.loadModeAsync，读取mode时启用这个初始化。
     * 具体作用：有待考究
     */
    onreinit?():void;

    /** 
     * 可以继续加入更多对象：
     * 这些对象会对应附加在lib中，或替换对应lib位置的对象：
     * 例如：translate，help，skill... ... 或者其他自定义的...
     */
    [key:string]:any;
}


/** 扩展通用配置项 */
interface ExCommonConfig {
    /** 
     * 扩展名
     * （必须要有，程序内检索就是通过这个名字检索的）
     */
    name:string;
    /** 
     * 翻译（本地化）
     * 该扩展使用的常量字符串
     */
    translate:SMap<string>;
    /** 
     * 帮助文本
     * 帮助内容将显示在菜单－选项－帮助中
     * 游戏编辑器的帮助代码部分：
     * 基本示例结构：
     * "帮助条目":"
     *  <ul>
     *      <li>列表1-条目1
     *      <li>列表1-条目2
     *  </ul>
     *  <ol>
     *      <li>列表2-条目1
     *      <li>列表2-条目2
     *  </ul>"
     * 看起来有点奇怪的html文档结构，详细，等参阅代码之后
     * (目前可显示帮助信息：mode，extension，card卡包，character武将包)
     */
    help?:SMap<string>;
}

/** 
 * 扩展的包信息
 * 游戏自带编辑器的代码编辑区域的扩展结构：
 * （主要是通过系统内部自带编译器编辑的代码，导入逻辑其实基本一致）
 */
interface PackageData {
    /** 扩展制作作者名 */
    author:string,
    /** 扩展描述 */
    intro:string,
    /** 讨论地址 */
    diskURL: string,
    /** 网盘地址 */
    forumURL: string,
    /** 扩展版本 */
    version: string,

    /** 武将导入信息 */
    character:CharacterConfigData;
    /** 卡牌导入信息 */
    card:CardHolderConfigData;
    /** 技能导入信息 */
    skill:ExSkillConifgData;
    
    /** 相关文件名（扩展所使用的一些图片） */
    files:{
        character: string[];
        card: string[];
        skill: string[];
    }
}

/** 判断阶段的事件reslut */
interface JudgeResultData {
    card:string,
    number:number,
    suit:string,
    color:string,
    judge:any,
    node:any,
}

type CardAndPlayerFun<T> = (card,player) => T;
type CardPlayerAndTargetFun<T> = (card, player, target) => T;
type CardFun<T> = (card) => T;
type PlayerSkillFun<T> = (player,skill) => T;
type PlayerTargetFun<T> = (player, target) => T;
type NoParamFun<T> = () => T;
type TriggerAndPlayer<T> = () => T;

/**
 * content触发内容：
 * 经过game.createEvent创建事件，设置setContent，
 * 经过lib.init.parse转换，
 * 在game.loop内，传入这些参数调用。
 *  
 */
type ContentFunc = (
    event, 
    step, 
    source, 
    player, 
    target, 
    targets, 
    card, 
    cards, 
    skill, 
    forced, 
    num, 
    trigger, 
    result, 
    _status, 
    lib, 
    game, 
    ui, 
    get, 
    ai
    ) => void;