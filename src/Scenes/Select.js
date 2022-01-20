import React, { useRef, useState, useEffect } from 'react'

import Store from '../Utils/Store';
import { addCoin, subCoin, resetAllData } from '../Utils/LocalStorage';
import { Game_Canvas, Block_Right_End, Block_Left_End, Block_Left_Top } from '../Utils/GlobalStyles';
import Button from '../Utils/Button';
import SelectBuilding from '../Elements/SelectBuilding';

import backButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-05.png';
import hintButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-06.png';
import homeButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-04.png';
import shopButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-03.png';

export default function Select({currentBuilding}) {

    // このkeyを更新すると画面が更新されます
    const [key, setkey] = useState(false);
    console.log(currentBuilding);

    return (
        <Game_Canvas key={key}>
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
                    handler={() =>  setkey(!key)}
                    src={shopButton}
                    width={'6%'}
                    height={'10%'}
                    margin={'1%'}
                />
                <Button
                    handler={() => addCoin(256)}
                    src={homeButton}
                    width={'6%'}
                    height={'10%'}
                    margin={'1%'}
                />
            </Block_Left_End>
            <Block_Left_Top>
                <Button
                    handler={() => resetAllData()}
                    src={hintButton}
                    width={'6%'}
                    height={'10%'}
                    margin={'1%'}
                />
            </Block_Left_Top>
            <SelectBuilding currentBuilding={currentBuilding} keyhandler={() => setkey(!key)}/>
        </Game_Canvas>
    );
}

