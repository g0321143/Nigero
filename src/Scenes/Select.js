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

    const tipsTextJP = 'ゲームで使用する建物を選択して下さい．\n\nゲーム中には，達成すべきミッションが表示されます． \nミッションの達成状況によって報酬のコイン獲得量が変わります． \n\nそれぞれのステージで全てのミッションを達成すると，クイズステージに挑戦することができます．';
    const tipsTextEN = 'Select a building to use in the game. \n\nDuring the game, you will be shown missions to complete. \nThe amount of coins you get as a reward will change depending on how many missions you complete. \n\nOnce you have completed all the missions in each stage, you will be able to challenge the quiz stage.';
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

