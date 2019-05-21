import * as qiniu from 'qiniu-js';
import * as uuid from 'uuid/v4';
import axios from 'axios';

import { SHOW_HOME, SHOW_MENU, START_DRAWING, FINISH_GAME_1, FINISH_GAME_2, FINISH_GAME_3 } from '../actions';

const { ccclass } = cc._decorator;
const { Component, Event } = cc;

const StartDrawingAction = new Event.EventCustom(START_DRAWING, true);


enum GameType {
    Game1 = 1,
    Game2 = 2,
    Game3 = 3,
}

@ccclass
export default class Drawing extends Component {
    start () {
        this.node.on(SHOW_HOME, this.handleDisable);
        this.node.on(SHOW_MENU, this.handleDisable);
    }

    onEnable = () => {
        this.node.on(FINISH_GAME_1, this.startDrawing(GameType.Game1));
        this.node.on(FINISH_GAME_2, this.startDrawing(GameType.Game2));
        this.node.on(FINISH_GAME_3, this.startDrawing(GameType.Game3));
    }

    handleDisable = () => {
        this.node.active = false;
    };

    startDrawing = (type: GameType) => (e: any) => {
        this.node.dispatchEvent(StartDrawingAction);
        const str = this.generateGcode(type, e.detail);
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
        })
    };

    generateGcode = (type: GameType, data: any) => {
        console.log()
        let body = '';
        switch (type) {
            case GameType.Game1:
                body = this.drawGame1(data);
                break;
            case GameType.Game2:
                body = this.drawGame2(data);
                break;
            case GameType.Game3:
                body = this.drawGame3(data);
                break;
            default:
                break;
        }
        return this.header + body + this.footer;
    };

    // data 是一个数组，形如：[{ v1: 0, v2: 2}]，Game1就是随便乱画
    drawGame1(data: any) {
        return data.map((item: any) => {
            const fromX = 50 + Math.random() * 50 + item.v1 * Math.random();
            const fromY = 50 + Math.random() * 50 + item.v2 * Math.random();
            const toX = 50 + Math.random() * 50 + item.v1 * Math.random();
            const toY = 50 + Math.random() * 50 + item.v2 * Math.random();
            return this.drawLine(fromX, fromY, toX, toY);
        });
    }

    // data 是一个数组，形如：[{ v1: 0, v2: 2}]，Game1就是随便乱画
    drawGame2(data: any) {
        console.log(data);
        return this.drawConcentricCircle(50, 50, 40, 1);
    }

    drawGame3(data: any) {
        console.log(data);
        return '';
    }

    drawConcentricCircle = (x: number, y: number, r: number, mode: number) => {
        let result = '';
        if (mode === 0) {
            result += this.drawCircle(x, y - r, x - r, y, 0, r, mode);
        } else {
            result += this.drawCircle(x, y - r, x + r, y, 0, r, mode);
        }
        if (r > 10) {
            result += this.drawConcentricCircle(x, y, r - 10, (mode + 1) % 1);
            r = r - 10;
        }
        return result;
    }

    drawCircle = (x, y, toX, toY, circleX, circleY, mode) => {
        return `
G1 Z50 F3000
G1 X${x} Y${y} F3000
G1 Z5 F1500
${mode ? 'G2' : 'G3'} X${toX} Y${toY} I${circleX} J${circleY} F1500
        `;
    }
    
    drawLine = (x, y, toX, toY) => {
        return `
G1 Z50 F3000
G1 X${x} Y${y} F3000
G1 Z5 F1500
G1 X${toX} Y${toY} F1500
    `;
    }

    header = `
G21 ; set units to millimeters
`;

    footer = `
`;
}
