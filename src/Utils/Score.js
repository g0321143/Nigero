import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import starOff from '../Assets/Images/StarOff.png';
import starOn from '../Assets/Images/StarOn.png';

const Block = styled.div`
    display:flex;
    
    width: ${(props) => props.width};
    height: ${(props) => props.height};

    flex-direction: row;
    align-items: center;
    justify-content: center;
`;


const Star = styled.div`
  display:flex;
  
  width: ${(props) => props.width};
  height: ${(props) => props.height};

  background-image: url(${(props) => props.isShine ? starOn : starOff});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  opacity: 1;
  z-index: 999;
`;

function Score({ width, height, star1, star2, star3 }) {

    return (
        <Block width={width} hegiht={height} >
            <Star height={height} isShine={star1} />
            <Star height={height} isShine={star2} />
            <Star height={height} isShine={star3} />
        </Block>
    );
}

// props ごとの型定義を記述 (jsだと型宣言ができないのでprop-typesを追加して，指定してる)
Score.propTypes = {
    width: PropTypes.string,
    hegiht: PropTypes.string,
    star1: PropTypes.bool,
    star2: PropTypes.bool,
    star3: PropTypes.bool
};

// props ごとのデフォルトの値
Score.defaultProps = {
    width: '9%',
    hegiht: '3%',
    star1: false,
    star2: false,
    star3: false
};

export default Score;
