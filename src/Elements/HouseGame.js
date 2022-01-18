import React, { Suspense, useRef, useState, useEffect } from 'react'
import Countdown from 'react-countdown';
import styled from 'styled-components';
import Color from "../Constants/Color";

import Store from '../Utils/Store';
import Text from '../Utils/Text';
import { Game_Canvas, Block_Right_End, Block_Column_End } from '../Utils/GlobalStyles';
import Button from '../Utils/Button';
import StarScore from '../Utils/StarScore';
import Money from '../Utils/Money'
import { addCoin, setScore, getScore } from '../Utils/LocalStorage';

import backButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-05.png';
import nextButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_NEWpng-33.png';
import retyrButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_NEWpng-34.png';
import tipsButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_NEWpng-35.png';

import Buildings from '../Constants/Buildings';

import HouseGameStage from './HouseGameStage';




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

    return (
        <Suspense fallback={"Loading"}>
            <Game_Canvas key={key}>
                <Countdown
                    date={Date.now() + Buildings.house.totalTime * 1000}
                    renderer={(props) => {
                        const time = props.minutes * 60 + props.seconds;
                        return props.completed ?
                            <ClearComponent
                                time={time}
                                keyhandler={() => setkey(!key)}
                            /> :
                            <GameComponent
                                time={time}
                            />
                    }}
                />
                <Setting
                    onClick={() => Store.resetStage()}
                    src={backButton}
                    margin={'0%'}
                    top={'85%'}
                    left={"88%"} width={'10%'} height={'10%'} opacity={'0.9'}
                />
            </Game_Canvas>
        </Suspense>
    );
}

/**
     * ゲーム中のみに使用するコンポーネントです
     */
const GameComponent = ({ time }) => {

    return (
        <>
            <Text text={String(time)} />
            <HouseGameStage time={time} />
        </>
    );
}

/**
    * クリア後のみに使用するコンポーネントです
    */
const ClearComponent = ({ time }) => {
    
    return (
        <>
            <Money />
            <HouseGameStage time={time}/>
        </>
    );
}

function Clear({ handler}) {

    return (
        <>
            <Money />
            <AnyText fontsize={"5vw"} top={"5%"} left={"35%"}>{":COMPLETE:"}</AnyText>
            <Block_Column_End>
                <StarScore
                    width={'100px'}
                    height={'100px'}
                    star1={getScore(Buildings.house.id)[0]}
                    star2={getScore(Buildings.house.id)[1]}
                    star3={getScore(Buildings.house.id)[2]}
                />
            </Block_Column_End>
            <Setting onClick={() => Store.resetStage()} src={nextButton} top={"25%"} left={"80%"} width={'15%'} height={'15%'} opacity={'0.9'} />
            <Setting onClick={handler} src={retyrButton} top={"35%"} left={"80%"} width={'15%'} height={'15%'} opacity={'0.9'} />
            <Setting onClick={() => Store.resetbuilding()} src={tipsButton} top={"45%"} left={"80%"} width={'15%'} height={'15%'} opacity={'0.9'} />
        </>
    );
}


function ClearTime({ time, limit }) {
    const [time_s, settime_s] = useState(parseInt((limit - time) % 60));
    const [usertime_s, setusertime_s] = useState(('00' + time_s).slice(-2));
    const [time_m, settime_m] = useState(parseInt((limit - time) / 60));
    const [usertime_m, setusertime_m] = useState(('00' + time_m).slice(-2));

    return (<AnyText fontsize={"5vw"} top={"15%"} left={"44%"}>{usertime_m + ":" + usertime_s}</AnyText>);
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