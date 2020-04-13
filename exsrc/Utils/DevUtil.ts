namespace NG {
     /**
     * 特定环境的工具（nodejs环境）【参与逻辑】
     */
    export module DevUtil {
        //*********************************自定义方法区*************************************
        var isUseVersion = false;
        var DEBUG = true;
        var ALERT_DEBUG = false;
        export var version = "";//在外面赋值

        /** 大佬的更新地址 */
        export var updateUrl = "http://ctos1197457256.asuscomm.com:30000/eve/noname-ts/raw/";

        /** 添加format方法 */
        Date.prototype.format = function (format) {

            if (!format) {
                format = 'yyyy-MM-dd HH:mm:ss';
            }

            // 用0补齐指定位数
            let padNum = function (value, digits) {
                return Array(digits - value.toString().length + 1).join('0') + value;
            };

            // 指定格式字符
            let cfg = {
                yyyy: this.getFullYear(),             // 年
                MM: padNum(this.getMonth() + 1, 2),        // 月
                dd: padNum(this.getDate(), 2),           // 日
                HH: padNum(this.getHours(), 2),          // 时
                mm: padNum(this.getMinutes(), 2),         // 分
                ss: padNum(this.getSeconds(), 2),         // 秒
                fff: padNum(this.getMilliseconds(), 3),      // 毫秒
            };

            return format.replace(/([a-z]|[A-Z])(\1)*/ig, function (m) {
                return cfg[m];
            });
        }

        /** 自定义方法：获取分支版本文件夹：master,v1.xxx之类(暂时用不上) */
        export function getVersionUrl(isV, versionStr) {
            if (isV) {
                if (versionStr) return "v" + versionStr + "/";
                return "v" + version + "/";
            }

            return "master/";
        }

        /** 自定义方法：alert打印debug */
        export function printDebug(...args) {
            if (ALERT_DEBUG && DEBUG) return;
            let rest = Array.prototype.splice.call(arguments, 0);
            //之后可再此对应将类型结构化打印
            let body2 = "";
            if (rest && rest.length > 0) {
                body2 = rest.join("\n");
            }
            alert(body2);
        }
        
        /** 输出打印日志的到控制台与日志文件 */
        function createConsoleDebugLog() {

            // @ts-ignore
            if (typeof __dirname === 'string' && __dirname.length && require) { //fs环境下
                // @ts-ignore
                let fs = require('fs');
                let options = {
                    flags: 'a',     // append模式
                    encoding: 'utf8',  // utf8编码
                };
                let outUrl = './log.txt';
                let outErrorUrl = "./errorLog.txt";
                if (fs.existsSync(outUrl)) {
                    fs.unlink(outUrl, function () { });
                }
                if (fs.existsSync(outErrorUrl)) {
                    fs.unlink(outErrorUrl, function () { });
                }
                
                let outQueue = [];
                let outErrorQueue = [];
                function loggerLog() {
                    if (!DEBUG) return;
                    let time = new Date().format('yyyy-MM-dd HH:mm:ss.fff');
                    let start = `[${time}] - log message:`;
                    let rest = Array.prototype.splice.call(arguments, 0);
                    // logger.log(`[${time}] - log message:`,rest);
                    var data = start + rest.join("\n") + "\n";
                    outQueue.push(data);
                    fs.appendFile(outUrl, outQueue.shift(), function () { });
                }
                function errorLog() {
                    if (!DEBUG) return;
                    let time = new Date().format('yyyy-MM-dd HH:mm:ss.fff');
                    let start = `[${time}] - err message:`;
                    let rest = Array.prototype.splice.call(arguments, 0);
                    // logger.error(`[${time}] - err message:`,rest);
                    var data = start + rest.join("\n") + "\n";
                    outErrorQueue.push(data);
                    fs.appendFile(outErrorUrl, outErrorQueue.shift(), function () { });
                }

                return [
                    loggerLog,
                    errorLog
                ]
            }

            return [console.log, console.error];
        }

        var printLogFun = createConsoleDebugLog();
        /** 输出日志 */
        export var printLog:RestParmFun<void> = printLogFun[0];
        /** 输出错误日志 */
        export var printErrorLog:RestParmFun<void> = printLogFun[1];
    }
}