import { SHOW_GAME_1, SHOW_GAME_2, SHOW_GAME_3, SHOW_HOME, SHOW_ENTRANCE } from "../actions";

const { Component, Node, Event, sequence, delayTime, fadeIn } = cc;
const { ccclass } = cc._decorator;

const ShowGame1Action = new Event.EventCustom(SHOW_GAME_1, true);
const ShowGame2Action = new Event.EventCustom(SHOW_GAME_2, true);
const ShowGame3Action = new Event.EventCustom(SHOW_GAME_3, true);
@ccclass
export default class Menu extends Component {

    private duration = 0.25;

    start () {
        this.node.on(SHOW_HOME, this.handleDisable);
        this.node.on(SHOW_ENTRANCE, this.handleDisable);
        this.node.on(SHOW_GAME_1, this.handleDisable);
        this.node.on(SHOW_GAME_2, this.handleDisable);
        this.node.on(SHOW_GAME_3, this.handleDisable);
    }

    onEnable() {
        this.node.getChildByName('Menu1').on(Node.EventType.TOUCH_START, this.showGame1, this, true);
        this.node.getChildByName('Menu2').on(Node.EventType.TOUCH_START, this.showGame2, this, true);
        this.node.getChildByName('Menu3').on(Node.EventType.TOUCH_START, this.showGame3, this, true);

        this.node.opacity = 0;
        this.node.runAction(sequence(
            delayTime(this.duration),
            fadeIn(this.duration),
        ));
    }

    handleDisable = () => {
        this.node.active = false;
        this.disableMenu();
    }

    showGame1 = () => {
        this.node.dispatchEvent(ShowGame1Action);
        this.disableMenu();
    };

    showGame2 = () => {
        this.node.dispatchEvent(ShowGame2Action);
        this.disableMenu();
    };

    showGame3 = () => {
        this.node.dispatchEvent(ShowGame3Action);
        this.disableMenu();
    };

    disableMenu = () => {
        this.node.getChildByName('Menu1').off(Node.EventType.TOUCH_START, this.showGame1, this, true);
        this.node.getChildByName('Menu2').off(Node.EventType.TOUCH_START, this.showGame2, this, true);
        this.node.getChildByName('Menu3').off(Node.EventType.TOUCH_START, this.showGame3, this, true);
    };
}
