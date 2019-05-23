import { SHOW_ENTRANCE, SHOW_HOME, SHOW_MENU, SHOW_GAME_1, SHOW_GAME_2, SHOW_GAME_3, FINISH_GAME_1, FINISH_GAME_3, FINISH_GAME_2, START_DRAWING } from "../actions";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass } = cc._decorator;

// TODO 配置化
@ccclass
export default class Canvas extends cc.Component {
    start () {
        this.node.on(SHOW_HOME, () => {
            this.node.children.forEach(child => child.emit(SHOW_HOME));
        });

        this.node.on(SHOW_ENTRANCE, () => {
            this.node.children.forEach(child => child.emit(SHOW_ENTRANCE));
            // Active CreateBox
            this.node.getChildByName('CreateBox').active = true;
        });

        this.node.on(SHOW_MENU, () => {
            this.node.children.forEach(child => child.emit(SHOW_MENU));
            // Active Menu
            this.node.getChildByName('Menu').active = true;
        });

        this.node.on(SHOW_GAME_1, () => {
            this.node.children.forEach(child => child.emit(SHOW_MENU));
            // Active Game 1
            this.node.getChildByName('Game1').active = true;
            this.node.getChildByName('Thinking').active = true;
        });

        this.node.on(SHOW_GAME_2, () => {
            this.node.children.forEach(child => child.emit(SHOW_MENU));
            // Active Game 2
            this.node.getChildByName('Game2').active = true;
            this.node.getChildByName('Thinking').active = true;
        });

        this.node.on(SHOW_GAME_3, () => {
            this.node.children.forEach(child => child.emit(SHOW_MENU));
            // Active Game 3
            this.node.getChildByName('Game3').active = true;
            this.node.getChildByName('Thinking').active = true;
        });

        this.node.on(FINISH_GAME_1, e => {
            // Active Thinking
            this.node.getChildByName('Drawing').active = true;
            this.node.getChildByName('Thinking').active = false;
            this.node.children.forEach(child => child.emit(FINISH_GAME_1, e));
        });

        this.node.on(FINISH_GAME_2, e => {
            // Active Thinking
            this.node.getChildByName('Drawing').active = true;
            this.node.getChildByName('Thinking').active = false;
            this.node.children.forEach(child => child.emit(FINISH_GAME_2, e));
        });

        this.node.on(FINISH_GAME_3, e => {
            // Active Thinking
            this.node.getChildByName('Drawing').active = true;
            this.node.getChildByName('Thinking').active = false;
            this.node.children.forEach(child => child.emit(FINISH_GAME_3, e));
        });

        this.node.on(START_DRAWING, () => {
            this.node.children.forEach(child => child.emit(START_DRAWING));
            // Active Popover
            this.node.getChildByName('Popover').active = true;
        });
    }
}
