declare var game:Game;
/**
 * 游戏主逻辑相关方法
 */
interface Game {
    /**
     * 卡牌弃置
     * 创建“cardsDiscard”事件，
     * 该事件逻辑是遍历cards，调用它们的discard舍弃；
     * @param cards 
     */
    cardsDiscard(cards:Card|Card[]):Event;

    //【联机】相关属性
    online:boolean;
    onlineID:string;
    onlineKey:string;

    /**
     * 显示历史信息UI
     * @param pause 是否显示“已暂停”
     */
    showHistory(pause?:boolean):void;
    /** 创建背景 */
    createBackground(src:string,blur:boolean):HTMLElement;
    /** 改变场地（特殊卡牌，特殊玩法的功能） */
    changeLand(url:string,player:Player):void;
    /** 检查文件更新 */
    checkFileList(updates,proceed):void;

    /** 【事件】置换手牌 */
    replaceHandcards(...args):void;
    /** 移除指定名字的卡牌（从lib.card.list，和ui.cardPile卡堆中移除） */
    removeCard(name:string):void;

    //联网相关
    randomMapOL(type):void;

    /** 关闭菜单 */
    closeMenu():void;
    closeConnectMenu():void;
    closePopped():void;


    //【联机】联机核心相关（重点）
    /** 向所有连接中的客户端发送通信（不包括自己），参数：第一个是回调方法，后面是对应方法的参数 */
    broadcast(...args):void;
    /** 向所有客户端通信（包括自己，发出通信后，自己执行一次函数和参数） */
    broadcastAll(...args):void;
    /** 同步state状态 */
    syncState():void;
    updateWaiting():void;
    /** 等待玩家加入 */
    waitForPlayer(func):void;
    /** 倒计时 */
    countDown(time:number,onEnd:Function):void;
    /** 选择计时 */
    countChoose(clear?):void;
    /** 停止选择计时 */
    stopCountChoose():void;
    /** 连接服务器 */
    connect(ip:string,callback:OneParmFun<boolean,void>):void;
    /** 发送信息到服务器中 */
    send(...args):void;
    /** 发送信息到指定ip */
    sendTo(id:string,message:any):void;
    /** 创建服务器（创建房间） */
    createServer():void;

    //播放声音
    /**
     * 【核心】播放声音。
     * 
     * 参数列表：（可以调整顺序，但是建议还是按照正常顺序）
     *  若参数有字符串类型，将按照“/字符串”拼接起来（可以多个字符串参数，按从左到右拼接），
     *      最终拼接：lib.assetURL+'audio'+参数拼接起来的路径+（'.mp3'/'.ogg'/''）；
     *      其中，若参数列表，第二个参数为“video”，则为录像中需要播音，一般不用考虑这个，可以无视；
     *  若参数是方法类型，则是声音类的onerror回调函数，在播放声音出现异常时回调。
     */
    playAudio(...args):HTMLAudioElement;
    /**
     * 播放技能声音
     * （主要解析技能的audio属性寻找对应文件播放）
     * @param skill 技能名
     * @param player 是否指定玩家的武将（需要技能有audioname）
     * @param directaudio 没什么用，无视，若技能的direct为true，可以让directaudio为true，跳过技能配置的判断
     */
    trySkillAudio(skill:string,player?:Player,directaudio?:boolean):void;
    /**
     * 播放技能的声音2
     * 注：播放失败时，会重复寻找播放名.ogg,播放名+序号.mp3,播放名+序号.ogg，都不行就没用声音
     * @param name 播放的名字
     * @param index 序号
     */
    playSkillAudio(name:string,index?:number):void;
    /**
     * 播放背景音
     * 注：主要播放的是配置里的背景音。
     */
    playBackgroundMusic():void;


    /**
     * 【核心】导入扩展
     * @param type 导入扩展的类型
     * @param content 导入扩展的内容
     */
    import(type: string, content: ExtensionFunc):void;
    /**
     * 【核心】读取扩展信息
     * @param obj 
     */
    loadExtension(obj: ExtensionFunc):void;
    /**
     * 导入扩展：（25693-25900）
     * 若不存在window.JSZip，则先加载JSZip，加载完后再重新执行一遍game.importExtension。
     * 若存在：后面主要都是生成zip的逻辑。
     * @param data 
     * @param finishLoad 
     * @param exportext 
     * @param pkg 
     */
    importExtension(data,finishLoad,exportext,pkg):void;
    /**
     * 导出：（25091-25932）
     * 如果当前是在移动端，则直接导出到移动端相关的文件夹内。
     * 若是网页版，则生成下载链接，点击下载配置。
     * @param textToWrite 
     * @param name 
     */
    export(textToWrite,name):void;

    //下载相关  用于更新信息
    multiDownload2(list,onsuccess,onerror,onfinish,process,dev):void;
    multiDownload(list,onsuccess,onerror,onfinish,process,dev):void;
    fetch(url,onload,onerror,onprogress):any;

    //录像相关
    playVideo(time,mode):void;
    playVideoContent(video):void;
    /** 录像的content方法 */
    videoContent:VideoContent;
    /**
     * 添加进录像里
     * 添加操作进lib.video中，当局游戏的操作，都会记录在里面（需要手动调用添加操作）；
     * 在game.over（游戏结束）中，将该lib.video设置到newvid.video中保存到.lib.videos；
     * （目前未知lib.video是在什么时候清理，或者就是这样保存所有的操作）
     * @param type 
     * @param player 
     * @param content 
     */
    addVideo(type,player,content):void;


    //重来
    reload():void;
    reload2():void;

    /** 退出游戏 */
    exit():void;
    /**
     * 打开链接
     * 若是安卓或者ios客户端，则用iframe或者内置流浪器打开；
     * h5端直接跳转该链接
     * @param url 
     */
    open(url):void;
    /** 再战 */
    reloadCurrent():void;

    //更新与更新相关动画逻辑
    update(func:Function):Function;
    unupdate(func:Function):void;
    stop():void;
    run():void;
    draw(func:Function):void;

    /** 震动 */
    vibrate(time:number):void;
    /** h5的prompt，用于显示可提示用户进行输入的对话框 */
    prompt():void;
    /** 提示框（调用了game.prompt） */
    alert(str:string):void;
    /** 需要打印的信息（打印的信息在 菜单->其他->命令 中打印） */
    print(...args):void;

    animate:Animate;


    /**
     * 画线
     * @param path 起始位置的信息
     * @param config 画线的配置,若是字符串，则是颜色：fire，thunder，green，drag
     */
    linexy(path:number[], config?: string| LineConfig,node?:HTMLDivElement):HTMLDivElement;
    /** 画线2  目前项目未发现使用 */
    _linexy(path:number[], config?: string| LineConfig,flag?:boolean):void;

    /** 【核心】创建游戏内触发事件 */
    createTrigger(name:string,skill:string,player:Player,event:GameEvent):void;
    /** 【核心】创建游戏内事件 */
    createEvent(name:string,trigger?:boolean,triggerevent?:GameEvent):GameEvent;

    //用于在onload->proceed2，解析lib.extensions中的数据：
    /** 添加武将（未使用） */
    addCharacter(name:string,info:any):void;
    /** 添加武将包 */
    addCharacterPack(pack:SMap<HeroData>,packagename?:string):void;
    /** 添加卡牌（未使用） */
    addCard(name:string,info:ExCardData,info2?:any):void;
    /** 添加卡包 */
    addCardPack(pack,packagename):void;
    /** 添加技能 */
    addSkill(name:string,info:ExSkillData,translate:string,description:string):void;
    /** 添加玩法mode */
    addMode(name:string,info:any,info2:any):void;

    /**
     * 添加全局技能
     * （该添加的技能，是游戏中添加，而不是配置添加）
     * @param skill 技能名
     * @param player 若有该参数，则添加到lib.skill.globalmap中，目前似乎没怎么使用lib.skill.globalmap，
     */
    addGlobalSkill(skill:string,player?:Player):boolean;
    /**
     * 移除全局技能
     * @param skill 技能名
     */
    removeGlobalSkill(skill):void;
    /** 重置所有玩家的技能 */
    resetSkills():void;
    removeExtension(extname,keepfile):any;
    addRecentCharacter():any;
    createCard(name,suit,number,nature):any;
    forceOver(bool,callback):any;
    /** 【核心】游戏结束 */
    over(result):any;
    /** 【核心】游戏循环（核心） */
    loop():any;
    /**
     * 暂停游戏循环
     */
    pause():any;
    /**
     * 暂停游戏循环2（ui相关）
     */
    pause2():any;
    /** 
     * 游戏继续
     * 设置pause为false，重新loop
     */
    resume():any;
     /** 
      * 游戏继续2
      * 设置pause2为false，重新loop
      */
    resume2():any;
    /**
     * 游戏延迟
     * 延迟结束后继续游戏(先暂停游戏循环loop，待x秒后resume继续游戏)
     * @param time 延迟时间（lib.config.duration）倍率
     * @param time2 额外增加的延时时间（不参与倍率计算）
     */
    delay(time?:number,time2?:number):any;
    /**
     * 游戏延迟2
     * 根据lib.config.game_speed（游戏的流程速度）：vslow，slow，fast，vfast，vvfast，调整游戏延迟时间的倍率；
     * @param time 延迟的时间
     * @param time2 额外增加的延时时间（不参与倍率计算）
     */
    delayx(time,time2):any;
    /**
     * 检测当前需要选中，并且在ui上做出选中处理
     * 主要是根据event的数据作为依据，若没有，则默认使用_status.event
     * @param event 
     */
    check(event?):any;
    /**
     * 取消选中
     * 其参数若为空，默认取消所有，若有指定的类型，则只取消该类型的选中
     * @param type 其类型可以card,target,button
     */
    uncheck(type:string):any;
    uncheck():any;
    swapSeat(player1,player2,prompt,behind,noanimate):any;
    swapPlayer(player,player2):any;
    swapControl(player):any;
    swapPlayerAuto(player):any;
    findNext(player):any;
    loadModeAsync(name,callback):any;
    switchMode(name,configx):any;
    loadMode(mode):any;
    loadPackage():any;
    phaseLoop(player):any;
    gameDraw(player,num):any;
    chooseCharacterDouble():any;
    updateRoundNumber():any;
    asyncDraw(players,num,drawDeck,bottom):any;
    asyncDrawAuto(players,num,drawDeck):any;
    finishSkill(i,sub):any;
    finishCards():any;
    /**
     * 检查是否有锁定技，并且执行锁定技，修改一些值和触发一些效果
     * @param args 
     */
    checkMod(...args):any;
    /**
     * 准备场地:
     * 基本流程：
     *  准备显示历史面板 game.showHistory(false)
     *  创建玩家 ui.create.players(num)
     *  创建自身 ui.create.me()
     *  同步创建卡牌 ui.create.cardsAsync()
     *  卡牌创建完成 game.finishCards()
     * @param num 玩家人数
     */
    prepareArena(num?:number):any;
    clearArena():any;
    clearConnect():any;
    log():any;
    logv(player,card,targets,event,forced,logvid):any;
    putDB(type,id,item,callback):any;
    getDB(type,id,callback):any;
    deleteDB(type,id,callback):any;
    save(key,value,mode):any;
    showChangeLog():any;
    showExtensionChangeLog(str,extname):any;
    /**
     * 保存配置：（31499-31556）
     * 若存在lib.db，则保存在指定数据库中，若没有则缓存在本地中。
     * 同时，也会保存到内存中，若选择保存本地，则保存在lib.config.mode_config；
     * 若不是则lib.config中。
     * @param key 保存的key
     * @param value 保存的value
     * @param local 是否保存在本地,当local是string时，则key将拼接成：key+='_mode_config_'+local
     * @param callback 执行完保存后的回调
     */
    saveConfig(key:string,value:any,local:boolean|string,callback:()=>void):any;
    saveConfigValue(key):any;
    saveExtensionConfig(extension,key,value):any;
    getExtensionConfig(extension,key):any;
    clearModeConfig(mode):any;
    addPlayer(position,character,character2):any;
    addFellow(position,character,animation):any;
    triggerEnter(player):any;
    restorePlayer(player):any;
    removePlayer(player):any;
    replacePlayer(player,character,character2):any;
    arrangePlayers():any;
    filterSkills(skills,player):any;
    /**
     * 解析技能所包含的技能组。
     * 即技能的group属性所记录的技能组
     * @param skills 
     */
    expandSkills(skills):any;
    css(style):any;
    /**
     * 检测当前是否有符合条件的玩家
     * @param func 过滤条件
     */
    hasPlayer(func:OneParmFun<Player,boolean>):boolean;
    /**
     * 计算符合条件的玩家数
     * @param func 回调函数，根据条件返回计数，若返回值为false则不计数，返回值为true默认+1，返回值为num，则增加num
     */
    countPlayer(func:(player)=>number|boolean):number;
    filterPlayer(func,list):any;
    findPlayer(func):any;
    findCards(func,all):any;
    countGroup():any;


    /** 正在游戏中的玩家 */
    players:Player[];
    /** 死亡玩家 */
    dead:Player[];
    /** 暂时未见使用 */
    imported:any[];
    /** 保存当前游戏玩家map，key为玩家id */
    playerMap:SMap<Player>;
    /** 回合数 */
    phaseNumber:number;
    /** 轮数（即从开始玩家开始轮流执行过一次回合后，算一轮） */
    roundNumber:number;
    /** 洗牌次数 */
    shuffleNumber:number;
}

/**
 * 录像相关content
 */
interface VideoContent {
    init(players):any;
    newcard(content):any;
    changeLand(player,url):any;
    destroyLand():any;
    playAudio(str):any;
    playSkillAudio(name):any;
    phaseChange(player):any;
    playerfocus(player,time):any;
    playerfocus2():any;
    identityText(player,str):any;
    identityColor(player,str):any;
    chessSwap(content):any;
    chessgainmod(player,num):any;
    moveTo(player,pos):any;
    addObstacle(pos):any;
    removeObstacle(pos):any;
    moveObstacle(pos):any;
    colorObstacle(pos):any;
    thrownhighlight1():any;
    thrownhighlight2():any;
    chessFocus(player):any;
    removeTreasure(pos):any;
    initobs(obs):any;
    stonePosition(content):any;
    bossSwap(player,name):any;
    stoneSwap(info):any;
    chess_tongshuai(player,content):any;
    chess_tongshuai_skill(player,content):any;
    smoothAvatar(player,vice):any;
    setAvatar(player,content):any;
    setAvatarQueue(player,content):any;
    addSubPlayer(player,content):any;
    arenaNumber(content):any;
    reinit(source,content):any;
    reinit2(source,name):any;
    reinit3(source,content):any;
    skill(player,content):any;
    addFellow(content):any;
    windowzoom1():any;
    windowzoom2():any;
    windowzoom3():any;
    windowzoom4():any;
    windowzoom5():any;
    updateActCount(player,content):any;
    setIdentity(player,identity):any;
    showCharacter(player,num):any;
    hidePlayer(player):any;
    deleteHandcards(player):any;
    hideCharacter(player,num):any;
    popup(player,info):any;
    log(str):any;
    draw(player,info):any;
    drawCard(player,info):any;
    throw(player,info):any;
    compare(player,info):any;
    compareMultiple(player,info):any;
    give(player,info):any;
    giveCard(player,info):any;
    gain(player,info):any;
    gainCard(player,info):any;
    gain2(player,cards):any;
    deletenode(player,cards,method):any;
    highlightnode(player,card):any;
    uiClear():any;
    judge1(player,content):any;
    centernode(content):any;
    judge2(videoId):any;
    unmarkname(player,name):any;
    unmark(player,name):any;
    flame(player,type):any;
    line(player,content):any;
    fullscreenpop(player,content):any;
    damagepop(player,content):any;
    damage(player,source):any;
    diex(player):any;
    tafangMe(player):any;
    deleteChessPlayer(player):any;
    addChessPlayer(content):any;
    die(player):any;
    revive(player):any;
    update(player,info):any;
    phaseJudge(player,card):any;
    directgain(player,cards):any;
    directequip(player,cards):any;
    gain12(player,cards12):any;
    equip(player,card):any;
    addJudge(player,content):any;
    markCharacter(player,content):any;
    changeMarkCharacter(player,content):any;
    mark(player,content):any;
    markSkill(player,content):any;
    unmarkSkill(player,name):any;
    storage(player,content):any;
    markId(player,content):any;
    unmarkId(player,content):any;
    lose(player,info):any;
    loseAfter(player):any;
    link(player,bool):any;
    turnOver(player,bool):any;
    showCards(player,info):any;
    cardDialog(content):any;
    changeSeat(player,info):any;
    dialogCapt(content):any;
    swapSeat(content):any;
    removeTafangPlayer():any;
    swapControl(player,hs):any;
    onSwapControl():any;
    swapPlayer(player,hs):any;
    over(str):any;
}

interface Animate{
    window(num):any;
    flame(x,y,duration,type):any;
}

type LineConfig = { 
    opacity?:any;
    color?:any;
    dashed?:any;
    duration?:any;
}