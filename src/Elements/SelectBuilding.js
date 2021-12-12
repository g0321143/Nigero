import React, { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from "@react-three/drei";
import { gsap } from "gsap";
import styled from 'styled-components';

import Store from '../Utils/Store';
import Color from "../Constants/Color";
import HeaderText from '../Utils/HeaderText';
import { Block_Column_Top } from "../Utils/GlobalStyles";
import { ArrowRight, ArrowLeft } from '../Utils/ArrowStyles';

import HouseButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-19.png';
import SchoolButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-18.png';
import TallBuildingButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-17.png';
import unlockButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-20.png';
import CoinImage from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-12.png';


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


export default function SelectBuilding(props) {

    // このコンポーネント消える時に選択されている建物を登録
    useEffect(() => 
        () => Store.setBuilding(buildingList[building].name), []
    );

    const BUILDING_MAX = 2;
    const BUILDING_MIN = 0;

    const radius = 7;

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

    const buildingsRef = useRef();
    const [building, setBuilding] = useState(1);

    const moveRightBuilding = () => {
        if (building == BUILDING_MAX) return;
        setBuilding(building + 1);

        gsap.to(buildingsRef.current.rotation, {
            y: buildingsRef.current.rotation.y - Math.PI / 2,
            duration: 0.5
        });
    };

    const moveLeftBuilding = () => {
        if (building == BUILDING_MIN) return;
        setBuilding(building - 1);

        gsap.to(buildingsRef.current.rotation, {
            y: buildingsRef.current.rotation.y + Math.PI / 2,
            duration: 0.5
        });
    };

    return (
        <Suspense fallback={"Loading"}>
            <HeaderText text={"SELECT BUILDING"} />
            <BlockBuildingButton>
                <BuildingButton src={buildingList[building].nameImage} />
            </BlockBuildingButton>
            {!buildingList[building].isPlay && (
                <>
                    <BuildingCoin>{buildingList[building].cost}</BuildingCoin>
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
                <group ref={buildingsRef} position={[0, 2.5, 0]} rotation={[0, 0, 0]}>
                    <House position={[radius * Math.sin(Math.PI / 2), -1, radius * Math.cos(Math.PI / 2) - 0.9]} rotation={[0, Math.PI / 4, 0]} />
                    <Room position={[radius * Math.sin(Math.PI) - 1, 0, radius * Math.cos(Math.PI)]} rotation={[0, Math.PI / 2, 0]} />
                    <House position={[radius * Math.sin(-Math.PI / 2), -1, radius * Math.cos(-Math.PI / 2) + 0.9]} rotation={[0, 5 * Math.PI / 4, 0]} />
                </group>
            </Canvas>
        </Suspense>
    );
}

