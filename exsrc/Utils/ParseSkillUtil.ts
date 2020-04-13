// //还未开始设计
// namespace TestSkill {
//     /** 技能工具，添加片段代码 */
//     export class SkillUtil {
//         /** 
//          * 【主动技】你自己可以选择是否发动的技能。
//          * 
//          * 
//          */
//         static ZhuDongJi(skill:ExSkillData,enable:string | string[]) {
//             let tempSkillInfo:ExSkillData = {
//                 enable:enable
//             };
            
//             return tempSkillInfo;
//         }

//         /**
//          * 获得触发时点名
//          * @param triggerType 
//          * @param triggerTimeType 
//          */
//         static getTriggerName(triggerType:string,triggerTimeType:string){
//             let _triggerType = CardConst[triggerType];
//             if(!_triggerType) { //若为空，则继续找

//             }
//             let _triggerTimeType = TriggerConst[triggerTimeType];
//             return _triggerType+_triggerTimeType;
//         }

//         //[自]使用一张《血》时
//         static getTrigger(str:string):ExTriggerData{
//             let decomposeStrs = [];
//             let replaceStrs = [];
//             decomposeStrs.unshift(str);
//             let trigger:ExTriggerData = {};
//             //目标
//             for (const key in TargetConst) {
//                 let targetName = `[${key}]`;
//                 let regex = new RegExp(`\\${targetName}\\`);
//                 let curStr = decomposeStrs[0];
//                 if(regex.test(curStr)) {
//                     replaceStrs.unshift(targetName);
//                     decomposeStrs.push(curStr.replace(regex,""));
//                 }
//             }
//             //行为
//             for (const key in ActionConst) {
//                 let targetName = `[${key}]`;
//                 let regex = new RegExp(`\\${targetName}\\`);
//                 let curStr = decomposeStrs[0];
//                 if(regex.test(curStr)) {
//                     replaceStrs.unshift(targetName);
//                     decomposeStrs.push(curStr.replace(regex,""));
//                 }
//             }
//             //卡牌条件
//             for (const key in CardConst) {
//                 let targetName = `《${key}》`;
//                 let regex = new RegExp(`${targetName}`);
//                 let curStr = decomposeStrs[0];
//                 if(regex.test(curStr)) {
//                     //数量：
//                     //检测条件是否有数字（检测前面是否带数字）:
//                     let numRegex = /([0-9一两三四五六七八九零])([张]{0,})/;
//                     if(numRegex.test(curStr)) {
//                         // let 
//                         // let result = numRegex.
//                     }
//                     replaceStrs.unshift(targetName);
//                     decomposeStrs.push(curStr.replace(regex,""));
//                 }
//             }
//             //时点（一般只允许有一个）
//             for (const key in TriggerConst) {
//                 let targetName = `${key}`;
//                 let regex = new RegExp(`${targetName}`);
//                 let curStr = decomposeStrs[0];
//                 if(regex.test(curStr)) {
//                     replaceStrs.unshift(targetName);
//                     decomposeStrs.push(curStr.replace(regex,""));
//                     break;
//                 }
//             }

//             // /** 
//             //  * 全场任意一个 
//             //  * 代表所有人
//             //  */
//             // global?: string | string[];
//             // /** 
//             //  * 玩家自己 
//             //  * 触发时件中，技能拥有者的角色为事件的发起者
//             //  */
//             // player?: string | string[];
//             // /**
//             //  * 你自己成为目标
//             //  */
//             // target?: string | string[];
//             // /**
//             //  * 来源是你自己
//             //  */
//             // source?: string | string[];
//             return trigger;
//         }

//         static parseStr() {

//         }
//     }

//     /** 触发的时机 */
//     export const TriggerConst = {
//         /** 开始前 */
//         "前":"Before",
//         /** 开始时/时 */
//         "时":"Begin",
//         /** 触发后/后 */
//         "后":"End",

//         //非常少用到后面两个
//         /** 触发结束后/结束后 */
//         "之后":"After",
//         /** 忽略/跳过 */
//         "跳过":"Omitted"
//     };

//     /** 游戏内主要卡牌的名字列表 */
//     export const CardConst = {
//         "血":"tao",
//         "魔":"jiu",
//         "杀":"sha",
//         "闪":"shan",
//     }

//     /** 主要的基本触发行为 */
//     export const ActionConst = {
//         "使用":"useCard",
//         "响应":"respond",
//     }

//     /** 目标代词： */
//     export const TargetConst = {
//         /** [自]你自己 */
//         "自":"player",
//     }
// }