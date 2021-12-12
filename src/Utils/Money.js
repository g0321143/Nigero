import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Color from '../Constants/Color';

import { getCookie } from './Cookie';

import CoinImage from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-12.png';

const BuildingCoin = styled.div`
    position: absolute;
    
    font-size: 3vw;
    text-align: end;
    color: ${Color.slightlyGrayishYellow};
    font-weight: bold;
    
    user-select: none;
    user-drag: none;

    top: 3%;
    left: 0;
    right: 3%;
    margin: auto;

    z-index: 999;

    &::before{
        content: "";
        display: inline-block;
        background: url(${CoinImage});
        background-position: center center;
        background-repeat: no-repeat;
        background-size: contain;
        width: 4vw;
        height: 4vw;
        margin-right: 1vw;
        vertical-align: middle;
    }
`;

function Money() {

  const [money, setMoney] = useState(0);

  useEffect(() => {
    setMoney(getCookie("money"));
  });

  return (
      <BuildingCoin>{money}</BuildingCoin>
  );
}


export default Money;
