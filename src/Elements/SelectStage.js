import React, { Suspense, useEffect, useState } from "react";
import styled from 'styled-components';

import Store from '../Utils/Store';
import Color from "../Constants/Color";
import HeaderText from '../Utils/HeaderText';
import StarScore from "../Utils/StarScore";
import { Block_Column_Top } from "../Utils/GlobalStyles";

import overheadImage from "../Assets/Images/overhead.png"


export default function SelectStage({ handler }) {

    // 選択されているステージを保存
    const [selectNum, selectedNum] = useState(0);

    const selectStage = (Num) => {
        Store.setStage(Num);
        Store.setScene('game');
    }


    return (
        <Suspense fallback={null}>
            <HeaderText text={"SELECT STAGE"} />
            <SelestStageBlock>
                <StageBlock isSelect={selectNum == 1 ? true : false}>
                    <CircleNum>{"1"}</CircleNum>
                    <OverheadBox
                        content={"Magnitude 4"}
                        onClick={() => selectStage(1)}
                    />
                    <StarScore width={"4vw"} star1={true} star2={false} star3={true} />
                    <TimeText fontsize={"2.5vw"} >{"4:00"}</TimeText>
                </StageBlock>

                <StageBlock isSelect={selectNum == 2 ? true : false}>
                    <CircleNum>{"2"}</CircleNum>
                    <OverheadBox
                        content={"Magnitude 6"}
                        onClick={() => selectStage(2)}
                    />
                    <StarScore width={"4vw"} star1={true} star2={false} star3={false} />
                    <TimeText fontsize={"2.5vw"} >{"3:30"}</TimeText>
                </StageBlock>

                <StageBlock isSelect={selectNum == 3 ? true : false}>
                    <CircleNum>{"3"}</CircleNum>
                    <OverheadBox
                        content={"Magnitude 6"}
                        onClick={() => selectStage(3)}
                    />
                    <StarScore width={"4vw"} star1={true} star2={true} star3={false} />
                    <TimeText fontsize={"2.5vw"} >{"2:30"}</TimeText>
                </StageBlock>

                <StageBlock isSelect={selectNum == 4 ? true : false}>
                    <CircleNum>{"4"}</CircleNum>
                    <OverheadBox
                        content={"Magnitude 8"}
                        onClick={() => selectStage(4)}
                    />
                    <StarScore width={"4vw"} star1={true} star2={true} star3={true} />
                    <TimeText fontsize={"2.5vw"} >{"2:30"}</TimeText>
                </StageBlock>

            </SelestStageBlock>
        </Suspense>
    );
}

const SelestStageBlock = styled(Block_Column_Top)`
    top 0;
    position: absolute;
    flex-direction: row;
    justify-content: center;
`;

const CircleNum = styled.div`
    background: ${Color.softYellow};
    border-radius: 50%;
    width: 3vw;
    height: 3vw;

    color: ${Color.slightlyGrayishYellow};
    font-size: 2vw;
    font-weight: bold;
    text-align: center;
    line-height: 3vw;
`;

const TimeText = styled.div`
    display: flex;
    
    font-size: ${(props) => props.fontsize};
    text-align: center;
    color: ${Color.slightlyGrayishYellow};
    font-weight: bold;
`;


const StageBlock = styled(Block_Column_Top)`
    display: flex;
    position: relative;

    top 2vw;
    width: 20vw;
    
    margin 0 1vw 0 1vw;
    justify-content: center;
    
    user-select: none;
    user-drag: none;

    z-index: 500;
    
    &:hover{
        background: ${Color.dimGrayishGreen};
    }
`;

const OverheadBox = styled.div`
    background: ${Color.softYellow};
    margin: 1vw;

    border-radius: 5%;
    width: 18vw;
    height: 23vw;
    
    padding-top: 2vw;
    font-size: 2vw;
    text-align: center;
    color: ${Color.slightlyGrayishYellow};
    font-weight: bold;

    cursor: pointer;
    
    &:after{
        content: "${(props) => props.content}";
        display: inline-block;
        background: url(${overheadImage});
        background-position: center center;
        background-repeat: no-repeat;
        background-size: contain;
        width: 16vw;
        height: 20vw;
        vertical-align: middle;
    }
`;

