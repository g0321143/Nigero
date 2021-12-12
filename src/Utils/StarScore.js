import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import starOff from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-25.png';
import starOn from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-24.png';

const UnorderedList = styled.ul`

    display:flex;
    justify-content: center;
    padding 0;
    margin 0;

    user-select: none;
    user-drag: none;
    z-index: 999;
`;

const List = styled.li`
    list-style: none;
`;

const Star = styled.img` 
    width: ${(props) => props.width};
`;

function StarScore({ width, star1, star2, star3 }) {

    return (
        <UnorderedList width={width}>
           <List><Star width={width} src={star1 ? starOn : starOff} /></List>
           <List><Star width={width} src={star2 ? starOn : starOff} /></List>
           <List><Star width={width} src={star3 ? starOn : starOff} /></List>
        </UnorderedList>
    );
}

// props ごとの型定義を記述 (jsだと型宣言ができないのでprop-typesを追加して，指定してる)
StarScore.propTypes = {
    width: PropTypes.string,
    star1: PropTypes.bool,
    star2: PropTypes.bool,
    star3: PropTypes.bool
};

// props ごとのデフォルトの値
StarScore.defaultProps = {
    width: '10vw',
    star1: false,
    star2: false,
    star3: false
};

export default StarScore;
