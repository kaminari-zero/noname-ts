declare namespace Lib.element {

    /**
     * 玩家类
     * 还有许多内部属性没暴露出来
     * 来源：lib.element.player
     */
    interface Player {
        //新函数
        chooseToDuiben(target: any): any;
        chooseToPSS(target: any): any;
        chooseToEnable(): any;
        chooseToDisable(horse: any): any;
        countDisabled(): any;
        isPhaseUsing(notmeisok: any): any;
        swapEquip(target: any): any;
        canCompare(target: any): any;
        disableEquip(pos: any): any;
        $disableEquip(skill: any): any;
        enableEquip(pos: any): any;
        $enableEquip(skill: any): any;
        isDisabled(arg: any): any;
        isEmpty(num: any): any;
        /**
         * 废除判定区
         * 使该玩家markSkill('_disableJudge')
         */
        disableJudge(): any;
        //原有函数
        init(character: any, character2: any, skill: any): any;
        initOL(name: any, character: any): any;
        uninitOL(): any;
        initRoom(info: any, info2: any): any;
        reinit(from: any, to: any, maxHp: any, online: any): any;
        uninit(): any;
        getLeft(): any;
        getTop(): any;
        smoothAvatar(vice: any, video: any): any;
        changeSeat(position: any, video: any): any;
        send(): any;
        getId(): any;
        chat(str: any): any;
        say(str: any): any;
        showGiveup(): any;
        applySkills(skills: any): any;
        getState(): any;
        setNickname(str: any): any;
        setAvatar(name: any, name2: any, video: any, fakeme: any): any;
        setAvatarQueue(name: any, list: any): any;
        flashAvatar(skill: any, name: any): any;
        update(): any;
        updateMark(i: any, storage: any): any;
        updateMarks(connect: any): any;
        num(arg1: any, arg2: any, arg3: any): any;
        /**
         *  画指引线
         * @param target 
         * @param config 
         */
        line(target: any, config: any): any;
        line2(targets: any, config: any): any;
        /**
         * 获取当前玩家的下一个玩家（下家）
         * 注：若当前有skill为“undist”，则没有下一个玩家；
         * 若遍历，直到找到下一个没有“undist”玩家
         */
        getNext(): any;
        /**
         * 获取当前玩家的上一个玩家（上家）
         * 注：若当前有skill为“undist”，则没有上一个玩家；
         * 若遍历，直到找到上一个没有“undist”玩家
         */
        getPrevious(): any;
        countUsed(card: any): any;
        countSkill(skill: any): any;
        getStockSkills(unowned: any, unique: any, hidden: any): any;
        /**
         * 获取当前玩家的牌(根据类型指定)
         * @param arg1 获取玩家身上牌的类型：h手牌，e装备牌，j判定牌，可以多个拼接
         * @param arg2 获取牌的详细过滤条件（若是字符串则是卡牌名，若是对象是个cardSimpInfo结构）
         */
        getCards(arg1: string, arg2: string | cardSimpInfo): any[];
        getDiscardableCards(player: any, arg1: any, arg2: any): any;
        getGainableCards(player: any, arg1: any, arg2: any): any;
        getGainableSkills(func: any): any;
        /**
         * 计算获取当前玩家的牌数(根据类型指定)
         * @param arg1 获取玩家身上牌的类型：h手牌，e装备牌，j判定牌，可以多个拼接
         * @param arg2 获取牌的详细过滤条件（若是字符串则是卡牌名，若是对象是个cardSimpInfo结构）
         */
        countCards(arg1: string, arg2: string | cardSimpInfo): number;
        countDiscardableCards(player: any, arg1: any, arg2: any): any;
        countGainableCards(player: any, arg1: any, arg2: any): any;
        getOriginalSkills(): any;
        /**
         * 获取玩家的技能。
         * 默认获取玩家（除了玩家forbiddenSkills上的禁用技能）的：
         *  武将技能skills+附加技能additionalSkills+临时技能tempSkills
         * @param arg2 若为true，获取技能附带隐藏技能hiddenSkills
         * @param arg3 若为true，获取技能附带装备技能；
         * @param arg4 若为true，获取技能经过game.filterSkills过滤后的技能
         * @return 返回最后收集到的玩家的技能   
         */
        getSkills(arg2?: boolean, arg3?: boolean, arg4?: boolean): any;
        get(arg1: any, arg2: any, arg3: any, arg4: any): any;
        syncStorage(skill: any): any;
        syncSkills(): any;
        playerfocus(time: any): any;
        setIdentity(identity: any): any;
        insertPhase(skill: any, insert: any): any;
        insertEvent(name: any, content: any, arg: any): any;
        /**
         * 回合阶段
         * @param skill 
         */
        phase(skill: any): any;
        /**
         * 判断阶段
         */
        phaseJudge(): any;
        /**
         * 抽牌阶段
         */
        phaseDraw(): any;
        /**
         * 出牌阶段
         */
        phaseUse(): any;
        /**
         * 弃牌阶段
         */
        phaseDiscard(): any;
        /**
         * 选将使用
         * @param use 
         */
        chooseToUse(use: any): any;
        chooseToRespond(): any;
        /**
         * 选择弃牌
         */
        chooseToDiscard(): any;
        chooseToCompare(target: any, check: any): any;
        chooseSkill(target: any): any;
        discoverCard(list: any): any;
        chooseCardButton(): any;
        chooseVCardButton(): any;
        chooseButton(): any;
        chooseButtonOL(list: any, callback: any, ai: any): any;
        chooseCardOL(): any;
        chooseCard(): any;
        chooseUseTarget(card: any, prompt: any, includecard: any): any;
        chooseTarget(): any;
        chooseCardTarget(choose: any): any;
        chooseControlList(): any;
        chooseControl(): any;
        chooseBool(): any;
        chooseDrawRecover(): any;
        choosePlayerCard(): any;
        discardPlayerCard(): any;
        gainPlayerCard(): any;
        showHandcards(str: any): any;
        showCards(cards: any, str: any): any;
        viewCards(str: any, cards: any): any;
        viewHandcards(target: any): any;
        canMoveCard(withatt: any): any;
        moveCard(): any;
        /**
         * 处理使用event.result
         * @param result 
         * @param event 
         */
        useResult(result: any, event: any): any;
        /**
         * 使用卡牌
         */
        useCard(): any;
        /**
         * 使用技能
         */
        useSkill(): any;
        /**
         * 抽牌
         */
        draw(): any;
        randomDiscard(): any;
        randomGain(): any;
        /**
         * 弃牌
         */
        discard(): any;
        respond(): any;
        swapHandcards(target: any, cards1: any, cards2: any): any;
        directequip(cards: any): any;
        directgain(cards: any): any;
        gainMultiple(targets: any, position: any): any;
        /**
         * 获得牌
         */
        gain(): any;
        /**
         * 当前玩家给牌给目标玩家
         * @param cards 要给的牌
         * @param target 目标玩家
         * @param visible 给出去的牌是否大家都可见 
         */
        give(cards: any|any[], target: any, visible: boolean): any;
        /**
         * 失去牌
         */
        lose(...args): any;
        /**
         * 收到伤害
         */
        damage(...args): any;
        /**
         * 回复体力
         */
        recover(...args): any;
        /**
         * 双将模式下的抽牌
         */
        doubleDraw(): any;
        /**
         * 失去体力
         * @param num 
         */
        loseHp(num: any): any;
        /**
         * 失去体力上限
         */
        loseMaxHp(): any;
        /**
         * 增加体力上限
         */
        gainMaxHp(): any;
        /**
         * 血量改变
         * @param num 
         * @param popup 
         */
        changeHp(num: any, popup: any): any;
        /**
         * 护甲改变
         * （不是三国杀常规模式下相关的）
         * @param num 改变的护甲数，默认为1
         * @param type 护甲类型
         */
        changeHujia(num?: number, type?: any): any;
        /**
         * 随机获取一个buff
         * （目前看起来和三国杀常规模式游戏没关系，不知为何在这）
         */
        getBuff(...num:number[]): any;
        /**
         * 随机获取一个debuff
         * （目前看起来和三国杀常规模式游戏没关系，不知为何在这）
         */
        getDebuff(...num:number[]): any;
        /**
         * 濒死阶段
         * @param reason 
         */
        dying(reason: any): any;
        /**
         * 死亡阶段
         * @param reason 
         */
        die(reason: any): any;
        /**
         * 复活
         * @param hp 
         * @param log 
         */
        revive(hp: number, log: boolean): any;
        /**
         * 是否是“混乱”状态
         * 即判断是否含有“mad”技能
         */
        isMad(): any;
        /**
         * 设置进入“混乱”状态
         * 即添加“mad”技能
         * 进入“混乱”状态的情况下，不能操作（自己的面板），player.isMine的结果也是false（不能确定当前玩家是自己）
         * @param end 
         */
        goMad(end: any): any;
        /**
         * 接触“混乱”状态
         * 即移除“mad”技能
         */
        unMad(): any;
        tempHide(): any;
        addExpose(num: any): any;
        equip(card: any, draw: any): any;
        /**
         * 添加判定牌
         * （当前玩家是被添加目标，移除源目标的添加牌的方法为靠get.owner，
         * 找到牌使用的玩家）
         * @param card 
         * @param cards 
         */
        addJudge(card: any, cards: any): any;
        /**
         * 判断该牌是否可以添加到判定区
         * 需要通过game.checkMod，检测通过“targetEnabled”锁定技；
         * （注：该方法貌似值用在类似闪电这种，可以长时间逗留的判定牌）
         * @param card 
         */
        canAddJudge(card: any): boolean;
        /**
         * 添加当前玩家的某判定牌到下一位玩家
         * @param card 
         */
        addJudgeNext(card: any): void;
        /**
         * 创建“judge”判定事件
         */
        judge(): any;
        turnOver(bool: any): any;
        out(skill: any): any;
        in(skill: any): any;
        link(bool: any): any;
        skip(name: any): any;
        wait(callback: any): any;
        unwait(result: any): any;
        logSkill(name: any, targets: any, nature: any, logv: any): any;
        unprompt(): any;
        prompt(str: any, nature: any): any;
        prompt_old(name2: any, className: any): any;
        popup(name: any, className: any): any;
        popup_old(name: any, className: any): any;
        _popup(): any;
        showTimer(time: any): any;
        hideTimer(): any;
        markSkill(name: any, info: any, card: any): any;
        unmarkSkill(name: any): any;
        markSkillCharacter(id: any, target: any, name: any, content: any): any;
        markCharacter(name: any, info: any, learn: any, learn2: any): any;
        mark(name: any, info: any, skill: any): any;
        unmark(name: any, info: any): any;
        addLink(): any;
        removeLink(): any;
        canUse(card: any, target: any, distance: any, includecard: any): any;
        hasUseTarget(card: any, distance: any, includecard: any): any;
        getUseValue(card: any, distance: any, includecard: any): any;
        addSubPlayer(cfg: any): any;
        removeSubPlayer(name: any): any;
        callSubPlayer(): any;
        toggleSubPlayer(): any;
        exitSubPlayer(remove: any): any;
        getSubPlayers(tag: any): any;
        /**
         * 增加技能触发
         * @param skill 技能名
         * @param hidden 
         * @param triggeronly 
         */
        addSkillTrigger(skill: string, hidden: boolean, triggeronly?: boolean): any;
        /**
         * 添加技能，同时打印日志与弹出显示添加的技能提示文字
         * @param skill 
         */
        addSkillLog(skill: any): any;
        /**
         * 玩家增加技能（获得技能）
         * @param skill 
         * @param checkConflict 
         * @param nobroadcast 
         */
        addSkill(skill: any, checkConflict: any, nobroadcast: any): any;
        addAdditionalSkill(skill: any, skills: any, keep: any): any;
        removeAdditionalSkill(skill: any, target: any): any;
        awakenSkill(skill: any, nounmark: any): any;
        restoreSkill(skill: any, nomark: any): any;
        disableSkill(skill: any, skills: any): any;
        enableSkill(skill: any): any;
        checkMarks(): any;
        addEquipTrigger(card: any): any;
        removeEquipTrigger(card: any): any;
        removeSkillTrigger(skill: any, triggeronly: any): any;
        /** 玩家失去技能/移除玩家的技能 */
        removeSkill(skill: any | any[], flag?: boolean): any;
        addTempSkill(skill: any, expire: any, checkConflict: any): any;
        attitudeTo(target: any): any;
        clearSkills(all: any): any;
        checkConflict(skill: any): any;
        /**
         * 获取当前玩家的保存的统计数据
         * 目前主要保存的值：
         * 伤害damage，受伤damaged，摸牌gain，出牌(不同名字的牌单独计数)card，杀敌kill，
         * 使用技能（不同名字的技能单独计数）skill，
         * 使用技能次数（不区分统一计数）allSkills
         * @param key 当轮的统计数据的key，若没有，则获取当轮的统计数据
         */
        getStat(key?: string): any;
        queue(time: any): any;
        getCardUsable(card: any, pure: any): any;
        getAttackRange(raw: any): any;
        getGlobalFrom(): any;
        getGlobalTo(): any;
        getHandcardLimit(): any;
        getEnemies(func: any): any;
        getFriends(func: any): any;
        isEnemyOf(): any;
        isFriendOf(player: any): any;
        isFriendsOf(player: any): any;
        isEnemiesOf(player: any): any;
        /**
         * 当前玩家是否还存活，存活则返回true
         */
        isAlive(): boolean;
        /**
         * 判断当前玩家是否死亡，死亡则返回true
         */
        isDead(): boolean;
        /**
         * 当前玩家是否在濒死阶段
         */
        isDying(): boolean;
        /**
         * 当前玩家是否已经受伤
         */
        isDamaged(): boolean;
        /**
         * 当前玩家是否满血
         */
        isHealthy(): boolean;
        /**
         * 判断当前玩家是否是全场最多血的
         * @param equal 是否包括相等
         */
        isMaxHp(equal: boolean): boolean;
        /**
         * 判断当前玩家是否是全场最少血的
         * @param equal 是否包括相等
         */
        isMinHp(equal: boolean): boolean;
        /**
         * 判断当前玩家（手牌+装备）的牌数是全场最多的
         * @param equal 是否包括相等
         */
        isMaxCard(equal: boolean): boolean;
        /**
         * 判断当前玩家（手牌+装备）的牌数是全场最少的
         * @param equal 是否包括相等
         */
        isMinCard(equal: boolean): boolean;
        /**
         * 判断当前玩家（手牌）的牌数是全场最多的
         * @param equal 是否包括相等
         */
        isMaxHandcard(equal: boolean): boolean;
        /**
         * 判断当前玩家（手牌）的牌数是全场最少的
         * @param equal 是否包括相等
         */
        isMinHandcard(equal: boolean): boolean;
        /**
         * 判断当前玩家（装备）的牌数是全场最多的
         * @param equal 是否包括相等
         */
        isMaxEquip(equal: boolean): boolean;
        /**
         * 判断当前玩家（装备）的牌数是全场最少的
         * @param equal 是否包括相等
         */
        isMinEquip(equal: boolean): boolean;
        isLinked(): any;
        isTurnedOver(): any;
        /**
         * 判定当前玩家是否退出（离开）
         */
        isOut(): any;
        isMin(distance: any): any;
        isIn(): any;
        /**
         * 当前player的class标记是否有“unseen”，“unseen2”
         * 应该是标记是否可见/隐藏的标记，后面继续研究
         * 据推测，应该是双将模式下，隐藏武将
         * @param num 
         */
        isUnseen(num: number): boolean;
        isUnderControl(self: any, me: any): any;
        isOnline(): any;
        isOnline2(): any;
        isOffline(): any;
        checkShow(skill: any, showonly: any): any;
        /**
         * 弃牌阶段是，计算需要弃置的牌
         * @param num 
         */
        needsToDiscard(num: any): any;
        distanceTo(target: any, method: any): any;
        distanceFrom(target: any, method: any): any;
        hasSkill(skill: any, arg2: any, arg3: any, arg4: any): any;
        hasStockSkill(skill: any, arg1: any, arg2: any, arg3: any): any;
        hasZhuSkill(skill: any, player: any): any;
        hasGlobalTag(tag: any, arg: any): any;
        hasSkillTag(tag: any, hidden: any, arg: any, globalskill: any): any;
        /**
         * 判断当前玩家是否有该名字的牌在判定区
         * @param name 
         */
        hasJudge(name: string): boolean;
        hasFriend(): any;
        hasUnknown(num: any): any;
        isUnknown(player: any): any;
        hasWuxie(): any;
        hasSha(respond: any, noauto: any): any;
        hasShan(): any;
        mayHaveShan(): any;
        hasCard(name: any, position: any): any;
        canEquip(name: any, replace: any): any;
        getEquip(name: any): any;
        /**
         * 获得一张指定名字的判定牌
         * 若该判定牌是视为牌，则是视为牌名字，否则就是该判定牌的名字；
         * 目前逻辑上，只能获得第一张符合条件的判定牌；
         * @param name 判定牌的名字
         */
        getJudge(name: string): any;

        //动画,UI相关的方法（前置$符）[不过也有些内部混如一些操作逻辑，没分离彻底]
        $drawAuto(cards: any, target: any): any;
        $draw(num: any, init: any, config: any): any;
        $compareMultiple(card1: any, targets: any, cards: any): any;
        $compare(card1: any, target: any, card2: any): any;
        $throw(card: any, time: any, init: any, nosource: any): any;
        $throwordered(): any;
        $throwordered1(node: any, nosource: any): any;
        $throwordered2(node: any, nosource: any): any;
        $throwxy(card: any, left: any, top: any): any;
        $throwxy2(card: any, left: any, top: any, trans: any, flipx: any, flipy: any): any;
        throwDice(num: any): any;
        $giveAuto(card: any, player: any): any;
        $give(card: any, player: any, log: any, init: any): any;
        $equip(card: any): any;
        $gain(card: any, log: any, init: any): any;
        $gain2(cards: any, log: any): any;
        $skill(name: any, type: any, color: any, avatar: any): any;
        $fire(): any;
        $thunder(): any;
        $rare2(): any;
        $epic2(): any;
        $legend2(): any;
        $rare(time: any): any;
        $epic(time: any): any;
        $legend(time: any): any;
        $coin(): any;
        $dust(): any;
        $recover(): any;
        $fullscreenpop(str: any, nature: any, avatar: any): any;
        $damagepop(num: any, nature: any, font: any): any;
        $damage(source: any): any;
        $die(): any;
        $dieflip(type: any): any;
        $phaseJudge(card: any): any;
    }
}

/** 简单的牌的结构 */
type cardSimpInfo = { 
    type, 
    subtype, 
    color, 
    suit, 
    number,
    /** 额外参数 */
    [key:string]:any
}