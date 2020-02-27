declare namespace Lib.element {
    /**
     * 游戏事件
     */
    interface Event {
        /**
         * 完成事件。
         * 设置finished为true
         */
        finish(): void;
        /**
         * 取消事件执行，结束事件。
         * 执行untrigger清除掉指定触发,触发“当前事件名Cancelled”阶段
         */
        cancel(...args): void;
        /**
         * 指定跳转到某一步骤
         * @param step 
         */
        goto(step: number): void;
        /** 
         * 回退到上一步骤（可产生类似循环执行效果）
         */
        redo(): void;
        /**
         * 设置一个key到event里，用于保存，传递数据
         * 设置进event的值，还会另外保存在_set集合中，用于缓存，set的数据（有可能也用于标记）
         * @param key 若key不为字符串，且只有一个参数时，则执行批量set
         * @param value 
         */
        set(key: string | [string, any][], value?: any): Event;
        /**
         * 设置content（核心）
         * @param name 如果是方法类型，则使用lib.init.parse转成指定结构方法；如果是字符串，则是使用lib.element.content预定义好的content
         */
        setContent(name: Function|string): Event;
        /**
         * 获取事件的logvid。
         * 注：获取3代内的logvid，若3代内没有，则返回null。
         */
        getLogv(): string;

        /** 【联机】发送当前事件处理中的技能的信息 */
        send(): void;

        /**
         * 重置事件。
         * 
         * 主要是删除_cardChoice，_targetChoice，_skillChoice，重新再进行选择。
         */
        resume(): void;
        /**
         * 获取该事件的父节点。
         * 默认获取上一个父节点（核心）。
         * @param level 获取的父节点的深度（number），或者指定名字父节点（string，最多可以查找20代内）
         * @param forced 是否强制其获取不到父节点，返回null（不知有什么意义）
         */
        getParent(level?: number|string, forced?: boolean): Event;
        /**
         * 获取该事件的触发者。
         * 返回父节点的_trigger。
         */
        getTrigger(): Event;
        /**
         * 获取一个随机数（隶属于该事件中）
         * 注：若没有，则生成一个保存在_rand中（即当前事件获取一次随机数，需要保存下来）
         */
        getRand(): number;

        /** 创建一个当前事件的途中的插入事件（意义貌似不是很大） */
        insert(func: string|ContentFunc, map: SMap<any>): Event;
        /** 创建一个当前事件的after队列的事件，将其添加到当前事件的after队列 */
        insertAfter(func: string | ContentFunc, map: SMap<any>): Event;

        /**
         * 备份该事件的skill信息到_backup。
         * 注：删除已选择对象。
         * @param skill 
         */
        backup(skill: string): void;
        /**
         * 回复备份数据_backup。
         */
        restore(): void;
        /**
         * 判断当前event.player是不是自己，
         * 并且当前不处与自动状态中（托管）
         * 并且当前不处于isMad混乱状态（应该是某些模式，卡牌特有的效果）
         */
        isMine(): boolean;
        /**
         * 当前是否是联机中(联机模式)
         */
        isOnline(): boolean;
        /**
         * 判断当前事件（父节点）没有“_lianhuan”（连环）
         */
        notLink(): boolean;

        /**
         * 添加技能触发
         * @param skill 
         * @param player 
         */
        addTrigger(skill: string|string[], player: any): void;
        /**
         * 触发阶段，筛选阶段触发的技能。
         * 创建“arrangeTrigger”排列触发事件。
         * @param name 
         */
        trigger(name: string): void;
        /**
         * 删除某个阶段触发
         * @param all 
         * @param player 
         */
        untrigger(all: any, player: any): void;

    }

    //event的属性，不过大部分都是动态获取的
    export interface Event extends CheckEventData {
        //核心部分：
        /** 事件名 */
        name:string;
        /** 是否完成事件，一般通过event.finish()结束事件 */
        finished:boolean;
        /** 事件准备即将执行的事件队列 */
        next:Event[];
        /** 事件完成后准备执行的事件队列 */
        after:Event[];
        /**
         * 触发阶段数：
         * 开始前Before：0，
         * 时Begin：1，
         * 后End：2，
         * 结束后After：3，
         * 忽略Omitted：1&&finished完成
         */
        _triggered:number;
        /** 记录当前运行的步骤数 */
        step:number;

        //由于事件用于保存各种数据，在loop循环中传递，其各个属性，实质记录对象的意义都不大一样
        //而且，由于主要是用于携带数据，因此，有许多数据都记录不了，只能具体看源码找出来了
        /** 事件触发的玩家 */
        player:Player;
        /** 当前事件的源触发事件 */
        _trigger:Event;
        /** 源触发事件的名字（和直接用于判断源触发事件，按逻辑该值应该可以自定义，目前代码中该值是直接用源事件的名字） */
        triggername:string;

        //结果，是记录事件执行过程中产生的某些结果记录，这些结果，需要回馈给父节点事件的，是过程中产生的信息
        //事件的结果，为什么分成两种，后期继续观察代码考究
        result:any;
        /** 该参数应该时事件记录结果的核心返回值，上面那个，暂待观察 */
        _result:BaseResultData;

        //这些记录的基本都是事件自身带有的信息（例如你当前属于某个阶段的触发事件，此时你携带的触发信息）
        //因此，如果该事件是属于某事件的子事件，即next，after中的队列事件，此时，身为主触发会附带在_trigger中
        //表示：因为触发该事件，而产生了next中的操作，其触发源为_trigger
        /** 记录触发源玩家 */
        source:Player;
        /** 记录指定的目标玩家 */
        target:Player;
        /** 记录多个指定的目标玩家 */
        targets:Player[];
        /** 记录牌 */
        card:Card;
        /** 记录多张牌 */
        cards:Card[];
        /** 记录需要处理的skill技能 */
        skill:string;
        /** 是否强制性，自动标记 */
        forced:boolean;
        /** 记录一个number类型的数字，每个事件代表都不一样 */
        num:number;

        /** 基础伤害，最初是在userCard事件中，从卡牌配置的信息获得，作为某张卡牌造成的伤害数值在事件中传递 */
        baseDamage:number;

        /** 判定相关结果 */
        judgeResult:JudgeResultData;

        /** 是否强制结束出牌阶段，同时也可以让result.bool为false跳过 */
        skipped:boolean;

        /** 一些额外操作，目前看到最常用在game.check中 */
        custom:{
            add:SMap<any>,
			replace:SMap<any>
        }
        
        _aiexclude:any;
        fakeforce:any;
        
        /** 选中的卡牌 */
        _cardChoice:Card[];
        /** 选中的目标 */
        _targetChoice:Player[];
        /** 选中的技能 */
        _skillChoice:string[];

        //【1.9.98】在lose事件里 可以直接通过event.hs/es/js 来判断一张卡牌在此次失去事件中原先所处的区域
        /** 手牌区失去的牌 */
        hs:Card[];
        /** 装备区失去的牌 */
        es:Card[];
        /** 判定区失去的牌 */
        js:Card[];

        /** 这是gain事件中 如果获得其他角色的卡牌时 其他角色失去卡牌的事件(只在gain事件链中使用) */
        relatedLose:GameEvent;

        /** 判定的名字 ,在judge事件中，记录了判定的名字*/
        judgestr:string;

        //game.check 一些核心过滤参数，目前都额外存放在CheckEventData定义中
        // filterButton:any;
        // selectButton:any;
        // filterTarget:any;
        // selectTarget:any;
        // filterCard:any;
        // selectCard:any;
        // position:any;
        // complexSelect:any;
        // complexCard:any;
        // complexTarget:any;
        // ai1:any;
        // ai2:any;
    }

}