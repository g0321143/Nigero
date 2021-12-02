import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ScoreText = styled.div`
display:flex;
font-size: 3.4rem;
color: red;
`;

function Score({text}) {
    return (
        <ScoreText>
            {text}
        </ScoreText>
    );
}

// props ごとの型定義を記述 (jsだと型宣言ができないのでprop-typesを追加して，指定してる)
Score.propTypes = {
    text: PropTypes.string
};

// props ごとのデフォルトの値
Score.defaultProps = {
    text: 'default',
};

export default Score;
