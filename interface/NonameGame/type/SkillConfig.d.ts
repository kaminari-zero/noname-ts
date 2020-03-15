/** 导入技能包的配置信息 */
interface ExSkillConifgData extends ExCommonConfig {
    /** 技能 */
    skill: SMap<ExSkillData>;
}

/** 技能的配置信息 */
interface ExSkillData {
    /** 
     * 技能按钮名字，不写则默认为此技能的翻译（可认为为该技能用于显示的翻译名）
     * 注：用得挺少得，貌似主要是使用翻译得
     */
    name?: string;
    /** 用于解析用的key，不直接参与游戏逻辑，参与自己定义的解析流程，实质就是技能的名字，规范按技能名命名 */
    // key?:string;

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
    hookTrigger?: boolean;

    //基本都在核心createTrigger，addTrigger，trigger中逻辑触发相关，属于重要得属性
    /** 
     * 目前具体不知什么功能，当前所知，非常重要，和createTrigger，addTrigger，trigger相关
     * （推测，这属性是指明客户端是否显示该技能的操作按钮）
     * 
     * 当设置了该值为true，若forced没设置到，则默认为true；
     *  若popup没设置到，则默认为false；
     */
    silent?: boolean;
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
    frequent?: boolean | string | TwoParmFun<Trigger, Player, boolean>;
    /** 
     * 此技能是否可以被设置为自动发动2 
     * 可以细分当前技能强制发动选项，（应该是为了细分子技能），保存到lib.config.autoskilllist，
     * 在ui.click.autoskill2中执行
     */
    subfrequent?: string[];
    /**
     * 自动延迟的时间
     * 可以影响技能触发响应时机（主要影响loop之间的时间,即game.delayx的调用情况）
     */
    autodelay?: boolean | number | TwoParmFun<Trigger, Player, number>;
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
    oncancel?(trigger: Trigger, player: Player): void;
    /** 
     * 每回合限制使用次数
     * 
     * （若限制使用次数为变量时需写在filter内，即通过filter与变量动态判断） 
     * 主要在createTrigger，step3中触发计数。
     * 触发计数，会在玩家身上添加“counttrigger”技能，计数记录在：player.storage.counttrigger[当前技能名]
     */
    usable?: number;
    /** 
     * 暂时不明，应该和card的该属性是一样意思，估计是死亡后是否强制发动的技能
     * （马里奥大佬的解释：forceDie是重中之重 没有它的话 技能是不会在死后发动的）
     * 基本确定这是死亡后会发动的技能标记
     */
    forceDie?: boolean;
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
    after?(event: GameEvent, player: Player, triggername: string): boolean;

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
     * 
     * 注：此时的content，已经为触发该技能的效果而创建的，该技能执行中的事件，此时的event一般是不具备
     *  触发信息，触发的信息，主要在trigger触发事件中获取。
     */
    content?: ContentFunc;
    /**
     * 在content之后触发内容
     * 在useSkill中使用，主动触发技能content之后
     */
    contentAfter?: ContentFunc;

    //新版本出牌阶段主动技的新参数（均仅在discard为false且lose不为false时有效）
    /** 让角色失去卡牌的过程中强制视为正面朝上失去 */
    visible?:boolean;
    /** 
     * 指定失去特殊区卡牌的去向 (即设置卡牌的position)
     * 其值采用的是ui的成员，即通过ui[info.loseTo]，获取实体对象设置；
     * 默认为："special",
     * 取值："special","discardPile","cardPile","control"(这一般都不会用上)
     */
    loseTo?:string;

    //技能初始化与移除：
    /**
     * 获得技能时发动
     * @param player 
     */
    init?(player: Player): void;
    /** 在addSkill中调用 */
    init2?(player: Player, skill: Skill): void;
    /** 在执行player.disableSkill丧失技能时，若该属性为true，则执行技能的onremove */
    ondisable?: boolean;
    /**
     * 失去技能时发动
     * 当值为string时:
     *  若为“storage”，删除player.storage中该技能的缓存（用于保存标记等信息）；
     *      注：失去这个技能时销毁标记。
     *  若为“discard”，若player.storage[skill]缓存的是卡牌时，执行game.cardsDiscard，并播放丢牌动画，然后移除player.storage[skill]；
     *  若为“lose”，和“discard”差不多，不过不播丢牌动画；
     * 当值为true时，都是直接移除player.storage[skill]；
     * 当值为字符串集合时，则是删除集合中对应player.storage（即删除多个指定storage）
     */
    onremove?: TwoParmFun<Player, Skill, void> | string | string[] | boolean;
    /** 是否持续的附加技能，在removeSkill中使用 */
    keepSkill?: boolean;


    //以下3个属性基本功能时一致：在某些模式下是否能使用，只使用一个就差不多
    /**
     * 指定该技能在哪些模式下禁用
     * 
     * 注：在指定模式被禁用的技能，会被设置成空对象，并且“技能_info”的描述变成“此模式下不可用”。
     */
    forbid?: string[];
    /** 与forbid相反，只能在指定玩法模式下才能被使用，其他逻辑一致 */
    mode?: string[];
    /** 当前模式下是否能使用，返回false则不能使用，其实和forbid逻辑一致 */
    available?(mode: string): boolean;


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
    global?: string|string[];
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
    alter?: boolean;


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
    limited?: boolean;
    /** 
     * 获得技能时是否显示此标记，
     * 若为false，可以用 markSkill 来显示此标记，
     * 可以用 unmarkSkill 不显示标记
     * 
     * mark的常量值："card","cards","image","character"
     * 则表示，标记显示的形式
     */
    mark?: boolean|string;
    /** 标记显示内容 */
    intro?: {
        mark?:ThreeParmFun<Dialog,GameStorage,Player,string>;
        /** 
         * 标记显示内容？
         * 为cards时显示标记内的牌.
         * 
         * 当标记显示内容是文本:
            "mark":有（数）个标记；
            "card":一张牌；
            "cards":多张牌；
            “limited”:限定技，觉醒技专用；(若没设置，在info.limited为true下回默认设置这个)
            "time":剩余发动次数；
            "turn":剩余回合数；
            "cardCount":牌数；
            "info":技能描述；
            "character":武将牌；
         * 在get.storageintro 中使用,以上，即为该方法的type，返回标记的描述内容
         * 
         * 若info.mark为“character”，则为一个描述文本；
         * 其中，文本可使用以下占位符：
         *  "#"：(this.storage[skill])获取对应的计数,
         *  "&"：get.cnNumber(this.storage[skill])获取对应的计数(需要使用到get.cnNumber来获取的数量),
         *  "$"：get.translation(this.storage[skill])获取对应描述(一般是描述的角色名)
         * 
         * 也可以是个自定义的方法
         */
        content: string | TwoParmFun<GameStorage, Player, string>;
        /** 
         * 标记数，
         * 主要在player.updateMark时使用，实际顶替this.storage[i+'_markcount']获取标记数 
         */
        markcount?: number | TwoParmFun<GameStorage, Player, number>;
        /** 是否不启用技能标记计数 */
        nocount?: boolean;
        /**
         * 移除该标记时，在unmarkSkill执行
         * 若值为字符串“throw”，该玩家缓存中该技能标记的为牌时，播放丢牌动画；
         * 若是方法，则直接使用该回调方法处理。
         */
        onunmark?: TwoParmFun<GameStorage, Player, void> | string;
    };
    /** 
     * 是否开启觉醒动画
     * 
     * 准备来说，常用于觉醒动画，实际是指技能动画
     * 字符串时取值：epic，legend
     */
    skillAnimation?: boolean | string;
    /** 是否只显示文字特效 */
    textAnimation?: boolean;
    /** 动画文字(可用于觉醒文字) */
    animationStr?: string;
    /** 动画文字颜色(觉醒文字颜色) */
    animationColor?: string;
    /** 标记显示文本，一般为一个字 */
    marktext?: string;
    /**
     * 觉醒技标记：
     * (目前来看，这个目前单纯是技能标记，在主逻辑上并没使用，但貌似会被某些技能本身用到)
     */
    juexingji?:boolean;

    //主公技
    /** 
     * 是否为主公技：
     * true时，将这个技能设置为主公技 
     * (目前来看，这个目前单纯是技能标记，在主逻辑上并没使用，但貌似会被某些技能本身用到)
     */
    zhuSkill?: boolean;

    //主动技能（主动使用技能，包含技能使用的相关操作配置）
    /** 
     * 可使用的阶段 
     * 
     * 一般用于主动技能
     * 
     */
    enable?: string | string[] | OneParmFun<Trigger, boolean>;
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
    viewAsFilter?(player: Player): boolean;
    /**
     * 使用视为牌时触发内容。
     * result.cards是视为前的牌
     * @param result 
     * @param player 
     */
    onuse?(result, player: Player): void;
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
    prepare?: string | ThreeParmFun<Card[], Player, Target[], string>;
    /** 在lose事件中使用，触发执行“lose_卡牌名”事件的content */
    onLose?:ContentFunc|ContentFunc[];
    /**
     *  在lose事件中使用，必须要失去的卡牌为“equips”（装备牌），有onLose才生效。
     * 若符合以上条件，则检测该牌是否需要后续触发执行“lose_卡牌名”事件，既上面配置的onLose
     */
    filterLose?:TwoParmFun<Card,Player,boolean>;
    /** 在lose事件中使用，取值为true，作用貌似强制延迟弃牌动画处理 */
    loseDelay?:boolean;


    /** 
     * 技能响应前处理(非联机时，不在线时处理，估计时用于自动响应)
     * 
     * 在chooseToRespond中使用
     */
    prerespond?(result, player: Player): void;
    /** 
     * 技能响应(非联机时，不在线时处理，估计时用于自动响应)
     * 
     * 在respond中使用
     */
    onrespond?(event: Trigger, player: Player): void;
    /**
     * 过滤发动条件，返回true则可以发动此技能
     * 主要在filterTrigger中处理
     * @param event 事件 相当于trigger时机（此时的event为触发该技能时机时的事件）
     * @param player 
     */
    filter?(event: Trigger, player: Player): boolean;
    /**
     * 选择的目标武将牌上出现什么字，
     * 数组第几元素对应第几个目标
     */
    targetprompt?: string[];
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
    block?(event: Trigger, player: Player, name: string, skill: Skill): void;

    /**
     * 选中该技能使用时,进行处理
     * 在chooseToUse 的content中调用，
     * 目前参考的例子中，大多数多是用于添加一些牌到待选择到event.set(key，收集的牌)中，
     * 用于使用前先选牌的效果
     * 注：其调用时机应该远早于触发技能的，在选中牌时就开始处理。
     * @param event 
     */
    onChooseToUse?(event: Trigger): void;

    /**
     * 改变拼点用的牌
     * 
     * 在chooseToCompare和chooseToCompareMultiple，step2中使用，返回玩家用于的拼点的牌
     * @param player 
     */
    onCompare?(player: Player): Card[];

    //核心
    //event.bakcup设置的信息，game.check使用到的一些参数，其实就是把game.check需要的一些参数设置到技能中，作为check时的条件
    /* 这些就是作为前提条件的主要属性
    filterButton
    selectButton
    filterTarget
    selectTarget
    filterCard
    selectCard
    position
    forced
    complexSelect?:boolean;
    complexCard?:boolean;
    complexTarget
    ai1
    ai2
    */
    //目标
    /**
     * 需要选择多少张牌才能发动
     * 选择的牌数
     * -1时，选择所有牌,否则就是指定数量的牌
     * 数组时，这个数组就是选择牌数的区间,其中任意（至少一张）：[1,Infinity]
     * 为变量时（具体情况具体分析），例：()=>number
     */
    selectCard?: number | Select | NoneParmFum<number | Select>;
    /**
     * 需要选择多少个目标才能发动
     * 选择的目标数：
     * 为-1时，选择全部人
     * 为数组时，这个数组就是选择目标数的区间
     */
    selectTarget?: number | Select | NoneParmFum<number | Select>;
    /**
     * 选择的牌需要满足的条件
     * 可以使用键值对的简便写法
     * 也可以使用函数返回值（推荐）
     */
    filterCard?: SMap<string> | TwoParmFun<Card,Player, boolean>;
    /** 
     * 是否使用mod检测
     * 
     * 取值true;
     * 若没有设置filterCard;
     * 则若当前事件为”chooseToUse“（选择卡牌使用）,使用”cardEnabled“卡牌是否能使用mod检测；
     * 则若当前事件为”chooseToRespond“（选择卡牌响应），使用”cardRespondable“卡牌是否能响应mod检测；
     */
    ignoreMod?:boolean;
    /**
     * 选择的目标需要满足的条件
     * @param card 
     * @param player 
     * @param target 
     */
    filterTarget?(card: Card, player: Player, target: Target): boolean;
    /**
     * 选择时弹出的提示
     * 
     * 单参数的方法，主要用再技能点击使用时的提示；
     */
    prompt?: string | TwoParmFun<Trigger, Player, String> | OneParmFun<Trigger,string> | TwoParmFun<Links, Player, string>;
    /**
     * 二次提示
     * 
     * 主要在createTrigger，step1中，设置event.prompt2
     * 若是boolean类型，则使用lib.translate[“技能名_info”]的描述
     */
    prompt2?: string | TwoParmFun<Trigger, Player, String> |TwoParmFun<Links, Player, string> | boolean;
    /** 
     * 在ui.click.skill中使用，若当前event.skillDialog不存在，可以用该方法生成的文本的dialog作为skillDialog；
     * 若没有该方法，可以使用翻译中该技能的info信息代替。
     */
    promptfunc?: TwoParmFun<Trigger, Player, String>;
    /** 似乎没用上，作用是使skillDialog.forcebutton为true */
    longprompt?: boolean;

    //补充game.check相关参数的声明：
    /** 过滤不可选择按钮 */
    filterButton?(button: Button, player: Player): boolean;
    /** 按钮的可选数量，大多数情况下，默认1 */
    selectButton?: number | Select | NoneParmFum<number | Select>;
    complexSelect?: boolean;
    complexCard?: boolean;
    complexTarget?:boolean;
    ai1?:Function;
    ai2?:Function;

    /**
     * 是否检测隐藏的卡牌
     * 
     * 目前game.js中，只用于hasWuxie，用于检测在“木牛流马”中隐藏的“无懈”；
     * 该方法应该可以给类似作用，但是“木牛”有点破坏原来的逻辑，整体逻辑不重置一下的话，估计以后还会加上其他奇怪的东西
     * @param player 
     * @param name 
     */
    hiddenCard?(player: Player, name: string): boolean;

    /** 录像相关，game.videoContent.skill中相关 */
    video?(player: Player, data: string | any[]): void;

    process?(player: Player): void;

    //在skillDisabled中，根据以下5个属性，检测技能是否是不能使用（若其中有一个时true都排除掉），在chooseSkill,选择获得技能时筛选列表
    //在getStockSkills中，有前3个标签属性的技能也是无法获取的
    /** 唯一？，在skillintro中使用 */
    unique?: boolean;
    /** 临时技能，，在die死亡时，会被移除 */
    temp?: boolean;
    /** 非配置，是subSkill，会标记该属性为true */
    sub?: boolean;
    /** 固有技，不能被removeSkill移除 */
    fixed?: boolean;
    /** 一次性技能，在resetSkills时，直接移除该技能 */
    vanish?: boolean;

    /** 作用不明，并没有什么用，在clearSkills中使用 */
    charlotte?: boolean;
    /** 作用不明，并没有什么用，与ui相关，在skillintro中使用,值为true */
    gainable?: boolean;
    /** 在nodeintro中使用，添加classname:thundertext,值为true */
    thundertext?: boolean;

    //在nodeintro中使用的（这几个配置都没什么意义）
    /** 设置nodeintro的点击事件 */
    clickable?(player: Player): void;
    /** 过滤点击，应该是过滤弹出面板是否能点击，具体作用日后细究 */
    clickableFilter?(player: Player): boolean;
    /** 输出内容不带【】括号 */
    nobracket?: boolean;

    //日志，提示
    logv?: boolean;
    /**
     * 显示日志的标记
     * 若值为“notarget”，则显示出对目标相关描述的日志
     */
    log?: string;
    /**
     * player是否logSkill('此技能').
     * 
     * 注：logSkill 则是在玩家确定要使用卡牌的情况下 弹出发动的技能（马里奥大佬的解释，到时看下）
     * true为不
     */
    nopop?: boolean;
    /**
     * 阶段日志
     * 配置一个触发阶段，或者一个方法直接返回文本
     * 若没有配置prompt，显示该配置的提示
     */
    logTarget?: string | TwoParmFun<Trigger, Player, string>;
    /** 
     * 暂不知具体有什么用，取值为false，在createTrigger，step3中使用，
     * 目前看来是使用line属性，作为logSkill日志的颜色 
     */
    logLine?: boolean;



    //技能的信息显示：
    /**
     * 内容描述
     * 
     * 在addCard时，设置“技能名_info”的翻译；（addCard很少使用）
     * 
     * 若时subSkill子技能，则设置“技能名_子技能名_info”的翻译；(主要适用于子技能描述)
     * 
     * 该技能的描述（自定义，非子技能时和game逻辑无关,用于自己的解析逻辑）
     */
    description?: string;
    /** 该技能的描述（自定义，和game逻辑无关,用于自己的解析逻辑） */
    // infoDescription?:string;
    /** 
     * 来源：
     * 貌似时联机用的，具体还没确定
     */
    derivation?: string[] | string;

    //AI相关
    /** ai的详细配置 */
    ai?: ExAIData;
    /** 
     * ai如何选牌
     * 
     * 在ai.basic.chooseCard中使用
     */
    check?(card:Card): number|boolean;
    /**
     * 告诉ai是否发动这个技能
     * 返回true则发动此技能
     * 
     * 在触发createTrigger中使用
     * @param event 
     * @param player 
     */
    check?(event:GameEvent, player:Player): number|boolean;
    /**
     * 第一个参数好想有些不一样：event，card,子技能button
     * 
     * （目前只发现技能使用的是以上两种形式）
     * @param arg 
     */
    check?(...arg): number|boolean;

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
    cardDiscardable?(card: Card, player: Player): boolean;
    /**
     * 卡牌是否可用
     * cardEnabled一起使用
     * @param card:Card 牌
     * @param player:Player 玩家
     */
    cardEnabled?(card: Card, player: Player): boolean;
    /**
     * 卡牌是否可用
     * 要与cardEnabled一起使用（目前看来两个效果一致）
     * @param card:Card 牌
     * @param player:Player 玩家
     */
    cardUsable?(card: Card, player: Player): boolean;
    /**
     * 卡牌是否可以响应
     * 要与cardEnabled一起使用（目前看来两个效果一致）
     * @param card:Card 牌
     * @param player:Player 玩家
     */
    cardRespondable?(card: Card, player: Player): boolean;
    /**
     * 卡牌是否可以救人
     * 要与cardEnabled一起使用（目前看来两个效果一致）
     * 注：还是和cardEnabled不同，设置了该mod检测，只要是在_save，濒死求救阶段，都可以触发；
     *  不过前提，可能还是要通过该阶段的cardEnabled的检测，目前还没确定，日后再做分析
     * @param card:Card 牌
     * @param player:Player 玩家
     */
    cardSavable?(card: Card, player: Player): boolean;
    /** 在全局的防御范围 */
    globalTo?(from: Player, to: Player, current): number;
    /** 在全局的进攻距离 */
    globalFrom?(from: Player, to: Player, distance): number;
    /** 手牌上限 */
    maxHandcard?(player: Player, num: number): number;
    /**
     * 选择的目标
     * card：牌；
     * player：玩家；
     * range：
     *      range[1]：目标个数; 
     */
    selectTarget?(card: Card, player: Player, range: Select): void;

    /**
     * 该卡牌的发动源玩家是否能使用该卡牌（该角色是否能使用该牌）
     * @param card:Card 
     * @param player:Player 源玩家（使用牌的角色）
     * @param target:Target 目标玩家
     */
    playerEnabled(card: Card, player: Player, target: Target): boolean;
    /** 
     * 是否能成为目标 
     * card：牌；
     * player：使用牌的角色；
     * target：玩家
     */
    targetEnabled?(card: Card, player: Player, target: Target): boolean;

    /**
     * 可以指定任意（范围内）目标
     * @param card:Card 牌
     * @param player:Player 玩家
     * @param target:Target 目标
     */
    targetInRange?(card: Card, player: Player, target: Target): boolean | number;
    /**
     * 弃牌阶段时，忽略的手牌
     * @param card:Card 
     * @param player:Player 
     */
    ignoredHandcard?(card: Card, player: Player): boolean;

    /** 过滤可以被丢弃的牌 */
    canBeDiscarded?(card: Card, player: Player, target: Target, eventName: string): boolean;
    /** 过滤可以获得的牌 */
    canBeGained?(card: Card, player: Player, target: Target, eventName: string): boolean;

    /**
     * 改变花色
     */
    suit?(card: Card, suit: string): string;
    /**
     * 改变判断结果
     * 
     * 注：目前似乎没有用到该mod.改变结果不影响判定的牌结果，影响判定的最终结果，即之后判定牌的effect会受该结果影响
     * @param player 
     * @param result 
     */
    judge?(player: Player, result: JudgeResultData);

    //2020-2-23版本：
    /** 
     * 为技能配置一个自定义在事件中处理的回调事件，该事件的使用需要自己使用，实际是一个自定义事件，没什么实际意义；
     * 其设置的位置在技能content期间设置，设置在期间引发的事件中；
     * 用于以下场合：judge，chooseToCompareMultiple，chooseToCompare
     * 
     * 新版本的judge事件中 可以通过设置callback事件 在judgeEnd和judgeAfter时机之前对判定牌进行操作
     * 在判断结果出来后，若事件event.callback存在，则发送“judgeCallback”事件
     * 
     * 同理拼点,在拼点结果出来后，发送“compare”/“compareMultiple”事件
     * 
     * callback就是作为以上事件的content使用
     */
    callback?:ContentFunc;

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
    wuxieJudgeEnabled?(card: Card, player: Player, current: Current): boolean;
    /** 是否能在判定阶段响应无懈 */
    wuxieJudgeRespondable?(card: Card, player: Player, current: Current): boolean;
    //非判定阶段触发
    /** 是否能使用无懈 */
    wuxieEnabled?(card: Card, player: Player, target: Target, current: Current): boolean;
    /** 是否能响应无懈 */
    wuxieRespondable?(card: Card, player: Player, target: Target, current: Current): boolean;

    //94版本
    /** 改变卡牌名字  用于get.name*/
    cardname?(card: Card, player: Player): string;
    /** 改变卡牌伤害属性   用于get.nature*/
    cardnature?(card: Card, player: Player): string;
}

/** 选择按钮配置 */
interface ChooseButtonConfigData {
    /** 
     * 选择内容 
     * 返回传递给player.chooseButton的参数
     */
    dialog?(event: GameEvent, player: Player): Dialog;
    /**
     * 卡牌选择条件
     * @param button 
     * @param player 
     */
    filter?(button: Button, player: Player): void;
    /**
     * ai如何选牌
     * @param button 
     */
    check?(button: Button): number;
    /**
     * 返回“视为”部分（即当作该选择为视为的操作逻辑）
     * @param links result.links（由get.links获得，一般是指当前面板上的所有可选择按钮的link数据,一般为卡牌信息）
     * @param player 
     */
    backup?(links: Links, player: Player): ExCardData;
    /**
     * 选择时弹出的提示
     * @param links result.links（由get.links获得，一般是指当前面板上的所有可选择按钮的link数据,一般为卡牌信息）
     * @param player 
     */
    prompt?(links: Links, player: Player): string;
    /** 选择数目，默认为1 */
    select?: number;
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

