import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from "@react-three/drei";
import { gsap } from "gsap";
import styled from 'styled-components';

import Store from '../Utils/Store';
import Color from "../Constants/Color";
import HeaderText from '../Utils/HeaderText';
import BuildingList from '../Constants/Buildings';
import { Block_Column_Top } from "../Utils/GlobalStyles";
import { ArrowRight, ArrowLeft } from '../Utils/ArrowStyles';

import HouseButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-19.png';
import SchoolButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-18.png';
import TallBuildingButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-17.png';
import unlockButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-20.png';
import playButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-21.png';
import CoinImage from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-12.png';


function House(props) {
    const { scene } = useGLTF('./Models/House.glb');

    let house = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            if (object.name == 'House_2') {
                house.push(
                    <mesh
                        castShadow
                        scale={object.scale}
                        rotation={object.rotation}
                        geometry={object.geometry}
                    >
                        <meshStandardMaterial color={'white'} />
                    </mesh>
                );
            } else {
                house.push(
                    <mesh
                        castShadow
                        scale={object.scale}
                        rotation={object.rotation}
                        geometry={object.geometry}
                    >
                        <meshStandardMaterial color={'#e6df97'} />
                    </mesh>
                );
            }
        }
    });


    return (
        <group {...props} dispose={null}>
            {house[0]}
            {house[1]}
        </group>
    )
}

function Room(props) {
    const { scene } = useGLTF('./Models/Room.glb');

    const ref = useRef();

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime();
        ref.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20;
        ref.current.rotation.x = Math.cos(t / 4) / 8;
        ref.current.rotation.y = Math.sin(t / 4) / 8;
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


export default function SelectBuilding({handler}) {

    // 現在のbuildingNumの建物をセットして，ステージ選択へ遷移する関数]
    // Playボタンが表示されるたびに，実行されてしまうので，後で直します
    const setBuilding = () => {
        Store.setBuilding(buildingList[buildingNum].name);

        return handler;
    }

    // 表示する建物の数
    const BUILDING_MAX = 2;
    const BUILDING_MIN = 0;

    // 回転させる円の半径
    const radius = 7;



    // 表示する建物の情報
    const buildingList = [
        {
            name: "TallBuilding",
            nameImage: TallBuildingButton,
            isPlay: false,
            cost: "100,000"
        },
        {
            name: "House",
            nameImage: HouseButton,
            isPlay: true,
            cost: "FREE"
        },
        {
            name: "School",
            nameImage: SchoolButton,
            isPlay: false,
            cost: "302,800"
        }];

    const buildingGroupRef = useRef();
    const [buildingNum, setBuildingNum] = useState(1);

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
                <BuildingButton src={buildingList[buildingNum].nameImage} />
            </BlockBuildingButton>
            {buildingList[buildingNum].isPlay && (
                <>
                   <BlockBuildingButton>
                        <UsedButton src={playButton} onClick={setBuilding()}/>
                    </BlockBuildingButton>
                </>
            )}
            {!buildingList[buildingNum].isPlay && (
                <>
                    <BuildingCoin>{buildingList[buildingNum].cost}</BuildingCoin>
                    <BlockBuildingButton>
                        <UsedButton src={unlockButton} />
                    </BlockBuildingButton>
                </>
            )}
            <ArrowRight handler={() => moveRightBuilding()} />
            <ArrowLeft handler={() => moveLeftBuilding()} />
            <Canvas camera={{ position: [0, 3, -10], fov: 90 }}>
                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                <ambientLight intensity={1} />
                <group ref={buildingGroupRef} position={[0, 2.5, 0]} rotation={[0, 0, 0]}>
                    <House position={[radius * Math.sin(Math.PI / 2), -1, radius * Math.cos(Math.PI / 2) - 0.9]} rotation={[0, Math.PI / 4, 0]} />
                    <Room position={[radius * Math.sin(Math.PI) - 1, 0, radius * Math.cos(Math.PI)]} rotation={[0, Math.PI / 2, 0]} />
                    <House position={[radius * Math.sin(-Math.PI / 2), -1, radius * Math.cos(-Math.PI / 2) + 0.9]} rotation={[0, 5 * Math.PI / 4, 0]} />
                </group>
            </Canvas>
        </Suspense>
    );
}


const BlockBuildingButton = styled(Block_Column_Top)`
    justify-content: center;
`;

const BuildingButton = styled.img`
    position: absolute;
    display: flex;

    height: 5vw;

    top: 10%;

    margin : 0 auto;

    url(${(props) => props.src});
    z-index: 999;
`;

const UsedButton = styled.img`
    position: absolute;
    display: flex;

    width: 15vw;

    top: 70%;

    margin : 0 auto;

    url(${(props) => props.src});
    z-index: 999;
    opacity: 0.9;

    :hover {
        cursor: pointer;
        opacity: 1;
    }
`;

const BuildingCoin = styled.div`
    position: absolute;
    
    font-size: 3vw;
    text-align: center;
    color: ${Color.slightlyGrayishYellow};
    font-weight: bold;
    
    user-select: none;
    user-drag: none;

    top: 80%;
    left: 0;
    right: 0;
    margin: auto;

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