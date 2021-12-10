import React, { useRef, useState } from 'react'

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

export default function Select() {

    return (
        <Game_Canvas>
            <Coin />
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
            <SelectBuilding handler={() => deleteCookie("coin")}/>
        </Game_Canvas>
    );
}

