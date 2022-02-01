import React, { useState } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");
import styled from 'styled-components';
import Color from '../Constants/Color';
import { Block_Left_Top, Block_Right_End } from '../Utils/GlobalStyles';
import Button from '../Utils/Button';

import tipsBox from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_4-15.png';
import hintButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-06.png';

/**
 * Tipsを表示します
 * @param {String} text 表示するテキスト
 * @param {boolean} isLeft ヒントアイコンの位置 trueなら左上に表示，falseなら右下に表示
 */
export default function Tips({ text, isLeft }) {
    const [modalIsOpen, setIsOpen] = useState(false);

    return (
        <>
            {isLeft && <Block_Left_Top>
                <Button
                    handler={() => setIsOpen(true)}
                    src={hintButton}
                    width={'6%'}
                    height={'10%'}
                    margin={'1%'}
                />
            </Block_Left_Top>}
            {!isLeft && <Block_Right_End>
                <Button
                    handler={() => setIsOpen(true)}
                    src={hintButton}
                    width={'6%'}
                    height={'10%'}
                    margin={'1%'}
                />
            </Block_Right_End>}
            <Modal isOpen={modalIsOpen} style={modalStyle} onRequestClose={() => setIsOpen(false)}>
                <TipsContent>
                    <TipsText>
                        {
                            text.split("\n").map((item, index) => (
                                <React.Fragment key={index}>
                                    {item}<br />
                                </React.Fragment>
                            ))
                        }
                    </TipsText>
                </TipsContent>
                {/* <Close onClick={() => setIsOpen(false)} /> */}
            </Modal>
        </>
    );
};

const modalStyle = {

    overlay: {
        zIndex: 1000,
        width: "100vw",
        height: "56.25vw",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    content: {
        zIndex: 1000,
        position: "absolute",
        display: "flex",
        top: "18%",
        left: "18%",
        right: "18%",
        bottom: "20%",
        background: 'none',
        border: 'none',
        padding: 0,
    }
};

const TipsContent = styled.div`
    display:flex;
    position: relative;

    width: 100%;
    height: 100%;


    user-select: none;
    user-drag: none;

    background-image: url(${tipsBox});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;

    z-index: 1000;

    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

const TipsText = styled.div`
    display:flex;
    position: relative;


    top: 10%;
    width: 80%;
    height: 70%;


    user-select: none;
    user-drag: none;

    z-index: 1000;

    align-items: center;
    justify-content: center;
    flex-direction: column;
    overflow-wrap: break-word;

    font-size: 1.5vw;
    overflow-wrap: break-word;
    align-items: flex-start;
    justify-content: flex-start;
    color: ${Color.slightlyGrayishYellow};
`;