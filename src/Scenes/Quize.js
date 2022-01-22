import React, { Suspense, useRef, useEffect, useState } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");
import styled from 'styled-components';

import { Game_Canvas, Block_Right_End } from '../Utils/GlobalStyles';
import Color from "../Constants/Color";
import Button from '../Utils/Button';
import Store from '../Utils/Store';
import Buildings from '../Constants/Buildings';

//スコア
import { addCoin, getCoin } from '../Utils/LocalStorage';

import backButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-05.png';
import TexBox from '../Assets/Images/QUIZ_BOX.png';
import nextButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_NEW-33.png';
import Closebutton from '../Assets/Images/CLOSETAB-08.png';
import Yesbutton from '../Assets/Images/1-05.png';
import Notbutton from '../Assets/Images/1-06.png';
import Background1 from '../Assets/Images/House_stage_background.png';
import Background2 from '../Assets/Images/office_stage_background.png';
import Background3 from '../Assets/Images/Elevator_stage_background.png';
import CoinImage from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-12.png';


// [問題文, 正解が〇ならture,×ならflase]

const List = [[["If you feel a big tremor while cooking, you should turn off the fire as soon as possible.", false, "It is dangerous to approach a fire during a tremor. After the shaking stops, take care of the fire without panicking."],
    ["The danger of tsunami is only near the ocean, not in rivers.", false, "Tsunami is not only a threat near the ocean. Tsunamis come from downstream to upstream, so evacuate quickly and at right angles to the flow of the river."],
    [ "The most reliable way to prevent furniture from tipping over, falling, or moving during an earthquake is to screw it to the wall with L-shaped metal fittings.", true, "If screwing is difficult, the effect can be enhanced by combining a sticking rod with a stopper system or a sticking rod with an adhesive mat."],
    ["It is good to buy a little more food and daily necessities on a daily basis.", true, "Until now, the idea of stockpiling for disasters has been taken for granted as a special kind of preparation that involves preparing items that are not normally used, such as dry bread. However, [daily stockpiling,] in which you buy a little extra food and daily necessities that you use on a regular basis, is an easy way to stockpile."],
    ["It is important to prepare for damage to lifelines and stagnation of supply on a daily basis, and to have the necessary items in case of a disaster.", true, "In the event of a major earthquake, lifelines such as electricity, water, and gas may not be available, and the supply of food and other daily necessities may stop. Make sure you are prepared with the necessary items to live at home on a daily basis."],
    ["If you need to evacuate during a power outage, turn off the breaker before evacuating.", true, "If there is an electrical appliance that has been switched on in the fallen household goods, there is a risk of fire after the power is resumed."],
    ["During an earthquake, if you are on the second floor of an old building, you should immediately go down to the first floor.", false, "Do not rush down to the first floor because the building may collapse and crush your body. If the building does not meet seismic resistance standards, decide whether you should go outside or not, depending on the situation."]],
    
    [["In condominiums, the only way to evacuate in case of emergency, such as in case of fire, is through the front door.", false, "Balconies and verandas are equipped with [separation boards] between neighboring units that can be kicked through in case of fire or other emergencies, and [evacuation hatches] that contain ladders for evacuating downstairs."],
    ["The first and foremost priority at the moment of an earthquake is to secure evacuation routes.", false, "First of all, take action to protect your own life. Move to a safe place, such as under a desk, where things will not fall, fall over, or move."],
    ["When the power goes out due to an earthquake, it is best not to turn on the breaker or the light switch.", true, "Do not touch the breaker or the light switch as there is a risk of fire or explosion in case of gas leakage. Of course, the use of lighters is also strictly prohibited."],
    ["During an evacuation, the only way to contact family and friends to let them know that you are safe is to keep calling them directly on their cell phones.", false, "Prepare multiple means of communication in case the lines go down and phone lines are down."],
    ["A wire that is cut and hanging down is not electrified, so there is no danger of electric shock.", false, "Wires that are broken or hanging down may be electrified and pose a risk of electric shock. Do not approach them and never touch them. The same goes for trees, signs, etc. that are in contact with power lines."],
    ["If you are in a crowded area, it is safer to move away from the crowd as soon as possible after a major tremor occurs.", false, "Suddenly running off in a crowded place can cause mass panic, which may lead to an unexpected accident."]],
    
    [["Do not use elevators during typhoons or heavy rain.", true, "If power lines are cut by a storm, the power may be cut and you may be trapped in an elevator. During a typhoon or heavy rain, try to use the stairs as much as possible."],
    ["Foreigners are included in the [persons requiring consideration] who must be taken into account in the event of a disaster.", true, "Since they may be anxious due to differences in lifestyle and culture, or because they may not understand the language, take care to give them proper information."],
    ["Don't forget to pack batteries for the portable radio in your emergency kit.", false, "Leaving batteries in appliances that are not in regular use can cause them to leak or run out. Remove the dry batteries from your portable radio."],
    ["AA and AA batteries are the same length, just different in thickness.", true, "The only difference is the thickness, so you can wrap a piece of cloth around the AA battery and use it instead of the AA battery. When the diameter reaches 2.6 cm, fasten it with cellophane tape."],
    ["A [hazard map] is a map that shows the estimated damage areas, evacuation sites, evacuation routes, and other information for disaster mitigation and disaster prevention.", true, "Make sure to check the risk of flooding, landslides, and liquefaction in your area."]]]
    

export default function Quize({ building }) {
    // ステージで問題文を変更するための変数
    const [buildingNo, setBuildingNo] = useState(0);
    const [flag, setflag] = useState(true);
    const [BackGroundImage, setBackGroundImage] = useState(Background1);

    console.log(building);

    if(flag && building == Buildings.house.id){
        setBuildingNo(0);
        setBackGroundImage(Background1);
        setflag(!flag);
    }else if(flag && building == Buildings.tallBuilding.id){
        setBuildingNo(1);
        setBackGroundImage(Background2);
        setflag(!flag);
    }else if(flag && building == Buildings.elevator.id){
        setBuildingNo(2);
        setBackGroundImage(Background3);
        setflag(!flag);
    }
    
    return (
        <Game_Canvas>
            
            <Setting src={BackGroundImage} top={"0%"} left={"0%"} width={'100%'} height={'100%'} opacity={'0.9'}/>
            <Setting src={TexBox} top={"20%"} left={"0%"} width={'100%'} height={'50%'} opacity={'0.9'}/>
            <QuizeUI buildingNo={buildingNo}/>
            <Block_Right_End>
                <Button
                    handler={() => Store.resetStage()}
                    src={backButton}
                    width={'6%'}
                    height={'10%'}
                    margin={'1%'}
                />
            </Block_Right_End>       
        </Game_Canvas>
    );
}


const QuizeUI = ({buildingNo}) => {

    const [seikai, setSeikai] = useState(0);    // 現在の連続正解数
    const [seikai_max, setSeikai_max] = useState(0);    // 最大連続正解数
    const [No, setNo] = useState(1);    // 現在の問題番号
    const [flag, setflag] = useState(true); // true:問題文表示，false:回答表示
    const [result, setResult] = useState(Notbutton);
    // 〇を選択した場合
    const maru = () => {
        if(List[buildingNo][No-1][1] == true){
            setSeikai(seikai+1);
            setResult(Yesbutton);
        }else if(seikai > seikai_max){
            setSeikai_max(seikai);
            setSeikai(0);
            setResult(Notbutton);
        }
        setflag(!flag);
    };
    // ×を選択した場合
    const batu = () => {
        if(List[buildingNo][No-1][1] == false){
            setSeikai(seikai+1);
            setResult(Notbutton);
        }else if(seikai > seikai_max){
            setSeikai_max(seikai);
            setSeikai(0);
            setResult(Yesbutton);
        }
        setflag(!flag);
    }
    // 次の問題に進む
    const next = () => {
        setNo(No + 1);
        setflag(!flag);
    }

    // コインが上手く加算されない!!!
    // 最後の答え合わせ画面に進んだときに最大連続正解数に応じてコインを加算
    useEffect(() => {
        if(No == List[buildingNo].length && !flag){
            if(seikai > seikai_max){
                setSeikai_max(seikai);
                setSeikai(0);
            }
            addCoin(seikai_max*1000);
            console.log("addCoin");
            
        }
    });
    
    const [coin, setCoin] = useState(0);
    useEffect(() => {
        const coin = getCoin();
        console.log("getCoin", coin);
    })


    console.log(List[buildingNo].length, No, seikai, seikai_max)

    // 問題表示，回答表示，最後の回答表示（nextボタンを消失）
    if(No <= List[buildingNo].length && flag){
        return (
            <>
            <HedText>{"Quiz " + No + " !"}</HedText>
            <AnyText >{List[buildingNo][No-1][0]}</AnyText>
            <Setting onClick={() => maru()} src={Yesbutton} top={"30vw"} left={"40%"} width={'10%'} height={'10%'} opacity={'0.9'} />
            <Setting onClick={() => batu()} src={Notbutton} top={"30vw"} left={"50%"} width={'10%'} height={'10%'} opacity={'0.9'} />
            
            </>
        );
    }else if(No <= List[buildingNo].length && !flag){
        
        return (
            <>
                <HedText>{"Answer " + No + " !"}</HedText>      
                <AnyText >{List[buildingNo][No-1][2]}</AnyText>
                <Setting src={result} top={"30vw"} left={"45%"} width={'10%'} height={'10%'} opacity={'0.9'} />
                <UsedButton onClick={() => next()} src={nextButton} top={"40vw"}/>
                <UsedButton onClick={() => Store.resetStage()} src={Closebutton} top={"45vw"} />
                
            </>
        );
    }else{
        return (
            <>
                <HedText>{"Result !"}</HedText>
                <AnyText >{"YOU`VE GOT"}</AnyText>
                <Setting src={CoinImage} top={"25vw"} left={"35%"} width={'10%'} height={'10%'} opacity={'0.9'} />
                <CoinText>{seikai*1000}</CoinText>
                <UsedButton onClick={() => Store.resetStage()} src={Closebutton} top={"40vw"}/>
            </>
        );
    }
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
    position: absolute;
    width: 50%;
    height: 3vw;
    top: 30%;
    left: 25%;
    font-size: 2vw;
    color: ${Color.slightlyGrayishYellow};
    font-weight: bold;
    justify-content: flex-end;
    text-align: center;
    user-select: none;
    user-drag: none;
  
    z-index: 999;
`;

const CoinText = styled.div`
    position: absolute;
    width: 100%;
    height: 3vw;
    top: 43.5%;
    font-size: 6vw;
    color: ${Color.slightlyGrayishYellow};
    font-weight: bold;
    justify-content: flex-end;
    text-align: center;
    user-select: none;
    user-drag: none;
    z-index: 999;
`;


const HedText = styled.div`
    position: absolute;
    width: 100%;
    height: 3vw;
    top: 10%;
    font-size: 3vw;
    color: ${Color.slightlyGrayishYellow};
    font-weight: bold;
    justify-content: flex-end;
    text-align: center;
    user-select: none;
    user-drag: none;
    z-index: 999;
`;


const UsedButton = styled.img`
    display: flex;
    position: absolute;
    width: 15vw;
    margin-top: ${(props) => props.top};
    margin-left: 43%;
    margin-bottom: 1vw;
    url(${(props) => props.src});
    z-index: 999;
    opacity: 0.9;
    :hover {
        cursor: pointer;
        opacity: 1;
    }
`;
