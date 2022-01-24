import React from 'react'

import Store from '../Utils/Store';
import { addCoin, subCoin } from '../Utils/LocalStorage';
import { Game_Canvas, Block_Right_End, Block_Left_End } from '../Utils/GlobalStyles';
import Button from '../Utils/Button';
import Tips from '../Utils/Tips';
import SelectBuilding from '../Elements/SelectBuilding';

import backButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-05.png';
import homeButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-04.png';
import shopButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-03.png';

export default function Select({currentBuilding}) {

    return (
        <Game_Canvas>
            <Block_Right_End>
                <Button
                    handler={() => Store.setScene('title')}
                    src={backButton}
                    width={'6%'}
                    height={'10%'}
                    margin={'1%'}
                />
            </Block_Right_End>
            <Block_Left_End>
                <Button
                    handler={() => Store.setScene('itemShop')}
                    src={shopButton}
                    width={'6%'}
                    height={'10%'}
                    margin={'1%'}
                />
            </Block_Left_End>
            <Tips text={"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"} isLeft={true}/>
            <SelectBuilding currentBuilding={currentBuilding}/>
        </Game_Canvas>
    );
}

