import React, { useState, useRef, useEffect } from "react";
import * as THREE from 'three';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { useGLTF, CameraShake, Stats, Plane, Billboard, OrbitControls } from "@react-three/drei";
import { Physics, Debug, useBox, useCompoundBody } from '@react-three/cannon'
import { EffectComposer, Outline } from '@react-three/postprocessing'

import Color from "../Constants/Color";
import Items from "../Constants/Items";
import Buildings from "../Constants/Buildings";
import Player from "../Utils/Player";
import Inventory from '../Utils/Inventory';
import MissionBox from '../Utils/MissionBox';
import VirtualStick from "../Utils/VirtualStick";
import { setScore, getLanguage,getItemState } from '../Utils/LocalStorage';


import slippersIcon from '../Assets/Images/Items/Icon/slipper-37.png';
import lightIcon from '../Assets/Images/Items/Icon/Smartphone_Light.png';
import glassFilmIcon from '../Assets/Images/Items/Icon/Glass_Protective_Film.png';
import hideIcon from '../Assets/Images/HideImage.png';


const GlassDoorShelfPosition = { x: 4.8, z: -4.2 };
/**
 * TallBuildingステージで使用する3Dモデルを描画します
 * @param {number} time 現在の時間
 * @param {boolean} isGameOver ゲームオーバーかどうか
 * @param {boolean} isCompleted ゲームが終了したかどうか
 */
export default function TallBuildingGameStage(props) {

    // 3Dモデルについての情報
    const [update, setUpdata] = useState(false);
    const playerPosition = useRef(null);
    const playerInitPosition = useRef([0.5, 0.4, 0]);
    const [playerAngle, setPlayerAngle] = useState(0);
    const isPlayerMove = useRef(false);
    const stickPosition = useRef({ x: 0, y: 0 });
    const tableRef = useRef();
    const glassDoorShelfRef = useRef();
    const doorRef = useRef();
    const [isHide, hide] = useState(false);

    // ミッションの達成状況
    const mission = useRef([false, false, false]);

    // ミッションのテキスト
    const [missionText, setMissionText] = useState(['', '', '']);

    // アイテムの使用状況
    const [isUseLight, useLight] = useState(false);
    const [isUseSlippers, useSlippers] = useState(false);
    const [isUseGlassFilm, useGlassFilm] = useState(false);
    const [isPurchasedeGlassFilm] =  useState(getItemState(Items.AntiShatteringFilm.id));

    // 時間に関する状態
    const localTime = useRef(props.time);
    localTime.current = props.time;
    const isquakeTime = props.time < Buildings.tallBuilding.totalTime - Buildings.tallBuilding.beforeTime && props.time > Buildings.tallBuilding.afterTime;

    useEffect(() => {
        // ゲームオーバーの処理
        if (props.time == Buildings.tallBuilding.totalTime - Buildings.tallBuilding.gameOverTime && !isHide) {
            props.isGameOver(true);
        } else {
            props.isGameOver(false);
        }
        // ゲームの終了
        if (props.time == 0) {
            props.isCompleted(true);
        }
    }, [props.time]);

    useEffect(() => {
        if (isHide == true) {
            playerInitPosition.current = [-0.5, 0.4, 4.6];
            hide(false);
        }
    }, [isquakeTime]);

    // スティックを操作した時
    const onChangeJoystick = (e) => {
        stickPosition.current = { x: e.x / 20, y: e.y / 20 };
        setPlayerAngle(Math.atan2(stickPosition.current.y, stickPosition.current.x) + Math.PI / 2);
        isPlayerMove.current = true;
    };

    // スティックを静止した時
    const onStopJoystick = (e) => {
        stickPosition.current = { x: e.x / 20, y: e.y / 20 };
        isPlayerMove.current = false;
        setUpdata(!update);
    };

    // ライトクリック時の動作
    const clickLight = (() => {
        useLight(!isUseLight);
        mission.current = [true, mission.current[1], mission.current[2]];

    });

    // スリッパクリック時の動作
    const clickSlippers = (() => {
        useSlippers(true);
        mission.current = [mission.current[0], true, mission.current[2]];
    });

    // ガラスフィルムクリック時の動作
    const clickGlassFilm = (() => {
        const distance = Math.sqrt(
            Math.pow(GlassDoorShelfPosition.x - playerPosition.current.x, 2) +
            Math.pow(GlassDoorShelfPosition.z - playerPosition.current.z, 2)
        );
        if (distance < 1 && props.time > Buildings.tallBuilding.totalTime - Buildings.tallBuilding.beforeTime) {
            useGlassFilm(true);
            mission.current = [mission.current[0], mission.current[1], true];
        }
    });

    // 机に隠れる時の処理
    const onCollideTablehandle = (() => {
        if (localTime.current < Buildings.tallBuilding.totalTime - Buildings.tallBuilding.beforeTime &&
            localTime.current > Buildings.tallBuilding.afterTime) {
            hide(true);
            mission.current = [true, mission.current[1], mission.current[2]];
        }
    });

    // 割れたガラスに触れた時の処理
    const onCollideBrokenGlasshandle = (() => {
        if (localTime.current < Buildings.tallBuilding.afterTime && isUseSlippers == false) {
            props.isGameOver(true);
        }
    });

    // ドアに触れた時の処理
    const onCollideDoorhandle = (() => {
        if (localTime.current < Buildings.tallBuilding.afterTime) {
            props.isCompleted(true);
        }
    });

    // 使用するアイテムのテクスチャ
    const glassFilmBillboardMap = useLoader(THREE.TextureLoader, glassFilmIcon);
    const hideIconBillboardMap = useLoader(THREE.TextureLoader, hideIcon);
    const slippersBillboardMap = useLoader(THREE.TextureLoader, slippersIcon);

    // ゲーム終了時の処理
    useEffect(() =>
        () => {
            setScore(Buildings.tallBuilding.id, mission.current);
        }, []);

    // ゲーム開始時の処理
    useEffect(() => {
        const missionTextEN = [
            "Use the light",
            "Use slippers",
            "Apply protective film to the glass door shelf",
        ];
        const missionTextJP = [
            "ライトを使用する",
            "スリッパを使用する",
            "ガラス戸棚にガラス保護フィルムを貼る",
        ];
        setMissionText(getLanguage() == 'en' ? missionTextEN : missionTextJP);
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
                    <img src={lightIcon} onClick={() => clickLight()} />,
                    isUseSlippers ? null : <img src={slippersIcon} onClick={() => clickSlippers()} />,
                    !isPurchasedeGlassFilm || isUseGlassFilm ? null : <img src={glassFilmIcon} onClick={() => clickGlassFilm()} />,
                ]}
            />
            <Canvas shadows camera={{ position: [0, 8, 0.5], fov: 45 }}>
                {/* <Stats /> */}
                <WobbleCamera isquakeTime={isquakeTime} />
                <ambientLight intensity={props.time < Buildings.tallBuilding.totalTime - Buildings.tallBuilding.gameOverTime ? 0.01 : 0.2} />
                <directionalLight
                    castShadow
                    position={[-2.5, 8, 0]}
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                    shadow-camera-left={-10}
                    shadow-camera-right={10}
                    shadow-camera-top={10}
                    shadow-camera-bottom={-10}
                    intensity={props.time < Buildings.tallBuilding.totalTime - Buildings.tallBuilding.gameOverTime ? 0 : 0.8}
                />
                {/* <OrbitControls /> */}
                <fog attach="fog" args={[Color.grayishYellowGreen, 10, 30]} />
                <Ground />
                <Building position={[-10, -5, 4]} />
                <Building position={[-10, -3, -3]} />
                <Building position={[-3.5, -10, 11]} />
                <Building position={[3.5, -7, 11]} />
                <Building position={[-10, -10, 11]} />
                <Building position={[11, -8, 11]} />
                <Building position={[11, -10, 4]} />
                <Building position={[11, -7, -3]} />
                <Building position={[-3.5, -10, -9]} />
                <Building position={[3.5, -7, -9]} />
                <Building position={[-10, -10, -9]} />
                <Building position={[11, -8, -9]} />
                {isHide &&
                    <UseItemBillboard
                        position={[-0.5, 4, 5.2]}
                        url={hideIconBillboardMap}
                    />}
                {isUseGlassFilm &&
                    <UseItemBillboard
                        position={[4.5, 1.5, -5]}
                        url={glassFilmBillboardMap}
                    />}
                {isUseSlippers &&
                    <UseItemBillboard
                        position={[playerPosition.current.x, 0.1, playerPosition.current.z]}
                        url={slippersBillboardMap}
                    />}
                <Physics iterations={6}>
                    {/* <Debug scale={1.1} color="black"> */}
                    <group>
                        {!isHide && <Player
                            dragPos={stickPosition.current}
                            playerAngle={playerAngle}
                            initPosition={playerInitPosition.current}
                            cameraPositionY={10}
                            isMove={isPlayerMove.current}
                            isLighting={isUseLight}
                            playerPositionCallback={p => playerPosition.current = p}
                        />}
                        <MainBuilding isquakeTime={isquakeTime} />
                        <Door
                            isquakeTime={isquakeTime}
                            position={[3, 0.5, -5.6]}
                            doorRef={doorRef}
                            onCollide={() => onCollideDoorhandle()}
                        />

                        <BookShelf isquakeTime={isquakeTime} position={[-4.7, 1, -5.2]} rotationY={-Math.PI / 2} />
                        <BookShelf isquakeTime={isquakeTime} position={[-3.5, 1, -5.2]} rotationY={-Math.PI / 2} />
                        <BookShelf isquakeTime={isquakeTime} position={[-2.3, 1, -5.2]} rotationY={-Math.PI / 2} />

                        <BookShelf isquakeTime={isquakeTime} position={[-4.7, 1, 5.2]} rotationY={Math.PI / 2} />
                        <BookShelf isquakeTime={isquakeTime} position={[-3.5, 1, 5.2]} rotationY={Math.PI / 2} />

                        <BookShelf isquakeTime={isquakeTime} position={[4.7, 1, 5.2]} rotationY={Math.PI / 2} />
                        <BookShelf isquakeTime={isquakeTime} position={[3.5, 1, 5.2]} rotationY={Math.PI / 2} />

                        <WorkingTable1 isquakeTime={isquakeTime} position={[-2.8, 0.5, -1]} />
                        <WorkingTable2 isquakeTime={isquakeTime} position={[-2.8, 0.5, 1]} />
                        <WorkingTable3 isquakeTime={isquakeTime} position={[-2.8, 0.5, 3]} />
                        <WorkingTable1 isquakeTime={isquakeTime} position={[2.8, 0.5, -1]} />
                        <WorkingTable2 isquakeTime={isquakeTime} position={[2.8, 0.5, 1]} />
                        <WorkingTable3 isquakeTime={isquakeTime} position={[2.8, 0.5, 3]} />

                        <Printer isquakeTime={isquakeTime} position={[-1.2, 0.5, -5.5]} />

                        <Bin isquakeTime={isquakeTime} position={[-0.7, 0.5, -1.5]} />
                        <Bin isquakeTime={isquakeTime} position={[0.7, 0.5, 3.5]} />

                        <GlassDoorShelf
                            time={props.time}
                            glassDoorShelfRef={glassDoorShelfRef}
                            isquakeTime={isquakeTime}
                            position={[4.8, 0.5, -4.2]}
                            glassDoorShelfRef={glassDoorShelfRef}
                        />
                        {!isUseGlassFilm && (localTime.current < Buildings.tallBuilding.totalTime - Buildings.tallBuilding.gameOverTime) &&
                            <BrokenGlass
                                position={[2.7, 0, -4.2]}
                                onCollide={() => onCollideBrokenGlasshandle()}
                            />}

                        <Chair isquakeTime={isquakeTime} position={[-1.5, 0.5, 5.2]} rotationY={Math.PI / 2} />
                        <Table
                            isquakeTime={isquakeTime}
                            position={[-1, 0.5, 5.2]}
                            tableRef={tableRef}
                            onCollide={() => onCollideTablehandle()}
                        />
                        <Chair isquakeTime={isquakeTime} position={[-0.5, 0.5, 5.2]} rotationY={-Math.PI / 2} />

                        <FloorLamp isquakeTime={isquakeTime} position={[-0.2, 0.9, -5.2]} />
                        <FloorLamp isquakeTime={isquakeTime} position={[-4.7, 0.9, -4]} />
                        <FloorLamp isquakeTime={isquakeTime} position={[-2.3, 0.9, 5]} />

                        <EffectComposer multisampling={8} autoClear={false}>
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
                            {localTime.current < Buildings.tallBuilding.afterTime &&
                                <Outline
                                    blur
                                    xRay={false}
                                    pulseSpeed={1}
                                    selection={doorRef}
                                    selectionLayer={4}
                                    visibleEdgeColor={"green"}
                                    edgeStrength={10}
                                    width={500}
                                />}
                            <Outline
                                blur
                                xRay={false}
                                pulseSpeed={0.5}
                                selection={glassDoorShelfRef}
                                selectionLayer={2}
                                visibleEdgeColor={isUseGlassFilm ? "white" : "red"}
                                edgeStrength={5}
                                width={500}
                            />
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

function MainBuilding(props) {
    const { scene } = useGLTF("./Models/TallBuilding/MainBuilding.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            if (props.isquakeTime == true) {
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
        material: { friction: 0 },
        shapes: [
            { type: 'Plane', position: [0, 0, 0], rotation: [-Math.PI / 2, 0, 0], args: [3] },
            { type: 'Box', position: [0, 0, 5.8], args: [10, 2, 0.2] },
            { type: 'Box', position: [0, 0, -5.8], args: [10, 2, 0.2] },
            { type: 'Box', position: [5.5, 0, 0], args: [0.2, 2, 10] },
            { type: 'Box', position: [-5.5, 0, 0], args: [0.2, 2, 10] },
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
                >
                    <meshStandardMaterial color={object.color} />
                </mesh>
            ))}
        </group>
    )
}

function Door({ isquakeTime, position, doorRef, onCollide }) {
    const { scene } = useGLTF("./Models/TallBuilding/Door.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            if (isquakeTime == true) {
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
        type: 'Static',
        args: [0.3, 0.6, 0.3],
        position: position,
        onCollide
    }));


    return (
        <group
            ref={ref}
        >
            {Objects.map((object, index) => (
                <mesh
                    castShadow
                    receiveShadow
                    ref={doorRef}
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
            if (props.isquakeTime == true) {
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

function Table({ isquakeTime, position, tableRef, onCollide }) {
    const { scene } = useGLTF("./Models/TallBuilding/Table.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            if (isquakeTime == true) {
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
        position,
        mass: 10,
        onCollide
    }));


    return (
        <group
            ref={ref}
        >
            {Objects.map((object, index) => (
                <mesh
                    castShadow
                    receiveShadow
                    ref={tableRef}
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

function GlassDoorShelf({ time, isquakeTime, position, glassDoorShelfRef }) {
    const { scene } = useGLTF("./Models/TallBuilding/GlassDoorShelf.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            let objectColor;
            if (isquakeTime == true) {
                if (object.name == 'Cube001_2') {
                    objectColor = Color.deepRed;
                } else {
                    objectColor = Color.vividRed;
                }
            } else {
                if (object.name == 'Cube001_2') {
                    objectColor = Color.softOrange;
                } else {
                    objectColor = Color.white;
                }
            }
            Objects.push(
                {
                    scale: 1.5,
                    position: [-0.1, 0, 0],
                    rotation: [0, Math.PI, 0],
                    geometry: object.geometry,
                    color: objectColor
                }
            );
        }
    });

    const [ref, api] = useBox(() => ({
        type: 'Dynamic',
        args: [0.45, 1.2, 0.9],
        position,
        mass: 20,
    }));

    if (time == Buildings.tallBuilding.totalTime - Buildings.tallBuilding.gameOverTime + 1) {
            console.log("AAAAAAAAAAAAAAAAAAAAAAAA");
        api.applyLocalImpulse([-10, 0, 0], [0.5, 2, 0]);
    }

    return (
        <group
            ref={ref}
        >
            {Objects.map((object, index) => (
                <mesh
                    castShadow
                    receiveShadow
                    ref={glassDoorShelfRef}
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


function BrokenGlass({ position, onCollide }) {
    const { scene } = useGLTF("./Models/TallBuilding/BrokenGlass.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            Objects.push(
                {
                    scale: object.scale,
                    rotation: [0, -Math.PI / 2, 0],
                    geometry: object.geometry,
                    color: Color.white
                }
            );
        }
    });

    const [ref] = useBox(() => ({
        type: 'Dynamic',
        args: [0.8, 0.1, 0.8],
        position,
        mass: 10,
        onCollide
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
            if (props.isquakeTime == true) {
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
            if (props.isquakeTime == true) {
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
            if (props.isquakeTime == true) {
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
            if (props.isquakeTime == true) {
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
            if (props.isquakeTime == true) {
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
            if (props.isquakeTime == true) {
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
            if (props.isquakeTime == true) {
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


function Building(props) {
    const { scene } = useGLTF("./Models/TallBuilding/Building.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            let objectColor;
            if (object.name == 'Cube050') {
                objectColor = Color.darkGrayishGreen;
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

    return (
        <group {...props}>
            {Objects.map((object, index) => (
                <mesh
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

    return (
        <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -10, 0]}
            receiveShadow
        >
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <meshBasicMaterial color={Color.darkGrayishGreen} />
        </mesh>
    )
}