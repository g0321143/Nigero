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

useGLTF.preload("./Models/House/Structure.glb");
useGLTF.preload("./Models/House/Chair2.glb");

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
            <Canvas shadows camera={{ position: [0, 6, 0], fov: 45 }}>
                <Stats />
                <WobbleCamera time={props.time} />
                <ambientLight intensity={0.2} />
                <directionalLight
                    castShadow
                    position={[-2.5, 8, 5]}
                    intensity={0.8}
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                    shadow-camera-far={50}
                    shadow-camera-left={-10}
                    shadow-camera-right={10}
                    shadow-camera-top={10}
                    shadow-camera-bottom={-10}
                />
                <OrbitControls />
                <Physics iterations={6}>
                    <Debug scale={1.1} color="black">
                        <group>
                            <Ground />
                            <axesHelper scale={3} />
                            {/* <Player
                                dragPos={dragPos}
                                playerAngle={angle}
                                isMove={isMove}
                                isLighting={!props.isUseItem1}
                                playerPositionCallback={p => playerPosition.current = p}
                            /> */}
                            <House time={props.time} />
                            <SmallChair time={props.time} />
                            <SmallTable time={props.time} />
                            <Chair time={props.time} />
                            <Table time={props.time}/>
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

function House({ time }) {
    const { scene } = useGLTF("./Models/House/Structure.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            if (object.name == 'Cube001_1') {
                if (time < Buildings.tallBuilding.totalTime - Buildings.tallBuilding.quakeTime &&
                    time > Buildings.tallBuilding.afterTime) {
                    objectColor = Color.vividRed;
                } else {
                    objectColor = Color.white;
                }
            } else if (!object.name.indexOf('Cube001_1')) {
                if (time < Buildings.tallBuilding.totalTime - Buildings.tallBuilding.quakeTime &&
                    time > Buildings.tallBuilding.afterTime) {
                    objectColor = Color.deepRed;
                } else {
                    objectColor = Color.strongOrange;
                }
            } else if (object.name == 'Cube001_5' || object.name == 'Cube206' || object.name == 'Cube206_1' || object.name == 'Cube208' ||
                object.name == 'Cube208_1' || object.name == 'Cube211' || object.name == 'Cube211_1' || object.name == 'Cube217' ||
                object.name == 'Cube217_1' || object.name == 'Cube215' || object.name == 'Cube215_1' || object.name == 'Cube198' || object.name == 'Cube198_1' ||
                object.name == 'Cube047' || object.name == 'Cube179' || object.name == 'Cube024' || object.name == 'Cube040' || object.name == 'Cube041' || object.name == 'Cube052'
                || object.name == 'Cube003' || object.name == 'Cube015' || object.name == 'Cube019' || object.name == 'Cube044' || object.name == 'Cube055' || object.name == 'Cube056'
                || object.name == 'Object005' || object.name == 'Object005001' || object.name == 'Plane001' || object.name == 'Plane002' || object.name == 'Sphere002' ||
                object.name == 'Cube068_1' || object.name == 'Sphere_1' || object.name == 'Sphere_2' || object.name == 'Sphere001_1' || object.name == 'Sphere001_2' || object.name == 'Cube011'
                || (object.name > 'Cube064' && object.name < 'Cube073') || (object.name > 'Plane002' && object.name < 'Plane006')) {
                if (time < Buildings.tallBuilding.totalTime - Buildings.tallBuilding.quakeTime &&
                    time > Buildings.tallBuilding.afterTime) {
                    objectColor = Color.deepRed;
                } else {
                    objectColor = Color.strongOrange;
                }
            } else if (!object.name.indexOf('Cube001_')) {
                if (time < Buildings.tallBuilding.totalTime - Buildings.tallBuilding.quakeTime &&
                    time > Buildings.tallBuilding.afterTime) {
                    objectColor = Color.vividRed;
                } else {
                    objectColor = Color.softOrange;
                }
            } else if (object.name == 'Cube173' || object.name == 'Cube021' || object.name == 'Cylinder003' || object.name == 'Cylinder015' ||
                object.name == 'Cylinder017' || object.name == 'Cylinder018' || object.name == 'Cube022' || object.name == 'Plane' || object.name == 'Cube012' || object.name == 'Cube013' ||
                object.name == 'Cube068_2') {
                if (time < Buildings.tallBuilding.totalTime - Buildings.tallBuilding.quakeTime &&
                    time > Buildings.tallBuilding.afterTime) {
                    objectColor = Color.deepRed;
                } else {
                    objectColor = Color.softOrange;
                }
            } else if (!object.name.indexOf('Cylinder')) {
                if (time < Buildings.tallBuilding.totalTime - Buildings.tallBuilding.quakeTime &&
                    time > Buildings.tallBuilding.afterTime) {
                    objectColor = Color.deepRed;
                } else {
                    objectColor = Color.dimGrayishGreen;
                }
            } else if (object.name == 'Cube') {
                if (time < Buildings.tallBuilding.totalTime - Buildings.tallBuilding.quakeTime &&
                    time > Buildings.tallBuilding.afterTime) {
                    objectColor = Color.deepRed;
                } else {
                    objectColor = Color.softOrange;
                }
            } else if (object.name == 'Cube023' || object.name == 'Cube059' || object.name == 'Cube110' || object.name == 'Cube125' || object.name == 'Cube173' || object.name == 'Cube178') {
                if (time < Buildings.tallBuilding.totalTime - Buildings.tallBuilding.quakeTime &&
                    time > Buildings.tallBuilding.afterTime) {
                    objectColor = Color.vividRed;
                } else {
                    objectColor = Color.softOrange;
                }
            } else if (object.name == 'Cube154_1' || object.name == 'Cube154_3' || object.name == 'Cube209' || object.name == 'Cube209_2' || object.name == 'Cube132') {
                if (time < Buildings.tallBuilding.totalTime - Buildings.tallBuilding.quakeTime &&
                    time > Buildings.tallBuilding.afterTime) {
                    objectColor = Color.deepRed;
                } else {
                    objectColor = Color.dimGrayishGreen;
                }
            } else if (object.name == 'Cube154_2' || object.name == 'Cube209_1') {
                if (time < Buildings.tallBuilding.totalTime - Buildings.tallBuilding.quakeTime &&
                    time > Buildings.tallBuilding.afterTime) {
                    objectColor = Color.deepRed;
                } else {
                    objectColor = '#808080';
                }
            } else if (object.name > 'Cube134' && object.name < 'Cube161') {
                if (time < Buildings.tallBuilding.totalTime - Buildings.tallBuilding.quakeTime &&
                    time > Buildings.tallBuilding.afterTime) {
                    objectColor = Color.darkGrayishGreen;
                } else {
                    objectColor = Color.veryDarkBlueViolet;
                }
            } else if (object.name == 'Cube021') {
                if (time < Buildings.tallBuilding.totalTime - Buildings.tallBuilding.quakeTime &&
                    time > Buildings.tallBuilding.afterTime) {
                    objectColor = Color.deepRed;
                } else {
                    objectColor = Color.softOrange;
                }
            } else if (object.name == 'Cube') {
                if (time < Buildings.tallBuilding.totalTime - Buildings.tallBuilding.quakeTime &&
                    time > Buildings.tallBuilding.afterTime) {
                    objectColor = Color.deepRed;
                } else {
                    objectColor = Color.softOrange;
                }
            } else {
                objectColor = Color.vividRed;
            }
            Objects.push(
                {
                    scale: object.scale,
                    position: object.position,
                    rotation: object.rotation,
                    geometry: object.geometry,
                    color: objectColor
                }
            );
        }
    });


    const [ref] = useCompoundBody(() => ({
        mass: 1,
        material: { friction: 0, },
        type: 'Static',
        shapes: [
            { type: 'Box', position: [4.6, 0.1, -1], args: [3, 0.1, 5] },
            { type: 'Box', position: [2.8, 0.2, -1], args: [0.3, 0.1, 5] },
            { type: 'Box', position: [1, 0.3, -1], args: [3, 0.1, 5] },

            { type: 'Box', position: [4.6, 0.3, 1], args: [2, 0.3, 1] },
            { type: 'Box', position: [1.5, 0.9, 1], args: [1.5, 0.7, 0.5] },
            { type: 'Box', position: [1.5, 0.7, 0.3], args: [0.9, 0.4, 1.4] },
            { type: 'Box', position: [2.3, 0.7, -3.1], args: [0.3, 1.5, 1.3] },
            { type: 'Box', position: [5, 1, -3.7], args: [2, 1.5, 0.5] },

            { type: 'Box', position: [2.9, 1, 0.1], args: [0.1, 2, 2] },
            { type: 'Box', position: [-0.5, 1, -1.2], args: [0.1, 2, 4.8] },
            { type: 'Box', position: [6.3, 1, -1.2], args: [0.1, 2, 4.8] },

            { type: 'Box', position: [2.9, 1, 1.3], args: [6.2, 2, 0.1] },
            { type: 'Box', position: [2.9, 1, -3.9], args: [6.2, 2, 0.1] },
        ]
    }))


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
            { type: 'Box', position: [0, 0, 0], rotation: [0, 0, 0], args: [0.5, 0.8, 0.5] },
            { type: 'Box', position: [0, -0.8, 0], rotation: [0, 0, 0], args: [0.5, 1, 0.5] }
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


function SmallTable({ time }) {

    const { scene } = useGLTF("./Models/House/Table2.glb");

    const [ref] = useBox(() => ({
        args: [1, 0.35, 1],
        position: [4.3, 0.3, -0.2],
        mass: 50,
    }));

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            if (time < Buildings.tallBuilding.totalTime - Buildings.tallBuilding.quakeTime &&
                time > Buildings.tallBuilding.afterTime) {
                if (object.name == 'Cylinder015') {
                    objectColor = Color.vividRed;
                } else {
                    objectColor = Color.deepRed;
                }
            } else {
                if (object.name == 'Cylinder015') {
                    objectColor = Color.softOrange;
                } else {
                    objectColor = Color.strongOrange;
                }
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

function SmallChair({ time }) {

    const { scene } = useGLTF("./Models/House/Chair2.glb");

    const [ref] = useBox(() => ({
        args: [0.35, 0.35, 0.35],
        position: [4, 0.3, -1],
        mass: 50,
    }));

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            let objectColor;
            if (time < Buildings.tallBuilding.totalTime - Buildings.tallBuilding.quakeTime &&
                time > Buildings.tallBuilding.afterTime) {
                objectColor = Color.vividRed;
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

function Table({ time }) {

    const { scene } = useGLTF("./Models/House/Table1.glb");

    const [ref] = useCompoundBody(() => ({
        mass: 10,
        position: [0,1,0],
        shapes: [
            { type: 'Box', position: [-1, 0, -0.5], args: [1.5, 0.5, 0.25] },
            { type: 'Box', position: [0.5, 0, -0.5], args: [0.25, 0.5, 2] },
        ]
    }));

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            if (time < Buildings.tallBuilding.totalTime - Buildings.tallBuilding.quakeTime &&
                time > Buildings.tallBuilding.afterTime) {
                objectColor = Color.vividRed;
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

function Chair({ time }) {

    const { scene } = useGLTF("./Models/House/Chair1.glb");

    const [ref] = useBox(() => ({
        args: [0.35, 0.7, 0.35],
        position: [1, 1, -1.5],
        mass: 50,
    }));

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            let objectColor;
            if (time < Buildings.tallBuilding.totalTime - Buildings.tallBuilding.quakeTime &&
                time > Buildings.tallBuilding.afterTime) {
                objectColor = Color.vividRed;
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
        type: 'Static',
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
