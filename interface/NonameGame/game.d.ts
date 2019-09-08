declare var game:Game;
interface Game {
    cardsDiscard(cards):any;
    online:false;
    onlineID:null;
    onlineKey:null;
    showHistory(pause):any;
    createBackground(src,blur):any;
    changeLand(url,player):any;
    checkFileList(updates,proceed):any;
    replaceHandcards():any;
    removeCard(name):any;
    randomMapOL(type):any;
    closeMenu():any;
    closeConnectMenu():any;
    closePopped():any;
    broadcast():any;
    broadcastAll():any;
    syncState():any;
    updateWaiting():any;
    waitForPlayer(func):any;
    countDown(time,onEnd):any;
    countChoose(clear):any;
    stopCountChoose():any;
    connect(ip,callback):any;
    send():any;
    sendTo(id,message):any;
    createServer():any;
    playAudio():any;
    trySkillAudio(skill,player,directaudio):any;
    playSkillAudio(name,index):any;
    playBackgroundMusic():any;
    /**
     * 导入扩展
     * @param type 导入扩展的类型
     * @param content 导入扩展的内容
     */
    import(type: string, content: ExtensionFunc):any;
    /**
     * 读取扩展信息
     * @param obj 
     */
    loadExtension(obj: ExtensionFunc):any;
    importExtension(data,finishLoad,exportext,pkg):any;
    export(textToWrite,name):any;
    multiDownload2(list,onsuccess,onerror,onfinish,process,dev):any;
    multiDownload(list,onsuccess,onerror,onfinish,process,dev):any;
    fetch(url,onload,onerror,onprogress):any;
    playVideo(time,mode):any;
    playVideoContent(video):any;
    videoContent:VideoContent;
    reload():any;
    reload2():any;
    exit():any;
    open(url):any;
    reloadCurrent():any;
    update(func):any;
    unupdate(func):any;
    stop():any;
    run():any;
    addVideo(type,player,content):any;
    draw(func):any;
    vibrate(time):any;
    prompt():any;
    alert(str):any;
    print():any;
    animate:Animate;
    linexy(path):any;
    _linexy(path):any;
    /** 创建游戏内触发事件 */
    createTrigger(name,skill,player,event):any;
    /** 创建游戏内事件 */
    createEvent(name,trigger,triggerevent):any;
    addCharacter(name,info):any;
    addCharacterPack(pack,packagename):any;
    addCard(name,info,info2):any;
    addCardPack(pack,packagename):any;
    addSkill(name,info,translate,description):any;
    addMode(name,info,info2):any;
    addGlobalSkill(skill,player):any;
    removeGlobalSkill(skill):any;
    resetSkills():any;
    removeExtension(extname,keepfile):any;
    addRecentCharacter():any;
    createCard(name,suit,number,nature):any;
    forceOver(bool,callback):any;
    over(result):any;
    /** 游戏循环 */
    loop():any;
    pause():any;
    pause2():any;
    resume():any;
    resume2():any;
    delay(time,time2):any;
    delayx(time,time2):any;
    check(event):any;
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
    checkMod(...args):any;
    prepareArena(num):any;
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
    saveConfig(key,value,local,callback):any;
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
    expandSkills(skills):any;
    css(style):any;
    hasPlayer(func):any;
    countPlayer(func):any;
    filterPlayer(func,list):any;
    findPlayer(func):any;
    findCards(func,all):any;
    countGroup():any;
    players:[];
    dead:[];
    imported:[];
    playerMap:{};
    phaseNumber:0;
    roundNumber:0;
    shuffleNumber:0;
}

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

/** 扩展回调方法 */
type ExtensionFunc = (lib: Lib, game: Game, ui: UI, get: Get, ai: AI, _status: Status) => ExtensionInfoData;

type ExtensionInfoData = {
    /** 扩展名 */
    name:string;
    /** 是否可编辑该扩展（需要打开显示制作扩展） */
    editable:boolean;

    element:any;

    /** 该扩展菜单的扩展 */
    config: SMap<SelectConfigData>;
    skill:SMap<any>;
    card:SMap<any>;
    files:SMap<any[]>;
    /** 该扩展使用的常量字符串 */
    translate:SMap<string>;
    /** 帮助（说明） */
    help:SMap<string>;
    
    package:any;
    game:any;
    
    content(config, pack):void;
    precontent(data):any;
    
    init():void;
    video():void,
    arenaReady():void;
    /** 删除该扩展后调用 */
    onremove():void;
}