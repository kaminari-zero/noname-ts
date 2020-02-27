//实现一些书写代码常用的结构

/** 
 * 抽离一部分参数实现game.check中event使用到的属性（暂时只记录常用的，看起来有用的）
 */
interface CheckEventData {
    /**
     * 选择的牌需要满足的条件
     * 可以使用键值对的简便写法
     * 也可以使用函数返回值（推荐）
     */
    filterCard?: boolean | SMap<string> | OneParmFun<Card, boolean>;
    /**
     * 选择的目标需要满足的条件
     */
    filterTarget?(card: Card, player: Player, target: Target): boolean;
    /**
     * 需要选择多少张牌才能发动
     * 选择的牌数
     * -1时，选择所有牌,否则就是指定数量的牌
     * 数组时，这个数组就是选择牌数的区间,其中任意（至少一张）：[1,Infinity]
     * 为变量时（具体情况具体分析），例：()=>number
     */
    selectCard?: number | Select | OneParmFun<Card, number>;
    /**
     * 需要选择多少个目标才能发动
     * 选择的目标数：
     * 为-1时，选择全部人
     * 为数组时，这个数组就是选择目标数的区间
     */
    selectTarget?: number | Select;

    /** 过滤不可选择按钮 */
    filterButton?(button: Button, player: Player): boolean;
    /** 按钮的可选数量，大多数情况下，默认1 */
    selectButton?: number | Select | NoneParmFum<number | Select>;

    /** 
     * 指定获取卡牌的位置：
     * 'h'：手牌区, 'e'：装备区, 'j'：判定区 
     */
    position?: string;

    /**
     * 是否强制标记，取值为true时，game.check的返回值，会变false（一般情况下）需要手动执行；返回值为true则自动确认
     */
    forced?: boolean;

    //ai相关
    ai1?: Function;
    ai2?: Function;

    //显示提示相关：
    /** 显示的提示文本 */
    prompt?: string;
    /** 显示的提示文本2(下面一行的文本) */
    prompt2?: string;

}

/**
 * 当前游戏状况信息（一般用于联机模式下保存数据用的结构）
 */
interface AreanStateInfo {
    number: number,
    players: NMap<any>,
    mode: string,
    dying: any[],
    servermode: string,
    roomId: any,
    over: boolean
}

/** 录像数据 */
interface VideoData {
    type: string;
    /** 坐位号 */
    player: string;
    delay: number;
    content: any;
}

/** 
 * 判定方法的基本声明 
 * 
 * 其判定的结果值，
 * 大于0，则result.bool=true，结果为”洗具“；
 * 小于0，则result.bool=false，结果为”杯具“;
 * 等于0，则result.bool=null，当前无结果;
 */
type JudgeFun = (jResult: JudgeResultData) => number;

//result的结构：
/** 判断阶段的事件reslut */
interface JudgeResultData extends BaseResultData {
    /**
     * 用于该次判定结果的牌
     */
    card: Card;
    /** 
     * 判定结果牌的名字
     * （有该属性，可以视为card,直接使用get.卡牌相关方法） 
     */
    name:string;
    /** 判定的卡牌点数 */
    number: number;
    /** 4中基本花色：♠，♥，♣，♦ */
    suit: string;
    /** 2大花色：红黑 */
    color: string;
    /**
     * 用于抛出显示的判定牌（貌似是副本,非game.online）
     */
    node: Card;

    /** 
     * 判定的结果值
     * （event.judge中处理的event.result没有该结果，是在处理完后才设置该结果）
     * 
     * 大于0，则result.bool=true，结果为”洗具“；
     * 小于0，则result.bool=false，结果为”杯具“;
     * 等于0，则result.bool=null，当前无结果;
     * 注：在获得最终结果之前有一个“judge”的mod检测。
     */
    judge: number;

    /** 
     * 新版本的judge事件中 可以通过设置callback事件 在judgeEnd和judgeAfter时机之前对判定牌进行操作
     * 
     * 在判断结果出来后，若事件event.callback存在，则发送“judgeCallback”事件
     */
    callback:TwoParmFun<Player,any,void>|ContentFunc;
}

/** 
 * 拼点事件的result
 * 
 * 用于chooseToCompare
 * 示例：
 * result.bool==true;//6>1
    result.tie==false;//不是平局
    result.player  //你的拼点牌
    result.target  //目标的拼点牌
    result.num1==6   //你的点数为6
    result.num2==1   //目标的点数为1
 */
interface PingDianResultData extends BaseResultData {
    /** 是否平局 */
    tie:boolean;
    /** 你的拼点牌 */
    player:Card;
    /** 目标的拼点牌 */
    target:Card;
    /** 你的点数 */
    num1:number;
    /** 目标的点数 */
    num2:number;
}

/**
 * 多人拼点事件的result
 * 
 * 用于chooseToCompareMultiple
 */
interface PingDianMultipleResultData extends BaseResultData {
    /** 你的拼点牌 */
    player:Card;
    /** 目标的拼点牌 */
    targets:Card[];
    /** 你的点数 */
    num1:number[];
    /** 目标的点数 */
    num2:number[];
}