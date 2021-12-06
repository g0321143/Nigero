import React, { useRef, useState } from 'react'

import Store from '../Utils/Store';
import { Game_Canvas, Block_Right } from '../Utils/GlobalStyles';
import Button from '../Utils/Button';

import backButton from '../Assets/Images/GO_BACKWARD.png';


export default function Option() {

    return (
        <Game_Canvas>
            <h1>オプション画面　未実装</h1>
            <Block_Right>
                <Button
                    handler={() => Store.setScene('title')}
                    src={backButton}
                    width={'80px'}
                    height={'80px'}
                />
            </Block_Right>
        </Game_Canvas>
    );
}

