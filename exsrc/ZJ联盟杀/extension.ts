/// <reference path="../Utils/Utils.ts" />
/// <reference path="../Utils/GameUtil.ts" />
/// <reference path="./skillRef.ts" />
/// <reference path="./characterRef.ts" />
/// <reference path="./cardRef.ts" />


/**
 * ZJ联盟杀
 */
module ZJNGEx {
    export let type = NG.ImportType.Extension;
    // /** 加载的武将数据 */
    // let loadHeroDatas:DevCharacterData[] = [Huanghuafu,Yangjuebo,Zhengbosen];
    // /** 加载的卡牌数据 */
    // let loadCardDatas:DevCardData[] = [];
    // /** 加载的技能数据(自定义公共技能) */
    // let skillDatas:SMap<ExSkillData>[] = [SkipPhaseSkill];
    
    export function extensionFun(lib: Lib, game: Game, ui: UI, get: Get, ai: AI, _status: Status): ExtensionInfoConfigData {
        //武将
        //zjm01
        let heros: CharacterConfigData = {
            // name: "ZJShaHero",
            // connect: true,
            character: {
            },
            characterTitle: {
            },
            characterIntro:{
            },
            skill: {
            },
            translate: {
                
            }
        };

        //技能
        let skills: ExSkillConifgData = {
            // name: "ZJShaSkill",
            skill: {
                
            },
            translate: {

            }
        };
        //卡牌
        let cards: CardHolderConfigData = {
            // name: "ZJShaCard",
            // connect: true,
            card: {

            },
            skill: {

            },
            list: [],
            translate: {

            }
        };

        //extension扩展数据
        let extensionData: ExtensionInfoConfigData = {
            name: "ZJ联盟杀",
            key:"ZJSha",
            editable: true,
            //选项
            config: {
                start_wuxing:{
                    name:"启用五行属性",
                    init:true,
                    intro:"将”魏蜀吴群神“变为”水火木土金“",
                    frequent:true,
                    // onclick:(item)=>{
                    //     console.log("点击后输出的结果为：",item);
                    // }
                    onclick: updateWuxingName
                },
                start_wuxingSkill:{
                    name:"启用五行属性主公技",
                    init:true,
                    intro:"在身份局中，不同属性的身份会拥有不同的主公技",
                    frequent:true,
                    onclick:(item)=>{
                        console.log("点击后输出的结果为111：",item);
                    }
                }
            },
            precontent: function (data: SMap<any>){
                //若需要联机，请将下面package的扩展，移动到这里，在源码中加入
                //（因为正常导入时，需要!_status.connectMode结果为true时，才能导入该扩展）
            },
            content: function (config: SMap<any>, pack: PackageData){
                // console.log("检测默认选项：",config,pack);
                if (config.start_wuxing){
                    updateWuxingName(true);
                }
            },
            //删除扩展时
            onremove:function(){
    
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
                ZJSha:"ZJ联盟杀",
            },
            help:{
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

        //选项得方法实现
        /**
         * 将”魏蜀吴群神“变为”水火木土金“
         * @param bool 
         */
        function updateWuxingName(bool:boolean){
            //目前还暂时做不到独立显示，独立该包才显示得势力，需要自己独立造势力，或者修改源代码；
            //独立造势力，也要修改源代码，ui相关的，具体后面详细了解ui后再看看
            if(bool){
                lib.translate.wei = "水";
                lib.translate.shu = "火";
                lib.translate.wu = "木";
                lib.translate.qun = "土";
                lib.translate.shen = "金";
            } else {
                lib.translate.wei = "魏";
                lib.translate.shu = "蜀";
                lib.translate.wu = "吴";
                lib.translate.qun = "群";
                lib.translate.shen = "神";
            }
        }
    
        /**
         * 在身份局中，不同属性的身份会拥有不同的主公技
         * 
         * 启用后，会添加一个对应主公属性的全局技能，再选主公后，或者游戏开始后生效
         * @param bool 
         */
        function updateWuxingSkill(bool:boolean){
    
        }

        //解析加载数据：
        // NG.Utils.loadDevData(extensionData,loadHeroDatas,loadCardDatas,skillDatas);
        NG.Utils.loadDevData(this.ZJNGEx,extensionData,lib, game, ui, get, ai, _status);

        return extensionData;
    }

    
}

//执行导入扩展
game.import(ZJNGEx.type, ZJNGEx.extensionFun);