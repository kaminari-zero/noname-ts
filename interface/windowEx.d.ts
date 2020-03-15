//一些附加到window的对象的提示
declare interface Window extends INodeJsData {
    /** 游戏更新信息配置 */
    noname_update :{
        version:string,
        update:string,
        changeLog:string[],
        files:string[]
    }

    /** 游戏配置 */
    config :{
        forbidai:string[], 
    }

    /** 游戏源列表（预加载资源列表，待验证） */
    noname_source_list:string[],

    /** 游戏懒加载资源列表(外部扩展资源列表，待验证) */
    noname_asset_list:string[],

    /** 默认皮肤列表 */
    noname_skin_list:SMap<number>;

    /** codeMirror,一个代码编辑器库 */
    CodeMirror:{};

    resetGameTimeout:number;

    cordovaLoadTimeout:number;

    game:Game;

    //自定义test扩展
    /** 游戏测试日志 */
    gameTestLog(...args):void;

    /** 流程测试 */
    testLog(type:number, name:string,...args):void;
}

interface INodeJsData {
    /** 一般是只有nodejs环境自带这个库，这边用于判断是否有这方法，有这方法，即是nodejs环境 */
    require:any;
    /** Node.js中提供,表示当前文件所在的目录 */
    __dirname:string;
    /** Node.js中提供,表示正在执行脚本的文件名 */
    __filename:string;
}
