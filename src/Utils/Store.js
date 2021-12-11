const { EventEmitter } = require("events");

export const EV_SCENE_CHANGED = 'scene_changed';

class Store extends EventEmitter {

    state = {
        scene: "title",
        building: "",
        stage: 0,
    }

    /**
     * 現在のシーンを取得します．
     * @returns 現在のシーン
     */
    getState() {
        return this.state;
    }

    /**
     * 画面を切り替える関数です．
     * 呼び出すと自作の'scene_changed'イベントが呼び出されます．
     * App.jsでこのイベントの発生を検知して，画面が切り替わります．
     * @param {string} scene 
     */
    setScene(scene) {
        this.state.scene = scene;
        console.log(`scene = ${scene}`);
        this.emit(EV_SCENE_CHANGED);
    }

    /**
     * 現在の建物と難易度を取得します．
     * @returns 現在の建物とステージ
     */
    getStage() {
        return {
            building: this.building,
            stage: this.stage,
        };
    }

    /**
     * ステージ選択画面からゲーム画面に移動する時に呼ぶ関数です．
     * 建物とステージを入力して，ゲーム画面に遷移させます．
     * @param {String} building 
     * @param {Number} stage 
     */
    startGame(building, stage) {
        this.state.building = building;
        this.state.stage = stage;
        this.setScene('game');
    }
}

const store = new Store();
export default store;