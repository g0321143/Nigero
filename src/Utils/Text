import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ScoreText = styled.div`
display:flex;
font-size: 3.5rem;
color: #B9B179;
position: absolute;
top: ${props => props.top};
left: ${props => props.left};
`;

// 未完成です
function Score({text}) {
    return (
        <ScoreText>
            {text}
        </ScoreText>
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
    text: 'default',
    top: '0',
    left: '0'
};

export default Score;
