import React, { useState, useRef, useEffect, useMemo } from "react";
import * as THREE from 'three';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { useGLTF, MapControls, OrbitControls, CameraShake, Stats, Plane, Billboard, useAnimations } from "@react-three/drei";
import { Physics, Debug, usePlane, useBox, useSphere, useCompoundBody } from '@react-three/cannon'
import { EffectComposer, Outline } from '@react-three/postprocessing'

import Color from "../Constants/Color";
import Buildings from "../Constants/Buildings";
import Player from "../Utils/Player";
import Inventory from '../Utils/Inventory';
import MissionBox from '../Utils/MissionBox';
import VirtualStick from "../Utils/VirtualStick";
import { setScore } from '../Utils/LocalStorage';

useGLTF.preload("./Models/House/Structure.glb");
useGLTF.preload("./Models/House/Chair2.glb");

const missionText = [
    "Hiding behind a　 desk",
    "Use a protruding　rod to fix a bookshelf",
    "Use a gel mat to fix　 a lamp",
];

import gelMatIcon from '../Assets/Images/Items/Icon/GEL_MAT-37.png';
import tensionRodIcon from '../Assets/Images/Items/Icon/tension_rod-37.png';
import hideIcon from '../Assets/Images/HideImage.png';

const LampPosition = { x: 6, z: 1 };
const CabinetPosition = { x: -0.1, z: 0.5 };

/**
 * ハウスステージで使用する3Dモデルを描画します
 * @param {Type} name
 */
export default function HouseGameStage(props) {

    // 3Dモデルについての情報
    const [update, setUpdata] = useState(false);
    const playerPosition = useRef(null);
    const [playerAngle, setPlayerAngle] = useState(0);
    const isPlayerMove = useRef(false);
    const stickPosition = useRef({ x: 0, y: 0 });
    const lampRef = useRef();
    const cabinetRef = useRef();
    const tableRef = useRef();
    const [isHide, hide] = useState(false);

    // ミッションの達成状況
    const mission = useRef([false, false, false]);

    // アイテムの使用状況
    const [isUseGelMat, useGelMat] = useState(false);
    const [isUseTensionRod, useTensionRod] = useState(false);

    // 時間に関する状態
    const localTime = useRef(props.time);
    localTime.current = props.time;
    const isquakeTime = props.time < Buildings.house.totalTime - Buildings.house.beforeTime && props.time > Buildings.house.afterTime;


    useEffect(() => {
        // ゲームオーバーの処理
        if (props.time < Buildings.house.totalTime - Buildings.house.gameOverTime && !isHide) {
            props.isGameOver(true);
        } else {
            props.isGameOver(false);
        }
        // ゲームの終了
        if (props.time == 0) {
            props.isCompleted(true);
        }
    }, [props.time]);



    // スティックを操作した時
    const onChangeJoystick = (e) => {
        stickPosition.current = { x: e.x / 30, y: e.y / 30 };
        setPlayerAngle(Math.atan2(stickPosition.current.y, stickPosition.current.x) + Math.PI / 2);
        isPlayerMove.current = true;
    };

    // スティックを静止した時
    const onStopJoystick = (e) => {
        stickPosition.current = { x: e.x / 30, y: e.y / 30 };
        isPlayerMove.current = false;
        setUpdata(!update);
    };

    // ジェルマットクリック時の動作
    const clickGelMat = (() => {
        const distance = Math.sqrt(
            Math.pow(LampPosition.x - playerPosition.current.x, 2) +
            Math.pow(LampPosition.z - playerPosition.current.z, 2)
        );
        if (distance < 1 && props.time > Buildings.house.totalTime - Buildings.house.beforeTime) {
            useGelMat(true);
            mission.current = [mission.current[0], mission.current[1], true];
        }
    });

    // 突っ張り棒クリック時の動作
    const clickTensionRod = (() => {
        const distance = Math.sqrt(
            Math.pow(CabinetPosition.x - playerPosition.current.x, 2) +
            Math.pow(CabinetPosition.z - playerPosition.current.z, 2)
        );
        if (distance < 1 && props.time > Buildings.house.totalTime - Buildings.house.beforeTime) {
            useTensionRod(true);
            mission.current = [mission.current[0], true, mission.current[2]];
        }
    });

    // 机に隠れる時の処理
    const onCollidehandle = (() => {
        if (localTime.current < Buildings.house.totalTime - Buildings.house.beforeTime &&
            localTime.current > Buildings.house.afterTime) {
            hide(true);
            mission.current = [true, mission.current[1], mission.current[2]];
        }
    });

    // 使用するアイテムのテクスチャ
    const gelMatBillboardMap = useLoader(THREE.TextureLoader, gelMatIcon);
    const tensionRodBillboardMap = useLoader(THREE.TextureLoader, tensionRodIcon);
    const hideIconBillboardMap = useLoader(THREE.TextureLoader, hideIcon);

    // ゲーム終了時の処理
    useEffect(() =>
        () => {
            if (mission.current[0] == true)
                setScore(Buildings.house.id, mission.current);
        }, []);


    return (
        <>
            <VirtualStick
                onStopJoystick={onStopJoystick}
                onChangeJoystick={onChangeJoystick}
            />
            <MissionBox
                missionText={missionText}
                isCheckedMission={mission.current}
            />
            <Inventory
                items={[
                    isUseGelMat ? null : <img src={gelMatIcon} onClick={() => clickGelMat()} />,
                    isUseTensionRod ? null : <img src={tensionRodIcon} onClick={() => clickTensionRod()} />,
                ]}
            />
            <Canvas shadows camera={{ position: [0, 6, 0], fov: 45 }}>
                <Stats />
                <WobbleCamera isquakeTime={isquakeTime} />
                <ambientLight intensity={0.2} />
                <directionalLight
                    castShadow
                    position={[-2.5, 8, -5]}
                    intensity={0.8}
                />
                {isUseGelMat &&
                    <UseItemBillboard
                        position={[LampPosition.x - 0.8, 2, LampPosition.z - 0.2]}
                        url={gelMatBillboardMap}
                    />}
                {isUseTensionRod &&
                    <UseItemBillboard
                        position={[CabinetPosition.x - 0.8, 2.6, CabinetPosition.z - 0.2]}
                        url={tensionRodBillboardMap}
                    />}
                {isHide &&
                    <UseItemBillboard
                        position={[0, 1.5, -2]}
                        url={hideIconBillboardMap}
                    />}
                {/* <OrbitControls /> */}
                <Physics iterations={6}>
                    {/* <Debug scale={1.1} color="black"> */}
                    <group>
                        <Ground />
                        {!isHide && <Player
                            dragPos={stickPosition.current}
                            playerAngle={playerAngle}
                            initPosition={[0.5, 0.4, 0]}
                            cameraPositionY={8}
                            isMove={isPlayerMove.current}
                            isLighting={false}
                            playerPositionCallback={p => playerPosition.current = p}
                        />}
                        <House isquakeTime={isquakeTime} />
                        <SmallChair isquakeTime={isquakeTime} />
                        <SmallTable isquakeTime={isquakeTime} />
                        <Chair isquakeTime={isquakeTime} />
                        <Table isquakeTime={isquakeTime} tableRef={tableRef} onCollide={() => onCollidehandle()} />
                        <Lamp isquakeTime={isquakeTime} time={props.time} impulse={isUseGelMat ? 0 : -10} lampRef={lampRef} />
                        <Cabinet isquakeTime={isquakeTime} time={props.time} impulse={isUseTensionRod ? 0 : 10} cabinetRef={cabinetRef} />
                        <LargeChair isquakeTime={isquakeTime} />
                        <EffectComposer multisampling={8} autoClear={false}>
                            <Outline
                                blur
                                xRay={false}
                                pulseSpeed={0.5}
                                selection={lampRef}
                                selectionLayer={1}
                                visibleEdgeColor={isUseGelMat ? "white" : "red"}
                                edgeStrength={5}
                                width={500}
                            />
                            <Outline
                                blur
                                xRay={false}
                                pulseSpeed={0.5}
                                selection={cabinetRef}
                                selectionLayer={2}
                                visibleEdgeColor={isUseTensionRod ? "white" : "red"}
                                edgeStrength={5}
                                width={500}
                            />
                            {isquakeTime && <Outline
                                blur
                                xRay={false}
                                pulseSpeed={1}
                                selection={tableRef}
                                selectionLayer={3}
                                visibleEdgeColor={"green"}
                                edgeStrength={10}
                                width={500}
                            />}
                        </EffectComposer>
                    </group>
                    {/* </ Debug> */}
                </Physics>
            </Canvas>
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
            scale={0.5}
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

    if (props.isquakeTime == true)
        return <CameraShake {...config} />;
    else
        return null;
}

function House({ isquakeTime }) {
    const { scene } = useGLTF("./Models/House/Structure2.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            if (object.name == 'Cube001_1') {
                if (isquakeTime == true) {
                    objectColor = Color.vividRed;
                } else {
                    objectColor = Color.white;
                }
            } else if (!object.name.indexOf('Cube001_1')) {
                if (isquakeTime == true) {
                    objectColor = Color.deepRed;
                } else {
                    objectColor = Color.strongOrange;
                }

            } else if (!object.name.indexOf('Cube068_1')) {
                if (isquakeTime == true) {
                    objectColor = Color.deepRed;
                } else {
                    objectColor = Color.softOrange;
                }
            } else if (!object.name.indexOf('Cube068_2')) {
                if (isquakeTime == true) {

                    objectColor = Color.vividRed;
                } else {
                    objectColor = Color.strongOrange;
                }
            } else if (object.name == 'Cube001_5' || object.name == 'Cube206' || object.name == 'Cube206_1' || object.name == 'Cube208' ||
                object.name == 'Cube208_1' || object.name == 'Cube211' || object.name == 'Cube211_1' || object.name == 'Cube217' ||
                object.name == 'Cube217_1' || object.name == 'Cube215' || object.name == 'Cube215_1' || object.name == 'Cube198' || object.name == 'Cube198_1' ||
                object.name == 'Cube047' || object.name == 'Cube179' || object.name == 'Cube024' || object.name == 'Cube040' || object.name == 'Cube041' || object.name == 'Cube052'
                || object.name == 'Cube003' || object.name == 'Cube015' || object.name == 'Cube019' || object.name == 'Cube044' || object.name == 'Cube055' || object.name == 'Cube056'
                || object.name == 'Object005' || object.name == 'Object005001' || object.name == 'Plane001' || object.name == 'Plane002' || object.name == 'Sphere002' ||
                object.name == 'Sphere_1' || object.name == 'Sphere_2' || object.name == 'Sphere001_1' || object.name == 'Sphere001_2' || object.name == 'Cube011'
                || (object.name > 'Cube064' && object.name < 'Cube073') || (object.name > 'Plane002' && object.name < 'Plane006')) {
                if (isquakeTime == true) {
                    objectColor = Color.deepRed;
                } else {
                    objectColor = Color.strongOrange;
                }
            } else if (!object.name.indexOf('Cube001_')) {
                if (isquakeTime == true) {
                    objectColor = Color.vividRed;
                } else {
                    objectColor = Color.softOrange;
                }
            } else if (object.name == 'Cube173' || object.name == 'Cube021' || object.name == 'Cylinder003' || object.name == 'Cylinder015' ||
                object.name == 'Cylinder017' || object.name == 'Cylinder018' || object.name == 'Cube022' || object.name == 'Plane' || object.name == 'Cube012' || object.name == 'Cube013' ||
                object.name == 'Cube068_2') {
                if (isquakeTime == true) {
                    objectColor = Color.deepRed;
                } else {
                    objectColor = Color.softOrange;
                }
            } else if (!object.name.indexOf('Cylinder')) {
                if (isquakeTime == true) {
                    objectColor = Color.deepRed;
                } else {
                    objectColor = Color.dimGrayishGreen;
                }
            } else if (object.name == 'Cube') {
                if (isquakeTime == true) {
                    objectColor = Color.deepRed;
                } else {
                    objectColor = Color.softOrange;
                }
            } else if (object.name == 'Cube023' || object.name == 'Cube059' || object.name == 'Cube110' || object.name == 'Cube125' || object.name == 'Cube173' || object.name == 'Cube178') {
                if (isquakeTime == true) {
                    objectColor = Color.vividRed;
                } else {
                    objectColor = Color.softOrange;
                }
            } else if (object.name == 'Cube154_1' || object.name == 'Cube154_3' || object.name == 'Cube209' || object.name == 'Cube209_2' || object.name == 'Cube132') {
                if (isquakeTime == true) {
                    objectColor = Color.deepRed;
                } else {
                    objectColor = Color.dimGrayishGreen;
                }
            } else if (object.name == 'Cube154_2' || object.name == 'Cube209_1') {
                if (isquakeTime == true) {
                    objectColor = Color.deepRed;
                } else {
                    objectColor = '#808080';
                }
            } else if (object.name > 'Cube134' && object.name < 'Cube161') {
                if (isquakeTime == true) {
                    objectColor = Color.veryDarkBlueViolet;
                } else {
                    objectColor = Color.darkGrayishGreen;
                }
            } else if (object.name == 'Cube021') {
                if (isquakeTime == true) {
                    objectColor = Color.deepRed;
                } else {
                    objectColor = Color.softOrange;
                }
            } else if (object.name == 'Cube') {
                if (isquakeTime == true) {
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

function LargeChair({ isquakeTime }) {

    const { scene } = useGLTF("./Models/House/Bench.glb");

    const [ref] = useBox(() => ({
        args: [0.8, 0.5, 0.35],
        position: [1.7, 0.6, -1],
        mass: 8,
    }));

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            let objectColor;
            if (isquakeTime == true) {
                if (object.name == 'Cube141') {
                    objectColor = Color.deepRed;
                } else {
                    objectColor = Color.vividRed;
                }
            } else {
                if (object.name == 'Cube141') {
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

function Lamp({ isquakeTime, time, impulse, lampRef }) {

    const { scene } = useGLTF("./Models/House/Lamp.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            let objectColor;
            if (isquakeTime == true) {
                objectColor = Color.deepRed;
            } else {
                objectColor = Color.strongOrange;
            }
            Objects.push(
                {
                    scale: object.scale,
                    rotation: object.rotation,
                    position: [object.position.x, object.position.y + 0.3, object.position.z],
                    geometry: object.geometry,
                    color: objectColor
                }
            );
        }
    });

    const [ref, api] = useBox(() => ({
        args: [0.3, 1.7, 0.3],
        position: [6, 1, 1],
        mass: 50,
    }));

    if (time < Buildings.house.totalTime - Buildings.house.gameOverTime + 1) {
        api.applyLocalImpulse([0, 0, impulse], [0, 1, -0.5]);
    }


    return (
        <group
            ref={ref}
        >
            {Objects.map((object, index) => (
                <mesh
                    castShadow
                    receiveShadow
                    ref={lampRef}
                    scale={object.scale}
                    position={object.position}
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



function Cabinet({ isquakeTime, time, impulse, cabinetRef }) {

    const { scene } = useGLTF("./Models/House/Cabinet2.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            let objectColor;
            if (isquakeTime == true) {
                objectColor = Color.deepRed;
            } else {
                objectColor = Color.strongOrange;
            }
            Objects.push(
                {
                    scale: object.scale,
                    rotation: object.rotation,
                    position: [object.position.x, object.position.y + 0.3, object.position.z],
                    geometry: object.geometry,
                    color: objectColor
                }
            );
        }
    });

    const [ref, api] = useBox(() => ({
        args: [0.3, 1.5, 1],
        position: [-0.1, 1.2, 0.5],
        mass: 50,
    }));

    if (time < Buildings.house.totalTime - Buildings.house.gameOverTime + 1) {
        api.applyLocalImpulse([impulse, 0, 0], [0, 1, 0]);
    }


    return (
        <group
            ref={ref}
        >
            {Objects.map((object, index) => (
                <mesh
                    castShadow
                    receiveShadow
                    ref={cabinetRef}
                    scale={object.scale}
                    position={object.position}
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

function SmallTable({ isquakeTime }) {

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
            if (isquakeTime == true) {
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

function SmallChair({ isquakeTime }) {

    const { scene } = useGLTF("./Models/House/Chair2.glb");

    const [ref] = useBox(() => ({
        args: [0.35, 0.35, 0.35],
        position: [4, 0.3, -1],
        mass: 5,
    }));

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            let objectColor;
            if (isquakeTime == true) {
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

function Table({ isquakeTime, tableRef, onCollide }) {

    const { scene } = useGLTF("./Models/House/Table1.glb");

    const [ref] = useCompoundBody(() => ({
        mass: 10,
        position: [0.25, 0.7, -2.75],
        onCollide,
        shapes: [
            { type: 'Box', position: [0.3, 0, -0.75], args: [1.5, 0.75, 0.5] },
            { type: 'Box', position: [-0.25, 0, 0], args: [0.5, 0.75, 2] },
        ]
    }));

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            if (isquakeTime == true) {
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
                    ref={tableRef}
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

function Chair({ isquakeTime }) {

    const { scene } = useGLTF("./Models/House/Chair1.glb");

    const [ref] = useBox(() => ({
        args: [0.35, 0.7, 0.35],
        position: [1, 0.7, -2.5],
        mass: 50,
    }));

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            let objectColor;
            if (isquakeTime == true) {
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
