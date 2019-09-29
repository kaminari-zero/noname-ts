declare namespace Lib.element {

interface Event {
    finish(): any;
    cancel(): any;
    goto(step: any): any;
    redo(): any;
    /**
     * 设置一个key到event里，用于保存，传递数据
     * 设置进event的值，还会另外保存在_set集合中，用于缓存，set的数据（有可能也用于标记）
     * @param key 若key不为字符串，且只有一个参数时，则执行批量set
     * @param value 
     */
    set(key: string|[string,any][], value?: any): any;
    setContent(name: any): any;
    getLogv(): any;
    send(): any;
    resume(): any;
    getParent(level: any, forced: any): any;
    getTrigger(): any;
    getRand(): any;
    insert(func: any, map: any): any;
    insertAfter(func: any, map: any): any;
    backup(skill: any): any;
    restore(): any;
    /**
     * 判断当前event.player是不是自己，
     * 并且当前不处与自动状态中（托管）
     * 并且当前不处于isMad混乱状态（应该是某些模式，卡牌特有的效果）
     */
    isMine(): any;
    isOnline(): any;
    notLink(): any;
    addTrigger(skill: any, player: any): any;
    /**
     * 发送触发事件
     * @param name 
     */
    trigger(name: any): any;
    untrigger(all: any, player: any): any;
}
}