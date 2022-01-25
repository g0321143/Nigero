import React from 'react'

import Store from '../Utils/Store';
import { getLanguage } from '../Utils/LocalStorage';
import { Game_Canvas, Block_Right_End, Block_Left_End } from '../Utils/GlobalStyles';
import Button from '../Utils/Button';
import Tips from '../Utils/Tips';
import HeaderText from '../Utils/HeaderText';
import SelectBuilding from '../Elements/SelectBuilding';

import backButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-05.png';
import shopButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-03.png';

export default function Select({ currentBuilding }) {

    const tipsTextJP = 'ゲームで使用する建物を選択して下さい．\nそれぞれのステージで星3つを獲得すると，クイズステージに調整することができます．';
    const tipsTextEN = 'Select a building to use in the game.\nIf you get 3 stars in each stage, you can adjust to the quiz stage.';
    return (
        <Game_Canvas>
             <HeaderText text={"SELECT BUILDING"} />
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
            <Tips text={getLanguage() == 'en' ? tipsTextEN : tipsTextJP} isLeft={true} />
            <SelectBuilding currentBuilding={currentBuilding} />
        </Game_Canvas>
    );
}

