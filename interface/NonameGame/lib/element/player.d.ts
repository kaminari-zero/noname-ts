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
        /** 判断'equip'+arg 的装备区是否可以使用 */
        isDisabled(arg: number): boolean;
        isEmpty(num: number|string): boolean;
        /**
         * 废除判定区
         * 使该玩家markSkill('_disableJudge')
         */
        disableJudge(): any;
        
        //原有函数
        //初始化相关函数
        /**
         * 玩家初始化
         */
        init(character: string, character2: string, skill: string): Player;

        //联机相关初始化
        initOL(name: any, character: any): any;
        uninitOL(): any;
        initRoom(info: any, info2: any): any;

        reinit(from: any, to: any, maxHp: any, online: any): any;
        uninit(): any;


        /** 获取offsetLeft（元素左侧距离参照元素左边界偏移量） */
        getLeft(): number;
        /** 获取offsetTop（元素上方距离参照元素上边界偏移量） */
        getTop(): number;
        /** 【动画】化生 */
        smoothAvatar(vice: any, video: any): any;
        /** 【动画】换位置 */
        changeSeat(position: any, video: any): any;

        /** 【联机】发送信息 */
        send(...args): Player;
        /** 【非联机】重新设置palyerid */
        getId(): Player;
        /** 【联机】聊天，发送聊天信息 */
        chat(str: string): void;
        /** 【动画】显示聊天信息 */
        say(str: string): void;
        /** 显示投降/放弃 */
        showGiveup(): void;
        /** 【联机】同步可使用技能 */
        applySkills(skills: string[]): void;
        /**
         *  【联机】获取玩家当前的状态信息
         *  注：主要是联机同步信息用，将信息打包成json结果（不过不知为什么把div打包了）
         */
        getState(): PlayerStateInfo;
        /** 【联机】设置nickname */
        setNickname(str: string): Player;

        /**
         * 设置虚拟形象/化身
         * @param name 设置前的原武将名
         * @param name2 化身后的武将名
         * @param video 是否记录进录像
         * @param fakeme 
         */
        setAvatar(name: string, name2: string, video?: boolean, fakeme?: boolean): void;
        /**
         * 设置虚拟形象/化身 队列列表
         * 注：按顺序取出队列的队头
         * @param name 设置前的原武将名
         * @param list 化生列表
         */
        setAvatarQueue(name: string, list: string[]): void;
        /**
         * 化身技能化身
         * @param skill 化身技能名
         * @param name 化身武将名
         */
        flashAvatar(skill: string, name: string): void;

        /**
         * 玩家信息更新
         * 注：主要更新血量，手牌数，标记
         */
        update(): Player;
        /**
         * 更新指定标记
         * @param i 指定标记名 
         * @param storage 指定同步记录（报错到录像记录里）
         */
        updateMark(i: string, storage?: string): Player;
        /**
         * 更新所有标记
         * @param connect 【联网】指定更新的标记名
         */
        updateMarks(connect?: string): void;
        /**
         * 获取指定区域卡牌/技能的数量
         * 注：和player.get一样，用得比较少，简单用法player.num(string,string)获取指定数量
         * @param arg1 若是“hej”任意组合，则是获取指定区域的牌；若为“s”则获取当前玩家包括全局技能的所有技能
         * @param arg2 过滤条件1
         * @param arg3 过滤条件2
         */
        num(arg1: string, arg2?: any, arg3?: any): number;
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
        getNext(): Player;
        /**
         * 获取当前玩家的上一个玩家（上家）
         * 注：若当前有skill为“undist”，则没有上一个玩家；
         * 若遍历，直到找到上一个没有“undist”玩家
         */
        getPrevious(): Player;
        /**
         * 获取当前回合卡牌使用次数
         * @param card 若存在，则获取指定卡牌使用次数；若不存在，则获取所有卡牌使用次数
         */
        countUsed(card?: {name:string}): number;
        /** 获取当前回合指定技能skill的使用次数 */
        countSkill(skill: string): number;
        /**
         * 获取当前使用武将的存储的技能
         * @param unowned 是否获取自己本身拥有的，如不获取（false）则删除不属于本身拥有的技能（正常下，武将隐藏时无法获得该武将技能）
         * @param unique 是否是获取单独技能，如不是（false）则删除（带有unique，temp，sub字段）技能
         * @param hidden 是否隐藏 true的话，还没显示的武将的技能也获取
         */
        getStockSkills(unowned?: boolean, unique?: boolean, hidden?: boolean): string[];
        /**
         * 获取当前玩家的牌(根据类型指定)
         * @param arg1 获取玩家身上牌的类型：h手牌，e装备牌，j判定牌，可以多个拼接
         * @param arg2 获取牌的详细过滤条件（若是字符串则是卡牌名，若是对象是个cardSimpInfo结构）
         */
        getCards(arg1: string, arg2: string | Object |OneParmFun<Card,boolean>): Card[];
        getDiscardableCards(player: any, arg1: any, arg2: any): any;
        getGainableCards(player: any, arg1: any, arg2: any): any;
        getGainableSkills(func: any): any;
        /**
         * 计算获取当前玩家的牌数(根据类型指定)
         * @param arg1 获取玩家身上牌的类型：h手牌，e装备牌，j判定牌，可以多个拼接
         * @param arg2 获取牌的详细过滤条件（若是字符串则是卡牌名，若是对象是个cardSimpInfo结构）
         */
        countCards(arg1: string, arg2: string | Object|OneParmFun<Card,boolean>): number;
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
        getSkills(arg2?: boolean, arg3?: boolean, arg4?: boolean): string[];
        /**
         * 获取技能/区域卡牌
         * 注：下面参数的意义，读跟前一个参数相关，略乱 
         * (虽然功能强大，但是项目内貌似已经有各种细分的实现方式，该方法并没有多少使用)
         * 使用例子：手牌player.get("h");装备牌player.get("e");判定牌player.get("j")
         * @param arg1 若为“hej”任意组合，在是获取指定区域的卡牌；若是“s”，则是获取技能
         * @param arg2 过滤条件1
         * @param arg3 过滤条件2
         * @param arg4 过滤条件3
         */
        get(arg1: string, arg2?: any, arg3?: any, arg4?: any): any;
        /** 添加录像记录，并更新所有标记信息 */
        syncStorage(skill: string): void;
        /** 【联机】通信同步技能 */
        syncSkills(): void;
        /** 【动画】播放当前玩家的成为焦点的动画（一个缩放动画） */
        playerfocus(time: number): Player;
        /** 设置当前显示的身份标签 */
        setIdentity(identity?: string): Player;


        //玩家操作事件（这些都是些关键操作，骚后仔细研究）
        /**
         * 玩家获得一个额外回合
         * （从“phase”阶段开始）
         * @param skill 技能名
         * @param insert 是否直接插入当前行动回合，若为true，将其置于其插入event.next队列队头，在下一次loop立即执行
         */
        insertPhase(skill: string, insert: boolean): Event;
        /**
         * 在当前回合中插入一个事件
         * @param name 事件名
         * @param content 设置的content
         * @param arg 设置事件的参数map
         */
        insertEvent(name: string, content: string|ContentFunc, arg: SMap<any>): Event;
        /**
         * 回合阶段
         * @param skill 
         */
        phase(skill: string,...args): Event;
        /**
         * 判断阶段
         */
        phaseJudge(...args): Event;
        /**
         * 抽牌阶段
         */
        phaseDraw(...args): Event;
        /**
         * 出牌阶段
         */
        phaseUse(...args): Event;
        /**
         * 弃牌阶段
         */
        phaseDiscard(...args): Event;
        /**
         * 选择使用
         * @param use 若只有一个参数，则采用map方式入参
         */
        chooseToUse(...args): Event;
        /**
         * 选择响应
         * @param args 
         */
        chooseToRespond(...args): Event;
        /**
         * 选择弃牌
         */
        chooseToDiscard(...args): Event;
        /**
         * 发起拼点，选择拼点。
         * 若多个目标，则content为：chooseToCompareMultiple
         * 只有一个目标，则content为：chooseToCompare
         * @param target 选择拼点的目标
         * @param check 设置ai的行动方法
         */
        chooseToCompare(target: Player|Player[], check?: OneParmFun<Card,any>): Event;
        /**
         * 选择获得一项技能
         * @param target 
         */
        chooseSkill(target: any): Event;
        /**
         * 选择一张牌进行操作(使用之/获得之/装备之... ...)
         * @param list 
         */
        discoverCard(list: string[]|Card[],...args): Event;
        /**
         * 创建选择卡牌按钮：
         * 发起“chooseButton”事件；
         */
        chooseCardButton(...args): Event;
        /**
         * 创建选择虚拟卡牌按钮（vcard）
         * 发起“chooseButton”事件；
         */
        chooseVCardButton(...args): Event;
        /**
         * 创建选择button，暂停等待选择结果
         */
        chooseButton(...args): Event;

        //联机专用选择按钮，选择卡牌
        chooseButtonOL(list: any, callback: any, ai: any): Event;
        chooseCardOL(...args): Event;

        /**
         * 发起选择卡牌
         */
        chooseCard(...args): Event;
        /**
         * 选择使用的目标
         * @param card 
         * @param prompt 
         * @param includecard 
         */
        chooseUseTarget(card: any, prompt: any, includecard: any,...args): Event;
        /**
         * 发起选择目标
         */
        chooseTarget(...args): Event;
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
         * 处理使用event.result,根据结果决定是否useCard或者useSkill
         * @param result 
         * @param event 
         */
        useResult(result: any, event: any): Event;
        /**
         * 使用卡牌
         */
        useCard(...args): Event;
        /**
         * 使用技能
         */
        useSkill(...args): Event;
        /**
         * 抽牌
         */
        draw(...args): Event;
        randomDiscard(): any;
        randomGain(): any;
        /**
         * 弃牌
         */
        discard(...args): Event;
        respond(): any;
        swapHandcards(target: any, cards1: any, cards2: any): any;
        directequip(cards: any): any;
        directgain(cards: any): any;
        gainMultiple(targets: any, position: any): any;
        /**
         * 获得牌
         */
        gain(...args): Event;
        /**
         * 当前玩家给牌给目标玩家
         * @param cards 要给的牌
         * @param target 目标玩家
         * @param visible 给出去的牌是否大家都可见 
         */
        give(cards: any|any[], target: any, visible: boolean): void;
        /**
         * 失去牌
         */
        lose(...args): Event;
        /**
         * 收到伤害
         */
        damage(...args): Event;
        /**
         * 回复体力
         */
        recover(...args): Event;
        /**
         * 双将模式下的抽牌
         */
        doubleDraw(...args): Event;
        /**
         * 失去体力
         * @param num 
         */
        loseHp(num: any,...args): Event;
        /**
         * 失去体力上限
         */
        loseMaxHp(...args): Event;
        /**
         * 增加体力上限
         */
        gainMaxHp(...args): Event;
        /**
         * 血量改变
         * @param num 
         * @param popup 
         */
        changeHp(num: any, popup: any,...args): Event;
        /**
         * 护甲改变
         * （不是三国杀常规模式下相关的）
         * @param num 改变的护甲数，默认为1
         * @param type 护甲类型
         */
        changeHujia(num?: number, type?: any,...args): Event;
        /**
         * 濒死阶段
         * @param reason 
         */
        dying(reason: any,...args): Event;
        /**
         * 死亡阶段
         * @param reason 
         */
        die(reason: any,...args): Event;
        /**
         * 复活
         * @param hp 
         * @param log 
         */
        revive(hp: number, log: boolean,...args): Event;

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
        getStat(key?: string): StatInfo;
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
        /**
         * 判断玩家是否有指定技能skill。
         * 默认判断玩家（除了玩家forbiddenSkills上的禁用技能）的：
         *  武将技能skills+附加技能additionalSkills+临时技能tempSkills
         * 注：使用了getSkills获取。
         * @param skill
         * @param arg2 若为true，获取技能附带隐藏技能hiddenSkills
         * @param arg3 若为true，获取技能附带装备技能；
         * @param arg4 若为true，获取技能经过game.filterSkills过滤后的技能
         */
        hasSkill(skill: string, arg2?: boolean, arg3?: boolean, arg4?: boolean): boolean;
        /**
         * 判断是否拥有玩家当前使用武将的存储的技能
         * @param skill
         * @param arg1 是否获取自己本身拥有的，如不获取（false）则删除不属于本身拥有的技能（正常下，武将隐藏时无法获得该武将技能）
         * @param arg2 是否是获取单独技能，如不是（false）则删除（带有unique，temp，sub字段）技能
         * @param arg3 是否隐藏 true的话，还没显示的武将的技能也获取
         */
        hasStockSkill(skill: string, arg1: boolean, arg2: boolean, arg3: boolean): boolean;
        /**
         * 判断当前玩家是否时该主公技直接拥有者
         * 若当前玩家是主，又有该技能，则当前玩家是该技能的原拥有者
         * @param skill 主公技名
         * @param player 在某些回调方法内调用时，传入该方法的回调传入的palyer，用于判断是否时执行该方法的当前玩家（实际还是有点疑惑）
         */
        hasZhuSkill(skill: string, player?: Player): boolean;
        /**
         * 是否有全局技能标签tag(ai相关)
         * @param tag 
         * @param arg 
         */
        hasGlobalTag(tag: string, arg?: any): boolean;
        /**
         * 判断是否有指定的技能标签tag(ai相关)
         * @param tag 技能标签
         * @param hidden 若为true，获取技能附带隐藏技能hiddenSkills
         * @param arg 
         * @param globalskill 是否是全局技能
         */
        hasSkillTag(tag: string, hidden?: boolean, arg?: any, globalskill?: boolean): boolean;
        /**
         * 判断当前玩家是否有该名字的牌在判定区
         * @param name 
         */
        hasJudge(name: string): boolean;
        hasFriend(): boolean;
        hasUnknown(num: any): boolean;
        isUnknown(player: any): boolean;
        hasWuxie(): boolean;
        hasSha(respond: any, noauto: any): boolean;
        hasShan(): boolean;
        mayHaveShan(): any;
        hasCard(name: any, position: any): boolean;
        /**
         * 判断是否能使用该装备牌
         * @param name 卡牌名
         * @param replace 应该是标记是否是替换
         */
        canEquip(name: string, replace?: boolean): boolean;
        /**
         * 获取装备区的指定装备牌
         * @param name 若是对象，需要带有name属性的对象；若是字符串，则是带有“equip”部分;若是number，则内部拼接结果“equip+name”
         */
        getEquip(name: string | { name: string }|number): Card;
        /**
         * 获得一张指定名字的判定牌
         * 若该判定牌是视为牌，则是视为牌名字，否则就是该判定牌的名字；
         * 目前逻辑上，只能获得第一张符合条件的判定牌；
         * @param name 判定牌的名字
         */
        getJudge(name: string): any;

        //获取buff，目前看起来和三国杀常规模式游戏没关系，不知为何在这
        /**
         * 随机获取一个buff
         */
        getBuff(...num:number[]): Player;
        /**
         * 随机获取一个debuff
         */
        getDebuff(...num:number[]): Player;

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

    //核心成员属性（暂时先暂时一部分比较核心常用的）
    interface Player extends HTMLDivElement{
        /** 武将名 */
        name:string;
        /** 武将名2 */
        name2?:string;
        name1?:string;
        /** 性别 */
        sex:string;
        /** 势力 */
        group:string;
        /** 当前血量 */
        hp:number;
        /** 最大血量（血量上限） */
        maxHp:number;
        /** 护甲 */
        hujia:number;

        /** 是否是单数血（双将模式下两血相加取一半模式，记录是否是单数的血量） */
        singleHp:boolean;

        nickname:string;
        avatar: string;
        version: string;

        /** 信息显示html节点 */
        node:{
            /** 武将名 */
            name:HTMLDivElement;
            /** 武将名2 */
            name2:HTMLDivElement;
            nameol:HTMLDivElement;
            /** 身份 */
            identity: HTMLDivElement;
            /** 血量 */
            hp: HTMLDivElement;
            /** 手牌数 */
            count: HTMLDivElement;
            /** 化身1 */
            avatar: HTMLDivElement;
            /** 化身2 */
            avatar2: HTMLDivElement;
            
            action: HTMLDivElement;
            /** 锁链（铁索连环） */
            chain: HTMLDivElement;
            /** 边框 */
            framebg: HTMLDivElement;
            /** 手牌区1 */
            handcards1: HTMLDivElement;
            /** 手牌区2（貌似不是明牌，不知有什么用） */
            handcards2: HTMLDivElement;
            /** 判定区 */
            judges: HTMLDivElement;
            /** 装备区 */
            equips: HTMLDivElement;
            link: HTMLDivElement;
            /** mark标记 */
            marks: HTMLDivElement;
            /** 翻面遮罩ui */
            turnedover: HTMLDivElement;
            /** 信息显示 */
            intro: HTMLDivElement;
        };

        /** 
         * player的dataset:储存数据
         * 其实质是html节点自带DOMStringMap，用于存储携带数据信息
         */
        dataset:{
            position:string;
        }

        /**
         * 跳过列表
         */
        skipList:string[];
        /**
         * 玩家的技能列表
         */
        skills:string[];
        /**
         * 已经初始化完成的技能
         * 主要添加时机：player.addSkill->player.addSkillTrigger
         */
        initedSkills:string[];
        /**
         * 玩家的附加技能
         * 主要添加时机：player.addAdditionalSkill
         */
        additionalSkills:SMap<string[]>;
        /**
         * 玩家丧失的技能
         * 主要添加时机：player.disableSkill
         */
        disabledSkills:SMap<string[]>;
        /**
         * 隐藏技能（不能用）
         * 主要添加时机：应该在各个玩法模式
         */
        hiddenSkills:string[];
        /**
         * 玩家已发动的觉醒技
         * 主要添加时机：玩家启动觉醒技后调用player.awakenedSkills
         */
        awakenedSkills:string[];
        /**
         * 禁用技能
         * (暂不清楚)
         */
        forbiddenSkills:SMap<string[]>;
        /**
         * 玩家的游戏统计：
         * 每回合“phasing”，在轮到玩家新一轮开始时，添加新的统计集合
         */
        stat:StatInfo[];
        /**
         * 保存玩家的临时技能的持续时机
         * 主要添加时机：player.addTempSkill
         */
        tempSkills:SMap<string>;
        /**
         * 玩家的缓存信息区
         * （信息过多，之后再研究）
         * 主要功能：用于标记技能，缓存一些技能的信息在玩家缓存信息里，方便整场游戏的调用
         */
        storage:SMap<any>;
        /**
         * 玩家的标记
         * 主要添加时机：player.markSkill
         */
        marks:SMap<any>;
        /**
         * 玩家的ai（日后研究）
         */
        ai:PlayerAIInfo;

        
    }
}

/** 简单的牌的结构 */
// type cardSimpInfo = { 
//     type, 
//     subtype, 
//     color, 
//     suit, 
//     number,
//     /** 额外参数 */
//     [key:string]:any
// }

/**
 * 玩家的统计数据结构
 */
type StatInfo = {
    /** 出牌(不同名字的牌单独计数) */
    card:SMap<number>;
    /** 使用技能（不同名字的技能单独计数） */
    skill:SMap<number>;
    
    /** 伤害 */
    damage:number;
    /** 受到伤害 */
    damaged:number;
    /** 摸排 */
    gain:number;
    /** 杀敌 */
    kill:number;

    /** 使用技能次数（不区分统一计数） */
    allSkills:number;

    /** 额外参数 */
    [key:string]:any
}

/**
 * 玩家的状态信息
 */
type PlayerStateInfo = {
    hp:number;
    maxHp:number;
    nickname:string;
    sex:string;
    name:string;
    name1:string;
    name2:string;
    handcards:any[];
    equips:any[];
    judges:any[];
    views:string[],
    position:number;
    hujia:number;
    side:number;
    identityShown:string;
    identityNode:[any,any];
    identity:string;
    dead:boolean;
    linked:boolean;
    turnedover:boolean;
}

/**
 * 玩家的ai
 * （具体内容日后讨论）
 */
type PlayerAIInfo = {}