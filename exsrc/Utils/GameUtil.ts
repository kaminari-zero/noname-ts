namespace NG {
    //这边工具主要目的时开发中的解析使用，不使用到游戏的具体逻辑处，用于编写配置时，简化一些编写流程
    //需要在游戏流程中使用，请安装游戏逻辑，规范加入到lib, game, ui, get, ai中
    /**
     * 游戏内常用工具
     */
    export class Utils {
        /**
         * 创建帮助文本
         * @param content 一个数组结构，或者单纯一个字符串
         * @param type 
         */
        public static createHelp(content: any[] | string, type?: number | string) {
            // "帮助条目": "<ul><li>列表1-条目1<li>列表1-条目2</ul><ol><li>列表2-条目1<li>列表2-条目2</ul>" 
            let str = "";
            let itemTag = ""
            let data: any[];
            if (ObjectUtil.isString(content)) {
                data = [content];
            } else if (ObjectUtil.isArray(content)) {
                data = content as any[];
            } else {
                console.error("content类型不正确！");
                return "";
            }
            for (let index = 0; index < data.length; index++) {
                let element = data[index];
                if (ObjectUtil.isString(element)) {
                    let [text, curType] = [element, type ? type : "0"];

                    switch (curType) {
                        case "0"://序号1，2，3
                            itemTag = "ol";
                            break;
                        case "1"://点
                            itemTag = "ul";
                            break;

                    }
                    //后期采用#{xxxxxx}文本来指定特殊格式
                    str += `<li>${text}</li>`;
                } else if (ObjectUtil.isArray(element)) {
                    (<Array<any>>element).forEach((value, index, array) => {
                        str += this.createHelp(value, "1");
                    });
                }
            }
            str = `<${itemTag}>${str}</${itemTag}>`;
            return str;
        }

        /**
         * 使用 #xxxx 标记替换文本（日后再使用）
         * @param desc 
         */
        public static getDesc(desc: string): string {
            desc = desc.replace(/\#\{[a-zA-Z]+\}/g, (sub) => {
                switch (sub) {
                    case "${content}":
                        return "";
                }
                return sub;
            })
            return desc;
        }

        /**
         * 设置触发时机：
         * 
         */
        public static setTrigger() {

        }

        /** 
         * 解析加载数据(用自己方式再次解析到原有的配置规则中) 
         * 
         * content:当前的命名空间的环境
         * extensionData：扩展信息，其实可以直接从content中获取
         * 增加环境变量的绑定
         * 
         * 有可能后期翻译独立翻译出来，所以技能里不写，就不随便覆盖（或者同名不覆盖？还没实现）
         * */
        public static loadDevData(content: any, extensionData: ExtensionInfoConfigData, lib: Lib, game: Game, ui: UI, get: Get, ai: AI, _status: Status) {
            let loadHeroDatas: DevCharacterData[] = [];
            let loadCardDatas: DevCardData[] = [];
            let skillDatas: SMap<ExSkillData>[] = [];
            //自动从content中读取扩展信息：
            //开始制定通用的命名协议
            for (const key in content) {
                if (content.hasOwnProperty(key)) {
                    const element = content[key];
                    if (key.indexOf("outputHero_") > -1) {
                        loadHeroDatas.push(element(lib, game, ui, get, ai, _status));
                    } else if (key.indexOf("outputCard_") > -1) {
                        loadCardDatas.push(element(lib, game, ui, get, ai, _status));
                    } else if (key.indexOf("outputSkill_") > -1) {
                        skillDatas.push(element(lib, game, ui, get, ai, _status));
                    } else if (key.indexOf("onlyRun_") > -1) {
                        element(lib, game, ui, get, ai, _status);
                    }
                }
            }
            let packName = extensionData.key;
            let heros = extensionData.package.character;
            let cards = extensionData.package.card;
            let skills = extensionData.package.skill;
            // let configs = extensionData.config;
            console.log(content, extensionData);
            //解析武将
            for (let i = 0; i < loadHeroDatas.length; i++) {
                const element = loadHeroDatas[i];
                let cfgName = `${packName}_${element.name}`;//name不够唯一
                heros.character[cfgName] = element.character;
                heros.characterTitle[cfgName] = element.characterTitle;
                heros.characterIntro[cfgName] = element.characterIntro;
                element.nickName && (heros.translate[cfgName] = element.nickName);
                let heroSkills = element.skill;
                for (const skillname in heroSkills) {
                    const skill = heroSkills[skillname];
                    skills.skill[skillname] = skill;
                    skill.name && (skills.translate[skillname] = skill.name);
                    skill.description && (skills.translate[`${skillname}_info`] = skill.description);
                }
            }
            //解析卡牌
            for (let i = 0; i < loadCardDatas.length; i++) {
                const element = loadCardDatas[i];
                let cfgName = `${packName}_${element.name}`;
                cards.card[cfgName] = element.card;
                element.cardName && (cards.translate[cfgName] = element.cardName);
                element.description && (cards.translate[`${cfgName}_info`] = element.description);
                if (element.bgName) {
                    cards.translate[`${cfgName}_bg`] = element.bgName;
                }
                let cardSkills = element.skill;
                for (const skillname in cardSkills) {
                    const skill = cardSkills[skillname];
                    skills.skill[skillname] = skill;
                    skill.name && (skills.translate[`${skillname}_skill`] = skill.name);
                    skill.description && (skills.translate[`${skillname}_skill_info`] = skill.description);
                }
            }
            //解析技能
            for (let i = 0; i < skillDatas.length; i++) {
                const element = skillDatas[i];
                for (const skillname in element) {
                    const skill = element[skillname];
                    skills.skill[skillname] = skill;
                    skill.name && (skills.translate[skillname] = skill.name);
                    skill.description && (skills.translate[`${skillname}_info`] = skill.description);
                }
            }
        }

        /** 导入当前环境中 */
        public static importCurContent(content: any, key: string, type: ImportFumType, importFun: ImportFunType) {
            let printHead = "";
            switch (type) {
                case ImportFumType.hero:
                    printHead = "outputHero_";
                    break;
                case ImportFumType.card:
                    printHead = "outputCard_";
                    break;
                case ImportFumType.skill:
                    printHead = "outputSkill_";
                    break;
                case ImportFumType.run:
                    printHead = "onlyRun_";
                    break;
                case ImportFumType.none:
                    console.warn("暂不导入，已忽略key:", key);
                    return;
            }
            let fieldName = printHead + key;
            if (content && content[fieldName]) {
                console.warn("已导入内有相同的key:", key);
            }
            else if (content && !content[fieldName]) {
                content[fieldName] = importFun;
                console.log(`导入${fieldName}成功！`);
            }
            else {
                console.error("不能导入到空环境中！！！！！");
            }
        }

        /** 解析加载数据(用自己方式再次解析到原有的配置规则中) 【旧式】*/
        // public static loadDevData2(extensionData: ExtensionInfoConfigData,
        //     loadHeroDatas: DevCharacterData[],
        //     loadCardDatas: DevCardData[],
        //     skillDatas: SMap<ExSkillData>[]) {
        //     let packName = extensionData.key;
        //     let heros = extensionData.package.character;
        //     let cards = extensionData.package.card;
        //     let skills = extensionData.package.skill;
        //     let configs = extensionData.config;
        //     //解析武将
        //     for (let i = 0; i < loadHeroDatas.length; i++) {
        //         const element = loadHeroDatas[i];
        //         let cfgName = `${packName}_${element.name}`;
        //         heros.character[cfgName] = element.character;
        //         heros.characterTitle[cfgName] = element.characterTitle;
        //         heros.characterIntro[cfgName] = element.characterIntro;
        //         heros.translate[cfgName] = element.nickName;
        //         let heroSkills = element.skill;
        //         for (const skillname in heroSkills) {
        //             const skill = heroSkills[skillname];
        //             skills.skill[skillname] = skill;
        //             skills.translate[skillname] = skill.name;
        //             skills.translate[`${skillname}_info`] = skill.description;
        //         }
        //     }
        //     //解析卡牌
        //     for (let i = 0; i < loadCardDatas.length; i++) {
        //         const element = loadCardDatas[i];
        //         let cfgName = `${packName}_${element.name}`;
        //         cards.card[cfgName] = element.card;
        //         cards.translate[cfgName] = element.cardName;
        //         cards.translate[`${cfgName}_info`] = element.description;
        //         if (element.bgName) {
        //             cards.translate[`${cfgName}_bg`] = element.bgName;
        //         }
        //         let cardSkills = element.skill;
        //         for (const skillname in cardSkills) {
        //             const skill = cardSkills[skillname];
        //             skills.skill[skillname] = skill;
        //             skills.translate[`${skillname}_skill`] = skill.name;
        //             skills.translate[`${skillname}_skill_info`] = skill.description;
        //         }
        //     }
        //     //解析技能
        //     for (let i = 0; i < skillDatas.length; i++) {
        //         const element = skillDatas[i];
        //         for (const skillname in element) {
        //             const skill = element[skillname];
        //             skills.skill[skillname] = skill;
        //             skills.translate[skillname] = skill.name;
        //             skills.translate[`${skillname}_info`] = skill.description;
        //         }
        //     }
        // }


        //翻译用方法

        /** 解析技能描述(只保留这个方法就行了) */
        public static translateDescTxt(str: string) {
            //将描述里的某些特殊符号，翻译是直接阅读的模式：
            let context = str;
            for (let i = 0; i < this.DescTags.length; i++) {
                const element = this.DescTags[i];
                context = this.replaceTxtUtil(context, element[0], element[1]);
            }

            return context;
        };

        public static replaceTxtUtil(context: string, tag: string, replaceTxt: string) {
            let regexp: RegExp = new RegExp(`${tag}`, "g");
            return context.replace(regexp, replaceTxt);
        };

        private static DescTags = [
            //技能规范描述
            ["\\[自\\]", "你自己"],
            ["\\[他\\]", "其他一名角色"],
            ["\\[任一\\]", "任意一名角色"],
            ["\\[其他\\]", "除你自己以外任意一名角色"],
            ["\\[全\\]", "全部所有角色"],
            ["\\[他们\\]", "全部所有其他角色"],
            ["\\[判定\\]", "进行一次判定"],
            ["\\[正面\\]", "角色牌正面朝上时"],
            ["\\[反面\\]", "角色牌反面朝上时"],
            ["\\[翻面\\]", "将角色牌翻面"],
            ["\\[受伤\\]", "血量不满的角色"],
            ["\\[叠置\\]", "将牌置于角色牌下"],
            ["\\[结果\\]", "判定牌的判定结果为"],
            ["\\[D\\]", "置于角色牌下的牌"],

            //阶段描述
            ["<准备>", "准备阶段"],
            ["<判定>", "判定阶段"],
            ["<摸牌>", "摸牌阶段"],
            ["<出牌>", "出牌阶段"],
            ["<弃牌>", "弃牌阶段"],
            ["<结束>", "结束阶段"],

            //性别：
            ["(男)", "男性角色"],
            ["(女)", "女性角色"]
        ];
    }

    /** 导入环境的方法 */
    export type ImportFunType = (lib: Lib, game: Game, ui: UI, get: Get, ai: AI, _status: Status) => DevCharacterData | DevCardData | SMap<ExSkillData>;
    /** 导入环境的类型 */
    export const enum ImportFumType {
        /** 忽略 */
        none,
        hero,
        card,
        skill,
        /** 只执行，不返回数据处理 */
        run,
    }
}

/*
基本模板
(function(){
    NG.Utils.importCurContent(this.ZJNGEx,"Huanghuafu",NG.ImportFumType.hero,

    function(lib: Lib, game: Game, ui: UI, get: Get, ai: AI, _status: Status) {
        let output =

        return output;
    });
})();
*/
