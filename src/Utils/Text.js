import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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


const ScoreText = styled.div`
  display:flex;
  font-size: 3vw;
  color: #B9B179;

  width: 10%;
  height: 10%;
  margin: 2%;


  font-weight: bold;
  justify-content: flex-end;
  align-items: center;
  text-shadow: 1px 1px 2px silver;
  
  user-select: none;
  user-drag: none;
  
  z-index: 999;
`;

// 未完成です
function Score({text}) {
    return (
        <Block>
        <ScoreText>
            {text}
        </ScoreText>
        </Block>
    );
}

// props ごとの型定義を記述 (jsだと型宣言ができないのでprop-typesを追加して，指定してる)
Score.propTypes = {
    text: PropTypes.string,
    top: PropTypes.string,
    left: PropTypes.string
};

// props ごとのデフォルトの値
Score.defaultProps = {
    text: 'default'
};

export default Score;
