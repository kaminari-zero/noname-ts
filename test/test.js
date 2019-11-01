// var ddd={};

// (function(golbal){

//     var aaaa = 1;
//     var bbbb = 2;

//     //声明到全局：
//     var g = golbal;
//     g["ccc"] = {
//         a:aaaa,
//         b:bbbb
//     }
// })(ddd);

// // var g = globalThis;
// console.log("测试简单导出222：",ddd.ccc,window["ddd"]);

//随便添加点测试方法进去
//添加一些测试用的方法：

/**
 * 检测卡牌的配置
 */
window.checkCardsOpt = function (fieldName,isshowUndefined) {
    for (let i in lib.card) {
        let info = lib.card[i];
        if (!info) return "不存在该配置"
        if (!isshowUndefined && info[fieldName] === undefined) continue;
        console.log(i, ":", info[fieldName], ";类型：", info.type, "|子类型：", info.subtype);
    }
}
/**
 * 检测技能skill的配置
 */
window.checkSkillsOpt = function (fieldName,isshowUndefined) {
    for (let i in lib.skill) {
        let info = lib.skill[i];
        if (!info) return "不存在该配置"
        if (!isshowUndefined && info[fieldName] === undefined) continue;
        console.log(i, ":", info[fieldName]);
    }
}

/**
 * 是否显示自定义日志
 */
var isShowLog = true;
/**
 * 自定义一些log，需要自己手动写入源代码中执行
 */
window.testLog = function (type, name) {
    if (!isShowLog) return;
    let startTime = new Date().toLocaleString();
    let name2 = "";
    let body = "";
    let rest = Array.prototype.splice.call(arguments, 2);
    let body2 = "";
    if (rest && rest.length > 0) {
        body2 = rest.join(",");
    }
    //添加一个测试用日志，用来记录trigger触发：
    switch (type) {
        case 0:
            name2 = "Event";
            body = `创建事件${name}`;
            break;
        case 1:
            name2 = "EventEnd";
            body = `事件结束${name}`;
            break;
        case 2:
            name2 = "Trigger";
            body = `触发名${name}`;
            break;
        case 3:
            name2 = "TriggerList";
            body = `${name}触发列表`;
            break;
        case 4:
            name2 = "EventStart";
            body = `开始事件${name}`;
            break;
        case 5:
            name2 = "PhaseLoop";
            body = `${name}的回合开始`;
            break;
    }
    console.log(`【${name2}】${startTime}：[${body}]->${body2};`);
}