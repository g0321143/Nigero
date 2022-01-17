// 高層ビルのゲームモジュール
import React, { Suspense, useRef, useState, useEffect } from 'react'
import Countdown from 'react-countdown';

import Store from '../Utils/Store';
import Text from '../Utils/Text';
import { Game_Canvas, Block_Column_End } from '../Utils/GlobalStyles';
import Buildings from '../Constants/Buildings';
import StarScore from '../Utils/StarScore';
import Money from '../Utils/Money'
import Inventory from '../Utils/Inventory';

import backButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-05.png';
import mission from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_4-26-26.png';
import nextButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_NEWpng-33.png';
import retyrButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_NEWpng-34.png';
import tipsButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_NEWpng-35.png';
import checkmark from '../Assets/Images/checked-29.png';

// テスト用
import itemImage from '../Assets/Images/Items/NightStarJP.png';
import itemIcon1 from '../Assets/Images/Items/Icon/EMERGENCY_BAG-37.png';
import itemIcon2 from '../Assets/Images/Items/Icon/FIRE_FIGHT_BALL-37.png';
import itemIcon3 from '../Assets/Images/Items/Icon/FIRST_AID KIT-37.png';

import TallBuildingGameStage from './TallBuildingGameStage';

import styled from 'styled-components';
import Color from "../Constants/Color";



/**
 * ハウスステージのゲーム部分です
 * Countdownコンポーネントはコンポーネントがアップデートされると（useStateの更新とか），
 * タイマーが初期化されます．
 * 
 * なので，TallBuildingGameでは，ゲームコンポーネント，クリアコンポーネントのどちらか一方を使用し，
 * 共通で使用する箇所はなるべく排除してます
 * 
 */
export default function TallBuildingGame() {

    // このkeyを更新すると<Countdown />が新しく生成されます
    const [key, setkey] = useState(false);

    /*limit: 制限時間*/
    const [limit, setlimit] = useState(1000);

    return (
        <Suspense fallback={"Loading"}>
            <Game_Canvas key={key}>
                <Countdown
                    date={Date.now() + Buildings.tallBuilding.totalTime * 1000}
                    renderer={(props) => {
                        const time = props.minutes * 60 + props.seconds;
                        return props.completed ?
                            <ClearComponent
                                time={time}
                                limit={limit}
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


    // ゲームの進行に必要なフラグを記述します
    const [item1, setItem1] = useState(true);
    const [item2, setItem2] = useState(true);
    const [item3, setItem3] = useState(true);

    // アイテムをクリックした時の処理
    const handleClickItem1 = () => {
        // ここにアイテムをクリックした時の処理を記述します
        setItem1(!item1);
    };

    const handleClickItem2 = () => {
        setItem2(!item2);
    };

    const handleClickItem3 = () => {
        setItem3(!item3);
    };

    return (
        <>
            <Text text={String(time)} />
            <MissionUI />
            <Inventory
                items={[
                    item1 ? <img src={itemIcon1} onClick={() => handleClickItem1()} /> : null,
                    item2 ? <img src={itemIcon2} onClick={() => handleClickItem2()} /> : null,
                    item3 ? <img src={itemIcon3} onClick={() => handleClickItem3()} /> : null,
                ]}
            />
            <TallBuildingGameStage time={time} isUseItem1={item1} />
        </>
    );
}

/**
    * クリア後のみに使用するコンポーネントです
    */
const ClearComponent = ({ time, limit, keyhandler }) => {
    return (
        <>
            <MissionUI />
            <ClearTime time={time} limit={limit / 1000} />
            <Clear handler={keyhandler} />
        </>
    );
}

function Clear({ handler }) {

    return (
        <>
            <Money />
            <AnyText fontsize={"5vw"} top={"5%"} left={"35%"}>{":COMPLETE:"}</AnyText>
            <Block_Column_End>
                <StarScore
                    width={'200px'}
                    height={'200px'}
                    star1={true}
                    star2={false}
                    star3={false}
                />
            </Block_Column_End>
            <Setting onClick={() => Store.resetStage()} src={nextButton} top={"25%"} left={"80%"} width={'15%'} height={'15%'} opacity={'0.9'} />
            <Setting onClick={handler} src={retyrButton} top={"35%"} left={"80%"} width={'15%'} height={'15%'} opacity={'0.9'} />
            <Setting onClick={() => Store.resetbuilding()} src={tipsButton} top={"45%"} left={"80%"} width={'15%'} height={'15%'} opacity={'0.9'} />
        </>
    );
}

/**
 * 別なファイルに分けて，他ステージでも使用できるようにした方が良いかもです
 * 多分，インベントリと同じでできるはず...
 */
function MissionUI() {

    return (
        <>
            <Setting src={mission} top={"20%"} left={"0%"} width={'20%'} height={'50%'} opacity={'0.9'} />
            <AnyText fontsize={"1vw"} top={"33%"} left={"5%"}>{"Securing of personal security"}</AnyText>
            <AnyText fontsize={"1vw"} top={"37.5%"} left={"5%"}>{"Check of the fall"}</AnyText>
            <AnyText fontsize={"1vw"} top={"41.5%"} left={"5%"}>{"ほげ～"}</AnyText>
            <Check />
        </>
    );
}

function Check() {
    const flag1 = true;
    const flag2 = true;
    const flag3 = true;
    return (
        <>
            {flag1 ? <Setting src={checkmark} top={"32%"} left={"14.5%"} width={'3%'} height={'3%'} opacity={'1'} /> : null}
            {flag2 ? <Setting src={checkmark} top={"36.5%"} left={"14.5%"} width={'3%'} height={'3%'} opacity={'1'} /> : null}
            {flag3 ? <Setting src={checkmark} top={"41%"} left={"14.5%"} width={'3%'} height={'3%'} opacity={'1'} /> : null}

        </>
    );
}

function ClearTime({ time, limit }) {
    const [time_s, settime_s] = useState(parseInt((limit - time) % 60));
    const [usertime_s, setusertime_s] = useState(('00' + time_s).slice(-2));
    const [time_m, settime_m] = useState(parseInt((limit - time) / 60));
    const [usertime_m, setusertime_m] = useState(('00' + time_m).slice(-2));

    return (<AnyText fontsize={"5vw"} top={"70%"} left={"44%"}>{usertime_m + ":" + usertime_s}</AnyText>);
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
    inline-size: 200px; 
    text-align: left;
    top: ${(props) => props.top};
    left: ${(props) => props.left};

    user-select: none;
    user-drag: none;

    z-index: 999;
`;