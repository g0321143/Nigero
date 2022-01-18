import React, { useState, useRef, useEffect, useMemo } from "react";
import * as THREE from 'three';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { useGLTF, MapControls, OrbitControls, CameraShake, Stats, Plane, Billboard, useAnimations } from "@react-three/drei";
import { Physics, Debug, usePlane, useBox, useSphere, useCompoundBody } from '@react-three/cannon'
import { EffectComposer, Outline } from '@react-three/postprocessing'

import Color from "../Constants/Color";
import Buildings from "../Constants/Buildings";
import Player from "../Utils/Player";
import VirtualStick from "./VirtualStick";

import itemImage from '../Assets/Images/Items/NightStarJP.png';

useGLTF.preload("./Models/House.glb");

/**
 * ハウスステージで使用する3Dモデルを描画します
 * @param {Type} name
 */
export default function HouseGameStage(props) {
    const lampRef = useRef();
    const selected = props.isUseItem1 ? undefined : [lampRef];

    const playerPosition = useRef([0, 0, 0]);

    const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
    const [angle, setAngle] = useState(0);
    const [isMove, setMove] = useState(false);

    const onChangeJoystick = (e) => {
        setDragPos({
            x: e.x / 30,
            y: e.y / 30
        });
        setAngle(Math.atan2(dragPos.y, dragPos.x) + Math.PI / 2);
        setMove(true);
    };

    const onStopJoystick = (e) => {
        setDragPos({
            x: e.x / 10,
            y: e.y / 10
        });
        setAngle(Math.atan2(dragPos.y, dragPos.x) + Math.PI / 2);
        setMove(false);
    };


    // 使用するアイテムのテクスチャ
    const BillboardMap = useLoader(THREE.TextureLoader, itemImage);

    return (
        <>
            <Canvas shadows camera={{ position: [0, 8, 0], fov: 45 }}>
                <Stats />
                <WobbleCamera time={props.time} />
                <ambientLight intensity={0.2} />
                <directionalLight
                    castShadow
                    position={[-2.5, 8, -5]}
                    intensity={0.8}
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                    shadow-camera-far={50}
                    shadow-camera-left={-10}
                    shadow-camera-right={10}
                    shadow-camera-top={10}
                    shadow-camera-bottom={-10}
                />
                <WobbleCamera isQuake={false}/>
                <Physics iterations={6}>
                    <Debug scale={1.1} color="black">
                    <group>
                        <Ground />
                        <axesHelper scale={3} />
                        <Player
                            dragPos={dragPos}
                            playerAngle={angle}
                            isMove={isMove}
                            isLighting={!props.isUseItem1}
                            playerPositionCallback={p => playerPosition.current = p}
                        />
                       <House time={props.time} />
                        {props.isUseItem1 ? null : <UseItemBillboard position={[0.8, 1.6, 2.2]} url={BillboardMap} />}
                        <EffectComposer multisampling={8} autoClear={false}>
                            <Outline blur selection={selected} visibleEdgeColor="white" edgeStrength={100} width={500} />
                        </EffectComposer>
                    </group>
                    </ Debug>
                </Physics>
            </Canvas>
            <VirtualStick
                onStopJoystick={onStopJoystick}
                onChangeJoystick={onChangeJoystick}
            />
        </>
    );
};

/**
 * アイテムを使用したことを知らせるためのポップアップを表示します
 * @param {[number, number, number]} position 
 * @param {String} url 
 */
function UseItemBillboard({ position, url }) {

    return (
        <Billboard
            position={position}
            scale={0.3}
        >
            <Plane args={[2, 2]}>
                <meshBasicMaterial attach="material" map={url} />
            </Plane>
        </Billboard>
    );
}

/**
 * 振動カメラ
 * @param {boolean} isQuake
 */
 function WobbleCamera(props) {
    const config = {
        maxYaw: 0.1, // Max amount camera can yaw in either direction
        maxPitch: 0.1, // Max amount camera can pitch in either direction
        maxRoll: 0.1, // Max amount camera can roll in either direction
        yawFrequency: 1, // Frequency of the the yaw rotation
        pitchFrequency: 1, // Frequency of the pitch rotation
        rollFrequency: 1, // Frequency of the roll rotation
        intensity: 1, // initial intensity of the shake
        decay: true, // should the intensity decay over time
        decayRate: 0.02, // if decay = true this is the rate at which intensity will reduce at
        additive: true, // this should be used when your scene has orbit controls
    }

    if (props.time < Buildings.tallBuilding.totalTime - Buildings.tallBuilding.quakeTime &&
        props.time > Buildings.tallBuilding.afterTime)
        return <CameraShake {...config} />;
    else
        return null;
}

function House(props) {
    const { scene } = useGLTF("./Models/House.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            console.log(object.name);
            let objectColor;
                objectColor = Color.softOrange;
            
            Objects.push(
                {
                    scale: object.scale,
                    rotation: object.rotation,
                    geometry: object.geometry,
                    color: objectColor
                }
            );
        }
    });

    // const [ref] = useCompoundBody(() => ({
    //     mass: 12,
    //     material:{friction: 0.01, restitution: -1},
    //     type: 'Static',
    //     shapes: [
    //         //壁　右ー上ー左ー下
    //         { type: 'Box', position: [1.85, 1, -1.8], rotation: [0, 0, 0], args: [0.2, 2.1, 1.5] },
    //         { type: 'Box', position: [1.85, 1, 1.3], rotation: [0, 0, 0], args: [0.2, 2.1, 2.6] },

    //         { type: 'Box', position: [0.6, 1, -2.6], rotation: [0, 0, 0], args: [2.2, 2.1, 0.2] },
    //         { type: 'Box', position: [-3.2, 1, -2.6], rotation: [0, 0, 0], args: [3.3, 2.1, 0.2] },

    //         { type: 'Box', position: [-4.9, 1, 0], rotation: [0, 0, 0], args: [0.2, 2.1, 4.8] },

    //         { type: 'Box', position: [-1.6, 1, 2.7], rotation: [0, 0, 0], args: [6.2, 2.1, 0.2] },
    //         //仕切り
    //         { type: 'Box', position: [-1.55, 1, 1.5], rotation: [0, 0, 0], args: [0.1, 1.8, 2] }, 
    //         //床
    //         { type: 'Box', position: [-1.5, -0.1, 0.1], rotation: [0, 0, 0], args: [6.2, 0.1, 5] }, 
    //         { type: 'Box', position: [-3.1, -0.05, 0.2], rotation: [0, 0, 0], args: [3.1, 0.2, 4.8] }, 
    //         { type: 'Box', position: [-3.3, 0, 0.2], rotation: [0, 0, 0], args: [3, 0.25, 4.8] },
    //         { type: 'Box', position: [-3.5, 0.05, 0.2], rotation: [0, 0, 0], args: [2.8, 0.3, 4.8] }
    //     ]
    // }))


    return (
        <group {...props} dispose={null}>
            {Objects.map((object, index) => (
                <mesh
                    castShadow
                    receiveShadow
                    scale={object.scale}
                    rotation={object.rotation}
                    geometry={object.geometry}
                    key={index}
                >
                    <meshStandardMaterial color={object.color} />
                </mesh>
            ))}
        </group>
    )
}

function Lamp(props) {
    //const ref = useRef()

    const { scene } = useGLTF("./Models/Lamp.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            // ここの条件式に名前追加して色変更して下さい

            if (props.time < 500 - 15) {
                objectColor = 'vividRed';
            } else {
                objectColor = Color.softOrange;
            }
            Objects.push(
                {
                    scale: object.scale,
                    rotation: object.rotation,
                    geometry: object.geometry,
                    color: objectColor
                }
            );
        }
    });
    
    const [ref] = useCompoundBody(() => ({
        mass: 2,
        ...props,
        shapes: [
            //壁　右ー上ー左ー下
            { type: 'Box', position: [0,0,0], rotation: [0, 0, 0], args: [0.5,0.8,0.5] },
            { type: 'Box', position: [0,-0.8,0], rotation: [0, 0, 0], args: [0.5,1,0.5] }
        ]
      }));

    return (
        <group
        ref={ref}
        >
            {Objects.map((object, index) => (
                <mesh
                    
                    castShadow
                    receiveShadow
                    scale={object.scale}
                    rotation={object.rotation}
                    geometry={object.geometry}
                    key={index}
                    ref={props.lampRef}
                >
                    <meshStandardMaterial color={object.color} />
                </mesh>
            ))}
        </group>
    )
}


function SmallChair(props) {

    const [ref] = useBox(() => ({
        args: [0.35, 0.35, 0.35],
        position: [-0.8, 0.18, 0.4],
        mass: 1,
    }));
    const { scene } = useGLTF("./Models/Chair2.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            // ここの条件式に名前追加して色変更して下さい
            if (props.time < 500 - 15) {
                objectColor = 'vividRed';
            } else {
                objectColor = Color.softOrange;
            }
            Objects.push(
                {
                    scale: object.scale,
                    rotation: object.rotation,
                    geometry: object.geometry,
                    color: objectColor
                }
            );
        }
    });

    return (
        <group
            ref={ref}
        >
            {Objects.map((object, index) => (
                <mesh
                    castShadow
                    receiveShadow
                    scale={object.scale}
                    rotation={object.rotation}
                    geometry={object.geometry}
                    key={index}
                >
                    <meshStandardMaterial color={object.color} />
                </mesh>
            ))}
        </group>
    )
}

function Ground(props) {
    const [ref] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
        mass: 1,
        material: { friction: 0.01, restitution: -1 },
        
    }))
    return (
        <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -0.23, 0]}
            receiveShadow
            ref={ref}
        >
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <shadowMaterial attach="material" transparent opacity={0.4} />
        </mesh>
    )
}
