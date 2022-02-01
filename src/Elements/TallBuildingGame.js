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
        if (getLanguage() == 'en') {
            setTipsText('At work, protect yourself by staying away from cabinets, shelves, lockers, copy machines, etc., protect your head, and hide under a desk.\nStay away from windows as they may break.\nTo prevent injury from glass, wear slippers or put shatterproof film on the glass.\nWhen escaping outside, be careful of falling objects and avoid using elevators.');
        } else {
            setTipsText('職場ではキャビネットや棚、ロッカー、コピー機などから離れ、頭部を守り、机の下に隠れるなど身を守りましょう。\n窓ガラスが割れることがあるので、窓際から離れましょう。\nガラスによる怪我を防ぐには，スリッパを履くことや，ガラスに飛散防止フィルムを貼ることが有効です。\n外へ逃げるときは落下物などに注意し、エレベーターは使わないようにしましょう。');
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
                                getCoin={4000}
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