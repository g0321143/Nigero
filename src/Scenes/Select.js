import React, { useRef, useState } from 'react'
import styled from 'styled-components';

import Store from '../Utils/Store';
import { addCookie, subCookie, deleteCookie } from '../Utils/Cookie';
import { Game_Canvas, Block_Column_Top, Block_Right_End, Block_Left_End, Block_Left_Top } from '../Utils/GlobalStyles';
import Button from '../Utils/Button';
import Coin from '../Utils/Money'
import SelectBuilding from '../Elements/SelectBuilding';

import backButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-05.png';
import hintButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-06.png';
import homeButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-04.png';
import shopButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-03.png';
import playButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-02.png';
import CoinImage from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-12.png';
import HouseButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-19.png';

const CoinIcon = styled.div`
    position: absolute;

    width: 3vw;
    height: 3vw;

    top: 80%;
    left: 40%;

    background-image: url(${CoinImage});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    opacity: 1;
    z-index: 999;
`;

const BuildingButton = styled.div`
    position: absolute;

    width: 15vw;
    height: 10vw;

    top: 60%;
    left: 42%;

    background-image: url(${(props) => props.src});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    opacity: 1;
    z-index: 999;
`;

export default function Select() {

    return (
        <Game_Canvas>
            <Coin />
            <CoinIcon />
            <BuildingButton src={HouseButton} />
            <Block_Right_End>
                <Button
                    handler={() => Store.setScene('title')}
                    src={backButton}
                    width={'6%'}
                    height={'10%'}
                    margin={'1%'}
                />
                <Button
                    handler={() => Store.setScene('game')}
                    src={playButton}
                    width={'6%'}
                    height={'10%'}
                    margin={'1%'}
                />
            </Block_Right_End>
            <Block_Left_End>
                <Button
                    handler={() => subCookie("money", 255)}
                    src={shopButton}
                    width={'6%'}
                    height={'10%'}
                    margin={'1%'}
                />
                <Button
                    handler={() => addCookie("money", 256)}
                    src={homeButton}
                    width={'6%'}
                    height={'10%'}
                    margin={'1%'}
                />
            </Block_Left_End>
            <Block_Left_Top>
                <Button
                    handler={() => deleteCookie("coin")}
                    src={hintButton}
                    width={'6%'}
                    height={'10%'}
                    margin={'1%'}
                />
            </Block_Left_Top>
            <SelectBuilding />
        </Game_Canvas>
    );
}

