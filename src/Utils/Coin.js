import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Store from '../Utils/Store';
import { getCookie } from '../Utils/Cookie';

import CoinImage from '../Assets/Images/Coin.png';

const Block = styled.div`
    position: absolute;
    display:flex;
    
    width: 100%;
    height: 100%;

    font-size: 30px;
    
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-end;
`;

const CoinIcon = styled.div`
  display:flex;
  
  width: 8%;
  height: 10%;
  margin: 2%;

  background-image: url(${CoinImage});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  opacity: 1;
  z-index: 999;
`;

const CoinFont = styled.div`
  display:flex;
  
  width: 10%;
  height: 10%;
  margin: 2%;

  font-size: 3vw;
  color: #B9B179;
  font-weight: bold;
  justify-content: flex-end;
  align-items: center;
  text-shadow: 1px 1px 2px silver;
  
  user-select: none;
  user-drag: none;
  
  z-index: 999;
`;

function Coin() {

    const [coin, setCoin] = useState(0);

    useEffect(() => {
        setCoin(getCookie("coin"));
      });

    return (
        <Block>
            <CoinIcon />
            <CoinFont>{coin}</CoinFont>
        </Block>
    );
}


export default Coin;
