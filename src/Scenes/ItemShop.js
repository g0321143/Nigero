import React, { Suspense, useRef, useEffect, useState } from "react";
import Modal from "react-modal";
import styled from 'styled-components';

import { Game_Canvas, Block_Right_End } from '../Utils/GlobalStyles';
import Color from "../Constants/Color";
import HeaderText from '../Utils/HeaderText';
import Money from '../Utils/Money'
import Button from '../Utils/Button';
import Store from '../Utils/Store';
import Tab from '../Elements/ItemShopTab';
import { Light, AntiSeismicMat } from '../Constants/Items';

import backButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-05.png';
import CoinImage from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-12.png';
import buyButton from '../Assets/Images/BUY_BOTTON-38.png';

const itemType = {
    name: '',
    price: '',
    image: '',
    info: '',
    url: ''
};

export default function ItemShop() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [item, setItem] = useState(itemType);

    const clickItemPanel = (item) => {
        setItem(item);
        setIsOpen(true);
    };

    const LightTab = () => (
        <Panel>
            <ItemPanel onClick={() => clickItemPanel(Light.NightStarJP)}>
                <ItemPrice>{Light.NightStarJP.price}</ItemPrice>
                <ItemImage src={Light.NightStarJP.image} />
                <ItemName>{Light.NightStarJP.name}</ItemName>
            </ItemPanel>
            <ItemPanel />
            <ItemPanel />
            <ItemPanel />
            <ItemPanel />
            <ItemPanel />
            <ItemPanel />
            <ItemPanel />
            <ItemPanel />
        </Panel>
    );

    const FoodTab = () => (
        <Panel>
            <ItemPanel />
            <ItemPanel />
            <ItemPanel />
            <ItemPanel />
            <ItemPanel />
            <ItemPanel />
            <ItemPanel />
            <ItemPanel />
        </Panel>
    );

    const AntiTumble = () => (
        <Panel>
            <ItemPanel />
            <ItemPanel />
            <ItemPanel />
            <ItemPanel />
            <ItemPanel />
            <ItemPanel />
            <ItemPanel />
            <ItemPanel />
            <ItemPanel />
            <ItemPanel />
            <ItemPanel />
            <ItemPanel />
            <ItemPanel />
            <ItemPanel />
            <ItemPanel />
            <ItemPanel />
        </Panel>
    );

    return (
        <Game_Canvas>
            <HeaderText text={"ITEM SHOP"} />
            <Money />
            <Block_Right_End>
                <Button
                    handler={() => Store.setScene('title')}
                    src={backButton}
                    width={'6%'}
                    height={'10%'}
                    margin={'1%'}
                />
            </Block_Right_End>
            <Wrap>
                <Tab
                    title={['LIGHT', 'FOOD', 'Anti-tumble']}
                    content={[
                        <LightTab />,
                        <FoodTab />,
                        <AntiTumble />
                    ]}
                />
            </Wrap>
            <Modal isOpen={modalIsOpen} style={modalStyle} onRequestClose={() => setIsOpen(false)}>
                <ModalDiv1>
                    <ItemImage src={Light.NightStarJP.image} width={"10vw"} />
                    <Button
                        handler={() => setIsOpen(false)}
                        src={buyButton}
                        width={'12vw'}
                        height={'5vw'}
                        margin={'0%'}
                    />
                </ModalDiv1>
                <ModalDiv2>
                    <ItemName>{item.name}</ItemName>
                    <ItemPrice>{item.price}</ItemPrice>
                    <ModalInfoBox>{item.info}</ModalInfoBox>
                </ModalDiv2>
                <Close onClick={() => setIsOpen(false)}/>
            </Modal>
        </Game_Canvas>
    );
}





const Wrap = styled.div`
    position: relative;
    width: 85%;
    Top: 12%;
    margin:auto;
    z-index: 500;
`;

const Panel = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap
`;

const ItemPanel = styled.div`
    display: flex;
    background: ${Color.slightlyGrayishYellow};
    box-shadow: 0 0.4vw 0.8vw rgba(0, 0, 0, 0.25);
    border-bottom: solid 0.4vw #f5da7a;
    border-radius: 1.2vw;
    margin: 0.7vw;

    flex-direction: column;
    justify-content: center;
    align-items: center;

    border-radius: 5%;
    width: 17vw;
    height: 23vw;

    cursor: pointer;

    :hover {
        opacity: 1;
        background: #f5e5ab;
        box-shadow: 0;
        border-bottom: solid 0vw;
    }
`;

const ItemPrice = styled.div`
    display: flex;
    
    font-size: 2.5vw;
    text-align: center;
    color: ${Color.softYellow};
    font-weight: bold;
    
    user-select: none;
    user-drag: none;

    z-index: 500;

    &::before{
        position:relative;
        top:0.5vw;
        content: "";
        display: inline-block;
        background: url(${CoinImage});
        background-position: center center;
        background-repeat: no-repeat;
        background-size: contain;
        width: 2.5vw;
        height: 2.5vw;
        margin-right: 1vw;
        vertical-align: middle;
    }
`;

const ItemImage = styled.img`
    display: flex;
    url(${(props) => props.src});

    width:80%;
    margin: 0.7vw;

    border: solid 0.2vw #f5da7a;

    user-select: none;
    user-drag: none;

    z-index: 500;
`;

const ItemName = styled.div`
    display: flex;
    
    font-size: 2.5vw;
    text-align: center;
    color: ${Color.softYellow};
    font-weight: bold;
    
    user-select: none;
    user-drag: none;

    z-index: 500;
`;

const modalStyle = {

    overlay: {
        zIndex: 1000,
        width: "100vw",
        aspectRatio: "16 / 9",
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
        backgroundColor: Color.slightlyGrayishYellow,
        borderRadius: "2vw",
        padding: "1.5rem"
    }
};

const ModalDiv1 = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40%;
    margin:auto;
`;

const ModalDiv2 = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    width: 60%;
    margin:auto;
`;

const ModalInfoBox = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    padding: 2vw 2vw;
    background: ${Color.softYellow};
    color: ${Color.slightlyGrayishYellow};
    font-weight: bold;
    border-radius: 2vw;
    height: 15vw;
    width: 90%;
`;

const Close = styled.div`
    display: block;
    position: absolute;
    top: 5%;
    right: 5%;
    width: 5vw;
    height: 5vw;
    cursor: pointer;
    z-index: 1000;

    &::before, &::after{
        content: "";
        position: absolute;
        border-radius: 1vw;
        top: 50%;
        left: 50%;
        width: 0.5vw;
        height: 3vw;
        background: #808080;
    }
    &::before{
        transform: translate(-50%,-50%) rotate(45deg);
    }
    &::after{
        transform: translate(-50%,-50%) rotate(-45deg);
    }

    :hover{
        background: #e6e6e6;
        border-radius: 50%;

    }
`;