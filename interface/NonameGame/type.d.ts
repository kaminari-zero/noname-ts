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
     * 技能按钮名字，不写则默认为此技能的翻译（可认为为该技能用于显示的翻译名）
     * 注：用得挺少得，貌似主要是使用翻译得
     */
    name?: string;

    /**
     * 继承
     * 
     * 比较特殊的属性，继承当前技能没有的，而inherit继承技能中有的属性；
     * 其中“audio”属性，尽可能直接继承赋值为inherit的名字；
     * 同时，对应的翻译会覆盖成继承技能的翻译。
     */
    inherit?: string;

    //声音
    /**
     * 配音：
     * 主要分为：audioname（默认技能名），audioinfo（默认info.audio）
     * 
     * 若为字符串时，带有“ext:”，则使用无名杀录目\extension\扩展名内的配音（扩展的配音），命名方法：技能名+这是第几个配音
     * 否则，该字符串指代的是另一个技能的名字，若该技能名存在，则audioinfo为该技能的audio;
     * 若为数组，则是[audioname,audioinfo]，分布覆盖原有的值。
     * audioinfo为数字时，数字为配音数量索引（同一技能有多个配音），从1开始，使用无名杀目录\audio\skill内的配音（audioname1~audioinfo序号）;
     * audioinfo为布尔值true或者字符串非空时，执行game.playSkillAudio(audioname)，使用无名杀目录\audio\skill内的配音;
     *  否则，若为false，空字符串，null结果，则不播音，
     * 若info.audio:true，则使用game.playSkillAudio(audioname)。
     */
    audio?: number | string | boolean | [string, number];
    /** 
     * 指定武将名的音频。
     * 
     * 强制使用该audioname覆盖上面解析出来的audioname，其解析出来的audioname为“audioname_玩家武将名”,
     * 最终路径为：无名杀目录\audio\“audioname_玩家武将名”
     */
    audioname?: string[];
    /** 强制播放音频 */
    forceaudio?: boolean;


    //时机与触发
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

    //基本都在核心createTrigger，addTrigger，trigger中逻辑触发相关，属于重要得属性
    /** 
     * 目前具体不知什么功能，当前所知，非常重要，和createTrigger，addTrigger，trigger相关
     * （推测，这属性是指明客户端是否显示该技能的操作按钮）
     * 
     * 当设置了该值为true，若forced没设置到，则默认为true；
     *  若popup没设置到，则默认为false；
     */
    silent?:boolean;
    /** 
     * 目前具体不清楚什么功能，当前所知，也是个很重要得属性，估计是托管时是否触发得标记
     * 功能相当于forced+nopop ,会不会是被托管时的标记呢，正在验证
     */
    direct?: boolean;
    /**
     * 此技能是否可以被设置为自动发动（不询问）
     * 
     * 设置了该属性的技能，可加入到配置选项中，自己设置是否自动发动（即该技能非必发技能）
     * 若该属性值是“check”，则调用当前技能得check方法检测
     */
    frequent?: boolean | string |TwoParmFun<Trigger,Player,boolean>;
    /** 
     * 此技能是否可以被设置为自动发动2 
     * 可以细分当前技能强制发动选项，（应该是为了细分子技能），保存到lib.config.autoskilllist，
     * 在ui.click.autoskill2中执行
     */
    subfrequent?:string[];
    /**
     * 自动延迟的时间
     * 可以影响技能触发响应时机（主要影响loop之间的时间,即game.delayx的调用情况）
     */
    autodelay?: boolean | number | TwoParmFun<Trigger,Player,number>;
    /** 
     * 此技能是否能固定触发（即自动发动）。
     * 
     * true为固定触发（可视为一种锁定技的，锁定技实质是mod里的技能）
     * 国战可以触发亮将。
     */
    forced?: boolean;
    /**
     * 取消触发后的处理
     * 在createTrigger中step 3处理
     * @param trigger 
     * @param player 
     */
    oncancel?(trigger: Trigger, player:Player): void;
    /** 
     * 每回合限制使用次数
     * 
     * （若限制使用次数为变量时需写在filter内，即通过filter与变量动态判断） 
     * 主要在createTrigger，step3中触发计数。
     * 触发计数，会在玩家身上添加“counttrigger”技能，计数记录在：player.storage.counttrigger[当前技能名]
     */
    usable?: number;
    /** 暂时不明，应该和card的该属性是一样意思，估计是死亡后是否强制发动的技能 */
    forceDie?:boolean;
    /** 
     * 是否触发可以弹出选择技能的发动
     * 
     * 用于在arrangeTrigger过滤出多个同时机的触发技能时，在createTrigger中，询问玩家的技能发动
     */
    popup?: boolean;
    /**
     * 之后处理方法
     * 在createTrigger中最终步骤中，需要当前没有hookTrigger配置才调用到
     * 若返回true时，会触发“triggerAfter”
     * @param event 
     * @param player 
     * @param triggername 
     */
    after?(event:GameEvent, player:Player, triggername:string): boolean;

    //触发内容基本触发流程
    /**
     * 在content之前执行
     * 
     * 在chooseToUse，step2中执行：
     *  其执行时机和chooseButton一致，当chooseButton不存在时且game.online为false，则会执行这个
     * @param config 
     */
    precontent?: ContentFunc;
    /**
     * 在content之前触发内容
     * 在useSkill中使用，主动触发技能content之前
     */
    contentBefore?: ContentFunc;
    /**
     * 触发内容（技能内容）
     * 
     * 作为被动触发技能：
     *  在createTrigger，step3中创建当前技能的事件，设置该content为事件content作为触发内容；
     * 作为主动触发技能：
     *  在useSkill中创建当前技能的事件
     * 分步执行(通过step x分割开执行逻辑步骤)
     */
    content?: ContentFunc;
    /**
     * 在content之后触发内容
     * 在useSkill中使用，主动触发技能content之后
     */
    contentAfter?: ContentFunc;


    //技能初始化与移除：
    /**
     * 获得技能时发动
     * @param player 
     */
    init?(player:Player): void;
    /** 在addSkill中调用 */
    init2?(player:Player,skill:Skill):void;
    /** 在执行player.disableSkill丧失技能时，若该属性为true，则执行技能的onremove */
    ondisable?: boolean;
    /**
     * 失去技能时发动
     * 当值为string时:
     *  若为“storage”，删除player.storage中该技能的缓存；
     *  若为“discard”，若player.storage[skill]缓存的是卡牌时，执行game.cardsDiscard，并播放丢牌动画，然后移除player.storage[skill]；
     *  若为“lose”，和“discard”差不多，不过不播丢牌动画；
     * 当值为true时，都是直接移除player.storage[skill]；
     * 当值为字符串集合时，则是删除集合中对应player.storage（即删除多个指定storage）
     */
    onremove?: TwoParmFun<Player,Skill,void> | string | string[] | boolean;
    /** 是否持续的附加技能，在removeSkill中使用 */
    keepSkill?:boolean;


    //以下3个属性基本功能时一致：在某些模式下是否能使用，只使用一个就差不多
    /**
     * 指定该技能在哪些模式下禁用
     * 
     * 注：在指定模式被禁用的技能，会被设置成空对象，并且“技能_info”的描述变成“此模式下不可用”。
     */
    forbid?:string[];
    /** 与forbid相反，只能在指定玩法模式下才能被使用，其他逻辑一致 */
    mode?:string[];
    /** 当前模式下是否能使用，返回false则不能使用，其实和forbid逻辑一致 */
    available?(mode:string):boolean;


    //技能相关设置：
    /** 
     * 技能组：
     * 拥有这个技能时相当于拥有技能组内的技能
     * 注：一些特殊技能标签：
     * “undist”：不计入距离的计算且不能使用牌且不是牌的合法目标
     *  （被隔离玩家，目前确定的作用：player.getNext获取下一位玩家，player.getPrevious确定上一位玩家，player.distance计算玩家距离）；
     */
    group?: string[];
    /** 
     * 子技能：
     * 你不会拥有写在这里面的技能，可以调用，可以用技能组联系起来;
     * 子技能名字：“主技能_子技能”，翻译为主技能翻译
     * 
     * 注：子技能，会被视为“技能_子技能”独立保存起来。
     */
    subSkill?: SMap<ExSkillData>;
    /**
     * 全局技能?:
     * 你拥有此技能时，所有角色拥有此技能（global的值为技能名）
     * 注：无论是否拥有此技能，此技能都为全局技能写法：技能名前+_
     */
    global?: string;
    globalSilent?: boolean;
    

    //技能相关设置=>功能设置
    /** 
     * 目前还没确定具体，应该是一场游戏中，能使用的次数
     * 
     * 设置了该属性，会创建一个“技能名_roundcount”技能，将其加入group（技能组）中；
     * 该技能的触发阶段“roundStart”（一轮的开始），用于记录当前技能的在一轮中使用的次数
     */
    round?: number;
    /** 用于“技能名_roundcount”技能中，当前技能不可使用时，“n轮后”xxx，中xxx的部分显示（即后面部分） */
    roundtext?: string;
    /** 增加显示的信息，这部分时增加，“n轮后”前面部分 */
    addintro?(storage: SMap<any>, player: Player): string;
    /** 
     * 指定位置：
     * 'h'：手牌区, 'e'：装备区, 'j'：判定区 
     */
    position?: string;
    /** 延迟的时间 */
    delay?: number;
    /** 同时机技能发动的优先度 */
    priority?: number;
    /** 是否可以被“封印”（内置技能“fengyin”）的技能，取值为false时，get.is.locked返回为false；true则正常逻辑 */
    locked?: boolean;
    /** 是否是旧版技能，值为true，添加到lib.config.vintageSkills中，可以实现新/旧版技能切换 */
    alter?:boolean;
    

    //锁定技
    /** 锁定技 */
    mod?: ExModData;


    //限定技与觉醒技
    /**
     * 限定技（标记）
     * 
     * 该标记为true时，若没有设置以下内容，则会自动设置：
     *  mark设置为true；
     *  intro.content设置为“limited”；
     *  skillAnimation设置为true；
     *  init设置为初始化玩家缓存的该技能名标记为false；
     */
    limited?:boolean;
    /** 
     * 获得技能时是否显示此标记，
     * 若为false，可以用markSkill()来显示此标记
     */
    mark?: boolean;
    /** 标记显示内容 */
    intro?: {
        /** 
         * 标记显示内容？
         * 为cards时显示标记内的牌.
         * 
         * 当标记显示内容是文本时，
         * 例：标记显示内容为当前有多少个标记
         */
        content: string | IntroContentFun;
        markcount?: number | TwoParmFun<any, Player, number>;
        /** 是否不启用技能标记计数 */
        nocount?: boolean;
        /**
         * 移除该标记时，在unmarkSkill执行
         * 若值为字符串“throw”，该玩家缓存中该技能标记的为牌时，播放丢牌动画；
         * 若是方法，则直接使用该回调方法处理。
         */
        onunmark?: TwoParmFun<any, Player, void> | string;
    };
    /** 
     * 是否开启觉醒动画
     * 
     * 准备来说，常用于觉醒动画，实际是指技能动画
     * 字符串时取值：epic，legend
     */
    skillAnimation?: boolean|string;
    /** 是否只显示文字特效 */
    textAnimation?:boolean;
    /** 觉醒文字 */
    animationStr?: string;
    /** 觉醒文字颜色 */
    animationColor?: string;
    /** 标记显示文本，一般为一个字 */
    marktext?: string;

    //主公技
    /** 
     * 是否为主公技：
     * true时，将这个技能设置为主公技 
     */
    zhuSkill?: boolean;

    //主动技能（主动使用技能，包含技能使用的相关操作配置）
    /** 
     * 可使用的阶段 
     * 一般用于主动技能
     */
    enable?: string | string[];
    /**
     * 是否显示弹出该技能使用卡牌的文字
     * 
     * useCard中使用，
     * 若为true的话，则执行player.popup
     * 例如：player.popup({使用卡牌名name，使用卡牌nature}，'metal')
     */
    popname?: boolean;

    //视为技（转换卡牌的技能）
    /**
     * (视为)目标卡牌
     * 一般用于视为技能
     */
    viewAs?: string | CardBaseUIData;
    /**
     * 视为技按钮出现条件（即发动条件）
     * @param player 
     */
    viewAsFilter?(player:Player): boolean;
    /**
     * 使用视为牌时触发内容。
     * result.cards是视为前的牌
     * @param result 
     * @param player 
     */
    onuse?(result, player:Player): void;
    /**
     * 选择按钮（牌）
     */
    chooseButton?: ChooseButtonConfigData;
    /**
     * 源技能
     * (该属性应该是动态生成的,用于记录执行backup的技能名，即执行backup的视为技能，实质是执行本技能)
     * 
     * 在chooseToUse，step1中使用，若有，将器添加到event._aiexclude中；
     * 目前来看，该字段不是配置进去的，而是chooseToUse，step3中，执行chooseButton的backup方法，
     * 返回一个新的“视为”技能：“技能名_backup”，并设置到lib.skill中，
     * 并且将技能名作为该技能的源技能设置到这个新技能的sourceSkill中。
     */
    sourceSkill?: string;


    //具体功能的处理
    //目标
    /**
     * 需要选择多少张牌才能发动
     * 选择的牌数
     * -1时，选择所有牌,否则就是指定数量的牌
     * 数组时，这个数组就是选择牌数的区间
     * 为变量时（具体情况具体分析），例：()=>number
     */
    selectCard?: number | number[] | OneParmFun<Card,number>;
    /**
     * 需要选择多少个目标才能发动
     * 选择的目标数：
     * 为-1时，选择全部人
     * 为数组时，这个数组就是选择目标数的区间
     */
    selectTarget?: number | number[];
    /**
     * 选择的牌需要满足的条件
     * 可以使用键值对的简便写法
     * 也可以使用函数返回值（推荐）
     */
    filterCard?: SMap<string> | OneParmFun<Card, boolean>;
    /**
     * 过滤发动条件，返回true则可以发动此技能
     * 主要在filterTrigger中处理
     * @param event 事件 相当于trigger时机
     * @param player 
     */
    filter(event: Trigger, player: Player): boolean;
    /**
     * 选择的目标需要满足的条件
     * @param card 
     * @param player 
     * @param target 
     */
    filterTarget(card: Card, player: Player, target: Target): boolean;
    /**
     * 选择的目标武将牌上出现什么字，
     * 数组第几元素对应第几个目标
     */
    targetprompt?: string[];
    /**
     * 选择时弹出的提示
     */
    prompt?: string | TwoParmFun<Links, Player, string>;
    /**
     * 二次提示，主要显示的时机暂未明确
     * 若是boolean类型，则使用lib.translate[“技能名_info”]的描述
     */
    prompt2?: string | TwoParmFun<Links, Player, string> | boolean;
    /** 
     * 在ui.click.skill中使用，若当前event.skillDialog不存在，可以用该方法生成的文本的dialog作为skillDialog；
     * 若没有该方法，可以使用翻译中该技能的info信息代替。
     */
    promptfunc?:TwoParmFun<Trigger,Player,String>;
    /** 似乎没用上，作用是使skillDialog.forcebutton为true */
    longprompt?:boolean;
    /**
     * 是否每个目标都结算一次(多个目标)
     * true为否
     */
    multitarget?: boolean | number;
    /**
     * 指向线的颜色枚举：
     * fire（橙红色FF9244），thunder（浅蓝色8DD8FF），green（青色8DFFD8），
     */
    line?: string;
    /** 是否显示多条指引线 */
    multiline?: boolean;
    
    /**
     * 在filterTrigger中执行，过滤发动条件，和filter有些类似，具体功能稍后分析
     * @param event 
     * @param player 
     * @param name 
     * @param skill 
     */
    block?(event:Trigger, player:Player, name:string, skill:Skill): void;

    /**
     * 选中该技能使用时,进行处理
     * 在chooseToUse 的content中调用，
     * 目前参考的例子中，大多数多是用于添加一些牌到待选择到event.set(key，收集的牌)中，
     * 用于使用前先选牌的效果
     * 注：其调用时机应该远早于触发技能的，在选中牌时就开始处理。
     * @param event 
     */
    onChooseToUse?(event:Trigger): void;

    /**
     * 在chooseToCompare和chooseToCompareMultiple，step2中使用，返回玩家用于的拼点的牌
     * @param player 
     */
    onCompare?(player:Player):Card[];


    //弃牌，失去牌
    /**
     * 是否弃牌
     * 
     * 在useSkill中调用，
     * 选择牌发动技能后，被选择的牌都要弃置
     * 取值false（因为undefined != false结果为true，故默认不填和true效果一致）
     */
    discard?: boolean;
    /** 
     * 是否失去牌（是否调用player.lose）
     * 
     * 与discard调用时机一致，都在useSkill中，
     * 取值为false
     */
    lose?: boolean;
    /** 
     * 是否触发lose失去牌阶段
     * 
     * 取值false；
     * 若为false，则跳过该触发
     * 适合lose绑定一起使用，为false时，设置丢失牌事件_triggered为null
     */
    losetrigger?: boolean;
    /**
     * 不弃牌，准备用这些牌来干什么
     * 
     * 其字符串枚举有：
     * give，give2，throw，throw2
     * 若不是字符串，则执行该方法
     */
    prepare?: string | ThreeParmFun<Card[],Player,Target[],string>;


    /** 
     * 技能响应前处理(非联机时，不在线时处理，估计时用于自动响应)
     * 
     * 在chooseToRespond中使用
     */
    prerespond?(result, player:Player): void;
    /** 
     * 技能响应(非联机时，不在线时处理，估计时用于自动响应)
     * 
     * 在respond中使用
     */
    onrespond?(event:Trigger, player:Player): void;

    /**
     * 是否检测隐藏的卡牌
     * 
     * 目前game.js中，只用于hasWuxie，用于检测在“木牛流马”中隐藏的“无懈”；
     * 该方法应该可以给类似作用，但是“木牛”有点破坏原来的逻辑，整体逻辑不重置一下的话，估计以后还会加上其他奇怪的东西
     * @param player 
     * @param name 
     */
    hiddenCard?(player:Player,name:string):boolean;

    /** 录像相关，game.videoContent.skill中相关 */
    video?(player:Player,data:string|any[]):void;

    process?(player:Player):void;

    //在skillDisabled中，根据以下5个属性，检测技能是否是不能使用（若其中有一个时true都排除掉），在chooseSkill,选择获得技能时筛选列表
    //在getStockSkills中，有前3个标签属性的技能也是无法获取的
    /** 唯一？，在skillintro中使用 */
    unique?:boolean;
    /** 临时技能，，在die死亡时，会被移除 */
    temp?:boolean;
    /** 非配置，是subSkill，会标记该属性为true */
    sub?:boolean;
    /** 固有技，不能被removeSkill移除 */
    fixed?:boolean;
    /** 一次性技能，在resetSkills时，直接移除该技能 */
    vanish?:boolean;
    
    /** 作用不明，并没有什么用，在clearSkills中使用 */
    charlotte?:boolean;
    /** 作用不明，并没有什么用，与ui相关，在skillintro中使用,值为true */
    gainable?:boolean;
    /** 在nodeintro中使用，添加classname:thundertext,值为true */
    thundertext?:boolean;

    //在nodeintro中使用的（这几个配置都没什么意义）
    /** 设置nodeintro的点击事件 */
    clickable?(player:Player):void;
    /** 过滤点击，应该是过滤弹出面板是否能点击，具体作用日后细究 */
    clickableFilter?(player:Player):boolean;
    /** 输出内容不带【】括号 */
    nobracket?:boolean;
    
    //日志，提示
    logv?: boolean;
    /**
     * 显示日志的标记
     * 若值为“notarget”，则显示出对目标相关描述的日志
     */
    log?: string;
    /**
     * player是否logSkill('此技能').
     * true为不
     */
    nopop?: boolean;
    /**
     * 阶段日志
     * 配置一个触发阶段，或者一个方法直接返回文本
     * 若没有配置prompt，显示该配置的提示
     */
    logTarget?:string|TwoParmFun<Trigger,Player,string>;
    /** 
     * 暂不知具体有什么用，取值为false，在createTrigger，step3中使用，
     * 目前看来是使用line属性，作为logSkill日志的颜色 
     */
    logLine?:boolean;
    
    

    //技能的信息显示：
    /**
     * 内容描述
     * 
     * 在addCard时，设置“技能名_info”的翻译；
     * 若时subSkill子技能，则设置“技能名_子技能名_info”的翻译；
     */
    description?:string;
    /** 
     * 来源：
     * 貌似时联机用的，具体还没确定
     */
    derivation?: string[] | string;

    //AI相关
    ai?: ExAIData;
    /** 
     * ai如何选牌
     */
    check?(card): boolean;
    /**
     * 告诉ai是否发动这个技能
     * 返回true则发动此技能
     * @param event 
     * @param player 
     */
    check?(event, player): boolean;
    /**
     * 第一个参数好想有些不一样：event，card,子技能button
     * @param arg 
     */
    check?(...arg): any;

    //event.bakcup设置的信息
    /*
    filterButton
    selectButton
    filterTarget
    selectTarget
    filterCard
    selectCard
    position
    complexSelect?:boolean;
    complexCard?:boolean;
    complexTarget
    ai1
    ai2
    */
    //日后还有很多属性要添加的
    [key:string]:any;
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
    order?: number|NoneParmFum<number>,
    /** 
     * 发动技能是身份暴露度（0~1，相当于概率）
     * 取值范围为0~1,用于帮助AI判断身份,AI中未写expose其他AI将会无法判断其身份
     */
    expose?:number;
    /** 
     * 嘲讽值：
     * 嘲讽值越大的角色越容易遭受到敌方的攻击,默认为1,一般在0~4中取值即可(缔盟threaten值为3)
     */
    threaten?: number | TwoParmFun<Player,Target,number>; 
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
    noLose?: boolean;
    
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

    //日后还有很多属性要添加的
    [key: string]: any;
}

/** 锁定技的配置 */
interface ExModData {
    /**
     * 卡牌是否可弃置
     * @param card:Card 牌
     * @param player:Player 玩家
     */
    cardDiscardable?(card:Card, player:Player):boolean;
    /**
     * 卡牌是否可用
     * cardEnabled一起使用
     * @param card:Card 牌
     * @param player:Player 玩家
     */
    cardEnabled?(card:Card, player:Player): boolean;
    /**
     * 卡牌是否可用
     * 要与cardEnabled一起使用（目前看来两个效果一致）
     * @param card:Card 牌
     * @param player:Player 玩家
     */
    cardUsable?(card:Card, player:Player): boolean;
    /**
     * 卡牌是否可以响应
     * 要与cardEnabled一起使用（目前看来两个效果一致）
     * @param card:Card 牌
     * @param player:Player 玩家
     */
    cardRespondable?(card:Card, player:Player): boolean;
    /**
     * 卡牌是否可以救人
     * 要与cardEnabled一起使用（目前看来两个效果一致）
     * 注：还是和cardEnabled不同，设置了该mod检测，只要是在_save，濒死求救阶段，都可以触发；
     *  不过前提，可能还是要通过该阶段的cardEnabled的检测，目前还没确定，日后再做分析
     * @param card:Card 牌
     * @param player:Player 玩家
     */
    cardSavable?(card:Card, player:Player): boolean;
    /** 在全局的防御范围 */
    globalTo?(from: Player, to: Player, current):number;
    /** 在全局的进攻距离 */
    globalFrom?(from: Player, to: Player, distance):number;
    /** 手牌上限 */
    maxHandcard?(player:Player, num:number):number;
    /**
     * 选择的目标
     * card：牌；
     * player：玩家；
     * range：
     *      range[1]：目标个数; 
     */
    selectTarget?(card:Card, player:Player, range:Select): void;

    /**
     * 该卡牌的发动源玩家是否能使用该卡牌（该角色是否能使用该牌）
     * @param card:Card 
     * @param player:Player 源玩家（使用牌的角色）
     * @param target:Target 目标玩家
     */
    playerEnabled(card:Card, player:Player, target:Target):boolean;
    /** 
     * 是否能成为目标 
     * card：牌；
     * player：使用牌的角色；
     * target：玩家
     */
    targetEnabled?(card:Card, player:Player, target:Target): boolean;

    /**
     * 可以指定任意（范围内）目标
     * @param card:Card 牌
     * @param player:Player 玩家
     * @param target:Target 目标
     */
    targetInRange?(card:Card, player:Player, target:Target):boolean|number;
    /**
     * 弃牌阶段时，忽略的手牌
     * @param card:Card 
     * @param player:Player 
     */
    ignoredHandcard?(card:Card, player:Player):boolean;

    /** 过滤可以被丢弃的牌 */
    canBeDiscarded?(card:Card,player:Player,target:Target,eventName:string):boolean;
    /** 过滤可以获得的牌 */
    canBeGained?(card:Card,player:Player,target:Target,eventName:string):boolean;

    /**
     * 改变花色
     */
    suit?(card: Card,suit:string):string;
    /**
     * 改变判断结果
     * 
     * 注：目前似乎没有用到该mod.改变结果不影响判定的牌结果，影响判定的最终结果，即之后判定牌的effect会受该结果影响
     * @param player 
     * @param result 
     */
    judge?(player: Player, result: JudgeResultData);

    //无懈相关：主要在_wuxie中，（此时应时无懈询问阶段），检测触发卡牌以下对应mod
    /*
        主要参数解析：
            card:trigger.card 触发该无懈阶段的卡牌；
            player:当前事件的玩家（应该也是触发该阶段的玩家）
            target:trigger.target 触发该无懈阶段的卡牌的玩家；
            current:当前game.filterPlayer，遍历过滤检测可以发动无懈的每一个玩家（即当前过滤检测中的玩家）
    */
    //触发阶段为:phaseJudge(判定阶段)
    /** 是否能在判定阶段使用无懈 */
    wuxieJudgeEnabled?(card: Card, player: Player, current: Current):boolean;
    /** 是否能在判定阶段响应无懈 */
    wuxieJudgeRespondable?(card: Card, player: Player, current: Current):boolean;
    //非判定阶段触发
    /** 是否能使用无懈 */
    wuxieEnabled?(card: Card, player: Player, target: Target, current: Current):boolean;
    /** 是否能响应无懈 */
    wuxieRespondable?(card: Card, player: Player, target: Target, current: Current):boolean;
}

/** 选择按钮配置 */
interface ChooseButtonConfigData {
    /** 
     * 选择内容 
     * 返回传递给player.chooseButton的参数
     */
    dialog?(event:GameEvent,player:Player):Dialog;
    /**
     * 卡牌选择条件
     * @param button 
     * @param player 
     */
    filter?(button:Button, player:Player) :void;
    /**
     * ai如何选牌
     * @param button 
     */
    check?(button:Button):number;
    /**
     * 返回“视为”部分（即当作该选择为视为的操作逻辑）
     * @param links result.links（由get.links获得，一般是指当前面板上的所有可选择按钮的link数据,一般为卡牌信息）
     * @param player 
     */
    backup?(links:Links, player:Player): ExCardData;
    /**
     * 选择时弹出的提示
     * @param links result.links（由get.links获得，一般是指当前面板上的所有可选择按钮的link数据,一般为卡牌信息）
     * @param player 
     */
    prompt?(links:Links, player:Player): string;
    /** 选择数目，默认为1 */
    select?:number;
}

/**
 * 武将包的配置信息
 */
interface CharacterConfigData extends ExCommonConfig {
    /** 该武将包是否可以联机 */
    connect:boolean;
    /** 联机武将禁用列表 */
    connectBanned?:string[];

    /** 
     * 武将基本配置信息
     */
    character:SMap<HeroData>;
    /** 武将介绍 */
    characterIntro?:SMap<string>;
    /** 武将标题（用于写称号或注释） */
    characterTitle?:SMap<string>;
    /** 技能 */
    skill?:SMap<ExSkillData>;
    /** 珠联璧合武将 */
    perfectPair?:SMap<string[]>;
    /** 指定武将的过滤方法（传入一个mode，用于过滤玩法模式） */
    characterFilter?:SMap<OneParmFun<string,boolean>>;
    /** 用于筛选（具体日后讨论） */
    characterSort?:SMap<SMap<string[]>>;
    
    /** 该武将包独有的卡牌（或者是特殊卡牌） */
    card?:SMap<ExCardData>;
    /** 定义自定义卡牌类型的排序用的优先级 */
    cardType?:SMap<number>;
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
    skill:SMap<ExSkillData>;
    /** 牌堆添加 */
    list:CardBaseData[];
}

/**
 * 卡牌基础配置信息(记录与牌堆list中基本结构)：
 * 0：花色
 * 1：数字
 * 2：名字
 * 3：伤害属性
 * 4........暂时没看见，有也是额外扩展
 */
type CardBaseData = [string,number,string,string];

/**
 * 联网模式下卡牌基础配置信息
 * 0:卡牌的唯一id
 * 其余和上面一致
 */
type CardBaseOLData = [string,string,number,string,string];

/**
 * 卡牌信息配置
 */
interface ExCardData {

    //UI方面的:
    /** 
     * 指定独立设置该卡牌的背景（卡面）
     * 可指定设置成其他卡牌的卡面（这样游戏会优先使用指定卡片名的image，默认使用当前卡片名的image）
     */
    cardimage?:string;
    /** 
     * 卡牌的卡面
     * 注：需要fullskin为true
     * 带“ext:”前缀的，其文件夹路径：extension/卡牌的image
     *  没有，则路径是：卡牌的image
     * 若值为“background”：则调用setBackground，设置对应类型的卡面；
     * 若值为“card”：..........
     * 注：判断比较复杂，有优先级顺序，之后在独立详细讨论
     */
    image?:string;
    /** 核心属性，似乎大多都有，为true，具体时什么待后再研究 （目前来看，fullskin添加得图片后缀是png） */
    fullskin?:boolean;
    /** 添加class：fullimage （目前来看，fullimage添加得图片后缀是jpg）*/
    fullimage?:string;
    /**
     * 设置边框
     * 其值：gold，silver
     */
    fullborder?:string;
    /*
     * 指定mode玩法时显示的图片
     * 注：没有指定到image
     * 若有，路径：'image/mode/'+该卡牌modeimage+'/card/'+卡牌名+'.png'；
     * 否则，路径：'image/card/'+卡牌名'.png'
     */
    modeimage?:string;
    /** 是否不显示名字，true为不显示 */
    noname?:boolean;
    /** 设置卡牌背景颜色 */
    color?:string;
    /** 设置阴影，例：'black 0 0 2px' */
    textShadow?:string;
    /** 设置信息，名字的透明度 */
    opacity?:number;
    /**
     * 自定义info（显示花色，数字部分），没有则默认“花色 数字”
     * 注：设置的是html片段
     */
    modinfo?:string;
    /** 
     * 增加额外显示的info
     * 注：设置的是html片段，若没有则删除该区域（去区域是卡片的右下角，原用于显示范围，若有会和这部分抢位置）
     */
    addinfo?:string;
    //有这些属性，便添加对应标签（估计是给炉石用的）
    /** 史诗 */
    epic?:boolean;
    /** 创奇 */
    legend?: boolean;
    /** 黄金 */
    gold?: boolean;
    /** 唯一（可以表示品质，也可以作为“专属”，“特殊”装备的标记） */
    unique?: boolean;
    
    //一般是再创建卡牌时使用，指定该卡牌应该拥有什么属性
    /** 指定卡牌颜色：'heart','diamond','club','spade'，'black'，'red' */
    cardcolor?:string;
    /** 指定卡牌的伤害属性 */
    cardnature?:string;

    //功能上（也影响UI）
    /** 类型 */
    type?: string;
    /** 子类型 */
    subtype?:string;

    /**
     * 全局技能
     * 该卡牌的技能属于全局技能
     * 若有，则执行game.addGlobalSkill，添加进去
     */
    global?:string|string[];
    /**
     * 卡牌初始化方法
     * 注：先执行完lib.element.card.inits列表的方法，再执行该方法
     */
    init?():void;

    /**
     * 是否能使用
     * 
     * （优先级上，应该是enable高于usable，待日后具体观察代码）
     * 主要在player.cardEnabled中使用，先“cardEnabled”mod检测，再到该属性
     * 
     * 注：当前type为“equip”或者“delay”，不设置该属性则默认true。
     */
    enable?: boolean|ThreeParmFun<Card,Player,GameEvent,boolean>;
    /**
     * 可使用次数（每回合）
     * 
     * 主要再player.getCardUsable,player.cardUsable中使用，主要是获取次数后，再通过“cardUsable”mod检测
     */
    usable?: number|TwoParmFun<Card,Player,number>;
    /** 
     * 是对自己使用?（可能不是这个意思，而是是否来自自己？玩家自己是否能使用？）
     * 
     * 主要再player.filterCard中使用；
     * 该值不存在时，默认为true（貌似设不设置true，意义都不大，目前没见到设置false）
     */
    toself?:boolean;
    /**
     * 是否指定目标
     * 
     * 在lib.filter.targetEnabled使用，优先“playerEnabled”mod检测
     * 
     * 注：若当前type为“equip”，该属性不存在，则设置一个目标为自己的过滤方法；
     *      若当前type为“delay”，该属性不存在，则默认设置为lib.filter.judge。
     */
    filterTarget: boolean|ThreeParmFun<Card,Player,Target,boolean>;
    /**
     * 单一目标的卡（依次指定单一目标）
     * 
     * (真实意思应该不是这样的，应该是指，当前卡牌需要selectTarget指定多个目标，
     * 指一个目标，另一个目标这样子，用于将其分多次单一目标选择)
     */
    singleCard?:boolean;

    /**
     * 需要选择多少个目标才能发动
     * 选择的目标数：
     * 为-1时，选择全部人
     * 为数组时，这个数组就是选择目标数的区间
     * 
     * 在chooseUseTarget ，选择使用目标事件中
     * 在player.selectTarget,要经过“selectTarget”mod检测
     * 
     * 注：当前filterTarget，该属性不存在，则默认设置1；
     *     若当前type为“equip”，且filterTarget与该属性都不存在，则设置为-1。
     */
    selectTarget?:number|[number,number]|TwoParmFun<Card,Player,boolean>;
    /**
     * 是否需要指定目标
     * true为不需要（即无需选择目标，对所有玩家？ 又或者是，该卡牌不是对玩家使用的）
     */
    notarget?: boolean;
    /**
     * 是否可以多目标
     * （值为：1，true）
     */
    multitarget?: number|boolean;
    /** 是否可以连环多个目标 */
    multiline?:boolean;

    //疑惑中，使用率超高，但是具体意思不明确：1.是否是强制不死亡？2.是否是死亡时可以强制使用的技能，卡牌
    //不为true时（默认不标记该标记时），标记event.forceDie为true；
    noForceDie?:boolean;
    //为true时
    forceDie?:boolean;

    // targetDelay?:boolean;//没有用上
    // nodelay?: boolean;  //基本没用上
    /** 
     * 过滤是否有不能确定的目标
     * 在useCard  step9  即将准备构造该卡牌的事件前使用。
     */
    ignoreTarget?(card:Card, player:Player, target:Target):boolean;

    /**
     * 多目标检测？(用的较少)
     * 在player.canUse中执行，该方法结果为false，则canUse返回false
     * @param card 
     * @param player 
     */
    multicheck?(card: Card, player: Player): boolean;

    /**
     * 是否能成为该牌的目标？
     * 
     * （目前不是很确定,正常情况下默认为true，或者设置一个过滤方法）
     * 在targetEnabled2，targetEnabled3中使用
     * 
     * 注：type为“equip”，正常情况下，该值未设置，会默认为true。
     */
    modTarget?: boolean | ThreeParmFun<Card, Player, Target, boolean>;

    /**
     * 该卡牌是否为“复杂”目标
     * （例如：铁索，借刀这类不是单纯自己指定玩家发动，而是选择多个目标之间发动？目前为止时这样理解，日后详细解答）
     * 在game.check钟使用，若为true，则先跳过当前event.filterTarget判断
     */
    complexTarget?:boolean;
    /**
     * 允许多目标？
     * 
     * 注：若type为“equip”或“delay”，若没有，则默认false。
     */    
    allowMultiple?:boolean;

    /**
     * 过滤是否能发出创建“装备上该卡牌”事件：“'equip_'+card.name”（暂时没用上）
     * 在equip  step5  过滤是否创建事件
     * @param card 
     * @param player 
     */
    filterEquip?(card:Card, player:Player):boolean;
    /**
     * 装备上该卡牌的content（可以触发同一名字事件多次，但是目前没有这样使用）
     */
    onEquip?: ContentFunc | ContentFunc[];
    /** 动画相关，延时用的，其值指定时false，非false无效（作用不大，后续观察） */
    equipDelay?:boolean;
    /** 
     * 在removeEquipTrigger中使用，
     * 其值为true时，在移除后，若该属性为true且onLose存在，则创建“lose_卡牌名”事件，设置onLose为content
     */
    clearLose?: boolean;

    /**
     * 视为指定牌
     */
    viewAs?: CardBaseUIData;
    /** 
     * 自动视为该指定牌 
     * 
     * 主要在get.autoViewAs中使用
     */
    autoViewAs?: string;

    /** 只可在以下指定mode使用（不指定应该是都可用） */
    mode?: string[];


    /**
     * 卡牌所拥有的技能列表。
     * 
     * 在player.addEquipTrigger执行，将这些技能全部player.addSkillTrigger加入到技能触发中
     * 其触发的地方还有：$equip，removeEquipTrigger
     */
    skills?:string[];

    /**
     * 应该是在执行该卡牌content之前执行的事件content
     */
    contentBefore?(player, targets): ContentFunc;
    /**
     * 核心：触发内容
     * 
     * 注：若type为“equip”，若没设置，则默认使用lib.element.content.equipCard（装备该卡牌）；
     *      若type为“delay”，若没设置，则默认使用lib.element.content.addJudgeCard（为目标设置判定牌）
     */
    content: ContentFunc;
    /**
     * 应该是在执行该卡牌content之后执行的事件content
     */
    contentAfter?(): ContentFunc;

    /** 不知有什么用，在useCard使用，需要在versus对决模式中 */
    reverseOrder?: boolean;

    /**
     * 是否能救人
     * 
     * 在之前，需要进行“cardSavable”mod检测，若通过，可以进行救人
     * 若是方法，其中，第三个参数为当前_save，濒死求桃的濒死玩家
     * 注：该参数主要使用在_save，濒死求桃阶段
     */
    savable?:boolean|ThreeParmFun<Card,Player,Target,boolean>;

    /**
     * 是否能“重铸”
     * 
     * 在“_chongzhu”中使用
     */
    chongzhu?:boolean|TwoParmFun<GameEvent,Player,boolean>;

    /**
     * 判断是否通过判断条件（判定牌）
     * @param card 
     */
    judge?: OneParmFun<Card, number>;
    /** 
     * 判断卡牌（判断失败后）的效果
     * 
     * 在phaseJudge（判断阶段）的step2中，当前事件非取消，正常情况下，创建该判定卡牌事件，content为effect，
     * 设置当前事件的_result为新事件的_result（一般情况下result.bool==false失败时触发效果）
     */
    effect?: ContentFunc;  
    /** 
     * 当前判断牌事件被取消 
     * 
     * 创建 “卡牌名”+“Cancel” 事件，设置content为该cancel
     */
    cancel?: ContentFunc;

    /** 范围（主要用于非武器牌范围：基础，锦囊，延时锦囊...） */
    range?:RangeData;
    /** 超出范围？ */
    outrange?:RangeData;
    /** 范围(主要用于武器) */
    distance?:DistanceData;
    
    /**
     * 移除标记（很少使用）
     * 
     * 在lose中使用，一般标记一个技能名
     * 若存在则设置在卡牌的destroyed（不会被循环利用，会被移除出游戏外）
     * 注：是一个特殊标记，标记上该属性，就不能被重铸，也不能被typeCard索引，
     *  一般是作为技能的标记，技能衍生出来的特殊牌（例如装备），被lose时，会触发该属性上记录的技能；
     *  并且拥有该属性的特殊卡牌，一旦失去，不会进入弃牌堆中，直接永久移除。
     */
    destroy?:string;
    /**
     * 在该卡牌lose时候
     * 在lose中调用
     * 用于创建“lose_+name”事件的content，即丢失某牌事件;
     * 同时还需要满足下面的filterLose过滤条件
     * 注：代码内，其实可以创建多个onLose的事件
     */
    onLose?: ContentFunc;//ContentFunc
    /**
     * 过滤是否需要触发onLose
     * 在lose中调用
     * @param card 
     * @param player 
     */
    filterLose?(card:Card, player:Player):boolean;
    /**
     * 是否执行失去该牌的动画
     * 
     * lose中使用
     * 值为false时，不popup失去的卡牌，不启用延时，不设置或者其他，走正常逻辑
     */
    loseDelay?:boolean;

    /**
     * 使用该卡牌时，是否改变选中的目标
     * 
     * （类似于过滤，目前看来，大多用于添加新目标）
     * 在useCard创建事件中调用
     */
    changeTarget?(player:Player,targets:Target[]):void;
    
    /**
     * 播放的音频
     * 
     * 若卡牌为“sha”（杀）时，根据该杀的属性独立播放对应“sha”的语言；
     * 其他，若有值为字符串，则看是否有“ext:”,有则播放扩展里的声音；
     * 否则正常播放audio指定的声音；
     * 若不填，则默认播放该卡牌名字的音频；
     */
    audio?:string;
    
    /** 一次性卡牌，只能使用一次，使用完，移除出卡牌外（不置入弃牌堆中的） */
    vanish?:boolean;
    
    //ai部分
    ai: ExAIData,
    postAi?(targets:Target[]):boolean;
    

    //以下部分貌似都是是用于显示信息的：
    addinfomenu?: string;
    //来源
    derivation?: boolean | string;
    derivationpack?: string;


    /** 禁止列表，但是貌似没用上 */
    forbid?:string[];
    //似乎没有用上，不知有什么用
    source?:string|string[];

    //日后还有很多属性要添加的
    [key: string]: any;
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

/**
 * 用于显示的简单卡牌结构(基本卡牌信息，作为基本的参数结构)
 * （其实质就是Card对象分离的一部分，用力简单明了的显示，实际直接用card传参也行）
 */
interface CardBaseUIData {
    //基本结构
    name:string;
    suit?:string;
    number?:number;
    nature?:string;

    //用于某些方法，用于过滤卡牌的额外结构
    type?:string;
    subtype?:string;
    color?:string;

    cards?:Card[];
}

/**
 * 用于显示的简单卡牌结构2
 * [suit花色,number数字,name卡牌名,nature伤害类型，......[tag列表]]
 */
type CardBaseUIData2 = [string,number,string,string];

/** 范围信息 */
type RangeData = {
    /** 进攻距离 */
    attack?:number;
    /** 防御距离 */
    global?:number;

}

/** 范围信息2（目前先分开，到时看需要是否统一） */
type DistanceData = {
    /** （进攻马）进攻距离：值为负数值（子类型为equip4） */
    globalFrom?:number;
    /** （防御马）防御距离：值为正数值（子类型为equip3） */
    globalTo?:number;
    /** （武器）攻击范围：值为负数值（不填，为equip1时，默认显示“范围：1”） */
    attackFrom?:number;
}

/** 判断阶段的事件reslut */
interface JudgeResultData {
    card:string,
    number:number,
    suit:string,
    color:string,
    judge:number,
    node:Card,
    /** 最终结果 */
    bool:boolean;
}

/**
 * 当前游戏状况信息（一般用于联机模式下保存数据用的结构）
 */
interface AreanStateInfo{
    number:number,
    players:NMap<any>,
    mode:string,
    dying:any[],
    servermode:string,
    roomId:any,
    over:boolean
}

/** 录像数据 */
type VideoData = {
    type:string;
    /** 坐位号 */
    player:string;
    delay:number;
    content:any;
}

// type CardAndPlayerFun<T> = (card,player) => T;
// type CardPlayerAndTargetFun<T> = (card, player, target) => T;
// type CardsPlayerAndTargetsFun<T> = (cards, player, targets) => T;
// type CardFun<T> = (card) => T;
// type PlayerSkillFun<T> = (player,skill) => T;
// type PlayerTargetFun<T> = (player, target) => T;
// type NoParamFun<T> = () => T;
// type TriggerAndPlayer<T> = () => T;

//从0个参数到任意参数的方法结构声明
type NoneParmFum<T> = () => T;
type OneParmFun<U,T> = (arg0: U) => T;
type TwoParmFun<U1,U2,T> = (arg0: U1,arg1:U2) => T;
type ThreeParmFun<U1,U2,U3,T> = (arg0: U1,arg1:U2,arg2:U3) => T;
type RestParmFun<T> = (...args) =>T;

/**
 * content触发内容：
 * 经过game.createEvent创建事件，设置setContent，
 * 经过lib.init.parse转换，
 * 在game.loop内，传入这些参数调用。
 *  
 */
type ContentFunc = (
    event:GameEvent, 
    step:number, 
    source:Player, 
    player:Player, 
    target:Player, 
    targets:Player[], 
    card:Card, 
    cards:Card[], 
    skill:string, 
    forced:boolean, 
    num:number, 
    trigger:GameEvent, 
    result, 
    _status:Status, 
    lib:Lib, 
    game:Game, 
    ui:UI, 
    get:Get, 
    ai:AI
) => void;

//一些主要对象简单化，语义化类型名：
/** nogame的card类型 */
type Card = Lib.element.Card;
/** nogame的player类型 */
type Player = Lib.element.Player;
/** nogame的player类型->目标玩家 */
type Target = Lib.element.Player;
/** nogame的player类型->发动源玩家 */
type Source = Lib.element.Player;
/** nogame的player类型->当前操作中的玩家（一般指遍历回调中正在操作的数据） */
type Current = Lib.element.Player;
/** nogame的button类型 */
type Button = Lib.element.Button;
/** nogame的dialog类型 */
type Dialog = Lib.element.Button;
/** nogame的event类型（也指当前回调中的事件） */
type GameEvent = Lib.element.Event;
/** nogame的event类型=>主触发事件 */
type Trigger = Lib.element.Event;
/** nogame的触发名 */
type TriggerName = string;
/** nogame中所使用的技能的名字 */
type Skill = string;
/** nogeme中button的link列表 */
type Links = any[];

/** 
 * nogame的选择范围类型
 * 下标0：
 * 下标1：选中的数量。-1为所有
 */
type Select = [number,number];