import React, { useState } from 'react'

import Store from './Utils/Store';

import Title from './Scenes/Title';
import Select from './Scenes/Select';
import Option from './Scenes/Option';
import Game from './Scenes/Game';
import { getCookie, setCookie } from './Utils/Cookie';

class App extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = {
            scene: 'title'
        };
        
        if(getCookie("coin") == ""){
            setCookie("coin", 0);
        }
    }

    onChangeStore = () => {
        const scene = Store.getState();
        this.setState({ scene });
    };

    /**
     * コンポーネントがマウントされた（ツリーに挿入された）直後に呼び出されます．
     * 'scene_changed'イベントを検知して，this.onChangeStoreを実行します．
     */
    componentDidMount() {
        Store.on('scene_changed', this.onChangeStore);
    }

    /**
     * コンポーネントが DOM から削除されるときに呼び出されます．
     */
    componentWillUnmount() {
        Store.off('scene_changed', this.onChangeStore);
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
        const { scene } = this.state.scene;

        switch (scene) {
            case 'title': return <Title />;
            case 'select': return <Select />;
            case 'option': return <Option />;
            case 'game': return <Game />;
            default: console.error(`"${scene}" は存在しない画面です.`); return <Title />
        }
    }
}

export default App;

