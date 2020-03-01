declare var game:Game;
/**
 * 游戏主逻辑相关方法
 */
interface Game {
    /**
     * 卡牌弃置
     * 创建“cardsDiscard”事件，
     * 该事件逻辑是遍历cards，调用它们的discard舍弃；
     * 
     * 苏版解析:将不属于任何人的卡牌置入弃牌堆
     * @param cards 
     */
    cardsDiscard(cards:Card|Card[]):Event;
    //新增方法 by2020-2-24
    /**
     * 将卡牌送至ui.special
     * 
     * 同样是创建“cardsDiscard”事件，触发“addCardToStorage”时机
     * @param cards 
     * @param bool 默认触发“addCardToStorage”时机，设置值false不触发
     */
    cardsGotoSpecial(cards:Card|Card[],bool?:boolean):Event;


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
    import(type: string, content: ExtensionFunc|ExCommonConfig):void;
    /**
     * 【核心】读取扩展信息
     * @param obj 
     */
    loadExtension(obj: ExtensionFunc|ExtensionInfoConfigData):void;
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
    /** 做些处理，调用game.download下载 */
    multiDownload2(list,onsuccess,onerror,onfinish,process,dev):void;
    /**
     * 下载列表内所有文件
     * 
     * 将文件列表分三分请求下载：
     * 核心下载调用multiDownload2 （game.download）
     * @param list 要下载的文件列表
     * @param onsuccess 下载成功
     * @param onerror 下载失败
     * @param onfinish 所有下载完成
     * @param process 处理将要下载的文件，返回将要使用的路径信息列表(game.download使用)
     * @param dev (game.download使用)
     */
    multiDownload(list,onsuccess,onerror,onfinish,process,dev):void;
    /**
     * 需要当前版本支持：
     * 
     * 主要分Android/ios的本地版FileTransfer（cordova.js），和pc版的nodejs环境
     * @param url 
     * @param folder 
     * @param onsuccess 
     * @param onerror 
     * @param dev 
     * @param onprogress 
     */
    download(url,folder,onsuccess,onerror,dev,onprogress);
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
    /**
     * 移除扩展
     * @param extname 
     * @param keepfile 
     */
    removeExtension(extname:string,keepfile?:boolean):void;
    /**
     * 添加最近使用武将
     * （让其在武将列表的排序上靠前）
     * @param args 任意武将名
     */
    addRecentCharacter(...args:string[]):void;
    /**
     * 创建一张卡牌
     * @param name 卡牌名,也可以是一个带有这4个属性的对象，若是则覆盖这4个属性的值，此时，第二个参数可以是“noclick”
     * @param suit 花色，若没有，先看卡牌信息中有不，否则随机；若值是“black”，则随机黑色的两种花色；若值是“red”，则随机红色的两种花色
     * @param number 数字，若没有，先看卡牌信息中有不，否则随机1~13；
     * @param nature 伤害属性，若没有，则获取卡牌信息的
     */
    createCard(name: string | CardBaseUIData, suit?:string, number?:number, nature?:string): Card;
    /**
     * 强制结束游戏。
     * 
     * 创建“finish_game”事件，设置content为“forceOver”。
     * @param bool 游戏结果:参考game.over的参数，额外：若值是“noover”，则不执行game.over
     * @param callback 
     */
    forceOver(bool?:boolean|string,callback?:Function):void;
    /**
     * 【核心】游戏结束
     * @param result 值：true战斗胜利，false战斗失败，undefined战斗结束(可以不填)，"平局"（可以直接填字符串）
     */
    over(result?:boolean|string):void;
    /** 【核心】游戏循环（核心） */
    loop():void;
    /**
     * 暂停游戏循环
     */
    pause():void;
    /**
     * 暂停游戏循环2（ui相关）
     */
    pause2():void;
    /** 
     * 游戏继续
     * 设置pause为false，重新loop
     */
    resume():void;
     /** 
      * 游戏继续2
      * 设置pause2为false，重新loop
      */
    resume2():void;
    /**
     * 游戏延迟
     * 延迟结束后继续游戏(先暂停游戏循环loop，待x秒后resume继续游戏)
     * @param time 延迟时间（lib.config.duration）倍率
     * @param time2 额外增加的延时时间（不参与倍率计算）
     */
    delay(time?:number,time2?:number):void;
    /**
     * 游戏延迟2
     * 根据lib.config.game_speed（游戏的流程速度）：vslow，slow，fast，vfast，vvfast，调整游戏延迟时间的倍率；
     * @param time 延迟的时间
     * @param time2 额外增加的延时时间（不参与倍率计算）
     */
    delayx(time?:number,time2?:number):void;
    /**
     * 检测当前需要选中，并且在ui上做出选中处理
     * 
     * 主要是根据event的数据作为依据，若没有，则默认使用_status.event
     * @param event 
     */
    check(event?:GameEvent):boolean;
    /**
     * 取消选中
     * 
     * 其参数若为空，默认取消所有相关的选中，若有指定的类型，则只取消该类型的选中
     * @param type 其类型可以"card","target","button"
     */
    uncheck(type?:string):void;

    //交换
    /**
     * 交换位置
     * @param player1 
     * @param player2 
     * @param prompt 是否打印日志
     * @param behind 是否移至player2座位之后
     * @param noanimate 是否有动画，true有动画
     */
    swapSeat(player1:Player,player2:Player,prompt?:boolean,behind?:boolean,noanimate?:boolean):void;
    /**
     * 交换玩家
     * @param player 
     * @param player2 
     */
    swapPlayer(player:Player,player2?:Player):void;
    /**
     * 交换control（控制权，控制UI）
     * @param player 
     */
    swapControl(player:Player):void;
    /**
     * 自动选择交换玩家的方式?
     * 
     * 实质上是，如果有game.modeSwapPlayer（mode玩法内自己实现）实现，则使用该方法，否则默认使用game.swapPlayer
     * @param player 
     */
    swapPlayerAuto(player:Player):void;

    /**
     * 获取目标玩家的下一个玩家（按住座位位置player.dataset.position）
     * @param player 
     */
    findNext(player:Player):Player;


    /**
     * 同步读取mode玩法
     * @param name 
     * @param callback 必须，加载完mode玩法js后回调执行
     */
    loadModeAsync(name:string,callback:OneParmFun<ExModeConfigData,void>):void;
    /**
     * 切换玩法mode
     * @param name 
     * @param configx 
     */
    switchMode(name:string,configx:SMap<any>):void;
    /**
     * 读取玩法mode。
     * 创建“loadMode”事件，加载指定mode的js。
     * @param mode 
     */
    loadMode(mode:string):void;
    /**
     * 读取包。
     * 创建“loadPackage”事件，加载读取武将包，卡包
     * @param args 传入多个“路径/文件名”字符串，按照装顺序依次加载
     */
    loadPackage(...args:string[]):void;

    /**
     * 【事件】开始指定玩家的“游戏回合”（phaseLoop）
     * @param player 
     */
    phaseLoop(player:Player):void;
    /**
     * 【事件】开始指定玩家的“游戏开始抽牌事件”（gameDraw）
     * @param player 默认自己
     * @param num 默认4
     */
    gameDraw(player?:Player,num?:number):void;
    /** 选择双将 */
    chooseCharacterDouble(...args):void;

    /** 【联机】更新 轮数 与剩余牌数 的ui显示*/
    updateRoundNumber():void;
    /**
     * 多个玩家同时抽牌
     * @param players 要抽牌的玩家列表
     * @param num 如果是一个number，则同时抽x张牌；若是数组，则对应每个玩家抽对应数组里的数目；若是方法，则根据玩家返回要抽的牌；
     * @param drawDeck 从牌堆中获取x张牌，需要玩法mode实现了player.getDeckCards
     * @param bottom 是否从牌堆底抽牌
     */
    asyncDraw(players:Player[],num:number|number[]|OneParmFun<Player,number>,drawDeck?:{drawDeck:number},bottom?:boolean):void;
    /** 多个玩家同时抽牌2（冗余方法，并没有什么卵用） */
    asyncDrawAuto(players:Player[],num:number|number[]|OneParmFun<Player,number>,drawDeck?:{drawDeck:number}):void;

    /**
     * 解析技能
     * @param i 
     * @param sub 是否是子技能，true则为是（如果是子技能，则不解析subSkill）
     */
    finishSkill(i:string,sub?:boolean):void;
    /**
     * 解析技能与卡牌（实质是解析lib.card，lib.skill）
     */
    finishCards():void;
    /**
     * 检查是否有锁定技，并且执行锁定技，修改一些值和触发一些效果
     * 
     * 其参数列表：
     *  第一个至倒数第3个参数：作为mod锁定技的参数，
     *      注：其中倒数第3个参数（不为对象时），一般作为默认值（mod返回结果为0，false，null...时），最后的结果（非undefined结果）
     *  倒数第2个参数：为mod锁定技名，通过它索引技能配置的mod锁定技
     *  最后一个参数：为触发mod锁定技的玩家，提供该玩家的技能，寻找它拥有的mod锁定技。
     *      注：按照目前代码逻辑来看，如果玩家拥有技能存在多个同名mod，将会触发最终符合条件的结果（也有可能是不断累积结果，看实现）
     * @param args 
     * @return 返回倒数第3个参数
     */
    checkMod(...args):any;
    /**
     * 准备游戏场景:
     * 基本流程：
     *  准备显示历史面板 game.showHistory(false)
     *  创建玩家 ui.create.players(num)
     *  创建自身 ui.create.me()
     *  同步创建卡牌 ui.create.cardsAsync()
     *  卡牌与技能信息解析 game.finishCards()
     * @param num 玩家人数
     */
    prepareArena(num?:number):void;
    /** 清除游戏场景 */
    clearArena():void;
    /** 【联机】清除连接 */
    clearConnect():any;
    /**
     * 打印日志（历史记录）
     * 
     * 参数列表类型：
     *  player/players,默认高亮为蓝色文本
     *  card/cards/{name:string},默认高亮为黄色文本
     *  object,即对象为普通对象（json结构），如果携带logvid，则设置logvid
     *  string:开头结尾有【】，则默认高亮为绿色文本；开头有“#b,#y,#g”，则显示蓝，黄，绿文本；否则直接显示该文本
     *  其余类型参数，直接拼接
     */
    log(...args):void;
    /** 【UI】根据logvid打印历史信息 */
    logv(player,card,targets,event,forced,logvid):HTMLDivElement;

    //保存到数据库中
    putDB(type,id,item,callback):void;
    getDB(type,id,callback):void;
    deleteDB(type,id,callback):void;
    save(key,value,mode):void;

    /** 显示更新信息 */
    showChangeLog():void;
    /** 显示扩展更新日志（没用上） */
    showExtensionChangeLog(str,extname):void;

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
    saveConfig(key:string,value:any,local:boolean|string,callback:()=>void):void;
    /** 保存配置（从lib.config读取key的值保存） */
    saveConfigValue(key:string):void;
    /** 保存扩展配置，key的结构为：“extension_扩展名_key” */
    saveExtensionConfig(extension:string,key:string,value:any):void;
    /** 获取扩展配置 */
    getExtensionConfig(extension:string,key:string):any;
    /** 清除mode玩法的配置 */
    clearModeConfig(mode):void;

    /**
     * 添加玩家
     * @param position 
     * @param character 
     * @param character2 
     */
    addPlayer(position:number,character?:string,character2?:string):Player;
    /**
     * 添加同伴
     * @param position 
     * @param character 
     * @param animation 
     */
    addFellow(position: number, character?: string, animation?: string): Player;
    /**
     * 【事件】进入游戏事件（触发：enterGame进入游戏阶段触发）
     * @param player 
     */
    triggerEnter(player):any;
    /**
     * 还原玩家
     * @param player 
     */
    restorePlayer(player: Player): Player;
    /**
     * 移除玩家
     * @param player 
     */
    removePlayer(player: Player):Player;
    /**
     * 替换玩家的武将
     * @param player 
     * @param character 
     * @param character2 
     */
    replacePlayer(player:Player,character?:string,character2?:string):Player;
    /** 重新排列玩家 */
    arrangePlayers():void;

    /**
     * 过滤玩家的技能（过滤disabledSkills）
     * @param skills 
     * @param player 
     */
    filterSkills(skills:string[],player:Player):string[];
    /**
     * 解析技能所包含的技能组。
     * 即技能的group属性所记录的技能组
     * @param skills 
     */
    expandSkills(skills): string[];

    /** 添加css (未使用)*/
    css(style:SMap<any>):void;

    //一些常用的过滤
    /**
     * 检测当前是否有符合条件的玩家（不包括out，指当前游戏内的玩家game.players）
     * @param func 过滤条件
     */
    hasPlayer(func?:OneParmFun<Player,boolean>):boolean;
    /**
     * 计算符合条件的玩家数
     * @param func 回调函数，根据条件返回计数，若返回值为false则不计数，返回值为true默认+1，返回值为num，则增加num
     */
    countPlayer(func?: OneParmFun<Player, boolean|number>):number;
    /**
     * 获取过滤后的玩家列表
     * @param func 返回true，则通过
     * @param list 可以传入一个玩家列表数组，继续添加结果到里面，默认生成一个新的空数组
     */
    filterPlayer(func?: OneParmFun<Player, boolean>,list?:Player[]):Player[];
    /**
     * 查找玩家
     * @param func 
     */
    findPlayer(func?: OneParmFun<Player, boolean>): Player;
    /**
     * 查找卡牌
     * @param func 
     * @param all 是否查找所有卡牌，若为true，则是查找所有；若为false或者默认不填，则是只查找自己当前使用卡堆里有的牌
     */
    findCards(func?: TwoParmFun<string,ExCardData, boolean>,all?:boolean):string[];
    /**
     * 获取当前游戏中存在的势力数（种类）
     */
    countGroup():number;

    //【1.9.98】
    /**
     * 获取本回合内发生过的 不属于任何角色的一些事件
     * (类似于player.getHistory())
     * 
     * 注：目前仅支持cardMove参数（cardsDiscard cardsGotoOrdering cardsGotoSpecial等涉及卡牌位置改变的事件）
     * @param key 要取出指定的事件的使用记录,若不填，则取出当前玩家回合的所有使用记录
     * @param filter 过滤条件,过滤某一事件记录类型中的指定事件
     * @returns 若两个参数都没有，则返回当前玩家回合的记录，若有key，则获取指定类型的记录
     */
    getGlobalHistory():GlobalHistoryData;
    getGlobalHistory(key?:keyof GlobalHistoryData,filter?:OneParmFun<GameEvent,boolean>):GameEvent[];

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

/** 全局事件的使用记录 */
type GlobalHistoryData = {
    /** （cardsDiscard cardsGotoOrdering cardsGotoSpecial等涉及卡牌位置改变的事件 */
    cardMove:GameEvent[],
    custom:GameEvent[],
}