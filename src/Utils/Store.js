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
        console.log(`set scene : ${scene}`);
        this.emit(EV_SCENE_CHANGED);
    }

    /**
     * ゲームで使用する建物を登録する関数です．
     * @param {string} building 
     */
    setBuilding(building) {
        this.state.building = building;
        console.log(`set building : ${building}`);
    }

    resetbuilding(){
        this.state.building = '';
        this.state.scene = 'select';
        console.log('set scene : select');
        this.emit(EV_SCENE_CHANGED);
    }

    /**
     * ゲームで使用するステージを登録する関数です．
     * @param {string} stage 
     */
    setStage(stage) {
        this.state.stage = stage;
        console.log(`set stage : ${stage}`);
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

    resetStage(){
        this.state.stage = '';
        this.state.scene = 'select';
        console.log('set scene : select');
        this.emit(EV_SCENE_CHANGED);
    }
}

const store = new Store();
export default store;