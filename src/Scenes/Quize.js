import React, { Suspense, useRef, useEffect, useState } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");
import styled from 'styled-components';

import { Game_Canvas, Block_Right_End } from '../Utils/GlobalStyles';
import Color from "../Constants/Color";
import HeaderText from '../Utils/HeaderText';
import Money from '../Utils/Money'
import Button from '../Utils/Button';
import Store from '../Utils/Store';

//スコア
import { addCoin, getCoin } from '../Utils/LocalStorage';

import backButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-05.png';
import mission from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_4-26-26.png';
import nextButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_NEWpng-33.png';

// [問題文, 正解が〇ならture,×ならflase]
const IDList = [
    ["aaa", true, "bbb"],
    ["aaa1", false, "bbb"],
    ["aaa2", true, "bbb"]
];

export default function Quize() {
    
    
    return (
        <Game_Canvas>
            <Money />
            <QuizeUI/>
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

const QuizeUI = () => {

    const [seikai, setSeikai] = useState(0);
    const [seikai_max, setSeikai_max] = useState(0);
    const [No, setNo] = useState(1);
    const [flag, setflag] = useState(true);

    const maru = () => {
        if(IDList[No-1][1] == true){
            setSeikai(seikai+1);
        }else if(seikai > seikai_max){
            setSeikai_max(seikai);
            setSeikai(0);
        }
        setflag(!flag);
    };
    const batu = () => {
        if(IDList[No-1][1] == false){
            setSeikai(seikai+1);
        }else if(seikai > seikai_max){
            setSeikai_max(seikai);
            setSeikai(0);
        }
        setflag(!flag);
    }
    const next = () => {
        setNo(No + 1);
        setflag(!flag);
    }
    // コインが上手く加算されない!!!
    useEffect(() => {
        if(No == IDList.length && !flag){
            if(seikai > seikai_max){
                setSeikai_max(seikai);
                setSeikai(0);
            }
            addCoin(100);
            console.log("addCoin");
            
        }
    });
    
    const [coin, setCoin] = useState(0);
    useEffect(() => {
        const coin = getCoin();
        console.log("getCoin", coin);
    })


    console.log(No, seikai, seikai_max)

    if(No <= IDList.length && flag){
        return (
            <>
            <HeaderText text={"Quize" + No} />
            <Setting src={mission} top={"20%"} left={"0%"} width={'100%'} height={'50%'} opacity={'0.9'}/>
            <AnyText >{IDList[No-1][0]}</AnyText>
            <Setting onClick={() => maru()} src={nextButton} top={"28vw"} left={"35%"} width={'15%'} height={'15%'} opacity={'0.9'} />
            <Setting onClick={() => batu()} src={nextButton} top={"28vw"} left={"50%"} width={'15%'} height={'15%'} opacity={'0.9'} />
            
            </>
        );
    }else if(No < IDList.length && !flag){
        return (
            <>
                <HeaderText text={"Answer" + No} />
                <Setting src={mission} top={"20%"} left={"0%"} width={'100%'} height={'50%'} opacity={'0.9'}/>
                <AnyText >{IDList[No-1][2]}</AnyText>
                <UsedButton onClick={() => next()} src={nextButton} top={"28vw"}/>
                <UsedButton onClick={() => Store.resetStage()} src={nextButton} top={"35vw"} />
                
            </>
        );
    }else if(No == IDList.length && !flag){
        return (
            <>
                <HeaderText text={"Answer" + No} />
                <Setting src={mission} top={"20%"} left={"0%"} width={'100%'} height={'50%'} opacity={'0.9'}/>
                <AnyText >{IDList[No-1][2]}</AnyText>
                <UsedButton onClick={() => Store.resetStage()} src={nextButton} top={"28vw"}/>
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
    display: flex;
    position: absolute;
    font-size: 2vw;
    text-align: center;
    color: ${Color.slightlyGrayishYellow};
    font-weight: bold;
    inline-size: 14500px; 
    top:15%;
    left:30%;

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