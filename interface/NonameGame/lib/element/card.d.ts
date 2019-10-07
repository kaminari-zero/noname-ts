declare namespace Lib.element {

    export interface Card {
        init(card: any): any;
        updateTransform(bool: any, delay: any): any;
        aiexclude(): any;
        getSource(name: any): any;
        moveDelete(player: any): any;
        moveTo(player: any): any;
        copy(): any;
        uncheck(skill: any): any;
        recheck(skill: any): any;
        /**
         * 卡牌弃置，
         * 默认弃置到弃牌堆里
         * 若bool为true时，则将其加入牌组中随机位置；
         * 否则设置将该card加入到_status.discarded中
         * @param bool 是否将其弃置回牌组中
         */
        discard(bool: boolean): void;
        hasTag(tag: any): any;
        hasPosition(): any;
        isInPile(): any;
    }
}