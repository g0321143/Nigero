import React from 'react'

import Store from '../Utils/Store';
import { Game_Canvas, Block_Left_Top, Block_Column_End, Block_Left_End, Block_Right_End } from '../Utils/GlobalStyles';
import Button from '../Utils/Button';
import Coin from '../Utils/Coin'
import TitleHouse from '../Elements/TitleHouse';

import playButton from '../Assets/Images/Play.png';
import optionButton from '../Assets/Images/Option.png';
import homeButton from '../Assets/Images/HomeIcon.png';
import shopButton from '../Assets/Images/ItemShop.png';
import languageButton from '../Assets/Images/Language.png';
import soundButton from '../Assets/Images/Sound.png';
import hintButton from '../Assets/Images/HintIcon.png';


export default function Title() {

    return (
        <Game_Canvas>
            <Coin />
            <Block_Left_Top>
                <Button
                    src={soundButton}
                    width={'6%'}
                    height={'10%'}
                    margin={'1%'}
                />
                <Button
                    src={languageButton}
                    width={'6%'}
                    height={'10%'}
                    margin={'1%'}
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

