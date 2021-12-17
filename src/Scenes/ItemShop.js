import React, { Suspense, useRef, useEffect, useState } from "react";
import styled from 'styled-components';

import { Game_Canvas, Block_Right_End } from '../Utils/GlobalStyles';
import HeaderText from '../Utils/HeaderText';
import Money from '../Utils/Money'
import Button from '../Utils/Button';
import Store from '../Utils/Store';
import Tab from '../Elements/ItemShopTab';

import backButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-05.png';

export default function ItemShop() {


    return (
        <Game_Canvas>
            <HeaderText text={"ITEM SHOP"} />
            <Money />
            <Block_Right_End>
                <Button
                    handler={() => Store.setScene('title')}
                    src={backButton}
                    width={'6%'}
                    height={'10%'}
                    margin={'1%'}
                />
            </Block_Right_End>
            <Wrap>
                <Tab
                    title={['LIGHT', 'FOOD', 'Anti-tumble']}
                    content={[
                       <TestDom title={"タイトル1"} />,
                       <TestDom title={"タイトル2"} />,
                       <TestDom title={"タイトル3"} />,
                    ]}
                />
            </Wrap>
        </Game_Canvas>
    );
}

const TestDom = ({title}) => (
    <>
      <p><b>{title}</b></p>
      <button type="button">フォーカスチェック</button>
      <p>てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，</p>
      <p>てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，</p>
      <p>てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，</p>
      <p>てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，てすと，</p>

    </>
  )


const Wrap = styled.div`
    position: relative;
    width: 90%;
    Top: 12%;
    margin:auto;
    z-index: 999;
`;

