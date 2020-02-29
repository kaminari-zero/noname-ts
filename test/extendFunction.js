//收集别人的扩展方法

/**
 * 改变回合内阶段顺序（重点，正好需要这样的实现...）
 * player.changePhase(...phaseName)
 * 另外可加true使其回合一直这样
 * 
 * 需要重置回来：
 * delete player.changePhaseAllthetime;
    player.phase=player.truephase;
    player.unmarkSkill('_changePhase');
 
 * 注：
 * 其参数的阶段名，必须有翻译，无翻译，则自己自行lib.translate.xxxx = "xxxx阶段名"，用于显示提示标记；
 * 不写的阶段默认跳过（即只执行参数里的阶段）
 * 
 * 方法里默认的几个直接可用阶段（已设置好翻译）：
    phaseZhunbei：准备阶段
    phaseJudge：判定阶段
    phaseDraw：摸牌阶段
    phaseUse：出牌阶段
    phaseDiscard：弃牌阶段
    phaseJieshu：结束阶段
 * 
 * 例子：
 * player.changePhase("draw","damage","goMad");
    lib.translate.draw="摸牌";
    lib.translate.damage="受到伤害";
    lib.translate.goMad="发疯";
    玩家在回合内依次进行以下事件：
    摸一张牌，受到一点伤害，发疯
 */
lib.element.player.changePhase = function (...name) {
    if (!name.length) return;
    if (!this.name && !this.name) return;
    if (name.contains(true)) {
        this.changePhaseAllthetime = true;
        name.remove(true);
    }
    if (!this.truephase) this.truephase = this.phase;
    this.phase = function (skill) {
        var next = game.createEvent('phase');
        next.player = this;
        this.changePhaseorder = name;
        this.changePhaseordermarks = name.slice(0);
        this.markSkill('_changePhase');
        if (get.mode() == "guozhan") next.setContent(this.name1 + 'changePhase');
        else next.setContent(this.name + 'changePhase');
        if (!_status.roundStart) {
            _status.roundStart = this;
        }
        if (skill) {
            next.skill = skill;
        }
        return next;
    }
    if (get.mode() == "guozhan") var b = this.name1;
    else var b = this.name;
    lib.element.content[b + 'changePhase'] = function () {
        "step 0"
        var name = player.changePhaseorder[0];
        if (!player[name]) event.goto(2);
        player[name]();
        "step 1"
        if (player.changePhaseorder[0] == "phaseDraw") {
            if (!player.noPhaseDelay) {
                if (player == game.me) {
                    game.delay();
                }
                else {
                    game.delayx();
                }
            }
        }
        if (player.changePhaseorder[0] == "phaseUse") {
            game.broadcastAll(function () {
                if (ui.tempnowuxie) {
                    ui.tempnowuxie.close();
                    delete ui.tempnowuxie;
                }
            });
        }
        if (player.changePhaseorder[0] == "phaseDiscard") {
            if (!player.noPhaseDelay) game.delayx();
        }
        "step 2"
        player.changePhaseorder.splice(0, 1);
        if (player.changePhaseorder.length <= 0) {
            delete player.using;
            delete player._noSkill;
            if (!player.changePhaseAllthetime) {
                player.phase = player.truephase;
                player.unmarkSkill('_changePhase');
            }
            return;
        }
        else event.goto(0);
    }

}
//配合回合顺序变换的全局技能
lib.translate.phaseZhunbei = "准备阶段";
lib.translate.phaseJudge = "判定阶段";
lib.translate.phaseDraw = "摸牌阶段";
lib.translate.phaseUse = "出牌阶段";
lib.translate.phaseDiscard = "弃牌阶段";
lib.translate.phaseJieshu = "结束阶段";
lib.translate._changePhase = '回合顺序';
lib.skill._changePhase = {
    mark: true,
    popup: false,
    forced: true,
    nobracket: true,
    superCharlotte: true,
    unique: true,
    intro: {
        content: function (content, player) {
            var str = '';
            //if(player.changePhaseordermarks) str="你现在的回合内阶段顺序分别为：<br>"+player.changePhaseordermarks;
            if (player.changePhaseordermarks) {
                str = '你现在的回合内阶段顺序分别为：<br>' + get.translation(player.changePhaseordermarks[0]);
                for (var i = 1; i < player.changePhaseordermarks.length; i++) {
                    str += '、' + get.translation(player.changePhaseordermarks[i]);
                }
            }
            return str;
        },
    },
}


/**
 * 检测玩家的某种属性的值是否为场上最高
 * player.ismax(shushing,arg);
 * 其检测的shushing（属性），即是，所有玩家lib.element.player身上的元素key
 * 其中arg是携带参数，如果有，则调用对应方法，传参处理；
 * 若没有，则直接检测，对应key的值
 */
lib.element.player.ismax = function (shushing, ...arg) {
    if (!shushing) return;
    if (this[shushing] == undefined) return;
    if (arg.contains(true)) {
        var bool = true;
        arg.remove(true);

    }
    if (arg && arg.length) {
        if (this[shushing](arg) == undefined) return;
        for (var i = 0; i < game.players.length; i++) {
            if (game.players[i].isOut() || game.players[i] == this) continue;
            if (bool == true) {
                if (game.players[i][shushing](arg) >= this[shushing](arg)) return false;
            }
            else {
                if (game.players[i][shushing](arg) > this[shushing](arg)) return false;
            }
        }
    }
    else {
        for (var i = 0; i < game.players.length; i++) {
            if (game.players[i].isOut() || game.players[i] == this) continue;
            if (bool == true) {
                if (game.players[i][shushing] >= this[shushing]) return false;
            }
            else {
                if (game.players[i][shushing] > this[shushing]) return false;
            }
        }
    }
    return true;
}

/**
 * 检测玩家的某种属性的值是否为场上最小
 * player.ismin(shushing,arg);
 */
lib.element.player.ismin = function (shushing, ...arg) {
    if (!shushing) return;
    if (this[shushing] == undefined) return;
    if (arg.contains(true)) {
        var bool = true;
        arg.remove(true);

    }
    if (arg && arg.length) {
        if (this[shushing](arg) == undefined) return;
        for (var i = 0; i < game.players.length; i++) {
            if (game.players[i].isOut() || game.players[i] == this) continue;
            if (bool == true) {
                if (game.players[i][shushing](arg) <= this[shushing](arg)) return false;
            }
            else {
                if (game.players[i][shushing](arg) < this[shushing](arg)) return false;
            }
        }
    }
    else {
        for (var i = 0; i < game.players.length; i++) {
            if (game.players[i].isOut() || game.players[i] == this) continue;
            if (bool == true) {
                if (game.players[i][shushing] <= this[shushing]) return false;
            }
            else {
                if (game.players[i][shushing] < this[shushing]) return false;
            }
        }
    }
    return true;
}

/*
暂时死亡：
方法:player.timedie(time,num,num2);
操作后玩家死亡，并在指定个数个玩家死亡时复活指定体力值，摸指定张牌。
time为多少个角色死亡时复活，可为0（0的时候与1无差别），不填默认为1
num为复活后的体力值，可为0，不填默认恢复到体力上限
num2为复活后摸的牌数，不填或填0默认不摸
三者皆不能小于0，否则跳过函数
*/
//为了实现暂时死亡复活的技能
lib.skill._timedie = {
    trigger: {
        player: 'dieAfter',
    },
    direct: true,
    forceDie: true,
    forced: true,
    popup: false,
    unique: true,
    filter: function (event, player) {
        return player.hasSkill('timedie');
    },
    content: function () {
        player.markSkill('timedie');
    },
};
lib.skill.timedie = {
    init: function (player) {
        if (!player.storage.timedie2) player.storage.timedie2 = 0;
    },
    intro: {
        name: '复活倒计时',
        content: function (storage) {
            return '你在' + storage + '个角色死亡时复活';
        },
    },
    marktext: "复",
    mark: true,
    trigger: {
        global: 'dieBegin',
    },
    direct: true,
    forceDie: true,
    forced: true,
    popup: false,
    unique: true,
    filter: function (event, player) {
        return player.storage.timedie && event.player != player && player.isDead();
        return false;
    },
    content: function () {
        "step 0"
        player.storage.timedie2++;
        "step 1"
        if (player.storage.timedie2 < player.storage.timedie) event.finish();
        "step 2"
        if (player.storage.alivenum < 0) player.revive(player.maxHp);
        else player.revive(player.storage.alivenum);
        if (player.storage.drawnum > 0) player.draw(player.storage.drawnum);
        player.unmarkSkill('timedie');
        delete player.storage.alivenum;
        delete player.storage.drawnum;
        delete player.storage.timedie;
    },
};
//暂时死亡函数，无时机
lib.element.player.timedie = function (time, num, num2) {
    "step 0"
    event.forceDie = true;
    if (time < 0 || num < 0 || num2 < 0) return;
    this.die();
    "step 1"
    if (typeof time != 'number') time = 1;
    if (typeof num != 'number') num = -1;
    if (typeof num2 != 'number') num = 0;
    game.log(this, '将在' + get.cnNumber(time) + '名角色死亡后复活');
    this.storage.timedie = time;
    this.storage.alivenum = num;
    this.storage.drawnum = num2;
    this.syncStorage('timedie');
    this.addSkill('timedie')
    this.update();
};