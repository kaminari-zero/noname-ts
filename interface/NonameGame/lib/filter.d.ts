declare namespace Lib {
    /**
     * 过滤方法
     */
    interface Filter {
        /** 不知是什么用，返回true,应该是等待重写覆盖 */
        all(): boolean;
        /**
         * 是否不在_status.event.excludeButton（排除按钮）中
         * @param button 
         */
        buttonIncluded(button: Button): boolean;
        /** （无用方法）默认返回true,应该是等待重写覆盖 */
        filterButton(button: Button): boolean;
        /**
         * 过滤触发条件
         * [具体分析在身份局笔记中]
         * @param event 
         * @param player 
         * @param name 
         * @param skill 
         */
        filterTrigger(event: GameEvent, player: Player, name: string, skill: string): boolean;
        /**
         * 判断当前武将是否不能使用
         * 该方法有 双将情况下的禁用
         * @param i 武将名
         * @param libCharacter 
         */
        characterDisabled(i: string, libCharacter?: any): boolean;
        /**
         * 判断当前武将是否不能使用2
         * 该方法，有额外：boss，hiddenboss，minskin，lib.characterFilter判定
         * @param i 武将名
         */
        characterDisabled2(i: string): boolean;
        /**
         * 判断该技能是否不能用（非法技能，例如缺少文本描述）
         * @param skill 
         */
        skillDisabled(skill: string): boolean;
        /**
         * 判断该卡牌是否可用
         * （即可用，指符合条件下可以用的卡牌，或者当前游戏中可用的卡牌）.
         * 其中检测当前玩家身上的“cardEnabled”锁定技mod
         * @param card 
         * @param player 
         * @param event 若值为“forceEnable”，则强制开始判定能使用；否则，在checkMod后，根据该卡牌的enable，来做最后判定
         */
        cardEnabled(card: {name:string}, player: Player, event?: string|GameEvent): boolean;
        /**
         * 判断该卡牌是否能响应
         * @param card 
         * @param player 
         * @param event 
         */
        cardRespondable(card: {name:string}, player: Player, event?: GameEvent): boolean;
        /**
         * 判断该卡牌是否能使用
         * （即可使用，但是需要符合在回合内使用，次数限制...等可用时的使用条件）。
         * 其中检测当前玩家身上的“cardUsable”锁定技mod
         * @param card 
         * @param player 
         * @param event 
         */
        cardUsable(card: {name:string}, player: Player, event?: GameEvent): boolean;
        /**
         * 检查某卡牌是可以弃置。
         * 内部根据是否有锁定技mode有“cardDiscardable”卡牌是否可弃置
         * @param card 
         * @param player 
         * @param event 
         */
        cardDiscardable(card: {name:string}, player: Player, event?: GameEvent): boolean;

        /** 过滤可以被丢弃的牌，通过“canBeDiscarded”mod检测 */
        canBeDiscarded(card: {name:string}, player: Player, target: Player, event?: GameEvent): boolean;
        /** 过滤可以获得的牌，通过“canBeGained”mod检测 */
        canBeGained(card: {name:string}, player: Player, target: Player, event?: GameEvent): boolean;
        /** 判断该牌不在_status.event._aiexclude（排除列表）中 */
        cardAiIncluded(card: {name:string}): boolean;

        /**
         * 判断card是否是可用，可使用
         * @param card 
         * @param player 
         * @param event 
         */
        filterCard(card: {name:string}, player: Player, event?: GameEvent): boolean;
        /**
         * 可指定目标
         * 其中检测当前玩家身上的“playerEnabled”,“targetEnabled”锁定技mod；
         * 主要是额外执行了判断card.filterTarget
         * @param card 
         * @param player 
         * @param target 
         */
        targetEnabled(card: {name:string}, player: Player, target: Player): boolean;
        /**
         * 可指定目标2
         * 其中检测当前玩家身上的“playerEnabled”，“targetEnabled”锁定技mod；
         * 主要是额外执行了判断card.modTarget
         * @param card 
         * @param player 
         * @param target 
         */
        targetEnabled2(card: {name:string}, player: Player, target: Player): boolean;
        /**
         * 可指定目标3
         * 没有检测当前玩家身上的“playerEnabled”，“targetEnabled”锁定技mod；
         * 额外执行了判断card.filterTarget，card.modTarget
         * @param card 
         * @param player 
         * @param target 
         */
        targetEnabled3(card: {name:string}, player: Player, target: Player): boolean;
        /**
         * 判断目标是否在指定玩家距离内。
         * 其中检测当前玩家身上的“targetInRange”锁定技mod
         * @param card 
         * @param player 
         * @param target 
         */
        targetInRange(card: {name:string}, player: Player, target: Player): boolean;
        /**
         * 判断玩家是否有可选择的目标
         * （targetEnabled+targetInRange）
         * @param card 
         * @param player 
         * @param target 
         */
        filterTarget(card: {name:string}, player: Player, target: Player): boolean;
        /**
         * 判断玩家是否有可选择的目标2
         * （targetEnabled2+targetInRange）
         * @param card 
         * @param player 
         * @param target 
         */
        filterTarget2(card: {name:string}, player: Player, target: Player): boolean;
        /**
         * 判断玩家player不是target目标
         * @param card 没有的参数，估计图方便占个位置
         * @param player 
         * @param target 
         */
        notMe(card: {name:string}, player: Player, target: Player): boolean;
        /**
         * 判断玩家player是target目标
         * @param card 没有的参数，估计图方便占个位置
         * @param player 
         * @param target 
         */
        isMe(card: {name:string}, player: Player, target: Player): boolean;
        /**
         * 判断玩家palyer攻击距离是否到达目标
         * @param card 没有的参数，估计图方便占个位置
         * @param player 
         * @param target 
         */
        attackFrom(card: {name:string}, player: Player, target: Player): boolean;
        /**
         * 判断玩家palyer是否到达目标的防御距离
         * @param card 没有的参数，估计图方便占个位置
         * @param player 
         * @param target 
         */
        globalFrom(card: {name:string}, player: Player, target: Player): boolean;
        /** 默认[1,1] */
        selectCard(): [number,number];
        /**
         * 获得当前时间中的玩家的选择目标数
         * 其中检测当前玩家身上的“selectTarget”锁定技mod
         */
        selectTarget(): [number,number];
        /**
         * 判断该牌是否是目标判断区的判定牌
         * @param card 
         * @param player 没有的参数，估计图方便占个位置
         * @param target 
         */
        judge(card: {name:string}, player: Player, target: Player): boolean;
        /**
         * 判断当前没有“sha”（杀）可以响应
         * 注：因为该方法主要是赋予给event执行的，故其this是指向执行的事件。
         */
        autoRespondSha(): boolean;
        /**
         * 判断当前没有“shan”（闪）可以响应
         * 注：因为该方法主要是赋予给event执行的，故其this是指向执行的事件。
         */
        autoRespondShan(): boolean;
        /**
         * 判断当前事件的类型type是否为“wuxie”（无懈），当前游戏现场是否有“wuxie”的UI
         * 若符合要求情况下，当前应该为询问“无懈”阶段中
         * @param event 
         */
        wuxieSwap(event: GameEvent): boolean;
    }
}