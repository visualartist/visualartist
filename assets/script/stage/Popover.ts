import { SHOW_MENU, START_DRAWING } from "../actions";

const { Component, Node, Event, Label } = cc;
const { ccclass } = cc._decorator;

const ShowMenuAction = new Event.EventCustom(SHOW_MENU, true);

@ccclass
export default class Popover extends Component {
    onEnable = () => {
        this.node.on(START_DRAWING, this.open);
        this.node.on(Node.EventType.TOUCH_START, this.close);
    }

    open = (e: any) => {
        console.log(e);
        const str = e.detail.reduce((str, data) => str = str + data.v1 + data.v2, '').substring(0, 8);
        (this.node.getChildByName('Label') as any).getComponent(cc.Label).string = str;
    }

    close = () => {
        this.node.active = false;
        this.node.off(Node.EventType.TOUCH_START, this.close);
        this.node.dispatchEvent(ShowMenuAction);
    }
}
