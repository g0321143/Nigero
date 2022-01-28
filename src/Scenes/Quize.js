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
import { addCoin, getCoin, getLanguage } from '../Utils/LocalStorage';

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

const List_en = [[["If you feel a big tremor while cooking, you should turn off the fire as soon as possible.", false, "It is dangerous to approach a fire during a tremor. After the shaking stops, take care of the fire without panicking."],
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

const List_ja = [[["料理中に大きな揺れを感じたら、\n\n一刻も早く火を消すべきである。", false, "揺れの最中に火に近づくのは危険です。揺れが収まってから、慌てずに火の始末をします。"],
    ["津波の危険があるのは、海の近くだけであり、川では津波の心配は無い。", false, "津波の心配があるのは、海のそばだけではありません。津波は、川下から川上に向かって押し寄せてくるので、川の流れに対して直角方向に素早く避難しましょう。"],
    [ "震災時の家具の転倒・落下・移動を防ぐための最も確実な方法は、壁にＬ字型の金具でネジ止めをすることである。", true, "ネジ止めが難しい場合は、突っ張り棒とストッパー式、突っ張り棒と粘着マットを組み合わせることで効果を高めることができます。"],
    ["日頃から食料品や生活必需品などは少し多めに購入するのが良い。", true, "これまでの災害用備蓄は、乾パンなどの普段使わないものを用意する特別な準備という考え方が当たり前でした。しかし、日頃利用している食料品や生活必需品を少し多めに購入しておく「日常備蓄」なら簡単に備蓄ができます。"],
    ["ライフライン被害や物資供給の停滞に備えて、日頃から災害時に必要なものを備えておくことが重要である。", true, "大規模な地震が起これば電気・水道・ガスなどのライフラインが使えなくなったり、食料品や生活必需品の供給が止まることが想定されます。日頃から自宅で生活する上で必要な物を備えておきましょう。"],
    ["停電時に避難が必要なときは、ブレーカーを落としてから避難する。ating.", true, "倒れた家財の中にスイッチが入った状態の電気製品があると、通電が再開した後に火災のおそれがあります。"],
    ["地震が発生した際、古い建物の２階にいるときは、すぐに１階に降りた方が良い。", false, "建物が倒壊して身体が押しつぶされる恐れがあるので、あわてて１階に降りてはいけません。耐震基準を満たしていない建物は、外に脱出すべきか状況をみて判断します。"]],
    
    [["マンションにおいては、火災発生の時など、いざというときには玄関から避難する方法しか想定されていない。", false, "ベランダやバルコニーには、火災発生時など、いざというときに蹴破って移動できる隣戸との間にある「隔て板」、下階避難用のはしごを収納した「避難ハッチ」などが設けられています。"],
    ["地震が発生したその瞬間、最優先で最初にやるべきことは避難経路の確保である。", false, "まず最初に、自分の命を守る行動をとりましょう。机の下など、物が「落ちてこない・倒れない・移動しない」安全な場所に移動しましょう。"],
    ["地震で停電したときは、ブレーカーや電気のスイッチを入れない方が良い。", true, "ガスが漏れていた場合に火災や爆発の危険があるのでブレーカーや電気のスイッチには触らないようにしましょう。もちろん、ライターの使用も厳禁です。"],
    ["避難時、家族や友人に安否連絡をする際は、相手の携帯電話に直接電話をかけ続けるしかない。", false, "回線がパンクし、電話が通じなクなることを想定し、連絡手段を複数用意しましょう。ＳＮＳも活用できます。"],
    ["切れて垂れ下がっている電線は、電気が通っていないので、感電の危険はない。", false, "切れたり、垂れ下がっている電線は、電気が通っている場合があり、感電の危険があります。近づかず、絶対に触らないこと。また、電線に樹木や看板などが接触している場合も同様です。"],
    ["人混みの中にいる場合、大きな揺れが起きたら一刻も早く人混みから離れた方が安全である。", false, "人混みで突然走り出す行為は集団パニックの原因となり、思わぬ事故になる危険があるので、まわりに配慮した行動を心がけましょう。"]],
    
    [["台風や大雨の時は、エレベーターを使わないようにする。", true, "暴風によって電線が切れると停電になり、エレベーターに閉じ込められるおそれがあります。台風や大雨のときは、なるべく階段を使うようにしましょう。"],
    ["外国人は、災害時に配慮しなければならない「要配慮者」に含まれている。", true, "生活文化の違いや言葉を理解できずに、不安を抱える可能性があるので、きちんと情報を伝えるように配慮しましょう。"],
    ["非常用持ち出し袋に入れる携帯ラジオには、忘れずに乾電池をセットしておく。", false, "普段から使用しない電化製品に電池を入れておくと、液漏れや消耗の原因になってしまいます。携帯ラジオの乾電池は外しておきましょう。"],
    ["単三電池と単二電池は、太さが違うだけで長さは同じである。", true, "太さが違うだけなので、単三電池に布などを巻き付けて、単二電池の代わりとすることができます。直径が2.6cmになったらセロハンテープでとめます。"],
    ["災害被害の軽減や防災対策のため、被害想定区域や避難場所、避難経路などの情報を表示した地図のことを「ハザードマップ」という。", true, "自分が住んでいる場所の浸水や土砂災害、液状化の危険性などを確認しておきましょう。"]]]
        

export default function Quize({ building }) {
    // ステージで問題文を変更するための変数
    const [buildingNo, setBuildingNo] = useState(0);
    const [flag, setflag] = useState(true);
    const [BackGroundImage, setBackGroundImage] = useState(Background1);
    const [lang, setlang] = useState(getLanguage()); 
    const [flag_lang, setflag_lang] = useState(true);
    const [List, setList] = useState(List_en);
    if(flag_lang){
        if(lang == "jp"){
            setList(List_ja);
        }
        setflag_lang(!flag_lang);
    }

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
            <QuizeUI buildingNo={buildingNo} List = {List}/>
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


const QuizeUI = ({buildingNo, List}) => {

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
    const [coin, setCoin] = useState(0);
    useEffect(() => {
        if(No == List[buildingNo].length && !flag){
            if(seikai > seikai_max){
                setSeikai_max(seikai);
                setSeikai(0);
            }
            addCoin(seikai_max*1000);
            console.log("addCoin");
            setCoin(seikai_max*1000);
        }
    });
    
    
    // useEffect(() => {
    //     const coin = getCoin();
    //     console.log("getCoin", coin);
    // })


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
                <CoinText>{coin}</CoinText>
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
