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
