import { SHOW_GAME_1, SHOW_GAME_2, SHOW_GAME_3, SHOW_HOME, SHOW_MENU } from "../actions";

const { Component, Node, Event, sequence, delayTime, fadeIn } = cc;
const { ccclass } = cc._decorator;

@ccclass
export default class Introduce extends Component {

    private duration = 0.25;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.node.on(SHOW_HOME, this.handleDisable);
        this.node.on(SHOW_MENU, this.handleDisable);
        this.node.on(SHOW_GAME_1, this.handleDisable);
        this.node.on(SHOW_GAME_2, this.handleDisable);
        this.node.on(SHOW_GAME_3, this.handleDisable);
    }

    onEnable() {
        this.node.opacity = 0;
        this.node.runAction(sequence(
            delayTime(this.duration),
            fadeIn(this.duration),
        ));
    }

    handleDisable = () => {
        this.node.active = false;
    }
}
