import React from 'react';
import styled from 'styled-components';

import { Joystick } from "react-joystick-component";
import Color from "../Constants/Color";

/**
 * プレイヤーを操作するバーチャルスティックを表示します
 * @param {(event: IJoystickUpdateEvent) => void} onStopJoystick 
 * @param {(event: IJoystickUpdateEvent) => void} onChangeJoystick 
 */
function VirtualStick({ onStopJoystick, onChangeJoystick }) {

    return (
        <JoystickCanvas>
            <Joystick
                size={80}
                baseColor={Color.slightlyGrayishYellow}
                stickColor={Color.grayishYellowGreen}
                stop={onStopJoystick}
                move={onChangeJoystick}
            />
        </JoystickCanvas>
    );
}


const JoystickCanvas = styled.div`
    position: absolute;

    width: 10vw;
    height: 10vw;

    bottom: 10%;
    left: 45%;

    z-index: 999;
`;

export default VirtualStick;
