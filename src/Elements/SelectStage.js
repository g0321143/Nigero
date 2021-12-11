import React, { Suspense, useRef, forwardRef, useState } from "react";
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from "@react-three/drei";
import { gsap } from "gsap";
import styled from 'styled-components';

import Color from "../Constants/Color";
import HeaderText from '../Utils/HeaderText';
import StarScore from "../Utils/StarScore";
import { Block_Column_Top } from "../Utils/GlobalStyles";


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

const TimeText = styled.div`
    position: absolute;
    display: flex;
    
    font-size: ${(props) => props.fontsize};
    text-align: center;
    color: ${Color.slightlyGrayishYellow};
    font-weight: bold;
    
    user-select: none;
    user-drag: none;

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


export default function SelectStage(props) {

    return (
        <Suspense fallback={null}>
            <HeaderText text={"SELECT STAGE"} />
            <BlockBuildingButton>
                <StarScore width={"5vw"} star1={true} star2={false} star3={true} />
                <TimeText fontsize={"4vw"} >{"3:30"}</TimeText>
            </BlockBuildingButton>
        </Suspense>
    );
}

