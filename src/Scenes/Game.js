import React, { useRef, useState, useEffect  } from 'react'
import {useFrame}  from '@react-three/fiber'

import Store from '../Utils/Store';
import { Game_Canvas, Block_Right_End, Block_Column_End, Block_Column_Top, Block_Left_End, Block_Left_Top } from '../Utils/GlobalStyles';
import Button from '../Utils/Button';
import Score from '../Utils/Score';

import backButton from '../Assets/Images/GO_BACKWARD.png';

import Coin from '../Utils/Coin'
import GameStage from '../Elements/GameStage';


function Clear(){
    return(
        <group>
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
        </group>
    );
}
/*******    ココ↓の引数がNaNになります．．．    *******/
function Playing({time}){
    //const [time, settime] = useState(5000);

    return(
        <Block_Column_Top>
                {time/1000}
        </Block_Column_Top>
    );
}

function TimeCount(time){
    time -= 1;
    return(time);
}

export default function Game() {
    const [flag, setflag] = useState(true);
    const [count, settime] = useState(5000);
    return (
        <Game_Canvas>
            {flag ? <Playing time={count}/> : <Clear/>}
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
            
        </Game_Canvas>
    );
}
