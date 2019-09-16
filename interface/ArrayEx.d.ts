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
    add(...args:any):Array<T>|boolean;
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
}