declare namespace Lib.element {
    /**
     * 卡牌card
     * 
     * 游戏内使用的卡牌
     */
    export interface Card {
        /**
         * 初始化card
         * @param card 
         */
        init(card: CardBaseUIData | CardBaseData): Card;
        /**
         * 将当前card，添加到排除列表event._aiexclude中
         */
        aiexclude(): void;
        
        //暂时没用上，暂不知其具体是什么功能
        getSource(name: string): boolean;
        
        //card的UI，动画操作
        updateTransform(bool: boolean, delay: number): void;
        moveDelete(player: Player): void;
        moveTo(player: Player): Card;
        /** 复制一个当前卡牌节点（即复制当前卡牌的副本） */
        copy(): Card;

        /**
         * 设置当前card为“uncheck”（不可检测的时机）
         * @param skill 将指定skill加入_uncheck列表
         */
        uncheck(skill?: string): void;
        /**
         * 移除当前card的“uncheck” 
         * @param skill 将指定skill移除出_uncheck列表
         */
        recheck(skill?: string): void;
        /**
         * 卡牌弃置，
         * 默认弃置到弃牌堆里
         * 若bool为true时，则将其加入牌组中随机位置；
         * 否则设置将该card加入到_status.discarded中
         * @param bool 是否将其弃置回牌组中
         */
        discard(bool: boolean): void;
        /**
         * 检测当前card是否有指定tag
         * @param tag 
         */
        hasTag(tag: string): boolean;
        /**
         * 判断该牌，是否在h（手牌），e（装备），j（判定）区域中
         */
        hasPosition(): boolean;
        /** 判断当前card是否在“c”（抽卡堆），“d”（弃牌堆）里 */
        isInPile(): boolean;
    }

    export interface Card extends HTMLDivElement {
        /** 卡牌id */
        cardid:string;
        /** 卡牌名 */
        name:string;
        /** 卡牌花色 */
        suit:string;
        /** 卡牌数值 */
        number:number;
        /** 伤害属性 */
        nature:string;

        /** 
         * card的dataset:储存数据
         * 其实质是html节点自带DOMStringMap，用于存储携带数据信息
         */
        dataset:{
            /**
             * 是否可对多个目标使用
             * 其值：“1”，“0”
             */
            cardMultitarget: string;
            /** 卡牌名 */
            cardName: string;
            /** 卡牌子类型 */
            cardSubype: string;
            /** 卡牌类型 */
            cardType: string;

            [name: string]: string | undefined;
        };
        
        /** 当前card上主要挂载的UI节点（node主要是作为保存引用的map） */
        node:{
            /** 名字（左上角） */
            name:HTMLDivElement;
            /** 不显示，记录卡牌的信息文本（例如：花色，数字，进攻，防御距离......） */
            name2:HTMLDivElement;
            /** 右上角信息（默认花色 数字） */
            info:HTMLDivElement;
            /** 卡面 */
            image:HTMLDivElement;
            /** 背景 */
            background:HTMLDivElement;
            /** 化身 */
            avatar:HTMLDivElement;
            /** 边框背景（边框） */
            framebg:HTMLDivElement;
            /** 额外添加信息（右下角） */
            addinfo:HTMLDivElement;
            /** 不明 */
            intro:HTMLDivElement;
            /** 范围，卡牌是装备类型时，右下角显示距离（正常情况下和addinfo冲突） */
            range:HTMLDivElement;

        };
        
    }
}