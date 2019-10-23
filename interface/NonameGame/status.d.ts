declare var _status:Status;
interface Status {
    paused:boolean,
    paused2:boolean,
    paused3:boolean,
    over:boolean,
    clicked:boolean,
    auto:boolean,

    /** 【核心】游戏当前事件 */
    event:GameEvent;
    
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

    /** 当前播放的音乐 */
    currentMusic:string;
}