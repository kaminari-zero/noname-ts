// var fs=require('fs');
// var http=require('http');
// var opts = require('url').parse(encodeURI("http://ctos1197457256.asuscomm.com:30000/eve/noname-ts/raw/master/card/extra.js"));
// opts.headers={'User-Agent': 'AppleWebkit'};
// console.log(opts);
// var request = http.get(opts, function(response) {
//     console.log("request response:"+response);
//     var stream=response.pipe(file);
//     stream.on('finish',function(){
//         console.log("succuss:",arguments);
//     });
//     stream.on('error',function(e){
//         console.log("err:"+e);
//     });
// });

/** 输出打印日志的到控制台与日志文件 */
// function createConsoleDebugLog() {
//     /** 添加format方法 */
//     Date.prototype.format = function (format) {

//         if (!format) {
//             format = 'yyyy-MM-dd HH:mm:ss';
//         }

//         // 用0补齐指定位数
//         let padNum = function (value, digits) {
//             return Array(digits - value.toString().length + 1).join('0') + value;
//         };

//         // 指定格式字符
//         let cfg = {
//             yyyy: this.getFullYear(),             // 年
//             MM: padNum(this.getMonth() + 1, 2),        // 月
//             dd: padNum(this.getDate(), 2),           // 日
//             HH: padNum(this.getHours(), 2),          // 时
//             mm: padNum(this.getMinutes(), 2),         // 分
//             ss: padNum(this.getSeconds(), 2),         // 秒
//             fff: padNum(this.getMilliseconds(), 3),      // 毫秒
//         };

//         return format.replace(/([a-z]|[A-Z])(\1)*/ig, function (m) {
//             return cfg[m];
//         });
//     }

//     if(typeof __dirname==='string'&&__dirname.length && require) { //fs环境下

//         let fs = require('fs');
//         let options = {
//             flags: 'a',     // append模式
//             encoding: 'utf8',  // utf8编码
//         };

//         let stdout = fs.createWriteStream('./stdout.log', options);
//         let stderr = fs.createWriteStream('./stderr.log', options);

//         console.log("console.Console:",console.Console);
//         // 创建logger
//         let logger = new console.Console(stdout, stderr);
//         function loggerLog() {
//             if(!DEBUG) return;
//             let time = new Date().format('yyyy-MM-dd HH:mm:ss.fff');
//             let rest = Array.prototype.splice.call(arguments, 0);
//             logger.log(`[${time}] - log message:`,rest);
//         }
//         function errorLog() {
//             if(!DEBUG) return;
//             let time = new Date().format('yyyy-MM-dd HH:mm:ss.fff');
//             let rest = Array.prototype.splice.call(arguments, 0);
//             logger.error(`[${time}] - err message:`,rest);
//         }

//         // return [
//         //     loggerLog,
//         //     errorLog
//         // ];
//         return [
//             logger.log,
//             logger.error
//         ]
//     }

//     return [console.log,console.error];
// }

function createConsoleDebugLog() {
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
    if(typeof __dirname==='string'&&__dirname.length && require) { //fs环境下
        
        let fs = require('fs');
        let options = {
            flags: 'a',     // append模式
            encoding: 'utf8',  // utf8编码
        };
        
        // let stdout = fs.createWriteStream('./stdout.log', options);
        // let stderr = fs.createWriteStream('./stderr.log', options);
        let oupUrl = './log.txt';
        if( fs.existsSync(oupUrl) ) {
            fs.unlink(oupUrl,function(){});
        }
        
        // printDebug("createConsoleDebugLog"+console.Console);
        // 创建logger(运行环境中没有console.Console)
        // let logger = new console.Console(stdout, stderr);
        function loggerLog() {
            // if(!DEBUG) return;
            let time = new Date().format('yyyy-MM-dd HH:mm:ss.fff');
            let start = `[${time}] - log message:`;
            let rest = Array.prototype.splice.call(arguments, 0);
            // logger.log(`[${time}] - log message:`,rest);
            var data = start+rest.join("\n")+"\n";
            fs.appendFile(oupUrl,data,function(){
                console.log("loggerLog",arguments)
            });
        }
        function errorLog() {
            // if(!DEBUG) return;
            let time = new Date().format('yyyy-MM-dd HH:mm:ss.fff');
            let start = `[${time}] - err message:`;
            let rest = Array.prototype.splice.call(arguments, 0);
            // logger.error(`[${time}] - err message:`,rest);
            var data = start+rest.join("\n")+"\n";
            fs.appendFile(oupUrl,data,function(){
                console.log("errorLog",arguments)
            });
        }

        return [
            loggerLog,
            errorLog
        ]
    }

    return [console.log,console.error];
}

var printLogFun = createConsoleDebugLog();
console.log("printLogFun",printLogFun);
/** 输出日志 */
var printLog = printLogFun[0];
/** 输出错误日志 */
var printErrorLog = printLogFun[1];

for (let i = 0; i < 100; i++) {
 
    let time = new Date().format('yyyy-MM-dd HH:mm:ss.fff');
   
    printLog(`[${time}] - log message ${i}`);
    printErrorLog(`[${time}] - err message ${i}`);
  }