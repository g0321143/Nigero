import React, { Suspense, useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'

import Store from '../Utils/Store';
import Text from '../Utils/Text';
import { Game_Canvas, Block_Right_End, Block_Column_End } from '../Utils/GlobalStyles';
import Button from '../Utils/Button';
import Score from '../Utils/Score';

import backButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-05.png';

import Money from '../Utils/Money'
import GameStage from '../Elements/GameStage';


import ReactDOM from 'react-dom';
import Countdown from 'react-countdown';

function Clear() {
    return (<group>
        <Money />
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


function Model() {
    return (
        <>
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
                <Model />
            </>
        );
    } else {
        // Render a countdown
        const time = minutes * 60 + seconds;
        return (
            <>
                <Text text={String(time)} />
                <Model />
            </>
        );
    }
};


export default function Game() {

    return (
        <Game_Canvas>
            <Countdown
                date={Date.now() + 5000}
                renderer={renderer}
            />
        </Game_Canvas>
    );
}
