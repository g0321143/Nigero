import styled from 'styled-components';
import ArrowRightImage from '../Assets/Images/Arrow_Right.png';
import ArrowLeftImage from '../Assets/Images/Arrow_Left.png';

const Arrow_r = styled.div`
    position: absolute;

    width: 5vw;
    height: 5vw;

    top: 45%;
    right: 10%;

    background-image: url(${ArrowRightImage});
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

const Arrow_l = styled.div`
    position: absolute;

    width: 5vw;
    height: 5vw;

    top: 45%;
    left: 10%;

    background-image: url(${ArrowLeftImage});
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


export function ArrowRight({ handler }) {
    return (
        <Arrow_r onClick={handler}/>
    );
}


export function ArrowLeft({ handler }) {
    return (
        <Arrow_l onClick={handler}/>
    );
}