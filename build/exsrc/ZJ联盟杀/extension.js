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
var ZJNGEx;
(function (ZJNGEx) {
    ZJNGEx.Huanghuafu = {
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
})(ZJNGEx || (ZJNGEx = {}));
var ZJNGEx;
(function (ZJNGEx) {
    ZJNGEx.Yangjuebo = {
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
                        event.finish();
                    }
                    'step 2';
                    if (result.bool) {
                        storageTargets.push(target);
                        result.targets[0].gain(result.cards, player, "gain");
                        player.storage.zj_laobo_num += result.cards.length;
                    }
                    'step 3';
                    if (haveHandCard) {
                        event.goto(1);
                    }
                    'step 4';
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
                    'step 5';
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
})(ZJNGEx || (ZJNGEx = {}));
var ZJNGEx;
(function (ZJNGEx) {
    ZJNGEx.Zhengbosen = {
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
})(ZJNGEx || (ZJNGEx = {}));
var ZJNGEx;
(function (ZJNGEx) {
    ZJNGEx.SkipPhaseSkill = {
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
})(ZJNGEx || (ZJNGEx = {}));
var ZJNGEx;
(function (ZJNGEx) {
    ZJNGEx.type = "extension";
    var loadHeroDatas = [ZJNGEx.Huanghuafu, ZJNGEx.Yangjuebo, ZJNGEx.Zhengbosen];
    var loadCardDatas = [];
    var skillDatas = [ZJNGEx.SkipPhaseSkill];
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
            }
        };
        NG.Utils.loadDevData(extensionData, loadHeroDatas, loadCardDatas, skillDatas);
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
        return extensionData;
    }
    ZJNGEx.extensionFun = extensionFun;
})(ZJNGEx || (ZJNGEx = {}));
game.import(ZJNGEx.type, ZJNGEx.extensionFun);
