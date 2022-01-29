import React, { Suspense, useState, useEffect } from 'react'
import Countdown from 'react-countdown';
import styled from 'styled-components';

import Store from '../Utils/Store';
import Text from '../Utils/Text';
import { Game_Canvas } from '../Utils/GlobalStyles';

import backButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-05.png';
import Buildings from '../Constants/Buildings';

import ElevatorGameStage from './ElevatorGameStage';
import GameResult from './GameResult';
import { getLanguage } from '../Utils/LocalStorage';

/**
 * Elevatorステージのゲーム部分です
 * Countdownコンポーネントはコンポーネントがアップデートされると（useStateの更新とか），
 * タイマーが初期化されます．
 * 
 * なので，Elevatorでは，ゲームコンポーネント，クリアコンポーネントのどちらか一方を使用し，
 * 共通で使用する箇所はなるべく排除してます
 * 
 */
export default function ElevatorGame() {

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
            setTipsText('As a general rule, you should press the buttons on all floors and get off at the first floor that stops, but it is also important to assess the situation on the floor instead of rushing to get off at the floor that stops.During an earthquake, many people are expected to be trapped as well. They may not be able to rush to your rescue immediately.If you are trapped in an elevator, do not panic, but remain calm and make an effort to contact the elevator using the "emergency call button" or other means.\nThere may be an emergency stockpile box for elevators.If you are trapped in an elevator, emergency supplies such as drinking water, food, toilet kits, flashlights, radios, tissues, blankets, etc., which you will need until help arrives, are stored in the box, so make use of it in case of emergency.');
        } else {
            setTipsText('全ての階のボタンを押し、最初に停止した階でおりるのが原則ですが、停止した階で慌てておりるのではなく、階の状況を見極めるのも大切です。\n地震の時は同様に閉じこめられている人も大勢いると予想されます。救助にすぐに駆けつけてくれるとは限りません。\nエレベーターに閉じこめられても、焦らず冷静になって「非常用呼び出しボタン」等での連絡を取る努力をしましょう。\nエレベーター用防災備蓄ボックスがあることがあります。');
        }
    }, []);

    return (
        <Suspense fallback={"Loading"}>
            <Game_Canvas>
                <Countdown
                    date={Date.now() + Buildings.elevator.totalTime * 1000}
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
                                stageID={Buildings.elevator.id}
                                stageName={Buildings.elevator.name}
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
            <ElevatorGameStage time={time} isGameOver={isGameOver} isCompleted={isCompleted} />
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