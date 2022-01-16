import React, { useState, useRef, useEffect } from "react";
import * as THREE from 'three';
import { Canvas, useLoader, useThree, useFrame } from '@react-three/fiber';
import { useGLTF, MapControls, OrbitControls, CameraShake, Stats, Plane, Billboard } from "@react-three/drei";
import { Physics, Debug, usePlane, useBox, useCompoundBody } from '@react-three/cannon'
import { EffectComposer, Outline } from '@react-three/postprocessing'

import Color from "../Constants/Color";
import Buildings from "../Constants/Buildings";
import Player from "../Utils/Player";
import VirtualStick from "./VirtualStick";


import itemImage from '../Assets/Images/Items/NightStarJP.png';

useGLTF.preload("./Models/MainBuilding.glb");

/**
 * ハウスステージで使用する3Dモデルを描画します
 * @param {Type} name
 */
export default function TallBuildingGameStage(props) {
    const lampRef = useRef();
    const selected = props.isUseItem1 ? undefined : [lampRef];

    const playerPosition = useRef([0, 0, 0]);

    const [dragPos, setDragPos] = useState({ x: 0, y: 0 });
    const [angle, setAngle] = useState(0);
    const [isMove, setMove] = useState(false);

    const onChangeJoystick = (e) => {
        setDragPos({
            x: e.x / 10,
            y: e.y / 10
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
                <WobbleCamera isQuake={true} lookAt={playerPosition.current} />
                <Stats />
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
                <Physics iterations={6}>
                    {/* <Debug scale={1.1} color="black"> */}
                    <group>
                        <axesHelper scale={3} />
                        <Player
                            dragPos={dragPos}
                            playerAngle={angle}
                            isMove={isMove}
                            playerPositionCallback={p => playerPosition.current = p}
                        />
                        <MainBuilding time={props.time} />
                        <BookShelf time={props.time} position={[-4.7, 1, -5.2]} />
                        <BookShelf time={props.time} position={[-3.5, 1, -5.2]} />
                        <BookShelf time={props.time} position={[-2.3, 1, -5.2]} />
                        <WorkingTable1 time={props.time} position={[-2.8, 0.5, -0.5]} />
                        <WorkingTable2 time={props.time} position={[-2.8, 0.5, 1.5]} />
                        <WorkingTable3 time={props.time} position={[-2.8, 0.5, 3.5]} />
                        <WorkingTable1 time={props.time} position={[2.8, 0.5, -0.5]} />
                        <WorkingTable2 time={props.time} position={[2.8, 0.5, 1.5]} />
                        <WorkingTable3 time={props.time} position={[2.8, 0.5, 3.5]} />
                        <Printer time={props.time} position={[-1.2, 0.5, -5.5]} />
                        <Bin time={props.time} position={[-0.7, 0.5, -1.5]} />
                        <Bin time={props.time} position={[0.7, 0.5, 4.5]} />
                        <Chair time={props.time} position={[0, 0.5, -5]} rotationY={Math.PI / 2} />
                        <Table time={props.time} position={[0.5, 0.5, -5]} />
                        <Chair time={props.time} position={[1, 0.5, -5]} rotationY={-Math.PI / 2} />
                        <Chair time={props.time} position={[4.5, 0.5, -5]} rotationY={0} />
                        <Table time={props.time} position={[4.5, 0.5, -4]} />
                        <Chair time={props.time} position={[4.5, 0.5, -3]} rotationY={Math.PI} />
                        <FloorLamp time={props.time} position={[2, 0.9, -5]} />
                        <FloorLamp time={props.time} position={[-4.7, 0.9, -4]} />
                        <EffectComposer multisampling={8} autoClear={false}>
                            <Outline blur selection={selected} visibleEdgeColor="white" edgeStrength={100} width={500} />
                        </EffectComposer>
                    </group>
                    {/* </ Debug> */}
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
 * 振動カメラ（未完成）
 * @param {boolean} isQuake
 */
function WobbleCamera({ isQuake, lookAt }) {
    const shakeRef = useRef();
    const cameraRef = useRef();

    useFrame((state) => {
        // state.camera.lookAt(new THREE.Vector3(
        //     Math.round(lookAt[0] * 100) / 100,
        //     Math.round(lookAt[1] * 100) / 100,
        //     Math.round(lookAt[2] * 100) / 100));
        // state.camera.position.set(new THREE.Vector3(
        //     Math.round(lookAt[0] * 100) / 100 + 5,
        //     Math.round(lookAt[1] * 100) / 100 + 5,
        //     Math.round(lookAt[2] * 100) / 100 + 5));
        //state.camera.position.x = Math.round(lookAt[0] * 10000) / 10000;
        //state.camera.position.Z = lookAt[2];
    });

    return (
        <>
            <MapControls ref={cameraRef} makeDefault enablePan={false} enableZoom={false} enableRotate={false} />
            <CameraShake ref={shakeRef} makeDefault additive decay={isQuake} intensity={10} />
        </>
    );
}

function MainBuilding(props) {
    const { scene } = useGLTF("./Models/TallBuilding/MainBuilding.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            if (props.time < Buildings.tallBuilding.totalTime - Buildings.tallBuilding.quakeTime &&
                props.time > Buildings.tallBuilding.afterTime) {
                switch (object.name) {
                    case 'Cube173':
                        objectColor = Color.deepRed;
                        break;
                    case 'Cube173_1':
                        objectColor = Color.veryDarkBlueViolet;
                        break;
                    case 'Cube173_2':
                        objectColor = Color.veryDarkBlueViolet;
                        break;
                    case 'Cube173_3':
                        objectColor = Color.vividRed;
                        break;
                    case 'Cube173_4':
                        objectColor = Color.vividRed;
                        break;
                    default:
                        break;
                }
            } else {
                switch (object.name) {
                    case 'Cube173':
                        objectColor = Color.softOrange;
                        break;
                    case 'Cube173_1':
                        objectColor = Color.strongOrange;
                        break;
                    case 'Cube173_2':
                        objectColor = Color.strongOrange;
                        break;
                    case 'Cube173_3':
                        objectColor = Color.white;
                        break;
                    case 'Cube173_4':
                        objectColor = Color.lightGrayishOrange;
                        break;
                    default:
                        break;
                }
            }
            Objects.push(
                {
                    scale: object.scale,
                    rotation: [0, -Math.PI / 2, 0],
                    geometry: object.geometry,
                    color: objectColor
                }
            );
        }
    });

    const [ref] = useCompoundBody(() => ({
        type: 'Static',
        shapes: [
            { type: 'Plane', position: [0, 0, 0], rotation: [-Math.PI / 2, 0, 0], args: [3] },
            { type: 'Box', position: [0, 0, 5.8], args: [10, 2, 0.2] },
            { type: 'Box', position: [0, 0, -5.8], args: [10, 2, 0.2] },
            { type: 'Box', position: [5.5, 0, 0], args: [0.2, 2, 10] },
            { type: 'Box', position: [-5.5, 0, 0], args: [0.2, 2, 10] },
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


function Bin(props) {
    const { scene } = useGLTF("./Models/TallBuilding/Bin.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            if (props.time < Buildings.tallBuilding.totalTime - Buildings.tallBuilding.quakeTime &&
                props.time > Buildings.tallBuilding.afterTime) {
                objectColor = Color.deepRed;
            } else {
                objectColor = Color.softOrange;
            }
            Objects.push(
                {
                    scale: object.scale,
                    rotation: [0, -Math.PI / 2, 0],
                    geometry: object.geometry,
                    color: objectColor
                }
            );
        }
    });

    const [ref] = useBox(() => ({
        type: 'Dynamic',
        args: [0.3, 0.4, 0.3],
        position: props.position,
        mass: 20,
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
                >
                    <meshStandardMaterial color={object.color} />
                </mesh>
            ))}
        </group>
    )
}

function Table(props) {
    const { scene } = useGLTF("./Models/TallBuilding/Table.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            if (props.time < Buildings.tallBuilding.totalTime - Buildings.tallBuilding.quakeTime &&
                props.time > Buildings.tallBuilding.afterTime) {
                objectColor = Color.deepRed;
            } else {
                objectColor = Color.softOrange;
            }
            Objects.push(
                {
                    scale: object.scale,
                    rotation: [0, -Math.PI / 2, 0],
                    geometry: object.geometry,
                    color: objectColor
                }
            );
        }
    });

    const [ref] = useBox(() => ({
        type: 'Dynamic',
        args: [0.8, 0.6, 0.8],
        position: props.position,
        mass: 10,
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
                >
                    <meshStandardMaterial color={object.color} />
                </mesh>
            ))}
        </group>
    )
}


function Chair(props) {
    const { scene } = useGLTF("./Models/TallBuilding/Chair.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            if (props.time < Buildings.tallBuilding.totalTime - Buildings.tallBuilding.quakeTime &&
                props.time > Buildings.tallBuilding.afterTime) {
                objectColor = Color.deepRed;
            } else {
                objectColor = Color.softOrange;
            }
            Objects.push(
                {
                    scale: object.scale,
                    rotation: [0, props.rotationY, 0],
                    geometry: object.geometry,
                    color: objectColor
                }
            );
        }
    });

    const [ref] = useBox(() => ({
        type: 'Dynamic',
        args: [0.4, 0.6, 0.4],
        position: props.position,
        mass: 5,
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
                >
                    <meshStandardMaterial color={object.color} />
                </mesh>
            ))}
        </group>
    )
}


function FloorLamp(props) {
    const { scene } = useGLTF("./Models/TallBuilding/FloorLamp.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            if (props.time < Buildings.tallBuilding.totalTime - Buildings.tallBuilding.quakeTime &&
                props.time > Buildings.tallBuilding.afterTime) {
                objectColor = Color.deepRed;
            } else {
                objectColor = Color.softOrange;
            }
            Objects.push(
                {
                    scale: object.scale,
                    rotation: [0, -Math.PI / 2, 0],
                    geometry: object.geometry,
                    color: objectColor
                }
            );
        }
    });

    const [ref] = useBox(() => ({
        type: 'Dynamic',
        args: [0.5, 1.5, 0.5],
        position: props.position,
        mass: 20,
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
                    position={[0, 0.2, 0]}
                    geometry={object.geometry}
                    key={index}
                >
                    <meshStandardMaterial color={object.color} />
                </mesh>
            ))}
        </group>
    )
}

function Printer(props) {
    const { scene } = useGLTF("./Models/TallBuilding/Printer.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            if (props.time < Buildings.tallBuilding.totalTime - Buildings.tallBuilding.quakeTime &&
                props.time > Buildings.tallBuilding.afterTime) {
                objectColor = Color.deepRed;
            } else {
                objectColor = Color.softOrange;
            }
            Objects.push(
                {
                    scale: object.scale,
                    rotation: [0, -Math.PI / 2, 0],
                    geometry: object.geometry,
                    color: objectColor
                }
            );
        }
    });

    const [ref] = useBox(() => ({
        type: 'Dynamic',
        args: [0.8, 0.5, 0.5],
        position: props.position,
        mass: 50,
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
                >
                    <meshStandardMaterial color={object.color} />
                </mesh>
            ))}
        </group>
    )
}


function BookShelf(props) {
    const { scene } = useGLTF("./Models/TallBuilding/BookShelf.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            if (props.time < Buildings.tallBuilding.totalTime - Buildings.tallBuilding.quakeTime &&
                props.time > Buildings.tallBuilding.afterTime) {
                objectColor = Color.deepRed;
            } else {
                objectColor = Color.softOrange;
            }
            Objects.push(
                {
                    scale: object.scale,
                    rotation: [0, -Math.PI / 2, 0],
                    geometry: object.geometry,
                    color: objectColor
                }
            );
        }
    });

    const [ref] = useBox(() => ({
        type: 'Dynamic',
        args: [1, 1.8, 0.3],
        position: props.position,
        mass: 50,
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
                >
                    <meshStandardMaterial color={object.color} />
                </mesh>
            ))}
        </group>
    )
}


function WorkingTable1(props) {
    const { scene } = useGLTF("./Models/TallBuilding/WorkingTable1.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            if (props.time < Buildings.tallBuilding.totalTime - Buildings.tallBuilding.quakeTime &&
                props.time > Buildings.tallBuilding.afterTime) {
                switch (object.name) {
                    case 'Cube166':
                        objectColor = Color.deepRed;
                        break;
                    case 'Cube166_1':
                        objectColor = Color.vividRed;
                        break;
                    case 'Cube166_2':
                        objectColor = Color.deepRed;
                        break;
                }
            } else {
                switch (object.name) {
                    case 'Cube166':
                        objectColor = Color.softOrange;
                        break;
                    case 'Cube166_1':
                        objectColor = Color.white;
                        break;
                    case 'Cube166_2':
                        objectColor = Color.strongOrange;
                        break;
                }
            }
            Objects.push(
                {
                    scale: object.scale,
                    rotation: [0, -Math.PI / 2, 0],
                    geometry: object.geometry,
                    color: objectColor
                }
            );
        }
    });

    const [ref] = useBox(() => ({
        type: 'Dynamic',
        args: [3.6, 1, 1.6],
        position: props.position,
        mass: 50,
    }));


    return (
        <group
            ref={ref}
            scale={0.9}
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

function WorkingTable2(props) {
    const { scene } = useGLTF("./Models/TallBuilding/WorkingTable2.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            if (props.time < Buildings.tallBuilding.totalTime - Buildings.tallBuilding.quakeTime &&
                props.time > Buildings.tallBuilding.afterTime) {
                switch (object.name) {
                    case 'Cube135':
                        objectColor = Color.deepRed;
                        break;
                    case 'Cube135_1':
                        objectColor = Color.vividRed;
                        break;
                    case 'Cube135_2':
                        objectColor = Color.deepRed;
                        break;
                }
            } else {
                switch (object.name) {
                    case 'Cube135':
                        objectColor = Color.softOrange;
                        break;
                    case 'Cube135_1':
                        objectColor = Color.white;
                        break;
                    case 'Cube135_2':
                        objectColor = Color.strongOrange;
                        break;
                }
            }
            Objects.push(
                {
                    scale: object.scale,
                    rotation: [0, -Math.PI / 2, 0],
                    geometry: object.geometry,
                    color: objectColor
                }
            );
        }
    });

    const [ref] = useBox(() => ({
        type: 'Dynamic',
        args: [3.6, 1, 1.6],
        position: props.position,
        mass: 50,
    }));


    return (
        <group
            ref={ref}
            scale={0.9}
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

function WorkingTable3(props) {
    const { scene } = useGLTF("./Models/TallBuilding/WorkingTable3.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            if (props.time < Buildings.tallBuilding.totalTime - Buildings.tallBuilding.quakeTime &&
                props.time > Buildings.tallBuilding.afterTime) {
                switch (object.name) {
                    case 'Cube133':
                        objectColor = Color.deepRed;
                        break;
                    case 'Cube133_1':
                        objectColor = Color.vividRed;
                        break;
                    case 'Cube133_2':
                        objectColor = Color.deepRed;
                        break;
                }
            } else {
                switch (object.name) {
                    case 'Cube133':
                        objectColor = Color.softOrange;
                        break;
                    case 'Cube133_1':
                        objectColor = Color.white;
                        break;
                    case 'Cube133_2':
                        objectColor = Color.strongOrange;
                        break;
                }
            }
            Objects.push(
                {
                    scale: object.scale,
                    rotation: [0, -Math.PI / 2, 0],
                    geometry: object.geometry,
                    color: objectColor
                }
            );
        }
    });

    const [ref] = useBox(() => ({
        type: 'Dynamic',
        args: [3.6, 1, 1.6],
        position: props.position,
        mass: 50,
    }));


    return (
        <group
            ref={ref}
            scale={0.9}
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