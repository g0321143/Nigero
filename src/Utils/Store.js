const { EventEmitter } = require("events");

export const EV_SCENE_CHANGED = 'scene_changed';
export const EV_BUILDING_CHANGED = 'building_changed';
export const EV_DIFFICULTY_CHANGED = 'difficulty_changed';

class Store extends EventEmitter {

    /**
     * 現在のシーンを取得します．
     * @returns 現在のシーン
     */
    getState() {
        return {
            scene: this.scene,
        };
    }

    /**
     * 画面を切り替える関数です．
     * 呼び出すと自作の'scene_changed'イベントが呼び出されます．
     * App.jsでこのイベントの発生を検知して，画面が切り替わります．
     * @param {string} scene 
     */
    setScene(scene) {
        this.scene = scene;
        console.log(`scene = ${scene}`);
        this.emit(EV_SCENE_CHANGED);
    }

    /**
     * 現在の建物と難易度を取得します．
     * @returns 現在のステージと難易度
     */
    getStage() {
        return {
            building: this.building,
            difficulty: this.difficulty,
        };
    }

    /**
     * ゲームに使用する建物を設定する関数です．
     * 呼び出すと自作の'building_changed'イベントが呼び出されます．
     * Select.jsでこのイベントの発生を検知して，難易度選択画面へ切り替わります．
     * @param {string} building 
     */
    setBuilding(building) {
        this.building = building;
        console.log(`building = ${building}`);
        this.emit(EV_BUILDING_CHANGED);
    }

    /**
     * ゲームに使用する建物を設定する関数です．
     * 呼び出すと自作の'difficulty_changed'イベントが呼び出されます．
     * Select.jsでこのイベントの発生を検知して，ゲーム画面へ切り替わります．
     * @param {string} building 
     */
    setDifficulty(difficulty) {
        this.difficulty = difficulty;
        console.log(`difficulty = ${difficulty}`);
        this.emit(EV_DIFFICULTY_CHANGED);
    }
}

const store = new Store();
export default store;