import React, { Suspense, useEffect, useState } from "react";
import styled from 'styled-components';

import Store from '../Utils/Store';
import Color from "../Constants/Color";
import HeaderText from '../Utils/HeaderText';
import StarScore from "../Utils/StarScore";
import { Block_Column_Top } from "../Utils/GlobalStyles";


export default function SelectStage(props) {

    // 選択されているステージを保存
    const [selectNum, selectedNum] = useState(0);

    // selectNumがアップデートした時に選択されているステージを登録
    useEffect(() =>
        Store.setStage(selectNum), [selectNum]
    );

    return (
        <Suspense fallback={null}>
            <HeaderText text={"SELECT STAGE"} />
            <SelestStageBlock>
                <StageBlock>
                    <CircleNum>{"1"}</CircleNum>
                    <TestBox
                        onClick={() => selectedNum(1)}
                        isSelect={selectNum == 1 ? true : false}
                    />
                    <StarScore width={"4vw"} star1={true} star2={false} star3={false} />
                    <TimeText fontsize={"2.5vw"} >{"4:00"}</TimeText>
                </StageBlock>

                <StageBlock>
                    <CircleNum>{"2"}</CircleNum>
                    <TestBox
                        onClick={() => selectedNum(2)}
                        isSelect={selectNum == 2 ? true : false}
                    />
                    <StarScore width={"4vw"} star1={true} star2={true} star3={false} />
                    <TimeText fontsize={"2.5vw"} >{"3:30"}</TimeText>
                </StageBlock>

                <StageBlock>
                    <CircleNum>{"3"}</CircleNum>
                    <TestBox
                        onClick={() => selectedNum(3)}
                        isSelect={selectNum == 3 ? true : false}
                    />
                    <StarScore width={"4vw"} star1={true} star2={true} star3={false} />
                    <TimeText fontsize={"2.5vw"} >{"2:30"}</TimeText>
                </StageBlock>

                <StageBlock>
                    <CircleNum>{"4"}</CircleNum>
                    <TestBox
                        onClick={() => selectedNum(4)}
                        isSelect={selectNum == 4 ? true : false}
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
    
`;

const TestBox = styled.div`
    background: ${(props) => props.isSelect ? Color.deepRed : Color.softYellow};
    margin: 1vw;

    border-radius: 5%;
    width: 20vw;
    height: 25vw;
    
    cursor: pointer;

    &:hover{
        background: ${(props) => props.isSelect ? Color.deepRed : Color.softOrange};
    }
    
`;

