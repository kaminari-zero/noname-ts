var NG;
(function (NG) {
    var ImportType;
    (function (ImportType) {
        ImportType["Extension"] = "extension";
        ImportType["Character"] = "character";
        ImportType["Card"] = "card";
        ImportType["Mode"] = "mode";
        ImportType["Player"] = "player";
    })(ImportType = NG.ImportType || (NG.ImportType = {}));
    var PositionType;
    (function (PositionType) {
        PositionType["Shoupai"] = "h";
        PositionType["Zhuangbei"] = "e";
        PositionType["Panding"] = "j";
        PositionType["CardPlie"] = "c";
        PositionType["Discard"] = "d";
        PositionType["Special"] = "s";
    })(PositionType = NG.PositionType || (NG.PositionType = {}));
    var Sex;
    (function (Sex) {
        Sex["MALE"] = "male";
        Sex["FEMALE"] = "female";
    })(Sex = NG.Sex || (NG.Sex = {}));
    var Group;
    (function (Group) {
        Group["WEI"] = "wei";
        Group["WATER"] = "wei";
        Group["SHU"] = "shu";
        Group["FIRE"] = "shu";
        Group["WU"] = "wu";
        Group["WOOD"] = "wu";
        Group["QUN"] = "qun";
        Group["SOIL"] = "qun";
        Group["SHEN"] = "shen";
        Group["GOLD"] = "shen";
    })(Group = NG.Group || (NG.Group = {}));
    var TriggerEnum;
    (function (TriggerEnum) {
        TriggerEnum[TriggerEnum["Before"] = 0] = "Before";
        TriggerEnum[TriggerEnum["Begin"] = 1] = "Begin";
        TriggerEnum[TriggerEnum["End"] = 2] = "End";
        TriggerEnum[TriggerEnum["After"] = 3] = "After";
        TriggerEnum[TriggerEnum["Omitted"] = 4] = "Omitted";
    })(TriggerEnum = NG.TriggerEnum || (NG.TriggerEnum = {}));
    var PhaseTrigger;
    (function (PhaseTrigger) {
        PhaseTrigger["gameStart"] = "gameStart";
        PhaseTrigger["gameDraw"] = "gameDraw";
        PhaseTrigger["phase"] = "phase";
        PhaseTrigger["judge"] = "judge";
        PhaseTrigger["phaseDraw"] = "phaseDraw";
        PhaseTrigger["phaseUse"] = "phaseUse";
        PhaseTrigger["discard"] = "discard";
    })(PhaseTrigger = NG.PhaseTrigger || (NG.PhaseTrigger = {}));
    var CardTrigger;
    (function (CardTrigger) {
        CardTrigger["sha"] = "sha";
        CardTrigger["shaMiss"] = "shaMiss";
        CardTrigger["juedou"] = "juedou";
        CardTrigger["lose"] = "lose";
        CardTrigger["gain"] = "gain";
        CardTrigger["useCard"] = "useCard";
        CardTrigger["useCardTo"] = "useCardTo";
        CardTrigger["respond"] = "respond";
        CardTrigger["draw"] = "draw";
        CardTrigger["equip"] = "equip";
        CardTrigger["chooseToRespond"] = "chooseToRespond";
    })(CardTrigger = NG.CardTrigger || (NG.CardTrigger = {}));
    var StateTrigger;
    (function (StateTrigger) {
        StateTrigger["damage"] = "damage";
        StateTrigger["loseHp"] = "loseHp";
        StateTrigger["recover"] = "recover";
        StateTrigger["changeHp"] = "changeHp";
        StateTrigger["loseMaxHp"] = "loseMaxHp";
        StateTrigger["gainMaxHp"] = "gainMaxHp";
        StateTrigger["turnOver"] = "turnOver";
        StateTrigger["link"] = "link";
        StateTrigger["dying"] = "dying";
        StateTrigger["die"] = "die";
    })(StateTrigger = NG.StateTrigger || (NG.StateTrigger = {}));
    var SuperTrigger;
    (function (SuperTrigger) {
        SuperTrigger["trigger"] = "trigger";
    })(SuperTrigger = NG.SuperTrigger || (NG.SuperTrigger = {}));
    var EnableTrigger;
    (function (EnableTrigger) {
        EnableTrigger["chooseToUse"] = "chooseToUse";
        EnableTrigger["chooseToRespond"] = "chooseToRespond";
        EnableTrigger["phaseUse"] = "phaseUse";
    })(EnableTrigger = NG.EnableTrigger || (NG.EnableTrigger = {}));
    var CardColor;
    (function (CardColor) {
        CardColor["Spade"] = "spade";
        CardColor["Heart"] = "heart";
        CardColor["Club"] = "club";
        CardColor["Diamond"] = "diamond";
        CardColor["Red"] = "red";
        CardColor["Black"] = "black";
    })(CardColor = NG.CardColor || (NG.CardColor = {}));
    var CardType;
    (function (CardType) {
        CardType["Basic"] = "basic";
        CardType["Trick"] = "trick";
        CardType["Delay"] = "delay";
        CardType["Equip"] = "equip";
        CardType["Equip1"] = "equip1";
        CardType["Equip2"] = "equip2";
        CardType["Equip3"] = "equip3";
        CardType["Equip4"] = "equip4";
        CardType["Equip5"] = "equip5";
    })(CardType = NG.CardType || (NG.CardType = {}));
    var Nature;
    (function (Nature) {
        Nature["Thunder"] = "thunder";
        Nature["Fire"] = "fire";
        Nature["Poison"] = "poison";
    })(Nature = NG.Nature || (NG.Nature = {}));
    var TypeConst;
    (function (TypeConst) {
        TypeConst["POSITION"] = "position";
        TypeConst["PLAYER"] = "player";
        TypeConst["PLAYERS"] = "players";
        TypeConst["CARD"] = "card";
        TypeConst["CARDS"] = "cards";
        TypeConst["NATURE"] = "nature";
        TypeConst["SELECT"] = "select";
        TypeConst["DIV_POSITION"] = "divposition";
        TypeConst["BUTTON"] = "button";
        TypeConst["DIALOG"] = "dialog";
        TypeConst["VCARD"] = "vcard";
    })(TypeConst = NG.TypeConst || (NG.TypeConst = {}));
    var PrepareConst;
    (function (PrepareConst) {
        PrepareConst["Give"] = "give";
        PrepareConst["Give2"] = "give2";
        PrepareConst["Throw"] = "throw";
        PrepareConst["Throw2"] = "throw2";
    })(PrepareConst = NG.PrepareConst || (NG.PrepareConst = {}));
})(NG || (NG = {}));
