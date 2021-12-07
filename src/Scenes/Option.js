import React, { useRef, useState } from 'react'

import Store from '../Utils/Store';
import { Game_Canvas, Block_Right_End, Block_Column_Top } from '../Utils/GlobalStyles';
import Button from '../Utils/Button';

import backButton from '../Assets/Images/GO_BACKWARD.png';


export default function Option() {

    return (
        <Game_Canvas>
            <Block_Column_Top>
                {"オプション画面未実装　Option screen not implemented"}
            </Block_Column_Top>
            <Block_Right_End>
                <Button
                    handler={() => Store.setScene('title')}
                    src={backButton}
                    width={'80px'}
                    height={'80px'}
                />
            </Block_Right_End>
        </Game_Canvas>
    );
}

