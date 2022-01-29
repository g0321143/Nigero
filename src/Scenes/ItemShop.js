import React, { Suspense, useRef, useEffect, useState } from "react";
import Modal from "react-modal";
Modal.setAppElement("#root");
import styled from 'styled-components';

import { Game_Canvas, Block_Right_End } from '../Utils/GlobalStyles';
import Color from "../Constants/Color";
import HeaderText from '../Utils/HeaderText';
import Money from '../Utils/Money'
import Button from '../Utils/Button';
import Store from '../Utils/Store';
import Tab from '../Elements/ItemShopTab';
import { Light,LightJp,LightEn, AntiSeismicMat, Food, FoodJp, AntiSeismicMatEn, AntiSeismicMatJp, FoodEn } from '../Constants/Items';
import { setScore, getLanguage, getCoin, subCoin, setitem, getItemLock, getItemBuy } from '../Utils/LocalStorage';

import backButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-05.png';
import CoinImage from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-12.png';
import buyButton from '../Assets/Images/BUY_BOTTON-38.png';

const itemType = {
    name: '',
    price: '',
    id: '',
    id2: '',
    image: '',
    info: '',
    url: ''
};

export default function ItemShop({preScene}) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [item, setItem] = useState(itemType);
    const Category=[
        'light',
        'food',
        'antiSeismicMat',
    ];
    const Itemlist=[
        'NightStarJP',
        'AqumoCandle',
        'Helmet',
        'PortableWaterPurifiers',
        'PortableToiletst',
        'DisasterPreventionKit',
        'TablewareOrigami',
        'Emergencyrations',
        'Emergencyrations2',
        'AntiSeismicGel',
        'Tensionrod',
        'AntiShatteringFilm',

    ];
    const clickItemPanel = (item) => {
        setItem(item);
        setIsOpen(true);
    };
    const BuyItem = (item) =>{
        if(getCoin() >= item.ice){
            //購入済みの場合
            if(getItemBuy(Category[item.id],Itemlist[item.id2]) == true){
                console.log('すでに購入済です。');
            }else{
                subCoin(item.price);
                setitem(Category[item.id],Itemlist[item.id2],true,true);
            }
        }else{
            console.log('購入出来ません');
        }
        setIsOpen(false);
    }
    if(getLanguage() == 'jp'){
        Light.NightStarJP.name = LightJp.NightStarJP.name;
        Light.NightStarJP.info = LightJp.NightStarJP.info;

        Light.AQUMOCANDLE.name = LightJp.AQUMOCANDLE.name;
        Light.AQUMOCANDLE.info = LightJp.AQUMOCANDLE.info;

        Light.Helmet.name = LightJp.Helmet.name;
        Light.Helmet.info = LightJp.Helmet.info;

        Light.PortableWaterPurifiers.name = LightJp.PortableWaterPurifiers.name;
        Light.PortableWaterPurifiers.info = LightJp.PortableWaterPurifiers.info;

        Light.PortableToiletst.name = LightJp.PortableToiletst.name;
        Light.PortableToiletst.info = LightJp.PortableToiletst.info;

        Light.DisasterPreventionKit.name = LightJp.DisasterPreventionKit.name;
        Light.DisasterPreventionKit.info = LightJp.DisasterPreventionKit.info;

        Light.TablewareOrigami.name = LightJp.TablewareOrigami.name;
        Light.TablewareOrigami.info = LightJp.TablewareOrigami.info;

        Food.Emergencyrations.name = FoodJp.Emergencyrations.name;
        Food.Emergencyrations.info = FoodJp.Emergencyrations.info;

        Food.Emergencyrations2.name = FoodJp.Emergencyrations2.name;
        Food.Emergencyrations2.info = FoodJp.Emergencyrations2.info;

        AntiSeismicMat.AntiSeismicGel.name = AntiSeismicMatJp.AntiSeismicGel.name;
        AntiSeismicMat.AntiSeismicGel.info = AntiSeismicMatJp.AntiSeismicGel.info;

        AntiSeismicMat.Tensionrod.name = AntiSeismicMatJp.Tensionrod.name;
        AntiSeismicMat.Tensionrod.info = AntiSeismicMatJp.Tensionrod.info;

        AntiSeismicMat.AntiShatteringFilm.name = AntiSeismicMatJp.AntiShatteringFilm.name;
        AntiSeismicMat.AntiShatteringFilm.info = AntiSeismicMatJp.AntiShatteringFilm.info;
    }else{
        Light.NightStarJP.name = LightEn.NightStarJP.name;
        Light.NightStarJP.info = LightEn.NightStarJP.info;

        Light.AQUMOCANDLE.name = LightEn.AQUMOCANDLE.name;
        Light.AQUMOCANDLE.info = LightEn.AQUMOCANDLE.info;

        Light.Helmet.name = LightEn.Helmet.name;
        Light.Helmet.info = LightEn.Helmet.info;

        Light.PortableWaterPurifiers.name = LightEn.PortableWaterPurifiers.name;
        Light.PortableWaterPurifiers.info = LightEn.PortableWaterPurifiers.info;

        Light.PortableToiletst.name = LightEn.PortableToiletst.name;
        Light.PortableToiletst.info = LightEn.PortableToiletst.info;

        Light.DisasterPreventionKit.name = LightEn.DisasterPreventionKit.name;
        Light.DisasterPreventionKit.info = LightEn.DisasterPreventionKit.info;

        Light.TablewareOrigami.name = LightEn.TablewareOrigami.name;
        Light.TablewareOrigami.info = LightEn.TablewareOrigami.info;

        Food.Emergencyrations.name = FoodEn.Emergencyrations.name;
        Food.Emergencyrations.info = FoodEn.Emergencyrations.info;

        Food.Emergencyrations2.name = FoodEn.Emergencyrations2.name;
        Food.Emergencyrations2.info = FoodEn.Emergencyrations2.info;

        AntiSeismicMat.AntiSeismicGel.name = AntiSeismicMatEn.AntiSeismicGel.name;
        AntiSeismicMat.AntiSeismicGel.info = AntiSeismicMatEn.AntiSeismicGel.info;

        AntiSeismicMat.Tensionrod.name = AntiSeismicMatEn.Tensionrod.name;
        AntiSeismicMat.Tensionrod.info = AntiSeismicMatEn.Tensionrod.info;

        AntiSeismicMat.AntiShatteringFilm.name = AntiSeismicMatEn.AntiShatteringFilm.name;
        AntiSeismicMat.AntiShatteringFilm.info = AntiSeismicMatEn.AntiShatteringFilm.info;
    }

    const LightTab = () => (
        <Panel>
            <ItemPanel onClick={() => clickItemPanel(Light.NightStarJP)}>
                <ItemPrice>{Light.NightStarJP.price}</ItemPrice>
                <ItemImage src={Light.NightStarJP.image} />
                <ItemName2>{Light.NightStarJP.name}</ItemName2>
            </ItemPanel>
            <ItemPanel onClick={() => clickItemPanel(Light.AQUMOCANDLE)}>
                <ItemPrice>{Light.AQUMOCANDLE.price}</ItemPrice>
                <ItemImage src={Light.AQUMOCANDLE.image} />
                <ItemName2>{Light.AQUMOCANDLE.name}</ItemName2>
            </ItemPanel>
            <ItemPanel onClick={() => clickItemPanel(Light.Helmet)}>
                <ItemPrice>{Light.Helmet.price}</ItemPrice>
                <ItemImage src={Light.Helmet.image} />
                <ItemName2>{Light.Helmet.name}</ItemName2>
            </ItemPanel>
            <ItemPanel onClick={() => clickItemPanel(Light.PortableWaterPurifiers)}>
                <ItemPrice>{Light.PortableWaterPurifiers.price}</ItemPrice>
                <ItemImage src={Light.PortableWaterPurifiers.image} />
                <ItemName2>{Light.PortableWaterPurifiers.name}</ItemName2>
            </ItemPanel>
            <ItemPanel onClick={() => clickItemPanel(Light.PortableToiletst)}>
                <ItemPrice>{Light.PortableToiletst.price}</ItemPrice>
                <ItemImage src={Light.PortableToiletst.image} />
                <ItemName2>{Light.PortableToiletst.name}</ItemName2>
            </ItemPanel>
            <ItemPanel onClick={() => clickItemPanel(Light.DisasterPreventionKit)}>
                <ItemPrice>{Light.DisasterPreventionKit.price}</ItemPrice>
                <ItemImage src={Light.DisasterPreventionKit.image} />
                <ItemName3>{Light.DisasterPreventionKit.name}</ItemName3>
            </ItemPanel>
            <ItemPanel onClick={() => clickItemPanel(Light.TablewareOrigami)}>
                <ItemPrice>{Light.TablewareOrigami.price}</ItemPrice>
                <ItemImage src={Light.TablewareOrigami.image} />
                <ItemName2>{Light.TablewareOrigami.name}</ItemName2>
            </ItemPanel>
            <ItemPanel />
            <ItemPanel />
        </Panel>
    );

    const FoodTab = () => (
        <Panel>
            <ItemPanel onClick={() => clickItemPanel(Food.Emergencyrations)}>
                <ItemPrice>{Food.Emergencyrations.price}</ItemPrice>
                <ItemImage src={Food.Emergencyrations.image} />
                <ItemName2>{Food.Emergencyrations.name}</ItemName2>
            </ItemPanel>
            <ItemPanel onClick={() => clickItemPanel(Food.Emergencyrations2)}>
                <ItemPrice>{Food.Emergencyrations2.price}</ItemPrice>
                <ItemImage src={Food.Emergencyrations2.image} />
                <ItemName2>{Food.Emergencyrations2.name}</ItemName2>
            </ItemPanel>
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
            <ItemPanel onClick={() => clickItemPanel(AntiSeismicMat.AntiSeismicGel)}>
                <ItemPrice>{AntiSeismicMat.AntiSeismicGel.price}</ItemPrice>
                <ItemImage src={AntiSeismicMat.AntiSeismicGel.image} />
                <ItemName2>{AntiSeismicMat.AntiSeismicGel.name}</ItemName2>
            </ItemPanel>
            <ItemPanel onClick={() => clickItemPanel(AntiSeismicMat.Tensionrod)}>
                <ItemPrice>{AntiSeismicMat.Tensionrod.price}</ItemPrice>
                <ItemImage src={AntiSeismicMat.Tensionrod.image} />
                <ItemName2>{AntiSeismicMat.Tensionrod.name}</ItemName2>
            </ItemPanel>
            <ItemPanel onClick={() => clickItemPanel(AntiSeismicMat.AntiShatteringFilm)}>
                <ItemPrice>{AntiSeismicMat.AntiShatteringFilm.price}</ItemPrice>
                <ItemImage src={AntiSeismicMat.AntiShatteringFilm.image} />
                <ItemName2>{AntiSeismicMat.AntiShatteringFilm.name}</ItemName2>
            </ItemPanel>
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
                    handler={() => Store.setScene(preScene)}
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
                    <ItemImage src={item.image} width={"10vw"} />
                    <Button
                        handler={() => BuyItem(item)}
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
                    <a href={item.url} target=" _blank">URL</a>
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

const ItemName2 = styled.div`
    display: flex;
    font-size: 1.78vw;
    text-align: center;
    color: ${Color.softYellow};
    font-weight: bold;
    
    user-select: none;
    user-drag: none;

    z-index: 400;
`;

const ItemName3 = styled.div`
    display: flex;
    
    font-size: 1.7vw;
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
    font-size: 1.45vw;
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