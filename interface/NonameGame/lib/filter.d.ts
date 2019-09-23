declare namespace Lib {

interface Filter {
    all():any;
    buttonIncluded(button: any):any;
    filterButton(button: any):any;
    filterTrigger(event: any, player: any, name: any, skill: any):any;
    characterDisabled(i: any, libCharacter: any):any;
    characterDisabled2(i: any):any;
    skillDisabled(skill: any):any;
    cardEnabled(card: any, player: any, event: any):any;
    cardRespondable(card: any, player: any, event: any):any;
    cardUsable(card: any, player: any, event: any):any;
    cardDiscardable(card: any, player: any, event: any):any;
    canBeDiscarded(card: any, player: any, target: any, event: any):any;
    canBeGained(card: any, player: any, target: any, event: any):any;
    cardAiIncluded(card: any):any;
    filterCard(card: any, player: any, event: any):any;
    targetEnabled(card: any, player: any, target: any):any;
    targetEnabled2(card: any, player: any, target: any):any;
    targetEnabled3(card: any, player: any, target: any):any;
    targetInRange(card: any, player: any, target: any):any;
    filterTarget(card: any, player: any, target: any):any;
    filterTarget2(card: any, player: any, target: any):any;
    notMe(card: any, player: any, target: any):any;
    isMe(card: any, player: any, target: any):any;
    attackFrom(card: any, player: any, target: any):any;
    globalFrom(card: any, player: any, target: any):any;
    selectCard():any;
    selectTarget():any;
    judge(card: any, player: any, target: any):any;
    autoRespondSha():any;
    autoRespondShan():any;
    wuxieSwap(event: any):any;
}
}