import { SHOW_HOME, SHOW_ENTRANCE, SHOW_MENU } from "../actions";

const { Component, Node, Event, spawn, moveTo, scaleTo, easeCubicActionOut } = cc;
const { ccclass } = cc._decorator;

const ShowHomeAction = new Event.EventCustom(SHOW_HOME, true);

const x1 = 0;
const y1 = -256;

const x2 = 0;
const y2 = 121;

const x3 = 0;
const y3 = 316;

@ccclass
export default class LeadArtist extends Component {

    duration: number = 0.25;

    // Life-cycle callbacks
    start() {
        this.node.on(SHOW_ENTRANCE, this.showEntrance, this, true);
        this.node.on(SHOW_MENU, this.showMenu, this, true);
    }

    // Methods
    showEntrance = () => {
        this.node.on(Node.EventType.TOUCH_START, this.showHome, this, true);
        const action = spawn(
            moveTo(this.duration, x2, y2).easing(easeCubicActionOut()),
            scaleTo(this.duration, 2, 2).easing(easeCubicActionOut())
        );
        this.node.runAction(action);
    }

    showMenu = () => {
        const action = spawn(
            moveTo(this.duration, x3, y3).easing(easeCubicActionOut()),
            scaleTo(this.duration, 1, 1).easing(easeCubicActionOut())
        );
        this.node.runAction(action);
    }

    showHome = () => {
        this.node.off(Node.EventType.TOUCH_START, this.showHome, this, true);
        this.node.dispatchEvent(ShowHomeAction);
        const action = spawn(
            moveTo(this.duration, x1, y1).easing(easeCubicActionOut()),
            scaleTo(this.duration, 1, 1).easing(easeCubicActionOut())
        );
        this.node.runAction(action);
    }
}
