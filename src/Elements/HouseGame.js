import React, { Suspense, useRef, useState, useEffect } from 'react'
import Countdown from 'react-countdown';

import Store from '../Utils/Store';
import Text from '../Utils/Text';
import { Game_Canvas, Block_Right_End, Block_Column_End } from '../Utils/GlobalStyles';
import Button from '../Utils/Button';
import StarScore from '../Utils/StarScore';
import Money from '../Utils/Money'
import Inventory from '../Utils/Inventory';

import backButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-05.png';
import mission from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_4-26-26.png';
import nextButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_NEWpng-33.png';
import retyrButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_NEWpng-34.png';
import tipsButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_NEWpng-35.png';
import checkmark from '../Assets/Images/checked-29.png';

//スコア
import { addCoin, setScore, getScore, setMissionScore, getMissionScore } from '../Utils/LocalStorage';
//建物情報
import Buildings from '../Constants/Buildings';

// テスト用
import itemImage from '../Assets/Images/Items/NightStarJP.png';

import HouseGameStage from './HouseGameStage';

import styled from 'styled-components';
import Color from "../Constants/Color";


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

    /*limit: 制限時間*/
    const [limit, setlimit] = useState(10000);
    //星のフラグ
    //const [star1, setstar1] = useState(true);
    //const [star2, setstar2] = useState(false);
    //const [star3, setstar3] = useState(false);
    
    // ゲームクリアかゲーム中かのフラグ
    const [flag, setflag] = useState(false);

    //ミッション欄の初期化
    /*const [mission_key, setmission_key] = useState(true);
    if(mission_key){
        setMissionScore(Buildings.house.id, false, false, false)
        setmission_key(!mission_key);
    }*/
    

    return (
        <Suspense fallback={"Loading"}>
            <Game_Canvas key={key}>
                <Countdown
                    date={Date.now() + 500000}
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

    const [star1, setStar1] = useState(false);
    const [star2, setStar2] = useState(false);
    const [star3, setStar3] = useState(false);

    
    //console.log(time, star1, star2, star3);
    //setMissionScore(Buildings.house.id, star1, star2, star3)
    //setScore(Buildings.house.id, star1, star2, star3)

    // アイテムをクリックした時の処理
    //突っ張り棒
    const handleClickItem1 = () => {
        // ここにアイテムをクリックした時の処理を記述します
        setItem1(!item1); 
        setStar2(!star2);
    };
    //すべりどめ
    const handleClickItem2 = () => {
        setItem2(!item2);
        setStar3(!star3);
    };

    return (
        <>
            <Text text={String(time)} />
            <MissionUI />
            <Check/>
            <Inventory
                items={[
                    item1 ? <img src={itemImage} onClick={() => handleClickItem1()} /> : null,
                    item2 ? <img src={nextButton} onClick={() => handleClickItem2()} /> : null,
                ]}
            />
            <HouseGameStage time={time} isUseItem1={item1} />
        </>
    );
}

/**
    * クリア後のみに使用するコンポーネントです
    */
const ClearComponent = ({ time, limit, keyhandler}) => {
    const [coin, setcoin] = useState(0);
    const [coinflag, setcoinflag] = useState(true);
    const [star1, setstar1] = useState(getScore(Buildings.house.id)[0]);
    const [star2, setstar2] = useState(getScore(Buildings.house.id)[1]);
    const [star3, setstar3] = useState(getScore(Buildings.house.id)[2]);

    if(coinflag==true){
        if(star1== true && star2==true && star3==true){
            setcoin(1000);  
            setcoinflag(!coinflag);    
        }else if((star1==true && star2==true && star3==false) || (star1==true && star2==false && star3==true) || (star1==false && star2==true && star3==true)){
            setcoin(500);
            setcoinflag(!coinflag);    
        }else if((star1==true && star2==false && star3==false) || (star1==false && star2==true && star3==false) || (star1==false && star2==false && star3==true)){
            setcoin(250); 
            setcoinflag(!coinflag);   
        }else{
            setcoin(0);  
            setcoinflag(!coinflag);  
        }
    }   

    useEffect(() => {
        addCoin(coin) ;
    });
    
    //setScore(Buildings.house.id, star1, star2, star3) ;

    return (
        <>
            <MissionUI />
            <Check/>
            <ClearTime time={time} limit={limit / 1000} />
            <Clear handler={keyhandler}/>
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


/**
 * 別なファイルに分けて，他ステージでも使用できるようにした方が良いかもです
 * 多分，インベントリと同じでできるはず...
 */
function MissionUI() {
    
    return (
        <>
            <Setting src={mission} top={"20%"} left={"0%"} width={'20%'} height={'50%'} opacity={'0.9'} />
            <AnyText fontsize={"1vw"} top={"33%"} left={"5%"}>{"Protect yourself"}</AnyText>
            <AnyText fontsize={"1vw"} top={"36.5%"} left={"5%"}>{"Prevent the bookshelf from tipping over"}</AnyText>
            <AnyText fontsize={"1vw"} top={"41.5%"} left={"5%"}>{"Prevent the lamp from tipping over"}</AnyText>
            
        </>
    );
}

function Check() {
    //const [mission1, setmission1] = useState(getMissionScore(Buildings.house.id)[0]);
    //const [mission2, setmission2] = useState(getMissionScore(Buildings.house.id)[1]);
    //const [mission3, setmission3] = useState(getMissionScore(Buildings.house.id)[2]);
    const mission1 = getMissionScore(Buildings.house.id)[0];
    const mission2 = getMissionScore(Buildings.house.id)[1];
    const mission3 = getMissionScore(Buildings.house.id)[2];
    //console.log(mission1, mission2, mission3)
    

    return (
        <>
            {mission1 ? <Setting src={checkmark} top={"32%"} left={"14.5%"} width={'3%'} height={'3%'} opacity={'1'} /> : null}
            {mission2 ? <Setting src={checkmark} top={"36.5%"} left={"14.5%"} width={'3%'} height={'3%'} opacity={'1'} /> : null}
            {mission3 ? <Setting src={checkmark} top={"41%"} left={"14.5%"} width={'3%'} height={'3%'} opacity={'1'} /> : null}

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