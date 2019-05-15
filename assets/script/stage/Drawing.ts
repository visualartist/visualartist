import { SHOW_HOME, SHOW_MENU, START_DRAWING } from '../actions';
import axios from '../../utils/axios';

const { ccclass } = cc._decorator;
const { Component, Node, Event } = cc;

const StartDrawingAction = new Event.EventCustom(START_DRAWING, true);

@ccclass
export default class NewClass extends Component {
    start () {
        this.node.on(SHOW_HOME, this.handleDisable);
        this.node.on(SHOW_MENU, this.handleDisable);
    }

    onEnable = () => {
        this.node.on(Node.EventType.TOUCH_START, this.startDrawing);
    }

    handleDisable = () => {
        this.node.active = false;
    };

    startDrawing = () => {
        this.node.dispatchEvent(StartDrawingAction);
        axios.post('http://api.nprint.magicfirm.com:8006/api/jobs', {
            gcodeFileUrl: 'http://pr8ltx2pn.bkt.clouddn.com/test.gcode',
            deviceId: 'MFB19010002',
            name: '测试',
            imageUrl: 'http://pic15.nipic.com/20110616/5001675_165112690000_2.jpg',
            filamentId: 'SP01'
        }).then(data => {
            console.log(data);
        });
    };
}
