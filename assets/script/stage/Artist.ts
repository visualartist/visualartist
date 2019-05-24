import { SHOW_HOME, SHOW_ENTRANCE, SHOW_MENU } from "../actions";

const { Component, Node, Event, spawn, moveTo, scaleTo, easeCubicActionOut } = cc;
const { ccclass } = cc._decorator;

const ShowEntranceAction = new Event.EventCustom(SHOW_ENTRANCE, true);
const ShowHomeAction = new Event.EventCustom(SHOW_HOME, true);

@ccclass
export default class LeadArtist extends Component {
    x1 = 0;
    y1 = -256;

    x2 = 0;
    y2 = 91;

    x3 = 0;
    y3 = 316;

    duration: number = 0.25;

    // Life-cycle callbacks
    start() {
        this.node.on(Node.EventType.TOUCH_START, this.showEntrance, this, true);
        this.node.on(SHOW_MENU, this.showMenu, this, true);
    }

    // Methods
    showEntrance = () => {
        this.node.off(Node.EventType.TOUCH_START, this.showEntrance, this, true);
        this.node.on(Node.EventType.TOUCH_START, this.showHome, this, true);
        this.node.dispatchEvent(ShowEntranceAction);
        const action = spawn(
            moveTo(this.duration, this.x2, this.y2).easing(easeCubicActionOut()),
            scaleTo(this.duration, 2, 2).easing(easeCubicActionOut())
        );
        this.node.runAction(action);
    }

    showMenu = () => {
        const action = spawn(
            moveTo(this.duration, this.x3, this.y3).easing(easeCubicActionOut()),
            scaleTo(this.duration, 1, 1).easing(easeCubicActionOut())
        );
        this.node.runAction(action);
    }

    showHome = () => {
        this.node.off(Node.EventType.TOUCH_START, this.showHome, this, true);
        this.node.on(Node.EventType.TOUCH_START, this.showEntrance, this, true);
        this.node.dispatchEvent(ShowHomeAction);
        const action = spawn(
            moveTo(this.duration, this.x1, this.y1).easing(easeCubicActionOut()),
            scaleTo(this.duration, 1, 1).easing(easeCubicActionOut())
        );
        this.node.runAction(action);
    }

}
