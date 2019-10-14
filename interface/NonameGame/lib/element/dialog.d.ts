declare namespace Lib.element {

    interface Dialog extends HTMLDivElement {
        add(item: any, noclick: any, zoom: any): any;
        addText(str: any, center: any): any;
        addSmall(item: any, noclick: any): any;
        addAuto(content: any): any;
        open(): any;
        close(): any;
        setCaption(str: any): any;
    }
}