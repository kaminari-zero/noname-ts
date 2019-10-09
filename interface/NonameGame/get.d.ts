declare var get:Get;
interface Get {
    infoHp(hp):any;
    infoMaxHp(hp):any;
    is:Is,
    /**
     * 获取（牌堆底部的）牌
     * @param num 
     */
    bottomCards(num):any;
    discarded():any;
    cardOffset():any;
    colorspan(str):any;
    /**
     * 设置事件的prompt
     * @param next 
     * @param str 
     */
    evtprompt(next,str):any;
    /**
     * 自动视为指定牌。
     * 若指定视为牌，有autoViewAs，则返回重新整合后的视为牌;
     * 若不是，则返回card的副本，将card.cards设为cards的副本
     * @param card 指定视为牌
     * @param cards 待操作的卡牌集合
     */
    autoViewAs(card,cards):any;
    max(list,func,type):any;
    min(list,func,type):any;
    character(name,num):any;
    characterIntro(name):any;
    groupnature(group,method):any;
    sgn(num):any;
    rand(num,num2):any;
    sort(arr,method):any;
    sortSeat(arr,target):any;
    zip(callback):any;
    /**
     * 计算当前延迟x秒
     * 根据lib.config.game_speed，会获得当前模式的延迟值
     * @param num 延迟的时间，默认为1
     * @param max 最大值，默认为Infinity
     */
    delayx(num?:number,max?:number):number;
    prompt(skill,target,player):any;
    prompt2(skill,target,player):any;
    url(master):any;
    round(num,f):any;
    playerNumber():any;
    benchmark(func1,func2,iteration,arg):any;
    stringify(obj,level):any;
    /**
     * 深复制对象
     * （对象结构过于复杂，可能会很慢）
     * @param obj 
     */
    copy(obj):any;
    inpilefull(type):any;
    inpile(type,filter):any;
    inpile2(type):any;
    typeCard(type,filter):any;
    libCard(filter):any;
    ip():any;
    modetrans(config,server):any;
    charactersOL(func):any;
    trimip(str):any;
    mode():any;
    idDialog(id):any;
    arenaState():any;
    skillState(player):any;
    id():any;
    zhu(player,skill,unseen):any;
    /**
     * 获取指定玩法模式的指定config配置项
     * @param item config的配置项
     * @param mode 玩法模式，默认是当前的玩法模式：lib.config.mode
     */
    config(item:string,mode?:string):any;
    coinCoeff(list):any;
    rank(name,num):any;
    skillRank(skill,type,grouped):any;
    targetsInfo(targets):any;
    infoTargets(info):any;
    cardInfo(card):any;
    cardsInfo(cards):any;
    infoCard(info):any;
    infoCards(info):any;
    cardInfoOL(card):any;
    infoCardOL(info):any;
    cardsInfoOL(cards):any;
    infoCardsOL(info):any;
    playerInfoOL(player):any;
    infoPlayerOL(info):any;
    playersInfoOL(players):any;
    infoPlayersOL(info):any;
    funcInfoOL(func):any;
    infoFuncOL(info):any;
    stringifiedResult(item,level):any;
    parsedResult(item):any;
    verticalStr(str,sp):any;
    numStr(num,method):any;
    rawName(str):any;
    rawName2(str):any;
    slimName(str):any;
    time():any;
    utc():any;
    evtDistance(e1,e2):any;
    xyDistance(from,to):any;
    /**
     * 获取对象归属类型：
     * 若对象是字符串，长度<=3,其中包含“h,j,e”中一个，则返回类型:position（位置）；
     * 若对象是字符串，其值属于lib.nature，则返回类型：nature（伤害属性）；
     * 若对象是集合，其集合所有元素都是“player”类型，则返回类型：players；（player列表）
     * 若对象是集合，其集合所有元素都是“card”类型，则返回类型：cards；（card列表）
     * 若对象是集合，其长度为2，即[num1,num2]，其num1<=num2，则返回类型：select（选择范围）；
     * 若对象是集合，其长度为4都是number，即[num1,num2,num3,num4]，则返回类型：divposition（设置div的位置，采用calc()方法运算）；
     * 若对象是类型是“div”，则：
     *      若class列表有“button”，则返回类型：button（按钮）；
     *      若class列表有“card”，则返回类型：card（卡牌）；
     *      若class列表有“player”，则返回类型：player（玩家，玩家ui）；
     *      若class列表有“dialog”，则返回类型：dialog（对话框，包括提示，弹出框...）；
     * @param obj 
     */
    itemtype(obj:any):any;
    /**
     * 获取装备的类型（1-5）
     * 逻辑和get.equiptype基本一致（算是冗余的方法）
     * @param card 
     */
    equipNum(card):number;
    /**
     * 获取对象的类型：
     * 当前可分辨类型：array，object，div，table，tr，td
     * @param obj 
     */
    objtype(obj:any):string;
    /**
     * 获取卡牌的类型
     * 返回卡牌的type属性，
     * 基本有：basic（基本牌），trick（锦囊牌），delay（延时锦囊牌），equip（装备牌），chess（战棋模式的战棋）
     * @param obj 可以是卡牌的名字，也可以是带有name属性的对象
     * @param method 若传入“trick”，则type为“delay”（延时锦囊牌），也视为“锦囊牌”，结果返回“trick”
     */
    type(obj:string|object,method?:string):string;
    /**
     * 获取卡牌的类型2（上面方法的简略版，把延时锦囊“delay”，视为锦囊“trick”返回）
     * @param card 可以是卡牌的名字，也可以是带有name属性的对象
     */
    type2(card:string|object):string;
    /**
     * 获取卡牌第二类型（子类型）
     * 返回卡牌的subtype属性
     * 例:equip装备的子类型：equip1武器，equip2防具，equip3防御马，equip4进攻马，equip5宝物（常规外的额外装备）
     * @param obj 可以是卡牌的名字，也可以是带有name属性的对象
     */
    subtype(obj:string|object):string;
    /**
     * 获取装备的类型（1-5）
     * 当前类型分别为：1武器，2防具，3防御马，4进攻马，5宝物（常规外的额外装备）
     * @param card 可以是卡牌的名字，也可以是带有name属性的对象
     */
    equiptype(card:string|object):number;
    /**
     * 获取卡牌的花色suit
     * 
     * 花色：spade黑桃，heart红桃，club梅花，diamond方块，none
     * 若该卡牌是玩家拥有的，则检查mod锁定技存在（game.checkMod），获取返回的花色；否则，获取该卡牌花色suit；
     * 特殊情况：
     * 若card的类型是“cards”，若所有卡牌花色都相同，则返回第一张的卡牌花色suit，若有一张不同，则返回“none”；
     * 若card有cards属性，该card.cards的类型为“cards”，且该card不是“muniu”，则按上面“cards”方式返回花色；
     * @param card 
     */
    suit(card):string;
    /**
     * 获取卡牌颜色color
     * 卡牌颜色：black黑色，red红色，none
     * 其逻辑与get.suit一致，实质也是调用get.suit
     * @param card 
     */
    color(card):string;
    /**
     * 获取卡牌的数字number
     * @param card 
     */
    number(card):number;
    /**
     * 获取卡牌的nature（伤害属性）
     * nature：fire火，thunder雷，poison毒
     * @param card 
     */
    nature(card):string;
    /**
     * 获取（牌堆顶的）牌
     * @param num 
     */
    cards(num):any;
    /**
     * 获取卡牌的judge（判定牌的判断条件）
     * 若该卡牌有viewAs（视为牌），则返回视为牌的judge；
     * 否则，直接返回该牌的judge
     * @param card 
     */
    judge(card):any;
    /**
     * 获得玩家from到to之间的距离
     * 具体距离类型，到时详细研究代码分析：
     * raw，原始距离；
     * pure，直线距离；
     * absolute，绝对距离；
     * attack，攻击距离；
     * 除以上情况，其他值（默认）为防御距离
     * @param from 源玩家
     * @param to 目标玩家
     * @param method 获取距离的类型：raw，pure，absolute，attack，默认防御距离
     */
    distance(from,to,method?:string):number;
    info(item):any;
    /**
     * 获取当前可选择的目标数，范围。
     * 若没有默认返回[1,1]
     * @param select 
     * @return [number,number] 数组第一个目标数（可选目标数），数组第二个值为进攻范围，若为-1，则无距离限制
     */
    select(select):any;
    /**
     * 获得卡牌
     * 根据
     * _status.event.skill存在， 当前事件中的技能若有viewAs，则将选中牌；
     * _status.event._get_card存在，则返回_status.event._get_card；
     * ui.selected.cards[0] ，若original为true，则直接返回该第一张牌；若不是则返回处理过cards；
     * @param original 
     */
    card(original?:boolean):any;
    /**
     * 获取当前event的玩家player
     * 返回_status.event.player （算是个无用的方法）
     */
    player():any;
    /**
     * 获取当前游戏内所有玩家
     * 
     * 根据以下参数条件剔除添加玩家
     * @param sort 若为false，则不排序；若为function，则用该function排序，若不是则默认lib.sort.seat排序
     * @param dead 是否获取死亡的角色（默认只获取正在游戏中角色），true则加入死亡角色
     * @param out 是否剔除已经退出游戏的角色（isOut），true则保留，false则剔除
     */
    players(sort:Function|boolean,dead:boolean,out?:boolean):any;
    /**
     * 获取卡牌所在的位置：
     * 位置：e装备区，j判定区，h手牌，c抽牌区，d弃牌区，s特殊区（special）
     * @param card 
     */
    position(card):any;
    skillTranslation(str,player):any;
    skillInfoTranslation(name):any;
    translation(str,arg):any;
    /**
     * 将阿拉伯数字转成中文数字显示
     * @param num 原数字
     * @param two 是否显示“二”，还是显示“两”
     */
    cnNumber(num:number,two?:boolean):any;
    selectableButtons(sort):any;
    selectableCards(sort):any;
    skills():any;
    gainableSkills(func,player):any;
    gainableSkillsName(name, func):any;
    gainableCharacters(func):any;
    selectableTargets(sort):any;
    /**
     * 返回一个过滤用高阶方法。
     * 传入一个过滤列表，生成一个以该过滤列表为基准的过滤函数，该函数传入一个值，判断该值是否处于该列表内，属于则返回false，没有则返回true；
     * @param filter 传入一个过滤列表
     * @param i 
     */
    filter(filter,i):any;
    cardCount(card,player):any;
    skillCount(skill,player):any;
    /**
     * 获取该card的所有者（拥有者）
     * @param card 指定card
     * @param method 目前没什么太大用途，值为“judge”排除掉判定的牌
     */
    owner(card,method?):any;
    /**
     * 是否当前没有可选择的目标
     */
    noSelected():any;
    population(identity):any;
    totalPopulation(identity):any;
    tag(item,tag,item2):any;
    sortCard(sort):any;
    difficulty():any;
    cardPile(name,create):any;
    cardPile2(name):any;
    discardPile(name):any;
    aiStrategy():any;
    skillintro(name,learn,learn2):any;
    intro(name):any;
    storageintro(type,content,player,dialog,skill):any;
    nodeintro(node,simple,evt):any;
    linkintro(dialog,content,player):any;
    groups():any;
    types():any;
    links(buttons):any;
    threaten(target,player,hp):any;
    condition(player):any;
    attitude(from,to):any;
    sgnAttitude():any;
    useful(card):any;
    unuseful(card):any;
    unuseful2(card):any;
    unuseful3(card):any;
    value(card,player,method):any;
    equipResult(player,target,name):any;
    equipValue(card,player):any;
    equipValueNumber(card):any;
    disvalue(card,player):any;
    disvalue2(card,player):any;
    skillthreaten(skill,player,target):any;
    order(item):any;
    result(item,skill):any;
    effect(target,card,player,player2):any;
    damageEffect(target,player,viewer,nature):any;
    recoverEffect(target,player,viewer):any;
    buttonValue(button):any;
    attitude2(to):any;
}

interface Is {
    converted(event): any;
    safari(): any;
    freePosition(cards): any;
    nomenu(name, item): any;
    altered(skill): any;
    node(obj): any;
    div(obj): any;
    map(obj): any;
    set(obj): any;
    object(obj): any;
    singleSelect(func): any;
    jun(name): any;
    versus(): any;
    mobileMe(player): any;
    newLayout(): any;
    phoneLayout(): any;
    singleHandcard(): any;
    linked2(player): any;
    empty(obj): any;
    pos(str): any;
    locked(skill): any;
}