import React, { useState } from 'react'

import Store, {EV_SCENE_CHANGED} from './Utils/Store';
import { initLocalStorage } from './Utils/LocalStorage';

import Title from './Scenes/Title';
import Select from './Scenes/Select';
import Option from './Scenes/Option';
import Game from './Scenes/Game';

class App extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = {
            scene: 'title',
            building: "",
            stage: 0,
        };

        initLocalStorage();
    }

    onChangeStore = () => {
        const state = Store.getState();
        this.setState(state);
    };

    /**
     * コンポーネントがマウントされた（ツリーに挿入された）直後に呼び出されます．
     * 'scene_changed'イベントを検知して，this.onChangeStoreを実行します．
     */
    componentDidMount() {
        Store.on(EV_SCENE_CHANGED, this.onChangeStore);
    }

    /**
     * コンポーネントが DOM から削除されるときに呼び出されます．
     */
    componentWillUnmount() {
        Store.off(EV_SCENE_CHANGED, this.onChangeStore);
    }

    /**
     * ここに描画したコンポーネントを記述します．
     * @returns レンダリング結果
     */
    render() {
        return (
            <div className="App">
                {this.renderComponent()}
            </div>
        );
    }

    /**
     * sceneによって描画するコンポーネントを切り替えます．
     * @returns 描画するコンポーネント
     */
    renderComponent() {
        const scene = this.state.scene;
        const isSelectedBuilding = () => this.state.building === '' ? false : true;
        console.log(this.state);
        

        switch (scene) {
            case 'title': return <Title />;
            case 'select': return <Select isSelectedBuilding={isSelectedBuilding}/>;
            case 'option': return <Option />;
            case 'game': return <Game />;
            default: console.error(`"${scene}" は存在しない画面です.`); return <Title />
        }
    }
}

export default App;

