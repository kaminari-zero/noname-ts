declare namespace Lib {

    interface Init {
        /** 游戏初始化 */
        init(): any;
        /** 游戏重置 */
        reset(): any;
        /** 主要时游戏UI的加载，和是否直接进入默认玩法模式，还是进入开始界面 */
        onload(): any;
        startOnline(): any;
        onfree(): any;
        connection(ws: any): any;
        sheet(): any;
        css(path: any, file: any, before: any): any;
        /**
         * 读取外部加载js (动态加载js扩展)
         * @param path 路径
         * @param file 文件名，数组的话，就是读取一些列该路径下的文件
         * @param onload 加载成功回调
         * @param onerror 加载失败回调
         */
        js(path: string, file: string | string[], onload: () => void, onerror: () => void): any;
        req(str: any, onload: any, onerror: any, master: any): any;
        json(url: any, onload: any, onerror: any): any;
        cssstyles(): any;
        layout(layout: any, nosave: any): any;
        background(): any;
        parsex(func: any): any;
        parse(func: any): any;
        eval(func: any): any;
        encode(strUni: string): string;
        decode(str: string): string;
        stringify(obj: string): string;
        stringifySkill(obj: any): any;
    }

}