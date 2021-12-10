import React, { Suspense, useRef, forwardRef, useState } from "react";
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from "@react-three/drei";
import { gsap, Linear } from "gsap";
import styled from 'styled-components';
import Color from "../Constants/Color";

import { ArrowRight, ArrowLeft } from '../Utils/ArrowStyles';

import HouseButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-19.png';
import SchoolButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-18.png';
import TallBuildingButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-17.png';
import unlockButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-20.png';
import CoinImage from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-12.png';

const CoinIcon = styled.div`
    position: absolute;

    width: 3vw;
    height: 3vw;

    top: 80%;
    left: 40%;

    background-image: url(${CoinImage});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    opacity: 1;
    z-index: 999;
`;

const CoinFont = styled.div`
    position: absolute;

    width: 6vw;
    height: 3vw;

    top: 79%;
    left: 45%;

    font-size: 3vw;
    color: ${Color.slightlyGrayishYellow};
    font-weight: bold;
    justify-content: flex-end;
    align-items: center;
    text-align: center;
    text-shadow: 1px 1px 2px silver;
    
    user-select: none;
    user-drag: none;
    
    z-index: 999;
`;

const BuildingButton = styled.div`
    position: absolute;

    width: 15vw;
    height: 10vw;

    top: 10%;
    left: 42%;

    background-image: url(${(props) => props.src});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    opacity: 1;
    z-index: 999;
`;

const UsedButton = styled.div`
    position: absolute;

    width: 15vw;
    height: 10vw;

    top: 65%;
    left: 42%;

    background-image: url(${(props) => props.src});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    opacity: 1;
    z-index: 999;
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

const Room = forwardRef((props, fref) => {
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
            ref={fref, ref}
            object={scene}
            scale={0.3}
        />
    )
});


export default function SelectBuilding(props) {

    const BUILDING_MAX = 2;
    const BUILDING_MIN = 0;

    const radius = 7;

    const buildingImageList = [TallBuildingButton, HouseButton, SchoolButton];
    const usedList = [unlockButton, unlockButton, unlockButton];
    const buildingCostList = ["100,000", "FREE", "123,456"];

    const buildingsRef = useRef();
    const [building, setBuilding] = useState(1);

    const moveRightBuilding = () => {
        if (building == BUILDING_MAX) return;
        setBuilding(building + 1);

        gsap.to(buildingsRef.current.rotation, {
            y: buildingsRef.current.rotation.y - Math.PI / 2,
            ease: Linear.easeOut,
            duration: 0.5
        });
    };

    const moveLeftBuilding = () => {
        if (building == BUILDING_MIN) return;
        setBuilding(building - 1);

        gsap.to(buildingsRef.current.rotation, {
            y: buildingsRef.current.rotation.y + Math.PI / 2,
            ease: Linear.easeOut,
            duration: 0.5
        });
    };

    return (
        <Suspense fallback={null}>
            <UsedButton src={usedList[building]} />
            <BuildingButton src={buildingImageList[building]} />
            <CoinIcon />
            <CoinFont>{buildingCostList[building]}</CoinFont>
            <ArrowRight handler={() => moveRightBuilding()} />
            <ArrowLeft handler={() => moveLeftBuilding()} />
            <Canvas camera={{ position: [0, 3, -10], fov: 90 }}>
                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />

                <ambientLight intensity={1} />
                <axesHelper scale={5} />
                <group ref={buildingsRef} position={[0, 2.5, 0]} rotation={[0, 0, 0]}>
                    <House position={[radius * Math.sin(Math.PI / 2), -1, radius * Math.cos(Math.PI / 2) - 0.9]} rotation={[0, Math.PI / 4, 0]} />
                    <Room position={[radius * Math.sin(Math.PI) - 1, 0, radius * Math.cos(Math.PI)]} />
                    <House position={[radius * Math.sin(-Math.PI / 2), -1, radius * Math.cos(-Math.PI / 2) + 0.9]} rotation={[0, 5 * Math.PI / 4, 0]} />
                </group>
            </Canvas>
        </Suspense>
    );
}

