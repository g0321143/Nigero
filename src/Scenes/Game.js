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
            <TimeText fontsize={"5vw"} top={"5%"} left={"35%"}>{":COMPLETE:"}</TimeText>
            <Block_Column_End>
                <StarScore
                    width={'200px'}
                    height={'200px'}
                    star1={true}
                    star2={false}
                    star3={false}
                />
            </Block_Column_End>
            <ChooserButton onClick={() => Store.setScene('select')} src={nextButton} top={"25%"} left={"80%"} />
            <ChooserButton onClick={() => Store.resetGame()} src={retyrButton} top={"35%"} left={"80%"} />
            <ChooserButton onClick={() => Store.setScene('select')} src={tipsButton} top={"45%"} left={"80%"} />
        </>
    );
}

function Playing(){
    return(
        <group>
            <ItemBox src={item}/>
        </group>
    );
}


function Model() {

    useEffect(() => {
        console.log("Mount item");
        return () => console.log("Unmount item");
      }, []);

    return (
        <>
            <MissonBox src={mission} />
            <TimeText fontsize={"0.8vw"} top={"35.3%"} left={"6%"}>{"Securing of personal security"}</TimeText>
            <TimeText fontsize={"1vw"} top={"39.3%"} left={"6%"}>{"Check of the fall"}</TimeText>
            <TimeText fontsize={"1vw"} top={"43.5%"} left={"6%"}>{"ほげ～"}</TimeText>
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
            {flag1 ? <CheckBox src={checkmark} top={"32%"} left={"14.5%"} /> : null}
            {flag2 ? <CheckBox src={checkmark} top={"36.5%"} left={"14.5%"} /> : null}
            {flag3 ? <CheckBox src={checkmark} top={"41%"} left={"14.5%"} /> : null}
        </>
    );
}



// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
        // Render a completed state
        return (
            <>
                <Clear />
            </>
        );
    } else {
        // Render a countdown
        const time = minutes * 60 + seconds;
        return (
            <>
                <Text text={String(time)} />
                <Playing />
            </>
        );
    }
};


export default class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            key: 0
        };
    }

    onChangeStore = () => {
        this.state.key = this.state.key + 1;
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
<<<<<<< HEAD
                    date={Date.now() + 10000}
=======
                    date={Date.now() + 5000}
>>>>>>> 80a501669b568d5a3fd83475685596a5edf73015
                    renderer={renderer}
                />
                <Model />
            </Game_Canvas>
        );
    }
}

const ChooserButton = styled.div`
  display:flex;
  position: absolute;
  width: 15%;
  height: 15%;
  
  margin: ${props => props.margin};
  top: ${(props) => props.top};
  left: ${(props) => props.left};

  background-image: url(${props => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  opacity: 0.9;
  z-index: 999;

  :hover {
    cursor: pointer;
    opacity: 1;
  }
`;

const TimeText = styled.div`
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

const CheckBox = styled.div`
    position: absolute;
    margin: 1vw;

    border-radius: 5%;
    width: 3%;
    height: 3%;
    
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    top: ${(props) => props.top};
    left: ${(props) => props.left};

    background-image: url(${props => props.src});

    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    z-index: 999;

    :hover {
        cursor: pointer;
        opacity: 1;
  }
    
`;

const MissonBox = styled.div`
    position: absolute;
    margin: 1vw;

    border-radius: 5%;
    width: 20%;
    height: 50%;
    
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    top: 20%;
    left: 0%;

    background-image: url(${props => props.src});

    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    opacity: 0.9;
    z-index: 999;

    :hover {
        cursor: pointer;
        opacity: 1;
  }
    
`;


const ItemBox = styled.div`
    position: absolute;
    margin: 1vw;

    border-radius: 5%;
    width: 20%;
    height: 50%;
    
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    top: 20%;
    left: 78%;

    background-image: url(${props => props.src});

    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    opacity: 0.9;
    z-index: 999;

    :hover {
        cursor: pointer;
        opacity: 1;
  }
    
`;