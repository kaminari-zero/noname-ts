game.import("extension", function (lib, game, ui, get, ai, _status) {
    return {
        name: "测试扩展制作",
        content: function (config, pack) {
            console.log("函数执行时机为游戏数据加载之后、界面加载之前", config, pack);
        },
        precontent: function () {
            console.log("导入第一个测试用用扩展");
        },
        config: {
            "switcher_example": {
                "name": "测试示例列表选项",
                "init": "3",
                "item": {
                    "1": "一",
                    "2": "二",
                    "3": "三"
                }
            },
            "toggle_example": {
                "name": "测试示例开关选项",
                "init": true
            }
        },
        help: {
            "测试帮助条目": "<ul><li>列表1-条目1<li>列表1-条目2</ul><ol><li>列表2-条目1<li>列表2-条目2</ul>"
        },
        package: {
            character: {
                character: {
                    "测试1": ["male", "wu", 4, ["beige", "duanchang", "old_anxu", "zhuiyi", "测试"],["zhu", "des:没啥好介绍的测试"]],
                },
                translate: {
                    "测试1": "测试1",
                },
            },
            card: {
                card: {
                    "测试卡牌": {
                        type: "basic",
                        enable: true,
                        filterTarget: true,
                        content: function () {
                            target.draw()
                        },
                        ai: {
                            order: 1,
                            result: {
                                target: 1,
                            },
                        },
                        fullskin: true,
                    },
                },
                translate: {
                    "测试卡牌": "测试卡牌",
                    "测试卡牌_info": "测试卡牌啊",
                },
                list: [
                    ["heart", "1", "测试卡牌"],
                    ["heart", "2", "测试卡牌"],
                    ["diamond", "3", "测试卡牌"],
                    ["diamond", "4", "测试卡牌"]
                ],
            },
            skill: {
                skill: {
                    "测试": {
                        trigger: {
                            player: "phaseEnd",
                        },
                        frequent: true,
                        content: function () {
                            player.draw()
                        },
                    },
                },
                translate: {
                    "测试": "测试",
                    "测试_info": "这是测试代码，功能随便，啊，是闭月啊",
                },
            },
            intro: "这是一个测试扩展",
            author: "无名玩家",
            diskURL: "http://baidu.com",
            forumURL: "http://baidu.com",
            version: "1.0",
        },
        files: {
            "character": ["测试1.jpg"],
            "card": ["测试卡牌.png"],
            "skill": []
        }
    }
})