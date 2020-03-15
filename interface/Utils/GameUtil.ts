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

        /** 解析加载数据(用自己方式再次解析到原有的配置规则中) */
        public static loadDevData(extensionData: ExtensionInfoConfigData,
            loadHeroDatas: DevCharacterData[],
            loadCardDatas: DevCardData[],
            skillDatas: SMap<ExSkillData>[]) {
            let packName = extensionData.key;
            let heros = extensionData.package.character;
            let cards = extensionData.package.card;
            let skills = extensionData.package.skill;
            let configs = extensionData.config;
            //解析武将
            for (let i = 0; i < loadHeroDatas.length; i++) {
                const element = loadHeroDatas[i];
                let cfgName = `${packName}_${element.name}`;
                heros.character[cfgName] = element.character;
                heros.characterTitle[cfgName] = element.characterTitle;
                heros.characterIntro[cfgName] = element.characterIntro;
                heros.translate[cfgName] = element.nickName;
                let heroSkills = element.skill;
                for (const skillname in heroSkills) {
                    const skill = heroSkills[skillname];
                    skills.skill[skillname] = skill;
                    skills.translate[skillname] = skill.name;
                    skills.translate[`${skillname}_info`] = skill.description;
                }
            }
            //解析卡牌
            for (let i = 0; i < loadCardDatas.length; i++) {
                const element = loadCardDatas[i];
                let cfgName = `${packName}_${element.name}`;
                cards.card[cfgName] = element.card;
                cards.translate[cfgName] = element.cardName;
                cards.translate[`${cfgName}_info`] = element.description;
                if (element.bgName) {
                    cards.translate[`${cfgName}_bg`] = element.bgName;
                }
                let cardSkills = element.skill;
                for (const skillname in cardSkills) {
                    const skill = cardSkills[skillname];
                    skills.skill[skillname] = skill;
                    skills.translate[`${skillname}_skill`] = skill.name;
                    skills.translate[`${skillname}_skill_info`] = skill.description;
                }
            }
            //解析技能
            for (let i = 0; i < skillDatas.length; i++) {
                const element = skillDatas[i];
                for (const skillname in element) {
                    const skill = element[skillname];
                    skills.skill[skillname] = skill;
                    skills.translate[skillname] = skill.name;
                    skills.translate[`${skillname}_info`] = skill.description;
                }
            }
        }
    }

    
}
