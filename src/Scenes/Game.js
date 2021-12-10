import React, { Suspense, useRef, useState, useEffect  } from 'react'
import {useFrame}  from '@react-three/fiber'

import Store from '../Utils/Store';
import Text from '../Utils/Text';
import { Game_Canvas, Block_Right_End, Block_Column_End } from '../Utils/GlobalStyles';
import Button from '../Utils/Button';
import Score from '../Utils/Score';

import backButton from '../Assets/Images/GO_BACKWARD.png';

import Coin from '../Utils/Coin'
import GameStage from '../Elements/GameStage';


import ReactDOM from 'react-dom';
import Countdown from 'react-countdown';

function Clear(){
    return( <group>
        <Coin/>
        <Block_Column_End>
        <Score
                width={'200px'}
                height={'200px'}
                star1={true}
                star2={true}
                star3={true}
            />
        </Block_Column_End>
    </group>);
}
function Model(){
    return(
        <group>
            <Block_Right_End>
            <Button
                handler={() => Store.setScene('select')}
                src={backButton}
                width={'6%'}
                height={'10%'}
                margin={'1%'}
            />
            </Block_Right_End>
            <GameStage /> 
        </group>
        );
}

// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
        // Render a completed state
        return (
                <Game_Canvas>
                    <Clear />
                    <Model />
                </Game_Canvas>
        );
    } else {
        // Render a countdown
        const time = minutes*60 + seconds;
        return (
                <Game_Canvas>
                    <Text  text={String(time)}/>
                    <Model />
                </Game_Canvas>
        );
    }};


export default function Game() {
    
    return (
        <Game_Canvas> 
            {ReactDOM.render(
            <Countdown
                date={Date.now() + 5000}
                renderer={renderer}
            />,
            document.getElementById('root')
            )}    
        </Game_Canvas>
    );
}
