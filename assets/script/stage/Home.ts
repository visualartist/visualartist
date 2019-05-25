// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { SHOW_ENTRANCE } from "../actions";

const { ccclass } = cc._decorator;

const { Component, Node, Event } = cc;

const ShowEntranceAction = new Event.EventCustom(SHOW_ENTRANCE, true);

@ccclass
export default class Home extends Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.node.on(Node.EventType.TOUCH_START, this.showEntrance, this, true);
    }

    showEntrance = () => {
        this.node.dispatchEvent(ShowEntranceAction);
        this.node.active = false;
    }
}
