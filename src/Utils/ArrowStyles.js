import styled from 'styled-components';
import Arrow_Right from '../Assets/Images/Arrow_Right.png';
import Arrow_Left from '../Assets/Images/Arrow_Left.png';

export const Arrow_r = styled.div`
    position: absolute;

    width: 5vw;
    height: 5vw;

    top: 45%;
    right: 10%;

    background-image: url(${Arrow_Right});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    opacity: 0.9;
    z-index: 999;

    :hover {
        cursor: pointer;
        opacity: 1;
        transform: scale(1.1);
    }
`;

export const Arrow_l = styled.div`
    position: absolute;

    width: 5vw;
    height: 5vw;

    top: 45%;
    left: 10%;

    background-image: url(${Arrow_Left});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    opacity: 0.9;
    z-index: 999;

    :hover {
        cursor: pointer;
        opacity: 1;
        transform: scale(1.1);
    }
`;