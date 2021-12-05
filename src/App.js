import React, { useRef, useState } from 'react'
import store from './Store';
import Title from './Scenes/Title';
import Select from './Scenes/Select';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scene: 'title'
        };
    }

    onChangeStore = () => {
        const scene = store.getState();
        this.setState({ scene });
    };

    /**
     * コンポーネントがマウントされた（ツリーに挿入された）直後に呼び出されます．
     * 'scene_changed'イベントを検知して，this.onChangeStoreを実行します．
     */
    componentDidMount() {
        store.on('scene_changed', this.onChangeStore);
        console.log("doomに插入");
    }

    /**
     * コンポーネントが DOM から削除されるときに呼び出されます．
     */
    componentWillUnmount() {
        store.off('scene_changed', this.onChangeStore);
        console.log("doomから削除");
    }

    render() {
        return (
            <div className="App">
                {this.renderComponent()}
            </div>
        );
    }

    renderComponent(){
        const { scene } = this.state.scene;

        switch(scene){
            case 'title': return <Title/>;
            case 'select': return <Select/>;
            case 'game': return <Game/>;
            default: console.error(`${scene} does not exist.`); return <Title/>
        }
    }
}

export default App;

