const { EventEmitter } = require("events");

class Store extends EventEmitter {
    
    scene = 'title';

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
        this.emit('scene_changed');
    }
}

const store = new Store();
export default store;