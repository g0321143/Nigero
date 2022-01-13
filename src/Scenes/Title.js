import React from 'react'

import Store from '../Utils/Store';
import { Game_Canvas, Block_Left_Top, Block_Column_End, Block_Left_End, Block_Right_End } from '../Utils/GlobalStyles';
import { setBuilding } from '../Utils/LocalStorage';
import Button from '../Utils/Button';
import Money from '../Utils/Money'
import TitleHouse from '../Elements/TitleHouse';

import playButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-21.png';
import optionButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-11.png';
import homeButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-04.png';
import shopButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-03.png';
import languageButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-09.png';
import soundButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-07.png';
import hintButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-06.png';
import cautionButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-08.png';


export default function Title() {

    return (
        <Game_Canvas className='GameCanvas'>
            <Money />
            <Block_Left_Top top={"3%"}>
                <Button
                    src={soundButton}
                    width={'3%'}
                    height={'5%'}
                    margin={'0.5%'}
                />
                <Button
                    src={cautionButton}
                    width={'3%'}
                    height={'5%'}
                    margin={'0.5%'}
                />
                <Button
                    handler={() => setBuilding('tallBuilding', true)}
                    src={languageButton}
                    width={'3%'}
                    height={'5%'}
                    margin={'0.5%'}
                />
            </Block_Left_Top>
            <Block_Left_End>
                <Button
                    handler={() => Store.setScene('itemShop')}
                    src={shopButton}
                    width={'6%'}
                    height={'10%'}
                    margin={'1%'}
                />
                <Button
                    handler={() => Store.setScene('buildingShop')}
                    src={homeButton}
                    width={'6%'}
                    height={'10%'}
                    margin={'1%'}
                />
            </Block_Left_End>
            <Block_Column_End>
                <Button
                    handler={() => Store.setScene('select')}
                    src={playButton}
                    width={'20%'}
                    height={'10%'}
                    margin={'1%'}
                />
                <Button
                    handler={() => Store.setScene('option')}
                    src={optionButton}
                    width={'20%'}
                    height={'10%'}
                    margin={'1%'}
                />
            </Block_Column_End>
            <Block_Right_End>
                <Button
                    src={hintButton}
                    width={'6%'}
                    height={'10%'}
                    margin={'1%'}
                />
            </Block_Right_End>
            <TitleHouse />
        </Game_Canvas>
    );
}

