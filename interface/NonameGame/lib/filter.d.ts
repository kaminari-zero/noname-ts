declare namespace Lib {

    interface Filter {
        all(): any;
        buttonIncluded(button: any): any;
        filterButton(button: any): any;
        /**
         * 过滤触发条件
         * @param event 
         * @param player 
         * @param name 
         * @param skill 
         */
        filterTrigger(event: any, player: any, name: any, skill: any): any;
        characterDisabled(i: any, libCharacter: any): any;
        characterDisabled2(i: any): any;
        skillDisabled(skill: any): any;
        cardEnabled(card: any, player: any, event: any): any;
        cardRespondable(card: any, player: any, event: any): any;
        cardUsable(card: any, player: any, event: any): any;
        /**
         * 检查某卡牌是哦夫可以弃置。
         * 内部根据是否有锁定技mode有“cardDiscardable”卡牌是否可弃置
         * @param card 
         * @param player 
         * @param event 
         */
        cardDiscardable(card: any, player: any, event: any): any;
        canBeDiscarded(card: any, player: any, target: any, event: any): any;
        canBeGained(card: any, player: any, target: any, event: any): any;
        cardAiIncluded(card: any): any;
        filterCard(card: any, player: any, event: any): any;
        targetEnabled(card: any, player: any, target: any): any;
        targetEnabled2(card: any, player: any, target: any): any;
        targetEnabled3(card: any, player: any, target: any): any;
        targetInRange(card: any, player: any, target: any): any;
        filterTarget(card: any, player: any, target: any): any;
        filterTarget2(card: any, player: any, target: any): any;
        notMe(card: any, player: any, target: any): any;
        isMe(card: any, player: any, target: any): any;
        attackFrom(card: any, player: any, target: any): any;
        globalFrom(card: any, player: any, target: any): any;
        selectCard(): any;
        selectTarget(): any;
        judge(card: any, player: any, target: any): any;
        autoRespondSha(): any;
        autoRespondShan(): any;
        wuxieSwap(event: any): any;
    }
}