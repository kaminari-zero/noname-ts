module ZJNGEx {
    (function(){
        NG.Utils.importCurContent(this.ZJNGEx,"测试人物",NG.ImportFumType.none,
        
        function(lib: Lib, game: Game, ui: UI, get: Get, ai: AI, _status: Status) {
            let output: DevCharacterData = { 
                name:"testJuese",
                nickName:"测试人物",
                character:  [NG.Sex.MALE, NG.Group.WOOD, 5, [/*写入测试的技能*/],[]],
                characterTitle:"技能测试人物",
                characterIntro:"",
                skill:{
                    
                },
            }

            return output;
        });
    })();
}