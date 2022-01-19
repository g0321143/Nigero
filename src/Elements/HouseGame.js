import React, { Suspense, useState, useEffect } from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import Countdown from 'react-countdown';
import styled from 'styled-components';
import Color from "../Constants/Color";

import Store from '../Utils/Store';
import Text from '../Utils/Text';
import { Game_Canvas, Block_Right_End, Block_Column_End } from '../Utils/GlobalStyles';
import StarScore from '../Utils/StarScore';
import Money from '../Utils/Money'
import HeaderText from '../Utils/HeaderText';
import { getScore } from '../Utils/LocalStorage';


import backButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-05.png';
import Buildings from '../Constants/Buildings';

import HouseGameStage from './HouseGameStage';
import GameResult from './GameResult';




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
                        return  isComplete || isGameOver ?
                            <GameResult
                                keyhandler={() => {
                                    gameOver(false);
                                    completed(false);
                                    setkey(!key);
                                }}
                                isClear={!isGameOver}
                                getCoin={3000}
                                StageName={Buildings.house.name}
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

/**
    * クリア後のみに使用するコンポーネントです
    */
const ClearComponent = ({ keyhandler, isClear }) => {

    const resultText = isClear ? 'Game Clear' : 'Game Over';
    const [score, setScore] = useState([false, false, false]);

    useEffect(() => setScore(getScore(Buildings.house.id)), []);

    return (
        <>
            <HeaderText text={resultText} />
            <Money />
            {isClear && <Block_Column_End>
                <StarScore
                    width={'10vw'}
                    star1={score[0]}
                    star2={score[1]}
                    star3={score[2]}
                />
            </Block_Column_End>}
            <ClearModelComponent />
        </>
    );
}

/**
    * クリア後に表示する3Dモデルです
    */
const ClearModelComponent = () => {

    return (
        <Canvas camera={{ position: [0, 6, 0], fov: 45 }}>
            <ambientLight intensity={0.2} />
        </Canvas>
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

const AnyText = styled.div`
    display: flex;
    position: absolute;
    font-size: ${(props) => props.fontsize};
    text-align: center;
    color: ${Color.slightlyGrayishYellow};
    font-weight: bold;
    inline-size: 145px; 
    text-align: left;
    top: ${(props) => props.top};
    left: ${(props) => props.left};

    user-select: none;
    user-drag: none;

    z-index: 999;
`;