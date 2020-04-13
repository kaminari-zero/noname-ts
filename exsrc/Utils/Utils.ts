namespace NG {
    //这边工具主要目的时开发中的解析使用，不使用到游戏的具体逻辑处；
    /**
     * 对象工具，copy过来
     */
    export class ObjectUtil {
        /**
         * 搜索对象中是否包含一个属性
         * @param obj
         * @param member
         * @returns {boolean}
         */
        public static contains(obj: any, member: any): boolean {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop) && obj[prop] == member) {
                    return true;
                }
            }
            return false;
        }

        /**
         * @description 深拷贝对象
         * @returns Object
         */
        public static deepClone(obj: Object, isDeep: boolean = true): Object {
            if (!obj || typeof obj !== 'object') {
                throw new Error("error type");
            }

            var targetObj = obj.constructor === Array ? [] : {};
            for (var keys in obj) {
                if (obj.hasOwnProperty(keys)) {
                    if (obj[keys] && typeof obj[keys] === 'object' && isDeep) {
                        targetObj[keys] = obj[keys].constructor === Array ? [] : {};
                        targetObj[keys] = this.deepClone(obj[keys], isDeep);
                    } else {
                        targetObj[keys] = obj[keys];
                    }
                }
            }
            return targetObj;
        }


        /**
         * 克隆数据，可深度克隆
         * 这里列出了原始类型，时间、正则、错误、数组、对象的克隆规则，其他的可自行补充
         */
        public static clone(value, deep) {
            if (this.isPrimitive(value)) {
                return value;
            }

            if (this.isArrayLike(value)) { //是类数组
                value = Array.prototype.slice.call(value);
                return value.map(item => deep ? this.clone(item, deep) : item);
            } else if (this.isPlainObject(value)) { //是对象
                let target = {}, key;
                for (key in value) {
                    value.hasOwnProperty(key) && (target[key] = deep ? this.clone(value[key], deep) : value[key]);
                }
            }

            let type = this.getRawType(value);

            switch (type) {
                case 'Date':
                case 'RegExp':
                case 'Error': value = new Window[type](value); break;
            }
            return value;
        }

        /**
         * 数组克隆
         * @param obj
         * @param deep
         * @returns {Array<any>}
         */
        public static arrayClone(obj: Array<any>, deep: boolean = false): Array<any> {
            var buf: Array<any> = [];
            var i = obj.length;
            while (i--) {
                buf[i] = deep ? arguments.callee(obj[i]) : obj[i];
            }
            return buf;
        }

        /**
         * 获取对象所有键存成数组
         * @param obj
         * @returns {Array<any>}
         */
        public static getKeys(obj: any): Array<any> {
            var keys: Array<any> = [];
            for (var i in obj)
                if (obj.hasOwnProperty(i))
                    keys.push(i);
            return keys;
        }

        /**
         * 检测数据是不是除了symbol外的原始数据
         */
        public static isStatic(value) {
            return (
                typeof value === 'string' ||
                typeof value === 'number' ||
                typeof value === 'boolean' ||
                typeof value === 'undefined' ||
                value === null
            )
        }

        /**
         * 检测数据是不是原始数据
         */
        public static isPrimitive(value) {
            return this.isStatic(value) || typeof value === 'symbol';//synbol,是es6新增的一个特殊属性
        }

        /**
         * 检查 value 是否是类数组
         * 如果一个值被认为是类数组，那么它不是一个函数，并且value.length是个整数，大于等于 0，小于或等于 Number.MAX_SAFE_INTEGER。这里字符串也将被当作类数组
         */
        public static isArrayLike(value) {
            return value != null && this.isLength(value.length) && !this.isFunction(value);
        }

        /**
         * 检查 value 是否为有效的类数组长度
         */
        public static isLength(value) {
            return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= Number.MAX_SAFE_INTEGER;
        }

        /**
         * 判断一个对象是否包含一个特定的方法
         * @param obj
         * @param methodName
         * @returns {boolean}
         */
        public static isMethod(obj: any, methodName: string): boolean {
            if (obj.hasOwnProperty(methodName))
                return obj[methodName] instanceof Function;
            return false;
        }

        /**
         * 对象是否未定义
         * @param obj
         * @returns {boolean}
         */
        public static isUndefined(obj: any): boolean {
            return this.isNull(obj) || obj === undefined || typeof obj === 'undefined';
        }

        /**
         * 对象是否为null
         * @param obj
         * @returns {boolean}
         */
        public static isNull(obj: any): boolean {
            //todo 运算符“==”不能应用于类型““string”“number”“boolean”“symbol”“undefined”“object”“function””和““null”。
            //第一种：(Number(null) === 0 && obj !== 0) //也可以通过这种方式判断，Number(null) = 0，Number(undefined) = NaN
            //第二种：obj == null && typeof obj === "object"
            //第三种：Object.prototype.toString.call(obj) == "[object Null]"
            return obj === null;
        }

        /**
         * 判断对象是否为空: 0,[],"",{}
         * @param obj
         * @returns {boolean}
         */
        public static isEmpty(obj: any): boolean {
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
        }

        /**
         * 判断数据是不是引用类型的数据 
         * (例如： arrays, functions, objects, regexes, new Number(0),以及 new String(''))
         */
        public static isObject(value) {
            let type = typeof value;
            return value != null && (type == 'object' || type == 'function');
        }

        /**
         * 获取数据类型，
         * 返回结果为 Number、String、Object、Array
         */
        public static getRawType(value) {
            return Object.prototype.toString.call(value).slice(8, -1);
        }

        /**
         * 判断数据是不是普通Object类型的数据
         * 注：Array,Date,RegExp,Function非普通对象
         */
        public static isPlainObject(obj) {
            return Object.prototype.toString.call(obj) === '[object Object]'
        }

        /**
         * 判断数据是不是正则对象
         */
        public static isRegExp(value) {
            return Object.prototype.toString.call(value) === '[object RegExp]'
        }

        /**
         * 判断数据是不是时间对象
         */
        public static isDate(value) {
            return Object.prototype.toString.call(value) === '[object Date]'
        }

        /** 
         * 判断数据是不是数组类型的数据
         */
        public static isArray(arr) {
            return Object.prototype.toString.call(arr) === '[object Array]'
        }

        /**
         * 判断是否是数字
         * @param value 
         */
        public static isNumber(value) {
            return typeof value == "number" || (!isNaN(value) && !this.isNaN2(value));
        }

        /**
         * 判断是否时NaN,在js定义中，NaN时不等于自身
         */
        public static isNaN2(value) {
            return value != value;
        }

        /**
         * 判断是否是字符串
         * @param value 
         */
        public static isString(value) {
            return typeof value == "string" || Object.prototype.toString.call(value) == "[object String]";
        }

        /** 
         * 检查 value 是不是函数
         */
        public static isFunction(value) {
            return Object.prototype.toString.call(value) === '[object Function]'
        }

        /**
         * 判断 value 是不是浏览器内置函数：
         * 内置函数toString后的主体代码块为 [native code] ，而非内置函数则为相关代码，所以非内置函数可以进行拷贝(toString后掐头去尾再由Function转)
         */
        public static isNative(value) {
            return typeof value === 'function' && /native code/.test(value.toString());
        }

        /**
         * 将属性复制到目标对象上
         */
        public static extend(to, _from) {
            for (let key in _from) {
                to[key] = _from[key];
            }
            return to;
        }

        /** 获取对象的类名 */
        public static getClassName(obj): string {
            //__proto__这个虽然现在流浪器大部分都支持，但是不建议使用，而且标准也只支持流浪器支持
            if (obj.__proto__ && obj.__proto__.constructor) {
                return obj.__proto__.constructor.name;
            } else if (Object.getPrototypeOf(obj) && Object.getPrototypeOf(obj).constructor) { //一般使用Object的方式获取prototype
                return Object.getPrototypeOf(obj).constructor.name;
            } else {
                throw "不支持__proto__.constructor 或者没有 prototype";
            }
        }

        /** 获取对象的类 */
        public static getClass(obj) {
            if (obj.__proto__ && obj.__proto__.constructor) {
                return obj.__proto__.constructor;
            } else if (Object.getPrototypeOf(obj) && Object.getPrototypeOf(obj).constructor) {
                return Object.getPrototypeOf(obj).constructor;
            } else {
                throw "不支持__proto__.constructor 或者没有 prototype";
            }
        }

    }

    /**
     * 数学工具
     */
    export class MathUtil {
        /**
         * 获取某个区间的随机数
         */
        public static getLimitRandom(min: number, max: number, type: number = 0) {
            switch (type) {
                case 1://如果想获得 [min, max）
                    return Math.floor(Math.random() * (max - min)) + min;;
                case 2://如果想获得 (min, max]
                    return Math.ceil(Math.random() * (max - min)) + min;;
                case 0: // 如果想获得 [min, max]
                default:
                    return Math.floor(Math.random() * (max - min + 1)) + min;
            }
        }

        /**
         * 值映射
         * value:
         * start,end:value值的范围
         * targetStart，targetEnd：要映射的目标的范围
         * 
         * 返回：返回映射目标范围内对应的映射值
         */
        public static map(value: number, start: number, end: number, targetStart: number, targetEnd: number) {
            return ((end - start) / (value - start)) * (targetEnd - targetStart) + targetStart;
        }

        /**
         * 获得两个值中线性插值
         * start：开始的点
         * end:结束的点
         * amt：参数为两个值之间的插值量，0.0 为第一个值，0.1 为非常接近第一个值，0.5 为两者之间，1为最后一个值等等。
         */
        public static lerp(start: number, end: number, amt: number) {
            return start + (end - start) * amt;
        }
    }

    /**
     * 字符串工具
     */
    class StringUtil {
        /**
         * 多级分割字符串
         * @str 目标字符串
         * @separators 分割符数组
         */
        public static multiSplit(str: string, separators: string[], Split: boolean = false): any[] {
            function split2(strs: any[], separators: string[], separatorIndex): any[] {
                let separator = separators[separatorIndex];
                if (separator && strs) {
                    for (let i in strs) {
                        let stra = strs[i];
                        if (stra == "") {
                            delete strs[i];
                            strs.length = strs.length - 1;
                            continue
                        }
                        if (stra == separator) {
                            strs[i] = []
                        }
                        if (stra.indexOf(separator) >= 0) {
                            strs[i] = split2(stra.split(separator), separators, separatorIndex + 1);
                        } else {
                            if (Split) {
                                strs[i] = split2([stra], separators, separatorIndex + 1)
                            }
                        }
                    }
                }
                return strs
            }
            if (str) {
                let r = split2([str], separators, 0)[0]
                if (r == str) {
                    return [r]
                } else {
                    return r
                }
            } else {
                return []
            }

        }

        /**
		 * 格式化替换字符串里面的$符号 
		 * @param str 要替换的字符串
         * @param params 替换字符串中$标志的参数列表
         * @return 
		 * 
		 */
        public static format(str: string, ...params): string {
            var index: number = str.indexOf("$");
            while (index != -1 && params.length > 0) {
                str = str.substring(0, index) + params.shift() + str.substring(index + 1);
                index = str.indexOf("$");
            }
            return str;
        }


        /**
         * 格式化时间
         * formater 格式：yyyy/yy年，MM月，DD日，hh时，mm分，ss秒例:YYYY-MM-DD HH:mm,YYYYMMDDHHmm
         * t:时间，可以是毫秒，可以时间格式字符串
         */
        public static dateFormater(formater: string, t) {
            let date = t ? new Date(t) : new Date(),
                Y = date.getFullYear() + '',
                M = date.getMonth() + 1,
                D = date.getDate(),
                H = date.getHours(),
                m = date.getMinutes(),
                s = date.getSeconds();
            return formater.replace(/YYYY|yyyy/g, Y)
                .replace(/YY|yy/g, Y.substr(2, 2))
                .replace(/MM/g, (M < 10 ? '0' : '') + M)
                .replace(/DD/g, (D < 10 ? '0' : '') + D)
                .replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
                .replace(/mm/g, (m < 10 ? '0' : '') + m)
                .replace(/ss/g, (s < 10 ? '0' : '') + s)
        }

        /**
         * 将指定字符串由一种时间格式转化为另一种
         * 
         * 例：
         * // dateStrForma('20190626', 'YYYYMMDD', 'YYYY年MM月DD日') ==> 2019年06月26日
            // dateStrForma('121220190626', '----YYYYMMDD', 'YYYY年MM月DD日') ==> 2019年06月26日
            // dateStrForma('2019年06月26日', 'YYYY年MM月DD日', 'YYYYMMDD') ==> 20190626
        */
        public static dateStrForma(str, from, to) {
            //'20190626' 'YYYYMMDD' 'YYYY年MM月DD日'
            str += ''
            let Y = ''
            if (~(Y = from.indexOf('YYYY'))) {
                Y = str.substr(Y, 4)
                to = to.replace(/YYYY|yyyy/g, Y)
            } else if (~(Y = from.indexOf('YY'))) {
                Y = str.substr(Y, 2)
                to = to.replace(/YY|yy/g, Y)
            }

            let k, i
            ['M', 'D', 'H', 'h', 'm', 's'].forEach(s => {
                i = from.indexOf(s + s)
                k = ~i ? str.substr(i, 2) : ''
                to = to.replace(s + s, k)
            })
            return to;
        }
    }

    /** 数组工具 */
    export class ArrayUtil {
        /**
        * 从数组里面找出满足条件的元素，找到第一个立即即返回
        */
        static find<T>(arr: Object, param: string, value: any): any
        static find<T>(arr: Array<T>, key: string, value: any): any
        static find<T>(arr: Array<T>, every: (item: T) => boolean): any
        static find<T>(arr: Array<T>, param: any, value?: any): any {
            if (arr instanceof Array == false) {
                if (arr[param] == value) {
                    return arr;
                } else {
                    return null;
                }
            }

            let every: (item: T) => boolean;
            if (typeof param == "string") {
                every = function (item: T): boolean { return item[param] == value };
            } else {
                every = param;
            }
            for (var key in arr) {
                if (every.call(null, arr[key]) == true) {
                    return arr[key];
                }
            }
            return null;
        }

        /**
         * 从数组里面找出所有满足条件的元素
         */
        static findAll<T>(arr: Array<T>, key: string, value: any): any
        static findAll<T>(arr: Array<T>, every: (item: T) => boolean): Array<T>
        static findAll<T>(arr: Array<T>, param: any, value?: any): any {
            let every: (item: T) => boolean;
            if (typeof param == "string") {
                every = function (item: T): boolean { return item[param] == value };
            } else {
                every = param;
            }
            let a: Array<T> = [];
            for (var key in arr) {
                if (every.call(null, arr[key]) == true) {
                    a.push(arr[key]);
                }
            }
            return a;
        }

    }

    /** 正则工具 */
    export class RegExpUtil {
        /**
         * 替换
         * callback:可以是字符串,也可以是一个方法,该方法的参数时匹配出来的字符串,通过,return回一个字符串就可以替换掉匹配的字符串
         */
        static replace(regex: RegExp, str: string, callback: (substring: string, ...args: any[]) => string) {
            //  console.log( "MyRegexUtils replce" );
            return str.replace(regex, callback);
        }

        /**
         * 返回正则匹配的所有结果
         * 注:字符串的match方法,只能返回字符串结果,不能返回分组和index,input等参数
         * @param {正则表达式} regex 
         * @param {源字符串} str 
         * @param {对匹配结果的处理} callback 
         */
        static matchAll(regex: RegExp, str: string, callback: Function) {
            let allResult = [];
            let result;
            //不知为啥lastIndex为1(.....知道原因了,因为之前执行了test,导致lastIndex提前1位了)
            regex.lastIndex = 0;
            while ((result = regex.exec(str)) != null) {
                // console.log(result);  
                if (callback) {
                    callback.call(null, result);
                }
                allResult.push(result);
            }
            return allResult;
        }
    }
}