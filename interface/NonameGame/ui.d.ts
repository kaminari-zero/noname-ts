declare var ui:UI;
interface UI {
    updates:[],
    thrown:[],
    touchlines:[],
    todiscard:{},
    refresh(node):any;
    create:UI.Create,
    click:UI.Click,
    /** 选中的ui */
    selected:{
        /** 选中的按钮列表（技能，操作） */
        buttons:any[],
        /** 选中的卡牌列表 */
        cards:any[],
        /** 选中的玩家目标列表 */
        targets:any[]
    },
    clear():any;
    updatec():any;
    updatex():any;
    updatexr():any;
    updatejm(player,nodes,start,inv):any;
    updatem(player):any;
    updatej(player):any;
    updatehl():any;
    updateh(compute):any;
    updatehx(node):any;
    updated():any;
    updatez():any;
    update():any;
    recycle(node,key):any;
}