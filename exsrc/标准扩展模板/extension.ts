/// <reference path="../../interface/Utils/Utils.ts" />
/// <reference path="../../interface/Utils/GameUtil.ts" />

/**
 * 加载测试扩展
 */
module BaseExTemplate {
    export let type = NG.ImportType.Extension;
    
    export function extensionFun(lib: Lib, game: Game, ui: UI, get: Get, ai: AI, _status: Status): ExtensionInfoConfigData {
        //武将
        let heros: CharacterConfigData = {
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
            skill: {
                
            },
            translate: {

            }
        };
        //卡牌
        let cards: CardHolderConfigData = {
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
            name: "标准扩展模板",
            key:"template",
            editable: true,
            //选项
            config: {
               
            },
            precontent: function (data: SMap<any>){
                //若需要联机，请将下面package的扩展，移动到这里，在源码中加入
                //（因为正常导入时，需要!_status.connectMode结果为true时，才能导入该扩展）
            },
            content: function (config: SMap<any>, pack: PackageData){
               
            },
            //删除扩展时
            onremove:function(){
    
            },
            package: {
                author: "神雷zero",
                intro: "标准扩展模板",
                version: "1.0.0",

                character: heros,
                skill: skills,
                card: cards,
            },
            translate: {
                ZJSha:"标准扩展模板",
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

        return extensionData;
    }
    
}

//执行导入扩展
game.import(BaseExTemplate.type, Km0TestEx.extensionFun);