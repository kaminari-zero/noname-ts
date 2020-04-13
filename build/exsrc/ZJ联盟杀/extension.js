var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var NG;
(function (NG) {
    function initContent(_lib, _status, _game, _ui, _get, _ai) {
        NG.lib = _lib;
        NG.status = _status;
        NG.game = _game;
        NG.ui = _ui;
        NG.get = _get;
        NG.ai = _ai;
    }
    NG.initContent = initContent;
    var SimpleSkillFrame = (function () {
        function SimpleSkillFrame() {
        }
        SimpleSkillFrame.simpleZhuDongJi = function () {
            var skill = {
                enable: "chooseToUse",
            };
        };
        SimpleSkillFrame.isFilterCard = function (data) {
            var condis = [];
            for (var key in data) {
                var element = data[key];
                if (element) {
                    var subCondis = [];
                    var condType = data[key + "_condType"];
                    if (condType === undefined) {
                        condType = 6;
                    }
                    if (Array.isArray(element)) {
                        for (var j = 0; j < element.length; j++) {
                            var value = element[j];
                            subCondis.push(this.CardFilterFun(key, value, condType));
                        }
                        condis.push(this.setCondition(4, subCondis));
                    }
                    else {
                        condis.push(this.CardFilterFun(key, element, condType));
                    }
                }
            }
            return this.setCondition(data.conditionType, condis);
        };
        SimpleSkillFrame.CardFilterFun = function (key, value, condType) {
            var _this = this;
            return function (event, player) {
                if (NG.get[key]) {
                    var result = _this.setCondition(condType, [
                        function (event, player) {
                            return NG.get[key](event.card);
                        },
                        function () {
                            return value;
                        }
                    ]);
                    return result(event, player);
                }
                else {
                    return event.card[key] == name;
                }
            };
        };
        SimpleSkillFrame.isFilterPlayer = function (data) {
        };
        SimpleSkillFrame.PlayerFilterFun = function (key, value, condType) {
        };
        SimpleSkillFrame.isFilterTarget = function (data) {
        };
        SimpleSkillFrame.TargetFilterFun = function (key, value, condType) {
        };
        SimpleSkillFrame.setCondition = function (type, condis) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var fun = NG.FunctionUtil.getConditon(type, condis);
            return fun;
        };
        return SimpleSkillFrame;
    }());
    NG.SimpleSkillFrame = SimpleSkillFrame;
    var SkillUtil = (function () {
        function SkillUtil() {
        }
        return SkillUtil;
    }());
    NG.SkillUtil = SkillUtil;
})(NG || (NG = {}));
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
    var FunctionUtil;
    (function (FunctionUtil) {
        function defaultTrue() {
            return true;
        }
        function defaultFalse() {
            return false;
        }
        function getDefaultTrueFun() {
            return defaultTrue;
        }
        function getDefaultFalseFun() {
            return defaultFalse;
        }
        function resultNotFun(cond) {
            var condis = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                condis[_i - 1] = arguments[_i];
            }
            var result = cond.apply(null, condis);
            return !result;
        }
        function resultAndFun(conds) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var result = conds.every(function (element) {
                return element.apply(null, args);
            });
            return result;
        }
        function resultOrFun(conds) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var result = conds.some(function (element) {
                return element.apply(null, args);
            });
            return result;
        }
        function resultXorFun(cond1, cond2) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var result1 = cond1.apply(null, args);
            var result2 = cond2.apply(null, args);
            return result1 != result2;
        }
        function defaultDoAllFun(conds) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            conds.forEach(function (element) {
                element.apply(null, args);
            });
            return true;
        }
        function selectedFun(conds) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var fristCond = conds.shift();
            var result = fristCond.apply(null, args);
            var seletedCond = conds[result];
            if (selectedFun) {
                return seletedCond.apply(null, args);
            }
            else {
                return false;
            }
        }
        function equalFun(cond1, cond2) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var result1 = cond1.apply(null, args);
            var result2 = cond2.apply(null, args);
            return result1 == result2;
        }
        function unequalFun(cond1, cond2) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var result1 = cond1.apply(null, args);
            var result2 = cond2.apply(null, args);
            return result1 != result2;
        }
        function gtFun(cond1, cond2) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var result1 = cond1.apply(null, args);
            var result2 = cond2.apply(null, args);
            return result1 > result2;
        }
        function gteFun(cond1, cond2) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var result1 = cond1.apply(null, args);
            var result2 = cond2.apply(null, args);
            return result1 >= result2;
        }
        function ltFun(cond1, cond2) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var result1 = cond1.apply(null, args);
            var result2 = cond2.apply(null, args);
            return result1 < result2;
        }
        function lteFun(cond1, cond2) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            var result1 = cond1.apply(null, args);
            var result2 = cond2.apply(null, args);
            return result1 == result2;
        }
        function resultFun(cond) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return cond.apply(null, args);
        }
        function getConditon(type, condis) {
            switch (type) {
                case 0:
                    return getDefaultTrueFun();
                case 1:
                    return getDefaultTrueFun();
                case 2:
                    return curry(resultNotFun, null, [condis[0]]);
                case 3:
                    return curry(resultAndFun, null, condis);
                case 4:
                    return curry(resultOrFun, null, condis);
                case 5:
                    return curry(resultXorFun, null, [condis[0], condis[1]]);
                case 14:
                    return curry(selectedFun, null, condis);
                case 16:
                    return curry(resultFun, null, [condis[0]]);
                case 6:
                    return curry(equalFun, null, [condis[0], condis[1]]);
                case 7:
                    return curry(unequalFun, null, [condis[0], condis[1]]);
                case 8:
                    return curry(gtFun, null, [condis[0], condis[1]]);
                case 9:
                    return curry(gteFun, null, [condis[0], condis[1]]);
                case 10:
                    return curry(ltFun, null, [condis[0], condis[1]]);
                case 11:
                    return curry(lteFun, null, [condis[0], condis[1]]);
            }
        }
        FunctionUtil.getConditon = getConditon;
        function createConditionTree(datas) {
            var type = datas.type;
            var nodes = datas.nodes;
            var condis = datas.conditionFuns;
            var resultFun = [];
            if (nodes && nodes.length) {
                for (var i = 0; i < nodes.length; i++) {
                    var fun = createConditionTree(nodes[i]);
                    resultFun.push(fun);
                }
            }
            var lastFun = getConditon(type, resultFun.concat(condis));
            return lastFun;
        }
        FunctionUtil.createConditionTree = createConditionTree;
        function curry(fn, constext) {
            var arg = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                arg[_i - 2] = arguments[_i];
            }
            var all = arg;
            return function () {
                var rest = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    rest[_i] = arguments[_i];
                }
                all.push.apply(all, rest);
                return fn.apply(constext, all);
            };
        }
        FunctionUtil.curry = curry;
        function curry2(fn) {
            var _this = this;
            var arg = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                arg[_i - 1] = arguments[_i];
            }
            var all = arg || [], length = fn.length;
            return function () {
                var rest = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    rest[_i] = arguments[_i];
                }
                var _args = all.slice(0);
                _args.push.apply(_args, rest);
                if (_args.length < length) {
                    return curry2.call.apply(curry2, __spreadArrays([_this, fn], _args));
                }
                else {
                    return fn.apply(_this, _args);
                }
            };
        }
        FunctionUtil.curry2 = curry2;
        function curry3(fn) {
            var _this = this;
            var arg = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                arg[_i - 1] = arguments[_i];
            }
            var all = arg || [], length = fn.length;
            return function () {
                var rest = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    rest[_i] = arguments[_i];
                }
                var _args = all;
                _args.push.apply(_args, rest);
                if (rest.length === 0) {
                    all = [];
                    return fn.apply(_this, _args);
                }
                else {
                    return curry3.call.apply(curry3, __spreadArrays([_this, fn], _args));
                }
            };
        }
        FunctionUtil.curry3 = curry3;
    })(FunctionUtil = NG.FunctionUtil || (NG.FunctionUtil = {}));
    (function () {
        console.log("functionUtil test start!");
    })();
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
        Utils.loadDevData = function (content, extensionData, lib, game, ui, get, ai, _status) {
            var loadHeroDatas = [];
            var loadCardDatas = [];
            var skillDatas = [];
            for (var key in content) {
                if (content.hasOwnProperty(key)) {
                    var element = content[key];
                    if (key.indexOf("outputHero_") > -1) {
                        loadHeroDatas.push(element(lib, game, ui, get, ai, _status));
                    }
                    else if (key.indexOf("outputCard_") > -1) {
                        loadCardDatas.push(element(lib, game, ui, get, ai, _status));
                    }
                    else if (key.indexOf("outputSkill_") > -1) {
                        skillDatas.push(element(lib, game, ui, get, ai, _status));
                    }
                    else if (key.indexOf("onlyRun_") > -1) {
                        element(lib, game, ui, get, ai, _status);
                    }
                }
            }
            var packName = extensionData.key;
            var heros = extensionData.package.character;
            var cards = extensionData.package.card;
            var skills = extensionData.package.skill;
            console.log(content, extensionData);
            for (var i = 0; i < loadHeroDatas.length; i++) {
                var element = loadHeroDatas[i];
                var cfgName = packName + "_" + element.name;
                heros.character[cfgName] = element.character;
                heros.characterTitle[cfgName] = element.characterTitle;
                heros.characterIntro[cfgName] = element.characterIntro;
                element.nickName && (heros.translate[cfgName] = element.nickName);
                var heroSkills = element.skill;
                for (var skillname in heroSkills) {
                    var skill = heroSkills[skillname];
                    skills.skill[skillname] = skill;
                    skill.name && (skills.translate[skillname] = skill.name);
                    skill.description && (skills.translate[skillname + "_info"] = skill.description);
                }
            }
            for (var i = 0; i < loadCardDatas.length; i++) {
                var element = loadCardDatas[i];
                var cfgName = packName + "_" + element.name;
                cards.card[cfgName] = element.card;
                element.cardName && (cards.translate[cfgName] = element.cardName);
                element.description && (cards.translate[cfgName + "_info"] = element.description);
                if (element.bgName) {
                    cards.translate[cfgName + "_bg"] = element.bgName;
                }
                var cardSkills = element.skill;
                for (var skillname in cardSkills) {
                    var skill = cardSkills[skillname];
                    skills.skill[skillname] = skill;
                    skill.name && (skills.translate[skillname + "_skill"] = skill.name);
                    skill.description && (skills.translate[skillname + "_skill_info"] = skill.description);
                }
            }
            for (var i = 0; i < skillDatas.length; i++) {
                var element = skillDatas[i];
                for (var skillname in element) {
                    var skill = element[skillname];
                    skills.skill[skillname] = skill;
                    skill.name && (skills.translate[skillname] = skill.name);
                    skill.description && (skills.translate[skillname + "_info"] = skill.description);
                }
            }
        };
        Utils.importCurContent = function (content, key, type, importFun) {
            var printHead = "";
            switch (type) {
                case 1:
                    printHead = "outputHero_";
                    break;
                case 2:
                    printHead = "outputCard_";
                    break;
                case 3:
                    printHead = "outputSkill_";
                    break;
                case 4:
                    printHead = "onlyRun_";
                    break;
                case 0:
                    console.warn("暂不导入，已忽略key:", key);
                    return;
            }
            var fieldName = printHead + key;
            if (content && content[fieldName]) {
                console.warn("已导入内有相同的key:", key);
            }
            else if (content && !content[fieldName]) {
                content[fieldName] = importFun;
                console.log("\u5BFC\u5165" + fieldName + "\u6210\u529F\uFF01");
            }
            else {
                console.error("不能导入到空环境中！！！！！");
            }
        };
        Utils.translateDescTxt = function (str) {
            var context = str;
            for (var i = 0; i < this.DescTags.length; i++) {
                var element = this.DescTags[i];
                context = this.replaceTxtUtil(context, element[0], element[1]);
            }
            return context;
        };
        ;
        Utils.replaceTxtUtil = function (context, tag, replaceTxt) {
            var regexp = new RegExp("" + tag, "g");
            return context.replace(regexp, replaceTxt);
        };
        ;
        Utils.DescTags = [
            ["\\[自\\]", "你自己"],
            ["\\[他\\]", "其他一名角色"],
            ["\\[任一\\]", "任意一名角色"],
            ["\\[其他\\]", "除你自己以外任意一名角色"],
            ["\\[全\\]", "全部所有角色"],
            ["\\[他们\\]", "全部所有其他角色"],
            ["\\[判定\\]", "进行一次判定"],
            ["\\[正面\\]", "角色牌正面朝上时"],
            ["\\[反面\\]", "角色牌反面朝上时"],
            ["\\[翻面\\]", "将角色牌翻面"],
            ["\\[受伤\\]", "血量不满的角色"],
            ["\\[叠置\\]", "将牌置于角色牌下"],
            ["\\[结果\\]", "判定牌的判定结果为"],
            ["\\[D\\]", "置于角色牌下的牌"],
            ["<准备>", "准备阶段"],
            ["<判定>", "判定阶段"],
            ["<摸牌>", "摸牌阶段"],
            ["<出牌>", "出牌阶段"],
            ["<弃牌>", "弃牌阶段"],
            ["<结束>", "结束阶段"],
            ["(男)", "男性角色"],
            ["(女)", "女性角色"]
        ];
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
    NG.StringUtil = StringUtil;
    var ArrayUtil = (function () {
        function ArrayUtil() {
        }
        ArrayUtil.find = function (arr, param, value) {
            if (arr instanceof Array == false) {
                if (arr[param] == value) {
                    return arr;
                }
                else {
                    return null;
                }
            }
            var every;
            if (typeof param == "string") {
                every = function (item) { return item[param] == value; };
            }
            else {
                every = param;
            }
            for (var key in arr) {
                if (every.call(null, arr[key]) == true) {
                    return arr[key];
                }
            }
            return null;
        };
        ArrayUtil.findAll = function (arr, param, value) {
            var every;
            if (typeof param == "string") {
                every = function (item) { return item[param] == value; };
            }
            else {
                every = param;
            }
            var a = [];
            for (var key in arr) {
                if (every.call(null, arr[key]) == true) {
                    a.push(arr[key]);
                }
            }
            return a;
        };
        return ArrayUtil;
    }());
    NG.ArrayUtil = ArrayUtil;
    var RegExpUtil = (function () {
        function RegExpUtil() {
        }
        RegExpUtil.replace = function (regex, str, callback) {
            return str.replace(regex, callback);
        };
        RegExpUtil.matchAll = function (regex, str, callback) {
            var allResult = [];
            var result;
            regex.lastIndex = 0;
            while ((result = regex.exec(str)) != null) {
                if (callback) {
                    callback.call(null, result);
                }
                allResult.push(result);
            }
            return allResult;
        };
        return RegExpUtil;
    }());
    NG.RegExpUtil = RegExpUtil;
})(NG || (NG = {}));
var ZJNGEx;
(function (ZJNGEx) {
    (function () {
        NG.Utils.importCurContent(this.ZJNGEx, "XSZJ-0002", 1, function (lib, game, ui, get, ai, _status) {
            var output = {
                name: "XSZJ-0002",
                nickName: "郑博森",
                character: ["male", "wu", 3, [], ['ZJNGEx'], ['天', 3]],
                characterTitle: "老鬼",
                characterIntro: "ZJ联盟杀的人物",
                skill: {},
            };
            return output;
        });
    })();
})(ZJNGEx || (ZJNGEx = {}));
var ZJNGEx;
(function (ZJNGEx) {
    (function () {
        NG.Utils.importCurContent(this.ZJNGEx, "XSZJ-0001", 1, function (lib, game, ui, get, ai, _status) {
            var output = {
                name: "XSZJ-0001",
                nickName: "杨爵波",
                character: ["male", "wu", 5, [], ['ZJNGEx'], ['无', 5]],
                characterTitle: "盟主捞波",
                characterIntro: "ZJ联盟杀的人物",
                skill: {},
            };
            return output;
        });
    })();
})(ZJNGEx || (ZJNGEx = {}));
var ZJNGEx;
(function (ZJNGEx) {
    (function () {
        NG.Utils.importCurContent(this.ZJNGEx, "XSZJ-0006", 1, function (lib, game, ui, get, ai, _status) {
            var output = {
                name: "XSZJ-0006",
                nickName: "王启盛",
                character: ["male", "shu", 3, [], ['ZJNGEx'], ['杀', 4]],
                characterTitle: "锤仔",
                characterIntro: "ZJ联盟杀的人物",
                skill: {},
            };
            return output;
        });
    })();
})(ZJNGEx || (ZJNGEx = {}));
var ZJNGEx;
(function (ZJNGEx) {
    (function () {
        NG.Utils.importCurContent(this.ZJNGEx, "XSZJ-0005", 1, function (lib, game, ui, get, ai, _status) {
            var output = {
                name: "XSZJ-0005",
                nickName: "樊梓豪",
                character: ["male", "shu", 3, [], ['ZJNGEx'], ['魔', 4]],
                characterTitle: "邪心佬",
                characterIntro: "ZJ联盟杀的人物",
                skill: {},
            };
            return output;
        });
    })();
})(ZJNGEx || (ZJNGEx = {}));
var ZJNGEx;
(function (ZJNGEx) {
    (function () {
        NG.Utils.importCurContent(this.ZJNGEx, "XSZJ-0004", 1, function (lib, game, ui, get, ai, _status) {
            var output = {
                name: "XSZJ-0004",
                nickName: "文汉伦",
                character: ["male", "qun", 3, [], ['ZJNGEx'], ['佛', 4]],
                characterTitle: "不死",
                characterIntro: "ZJ联盟杀的人物",
                skill: {},
            };
            return output;
        });
    })();
})(ZJNGEx || (ZJNGEx = {}));
var ZJNGEx;
(function (ZJNGEx) {
    (function () {
        NG.Utils.importCurContent(this.ZJNGEx, "XSZJ-0003", 1, function (lib, game, ui, get, ai, _status) {
            var output = {
                name: "XSZJ-0003",
                nickName: "黄华富",
                character: ["male", "wei", 3, [], ['ZJNGEx'], ['狱', 4]],
                characterTitle: "四眼佬",
                characterIntro: "ZJ联盟杀的人物",
                skill: {},
            };
            return output;
        });
    })();
})(ZJNGEx || (ZJNGEx = {}));
var ZJNGEx;
(function (ZJNGEx) {
    (function () {
        NG.Utils.importCurContent(this.ZJNGEx, "XSZJ-0008", 1, function (lib, game, ui, get, ai, _status) {
            var output = {
                name: "XSZJ-0008",
                nickName: "杨卓承",
                character: ["male", "shu", 5, [], ['ZJNGEx'], ['杀', 6]],
                characterTitle: "紫色烂摊",
                characterIntro: "ZJ联盟杀的人物",
                skill: {},
            };
            return output;
        });
    })();
})(ZJNGEx || (ZJNGEx = {}));
var ZJNGEx;
(function (ZJNGEx) {
    (function () {
        NG.Utils.importCurContent(this.ZJNGEx, "XSZJ-0009", 1, function (lib, game, ui, get, ai, _status) {
            var output = {
                name: "XSZJ-0009",
                nickName: "徐小鹏",
                character: ["male", "wu", 4, [], ['ZJNGEx'], ['无', 4]],
                characterTitle: "土豪",
                characterIntro: "ZJ联盟杀的人物",
                skill: {},
            };
            return output;
        });
    })();
})(ZJNGEx || (ZJNGEx = {}));
var ZJNGEx;
(function (ZJNGEx) {
    (function () {
        NG.Utils.importCurContent(this.ZJNGEx, "XSZJ-0007", 1, function (lib, game, ui, get, ai, _status) {
            var output = {
                name: "XSZJ-0007",
                nickName: "苏景泽",
                character: ["male", "shen", 3, [], ['ZJNGEx'], ['妖', 3]],
                characterTitle: "斗妖靓",
                characterIntro: "ZJ联盟杀的人物",
                skill: {},
            };
            return output;
        });
    })();
})(ZJNGEx || (ZJNGEx = {}));
var ZJNGEx;
(function (ZJNGEx) {
    (function () {
        NG.Utils.importCurContent(this.ZJNGEx, "XSZJ-0013", 1, function (lib, game, ui, get, ai, _status) {
            var output = {
                name: "XSZJ-0013",
                nickName: "许嘉维",
                character: ["male", "wu", 2, [], ['ZJNGEx'], ['天', 2]],
                characterTitle: "龙徒老师",
                characterIntro: "ZJ联盟杀的人物",
                skill: {},
            };
            return output;
        });
    })();
})(ZJNGEx || (ZJNGEx = {}));
var ZJNGEx;
(function (ZJNGEx) {
    (function () {
        NG.Utils.importCurContent(this.ZJNGEx, "XSZJ-0010", 1, function (lib, game, ui, get, ai, _status) {
            var output = {
                name: "XSZJ-0010",
                nickName: "林俊雄",
                character: ["male", "wei", 4, [], ['ZJNGEx'], ['无', 5]],
                characterTitle: "命运银夜",
                characterIntro: "ZJ联盟杀的人物",
                skill: {},
            };
            return output;
        });
    })();
})(ZJNGEx || (ZJNGEx = {}));
var ZJNGEx;
(function (ZJNGEx) {
    (function () {
        NG.Utils.importCurContent(this.ZJNGEx, "XSZJ-0014", 1, function (lib, game, ui, get, ai, _status) {
            var output = {
                name: "XSZJ-0014",
                nickName: "杨孜华",
                character: ["male", "shen", 3, [], ['ZJNGEx'], ['法', 3]],
                characterTitle: "暗铁",
                characterIntro: "ZJ联盟杀的人物",
                skill: {},
            };
            return output;
        });
    })();
})(ZJNGEx || (ZJNGEx = {}));
var ZJNGEx;
(function (ZJNGEx) {
    (function () {
        NG.Utils.importCurContent(this.ZJNGEx, "XSZJ-0012", 1, function (lib, game, ui, get, ai, _status) {
            var output = {
                name: "XSZJ-0012",
                nickName: "陈炜司",
                character: ["male", "shu", 3, [], ['ZJNGEx'], ['骑', 3]],
                characterTitle: "炎狮",
                characterIntro: "ZJ联盟杀的人物",
                skill: {},
            };
            return output;
        });
    })();
})(ZJNGEx || (ZJNGEx = {}));
var ZJNGEx;
(function (ZJNGEx) {
    (function () {
        NG.Utils.importCurContent(this.ZJNGEx, "XSZJ-0011", 1, function (lib, game, ui, get, ai, _status) {
            var output = {
                name: "XSZJ-0011",
                nickName: "黄寅",
                character: ["male", "shen", 3, [], ['ZJNGEx'], ['法', 3]],
                characterTitle: "御宅魔法师",
                characterIntro: "ZJ联盟杀的人物",
                skill: {},
            };
            return output;
        });
    })();
})(ZJNGEx || (ZJNGEx = {}));
var ZJNGEx;
(function (ZJNGEx) {
    (function () {
        NG.Utils.importCurContent(this.ZJNGEx, "XSZJ-0017", 1, function (lib, game, ui, get, ai, _status) {
            var output = {
                name: "XSZJ-0017",
                nickName: "张豪元",
                character: ["male", "shen", 3, [], ['ZJNGEx'], ['法', 3]],
                characterTitle: "章鱼仙人",
                characterIntro: "ZJ联盟杀的人物",
                skill: {},
            };
            return output;
        });
    })();
})(ZJNGEx || (ZJNGEx = {}));
var ZJNGEx;
(function (ZJNGEx) {
    (function () {
        NG.Utils.importCurContent(this.ZJNGEx, "XSZJ-0018", 1, function (lib, game, ui, get, ai, _status) {
            var output = {
                name: "XSZJ-0018",
                nickName: "林嘉",
                character: ["male", "qun", 4, [], ['ZJNGEx'], ['无', 5]],
                characterTitle: "大湿",
                characterIntro: "ZJ联盟杀的人物",
                skill: {},
            };
            return output;
        });
    })();
})(ZJNGEx || (ZJNGEx = {}));
var ZJNGEx;
(function (ZJNGEx) {
    (function () {
        NG.Utils.importCurContent(this.ZJNGEx, "XSSP-0002", 1, function (lib, game, ui, get, ai, _status) {
            var output = {
                name: "XSSP-0002",
                nickName: "龙晓明",
                character: ["male", "qun", 2, [], ['ZJNGEx'], ['龍', 3]],
                characterTitle: "妖之龙明",
                characterIntro: "ZJ联盟杀的人物",
                skill: {},
            };
            return output;
        });
    })();
})(ZJNGEx || (ZJNGEx = {}));
var ZJNGEx;
(function (ZJNGEx) {
    (function () {
        NG.Utils.importCurContent(this.ZJNGEx, "XSSP-0004", 1, function (lib, game, ui, get, ai, _status) {
            var output = {
                name: "XSSP-0004",
                nickName: "钟家骅",
                character: ["male", "shen", 2, [], ['ZJNGEx'], ['法', 2]],
                characterTitle: "虚弱的魔导师",
                characterIntro: "ZJ联盟杀的人物",
                skill: {},
            };
            return output;
        });
    })();
})(ZJNGEx || (ZJNGEx = {}));
var ZJNGEx;
(function (ZJNGEx) {
    (function () {
        NG.Utils.importCurContent(this.ZJNGEx, "XSSP-0001", 1, function (lib, game, ui, get, ai, _status) {
            var output = {
                name: "XSSP-0001",
                nickName: "钟麟",
                character: ["male", "shu", 5, [], ['ZJNGEx'], ['无', 6]],
                characterTitle: "侵略之麟",
                characterIntro: "ZJ联盟杀的人物",
                skill: {},
            };
            return output;
        });
    })();
})(ZJNGEx || (ZJNGEx = {}));
var ZJNGEx;
(function (ZJNGEx) {
    (function () {
        NG.Utils.importCurContent(this.ZJNGEx, "XSSP-0006", 1, function (lib, game, ui, get, ai, _status) {
            var output = {
                name: "XSSP-0006",
                nickName: "林志海",
                character: ["male", "wei", 3, [], ['ZJNGEx'], ['狱', 4]],
                characterTitle: "魔海",
                characterIntro: "ZJ联盟杀的人物",
                skill: {},
            };
            return output;
        });
    })();
})(ZJNGEx || (ZJNGEx = {}));
var ZJNGEx;
(function (ZJNGEx) {
    (function () {
        NG.Utils.importCurContent(this.ZJNGEx, "XSZJ-0015", 1, function (lib, game, ui, get, ai, _status) {
            var output = {
                name: "XSZJ-0015",
                nickName: "黄文瀚",
                character: ["male", "wei", 3, [], ['ZJNGEx'], ['狱', 4]],
                characterTitle: "影帝",
                characterIntro: "ZJ联盟杀的人物",
                skill: {},
            };
            return output;
        });
    })();
})(ZJNGEx || (ZJNGEx = {}));
var ZJNGEx;
(function (ZJNGEx) {
    (function () {
        NG.Utils.importCurContent(this.ZJNGEx, "XSSP-0003", 1, function (lib, game, ui, get, ai, _status) {
            var output = {
                name: "XSSP-0003",
                nickName: "黄宇",
                character: ["male", "qun", 4, [], ['ZJNGEx'], ['无', 5]],
                characterTitle: "仙",
                characterIntro: "ZJ联盟杀的人物",
                skill: {},
            };
            return output;
        });
    })();
})(ZJNGEx || (ZJNGEx = {}));
var ZJNGEx;
(function (ZJNGEx) {
    (function () {
        NG.Utils.importCurContent(this.ZJNGEx, "XSSP-0007", 1, function (lib, game, ui, get, ai, _status) {
            var output = {
                name: "XSSP-0007",
                nickName: "黃冠瀧",
                character: ["male", "shu", 4, [], ['ZJNGEx'], ['佛', 5]],
                characterTitle: "子龙",
                characterIntro: "ZJ联盟杀的人物",
                skill: {},
            };
            return output;
        });
    })();
})(ZJNGEx || (ZJNGEx = {}));
var ZJNGEx;
(function (ZJNGEx) {
    (function () {
        NG.Utils.importCurContent(this.ZJNGEx, "XSZJ-0016", 1, function (lib, game, ui, get, ai, _status) {
            var output = {
                name: "XSZJ-0016",
                nickName: "庞毅",
                character: ["male", "wu", 3, [], ['ZJNGEx'], ['天', 3]],
                characterTitle: "老野",
                characterIntro: "ZJ联盟杀的人物",
                skill: {},
            };
            return output;
        });
    })();
})(ZJNGEx || (ZJNGEx = {}));
var ZJNGEx;
(function (ZJNGEx) {
    (function () {
        NG.Utils.importCurContent(this.ZJNGEx, "XSSP-0005", 1, function (lib, game, ui, get, ai, _status) {
            var output = {
                name: "XSSP-0005",
                nickName: "车伟荣",
                character: ["male", "wei", 3, [], ['ZJNGEx'], ['狱', 4]],
                characterTitle: "车神",
                characterIntro: "ZJ联盟杀的人物",
                skill: {},
            };
            return output;
        });
    })();
})(ZJNGEx || (ZJNGEx = {}));
var ZJNGEx;
(function (ZJNGEx) {
    (function () {
        NG.Utils.importCurContent(this.ZJNGEx, "XSSP-0008", 1, function (lib, game, ui, get, ai, _status) {
            var output = {
                name: "XSSP-0008",
                nickName: "杨康财",
                character: ["male", "qun", 4, [], ['ZJNGEx'], ['无', 5]],
                characterTitle: "康财狗",
                characterIntro: "ZJ联盟杀的人物",
                skill: {},
            };
            return output;
        });
    })();
})(ZJNGEx || (ZJNGEx = {}));
var ZJNGEx;
(function (ZJNGEx) {
    (function () {
        NG.Utils.importCurContent(this.ZJNGEx, "翻译输入", 4, function (lib, game, ui, get, ai, _status) {
            lib.translate["ZJSha_XSZJ-0001"] = "杨爵波";
            lib.translate["ZJSha_XSZJ-0001_skill1"] = "盟主";
            lib.translate["ZJSha_XSZJ-0001_skill1_info"] = "【阶段技】你自己将任意数量的手牌交给其他一名角色(至少1张)，你自己摸X张牌";
            lib.translate["ZJSha_XSZJ-0002"] = "郑博森";
            lib.translate["ZJSha_XSZJ-0002_skill1"] = "天使";
            lib.translate["ZJSha_XSZJ-0002_skill1_info"] = "【主动技】你自己使用一张《血》时，你自己摸一张牌。";
            lib.translate["ZJSha_XSZJ-0002_skill2"] = "老鬼";
            lib.translate["ZJSha_XSZJ-0002_skill2_info"] = "【阶段技】你自己可除去你自己1点血量，其他一名角色摸一张牌。";
            lib.translate["ZJSha_XSZJ-0002_skill3"] = "博森";
            lib.translate["ZJSha_XSZJ-0002_skill3_info"] = "【被动技】你自己除去1点血量后，任意一名角色摸三张牌；你自己死亡时，你自己所有牌交给其他一名角色，然后令其血量+1。";
            lib.translate["ZJSha_XSZJ-0003"] = "黄华富";
            lib.translate["ZJSha_XSZJ-0003_skill1"] = "炼狱";
            lib.translate["ZJSha_XSZJ-0003_skill1_info"] = "【被动技】你自己角色牌反面朝上时，你自己将角色牌翻面你自己视为对其他一名角色使用一张《杀》。";
            lib.translate["ZJSha_XSZJ-0003_skill2"] = "肛裂";
            lib.translate["ZJSha_XSZJ-0003_skill2_info"] = "【流血技】你自己进行一次判定，判定牌的判定结果为黑色牌（你自己令任意一名角色选择一项：1.其弃置两张手牌；2.其受到1点伤害)。";
            lib.translate["ZJSha_XSZJ-0003_skill3"] = "华富";
            lib.translate["ZJSha_XSZJ-0003_skill3_info"] = "【主动技】你自己弃置X张手牌令手牌数为≤10（X至少为1），你自己须跳过弃牌阶段，你自己将角色牌翻面。";
            lib.translate["ZJSha_XSZJ-0004"] = "文汉伦";
            lib.translate["ZJSha_XSZJ-0004_skill1"] = "佛门";
            lib.translate["ZJSha_XSZJ-0004_skill1_info"] = "【被动技】你自己手牌上限+X(X=现存[佛]数+1)。";
            lib.translate["ZJSha_XSZJ-0004_skill2"] = "间反";
            lib.translate["ZJSha_XSZJ-0004_skill2_info"] = "【阶段技】你自己展示一张手牌并交给其他一名角色，其选择一项：(1)其展示所有手牌并弃置与此牌花色相同的所有牌；(2)其除去1点血量。";
            lib.translate["ZJSha_XSZJ-0004_skill3"] = "汉伦";
            lib.translate["ZJSha_XSZJ-0004_skill3_info"] = "【被动技】你自己非其他一名角色(装备区里没有武器牌)使用的《杀》/《大对决术》/《奥义秘术》的目标。";
            lib.translate["ZJSha_XSZJ-0005"] = "樊梓豪";
            lib.translate["ZJSha_XSZJ-0005_skill1"] = "魔神";
            lib.translate["ZJSha_XSZJ-0005_skill1_info"] = "【被动技】你自己角色牌不会被横置和翻面。";
            lib.translate["ZJSha_XSZJ-0005_skill2"] = "邪心";
            lib.translate["ZJSha_XSZJ-0005_skill2_info"] = "【回合技】你自己使用一张《杀》造成伤害时，你自己除去1点血量，此《杀》的伤害值+X";
            lib.translate["ZJSha_XSZJ-0005_skill3"] = "繁花";
            lib.translate["ZJSha_XSZJ-0005_skill3_info"] = "【主动技】你自己使用《杀》指定其他一名角色为目标后，你自己进行一次判定，判定牌的判定结果为红色（其不能使用《闪》）。";
            lib.translate["ZJSha_XSZJ-0006"] = "王启盛";
            lib.translate["ZJSha_XSZJ-0006_skill1"] = "杀手";
            lib.translate["ZJSha_XSZJ-0006_skill1_info"] = "【主动技】你自己将一张红色牌当《杀》使用/打出；你自己使用方块《杀》无距离限制。";
            lib.translate["ZJSha_XSZJ-0006_skill2"] = "圣锤";
            lib.translate["ZJSha_XSZJ-0006_skill2_info"] = "【主动技】你自己使用的《杀》被《闪》抵消时，你自己将该《闪》交给任意一名角色，且弃置其一张牌。";
            lib.translate["ZJSha_XSZJ-0006_skill3"] = "启盛";
            lib.translate["ZJSha_XSZJ-0006_skill3_info"] = "【回合技】你自己摸牌阶段摸牌-1，你自己视为对其他一名角色额外使用一张《杀》，此《杀》的伤害值+1。";
            lib.translate["ZJSha_XSZJ-0007"] = "苏景泽";
            lib.translate["ZJSha_XSZJ-0007_skill1"] = "妖族";
            lib.translate["ZJSha_XSZJ-0007_skill1_info"] = "【被动技】你自己摸牌阶段+X(X=现存[妖]数)。";
            lib.translate["ZJSha_XSZJ-0007_skill2"] = "妖术";
            lib.translate["ZJSha_XSZJ-0007_skill2_info"] = "【主动技】你自己将任意两张点数之差不大于X的手牌";
            lib.translate["ZJSha_XSZJ-0007_skill3"] = "妖爆";
            lib.translate["ZJSha_XSZJ-0007_skill3_info"] = "【限定技】你自己出牌阶段你自己选择一项：(1)对1-3名角色各造成1点伤害；(2)弃置四种花色的手牌各1张，对任意一名角色造成3点伤害。";
            lib.translate["ZJSha_XSZJ-0008"] = "杨卓承";
            lib.translate["ZJSha_XSZJ-0008_skill1"] = "烂摊";
            lib.translate["ZJSha_XSZJ-0008_skill1_info"] = "【被动技】你自己血量X，视为拥有技能：“杀手”(X为≤6)、“无限”(X为≤4)、“神勇”(X为≤2)。";
            lib.translate["ZJSha_XSZJ-0008_skill2"] = "“杀手”";
            lib.translate["ZJSha_XSZJ-0008_skill2_info"] = "【主动技】你自己将一张红色牌当《杀》使用/打出；你自己使用方块《杀》无距离限制。";
            lib.translate["ZJSha_XSZJ-0008_skill3"] = "“无限”";
            lib.translate["ZJSha_XSZJ-0008_skill3_info"] = "【被动技】你自己计算与其他一名角色距离时-X（X=你自己失血量且至少为1）；你自己始终无视其他角色的防具；";
            lib.translate["ZJSha_XSZJ-0008_skill4"] = "“神勇”";
            lib.translate["ZJSha_XSZJ-0008_skill4_info"] = "【主动技】你自己准备阶段，你自己每选择一项：(1)跳过摸牌阶段弃牌阶段；(2)跳过判定阶段出牌阶段。你自己视为对其他一名角色额外使用一张《杀》。";
            lib.translate["ZJSha_XSZJ-0009"] = "徐小鹏";
            lib.translate["ZJSha_XSZJ-0009_skill1"] = "抚恤:";
            lib.translate["ZJSha_XSZJ-0009_skill1_info"] = "【回合技】任意一名角色血量减少1次后，其进行一次判定，判定牌的判定结果为红色（你自己摸1张牌且你自己可弃置一张红桃牌，令其血量+1）。";
            lib.translate["ZJSha_XSZJ-0009_skill2"] = "土豪";
            lib.translate["ZJSha_XSZJ-0009_skill2_info"] = "【回合技】你自己准备阶段，摸牌阶段可跳过，你自己将手牌补至其血槽值；出牌阶段可跳过，将任意手牌交给其他一名角色。";
            lib.translate["ZJSha_XSZJ-0010"] = "林俊雄";
            lib.translate["ZJSha_XSZJ-0010_skill1"] = "命运";
            lib.translate["ZJSha_XSZJ-0010_skill1_info"] = "【改判技】你自己可打出一张牌替换判定牌。";
            lib.translate["ZJSha_XSZJ-0010_skill2"] = "银夜";
            lib.translate["ZJSha_XSZJ-0010_skill2_info"] = "【流血技】你自己立刻获得对你自己造成伤害的牌，你自己可获得伤害来源的一张牌。";
            lib.translate["ZJSha_XSZJ-0011"] = "黄寅";
            lib.translate["ZJSha_XSZJ-0011_skill1"] = "法师";
            lib.translate["ZJSha_XSZJ-0011_skill1_info"] = "【被动技】你自己使用一张魔法牌时，展示牌堆顶一张牌，若是魔法牌获得之，否则，放回牌堆顶。";
            lib.translate["ZJSha_XSZJ-0011_skill2"] = "御法";
            lib.translate["ZJSha_XSZJ-0011_skill2_info"] = "【阶段技】你自己将任一魔法牌视为任一普通魔法牌使用。";
            lib.translate["ZJSha_XSZJ-0011_skill3"] = "赚法";
            lib.translate["ZJSha_XSZJ-0011_skill3_info"] = "【被动技】你自己使用一张魔法牌时，摸一张牌。";
            lib.translate["ZJSha_XSZJ-0012"] = "陈炜司";
            lib.translate["ZJSha_XSZJ-0012_skill1"] = "圣骑";
            lib.translate["ZJSha_XSZJ-0012_skill1_info"] = "【被动技】你自己攻击距离+2。";
            lib.translate["ZJSha_XSZJ-0012_skill2"] = "炎狮";
            lib.translate["ZJSha_XSZJ-0012_skill2_info"] = "【被动技】你自己使用的《杀》需两张《闪》才能抵消；与你自己进行《大对决术》的角色每次需打出两张《杀》；你自己使用《杀》造成伤害时，则视为对其使用一张《大对决术》（不能被魔法牌响应）。";
            lib.translate["ZJSha_XSZJ-0013"] = "许嘉维";
            lib.translate["ZJSha_XSZJ-0013_skill1"] = "天使";
            lib.translate["ZJSha_XSZJ-0013_skill1_info"] = "【主动技】你自己使用一张《血》时，摸一张牌。";
            lib.translate["ZJSha_XSZJ-0013_skill2"] = "龙徒";
            lib.translate["ZJSha_XSZJ-0013_skill2_info"] = "【回合技】你自己可将一张红桃牌当《血》使用。";
            lib.translate["ZJSha_XSZJ-0013_skill3"] = "不灭";
            lib.translate["ZJSha_XSZJ-0013_skill3_info"] = "【被动技】你自己血量为0时，不进入濒死状态，进行一次判定红桃，则获得判定牌，血量+1；否则，血槽-1并回复血量至血槽值。";
            lib.translate["ZJSha_XSZJ-0013_skill4"] = "龙兔";
            lib.translate["ZJSha_XSZJ-0013_skill4_info"] = "【被动技】你自己方块牌均视为红桃牌。";
            lib.translate["ZJSha_XSZJ-0014"] = "杨孜华";
            lib.translate["ZJSha_XSZJ-0014_skill1"] = "法师";
            lib.translate["ZJSha_XSZJ-0014_skill1_info"] = "【被动技】你自己使用一张魔法牌时，展示牌堆顶一张牌，若是魔法牌获得之，否则，放回牌堆顶。";
            lib.translate["ZJSha_XSZJ-0014_skill2"] = "偷窃";
            lib.translate["ZJSha_XSZJ-0014_skill2_info"] = "【主动技】你自己将任一梅花牌当《偷窃邪术》使用。";
            lib.translate["ZJSha_XSZJ-0014_skill3"] = "神偷";
            lib.translate["ZJSha_XSZJ-0014_skill3_info"] = "【被动技】你自己《偷窃邪术》无距离使用；你自己非《偷窃邪术》的目标；你自己使用《偷窃邪术》时，摸一张牌。";
            lib.translate["ZJSha_XSZJ-0015"] = "黄文瀚";
            lib.translate["ZJSha_XSZJ-0015_skill1"] = "炼狱";
            lib.translate["ZJSha_XSZJ-0015_skill1_info"] = "【被动技】你自己角色牌反面朝上时，你自己将角色牌翻面你自己视为对其他一名角色使用一张《杀》。";
            lib.translate["ZJSha_XSZJ-0015_skill2"] = "演员";
            lib.translate["ZJSha_XSZJ-0015_skill2_info"] = "【主动技】你自己结束阶段摸X+2张牌，你自己将角色牌翻面（X=势力数）。";
            lib.translate["ZJSha_XSZJ-0015_skill3"] = "影帝";
            lib.translate["ZJSha_XSZJ-0015_skill3_info"] = "【流血技】你自己角色牌反面朝上时，你自己将角色牌翻面。";
            lib.translate["ZJSha_XSZJ-0016"] = "庞毅";
            lib.translate["ZJSha_XSZJ-0016_skill1"] = "天使";
            lib.translate["ZJSha_XSZJ-0016_skill1_info"] = "【主动技】你自己使用一张《血》时，摸一张牌。";
            lib.translate["ZJSha_XSZJ-0016_skill2"] = "基情";
            lib.translate["ZJSha_XSZJ-0016_skill2_info"] = "【主动技】任意一名角色(男性角色)准备阶段，若其血量不满的角色，你自己弃置一张基本牌，其血量+1。";
            lib.translate["ZJSha_XSZJ-0016_skill3"] = "老野";
            lib.translate["ZJSha_XSZJ-0016_skill3_info"] = "【受伤技】你自己进行一次判定红桃（你自己血量+1）。";
            lib.translate["ZJSha_XSZJ-0017"] = "张豪元";
            lib.translate["ZJSha_XSZJ-0017_skill1"] = "法师";
            lib.translate["ZJSha_XSZJ-0017_skill1_info"] = "【被动技】你自己使用一张魔法牌时，展示牌堆顶一张牌，若是魔法牌获得之，否则，放回牌堆顶。";
            lib.translate["ZJSha_XSZJ-0017_skill2"] = "触手";
            lib.translate["ZJSha_XSZJ-0017_skill2_info"] = "【主动技】你自己将任一梅花牌当《连环锁术》使用或重铸。";
            lib.translate["ZJSha_XSZJ-0017_skill3"] = "触摸";
            lib.translate["ZJSha_XSZJ-0017_skill3_info"] = "【被动技】任意一名角色被横置/重置时，你自己弃置其一张牌。";
            lib.translate["ZJSha_XSZJ-0018"] = "林嘉";
            lib.translate["ZJSha_XSZJ-0018_skill1"] = "基绊";
            lib.translate["ZJSha_XSZJ-0018_skill1_info"] = "【阶段技】你自己指定除你自己以外任意一名角色(男性角色)，其选择一项：(1)交给你自己一张装备牌，其摸1张牌；(2)其除去1点血量。";
            lib.translate["ZJSha_XSZJ-0018_skill2"] = "基力";
            lib.translate["ZJSha_XSZJ-0018_skill2_info"] = "【主动技】你自己将你自己任一装备牌当《闪》使用或打出。";
            lib.translate["ZJSha_XSSP-0001"] = "钟麟";
            lib.translate["ZJSha_XSSP-0001_skill1"] = "剑制";
            lib.translate["ZJSha_XSSP-0001_skill1_info"] = "【主动技】你自己准备阶段，你自己展示牌堆顶的4张牌，你自己获得武器牌和《杀》，并将其余的牌置入弃牌堆，回合内，你自己使用的《杀》的伤害值+1且受到此伤害的角色进入[重伤状态]。";
            lib.translate["ZJSha_XSSP-0002"] = "龙晓明";
            lib.translate["ZJSha_XSSP-0002_skill1"] = "龙族";
            lib.translate["ZJSha_XSSP-0002_skill1_info"] = "【被动技】你自己防止受到非[龙]的魔法牌的伤害。";
            lib.translate["ZJSha_XSSP-0002_skill2"] = "龙魂";
            lib.translate["ZJSha_XSSP-0002_skill2_info"] = "【被动技】你自己准备阶段，你自己从牌堆顶展示一张牌，若为黑色，将牌置于角色牌下。";
            lib.translate["ZJSha_XSSP-0002_skill3"] = "龙力";
            lib.translate["ZJSha_XSSP-0002_skill3_info"] = "【主动技】你自己弃置一张置于角色牌下的牌令其他一名角色除去1点血量。";
            lib.translate["ZJSha_XSSP-0002_skill4"] = "龙甲";
            lib.translate["ZJSha_XSSP-0002_skill4_info"] = "【被动技】你自己受到伤害前，若有置于角色牌下的牌，此伤害-1。";
            lib.translate["ZJSha_XSSP-0003"] = "黄宇";
            lib.translate["ZJSha_XSSP-0003_skill1"] = "仙力";
            lib.translate["ZJSha_XSSP-0003_skill1_info"] = "【主动技】你自己成为《杀》/通常魔法牌的目标时，你自己进行一次判定，判定牌的判定结果为红桃（此牌对你自己无效）。";
            lib.translate["ZJSha_XSSP-0003_skill2"] = "仙气";
            lib.translate["ZJSha_XSSP-0003_skill2_info"] = "【主动技】你自己判定牌生效后，若手牌值少于你自己血槽值，你自己摸一张牌。";
            lib.translate["ZJSha_XSSP-0004"] = "钟家骅";
            lib.translate["ZJSha_XSSP-0004_skill1"] = "法师";
            lib.translate["ZJSha_XSSP-0004_skill1_info"] = "【被动技】你自己使用一张魔法牌时，展示牌堆顶一张牌，若是魔法牌获得之。";
            lib.translate["ZJSha_XSSP-0004_skill2"] = "博览";
            lib.translate["ZJSha_XSSP-0004_skill2_info"] = "【被动技】其他一名角色使用的通常魔法牌（《干扰魔术》/《二重魔术》和转化牌除外）在结算后置入弃牌堆时，将其将牌置于角色牌下。";
            lib.translate["ZJSha_XSSP-0004_skill3"] = "神法";
            lib.translate["ZJSha_XSSP-0004_skill3_info"] = "【主动技】任意一名角色结束阶段，你自己可将你自己所有置于角色牌下的牌加入手牌，你自己将手牌的张数弃置至血槽值。";
            lib.translate["ZJSha_XSSP-0004_skill4"] = "神法";
            lib.translate["ZJSha_XSSP-0004_skill4_info"] = "【主动技】你自己两张置于角色牌下的牌可以当任一通常魔法牌使用。";
            lib.translate["ZJSha_XSSP-0005"] = "车伟荣";
            lib.translate["ZJSha_XSSP-0005_skill1"] = "炼狱";
            lib.translate["ZJSha_XSSP-0005_skill1_info"] = "【被动技】你自己[反翻]，你自己视为对其他一名角色使用一张《杀》。";
            lib.translate["ZJSha_XSSP-0005_skill2"] = "神伟";
            lib.translate["ZJSha_XSSP-0005_skill2_info"] = "【改判技】你自己获得该判定牌并令其重新进行一次判定。";
            lib.translate["ZJSha_XSSP-0005_skill3"] = "伟荣";
            lib.translate["ZJSha_XSSP-0005_skill3_info"] = "【主动技】你自己受到1点伤害后，你自己进行一次判定黑色，视为你自己对伤害来源使用一张《奥义秘术》(不能被魔法牌响应)。";
            lib.translate["ZJSha_XSSP-0006"] = "林志海";
            lib.translate["ZJSha_XSSP-0006_skill1"] = "炼狱";
            lib.translate["ZJSha_XSSP-0006_skill1_info"] = "【被动技】你自己[反翻]，你自己视为对其他一名角色使用一张《杀》。";
            lib.translate["ZJSha_XSSP-0006_skill2"] = "魔志";
            lib.translate["ZJSha_XSSP-0006_skill2_info"] = "【回合技】任意一名角色结束阶段，你自己令其任一暗置手牌明置，称为“魔”，“魔”视为《魔》使用。";
            lib.translate["ZJSha_XSSP-0006_skill3"] = "魔海";
            lib.translate["ZJSha_XSSP-0006_skill3_info"] = "【流血技】你自己弃置任一角色的“魔”，令其摸两张牌并将角色牌翻面。";
            lib.translate["ZJSha_XSSP-0007"] = "黃冠瀧";
            lib.translate["ZJSha_XSSP-0007_skill1"] = "佛门";
            lib.translate["ZJSha_XSSP-0007_skill1_info"] = "【被动技】你自己手牌上限+X(X=现存[佛]数+1)。";
            lib.translate["ZJSha_XSSP-0007_skill2"] = "子龙";
            lib.translate["ZJSha_XSSP-0007_skill2_info"] = "【回合技】你自己准备阶段你自己弃置区域内任意数量的装备牌/魔法牌。每以此法弃置一张牌，视为对任意一名角色使用一张《杀》。";
            lib.translate["ZJSha_XSSP-0008"] = "黃冠瀧";
            lib.translate["ZJSha_XSSP-0008_skill1"] = "佛门";
            lib.translate["ZJSha_XSSP-0008_skill1_info"] = "【被动技】你自己手牌上限+X(X=现存[佛]数+1)。";
            lib.translate["ZJSha_XSSP-0008_skill2"] = "健鹏";
            lib.translate["ZJSha_XSSP-0008_skill2_info"] = "【主动技】你自己使用《杀》指定角色为目标后，其不能使用《闪》；你自己使用《杀》对其造成伤害时，进行一次判定红色，然后其血槽-1。";
            lib.translate["ZJSha_XSSP-0008"] = "杨康财";
            lib.translate["ZJSha_XSSP-0008_skill1"] = "自闭";
            lib.translate["ZJSha_XSSP-0008_skill1_info"] = "【阶段技】你自己可将一张方块牌当《圣水牢术》对你自己使用，然后你自己血量+1。";
            lib.translate["ZJSha_XSSP-0008_skill2"] = "财康";
            lib.translate["ZJSha_XSSP-0008_skill2_info"] = "【被动技】你自己判定区里有牌：(1)受到伤害前，该伤害-1；(2)不会被翻面；(3)对攻击范围内的角色使用牌无距离限制。";
            return null;
        });
    })();
})(ZJNGEx || (ZJNGEx = {}));
var ZJNGEx;
(function (ZJNGEx) {
    (function () {
        NG.Utils.importCurContent(this.ZJNGEx, "SkipPhaseSkill", 3, function (lib, game, ui, get, ai, _status) {
            var SkipPhaseSkill = {
                zj_skip_Judge: {
                    name: "判定阶段",
                    description: "跳过玩家判定阶段",
                    trigger: {
                        player: "judge" + "Before"
                    },
                    forced: true,
                    content: function (event, player, trigger, result) {
                        trigger.cancel();
                    }
                },
                zj_skip_PhaseDraw: {
                    name: "抽牌阶段",
                    description: "跳过玩家抽牌阶段",
                    trigger: {
                        player: "phaseDraw" + "Before"
                    },
                    forced: true,
                    content: function (event, player, trigger, result) {
                        trigger.cancel();
                    }
                },
                zj_skip_PhaseUse: {
                    name: "出牌阶段",
                    description: "跳过玩家出牌阶段",
                    trigger: {
                        player: "phaseUse" + "Before"
                    },
                    forced: true,
                    content: function (event, player, trigger, result) {
                        trigger.cancel();
                    }
                },
                zj_skip_PhaseDiscard: {
                    name: "弃牌阶段",
                    description: "跳过玩家弃牌阶段",
                    trigger: {
                        player: "phaseDiscard" + "Before"
                    },
                    forced: true,
                    content: function (event, player, trigger, result) {
                        trigger.cancel();
                    }
                },
                zj_skip_Phase: {
                    name: "当前回合",
                    description: "跳过玩家当前回合",
                    trigger: {
                        player: "phase" + "Before"
                    },
                    forced: true,
                    content: function (event, player, trigger, result) {
                    }
                },
            };
            return SkipPhaseSkill;
        });
    })();
})(ZJNGEx || (ZJNGEx = {}));
var ZJNGEx;
(function (ZJNGEx) {
    (function () {
        NG.Utils.importCurContent(this.ZJNGEx, "测试技能组1", 3, function (lib, game, ui, get, ai, _status) {
            var skill1 = {
                trigger: {
                    player: "useCard",
                },
                filter: function (event, player) {
                    return event.card.name == "tao";
                },
                content: function (event, player, trigger, result) {
                    player.draw(1);
                }
            };
            var skill2 = {
                enable: "phaseUse",
                content: function (event, player, trigger, result) {
                    "step 0";
                    player.loseHp(1);
                    "step 1";
                    player.chooseTarget(1, function (card, player, target) {
                        return target != player;
                    });
                }
            };
            var output = {
                test_skill1: skill1,
                test_skill2: skill2
            };
            return output;
        });
    })();
})(ZJNGEx || (ZJNGEx = {}));
var ZJNGEx;
(function (ZJNGEx) {
    ZJNGEx.type = "extension";
    function extensionFun(lib, game, ui, get, ai, _status) {
        NG.initContent(lib, _status, game, ui, get, ai);
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
        var extensionData = {
            name: "ZJ联盟杀",
            key: "ZJSha",
            editable: true,
            config: {
                start_wuxing: {
                    name: "启用五行属性",
                    init: true,
                    intro: "将”魏蜀吴群神“变为”水火木土金“",
                    frequent: true,
                    onclick: updateWuxingName
                },
                start_wuxingSkill: {
                    name: "启用五行属性主公技",
                    init: true,
                    intro: "在身份局中，不同属性的身份会拥有不同的主公技",
                    frequent: true,
                    onclick: function (item) {
                        console.log("点击后输出的结果为111：", item);
                    }
                }
            },
            precontent: function (data) {
            },
            content: function (config, pack) {
                if (config.start_wuxing) {
                    updateWuxingName(true);
                }
            },
            onremove: function () {
            },
            package: {
                author: "神雷zero",
                intro: "ZJ联盟杀",
                version: "1.0.0",
                character: heros,
                skill: skills,
                card: cards,
            },
            translate: {
                ZJSha: "ZJ联盟杀",
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
            },
            get: {
                getZJShaShiliCount: function (flag) {
                }
            },
        };
        function updateWuxingName(bool) {
            if (bool) {
                lib.translate.wei = "水";
                lib.translate.shu = "火";
                lib.translate.wu = "木";
                lib.translate.qun = "土";
                lib.translate.shen = "金";
            }
            else {
                lib.translate.wei = "魏";
                lib.translate.shu = "蜀";
                lib.translate.wu = "吴";
                lib.translate.qun = "群";
                lib.translate.shen = "神";
            }
        }
        function updateWuxingSkill(bool) {
        }
        NG.Utils.loadDevData(this.ZJNGEx, extensionData, lib, game, ui, get, ai, _status);
        return extensionData;
    }
    ZJNGEx.extensionFun = extensionFun;
})(ZJNGEx || (ZJNGEx = {}));
game.import(ZJNGEx.type, ZJNGEx.extensionFun);
var ZJNGEx;
(function (ZJNGEx) {
    (function () {
        NG.Utils.importCurContent(this.ZJNGEx, "Huanghuafu", 0, function (lib, game, ui, get, ai, _status) {
            var Huanghuafu = {
                name: "huanghuafu",
                nickName: "黄华富",
                character: ["male", "wei", 4, ["zj_ganglie"], []],
                characterTitle: "",
                characterIntro: "",
                skill: {
                    zj_ganglie: {
                        name: "肛裂",
                        description: "当你受到1点伤害后，你可以进行一次判定，若判定结果为黑色牌，你选择一项：(1)令其弃置两张手牌；(2)你对其造成的1点伤害。",
                        trigger: {
                            player: "damage" + "End",
                        },
                        filter: function (event, player) {
                            return event.source && event.num > 0;
                        },
                        logTarget: "source",
                        content: function (event, player, trigger, result) {
                            "step 0";
                            event.num = trigger.num;
                            "step 1";
                            player.judge(function (jResult) {
                                return jResult.color == "black" ? 1 : 0;
                            });
                            "step 2";
                            if (result.bool) {
                                player.chooseControlList([
                                    "(1)令其弃置两张手牌",
                                    "(2)你对其造成的1点伤害"
                                ], true);
                            }
                            else {
                                event.goto(4);
                            }
                            "step 3";
                            if (result.index == 0) {
                                trigger.source.discard(2);
                            }
                            else {
                                trigger.source.damage(1);
                            }
                            "step 4";
                            event.num--;
                            if (event.num > 0) {
                                player.chooseBool(get.prompt2("zj_ganglie"));
                            }
                            else {
                                event.finish();
                            }
                            "step 5";
                            if (result.bool) {
                                event.goto(1);
                            }
                        }
                    },
                    zj_huafu: {
                        name: "华富",
                        description: "你可以弃置X张手牌令你的手牌数不大于10（X至少为1），然后跳过你的弃牌阶段，将你的角色牌翻面；当你的角色牌被翻面时，你可以摸等同于你已损失的血量的牌(至少1张)。",
                        enable: "phaseUse",
                        filter: function (event, player) {
                            return player.hasCard(lib.filter.all, "h");
                        },
                        content: function (event, player, trigger, result) {
                            "step 0";
                            var shoupaiCount = player.countCards("h");
                            var discardCount = 1;
                            if (shoupaiCount >= 10) {
                                discardCount = shoupaiCount - 10;
                            }
                        },
                    },
                },
            };
            return Huanghuafu;
        });
    })();
})(ZJNGEx || (ZJNGEx = {}));
var ZJNGEx;
(function (ZJNGEx) {
    (function () {
        NG.Utils.importCurContent(this.ZJNGEx, "Yangjuebo", 0, function (lib, game, ui, get, ai, _status) {
            var Yangjuebo = {
                name: "yangjuebo",
                nickName: "杨爵波",
                character: ["male", "wu", 5, ["zj_laobo"], []],
                characterTitle: "盟主捞波",
                characterIntro: "",
                skill: {
                    zj_laobo: {
                        name: "捞波",
                        description: "阶段技，你可以将任意数量的手牌交给任意角色(至少1张)，你摸X张牌且血量+1，若其获得你给出的牌张数不小于2，你可以视为对你使用一张【血】或【魔】(X为你已损失的血量)。",
                        enable: "phaseUse",
                        usable: 1,
                        precontent: function (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) {
                            player.storage.zj_laobo_targets = [];
                            player.storage.zj_laobo_num = 0;
                        },
                        content: function (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) {
                            var storageTargets = player.storage.zj_laobo_targets;
                            var storageNum = player.storage.zj_laobo_num;
                            var haveHandCard = player.countCards("h") > 0;
                            'step 0';
                            if (NG.ObjectUtil.isUndefined(storageTargets) || NG.ObjectUtil.isUndefined(storageNum)) {
                                console.error("不明原因，zj_laobo的标记变量没有生成！");
                                event.finish();
                                return;
                            }
                            'step 1';
                            if (haveHandCard) {
                                player.chooseCardTarget({
                                    filterCard: true,
                                    selectCard: [1, Infinity],
                                    filterTarget: function (card, player, target) {
                                        return player != target;
                                    },
                                    prompt: "选择要交给牌与玩家",
                                    forced: true
                                });
                            }
                            else {
                                event.goto(4);
                            }
                            'step 2';
                            if (result.bool) {
                                storageTargets.push(target);
                                result.targets[0].gain(result.cards, player, "gain");
                                player.storage.zj_laobo_num += result.cards.length;
                            }
                            'step 3';
                            if (haveHandCard) {
                                player.chooseBool("\u662F\u5426\u7EE7\u7EED\u4F7F\u7528\u3010" + lib.translate["zj_laobo"] + "\u3011\uFF1F");
                            }
                            'step 4';
                            if (result.bool) {
                                event.goto(1);
                            }
                            'step 5';
                            var loseHp = player.maxHp - player.hp;
                            player.draw(loseHp);
                            player.recover(1);
                            if (storageNum >= 2) {
                                var list = [];
                                if (player.canUse({ name: "tao" }, player)) {
                                    list.push("tao");
                                }
                                if (player.canUse({ name: "jiu" }, player)) {
                                    list.push("jiu");
                                }
                                if (list.length) {
                                    player.chooseButton([
                                        "是否视为视为对你使用一张【血】或【魔】？",
                                        [list, "vcard"]
                                    ]);
                                }
                                else {
                                    event.finish();
                                }
                            }
                            'step 6';
                            if (result && result.bool && result.links[0]) {
                                var vard = { name: result.links[0][2], nature: result.links[0][3] };
                                player.chooseUseTarget(vard, true);
                            }
                        },
                        contentAfter: function (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) {
                            delete player.storage.zj_laobo_targets;
                            delete player.storage.zj_laobo_num;
                        }
                    },
                },
            };
            return Yangjuebo;
        });
    })();
})(ZJNGEx || (ZJNGEx = {}));
var ZJNGEx;
(function (ZJNGEx) {
    (function () {
        NG.Utils.importCurContent(this.ZJNGEx, "Zhengbosen", 0, function (lib, game, ui, get, ai, _status) {
            var Zhengbosen = {
                name: "zhengbosen",
                nickName: "郑博森",
                character: ["male", "wu", 4, ["zj_bosen"], []],
                characterTitle: "老鬼",
                characterIntro: "",
                skill: {
                    zj_bosen: {
                        name: "博森",
                        description: "锁定技，当你除去1点血量后，你令任一角色摸两张牌；当你死亡时，你可以将你的所有牌交给任一其他角色，然后令其血量+1。",
                        group: ["zj_bosen_zj_bosen_1", "zj_bosen_zj_bosen_2"],
                        subSkill: {
                            zj_bosen_1: {
                                trigger: {
                                    player: [
                                        "loseHp" + "End",
                                        "damage" + "End",
                                    ]
                                },
                                filter: function (event, player) {
                                    window.gameTestLog("filter触发", event);
                                    return event.num > 0;
                                },
                                forced: true,
                                content: function (event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result) {
                                    "step 0";
                                    player.storage.zj_bosen_1_flag = trigger.num;
                                    "step 1";
                                    player.chooseTarget(lib.skill.zj_bosen_1.description);
                                    "step 2";
                                    if (result.bool && result.targets.length > 0) {
                                        result.targets[0].draw(2);
                                    }
                                    player.storage.zj_bosen_1_flag--;
                                    if (player.storage.zj_bosen_1_flag > 0) {
                                        event.goto(1);
                                    }
                                    "step 3";
                                    delete player.storage.zj_bosen_1_flag;
                                },
                                description: "当你除去1点血量后，你令任一角色摸两张牌"
                            },
                            zj_bosen_2: {
                                trigger: {
                                    player: "die" + "Begin"
                                },
                                content: function (event, player, trigger, result) {
                                    "step 0";
                                    player.chooseTarget(lib.translate.zj_bosen_zj_bosen_2_info);
                                    "step 1";
                                    if (result.bool && result.targets.length > 0) {
                                        result.targets[0].gain(player.getCards("hej"), player);
                                        result.targets[0].gainMaxHp(1);
                                    }
                                },
                                description: "当你死亡时，你可以将你的所有牌交给任一其他角色，然后令其血量+1"
                            }
                        }
                    },
                },
            };
            return Zhengbosen;
        });
    })();
})(ZJNGEx || (ZJNGEx = {}));
var ZJNGEx;
(function (ZJNGEx) {
    (function () {
        NG.Utils.importCurContent(this.ZJNGEx, "测试人物", 0, function (lib, game, ui, get, ai, _status) {
            var output = {
                name: "testJuese",
                nickName: "测试人物",
                character: ["male", "wu", 5, [], []],
                characterTitle: "技能测试人物",
                characterIntro: "",
                skill: {},
            };
            return output;
        });
    })();
})(ZJNGEx || (ZJNGEx = {}));
var ZJNGEx;
(function (ZJNGEx) {
    (function () {
        NG.Utils.importCurContent(this.ZJNGEx, "测试技能组2", 3, function (lib, game, ui, get, ai, _status) {
            var skill1 = {
                name: "炼狱",
                description: "",
                trigger: {
                    player: "turnOver" + "End",
                },
                filter: function (event, player) {
                    console.log("\u70BC\u72F1\u53D1\u52A8\u8FC7\u6EE4\u662F\u7684\u7FFB\u9762\u72B6\u6001\uFF1A" + (player.isTurnedOver() ? "翻面" : "翻回正面"));
                    return player.isTurnedOver();
                },
                content: function (event, player, trigger, result) {
                    "step 0";
                    player.turnOver(!player.isTurnedOver());
                    "step 1";
                    player.chooseTarget(1, true, function (card, player, target) {
                        return target != player;
                    }, "\u9009\u62E9\u4E00\u540D\u5176\u4ED6\u89D2\u8272\uFF0C\u89C6\u4E3A\u5BF9\u5176\u4F7F\u7528\u4E00\u5F20\u300A" + lib.translate["sha"] + "\u300B");
                    "step 2";
                    if (result && result.bool) {
                        var target = result.targets[0];
                        if (target) {
                            player.useCard({ name: "sha", isCard: true }, target, false);
                        }
                    }
                }
            };
            var skill2 = {
                name: "新华富测试",
                enable: "phaseUse",
                filter: function (event, player) {
                    return player.countCards("h") > 0;
                },
                content: function (event, player, trigger, result) {
                    "step 0";
                    var hCount = player.countCards("h");
                    var minCount = hCount >= 10 ? 1 : hCount - 10;
                    player.chooseToDiscard([minCount, hCount], "h");
                    "step 1";
                    if (result && result.bool) {
                        player.addTempSkill("zj_skip_PhaseDiscard");
                        player.turnOver(true);
                    }
                }
            };
            var skill3 = {
                name: "新佛门测试",
                mod: {
                    maxHandcard: function (player, num) {
                        return num;
                    },
                },
            };
            var output = {
                test_skill1: skill1,
            };
            return output;
        });
    })();
})(ZJNGEx || (ZJNGEx = {}));
//# sourceMappingURL=extension.js.map