function anonymous(event, step, source, player, target, targets, card, cards, skill, forced, num, trigger, result, _status, lib, game, ui, get, ai) {

    if (event.step == 5) {
        event.finish();
        return;
    }
    switch (step) {
        case 0:
            if (event.autochoose()) {
                event.result = {
                    bool: true,
                    cards: player.getCards(event.position)
                }
                for (var i = 0; i < event.result.cards.length; i++) {
                    if (!lib.filter.cardDiscardable(event.result.cards[i], player, event)) {
                        event.result.cards.splice(i--, 1);
                    }
                }
            } else {
                // &&!lib.filter.wuxieSwap(trigger)
                if (game.modeSwapPlayer && !_status.auto && player.isUnderControl()) {
                    game.modeSwapPlayer(player);
                }
                event.rangecards = player.getCards(event.position);
                for (var i = 0; i < event.rangecards.length; i++) {
                    if (lib.filter.cardDiscardable(event.rangecards[i], player, event)) {
                        event.rangecards.splice(i--, 1);
                    } else {
                        event.rangecards[i].uncheck('chooseToDiscard');
                    }
                }
                var range = get.select(event.selectCard);
                game.check();
                if (event.isMine()) {
                    game.pause();
                    if (range[1] > 1 && typeof event.selectCard != 'function') {
                        event.promptdiscard = ui.create.control('提示', function () {
                            ai.basic.chooseCard(event.ai);
                            if (_status.event.custom.add.card) {
                                _status.event.custom.add.card();
                            }
                            for (var i = 0; i < ui.selected.cards.length; i++) {
                                ui.selected.cards[i].updateTransform(true);
                            }
                        });
                    }
                    if (Array.isArray(event.dialog)) {
                        event.dialog = ui.create.dialog.apply(this, event.dialog);
                        event.dialog.open();
                        event.dialog.classList.add('noselect');
                    } else if (event.prompt != false) {
                        var str;
                        if (typeof (event.prompt) == 'string') str = event.prompt;
                        else {
                            str = '请弃置';
                            if (range[0] == range[1]) str += get.cnNumber(range[0]);
                            else if (range[1] == Infinity) str += '至少' + get.cnNumber(range[0]);
                            else str += get.cnNumber(range[0]) + '至' + get.cnNumber(range[1]);
                            str += '张';
                            if (event.position == 'h' || event.position == undefined) str += '手';
                            if (event.position == 'e') str += '装备';
                            str += '牌';
                        }
                        event.dialog = ui.create.dialog(str);
                        if (event.prompt2) {
                            event.dialog.addText(event.prompt2, event.prompt2.length <= 20);
                        }
                        if (Array.isArray(event.selectCard)) {
                            event.promptbar = event.dialog.add('0/' + get.numStr(event.selectCard[1], 'card'));
                            event.custom.add.card = function () {
                                _status.event.promptbar.innerHTML =
                                    ui.selected.cards.length + '/' + get.numStr(_status.event.selectCard[1], 'card');
                            }
                        }
                    } else if (get.itemtype(event.dialog) == 'dialog') {
                        event.dialog.style.display = '';
                        event.dialog.open();
                    }
                } else if (event.isOnline()) {
                    event.send();
                } else {
                    event.result = 'ai';
                }
            }
            break;
        case 1:
            if (event.result == 'ai') {
                game.check();
                if (ai.basic.chooseCard(event.ai) || forced) {
                    ui.click.ok();
                } else if (event.skill) {
                    var skill = event.skill;
                    ui.click.cancel();
                    event._aiexclude.add(skill);
                    event.redo();
                    game.resume();
                } else {
                    ui.click.cancel();
                }
            }
            if (event.rangecards) {
                for (var i = 0; i < event.rangecards.length; i++) {
                    event.rangecards[i].recheck('chooseToDiscard');
                }
            }
            break;
        case 2:
            event.resume();
            if (event.promptdiscard) {
                event.promptdiscard.close();
            }
            break;
        case 3:
            if (event.result.bool && event.result.cards && event.result.cards.length &&
                !game.online && event.autodelay && !event.isMine()) {
                if (typeof event.autodelay == 'number') {
                    game.delayx(event.autodelay);
                } else {
                    game.delayx();
                }
            }
            break;
        case 4:
            if (event.logSkill && event.result.bool && !game.online) {
                if (typeof event.logSkill == 'string') {
                    player.logSkill(event.logSkill);
                } else if (Array.isArray(event.logSkill)) {
                    player.logSkill.apply(player, event.logSkill);
                }
            }
            if (!game.online) {
                if (typeof event.delay == 'boolean') {
                    player.discard(event.result.cards).set('delay', event.delay);
                } else {
                    player.discard(event.result.cards);
                }
            }
            if (event.dialog && event.dialog.close) event.dialog.close();
    }
}