import React, { Suspense, useRef, useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import Countdown from 'react-countdown';
import { useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls } from "@react-three/drei";


import Store, { EV_RESET_GAME } from '../Utils/Store';
import Text from '../Utils/Text';
import { Game_Canvas, Block_Right_End, Block_Column_End, Block_Left_Top, Block_Column_Top } from '../Utils/GlobalStyles';
import Button from '../Utils/Button';
import StarScore from '../Utils/StarScore';

import backButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-05.png';
import mission from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_4-26-26.png';
import item from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-27.png';
import nextButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_NEWpng-33.png';
import retyrButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_NEWpng-34.png';
import tipsButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_NEWpng-35.png';
import checkmark from '../Assets/Images/checked-29.png';

import Money from '../Utils/Money'
import GameStage from '../Elements/GameStage';

import styled from 'styled-components';
import Color from "../Constants/Color";



function Clear() {

    return (
        <>
            <Money />
            <AnyText fontsize={"5vw"} top={"5%"} left={"35%"}>{":COMPLETE:"}</AnyText>
            <Block_Column_End>
                <StarScore
                    width={'200px'}
                    height={'200px'}
                    star1={true}
                    star2={true}
                    star3={true}
                />
            </Block_Column_End>          
            <Setting onClick={() => Store.setScene('select')} src={nextButton} top={"25%"} left={"80%"} width={'15%'} height={'15%'} opacity={'0.9'}/>
            <Setting onClick={() => Store.setScene('game')} src={retyrButton} top={"35%"} left={"80%"} width={'15%'} height={'15%'} opacity={'0.9'}/>
            <Setting onClick={() => Store.setScene('select')} src={tipsButton} top={"45%"} left={"80%"} width={'15%'} height={'15%'} opacity={'0.9'}/>
        </>
    );
}

function Playing(){
    return(
        <group>
            <Setting src={item} top={"20%"} left={"80%"} width={'20%'} height={'50%'} opacity={'0.9'}/>
        </group>
    );
}


function Model() {


    return (
        <>
            <Setting src={mission} top={"20%"} left={"0%"} width={'20%'} height={'50%'} opacity={'0.9'}/>
            <AnyText fontsize={"0.8vw"} top={"35.3%"} left={"6%"}>{"Securing of personal security"}</AnyText>
            <AnyText fontsize={"1vw"} top={"39.3%"} left={"6%"}>{"Check of the fall"}</AnyText>
            <AnyText fontsize={"1vw"} top={"43.5%"} left={"6%"}>{"ほげ～"}</AnyText>
            <Check />
            <Block_Right_End>
                <Button
                    handler={() => Store.setScene('select')}
                    src={backButton}
                    width={'10%'}
                    height={'10%'}
                    margin={'1%'}
                />
            </Block_Right_End>
            <GameStage />
        </>
    );
}

function Check() {
    const flag1 = true;
    const flag2 = true;
    const flag3 = true;
    return (
        <>
            {flag1 ? <Setting src={checkmark} top={"32%"} left={"14.5%"} width={'3%'} height={'3%'} opacity={'1'}/> : null}
            {flag2 ? <Setting src={checkmark} top={"36.5%"} left={"14.5%"} width={'3%'} height={'3%'} opacity={'1'}/> : null}
            {flag3 ? <Setting src={checkmark} top={"41%"} left={"14.5%"} width={'3%'} height={'3%'} opacity={'1'}/> : null}
            
        </>
    );
}

function ClearTime({time, limit}){
    const [time_s, settime_s] = useState(parseInt((limit - time) % 60));
    const [usertime_s, setusertime_s] = useState(( '00' + time_s ).slice( -2 ));
    const [time_m, settime_m] = useState(parseInt((limit - time) / 60));
    const [usertime_m, setusertime_m] = useState(( '00' + time_m ).slice( -2 ));

    return(<AnyText fontsize={"5vw"} top={"70%"} left={"44%"}>{usertime_m + ":" + usertime_s}</AnyText>);
}



// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed}) => {
    const time = minutes * 60 + seconds;
    const limit = 100000;

   
    if (completed || time <= 99) {
        // Render a completed state
        return (
            <>
                <ClearTime time={time} limit={limit/1000}/>
                <Clear />
            </>
        );
    } else {
        // Render a countdown
        return (
            <>
                <Text text={String(time)} />
                <Playing />
            </>
        );
    }
};


export default class Game extends React.Component {
    /*limit: 制限時間
    ココを変更するときはconst renderer 内のlimitも変更*/
    constructor(props) {
        super(props);
        this.state = {
            key: false,
            limit: 100000
        };
    }

    onChangeStore = () => {
        this.state.key = !this.state.key;
        console.log(this.state.key);
    };

    /**
     * コンポーネントがマウントされた（ツリーに挿入された）直後に呼び出されます．
     * 'scene_changed'イベントを検知して，this.onChangeStoreを実行します．
     */
    componentDidMount() {
        Store.on(EV_RESET_GAME, this.onChangeStore);
    }

    /**
     * コンポーネントが DOM から削除されるときに呼び出されます．
     */
    componentWillUnmount() {
        Store.off(EV_RESET_GAME, this.onChangeStore);
    }

    render() {
        return (
            <Game_Canvas >
                
                <Countdown
                    date={Date.now() + this.state.limit}
                    renderer={renderer}
                    key={this.state.key}        
                />
                <Model />
            </Game_Canvas>
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
    display: flex;
    position: absolute;
    font-size: ${(props) => props.fontsize};
    text-align: center;
    color: ${Color.slightlyGrayishYellow};
    font-weight: bold;

    top: ${(props) => props.top};
    left: ${(props) => props.left};

    z-index: 999;
`;