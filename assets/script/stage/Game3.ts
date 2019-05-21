import { SHOW_HOME, SHOW_MENU, FINISH_GAME_3 } from "../actions";

const { Component, Node, Event, Graphics, Color, instantiate, loader, sequence, delayTime, fadeIn, fadeOut } = cc;
const { ccclass } = cc._decorator;

@ccclass
export default class Game3 extends Component {

    private selections = [];

    private duration = 0.25;

    private places = [
        { touched: false, target: 0 },
        { touched: false, target: 4 },
        { touched: false, target: 6 },
        { touched: false, target: 2 },
        { touched: false, target: 1 },
        { touched: false, target: 3 },
        { touched: false, target: 8 },
        { touched: false, target: 5 },
        { touched: false, target: 7 },
        { touched: false, target: 11 },
        { touched: false, target: 10 },
        { touched: false, target: 9 },
        { touched: false, target: 12 }
    ];

    start () {
        this.node.on(SHOW_HOME, this.handleDisable);
        this.node.on(SHOW_MENU, this.handleDisable);
    }

    onEnable() {
        this.loadBall().then((node: cc.Node) => {
            for (let i = 0; i < 4; i ++) {
                const ball = instantiate(node);

                const originalX = ball.x + 64 * i;
                const originalY = ball.y;

                ball.x = originalX;

                const moveBall = (e: any) => {
                    const { x, y } = e.getLocation();
                    ball.x = x;
                    ball.y = y;
                };

                const putBall = (e: any) => {
                    const { x, y } = e.getLocation();
                    for (let i = 0; i < this.places.length; i ++) {
                        if (this.places[i].touched) {
                            continue;
                        }
                        const dx = Math.abs(x - 128 - 64 * i);
                        const dy = Math.abs(y - 474);
                        const d = Math.sqrt(Math.pow(dx, 2)+Math.pow(dy, 2));
                        if (d < 25) {
                            ball.opacity = 0;
                            ball.off(Node.EventType.TOUCH_MOVE, moveBall);
                            ball.off(Node.EventType.TOUCH_END, putBall);

                            this.selections.push({ from: i, to: this.places[i].target });
                            if (this.selections.length === 4) {
                                const finishGame3Action = new Event.EventCustom(FINISH_GAME_3, true);
                                finishGame3Action.setUserData(this.selections);
                                this.node.dispatchEvent(finishGame3Action);
                            }

                            this.places[i].touched = true;
                            this.node.getChildByName('Road' + i).runAction(sequence(
                                fadeIn(this.duration),
                                delayTime(this.duration * 2),
                                fadeOut(this.duration),
                            ));
                            
                            const timer = setTimeout(() => {
                                const ctx = this.node.getComponent(Graphics);

                                ctx.fillColor = Color.WHITE;
                                ctx.circle(128 + 64 * this.places[i].target, 190, 18);
                                ctx.fill();

                                clearTimeout(timer);
                            }, this.duration * 4000);
                            break;
                        }
                    }
                    ball.x = originalX;
                    ball.y = originalY;
                };

                ball.on(Node.EventType.TOUCH_MOVE, moveBall);

                ball.on(Node.EventType.TOUCH_END, putBall);

                this.node.addChild(ball);
            }
        });
    }

    onDisable() {

    }

    handleDisable = () => {
        this.node.active = false;
        this.node.off(SHOW_HOME, this.handleDisable);
        this.node.off(SHOW_MENU, this.handleDisable);
    }

    loadBall = () => new Promise((resolve, reject) => {
        loader.loadRes("prefab/ball", (err, prefab) => {
            return err ? reject(err) : resolve(prefab);
        });
    });
}
