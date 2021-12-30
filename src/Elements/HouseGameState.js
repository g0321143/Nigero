const { EventEmitter } = require("events");
import Buildings from '../Constants/Buildings';
import { getScore, setScore } from "../Utils/LocalStorage";

export const EV_GAME_STATE_CHANGED = 'game_state_changed';

class HouseGameState extends EventEmitter {

    item = {};
    mission = getScore(Buildings.house.id);

    /**
     * アイテムを登録します
     * @param {String} name 
     */
    addItem(name) {
        this.item[name] = false;
    }

    /**
     * アイテムの状態を取得します
     * @param {String} name 
     * @returns {boolean} アイテムの状態
     */
    getItemState(name) {
        console.log(this.item);
        return this.item[name];
    }

    /**
     * アイテムの状態をリセットします
     */
    resetItemState() {
        this.item = {};
        this.emit(EV_GAME_STATE_CHANGED);
        console.log(this.item);
    }

    /**
     * アイテムの状態を反転します
     * @param {String} name 
     */
    setItemState(name) {
        this.item[name] = !this.item[name];
        this.emit(EV_GAME_STATE_CHANGED);
    }

    /**
     * ミッションの状態を変更します
     * @param {Number} number 0 | 1 | 2
     */
    setMissonState(number) {
        this.mission[number] = true;
        setScore(Buildings.house.id, ...this.mission);
        this.emit(EV_GAME_STATE_CHANGED);
    }
}

const houseGameState = new HouseGameState();
export default houseGameState;