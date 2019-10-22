declare var lib:Lib;
/**
 * 游戏内的主要信息储存区域，与核心游戏方法对象
 */
interface Lib {
    configprefix: string;
    versionOL: number;
    /** 更新地址 */
    updateURL: string;
    /** 更新的镜像地址 */
    mirrorURL: string;
    /** 联机地址 */
    hallURL: string;
    /** 网络资源地址 */
    assetURL: string;
    changeLog: any[];
    updates: any[];
    canvasUpdates: any[];
    video: any[];
    skilllist: any[];
    connectBanned: any[];
    characterIntro: any;
    characterTitle: any;
    characterPack: any;
    characterFilter: any;
    characterSort: SMap<SMap<string[]>>;
    cardPack: any;
    onresize: any[];
    onphase: any[];
    onwash: any[];
    onover: any[];
    ondb: any[];
    ondb2: any[];
    /** 聊天历史 */
    chatHistory: [string,string][];
    arenaReady: any[];
    onfree: any[];
    /** 在牌堆里牌(指不区分数字，花色，伤害属性的牌) */
    inpile: string[];
    extensions: any[];
    extensionPack: SMap<any>;
    cardType: any;
    hook: {
        globaltrigger: any;
        globalskill: any;
    };
    hookmap: any;
    /** 已经导入的扩展 */
    imported: any;
    layoutfixed: string[];
    characterDialogGroup: SMap<(name: any, capt: any)=>void>
    listenEnd(node: any):any;
    /** 菜单配置 */
    configMenu: SMap<CommonMenuConfigData>;
    /** 扩展菜单 */
    extensionMenu: SMap<ExtensionMenuConfigData>;
    /** 开始模式选择菜单 */
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
    };
    /** 
     * 帮助内容数据中心
     * 帮助内容将显示在菜单－选项－帮助中
     * （所有扩展的help都会集中到这里）
     */
    help: SMap<string>;
    setIntro(node: HTMLDivElement, func: any, left: any):any;
    setPopped(node: HTMLDivElement, func: any, width: any, height: any, forceclick: any, paused2: any):any;
    placePoppedDialog(dialog: any, e: any):any;
    setHover(node: HTMLDivElement, func: any, hoveration: any, width: any):any;
    setScroll(node: HTMLDivElement):any;
    setMousewheel(node: HTMLDivElement):any;
    setLongPress(node: HTMLDivElement, func: any):any;
    updateCanvas(time: any):any;
    run(time: any):any;
    getUTC(date: any):any;
    saveVideo():any;
    init: Lib.Init;
    cheat: Lib.Cheat;
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
        list: any[];
    },
    /** 游戏内自定义的过滤方法 */
    filter: Lib.Filter;
    /** 游戏内自定义的sort排序方法 */
    sort: Lib.Sort;
    /**
     * 技能数据中心
     * （所有扩展的skill都会集中到这里）
     */
    skill: {
        /** 保存游戏内所有全局技能 */
        global: any[];
        /** 保存的技能信息与玩家之间的关系map,目前在项目内没看出有什么用 */
        globalmap: any;
        storage: any;
        /**
         * 不计入距离的计算且不能使用牌且不是牌的合法目标
         * （目前该标记直接标记到技能的group中，拥有该技能就是被隔离出游戏，目前还没见使用到这成员）
         * 目前在项目内没什么用，只有标记到技能的group中使用，用于免除某些阶段结算
         */
        undist: any;
        others: any;
        zhu: any;
        zhuSkill: any;
        land_used: any;

        //以下皆为游戏内预设的全局特殊节能
        unequip: ExSkillData,
        subplayer: ExSkillData,
        autoswap: ExSkillData,
        dualside: ExSkillData,
        _disableJudge: ExSkillData,
        _disableEquip: ExSkillData,
        fengyin: ExSkillData,
        baiban: ExSkillData,
        qianxing: ExSkillData,
        mianyi: ExSkillData,
        /**
         * 特殊技能：混乱
         * 标记技能
         * 进入“混乱”状态的情况下，不能操作（自己的面板），player.isMine的结果也是false（不能确定当前玩家是自己）
         */
        mad: ExSkillData,
        ghujia: ExSkillData,
        /**
         * 特殊技能：计算触发次数
         * 触发阶段：phaseAfter（回合结束之后）
         * 当技能存在“usable”每回合使用次数时，在创建技能事件时，添加该技能。
         * 其作用是，在回合结束时，清除player.storage.counttrigger触发技术。
         */
        counttrigger: ExSkillData
        _recovercheck: ExSkillData,
        _turnover: ExSkillData,
        _usecard: ExSkillData,
        _discard: ExSkillData,
        /**
         * 特殊技能：濒死阶段循环询问求救
         * 触发阶段：濒死阶段触发
         */
        _save: ExSkillData,
        _ismin: ExSkillData,
        _chongzhu: ExSkillData,
        _lianhuan: ExSkillData,
        _lianhuan2: ExSkillData,
        _lianhuan3: ExSkillData,
        _lianhuan4: ExSkillData
    };
    /**
     * 武将数据中心
     * （所有扩展的character都会集中到这里）
     */
    character: any;
    perfectPair: any;
    /** 卡堆数据中心 */
    cardPile: any;

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

