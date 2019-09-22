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
        discard(bool: any): any;
        hasTag(tag: any): any;
        hasPosition(): any;
        isInPile(): any;
    }
}