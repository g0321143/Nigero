import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Color from '../Constants/Color';

import { getCookie } from './Cookie';

import CoinImage from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-12.png';

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
    position: absolute;

    width: 3vw;
    height: 3vw;

    top: 4%;
    right: 19%;

    background-image: url(${CoinImage});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    opacity: 1;
    z-index: 999;
`;

const CoinFont = styled.div`
  position: absolute;

  width: 3vw;
  height: 3vw;

  top: 3%;
  right: 8%;

  font-size: 3vw;
  color: ${Color.slightlyGrayishYellow};
  font-weight: bold;
  justify-content: flex-end;
  align-items: center;
  text-shadow: 1px 1px 2px silver;
  
  user-select: none;
  user-drag: none;
  
  z-index: 999;
`;

function Money() {

  const [money, setMoney] = useState(0);

  useEffect(() => {
    setMoney(getCookie("money"));
  });

  return (
    <>
      <CoinIcon />
      <CoinFont>{money}</CoinFont>
    </>
  );
}


export default Money;
