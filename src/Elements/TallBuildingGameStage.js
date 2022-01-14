import React, { useState, useRef, useEffect } from "react";
import * as THREE from 'three';
import { Canvas, useLoader } from '@react-three/fiber';
import { useGLTF, MapControls, OrbitControls, CameraShake, Stats, Plane, Billboard } from "@react-three/drei";
import { Physics, Debug, usePlane, useBox, useCompoundBody } from '@react-three/cannon'
import { EffectComposer, Outline } from '@react-three/postprocessing'
import { Joystick } from "react-joystick-component";

import Color from "../Constants/Color";
import styled from 'styled-components';
import Player from "../Utils/Player";

import itemImage from '../Assets/Images/Items/NightStarJP.png';

useGLTF.preload("./Models/MainBuilding.glb");

/**
 * ハウスステージで使用する3Dモデルを描画します
 * @param {Type} name
 */
export default function TallBuildingGameStage(props) {
    const lampRef = useRef();
    const selected = props.isUseItem1 ? undefined : [lampRef];

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
                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
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
                            playerPositionCallback={p => {/* pに現在のプレイヤーの座標がリターンされます */ }}
                        />
                        <MainBuilding time={props.time} />
                        <BookShelf time={props.time} />
                        <EffectComposer multisampling={8} autoClear={false}>
                            <Outline blur selection={selected} visibleEdgeColor="white" edgeStrength={100} width={500} />
                        </EffectComposer>
                    </group>
                    {/* </ Debug> */}
                </Physics>
            </Canvas>
            <JoystickCanvas>
                <Joystick
                    size={80}
                    baseColor={Color.slightlyGrayishYellow}
                    stickColor={Color.grayishYellowGreen}
                    stop={onStopJoystick}
                    move={onChangeJoystick}
                />
            </JoystickCanvas>
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
function WobbleCamera({ isQuake }) {
    const shakeRef = useRef();
    const orbitRef = useRef();
    useEffect(() => {
        orbitRef.current.addEventListener("change", () => {
            const shake = shakeRef.current.getIntensity();
            shakeRef.current.setIntensity(shake + 0.015);
        });
    }, [orbitRef]);

    return (
        <>
            <MapControls ref={orbitRef} enablePan={true} enableZoom={true} enableRotate={false} />
            <CameraShake ref={shakeRef} additive decay={isQuake} intensity={10} />
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
            if (props.time < 500 - 15) {
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
            { type: 'Box', position: [0, 0, 5.5], args: [10, 2, 0.2] },
            { type: 'Box', position: [0, 0, -5.5], args: [10, 2, 0.2] },
            { type: 'Box', position: [5.8, 0, 0], args: [0.2, 2, 10] },
            { type: 'Box', position: [-5.8, 0, 0], args: [0.2, 2, 10] },
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

function BookShelf(props) {
    const { scene } = useGLTF("./Models/TallBuilding/BookShelf.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            if (props.time < 500 - 15) {
                objectColor = Color.white;
            } else {
                objectColor = Color.white;
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
        position: [-4,1,0],
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

const JoystickCanvas = styled.div`
    position: absolute;

    width: 10vw;
    height: 10vw;

    bottom: 10%;
    left: 45%;

    z-index: 999;
`;