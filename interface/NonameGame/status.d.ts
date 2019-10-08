interface Status {
    paused:boolean,
    paused2:boolean,
    paused3:boolean,
    over:boolean,
    clicked:boolean,
    auto:boolean,
    /** 游戏当前事件 */
    event:{
        finished:boolean,
        next:any[],
        after:any[]
    },
    ai:any,
    lastdragchange:any[],
    skillaudio:any[],
    dieClose:any[],
    dragline:any[],
    dying:any[];


    /*  扩展成员  */

    /** 当前是否播放录像中 */
    video:boolean;
    /** delay延时游戏的setTimeout标记 */
    timeout:number;
}