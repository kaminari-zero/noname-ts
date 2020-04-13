//开发用的格式：
/** 武将开发用数据 */
interface DevCharacterData {
    /** 武将用于读取用的key名 */
    name: string;
    /** 角色的昵称 */
    nickName?:string;
    
    /** 联机武将禁用列表 */
    connectBanned?: boolean;

    /** 
     * 武将基本配置信息
     */
    character:HeroData;
    /** 武将介绍 */
    characterIntro?: string;
    /** 武将标题（用于写称号或注释） */
    characterTitle?: string;
    /** 技能 */
    skill?: SMap<ExSkillData>;

    /** 
     * 翻译（本地化）
     * 该扩展使用的常量字符串
     */
    translate?: SMap<string>;
}

/** 卡牌开发用数据 */
interface DevCardData {
    /** 卡牌用于读取用的key名 */
    name: string;
    /** 卡牌的名字 */
    cardName:string;

    /** 卡牌基本配置信息 */
    card: ExCardData;

    /** 卡牌技能 */
    skill?: SMap<ExSkillData>;

    /** 卡牌的描述 既“_info”部分 */
    description:string;

    /** 配置用于视为牌标记的文字，既“_bg”部分 */
    bgName?:string;
}