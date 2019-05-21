import { SHOW_ENTRANCE, SHOW_HOME, SHOW_MENU, SHOW_GAME_1, SHOW_GAME_2, SHOW_GAME_3, FINISH_GAME_1, FINISH_GAME_3, FINISH_GAME_2, START_DRAWING } from "../actions";
import axios from 'axios';
import * as uuid from 'uuid';
import * as qiniu from 'qiniu-js';

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

function test() {
    const str = `
G21 ; set units to millimeters
G1 Z50 F3000
G1 X50 Y60 F3000
G1 Z5 F1500
G2 X40 Y50 I0 J-10 F1500

G1 Z50 F3000
G1 X150 Y50 F3000
G1 Z5 F1500
G1 X150 Y80 F1500

    `;
    const file = new Blob([str], { type: 'text/plain' });
    const key = uuid();
    axios.get('http://localhost:3000/qiniu/token').then(({ data }) => {
        const { token } = data as any;
        qiniu.upload(file, key + '.gcode', token, {}, {}).subscribe({
            next() {},
            error() {},
            complete(res){
                const gcodeFileUrl = 'http://prjpdaj6a.bkt.clouddn.com/' + res.key;
                axios.post('http://api.nprint.magicfirm.com:8006/api/jobs', {
                    gcodeFileUrl,
                    deviceId: 'MFB19040009',
                    name: key,
                    // imageUrl: 'http://pic15.nipic.com/20110616/5001675_165112690000_2.jpg',
                    filamentId: 'SP01'
                }).then(data => {
                    console.log(data);
                });
            }
            });
        // subscription.unsubscribe() // 上传取消
    });
}
// test();

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
