import { SHOW_MENU } from "../actions";

const { Component, Node, Event } = cc;
const { ccclass } = cc._decorator;

const ShowMenuAction = new Event.EventCustom(SHOW_MENU, true);

@ccclass
export default class Popover extends Component {
    onEnable = () => {
        this.node.on(Node.EventType.TOUCH_START, this.close);
    }

    close = () => {
        this.node.active = false;
        this.node.off(Node.EventType.TOUCH_START, this.close);
        this.node.dispatchEvent(ShowMenuAction);
    }
}
