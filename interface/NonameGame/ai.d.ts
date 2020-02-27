declare var ai:AI;
interface AI {
    basic:AIBasic;
    get:Get;
}

/** 项目预定义的ai原生操作方法 */
interface AIBasic {
    chooseButton(check):any;        
    chooseCard(check):any;        
    chooseTarget(check):any;
}