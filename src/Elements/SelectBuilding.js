import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from "@react-three/drei";
import { gsap } from "gsap";
import styled from 'styled-components';

import Store from '../Utils/Store';
import Color from "../Constants/Color";
import HeaderText from '../Utils/HeaderText';
import Buildings from '../Constants/Buildings';
import StarScore from "../Utils/StarScore";
import { getBuilding, getScore } from "../Utils/LocalStorage";
import { Block_Column_Top, Block_Column_End } from "../Utils/GlobalStyles";
import { ArrowRight, ArrowLeft } from '../Utils/ArrowStyles';
import Button from '../Utils/Button';

import unlockButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-20.png';
import playButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-21.png';
import CoinImage from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-12.png';


export default function SelectBuilding() {

    // 建物グループへのRef
    const buildingGroupRef = useRef();

    // 現在選択されている建物のインデックス
    const [buildingNum, setBuildingNum] = useState(0);

    // playボタンを押した時の処理
    const startGame = () => {
        Store.setBuilding(Buildings[IDList[buildingNum]].id);
        Store.setScene('game');
    }

    const startQuize = () => {
        Store.setScene('quize');
    }

    // 表示する建物の数
    const BUILDING_MAX = 2;
    const BUILDING_MIN = 0;

    // 回転させる円の半径
    const radius = 7;

    // 表示する建物の情報
    const IDList = [
        Buildings.house.id,
        Buildings.tallBuilding.id,
        Buildings.elevator.id,
    ];

    // 右矢印を押した時の処理
    const moveRightBuilding = () => {
        if (buildingNum == BUILDING_MAX) return;

        setBuildingNum(buildingNum + 1);

        gsap.to(buildingGroupRef.current.rotation, {
            y: buildingGroupRef.current.rotation.y - Math.PI / 2,
            duration: 0.5
        });
    };

    // 左矢印を押した時の処理
    const moveLeftBuilding = () => {
        if (buildingNum == BUILDING_MIN) return;

        setBuildingNum(buildingNum - 1);

        gsap.to(buildingGroupRef.current.rotation, {
            y: buildingGroupRef.current.rotation.y + Math.PI / 2,
            duration: 0.5
        });
    };

    return (
        <Suspense fallback={"Loading"}>
            <HeaderText text={"SELECT BUILDING"} />
            <BlockBuildingButton>
                <BuildingButton src={Buildings[IDList[buildingNum]].nameTagImage} />

                <Block_Column_End>
                <Button
                    handler={() => startQuize()}
                    src={playButton}
                    width={'20%'}
                    height={'10%'}
                    margin={'1%'}
                />
                </Block_Column_End>
               {getBuilding(IDList[buildingNum]) && (
                    <>
                        <UsedButton src={playButton} onClick={() => startGame()} />
                        <StarScore
                            width={"5vw"}
                            star1={getScore(IDList[buildingNum])[0]}
                            star2={getScore(IDList[buildingNum])[1]}
                            star3={getScore(IDList[buildingNum])[2]}
                        />
                    </>
                )}
                {!getBuilding(IDList[buildingNum]) && (
                    <>
                        <UsedButton src={unlockButton} />
                        <BuildingPrice>{Buildings[IDList[buildingNum]].price}</BuildingPrice>
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
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                    shadow-camera-far={50}
                    shadow-camera-left={-10}
                    shadow-camera-right={10}
                    shadow-camera-top={10}
                    shadow-camera-bottom={-10}
                />
                <group ref={buildingGroupRef} position={[0, 2.5, 0]} rotation={[0, Math.PI / 2, 0]}>
                    <House position={[radius * Math.sin(Math.PI / 2) - 1, 0, radius * Math.cos(Math.PI / 2)]} />
                    <TallBuilding position={[radius * Math.sin(Math.PI), 0.5, radius * Math.cos(Math.PI) - 0.9]} rotation={[-0.1, Math.PI / 2, 0]} />
                    <Elevator position={[radius * Math.sin(-Math.PI / 2) +2, 0, radius * Math.cos(-Math.PI / 2)]} rotation={[0, Math.PI, 0]} />
                </group>
            </Canvas>
        </Suspense>
    );
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
        <primitive
            {...props}
            ref={ref}
            object={scene}
            scale={0.3}
        />
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
    margin-top: 28vw;
    margin-bottom: 1vw;

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

const Setting = styled.div`
    display:flex;
    position: absolute;
    width: ${props => props.width};
    height: ${props => props.height};
    
    margin: ${props => props.margin};
    top: ${(props) => props.top};
    left: ${(props) => props.left};

    background-image: url(${props => props.src});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    opacity: ${(props) => props.opacity};
    z-index: 999;

    :hover {
        cursor: pointer;
        opacity: 1;
    }
`;