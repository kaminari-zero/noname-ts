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
    itemtype(obj):any;
    equipNum(card):any;
    objtype(obj):any;
    type(obj,method):any;
    type2(card):any;
    subtype(obj):any;
    equiptype(card):any;
    suit(card):any;
    color(card):any;
    number(card):any;
    nature(card):any;
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
    player():any;
    players(sort,dead,out):any;
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