declare var lib:Lib;
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
    chatHistory: any[];
    arenaReady: any[];
    onfree: any[];
    inpile: any[];
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
    element: {
        content: Lib.element.Content;
        player: Lib.element.Player;
        card: Lib.element.Card;
        button: Lib.element.Button;
        event: Lib.element.Event;
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
    filter: Lib.Filter,
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
        undist: any;
        others: any;
        zhu: any;
        zhuSkill: any;
        land_used: any;
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
        mad: ExSkillData,
        ghujia: ExSkillData,
        counttrigger: ExSkillData
        _recovercheck: ExSkillData,
        _turnover: ExSkillData,
        _usecard: ExSkillData,
        _discard: ExSkillData,
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
    cardPile: any;
    message: {
        server: Lib.message.Server;
        client: Lib.message.Client;
    };
    suit: string[];
    group: string[];
    nature: string[];
    linked: string[];
    /** 势力配置 */
    groupnature: SMap<string>;
    
}

