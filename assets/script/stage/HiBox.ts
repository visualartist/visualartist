import { SHOW_ENTRANCE, SHOW_HOME, SHOW_MENU } from "../actions";

const { Component, Graphics, Color, tween } = cc;
const { ccclass } = cc._decorator;

const BLACK = new Color().fromHEX('#141414');

const HomeProps = {
    x: -128,
    y: -96,
    width: 256,
    height: 192,

    hiOpacity: 255,
    hiScale: 0.5,
    hiX: 0,
    hiY: 30,
};

const EntranceProps = {
    x: 223,
    y: 208,
    width: 192,
    height: 72,

    hiOpacity: 191,
    hiScale: 0.25,
    hiX: 388,
    hiY: 244,
};

const MenuProps = {
    x: 405,
    y: 270,
    width: 36,
    height: 36,

    hiOpacity: 191,
    hiScale: 0.25,
    hiX: 423,
    hiY: 288,
};

@ccclass
export default class HiBox extends Component {
    private rect: any = {};

    private duration = 0.25;

    private nextTick = 0;

    onLoad () {
    }

    start () {
        this.observeRect();
        this.drawRect();
        this.node.on(SHOW_HOME, this.handleHome);
        this.node.on(SHOW_ENTRANCE, this.handleEntrance);
        this.node.on(SHOW_MENU, this.handleMenu);
    }

    handleHome = () => {
        this.drawTips();
        tween(this.rect).to(this.duration, HomeProps, { easing: 'cubicOut'}).start();
    }

    handleEntrance = () => {
        this.removeTips();
        tween(this.rect).to(this.duration, EntranceProps, { easing: 'cubicOut'}).start();
    }

    handleMenu = () => {
        tween(this.rect).to(this.duration, MenuProps, { easing: 'cubicOut'}).start();
    }

    drawRect = () => {
        const ctx = this.node.getComponent(Graphics);
        const rect = this.rect;

        ctx.fillColor = BLACK;
        ctx.strokeColor = Color.GRAY;
        ctx.lineWidth = 1;

        // draw rect
        ctx.clear();
        ctx.rect(rect.x, rect.y, rect.width, rect.height);
        ctx.stroke();
        ctx.fill();

        // draw text
        const hi = this.node.getChildByName('Hi');
        hi.opacity = rect.hiOpacity;
        hi.setScale(rect.hiScale);
        hi.setPosition(rect.hiX, rect.hiY);
    }

    observeRect = () => {
        const tempProps = {
            x: -128,
            y: -96,
            width: 256,
            height: 192,

            hiOpacity: 255,
            hiScale: 0.5,
            hiX: 0,
            hiY: 30,
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
    }

    drawTips = () => {
        const tipCN = this.node.getChildByName('Tip_CN');
        const tipEN = this.node.getChildByName('Tip_EN');
        tween(tipCN).delay(this.duration).to(this.duration, { opacity: 255 }, { easing: 'cubicOut'}).start();
        tween(tipEN).delay(this.duration).to(this.duration, { opacity: 255 }, { easing: 'cubicOut'}).start();
    }

    removeTips = () => {
        const tipCN = this.node.getChildByName('Tip_CN');
        const tipEN = this.node.getChildByName('Tip_EN');
        tipCN.opacity = 0;
        tipEN.opacity = 0;
    }
}
