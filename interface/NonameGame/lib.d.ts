declare var lib:Lib;
/**
 * 游戏内的主要信息储存区域，与核心游戏方法对象
 */
interface Lib {
    /** 当前版本的配置前缀（多用于本地缓存的标签名） */
    configprefix: string;
    /** 联机版本 */
    versionOL: number;
    /** 更新地址 */
    updateURL: string;
    /** 更新的镜像地址 */
    mirrorURL: string;
    /** 联机地址 */
    hallURL: string;
    /** 网络资源地址 */
    assetURL: string;
    /** 更新日志 */
    changeLog: any[];
    /**
     * 记录更新用的方法，在game.run中执行
     */
    updates: OneParmFun<number,boolean>[];
    canvasUpdates: TwoParmFun<number,any,boolean>[];
    /** 录像信息 */
    video: VideoData[];
    /**
     * 保存所有武将所拥有的的技能。
     * 在onload，loadPackage中添加保存。
     */
    skilllist: string[];
    /** 武将禁用列表 */
    connectBanned: string[];
    /** 武将介绍 */
    characterIntro: SMap<string>;
    /** 武将标题（用于写称号或注释） */
    characterTitle: SMap<string>;
    /** 武将包 */
    characterPack: SMap<HeroData>;
    /** 武将的过滤方法（参数为一个mode，用于过滤玩法模式） */
    characterFilter:SMap<OneParmFun<string,boolean>>;
    /** 用于筛选（具体日后讨论） */
    characterSort: SMap<SMap<string[]>>;
    /** 系列卡包（卡牌的系列集合） */
    cardPack: SMap<string[]>;

    /** 在updatex中，执行一些列onresize重新调整UI大小 */
    onresize: NoParamFun<void>[];
    /** 在“phaseLoop”事件执行该一系列onphase事件 */
    onphase: NoParamFun<void>[];
    /** 保存多个洗牌方法进行洗牌 */
    onwash: NoParamFun<string>[];
    /** gameover后执行的一些列结束方法 */
    onover: OneParmFun<string,void>[];

    //记录数据，读取数据库
    ondb: any[];
    ondb2: any[];

    /** 聊天历史 */
    chatHistory: [string,string][];
    /** 主要在lib.init记录场景加载的系列方法，在ui.arena中取出执行 */
    arenaReady: NoParamFun<void>[];
    /** 保存一些UI处理的方法，在合适时机取出来执行 */
    onfree: Function[];
    /** 在牌堆里牌(指不区分数字，花色，伤害属性的牌) */
    inpile: string[];
    /**
     * 保存loadExtension中，保存读取到的扩展，在onload的proceed2中读取处理
     */
    extensions: any[];
    /**
     * 保存loadExtension读取到的扩展，便于后面“编辑扩展”读取信息
     */
    extensionPack: SMap<any>;
    /** 卡牌类型的优先级？（用于排序卡牌用） */
    cardType: SMap<number>;

    /** 保存游戏中的触发 */
    hook: {
        /**
         * 全局触发记录:
         * 结构：
         *  触发名:{玩家id:[触发技能列表]}
         */
        globaltrigger: SMap<SMap<string[]>>;
        /**
         * 全局触发技能记录：
         * 结构：“触发源(player/source/global/target)_触发名”:[触发技能列表]
         */
        globalskill: SMap<string[]>;
        /**
         * 玩家触发
         * 结构：
         *  “玩家id_触发源(player/source/global/target)_触发名”:[触发技能列表]
         * 
         * 注：实际上的类型是SMap<string[]，另一个只是为了解决冲突
         */
        [key:string]:SMap<string[]|SMap<string[]>>;
    };
    /**
     * 记录当前预定处理游戏中的触发map
     * key为触发名，value为布尔值，一般情况下都是默认true；
     * 如果没有指定的触发名在这里，则执行trigger时，不查找触发技能执行。
     */
    hookmap: SMap<boolean>;

    /** 已经导入的扩展(当前要执行的导入扩展) */
    imported: string;

    layoutfixed: string[];
    characterDialogGroup: SMap<(name: any, capt: any)=>void>;
    listenEnd(node: any):any;

    /** 菜单配置 */
    configMenu: SMap<CommonMenuConfigData>;
    /** 扩展菜单配置 */
    extensionMenu: SMap<ExtensionMenuConfigData>;
    /** 开始模式选择菜单配置 */
    mode: SMap<CommonMenuConfigData>;


    status: {
        running: boolean,
        canvas: boolean,
        time: number,
        reload: number,
        delayed: number,
        frameId: number,
        videoId: number,
        globalId: number,

        date:Date;
        dateDelayed:number;
        dateDelaying:Date;

    };
    /** 
     * 帮助内容数据中心
     * 帮助内容将显示在菜单－选项－帮助中
     * （所有扩展的help都会集中到这里）
     */
    help: SMap<string>;

    //ui相关
    /** 设置点击/触摸打开信息面板的节点 */
    setIntro(node: HTMLElement, func?: Function, left?: boolean):void;
    /** 设置弹出的面板节点 */
    setPopped(node: HTMLElement, func: Function, width: number, height: number, forceclick: any, paused2: any):void;
    /** 弹出会话面板 */
    placePoppedDialog(dialog: Dialog, e: any):void;
    /** 设置节点的hover（鼠标悬停在上方） */
    setHover(node: HTMLElement, func: Function, hoveration: number, width: number):HTMLElement;
    /** 设置触摸的滚动 */
    setScroll(node: HTMLElement):HTMLElement;
    /** 设置鼠标的滚轮 */
    setMousewheel(node: HTMLElement):void;
    /** 设置节点的长按 */
    setLongPress(node: HTMLElement, func: any):HTMLElement;
    updateCanvas(time: any):any;
    run(time: any):any;

    /** 获得该时间的（UTC）时间 */
    getUTC(date: Date):number;
    saveVideo():any;

    /** 游戏初始化方法与相关工具库 */
    init: Lib.Init;
    /** 游戏作弊 */
    cheat: Lib.Cheat;
    /** 游戏的翻译（本地化） */
    translate: SMap<string>;

    /** 游戏内核心元素 */
    element: {
        /** 游戏内预定义事件使用的content方法 */
        content: Lib.element.Content;
        /** 玩家 */
        player: Lib.element.Player;
        /** 卡牌 */
        card: Lib.element.Card;
        /** 按钮 */
        button: Lib.element.Button;
        /** 事件 */
        event: Lib.element.Event;
        /** 会话面板 */
        dialog: Lib.element.Dialog;
        control: Lib.element.Control;
        client: Lib.element.Client;
        nodews: Lib.element.Nodews;
        ws: Lib.element.WS;
    }, 
    /** 
     * 卡片数据中心 
     * （所有扩展的card都会集中到这里）
     */
    card: {
        /** 保存所有的卡牌的基本信息 */
        list: CardBaseData[];
        /** 所有卡牌的配置集中在这里 */
        [key:string]:ExCardData|CardBaseData[];
    };
    /** 游戏内自定义的过滤方法 */
    filter: Lib.Filter;
    /** 游戏内自定义的sort排序方法 */
    sort: Lib.Sort;
    /**
     * 技能数据中心
     * （所有扩展的skill都会集中到这里）
     */
    skill: {
        /** 
         * 保存游戏内所有全局技能
         * 全局技能名命名常用："_","g_"开头
         */
        global: string[];
        /** 保存的技能信息与玩家之间的关系map,目前在项目内没看出有什么用 */
        globalmap: SMap<Player[]>;
        /** 本地缓存  */
        storage: SMap<any>;
        /**
         * 不计入距离的计算且不能使用牌且不是牌的合法目标
         * （目前该标记直接标记到技能的group中，拥有该技能就是被隔离出游戏，目前还没见使用到这成员）
         * 目前在项目内没什么用，只有标记到技能的group中使用，用于免除某些阶段结算
         */
        undist: SMap<any>;
        others: SMap<any>;
        zhu: SMap<any>;
        zhuSkill: SMap<any>;
        land_used: SMap<any>;

        //以下皆为游戏内预设的全局特殊节能
        unequip: ExSkillData;
        subplayer: ExSkillData;
        autoswap: ExSkillData;
        dualside: ExSkillData;
        _disableJudge: ExSkillData;
        _disableEquip: ExSkillData;
        /**
         * 特殊技能：封印技能
         * 使指定技能“失效”（即玩家失去了某些技能，可在标记上查看）
         */
        fengyin: ExSkillData;
        baiban: ExSkillData;
        qianxing: ExSkillData;
        mianyi: ExSkillData;
        /**
         * 特殊技能：混乱
         * 标记技能
         * 进入“混乱”状态的情况下，不能操作（自己的面板），player.isMine的结果也是false（不能确定当前玩家是自己）
         */
        mad: ExSkillData;
        ghujia: ExSkillData;
        /**
         * 特殊技能：计算触发次数
         * 触发阶段：phaseAfter（回合结束之后）
         * 当技能存在“usable”每回合使用次数时，在创建技能事件时，添加该技能。
         * 其作用是，在回合结束时，清除player.storage.counttrigger触发技术。
         */
        counttrigger: ExSkillData;
        _recovercheck: ExSkillData;
        _turnover: ExSkillData;
        _usecard: ExSkillData;
        _discard: ExSkillData;
        /**
         * 特殊技能：濒死阶段循环询问求救
         * 触发阶段：濒死阶段触发
         */
        _save: ExSkillData;
        _ismin: ExSkillData;
        /**
         * 特殊技能：重铸
         * 触发阶段：phaseUse（出牌阶段中）
         * 可以触发当前自己所拥有的牌是否可以“重铸”
         */
        _chongzhu: ExSkillData;
        _lianhuan: ExSkillData;
        _lianhuan2: ExSkillData;
        _lianhuan3: ExSkillData;
        _lianhuan4: ExSkillData;

        [key:string]:SMap<any>|ExSkillData;
    };

    /**
     * 武将数据中心
     * （所有扩展的character都会集中到这里）
     */
    character: HeroData[];
    /** 珠联璧合武将数据中心 */
    perfectPair: SMap<string[]>;
    /** 卡堆数据中心 */
    cardPile: SMap<CardBaseData[]>;

    /** 【联网】消息中心 */
    message: {
        server: Lib.message.Server;
        client: Lib.message.Client;
    };

    /** 花色的常量列表 */
    suit: string[];
    /** 国家势力的常量列表 */
    group: string[];
    /** 属性伤害的常量列表 */
    nature: string[];
    linked: string[];
    /** 势力的样式配置（颜色UI） */
    groupnature: SMap<string>;
    
}

