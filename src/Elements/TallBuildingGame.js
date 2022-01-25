import React, { Suspense, useState, useEffect } from 'react'
import Countdown from 'react-countdown';
import styled from 'styled-components';

import Store from '../Utils/Store';
import Text from '../Utils/Text';
import { Game_Canvas } from '../Utils/GlobalStyles';

import backButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-05.png';
import Buildings from '../Constants/Buildings';

import TallBuildingGameStage from './TallBuildingGameStage';
import GameResult from './GameResult';
import { getLanguage } from '../Utils/LocalStorage';

/**
 * TallBuildingステージのゲーム部分です
 * Countdownコンポーネントはコンポーネントがアップデートされると（useStateの更新とか），
 * タイマーが初期化されます．
 * 
 * なので，TallBuildingでは，ゲームコンポーネント，クリアコンポーネントのどちらか一方を使用し，
 * 共通で使用する箇所はなるべく排除してます
 * 
 */
export default function TallBuildingGame() {

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
        if (getLanguage() == 'en' && !isGameOver) {
            setTipsText('English text to be displayed on the game clear screen.');
        } else if (getLanguage() == 'ja' && !isGameOver) {
            setTipsText('ゲームクリア画面で表示する日本語のテキスト');
        } else if (getLanguage() == 'ja' && isGameOver) {
            setTipsText('English text displayed on the game over screen.');
        } else if (getLanguage() == 'ja' && isGameOver) {
            setTipsText('ゲームオーバー画面で表示する日本語のテキスト');
        }
    }, []);

    return (
        <Suspense fallback={"Loading"}>
            <Game_Canvas>
                <Countdown
                    date={Date.now() + Buildings.tallBuilding.totalTime * 1000}
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
                                stageID={Buildings.tallBuilding.id}
                                stageName={Buildings.tallBuilding.name}
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
            <TallBuildingGameStage time={time} isGameOver={isGameOver} isCompleted={isCompleted} />
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