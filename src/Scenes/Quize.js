import React, { Suspense, useRef, useEffect, useState } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");
import styled from 'styled-components';

import { Game_Canvas, Block_Right_End } from '../Utils/GlobalStyles';
import Color from "../Constants/Color";
import Button from '../Utils/Button';
import Store from '../Utils/Store';
import Buildings from '../Constants/Buildings';
import Tips from '../Utils/Tips';

//スコア
import { addCoin, getCoin, getLanguage } from '../Utils/LocalStorage';

import backButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-05.png';
import TexBox from '../Assets/Images/QUIZ_BOX.png';
import nextButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_NEW-33.png';
import Closebutton from '../Assets/Images/CLOSETAB-08.png';
import Yesbutton from '../Assets/Images/YES-05.png';
import Notbutton from '../Assets/Images/NO-15.png';
import Background1 from '../Assets/Images/Normalcolor.jpg';
import Background2 from '../Assets/Images/TallBuilding.jpg';
import Background3 from '../Assets/Images/Elevator.jpg';
import CoinImage from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-12.png';
import Result_No from '../Assets/Images/INCORRECT-04.png';
import Result_Yes from '../Assets/Images/CORRECTANSWERrevised-08.png';



// [問題文, 正解が〇ならture,×ならflase]


const List_en = [[["If you feel a big tremor while cooking, \n you should turn off the fire as soon as possible.", false, "It is dangerous to approach a fire during a tremor. \n After the shaking stops, take care of the fire without panicking."],
    ["The danger of tsunami is only near the ocean, not in rivers.", false, "Tsunami is not only a threat near the ocean. \n Tsunamis come from downstream to upstream, \n so evacuate quickly and at right angles to the flow of the river."],
    [ "The most reliable way to prevent furniture from tipping over, \n falling, or moving during an earthquake is to screw \n it to the wall with L-shaped metal fittings.", true, "If screwing is difficult, the effect can be enhanced by \n combining a sticking rod with a stopper system or \n a sticking rod with an adhesive mat."],
    ["It is good to buy a little more food \n and daily necessities on a daily basis.", true, "Until now, the idea of stockpiling for disasters has been taken for \n granted as a special kind of preparation \n that involves preparing items that are not normally used, \n such as dry bread. However, [daily stockpiling,] \n in which you buy a little extra food and daily necessities that \n you use on a regular basis, is an easy way to stockpile."],
    ["It is important to prepare for damage to \n lifelines and stagnation of supply on a daily basis, \n and to have the necessary items in case of a disaster.", true, "In the event of a major earthquake, lifelines such as electricity, \n water, and gas may not be available, and the supply of food \n and other daily necessities may stop. \n Make sure you are prepared with the necessary \n items to live at home on a daily basis."],
    ["If you need to evacuate during a power outage, \n turn off the breaker before evacuating.", true, "If there is an electrical appliance that has been \n switched on in the fallen household goods, \n there is a risk of fire after the power is resumed."],
    ["During an earthquake, \n if you are on the second floor of an old building, \n you should immediately go down to the first floor.", false, "Do not rush down to the first floor because \n the building may collapse and crush your body. \n If the building does not meet seismic resistance standards, \n decide whether you should go outside or not, \n depending on the situation."]],
    
    [["In condominiums, the only way to evacuate \n in case of emergency, such as in case of fire, \n is through the front door.", false, "Balconies and verandas are equipped with [separation boards] \n between neighboring units that can be kicked \n through in case of fire or other emergencies, \n and [evacuation hatches] that contain ladders \n for evacuating downstairs."],
    ["The first and foremost priority at the moment of \n an earthquake is to secure evacuation routes.", false, "First of all, take action to protect your own life. \n Move to a safe place, such as under a desk, \n where things will not fall, fall over, or move."],
    ["When the power goes out due to an earthquake, \n it is best not to turn on the breaker or the light switch.", true, "Do not touch the breaker or the light switch as \n there is a risk of fire or explosion in case of gas leakage. \n Of course, the use of lighters is also strictly prohibited."],
    ["During an evacuation, the only way to contact \n family and friends to let them know that you are safe \n is to keep calling them directly on their cell phones.", false, "Prepare multiple means of communication \n in case the lines go down and phone lines are down."],
    ["A wire that is cut and hanging down is not electrified, \n so there is no danger of electric shock.", false, "Wires that are broken or hanging down may be \n electrified  and pose a risk of electric shock. \n Do not approach them and never touch them. \n The same goes for trees, signs, etc. \n that are in contact with power lines."],
    ["If you are in a crowded area, it is safer to move away \n from the crowd as soon as possible after a major tremor occurs.", false, "Suddenly running off in a crowded place can cause mass panic, \n which may lead to an unexpected accident."]],
    
    [["Do not use elevators during typhoons or heavy rain.", true, "If power lines are cut by a storm, \n the power may be cut and you may be trapped in an elevator. \n During a typhoon or heavy rain, try to use the stairs \n as much as possible."],
    ["Foreigners are included in the [persons requiring consideration] \n who must be taken into account in the event of a disaster.", true, "Since they may be anxious due to differences in lifestyle and culture, \n or because they may not understand the language, \n take care to give them proper information."],
    ["Don't forget to pack batteries for \n the portable radio in your emergency kit.", false, "Leaving batteries in appliances that are not \n in regular use can cause them to leak or run out. \n Remove the dry batteries from your portable radio."],
    ["AA and AA batteries are the same length, \n just different in thickness.", true, "The only difference is the thickness, so you can wrap a piece of cloth \n around the AA battery and use it instead of the AA battery. \n When the diameter reaches 2.6 cm, fasten it with cellophane tape."],
    ["A [hazard map] is a map that shows the estimated damage areas, \n evacuation sites, evacuation routes, and other information for \n disaster mitigation and disaster prevention.", true, "Make sure to check the risk of flooding, landslides, \n and liquefaction in your area."]]]

const List_jp = [[['料理中に大きな揺れを感じたら、一刻も早く火を消すべきである。', false, "揺れの最中に火に近づくのは危険です。\n揺れが収まってから、慌てずに火の始末をします。"],
    ["津波の危険があるのは、\n海の近くだけであり、川では津波の心配は無い。", false, "津波の心配があるのは、海のそばだけではありません。\n津波は、川下から川上に向かって押し寄せてくるので、\n川の流れに対して直角方向に素早く避難しましょう。"],
    [ "震災時の家具の転倒・落下・移動を防ぐための最も確実な方法は、\n壁にＬ字型の金具でネジ止めをすることである。", true, "ネジ止めが難しい場合は、突っ張り棒とストッパー式、\n突っ張り棒と粘着マットを組み合わせることで\n効果を高めることができます。"],
    ["日頃から食料品や生活必需品などは\n少し多めに購入するのが良い。", true, "これまでの災害用備蓄は、乾パンなどの普段使わないものを\n用意する特別な準備という考え方が当たり前でした。\nしかし、日頃利用している食料品や生活必需品を\n少し多めに購入しておく「日常備蓄」なら簡単に備蓄ができます。"],
    ["ライフライン被害や物資供給の停滞に備えて、\n日頃から災害時に必要なものを備えておくことが重要である。", true, "大規模な地震が起これば電気・水道・ガスなどの\nライフラインが使えなくなったり、\n食料品や生活必需品の供給が止まることが想定されます。\n日頃から自宅で生活する上で必要な物を備えておきましょう。"],
    ["停電時に避難が必要なときは、\nブレーカーを落としてから避難する。", true, "倒れた家財の中にスイッチが入った状態の電気製品があると、\n通電が再開した後に火災のおそれがあります。"],
    ["地震が発生した際、古い建物の２階にいるときは、\nすぐに１階に降りた方が良い。", false, "建物が倒壊して身体が押しつぶされる恐れがあるので、\nあわてて１階に降りてはいけません。\n耐震基準を満たしていない建物は、\n外に脱出すべきか状況をみて判断します。"]],
    
    [["マンションにおいては、火災発生の時など、\nいざというときには玄関から避難する方法しか想定されていない。", false, "ベランダやバルコニーには、火災発生時など、\nいざというときに蹴破って移動できる隣戸との間にある\n「隔て板」、下階避難用のはしごを収納した「避難ハッチ」\nなどが設けられています。"],
    ["地震が発生したその瞬間、\n最優先で最初にやるべきことは避難経路の確保である。", false, "まず最初に、自分の命を守る行動をとりましょう。\n机の下など、物が「落ちてこない・倒れない・移動しない」\n安全な場所に移動しましょう。"],
    ["地震で停電したときは、\nブレーカーや電気のスイッチを入れない方が良い。", true, "ガスが漏れていた場合に火災や爆発の危険があるのでブレーカーや\n電気のスイッチには触らないようにしましょう。\nもちろん、ライターの使用も厳禁です。"],
    ["避難時、家族や友人に安否連絡をする際は、\n相手の携帯電話に直接電話をかけ続けるしかない。", false, "回線がパンクし、電話が通じなクなることを想定し、\n連絡手段を複数用意しましょう。ＳＮＳも活用できます。"],
    ["切れて垂れ下がっている電線は、\n電気が通っていないので、感電の危険はない。", false, "切れたり、垂れ下がっている電線は、\n電気が通っている場合があり、感電の危険があります。\n近づかず、絶対に触らないこと。\nまた、電線に樹木や看板などが接触している場合も同様です。"],
    ["人混みの中にいる場合、大きな揺れが起きたら\n一刻も早く人混みから離れた方が安全である。", false, "人混みで突然走り出す行為は集団パニックの原因となり、\n思わぬ事故になる危険があるので、\nまわりに配慮した行動を心がけましょう。"]],
    
    [["台風や大雨の時は、エレベーターを使わないようにする。", true, "暴風によって電線が切れると停電になり、\nエレベーターに閉じ込められるおそれがあります。\n台風や大雨のときは、なるべく階段を使うようにしましょう。"],
    ["外国人は、災害時に配慮しなければならない\n「要配慮者」に含まれている。", true, "生活文化の違いや言葉を理解できずに、\n不安を抱える可能性があるので、\nきちんと情報を伝えるように配慮しましょう。"],
    ["非常用持ち出し袋に入れる携帯ラジオには、\n忘れずに乾電池をセットしておく。", false, "普段から使用しない電化製品に電池を入れておくと、\n液漏れや消耗の原因になってしまいます。\n携帯ラジオの乾電池は外しておきましょう。"],
    ["単三電池と単二電池は、\n太さが違うだけで長さは同じである。", true, "太さが違うだけなので、単三電池に布などを巻き付けて、\n単二電池の代わりとすることができます。\n直径が2.6cmになったらセロハンテープでとめます。"],
    ["災害被害の軽減や防災対策のため、\n被害想定区域や避難場所、避難経路などの情報を\n表示した地図のことを「ハザードマップ」という。", true, "自分が住んでいる場所の浸水や土砂災害、\n液状化の危険性などを確認しておきましょう。"]]]
        

export default function Quize({ building }) {
    // ステージで問題文を変更するための変数
    const [buildingNo, setBuildingNo] = useState(0);
    const [flag, setflag] = useState(true);
    const [BackGroundImage, setBackGroundImage] = useState(Background1);
    const [lang, setlang] = useState(getLanguage()); 
    const [flag_lang, setflag_lang] = useState(true);
    const [List, setList] = useState(List_en[0]);
    

    const tipsTextJP = '問題文の内容が正しいと思った場合はYesを，\n 間違っていると思った場合はNoのボタンをクリックしてください．';
    const tipsTextEN = 'Click on the Yes button if you think the question is correct, \n or click on the No button if you think it is wrong.';
    

    if (flag && building == Buildings.house.id && lang=="en") {
        setBuildingNo(0);
        setBackGroundImage(Background1);
        setList(shuffle(List_en[0]));
        setflag(!flag);    
    } else if (flag && building == Buildings.tallBuilding.id && lang=="en") {
        setBuildingNo(1);
        setBackGroundImage(Background2);
        setList(shuffle(List_en[1]));
        setflag(!flag);
    } else if (flag && building == Buildings.elevator.id && lang=="en") {
        setBuildingNo(2);
        setBackGroundImage(Background3);
        setList(shuffle(List_en[2]));        
        setflag(!flag);
    }else if (flag && building == Buildings.house.id && lang=="jp") {
        setBuildingNo(0);
        setBackGroundImage(Background1);
        setList(shuffle(List_jp[0]));
        setflag(!flag);    
    } else if (flag && building == Buildings.tallBuilding.id && lang=="jp") {
        setBuildingNo(1);
        setBackGroundImage(Background2);
        setList(shuffle(List_jp[1]));
        setflag(!flag);
    } else if (flag && building == Buildings.elevator.id && lang=="jp") {
        setBuildingNo(2);
        setBackGroundImage(Background3);
        setList(shuffle(List_jp[2]));        
        setflag(!flag);
    }

    return (
        <Game_Canvas>         
            <Setting src={BackGroundImage} top={"0%"} left={"0%"} width={'100%'} height={'100%'} opacity={'1.0'}/>
            <QuizeUI buildingNo={buildingNo} List = {List}/>
            <Tips text={getLanguage() == 'en' ? tipsTextEN : tipsTextJP} isLeft={true} />
            
            <Block_Right_End>
                <Button
                    handler={() => Store.setScene('select')}
                    src={backButton}
                    width={'6%'}
                    height={'10%'}
                    margin={'1%'}
                />
            </Block_Right_End>
            
        </Game_Canvas>
    );
}

const Money = () => {
    const [money, setMoney] = useState(getCoin());

    useEffect(() => {
        setMoney(getCoin());
    });
    return (<BuildingCoin>{money.toLocaleString()}</BuildingCoin>);
}


const QuizeUI = ({buildingNo, List}) => {


    const [seikai, setSeikai] = useState(0);    // 現在の連続正解数
    const [No, setNo] = useState(1);    // 現在の問題番号
    const [flag, setflag] = useState(0); // true:問題文表示，false:回答表示
    const [result, setResult] = useState(Notbutton);
    const [result_Image, setResult_Image] = useState(Result_No);
    const [coin, setCoin] = useState(0);
    const [coin_flag, setCoin_flag] = useState(false);

    console.log(List.length, No, flag, seikai)
    // 〇を選択した場合
    const maru = () => {
        if (List[No - 1][1] == true) {
            setSeikai(seikai + 1);
            setResult(Yesbutton);
            setResult_Image(Result_Yes);
            setCoin_flag(!coin_flag);
        }else{
            setSeikai(0);
            setResult(Notbutton);
            setResult_Image(Result_No);
        }
        
        setflag(1);
    };
    // ×を選択した場合
    const batu = () => {
        if (List[No - 1][1] == false) {
            setSeikai(seikai + 1);
            setResult(Notbutton);
            setResult_Image(Result_Yes);
            setCoin_flag(!coin_flag);
        }else{
            setSeikai(0);
            setResult(Yesbutton);
            setResult_Image(Result_No);
        }
        
        setflag(1);
    }
    // 次の問題に進む
    
    const next = () => {
       if(flag == 1){
            setflag(2);
        }else{
            setNo(No + 1);
            setflag(0);
        }
    }

    useEffect(() => {
        if(coin_flag){
            console.log(List.length, No, flag, seikai)
            addCoin(seikai * 100);
            setCoin(seikai * 100);
            setCoin_flag(!coin_flag);
        }
    });

   

    // 問題表示，回答表示，最後の回答表示（nextボタンを消失）
    if (No <= List.length && flag==0) {
        return (
            <>
                
                <Setting src={TexBox} top={"20%"} left={"0%"} width={'100%'} height={'50%'} opacity={'1.0'}/>
                <HedText>{"Quiz " + No + " !"}</HedText>
                <AnyText >{List[No - 1][0]}</AnyText>
                <Setting onClick={() => maru()} src={Yesbutton} top={"30vw"} left={"35%"} width={'10%'} height={'10%'} opacity={'1'} cursor={"pointer"}/>
                <Setting onClick={() => batu()} src={Notbutton} top={"30vw"} left={"55%"} width={'10%'} height={'10%'} opacity={'1'} cursor={"pointer"}/>
                <Money />
            </>
        );
    } else if (No <= List.length && flag==1 && result_Image==Result_Yes) {

        return (
            <>
                <HedText>{"Quiz " + No + " !"}</HedText>
                <Setting src={result_Image} top={"20%"} left={"0%"} width={'100%'} height={'50%'} opacity={'1.0'}/>
                <UsedButton onClick={() => next()} src={nextButton} top={"40vw"} />
                <Image src={CoinImage} top={"31vw"} left={"38%"} width={'10%'} height={'10%'} />
                <CoinText>{"+" + coin}</CoinText>
                <Money />
            </>
        );
    } else if (No <= List.length && flag==1 && result_Image==Result_No) {

        return (
            <>
                <HedText>{"Quiz " + No + " !"}</HedText>
                <Setting src={result_Image} top={"20%"} left={"0%"} width={'100%'} height={'50%'} opacity={'1.0'}/>
                <UsedButton onClick={() => next()} src={nextButton} top={"40vw"} />
                <Money />
            </>
        );
    }else if (No < List.length && flag==2) {

        return (
            <>
                <Setting src={TexBox} top={"20%"} left={"0%"} width={'100%'} height={'50%'} opacity={'1.0'}/>
                <HedText>{"Answer " + No + " !"}</HedText>
                <AnyText >{List[No - 1][2]}</AnyText>
                <Image src={result} top={"30vw"} left={"45%"} width={'10%'} height={'10%'} />
                <UsedButton onClick={() => next()} src={nextButton} top={"40vw"} />
                <Money />

            </>
        );
    }else if (No == List.length && flag==2) {
        console.log("list7");
        return (
            <>
                <Setting src={TexBox} top={"20%"} left={"0%"} width={'100%'} height={'50%'} opacity={'1.0'}/>
                <HedText>{"Answer " + No + " !"}</HedText>
                <AnyText >{List[No - 1][2]}</AnyText>
                <Image src={result} top={"30vw"} left={"45%"} width={'10%'} height={'10%'} />
                <Money />

            </>
        );
    }
}

function shuffle(array) {
    const out = Array.from(array);
    for (let i = out.length - 1; i > 0; i--) {
      const r = Math.floor(Math.random() * (i + 1));
      const tmp = out[i];
      out[i] = out[r];
      out[r] = tmp;
    }
    return out;
}



const BuildingCoin = styled.div`
    position: absolute;
    top: 3%;
    left: 0;
    right: 3%;
    margin: auto;
    font-size: 3vw;
    color: ${Color.slightlyGrayishYellow};
    font-weight: bold;
    justify-content: flex-end;
    text-align: end;
    user-select: none;
    user-drag: none;
    z-index: 999;
 
    &::before{
    content: "";
    display: inline-block;
    background: url(${CoinImage});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    width: 4vw;
    height: 4vw;
    margin-right: 1vw;
    vertical-align: middle;
}
`;


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
        cursor: ${(props) => props.cursor};;
        opacity: 1;
    }
`;

const Image = styled.div`
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
    z-index: 999;
`;




const AnyText = styled.div`
    position: absolute;
    width: 46%;
    height: 11vw;
    top: 30%;
    left: 27%;
    font-size: 1.5vw;
    color: ${Color.slightlyGrayishYellow};
    font-weight: bold;
    justify-content: flex-end;
    text-align: center;
    user-select: none;
    user-drag: none;
    background-color: #b8b078;
    white-space: pre-wrap;
  
    z-index: 999;
`;

const CoinText = styled.div`
    position: absolute;
    width: 10%;
    height: 8vw;
    top: 54%;
    left: 46%;
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
    opacity: 1;
    :hover {
        cursor: pointer;
        opacity: 1;
    }
`;
