declare namespace Lib.element {

interface Event {
    finish(): any;
    cancel(): any;
    goto(step: any): any;
    redo(): any;
    set(key: any, value: any): any;
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