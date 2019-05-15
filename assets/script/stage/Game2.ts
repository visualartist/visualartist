import { SHOW_HOME, SHOW_MENU, FINISH_GAME_2 } from "../actions";

const { Component, Node, Event, loader, instantiate } = cc;
const { ccclass } = cc._decorator;

const FinishGame2Action = new Event.EventCustom(FINISH_GAME_2, true);

@ccclass
export default class Game2 extends Component {

    private selections = [];

    start () {
        this.node.on(SHOW_HOME, this.handleDisable);
        this.node.on(SHOW_MENU, this.handleDisable);
    }

    onEnable() {
        this.loadCard().then((node1: cc.Node) => {
            this.loadCardBack().then((node2: cc.Node) => {
                for (let i = 0; i < 16; i ++) {
                    const cardBack = instantiate(node2);
                    
                    const x = 80 + 106 * (i % 8);
                    const y = 400 - 160 * Math.floor(i / 8);
                    const flipCard = () => {
                        if (this.selections.length > 4) {
                            return;
                        }

                        const card = instantiate(node1);

                        card.x = x;
                        card.y = y;

                        this.node.addChild(card);

                        this.selections.push(i);
                        if (this.selections.length === 5) {
                            this.node.dispatchEvent(FinishGame2Action);
                        }

                        cardBack.off(Node.EventType.TOUCH_START, flipCard);
                    }
    
                    cardBack.x = x;
                    cardBack.y = y;
    
                    cardBack.on(Node.EventType.TOUCH_START, flipCard);
    
                    this.node.addChild(cardBack);
                }
            });
        })
    }

    handleDisable = () => {
        this.node.active = false;
        this.node.off(SHOW_HOME, this.handleDisable);
        this.node.off(SHOW_MENU, this.handleDisable);
    };

    loadCard = () => new Promise((resolve, reject) => {
        loader.loadRes("prefab/card", (err, prefab) => {
            return err ? reject(err) : resolve(prefab);
        });
    });

    loadCardBack = () => new Promise((resolve, reject) => {
        loader.loadRes("prefab/cardback", (err, prefab) => {
            return err ? reject(err) : resolve(prefab);
        });
    });
}
