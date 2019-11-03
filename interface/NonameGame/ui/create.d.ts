declare namespace UI {

    interface Create {
        /**
         * 创建一个div
         * 
         * 其参数列表：
         *  若为div，table，tr，td，body等这些类型html节点对象，则设置为position，即创建div即将插入到的父节点；
         *  若为number类型，则设置为position2，即将创建的div插入到position的第n个子节点之前；
         *  若为“divposition”类型，则设置为divposition，即设置div的坐标位置；
         *  若为“object”类型（即json格式对象），则设置为style，即设置div的style；
         *  若为“function”类型，则设置为listen，即设置该div的“点击/触摸”事件的回调方法；
         */
        div(...args): HTMLDivElement;
        filediv(): any;
        node(): any;
        iframe(src): any;
        identitycircle(list, target): any;
        chat(): any;
        exit(): any;
        connecting(bool): any;
        roomInfo(): any;
        templayer(time): any;
        selectlist(list, init, position, onchange): any;
        /**
         * 【核心】创建游戏菜单
         * （内部过于复杂，似乎时8000多行代码的一个方法，暂时UI方面看不懂）
         * @param connectMenu 
         */
        menu(connectMenu:SelectConfigData): void;
        table(): any;
        giveup(): any;
        groupControl(dialog): any;
        cardDialog(): any;
        characterDialog2(filter): any;
        characterDialog(): any;
        dialog(): any;
        line2(): any;
        line(): any;
        switcher(name, current, current2): any;
        /**
         * 生成一个显示html文档的div（html文档格式的说明文本）
         * @param str 
         * @param position 要添加进去的目标位置
         */
        caption(str:string, position:HTMLElement): HTMLDivElement;
        control(): any;
        confirm(str, func): any;
        skills(skills): any;
        skills2(skills): any;
        skills3(skills): any;
        arena(): any;
        system(str, func, right, before): any;
        pause(): any;
        /**
         * 创建预加载按钮（还没完全确定）
         * 先预先创建好node节点，将其保存在_status.prebutton中，保存到lib.onfree,在后面activate激活按钮
         * @param item 
         * @param type 
         * @param position 
         * @param noclick 
         */
        prebutton(item:any, type:string, position:HTMLDivElement, noclick?:boolean): HTMLDivElement;
        /**
         * 创建按钮
         * 
         * type类型与item内容：
         *  blank：对应item为card，效果：不显示卡面，显示背面；
         *  card：对应item为card，效果：展示卡牌；
         *  vcard：对应item为string,则是卡牌名；否则类型为CardBaseUIData或者CardBaseUIData2，效果：展示虚构卡牌（非卡堆里的）；
         *  character：对应item为string,则是武将名，效果：展示武将并附带一个功能按钮；
         *  player：对应的item为Player，则是玩家，效果：展示玩家的武将；
         *  text：对应的item为“html文档文本”，则是html文档的显示，效果：展示这段文档；
         *  textButton：对应的item为“html文档文本”，则是html文档的显示，效果：应该是按钮功能的文本，例如链接，暂不明确，待后期观察
         * @param item 按钮保存的信息内容（根据type不同对应的item也不同）
         * @param type 按钮类型：blank，card，vcard，character，player，text，textButton
         * @param position 位置,即生成的按钮父节点
         * @param noclick 
         * @param node 可以是已经存在的或者创建好的按钮节点（用途不大，有点多余）
         */
        button(item:any, type:string, position:HTMLElement, noclick?:boolean, node?:HTMLDivElement): Button;
        /**
         * 创建按钮（多个）
         * @param list 要创建的按钮的信息列表（建议同类型集合，为了对应type）
         * @param type 按钮类型：参考button方法，额外，可以增加“pre”前缀，创建prebutton按钮
         * @param position 与button一致
         * @param noclick 语button一致
         * @param zoom 没用到，无用参数
         */
        buttons(list:any[], type:string, position:HTMLElement, noclick?:boolean, zoom?:any): Button[];
        player(position, noclick): any;
        connectPlayers(ip): any;
        players(num): any;
        me(hasme): any;
        card(position, info, noclick): any;
        cardsAsync(): any;
        cards(ordered): any;
    }
}