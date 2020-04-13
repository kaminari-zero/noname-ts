module ZJNGEx {
        (function(){
            NG.Utils.importCurContent(this.ZJNGEx,"XSSP-0001",NG.ImportFumType.hero,
            
            function(lib: Lib, game: Game, ui: UI, get: Get, ai: AI, _status: Status) {
                let output: DevCharacterData = { 
                    name:"XSSP-0001",
                    nickName:"钟麟",
                    character:  ["male","shu",5,[/* 技能列表 */],[/* 图片信息 */'ZJNGEx'],['无',6]],
                    characterTitle:"侵略之麟",
                    characterIntro:"ZJ联盟杀的人物",
                    skill:{
                        
                    },
                }
    
                return output;
            });
        })();
    }