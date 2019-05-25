import { SHOW_HOME, SHOW_MENU } from "../actions";

const { Component, Node, Event, Graphics, Color, sequence, delayTime, fadeIn } = cc;
const { ccclass } = cc._decorator;

const ShowMenuAction = new Event.EventCustom(SHOW_MENU, true);

@ccclass
export default class CreateBox extends Component {
    private rect: any = {};

    private duration: number = 0.25;

    private nextTick: any = 0;

    start () {
        this.observeRect();
        this.drawRect();
    }

    onEnable() {
        // fade in
        this.node.opacity = 0;
        this.node.runAction(sequence(
            delayTime(this.duration),
            fadeIn(this.duration),
        ));
        // bind listener
        this.node.on(SHOW_HOME, this.handleHome);
        this.node.getChildByName('Mask').on(Node.EventType.TOUCH_START, this.showMenu, this, false);
    }

    showMenu = () => {
        // broadcast game starting
        this.node.dispatchEvent(ShowMenuAction);
        // unbind listener
        this.node.getChildByName('Mask').off(Node.EventType.TOUCH_START, this.showMenu, this, true);
        // fade out
        this.node.active = false;
    };

    handleHome = () => {
        // fade out
        this.node.active = false;
        this.node.off(SHOW_HOME, this.handleHome);
    };

    observeRect = () => {
        const tempProps = {
            x: 223,
            y: 124,
            width: 192,
            height: 90,
        };
        Object.keys(tempProps).forEach(key => {
            Object.defineProperty(this.rect, key, {
                configurable: true,
                enumerable: true,
                set: value => {
                    tempProps[key] = value;
                    // draw rect in next tick
                    clearTimeout(this.nextTick);
                    this.nextTick = setTimeout(this.drawRect, 0);
                },
                get: () => {
                    return tempProps[key];
                }
            });
        })
    };

    drawRect = () => {
        const ctx = this.node.getComponent(Graphics);
        const rect = this.rect;

        ctx.strokeColor = Color.GRAY;
        ctx.lineWidth = 1;

        // draw rect
        ctx.clear();
        ctx.rect(rect.x, rect.y, rect.width, rect.height);
        ctx.stroke();
    };
}
