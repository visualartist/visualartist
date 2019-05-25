// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { SHOW_ENTRANCE, SHOW_HOME, SHOW_GAME_1, SHOW_GAME_2, SHOW_GAME_3, SHOW_MENU } from "../actions";

const { ccclass } = cc._decorator;

const { Component, Node, Event } = cc;

@ccclass
export default class BackBox extends Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.node.on(Node.EventType.TOUCH_START, this.goBack, this, true);
        this.node.on(SHOW_HOME, this.handleDisable);
        this.node.on(SHOW_ENTRANCE, this.handleDisable);
    }

    goBack() {
        // broadcast game starting
        const gameHistory = (window as any).gameHistory;
        const action = gameHistory[gameHistory.length - 2];
        gameHistory.splice(-2);
        const gaBackAction = new Event.EventCustom(action, true);
        this.node.dispatchEvent(gaBackAction);
    }

    handleDisable = () => {
        this.node.active = false;
    }

    // update (dt) {}
}
