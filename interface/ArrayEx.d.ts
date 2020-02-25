//noname内扩展的一些array方法：
interface Array<T> {
    // find （Array早已有find方法，不好定义，暂不声明）
    /**
     * 是否包含这一元素
     * @param item 
     */
    contains(item):boolean;
    /**
     * 添加任意元素进数组中
     * @param args 
     */
    add(...args):Array<T>|boolean;
    /**
     * 添加一个数组的元素到该数组中
     * @param arr 
     */
    addArray(arr:any[]):Array<T>;
    /**
     * 移除一个元素出该数组
     * @param item 
     */
    remove(item:any):Array<T>|boolean;
    /**
     * 移除一个数组的元素出该数组
     * @param arr 
     */
    removeArray(arr:any[]):Array<T>;
    /**
     * 随机获得该数组的一个元素
     */
    randomGet():T;
    /**
     * 随机移除数组的一个/多个元素
     * @param num 若num有值的情况下，则移除num个元素
     */
    randomRemove(num?:number):T|T[];
    /**
     * 随机重新排序数组（数组乱序）
     */
    randomSort():Array<T>;
    /**
     * 随机获取数组的元素
     * 返回的是一个重新整合的数组
     * @param num 获取的数量
     */
    randomGets(num:number):Array<T>;
    /**
     * 应该是对所有玩家进行排序
     * 其排序，使用的是lib.sort.seat
     * @param target 所有玩家
     */
    sortBySeat(target:any):Array<T>;
    /** 
     * 将一个Array中所有位于处理区的卡牌过滤出来
     * 
     * 例：设一list为[c1,c2,c3,c4]，其中c1和c3是位于处理区的卡牌
     * 那么list.filterInD()得到的结果即为[c1,c3]
     * 
     * 在1.9.97.8.1或更高的版本中: 
     * 可通过直接在括号中填写一个区域 来判断处于特定区域的卡牌 
     * 例：list.filterInD('h') 即判断数组中所有位于手牌区的卡牌
     */
    filterInD(poiston?:string);

    //关于处理区：
    /*
    不知道处理区是什么的同学们 请自行查阅凌天翼规则集相关内容太长了我懒得贴
    处理区在无名杀的代码为ui.ordering
    为方便兼容旧扩展 使用get.position(card)方法读取处理区的卡牌 默认得到的仍然是弃牌堆（'d'）
    使用get.position(card,true) 才会得到处理区（'o'）的结果

    处理区：（不清楚无名杀对其的实验是否满足这些要求）
    一个最常被用到，但是尚未命名的区域。
    当你使用一张牌等待结算或处于结算中，
    当你和另一名角色拼点的两张牌失去时，
    当你和另一名角色交换的牌失去时，
    当你的牌被张辽或张郃搞的失去时……
    总之，当一张牌不在任何角色的手牌、装备区或判定区里，
    也不在牌堆或弃牌堆里，也没有被移出游戏，那么它就是在这个尚未命名的区域里。
    为了便于行文，在本规则与FAQ集中暂且称之为‘处理区’。
    */

    
}