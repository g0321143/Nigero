import styled from 'styled-components';


export const Arrow_r = styled.div`
    position: relative;
    padding-left: 5%;
    padding-Top: 5%;
    position: absolute;
    top: 45%;
    right: 10%;
    z-index: 999;
    &::before {
        position: absolute;
        content: '';
        width: 100%;
        height: 100%;
        background: #697b91;
        border-radius: 50%;
        top: 50%;
        left: 0;
        margin-top: -7px;
    }
    &::after {
        position: absolute;
        content: '';
        width: 50%;
        height: 50%;
        border-top: solid 5px #fff;
        border-right: solid 5px #fff;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        top: 60%;
        left: 5px;
        margin-top: -1px;
    }
`;

export const Arrow_l = styled.div`
    position: relative;
    padding-left: 22px;
    position: absolute;
    top: 50%;
    left: 10%;
    z-index: 999;
    &::before {
        position: absolute;
        content: '';
        width: 17px;
        height: 17px;
        background: #697b91;
        border-radius: 50%;
        top: 50%;
        left: 0;
        margin-top: -7px;
    }
    &::after {
        position: absolute;
        content: '';
        width: 4px;
        height: 4px;
        border-top: solid 1px #fff;
        border-right: solid 1px #fff;
        -webkit-transform: rotate(45deg);
        transform: rotate(225deg);
        top: 50%;
        left: 7px;
        margin-top: -1px;
    }
`;