game.import("extension", function (lib, game, ui, get, ai, _status) {
    return {
        name: "群英会", 
        editable: false, 
        content: function (config, pack) {


            // ---------------------------------------武将分栏------------------------------------------//		

            if (config.xsanguo) {
                for (var i in lib.characterPack['xsanguo']) {
                    if (lib.character[i][4].indexOf("forbidai") < 0) lib.character[i][4].push("forbidai");
                };
            };

            if (config.xu) {
                for (var i in lib.characterPack['xu']) {
                    if (lib.character[i][4].indexOf("forbidai") < 0) lib.character[i][4].push("forbidai");
                };
            };

        }, 
        precontent: function (xwj) {
            if (xwj.enable) {


                game.import('character', function () {
                    var xsanguo = {
                        name: 'xsanguo',
                        connect: true,
                        character: {
                            "xwj_xsanguo_zhihuaxiong": ["male", "qun", 4, ["xwj_xsanguo_wenjiu", "xwj_xsanguo_badao"], []],


                        },//武将
                        characterIntro: {
                            "xwj_xsanguo_zhihuaxiong": "太阳神三国杀智包的华雄。",

                        },//介绍

                        characterTitle: {
                            "xwj_xsanguo_jiangwei": "龙的衣钵",

                        },//称号

                        perfectPair: {
                            "xwj_xhuoying_xiaoying": ['xwj_xhuoying_zhuozhu'],

                        },//珠联壁合


                        skill: {

                            "xwj_xsanguo_tannan": {
                                mod: {
                                    globalFrom: function (from, to, distance) {
                                        return distance - (from.maxHp - from.hp);
                                    },
                                },
                            },

                        },//技能

                        translate: {
                            "xwj_xsanguo_simahui": "智司马徽",
                            "xwj_xsanguo_shouye": "授业",
                            "xwj_xsanguo_shouye_info": "出牌阶段，你可以弃置一张红色手牌，指定最多两名其他角色各摸一张牌。",
                        },//翻译
                    };
                    if (lib.device || lib.node) {
                        for (var i in xsanguo.character) { xsanguo.character[i][4].push('ext:群英会/' + i + '.jpg'); }
                    } else {
                        for (var i in xsanguo.character) { xsanguo.character[i][4].push('db:extension-群英会:' + i + '.jpg'); }
                    }
                    return xsanguo;
                });
                lib.config.all.characters.push('xsanguo');
                if (!lib.config.characters.contains('xsanguo')) lib.config.characters.remove('xsanguo');
                lib.translate['xsanguo_character_config'] = '三国新将';

                //(以上从第22行到第74行为一个扩展小包的框架，保留了例子，将整个框架复制到此行下面就可另创单独新扩展小包）

                // ---------------------------------------卡牌------------------------------------------//	

                game.import('card', function () {
                    var xwj_xus_equip = {
                        name: 'xwj_xus_equip',
                        connect: true,
                        card: {	//卡牌

                            "xwj_xus_mianju": {
                                audio: true,
                                type: "equip",
                                subtype: "equip2",
                                skills: ["xwj_xus_mianju"],
                                ai: {
                                    order: 9.5,
                                    basic: {
                                        equipValue: function (card, player) {
                                            if (!player.isTurnedOver()) return 6;
                                            if (player.isTurnedOver()) return -10;
                                            return 0;
                                        },
                                        order: function (card, player) {
                                            if (player && player.hasSkillTag('reverseEquip')) {
                                                return 8.5 - get.equipValue(card, player) / 20;
                                            }
                                            else {
                                                return 8 + get.equipValue(card, player) / 20;
                                            }
                                        },
                                        useful: 2,
                                        value: function (card, player) {
                                            var value = 0;
                                            var info = get.info(card);
                                            var current = player.getEquip(info.subtype);
                                            if (current && card != current) {
                                                value = get.value(current, player);
                                            }
                                            var equipValue = info.ai.equipValue;
                                            if (equipValue == undefined) {
                                                equipValue = info.ai.basic.equipValue;
                                            }
                                            if (typeof equipValue == 'function') return equipValue(card, player) - value;
                                            if (typeof equipValue != 'number') equipValue = 0;
                                            return equipValue - value;
                                        },
                                    },
                                    result: {
                                        target: function (player, target) {
                                            return get.equipResult(player, target, name);
                                        },
                                    },
                                },
                                image: "ext:群英会/xwj_xus_mianju.png",
                                enable: true,
                                selectTarget: -1,
                                modTarget: true,
                                allowMultiple: false,
                                toself: true,
                                fullskin: true,
                            },



                        },//卡牌


                        skill: {	//卡牌的技能


                            "xwj_xus_mianju": {
                                audio: "ext:群英会:1",
                                trigger: {
                                    player: "turnOverBefore",
                                },
                                forced: true,
                                content: function () {
                                    trigger.cancel();
                                },
                                ai: {
                                    noturnOver: true,
                                    effect: {
                                        target: function (card, player, target, current) {
                                            if (get.tag(card, 'turnOver')) return [0, 0];
                                        },
                                    },
                                },
                            },


                        },//卡牌的技能



                        translate: {
                            "xwj_xus_mianju": "漩涡面具",
                            "xwj_xus_mianju_info": "<font color=#f00>锁定技</font> 武将牌不能被翻面",

                        },//翻译
                        list: [
                            ["diamond", "5", "xwj_xus_houzi"],
                            ["heart", "9", "xwj_xus_jiuwei"],
                            ["heart", "2", "xwj_xus_xuelunyang"],
                            ["spade", "6", "xwj_xus_kuwu"],
                            ["diamond", "4", "xwj_xus_shoulijian"],
                            ["spade", "4", "xwj_xus_shoulijian"],
                            ["club", "3", "xwj_xus_mianju"],
                        ]//卡牌的花色点数及数量					
                    };
                    return xwj_xus_equip;
                });
                lib.translate['xwj_xus_equip_card_config'] = '群英会';
                lib.config.all.cards.push('xwj_xus_equip');
                if (!lib.config.cards.contains('xwj_xus_equip')) lib.config.cards.remove('xwj_xus_equip');
            };

        }, 
        help: { 
            "群英会": "<li>此扩展原名为：新武将，始创于2017年8月，汇集了部分三国新将和《火影忍者》、《秦时明月》、《封神纪》等作品的人物，技能强度略高，可联机。若想关闭某个扩展小包，可在相应武将栏内关闭并重启，开启同理。<li>若发现BUG可到贴吧或无名杀设计群：852740627 反馈，有技能设计（尤其是玄机动画《武庚纪》的角色）的建议也可联系作者<li>新增卡牌：【手里剑】2张，【写轮眼】、【九尾】、【漩涡面具】、【苦无】、【猴子】各1张。请自行将配音文件xwj_xus_shoulijian和zbfs复制到audio-card-male/female这两个文件夹里（两处各一个）。另外，须关闭“配音扩展”的“连杀开关”或删了audio-skill目录下的liansha1至liansha7和jiuren1、jiuren2的九个配音文件，否则可能会与“配音扩展”一起播放音效。<li>游戏时请关闭“火影忍者”武将栏的新版替换开关，否则有部分武将的技能会缺失<li>游戏时或游戏过程中若遇见卡死情况，打开兼容模式提高扩展的兼容性即可解决。目前为止，除了“千手柱间”的“木遁”在牌堆剩余一张牌时发动会卡死游戏外，已解决大部分已知的可能会卡死的BUG<li>【编码】Sukincen<li>【配图】Sukincen<li>【录制配音】Sukincen" 
        }, 
        config: {

            "xwansha": {
                name: '完杀模式',
                "intro": "完杀模式：开启后重启游戏生效。场上所有角色视为拥有技能“完杀”",
                init: false
            },


        }, 
        package: {
            //注：以下为游戏自带编辑器的代码编辑区域
            character: {
                character: {
                },
                translate: {
                },
            },
            card: {
                card: {

                },
                translate: {

                },
                list: [

                ],
            },
            skill: {
                skill: {
                },
                translate: {
                },
            },
            intro: "",
            author: "★Sukincen★",
            diskURL: "",
            forumURL: "",
            version: "1.25",
        }, 
        files: { "character": [], "card": [], "skill": [] }
    }
})
