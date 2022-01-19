import React, { Suspense, useState } from 'react'
import Countdown from 'react-countdown';
import styled from 'styled-components';

import Store from '../Utils/Store';
import Text from '../Utils/Text';
import { Game_Canvas } from '../Utils/GlobalStyles';

import backButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-05.png';
import Buildings from '../Constants/Buildings';

import HouseGameStage from './HouseGameStage';
import GameResult from './GameResult';

const tipsText = 'Fusce eu elit dignissim, malesuada est vel, iaculis eros. Praesent mi sapien, rutrum et mauris sed, vestibulum egestas felis. Nulla eu commodo leo. Pellentesque iaculis tempor venenatis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed sit amet erat ac tortor interdum ultricies. Pellentesque et nisl eget nunc .';


/**
 * ハウスステージのゲーム部分です
 * Countdownコンポーネントはコンポーネントがアップデートされると（useStateの更新とか），
 * タイマーが初期化されます．
 * 
 * なので，HouseGameでは，ゲームコンポーネント，クリアコンポーネントのどちらか一方を使用し，
 * 共通で使用する箇所はなるべく排除してます
 * 
 */
export default function HouseGame() {

    // このkeyを更新すると<Countdown />が新しく生成されます
    const [key, setkey] = useState(false);

    // ゲームオーバーになったかどうか
    const [isGameOver, gameOver] = useState(false);

    // ゲームが完了したかどうか
    const [isComplete, completed] = useState(false);

    return (
        <Suspense fallback={"Loading"}>
            <Game_Canvas>
                <Countdown
                    date={Date.now() + Buildings.house.totalTime * 1000}
                    key={key}
                    renderer={(props) => {
                        const time = props.minutes * 60 + props.seconds;
                        return isComplete || isGameOver ?
                            <GameResult
                                keyhandler={() => {
                                    gameOver(false);
                                    completed(false);
                                    setkey(!key);
                                }}
                                isClear={!isGameOver}
                                getCoin={3000}
                                stageName={Buildings.house.name}
                                tipsText={tipsText}
                            /> :
                            <GameComponent
                                time={time}
                                isGameOver={(value) => gameOver(value)}
                                isCompleted={(value) => completed(value)}
                            />
                    }}
                />
            </Game_Canvas>
        </Suspense>
    );
}

/**
     * ゲーム中のみに使用するコンポーネントです
     */
const GameComponent = ({ time, isGameOver, isCompleted }) => {

    return (
        <>
            <Text text={String(time)} />
            <HouseGameStage time={time} isGameOver={isGameOver} isCompleted={isCompleted} />
            <Setting
                onClick={() => Store.resetStage()}
                src={backButton}
                margin={'0%'}
                top={'85%'}
                left={"88%"} width={'10%'} height={'10%'} opacity={'0.9'}
            />
        </>
    );
}


const Setting = styled.div`
    display:flex;
    position: absolute;
    width: ${props => props.width};
    height: ${props => props.height};
    
    margin: ${props => props.margin};
    top: ${(props) => props.top};
    left: ${(props) => props.left};

    background-image: url(${props => props.src});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    opacity: ${(props) => props.opacity};
    z-index: 999;

    :hover {
        cursor: pointer;
        opacity: 1;
    }
`;