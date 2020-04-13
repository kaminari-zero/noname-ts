/**
 * 武将包的配置信息（import:character）
 */
interface CharacterConfigData extends ExCommonConfig {
    /** 该武将包是否可以联机 */
    connect?: boolean;
    /** 联机武将禁用列表 */
    connectBanned?: string[];

    /** 
     * 武将基本配置信息
     */
    character: SMap<HeroData>;
    /** 武将介绍 */
    characterIntro?: SMap<string>;
    /** 武将标题（用于写称号或注释） */
    characterTitle?: SMap<string>;
    /** 技能 */
    skill?: SMap<ExSkillData>;
    /** 珠联璧合武将 */
    perfectPair?: SMap<string[]>;
    /** 指定武将的过滤方法（传入一个mode，用于过滤玩法模式） */
    characterFilter?: SMap<OneParmFun<string, boolean>>;
    /** 用于筛选（具体日后讨论） */
    characterSort?: SMap<SMap<string[]>>;

    /** 该武将包独有的卡牌（或者是特殊卡牌） */
    card?: SMap<ExCardData>;
    /** 定义自定义卡牌类型的排序用的优先级 */
    cardType?: SMap<number>;
}

/** 
 * 武将信息:
 * [ 0string,1string,2number,3string[],4string[],.....其他特殊扩展 ]
 * 0："性别",
 * 1："势力",
 * 2：体力,
 * 3：["技能"],
 * 4：[可以保持图片，一些卡片标记，如："zhu","boss",""...,或者一些带前缀的特殊文本，例如：des:xxxx，表示描述]
 * 
 * ===============
 * 额外增加个人需要的特殊信息：
 * 在4中，拥有"ZJNGEx"标记，表示这位zjsha扩展人物，5为扩展内容:[zjsha势力,血槽]
 * 1属性（即原势力），7zj杀势力，8血槽，9zj杀角色标记，暂时未想好 （从倒数开始数，倒数三个）
 */
type HeroData = [string, string, number, string[], string[],...any[]];

/** 武将信息索引 */
declare const enum HeroDataFields {
    /** 性别 */
    sex=0,
    /** 国家势力 */
    group=1,
    /** 血量 */
    hp=2,
    /** 技能 */
    skills=3,
    /** 额外携带信息 */
    exInfo=4,
    //zj杀扩展的结构：
    zjshaInfo=5
}