declare namespace Lib.element {

    interface Button extends HTMLDivElement {
        /**
         * 设置当前按钮进_status.event.excludeButton排除列表中
         */
        exclude(): void;
    }
}