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
        return Utils;
    }());
    NG.Utils = Utils;
})(NG || (NG = {}));
