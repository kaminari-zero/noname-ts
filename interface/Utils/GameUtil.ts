namespace NG {
    /**
     * 游戏内常用工具
     */
    export class Utils {
        /**
         * 创建帮助文本
         * @param content 一个数组结构，或者单纯一个字符串
         * @param type 
         */
        public static createHelp(content: any[]|string, type?: number | string) {
            // "帮助条目": "<ul><li>列表1-条目1<li>列表1-条目2</ul><ol><li>列表2-条目1<li>列表2-条目2</ul>" 
            let str = "";
            let itemTag = ""
            let data:any[];
            if (ObjectUtil.isString(content)){
                data = [content];
            } else if (ObjectUtil.isArray(content)) {
                data = content as any[];
            } else {
                console.error("content类型不正确！");
                return "";
            }
            for (let index = 0; index < data.length; index++) {
                let element = data[index];
                if (ObjectUtil.isString(element)) {
                    let [text, curType] = [element, type ? type : "0"];

                    switch (curType) {
                        case "0"://序号1，2，3
                            itemTag = "ol";
                            break;
                        case "1"://点
                            itemTag = "ul";
                            break;

                    }
                    //后期采用#{xxxxxx}文本来指定特殊格式
                    str += `<li>${text}</li>`;
                } else if (ObjectUtil.isArray(element)) {
                    (<Array<any>>element).forEach((value, index, array) => {
                        str += this.createHelp(value, "1");
                    });
                }
            }
            str = `<${itemTag}>${str}</${itemTag}>`;
            return str;
        }

        /**
         * 使用 #xxxx 标记替换文本（日后再使用）
         * @param desc 
         */
        public static getDesc(desc: string): string {
            desc = desc.replace(/\#\{[a-zA-Z]+\}/g, (sub) => {
                switch (sub) {
                    case "${content}":
                        return "";
                }
                return sub;
            })
            return desc;
        }

    }
}