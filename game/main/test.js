var ddd={};

(function(golbal){

    var aaaa = 1;
    var bbbb = 2;

    //声明到全局：
    var g = golbal;
    g["ccc"] = {
        a:aaaa,
        b:bbbb
    }
})(ddd);

// var g = globalThis;
console.log("测试简单导出222：",ddd.ccc,window["ddd"]);