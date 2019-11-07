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
 */
type HeroData = [string, string, number, string[], string[]];