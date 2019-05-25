import { SHOW_HOME, SHOW_MENU, FINISH_GAME_1, SHOW_ENTRANCE } from "../actions";

const { Color, Component, Label, Node, Event, loader, instantiate, sequence, fadeIn, fadeOut } = cc;
const { ccclass } = cc._decorator;

@ccclass
export default class Game1 extends Component {
    private temps = [];

    private selections = [];

    private duration = 0.125;

    start () {
        this.node.on(SHOW_HOME, this.handleDisable);
        this.node.on(SHOW_MENU, this.handleDisable);
    }

    onEnable() {
        this.loadButtonActive().then((node1: cc.Node) => {
            this.loadButton().then((node2: cc.Node) => {
                for (let i = 0; i < 18; i ++) {
                    const x = 60 + 100 * (i % 9);
                    const y = 240 - 100 * Math.floor(i / 9);

                    const button = instantiate(node2);
                    button.x = x;
                    button.y = y;

                    const handleClick = () => {
                        button.opacity = 127;
                        button.off(Node.EventType.TOUCH_START, handleClick);
                        if (this.selections.length > 17) {
                            return;
                        }
                        this.selections.push({ serial: i });

                        const buttonActive = instantiate(node1);

                        buttonActive.x = x;
                        buttonActive.y = y;
                        buttonActive.opacity = 0;

                        this.node.addChild(buttonActive);
                        this.temps.push(buttonActive);

                        buttonActive.runAction(sequence(
                            fadeIn(this.duration),
                            fadeOut(this.duration),
                        ));

                        const timer = setTimeout(() => {
                            clearTimeout(timer);

                            this.node.removeChild(buttonActive);

                            this.renderSelections();

                            if (this.selections.length === 18) {
                                const finishGame1Action = new Event.EventCustom(FINISH_GAME_1, true);
                                finishGame1Action.setUserData(this.selections.map((selection, index) => ({ v1: index, v2: selection.serial })));
                                this.node.dispatchEvent(finishGame1Action);
                            }
                        }, this.duration * 2000);
                    }

                    button.on(Node.EventType.TOUCH_START, handleClick);
        
                    this.node.addChild(button);
                    this.temps.push(button);
                }
            });
        });
    }

    handleDisable = () => {
        this.temps.forEach(temp => {
            this.node.removeChild(temp);
        });
        this.temps = [];
        this.selections = [];
        this.node.active = false;
    }

    renderSelections = () => {
        this.loadBallActive().then((node: cc.Node) => {
            for (let i = 0; i < this.selections.length; i ++) {
                if (this.selections[i].node) {
                    continue;
                } 

                const x = 64 + 47 * i;
                const y = 512 - 64 * (i % 2);

                const ballActive = instantiate(node);
                ballActive.x = x;
                ballActive.y = y;

                this.selections[i].node = ballActive;

                this.node.addChild(ballActive);
                this.temps.push(ballActive);
            }
        });
    }

    loadButtonActive = () => new Promise((resolve, reject) => {
        loader.loadRes("prefab/buttonActive", (err, prefab) => {
            return err ? reject(err) : resolve(prefab);
        });
    });

    loadButton = () => new Promise((resolve, reject) => {
        loader.loadRes("prefab/button", (err, prefab) => {
            return err ? reject(err) : resolve(prefab);
        });
    });

    loadBallActive = () => new Promise((resolve, reject) => {
        loader.loadRes("prefab/ballActive", (err, prefab) => {
            return err ? reject(err) : resolve(prefab);
        });
    });
}
