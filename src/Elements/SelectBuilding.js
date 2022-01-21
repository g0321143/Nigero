import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, useProgress } from "@react-three/drei";
import styled from 'styled-components';

import Store from '../Utils/Store';
import Color from "../Constants/Color";
import HeaderText from '../Utils/HeaderText';
import Buildings from '../Constants/Buildings';
import StarScore from "../Utils/StarScore";
import Money from '../Utils/Money'
import { getBuilding, getCoin, getScore, setBuilding, subCoin } from "../Utils/LocalStorage";
import { Block_Column_Top } from "../Utils/GlobalStyles";
import { ArrowRight, ArrowLeft } from '../Utils/ArrowStyles';

import unlockButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-20.png';
import buyButton from '../Assets/Images/BUY_BOTTON-38.png';
import playButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-21.png';
import playQuizButton from '../Assets/Images/1-02.png';
import CoinImage from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-12.png';


export default function SelectBuilding({ currentBuilding }) {


    // 表示する建物の情報
    const IDList = [
        Buildings.elevator.id,
        Buildings.tallBuilding.id,
        Buildings.house.id,
    ];

    const [initBuilding] = useState(IDList.findIndex(e => e == currentBuilding));

    // 現在選択されている建物のインデックス
    const [buildingNum, setBuildingNum] = useState(initBuilding);

    // 表示する建物の数
    const BUILDING_MAX = 2;
    const BUILDING_MIN = 0;


    // 右矢印を押した時の処理
    const moveRightBuilding = () => {
        if (buildingNum == BUILDING_MIN) return;

        setBuildingNum(buildingNum - 1);
        Store.setBuilding(Buildings[IDList[buildingNum - 1]].id);
    };

    // 左矢印を押した時の処理
    const moveLeftBuilding = () => {
        if (buildingNum == BUILDING_MAX) return;

        setBuildingNum(buildingNum + 1);
        Store.setBuilding(Buildings[IDList[buildingNum + 1]].id);
    };

    // 建物の購入処理
    const buyBuilding = (e) => {
        if (getCoin() - Buildings[IDList[buildingNum]].price >= 0) {
            setBuilding(IDList[buildingNum], true);
            subCoin(Buildings[IDList[buildingNum]].price);
            Store.setScene('select');
        }
    };

    return (
        <Suspense fallback={<Loader/>}>
            <HeaderText text={"SELECT BUILDING"} />
            <Money />
            <BlockBuildingButton>
                <BuildingButton src={Buildings[IDList[buildingNum]].nameTagImage} />
                {getBuilding(IDList[buildingNum]) && (
                    <UsedButton src={playButton} onClick={() => Store.setScene('game')} />
                )}
                {getScore(IDList[buildingNum])[0] == true &&
                    getScore(IDList[buildingNum])[1] == true &&
                    getScore(IDList[buildingNum])[2] == true && (
                        <QuizButton src={playQuizButton} onClick={() => Store.setScene('quize')} />
                    )}
                {getBuilding(IDList[buildingNum]) && (
                    <StarScore
                        width={"4.5vw"}
                        star1={getScore(IDList[buildingNum])[0]}
                        star2={getScore(IDList[buildingNum])[1]}
                        star3={getScore(IDList[buildingNum])[2]}
                    />
                )}
                {!getBuilding(IDList[buildingNum]) && (
                    <>
                        {getScore(IDList[buildingNum + 1])[0] &&
                            <UsedButton src={buyButton} onClick={(e) => buyBuilding(e)} />
                        }
                        {!getScore(IDList[buildingNum + 1])[0] &&
                            <UsedButton src={unlockButton} />
                        }
                        <BuildingPrice>{Buildings[IDList[buildingNum]].price.toLocaleString()}</BuildingPrice>
                    </>
                )}

            </BlockBuildingButton>
            <ArrowRight handler={() => moveRightBuilding()} />
            <ArrowLeft handler={() => moveLeftBuilding()} />
            <Canvas camera={{ position: [0, 3, -10], fov: 90 }}>
                <ambientLight intensity={1} />
                <directionalLight
                    position={[-2.5, 8, 5]}
                    intensity={10}
                />
                <BuildingGroup initBuilding={initBuilding} buildingNum={buildingNum} />
            </Canvas>
        </Suspense>
    );
}

function BuildingGroup({ initBuilding, buildingNum }) {

    // 建物グループへのRef
    const buildingGroupRef = useRef();

    // 回転させる円の半径
    const radius = 7;

    useFrame(() => {
        if (buildingGroupRef.current.rotation.y > ((Math.PI / 2) * (buildingNum + 1))) {
            buildingGroupRef.current.rotation.y -= (Math.PI / 60);
        }

        if (buildingGroupRef.current.rotation.y < ((Math.PI / 2) * (buildingNum + 1))) {
            buildingGroupRef.current.rotation.y += (Math.PI / 60);
        }
    });

    return (
        <group ref={buildingGroupRef} position={[0, 2.5, 0]} rotation={[0, (Math.PI / 2) * (initBuilding + 1), 0]}>
            <House position={[radius * Math.sin(Math.PI * 1.5), -0.6, radius * Math.cos(Math.PI * 1.5) + 1]} rotation={[0.3, Math.PI / 2 + 0.5, 0]} />
            <TallBuilding position={[radius * Math.sin(Math.PI), 0.5, -1 * radius * Math.cos(Math.PI) + 0.9]} rotation={[0.1, -Math.PI / 2, 0]} />
            <Elevator position={[radius * Math.sin(Math.PI / 2) - 1, 0, radius * Math.cos(Math.PI / 2)]} rotation={[0, 0, 0]} />
        </group>
    )
}

function Elevator(props) {
    const { scene } = useGLTF('./Models/Elevator.glb');

    const ref = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        ref.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20;
        ref.current.rotation.x = Math.cos(t / 4) / 8;
        ref.current.rotation.y = Math.sin(t / 4) / 8 - Math.PI / 4;
        ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
    });


    return (
        <group {...props}>
            <primitive
                ref={ref}
                object={scene}
                scale={0.6}
            />
        </group>
    )
}

function House(props) {
    const { scene } = useGLTF('./Models/House.glb');

    const ref = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        ref.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20;
        ref.current.rotation.x = Math.cos(t / 4) / 8;
        ref.current.rotation.y = Math.sin(t / 4) / 8 - Math.PI / 4;
        ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
    });


    return (
        <group {...props}>
            <primitive
                ref={ref}
                object={scene}
                scale={0.3}
            />
        </group>
    );
}

function TallBuilding(props) {
    const { scene } = useGLTF('./Models/TallBuilding.glb');

    const ref = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        ref.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20;
        ref.current.rotation.x = Math.cos(t / 4) / 8;
        ref.current.rotation.y = Math.sin(t / 4) / 8 - Math.PI / 4;
        ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
    });


    return (
        <group {...props}>
            <primitive
                ref={ref}
                object={scene}
                scale={0.08}
            />
        </group>
    );
}

function Loader() {
    const { active, progress, errors, item, loaded, total } = useProgress();

    return (
        <LodingScene>
            {Math.floor(progress * 100) / 100} % loaded
            {item}
        </LodingScene>
    );
}



const BlockBuildingButton = styled(Block_Column_Top)`
    justify-content: center;
    justify-content: flex-start;
`;

const BuildingButton = styled.img`
    display: flex;

    height: 5vw;

    margin-top: 5vw;

    url(${(props) => props.src});
    z-index: 999;
`;

const UsedButton = styled.img`
    display: flex;

    width: 15vw;
    margin-top: 26vw;
    margin-bottom: 0.5vw;

    url(${(props) => props.src});
    z-index: 999;
    opacity: 0.9;

    :hover {
        cursor: pointer;
        opacity: 1;
    }
`;

const QuizButton = styled.img`
    display: flex;

    width: 15vw;
    margin-top: 0.5vw;
    margin-bottom: 0.5vw;

    url(${(props) => props.src});
    z-index: 999;
    opacity: 0.9;

    :hover {
        cursor: pointer;
        opacity: 1;
    }
`;

const BuildingPrice = styled.div`
    display: flex;
    
    font-size: 3vw;
    text-align: center;
    color: ${Color.slightlyGrayishYellow};
    font-weight: bold;
    
    user-select: none;
    user-drag: none;

    z-index: 999;

    &::before{
        content: "";
        display: inline-block;
        background: url(${CoinImage});
        background-position: center center;
        background-repeat: no-repeat;
        background-size: contain;
        width: 4vw;
        height: 4vw;
        margin-right: 1vw;
        vertical-align: middle;
    }
`;


const LodingScene = styled.div`
    display:flex;
    position: absolute;

    width: 40vw;
    height: 20vw;

    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;

    user-select: none;
    user-drag: none;

    opacity: 1;
    z-index: 500;

    align-items: center;
    justify-content: center;
    flex-direction: column;

    font-size: 3vw;
    text-align: center;
    color: ${Color.slightlyGrayishYellow};
    font-weight: bold;
`;