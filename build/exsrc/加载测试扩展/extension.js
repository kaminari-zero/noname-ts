var NG;
(function (NG) {
    var DevUtil;
    (function (DevUtil) {
        var isUseVersion = false;
        var DEBUG = true;
        var ALERT_DEBUG = false;
        DevUtil.version = "";
        DevUtil.updateUrl = "http://ctos1197457256.asuscomm.com:30000/eve/noname-ts/raw/";
        Date.prototype.format = function (format) {
            if (!format) {
                format = 'yyyy-MM-dd HH:mm:ss';
            }
            var padNum = function (value, digits) {
                return Array(digits - value.toString().length + 1).join('0') + value;
            };
            var cfg = {
                yyyy: this.getFullYear(),
                MM: padNum(this.getMonth() + 1, 2),
                dd: padNum(this.getDate(), 2),
                HH: padNum(this.getHours(), 2),
                mm: padNum(this.getMinutes(), 2),
                ss: padNum(this.getSeconds(), 2),
                fff: padNum(this.getMilliseconds(), 3),
            };
            return format.replace(/([a-z]|[A-Z])(\1)*/ig, function (m) {
                return cfg[m];
            });
        };
        function getVersionUrl(isV, versionStr) {
            if (isV) {
                if (versionStr)
                    return "v" + versionStr + "/";
                return "v" + DevUtil.version + "/";
            }
            return "master/";
        }
        DevUtil.getVersionUrl = getVersionUrl;
        function printDebug() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (ALERT_DEBUG && DEBUG)
                return;
            var rest = Array.prototype.splice.call(arguments, 0);
            var body2 = "";
            if (rest && rest.length > 0) {
                body2 = rest.join("\n");
            }
            alert(body2);
        }
        DevUtil.printDebug = printDebug;
        function createConsoleDebugLog() {
            if (typeof __dirname === 'string' && __dirname.length && require) {
                var fs_1 = require('fs');
                var options = {
                    flags: 'a',
                    encoding: 'utf8',
                };
                var outUrl_1 = './log.txt';
                var outErrorUrl_1 = "./errorLog.txt";
                if (fs_1.existsSync(outUrl_1)) {
                    fs_1.unlink(outUrl_1, function () { });
                }
                if (fs_1.existsSync(outErrorUrl_1)) {
                    fs_1.unlink(outErrorUrl_1, function () { });
                }
                var outQueue_1 = [];
                var outErrorQueue_1 = [];
                function loggerLog() {
                    if (!DEBUG)
                        return;
                    var time = new Date().format('yyyy-MM-dd HH:mm:ss.fff');
                    var start = "[" + time + "] - log message:";
                    var rest = Array.prototype.splice.call(arguments, 0);
                    var data = start + rest.join("\n") + "\n";
                    outQueue_1.push(data);
                    fs_1.appendFile(outUrl_1, outQueue_1.shift(), function () { });
                }
                function errorLog() {
                    if (!DEBUG)
                        return;
                    var time = new Date().format('yyyy-MM-dd HH:mm:ss.fff');
                    var start = "[" + time + "] - err message:";
                    var rest = Array.prototype.splice.call(arguments, 0);
                    var data = start + rest.join("\n") + "\n";
                    outErrorQueue_1.push(data);
                    fs_1.appendFile(outErrorUrl_1, outErrorQueue_1.shift(), function () { });
                }
                return [
                    loggerLog,
                    errorLog
                ];
            }
            return [console.log, console.error];
        }
        var printLogFun = createConsoleDebugLog();
        DevUtil.printLog = printLogFun[0];
        DevUtil.printErrorLog = printLogFun[1];
    })(DevUtil = NG.DevUtil || (NG.DevUtil = {}));
})(NG || (NG = {}));
var NG;
(function (NG) {
    var Utils = (function () {
        function Utils() {
        }
        Utils.createHelp = function (content, type) {
            var _this = this;
            var str = "";
            var itemTag = "";
            var data;
            if (NG.ObjectUtil.isString(content)) {
                data = [content];
            }
            else if (NG.ObjectUtil.isArray(content)) {
                data = content;
            }
            else {
                console.error("content类型不正确！");
                return "";
            }
            for (var index = 0; index < data.length; index++) {
                var element = data[index];
                if (NG.ObjectUtil.isString(element)) {
                    var _a = [element, type ? type : "0"], text = _a[0], curType = _a[1];
                    switch (curType) {
                        case "0":
                            itemTag = "ol";
                            break;
                        case "1":
                            itemTag = "ul";
                            break;
                    }
                    str += "<li>" + text + "</li>";
                }
                else if (NG.ObjectUtil.isArray(element)) {
                    element.forEach(function (value, index, array) {
                        str += _this.createHelp(value, "1");
                    });
                }
            }
            str = "<" + itemTag + ">" + str + "</" + itemTag + ">";
            return str;
        };
        Utils.getDesc = function (desc) {
            desc = desc.replace(/\#\{[a-zA-Z]+\}/g, function (sub) {
                switch (sub) {
                    case "${content}":
                        return "";
                }
                return sub;
            });
            return desc;
        };
        Utils.setTrigger = function () {
        };
        Utils.loadDevData = function (extensionData, loadHeroDatas, loadCardDatas, skillDatas) {
            var packName = extensionData.key;
            var heros = extensionData.package.character;
            var cards = extensionData.package.card;
            var skills = extensionData.package.skill;
            var configs = extensionData.config;
            for (var i = 0; i < loadHeroDatas.length; i++) {
                var element = loadHeroDatas[i];
                var cfgName = packName + "_" + element.name;
                heros.character[cfgName] = element.character;
                heros.characterTitle[cfgName] = element.characterTitle;
                heros.characterIntro[cfgName] = element.characterIntro;
                heros.translate[cfgName] = element.nickName;
                var heroSkills = element.skill;
                for (var skillname in heroSkills) {
                    var skill = heroSkills[skillname];
                    skills.skill[skillname] = skill;
                    skills.translate[skillname] = skill.name;
                    skills.translate[skillname + "_info"] = skill.description;
                }
            }
            for (var i = 0; i < loadCardDatas.length; i++) {
                var element = loadCardDatas[i];
                var cfgName = packName + "_" + element.name;
                cards.card[cfgName] = element.card;
                cards.translate[cfgName] = element.cardName;
                cards.translate[cfgName + "_info"] = element.description;
                if (element.bgName) {
                    cards.translate[cfgName + "_bg"] = element.bgName;
                }
                var cardSkills = element.skill;
                for (var skillname in cardSkills) {
                    var skill = cardSkills[skillname];
                    skills.skill[skillname] = skill;
                    skills.translate[skillname + "_skill"] = skill.name;
                    skills.translate[skillname + "_skill_info"] = skill.description;
                }
            }
            for (var i = 0; i < skillDatas.length; i++) {
                var element = skillDatas[i];
                for (var skillname in element) {
                    var skill = element[skillname];
                    skills.skill[skillname] = skill;
                    skills.translate[skillname] = skill.name;
                    skills.translate[skillname + "_info"] = skill.description;
                }
            }
        };
        return Utils;
    }());
    NG.Utils = Utils;
})(NG || (NG = {}));
var NG;
(function (NG) {
    var ObjectUtil = (function () {
        function ObjectUtil() {
        }
        ObjectUtil.contains = function (obj, member) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop) && obj[prop] == member) {
                    return true;
                }
            }
            return false;
        };
        ObjectUtil.deepClone = function (obj, isDeep) {
            if (isDeep === void 0) { isDeep = true; }
            if (!obj || typeof obj !== 'object') {
                throw new Error("error type");
            }
            var targetObj = obj.constructor === Array ? [] : {};
            for (var keys in obj) {
                if (obj.hasOwnProperty(keys)) {
                    if (obj[keys] && typeof obj[keys] === 'object' && isDeep) {
                        targetObj[keys] = obj[keys].constructor === Array ? [] : {};
                        targetObj[keys] = this.deepClone(obj[keys], isDeep);
                    }
                    else {
                        targetObj[keys] = obj[keys];
                    }
                }
            }
            return targetObj;
        };
        ObjectUtil.clone = function (value, deep) {
            var _this = this;
            if (this.isPrimitive(value)) {
                return value;
            }
            if (this.isArrayLike(value)) {
                value = Array.prototype.slice.call(value);
                return value.map(function (item) { return deep ? _this.clone(item, deep) : item; });
            }
            else if (this.isPlainObject(value)) {
                var target = {}, key = void 0;
                for (key in value) {
                    value.hasOwnProperty(key) && (target[key] = deep ? this.clone(value[key], deep) : value[key]);
                }
            }
            var type = this.getRawType(value);
            switch (type) {
                case 'Date':
                case 'RegExp':
                case 'Error':
                    value = new Window[type](value);
                    break;
            }
            return value;
        };
        ObjectUtil.arrayClone = function (obj, deep) {
            if (deep === void 0) { deep = false; }
            var buf = [];
            var i = obj.length;
            while (i--) {
                buf[i] = deep ? arguments.callee(obj[i]) : obj[i];
            }
            return buf;
        };
        ObjectUtil.getKeys = function (obj) {
            var keys = [];
            for (var i in obj)
                if (obj.hasOwnProperty(i))
                    keys.push(i);
            return keys;
        };
        ObjectUtil.isStatic = function (value) {
            return (typeof value === 'string' ||
                typeof value === 'number' ||
                typeof value === 'boolean' ||
                typeof value === 'undefined' ||
                value === null);
        };
        ObjectUtil.isPrimitive = function (value) {
            return this.isStatic(value) || typeof value === 'symbol';
        };
        ObjectUtil.isArrayLike = function (value) {
            return value != null && this.isLength(value.length) && !this.isFunction(value);
        };
        ObjectUtil.isLength = function (value) {
            return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= Number.MAX_SAFE_INTEGER;
        };
        ObjectUtil.isMethod = function (obj, methodName) {
            if (obj.hasOwnProperty(methodName))
                return obj[methodName] instanceof Function;
            return false;
        };
        ObjectUtil.isUndefined = function (obj) {
            return this.isNull(obj) || obj === undefined || typeof obj === 'undefined';
        };
        ObjectUtil.isNull = function (obj) {
            return obj === null;
        };
        ObjectUtil.isEmpty = function (obj) {
            if (obj == undefined)
                return true;
            if (typeof (obj) == "number")
                return isNaN(obj) || obj == 0;
            if (obj instanceof Array || typeof (obj) == "string")
                return obj.length == 0;
            if (obj instanceof Object) {
                for (var prop in obj)
                    if (obj.hasOwnProperty(prop))
                        return false;
                return true;
            }
            return false;
        };
        ObjectUtil.isObject = function (value) {
            var type = typeof value;
            return value != null && (type == 'object' || type == 'function');
        };
        ObjectUtil.getRawType = function (value) {
            return Object.prototype.toString.call(value).slice(8, -1);
        };
        ObjectUtil.isPlainObject = function (obj) {
            return Object.prototype.toString.call(obj) === '[object Object]';
        };
        ObjectUtil.isRegExp = function (value) {
            return Object.prototype.toString.call(value) === '[object RegExp]';
        };
        ObjectUtil.isDate = function (value) {
            return Object.prototype.toString.call(value) === '[object Date]';
        };
        ObjectUtil.isArray = function (arr) {
            return Object.prototype.toString.call(arr) === '[object Array]';
        };
        ObjectUtil.isNumber = function (value) {
            return typeof value == "number" || (!isNaN(value) && !this.isNaN2(value));
        };
        ObjectUtil.isNaN2 = function (value) {
            return value != value;
        };
        ObjectUtil.isString = function (value) {
            return typeof value == "string" || Object.prototype.toString.call(value) == "[object String]";
        };
        ObjectUtil.isFunction = function (value) {
            return Object.prototype.toString.call(value) === '[object Function]';
        };
        ObjectUtil.isNative = function (value) {
            return typeof value === 'function' && /native code/.test(value.toString());
        };
        ObjectUtil.extend = function (to, _from) {
            for (var key in _from) {
                to[key] = _from[key];
            }
            return to;
        };
        ObjectUtil.getClassName = function (obj) {
            if (obj.__proto__ && obj.__proto__.constructor) {
                return obj.__proto__.constructor.name;
            }
            else if (Object.getPrototypeOf(obj) && Object.getPrototypeOf(obj).constructor) {
                return Object.getPrototypeOf(obj).constructor.name;
            }
            else {
                throw "不支持__proto__.constructor 或者没有 prototype";
            }
        };
        ObjectUtil.getClass = function (obj) {
            if (obj.__proto__ && obj.__proto__.constructor) {
                return obj.__proto__.constructor;
            }
            else if (Object.getPrototypeOf(obj) && Object.getPrototypeOf(obj).constructor) {
                return Object.getPrototypeOf(obj).constructor;
            }
            else {
                throw "不支持__proto__.constructor 或者没有 prototype";
            }
        };
        return ObjectUtil;
    }());
    NG.ObjectUtil = ObjectUtil;
    var MathUtil = (function () {
        function MathUtil() {
        }
        MathUtil.getLimitRandom = function (min, max, type) {
            if (type === void 0) { type = 0; }
            switch (type) {
                case 1:
                    return Math.floor(Math.random() * (max - min)) + min;
                    ;
                case 2:
                    return Math.ceil(Math.random() * (max - min)) + min;
                    ;
                case 0:
                default:
                    return Math.floor(Math.random() * (max - min + 1)) + min;
            }
        };
        MathUtil.map = function (value, start, end, targetStart, targetEnd) {
            return ((end - start) / (value - start)) * (targetEnd - targetStart) + targetStart;
        };
        MathUtil.lerp = function (start, end, amt) {
            return start + (end - start) * amt;
        };
        return MathUtil;
    }());
    NG.MathUtil = MathUtil;
    var StringUtil = (function () {
        function StringUtil() {
        }
        StringUtil.multiSplit = function (str, separators, Split) {
            if (Split === void 0) { Split = false; }
            function split2(strs, separators, separatorIndex) {
                var separator = separators[separatorIndex];
                if (separator && strs) {
                    for (var i in strs) {
                        var stra = strs[i];
                        if (stra == "") {
                            delete strs[i];
                            strs.length = strs.length - 1;
                            continue;
                        }
                        if (stra == separator) {
                            strs[i] = [];
                        }
                        if (stra.indexOf(separator) >= 0) {
                            strs[i] = split2(stra.split(separator), separators, separatorIndex + 1);
                        }
                        else {
                            if (Split) {
                                strs[i] = split2([stra], separators, separatorIndex + 1);
                            }
                        }
                    }
                }
                return strs;
            }
            if (str) {
                var r = split2([str], separators, 0)[0];
                if (r == str) {
                    return [r];
                }
                else {
                    return r;
                }
            }
            else {
                return [];
            }
        };
        StringUtil.format = function (str) {
            var params = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                params[_i - 1] = arguments[_i];
            }
            var index = str.indexOf("$");
            while (index != -1 && params.length > 0) {
                str = str.substring(0, index) + params.shift() + str.substring(index + 1);
                index = str.indexOf("$");
            }
            return str;
        };
        StringUtil.dateFormater = function (formater, t) {
            var date = t ? new Date(t) : new Date(), Y = date.getFullYear() + '', M = date.getMonth() + 1, D = date.getDate(), H = date.getHours(), m = date.getMinutes(), s = date.getSeconds();
            return formater.replace(/YYYY|yyyy/g, Y)
                .replace(/YY|yy/g, Y.substr(2, 2))
                .replace(/MM/g, (M < 10 ? '0' : '') + M)
                .replace(/DD/g, (D < 10 ? '0' : '') + D)
                .replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
                .replace(/mm/g, (m < 10 ? '0' : '') + m)
                .replace(/ss/g, (s < 10 ? '0' : '') + s);
        };
        StringUtil.dateStrForma = function (str, from, to) {
            str += '';
            var Y = '';
            if (~(Y = from.indexOf('YYYY'))) {
                Y = str.substr(Y, 4);
                to = to.replace(/YYYY|yyyy/g, Y);
            }
            else if (~(Y = from.indexOf('YY'))) {
                Y = str.substr(Y, 2);
                to = to.replace(/YY|yy/g, Y);
            }
            var k, i;
            ['M', 'D', 'H', 'h', 'm', 's'].forEach(function (s) {
                i = from.indexOf(s + s);
                k = ~i ? str.substr(i, 2) : '';
                to = to.replace(s + s, k);
            });
            return to;
        };
        return StringUtil;
    }());
})(NG || (NG = {}));
var Km0TestEx;
(function (Km0TestEx) {
    Km0TestEx.type = "extension";
    function extensionFun(lib, game, ui, get, ai, _status) {
        var heros = {
            character: {},
            characterTitle: {},
            characterIntro: {},
            skill: {},
            translate: {}
        };
        var skills = {
            skill: {},
            translate: {}
        };
        var cards = {
            card: {},
            skill: {},
            list: [],
            translate: {}
        };
        NG.DevUtil.version = lib.version;
        var extensionData = {
            name: "优化下载测试",
            key: "Km0TestEx",
            editable: true,
            config: {
                //增加扩展一个替换扩展包下载地址的
            },
            precontent: function (data) {
            },
            content: function (config, pack) {
                var download = game.download;
                lib.updateURL = NG.DevUtil.updateUrl;
                if (lib.device) {
                    if (lib.init.cordovaReady) {
                        game.download = function (url, folder, onsuccess, onerror, dev, onprogress) {
                            if (url.indexOf('http') != 0) {
                                url = get.url(dev) + url;
                            }
                            var fileTransfer = new FileTransfer();
                            folder = lib.assetURL + folder;
                            if (onprogress) {
                                fileTransfer.onprogress = function (progressEvent) {
                                    onprogress(progressEvent.loaded, progressEvent.total);
                                };
                            }
                            lib.config.brokenFile.add(folder);
                            game.saveConfigValue('brokenFile');
                            fileTransfer.download(encodeURI(url), encodeURI(folder), function () {
                                lib.config.brokenFile.remove(folder);
                                game.saveConfigValue('brokenFile');
                                if (onsuccess) {
                                    onsuccess();
                                }
                            }, onerror);
                        };
                    }
                }
                else if (typeof window.require == 'function') {
                    var count_1 = 0;
                    game.download = function (url, folder, onsuccess, onerror, dev, onprogress) {
                        if (url.indexOf('http') != 0) {
                            url = get.url(dev) + url;
                        }
                        var dir = folder.split('/');
                        NG.DevUtil.printLog("fs downloadFile Url: " + url, "folder: " + folder, "dir: " + dir);
                        game.ensureDirectory(folder, function () {
                            try {
                                var file = lib.node.fs.createWriteStream(__dirname + '/' + folder);
                            }
                            catch (e) {
                                if (onerror)
                                    onerror();
                            }
                            lib.config.brokenFile.add(folder);
                            game.saveConfigValue('brokenFile');
                            if (!lib.node.http)
                                lib.node.http = require('http');
                            if (!lib.node.https)
                                lib.node.https = require('https');
                            var opts = require('url').parse(encodeURI(url));
                            opts.headers = { 'User-Agent': 'AppleWebkit' };
                            var isGetError = false;
                            var request = (url.indexOf('https') == 0 ? lib.node.https : lib.node.http).get(opts, function (response) {
                                var stream = response.pipe(file);
                                stream.on('finish', function () {
                                    lib.config.brokenFile.remove(folder);
                                    game.saveConfigValue('brokenFile');
                                    if (onsuccess) {
                                        onsuccess();
                                    }
                                });
                                stream.on('error', function (e) {
                                    if (onerror)
                                        onerror();
                                    NG.DevUtil.printErrorLog("stream error: " + e);
                                });
                                if (onprogress) {
                                    var streamInterval = setInterval(function () {
                                        if (stream.closed) {
                                            clearInterval(streamInterval);
                                        }
                                        else {
                                            onprogress(stream.bytesWritten);
                                        }
                                    }, 200);
                                }
                            });
                            request.addListener('finish', function () {
                                NG.DevUtil.printLog("request finish: " + url);
                            });
                            request.addListener('error', function (e) {
                                NG.DevUtil.printLog("request error: " + e);
                                isGetError = true;
                                NG.DevUtil.printErrorLog("request err: " + e);
                            });
                            request.addListener('close', function () {
                                if (isGetError) {
                                    if (count_1 >= 5) {
                                        NG.DevUtil.printLog("request onerror :" + url + " =======>\u91CD\u8BD5\u8D85\u8FC75\u6B21\u90FD\u5931\u8D25\uFF0C\u8DF3\u8FC7\uFF01");
                                        if (onerror)
                                            onerror();
                                    }
                                    else {
                                        NG.DevUtil.printLog("\u51C6\u5907\u91CD\u65B0\u5C1D\u8BD5\u66F4\u65B0\u4E00\u6B21\u8BE5\u6587\u4EF6: " + url + " => \u7B2C" + ++count_1 + "\u6B21\u5C1D\u8BD5");
                                        game.download(url, folder, onsuccess, onerror, dev, onprogress);
                                    }
                                }
                                else {
                                    NG.DevUtil.printLog("request close :" + url + " =======>\u5B8C\u6210\u4E0B\u8F7D\u8BE5\u6587\u4EF6\uFF01");
                                }
                            });
                        }, true);
                    };
                }
            },
            onremove: function () {
            },
            package: {
                author: "神雷zero",
                intro: "优化下载测试，修改game.download的bug",
                version: "1.0.0",
                character: heros,
                skill: skills,
                card: cards,
            },
            translate: {
                ZJSha: "优化下载测试",
            },
            help: {
                ZJ联盟杀: NG.Utils.createHelp([
                    "先测试下1",
                    "先测试下2",
                    ["先测试下2.1", "先测试下2.2"],
                    "先测试下3",
                    "先测试下4",
                    ["先测试下4.1", "先测试下4.2"]
                ])
            }
        };
        return extensionData;
    }
    Km0TestEx.extensionFun = extensionFun;
})(Km0TestEx || (Km0TestEx = {}));
game.import(Km0TestEx.type, Km0TestEx.extensionFun);
