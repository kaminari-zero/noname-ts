//这里主要是声明各种游戏内常用的对象的结构

/** key为字符串的map */
interface SMap<V> {
    [key: string]: V
}

/** key为number的map */
interface NMap<V> {
    [key: number]: V
}

//从0个参数到任意参数的方法结构声明
type NoneParmFum<T> = () => T;
type OneParmFun<U, T> = (arg0: U) => T;
type TwoParmFun<U1, U2, T> = (arg0: U1, arg1: U2) => T;
type ThreeParmFun<U1, U2, U3, T> = (arg0: U1, arg1: U2, arg2: U3) => T;
type FourParmFun<U1, U2, U3, U4,T> = (arg0: U1, arg1: U2, arg2: U3,arg3:U4) => T;
type RestParmFun<T> = (...args) => T;

//尝试增加的符合类型声明：(后续看看是否要用上)
/** SingleAndArrayType:单体与集合类型 */
type SAAType<T> = T | T[];
/** 再价格可以返回这种类型的方法 */
type SAAFType<T> = T | T[] | RestParmFun<T>;
/** 有name属性的对象 */
type NameType = {name:string};
/** 技能或者卡牌 */
type SkillOrCard = string|NameType|Card;
/** 卡牌或者卡牌集合 */
type CCards = SAAType<Card>;

/**
 * 基础result结构
 * 
 * （基本通用，应该也有例外，暂无视）
 *  修订：将改成涉及主逻辑相关操作都会记录在这里。(暂时还是分离开，在代码中声明类型)
 */
interface BaseResultData {
    /**
     * 最终结果
     * 
     * 大多代表该事件到达这一步骤过程中的结果;
     * 一般用来标记当前事件是否按预定执行的，即执行成功
     */
    bool:boolean;
    
    links:any[];

    [key:string]:any;
}

/**
 * 一般用于带操作的事件的最终结果
 * 例如：choose系列
 */
interface BaseCommonResultData extends BaseResultData {
    /** 记录返回当前事件操作过程中的卡牌 */
    cards:Card[];
    /** 记录返回当前事件操作过程中的目标 */
    targets:Player[];
    /** 记录返回当前事件操作过程中的按钮 */
    buttons:Button[];
    /** 记录返回当前事件操作过程中，面板按钮的确定取消 */
    confirm:string;
}

/**
 * content触发内容：
 * 经过game.createEvent创建事件，设置setContent，
 * 经过lib.init.parse转换，
 * 在game.loop内，传入这些参数调用。
 *  
 *  _status:Status, lib:Lib, game:Game, ui:UI, get:Get, ai:AI这6大对象，不需要在参数列表中
 */
type ContentFunc = ContentFuncByAll | ContentFuncByNormal;
type ContentFuncByAll = (event: GameEvent, step: number, source: Player, player: Player, target: Player, targets: Player[], card: Card, cards: Card[], skill: string, forced: boolean, num: number, trigger: GameEvent, result: BaseResultData) => void;
//扩充一些额外得搭配参数(简化参数配置),改成基本参数求event给就行了
//这里只是用于方便些代码的声明，实际上的参数列表，是执行了parse后转换的函数参数，所以不用在意这里的位置关系，只要名字一致就行了
type ContentFuncByNormal = (event: GameEvent, player: Player, trigger: GameEvent,result: BaseResultData)=>void;

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
/** nogame的player类型->一般用于AI相关的方法中，代表视角,一般指代player(玩家自身)或者target(目标)，视角决定效果的正负 */
type Viewer = Lib.element.Player;
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
/** 标记等信息的缓存(Storage 被占用了) */
type GameStorage = Map<string,any>;

/** 
 * nogame的选择范围类型
 * 下标0：
 * 下标1：选中的数量。-1为所有
 * 或者直接表示，下标0~下标1的范围
 */
type Select = [number,number];
/**
 * div的左距离坐标，上距离坐标
 */
type DivPosition = [number,number,number,number];