import React, { Suspense, useState, useEffect } from 'react'
import Countdown from 'react-countdown';
import styled from 'styled-components';

import Store from '../Utils/Store';
import Text from '../Utils/Text';
import { Game_Canvas } from '../Utils/GlobalStyles';

import backButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-05.png';
import Buildings from '../Constants/Buildings';

import HouseGameStage from './HouseGameStage';
import GameResult from './GameResult';
import { getLanguage } from '../Utils/LocalStorage';


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

    // リザルトのテキスト
    const [tipsText, setTipsText] = useState(['']);

    // ゲーム開始時の処理
    useEffect(() => {
        if (getLanguage() == 'en') {
            setTipsText('If you are suddenly struck by a large tremor, try to protect yourself safely first.\nShelves, items on shelves, TVs, etc. may fall, so move away and wait for the shaking to stop.\nIn recent years, 30-50% of all injuries caused by earthquakes are due to furniture falling or being moved. It is important to take measures in advance to prevent furniture from tipping over, falling, or moving.');
        } else {
            setTipsText('突然大きな揺れに襲われたときは、まずは自分の身を安全に守れるように心がけましょう。\n 棚や棚に乗せてあるもの、テレビなどが落ちてきたりするので、離れて揺れが収まるのを待ちましょう。\n 近年の地震による負傷者の30～50％は、家具類の転倒・落下・移動が原因です。事前に器具による家具類の転倒・落下・移動防止対策を行うことが大切です．');
        }
    }, []);

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
                                stageID={Buildings.house.id}
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