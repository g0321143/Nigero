import React, { useState, useRef, useEffect, useMemo } from "react";
import * as THREE from 'three';
import { Canvas, useLoader, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, CameraShake, Stats, Plane, Billboard, OrbitControls, PerspectiveCamera, useAnimations } from "@react-three/drei";
import { Physics, Debug, useBox, useCompoundBody, useSphere } from '@react-three/cannon'
import { EffectComposer, Outline } from '@react-three/postprocessing'

import Color from "../Constants/Color";
import Buildings from "../Constants/Buildings";
import Inventory from '../Utils/Inventory';
import MissionBox from '../Utils/MissionBox';
import VirtualStick from "../Utils/VirtualStick";
import { setScore } from '../Utils/LocalStorage';

const missionText = [
    "Help is on the way and the elevator is fixed",
    "Press all buttons on the elevator",
    "Open the emergency supply box provided in the elevator",
];

import slippersIcon from '../Assets/Images/Items/Icon/slipper-37.png';
import lightIcon from '../Assets/Images/Items/Icon/GEL_MAT-37.png';
import glassFilmIcon from '../Assets/Images/Items/Icon/tension_rod-37.png';


/**
 * Elevatorステージで使用する3Dモデルを描画します
 * @param {number} time 現在の時間
 * @param {boolean} isGameOver ゲームオーバーかどうか
 * @param {boolean} isCompleted ゲームが終了したかどうか
 */
export default function ElevatorGameStage(props) {

    // 3Dモデルについての情報
    const [update, setUpdata] = useState(false);
    const playerPosition = useRef([0, 0, 0]);
    const [playerAngle, setPlayerAngle] = useState(0);
    const isPlayerMove = useRef(false);
    const stickPosition = useRef({ x: 0, y: 0 });
    const buttonPanelRef = useRef();
    const emergencySupplyBoxRef = useRef();

    const [isHide, hide] = useState(false);
    const [isOpenBox, openBox] = useState(false);

    const [button1, setButton1] = useState(false);
    const [button2, setButton2] = useState(false);
    const [button3, setButton3] = useState(false);
    const [button4, setButton4] = useState(false);
    const [button5, setButton5] = useState(false);
    const [button6, setButton6] = useState(false);
    const [button7, setButton7] = useState(false);
    const [button8, setButton8] = useState(false);
    const [button9, setButton9] = useState(false);
    const [button10, setButton10] = useState(false);
    const [button11, setButton11] = useState(false);
    const [button12, setButton12] = useState(false);
    const [button13, setButton13] = useState(false);
    const [emergencyButton, setEmergencyButton] = useState(false);

    // ミッションの達成状況
    const mission = useRef([false, false, false]);


    // 時間に関する状態
    const localTime = useRef(props.time);
    localTime.current = props.time;
    const isquakeTime = props.time < Buildings.elevator.totalTime - Buildings.elevator.beforeTime && props.time > Buildings.elevator.afterTime;

    useEffect(() => {
        // ゲームオーバーの処理
        if (props.time == Buildings.elevator.totalTime - Buildings.elevator.gameOverTime &&
            mission.current[0] == false && mission.current[1] == false && mission.current[2] == false) {
            props.isGameOver(true);
        } else {
            props.isGameOver(false);
        }
        // ゲームの終了
        if (props.time == 0) {
            props.isCompleted(true);
        }
    }, [props.time]);

    // ミッションの更新
    useEffect(() => {
        if (button1 && button2 && button3 && button4 && button5 && button6 && button7
            && button8 && button9 && button10 && button11 && button12 && button13) {
            mission.current = [true, mission.current[1], mission.current[2]];
        }
    }, [button1, button2, button3, button4, button5, button6, button7,
        button8, button9, button10, button11, button12, button13]);

    useEffect(() => {
        if (emergencyButton == true) {
            mission.current = [mission.current[0], true, mission.current[2]];
        }
    }, [emergencyButton]);

    useEffect(() => {
        if (isOpenBox == true) {
            mission.current = [mission.current[0], mission.current[1], true];
        }
    }, [isOpenBox]);

    // スティックを操作した時
    const onChangeJoystick = (e) => {
        stickPosition.current = { x: e.x / 40, y: e.y / 40 };
        setPlayerAngle(Math.atan2(stickPosition.current.y, stickPosition.current.x) + Math.PI / 2);
        isPlayerMove.current = true;
    };

    // スティックを静止した時
    const onStopJoystick = (e) => {
        stickPosition.current = { x: e.x / 40, y: e.y / 40 };
        isPlayerMove.current = false;
        setUpdata(!update);
    };

    // エレベーターのパネルをクリックしたときの処理
    const clickButtonPanel = () => {
        if (props.time < Buildings.elevator.afterTime) {
            hide(true);
        }
    };

    // スティックを動かすとハイド解除
    useEffect(() => {
        if (isPlayerMove.current == true) {
            hide(false);
        }
    }, [isPlayerMove.current]);


    // ゲーム終了時の処理
    useEffect(() =>
        () => {
            setScore(Buildings.elevator.id, mission.current);
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
                    isOpenBox ? <img src={lightIcon} /> : null,
                    isOpenBox ? <img src={slippersIcon} /> : null,
                    isOpenBox ? <img src={glassFilmIcon} /> : null,
                ]}
            />
            <Canvas shadows>
                <Stats />
                <CameraControl isHide={isHide} />
                <WobbleCamera isquakeTime={isquakeTime} isHide={isHide} cameraPosition={playerPosition.current} />
                <ambientLight intensity={0.2} />
                <directionalLight
                    castShadow
                    position={[0.1, 5, 0.1]}
                    intensity={0.8}
                />
                <directionalLight
                    castShadow
                    position={[1, 5, 1]}
                    intensity={0.8}
                />
                {/* <OrbitControls /> */}
                <fog attach="fog" args={[Color.grayishYellowGreen, 10, 30]} />
                <Structure isquakeTime={isquakeTime} time={props.time} />
                <ElevatorButtonPanel isquakeTime={isquakeTime} buttonPanelRef={buttonPanelRef} onClick={() => clickButtonPanel()} />

                <ElevatorButton position={[-0.34, 0.12, -0.38]} color={button1 ? Color.strongOrange : 'white'} onClick={() => setButton1(true)} />
                <ElevatorButton position={[-0.34, 0.12, -0.52]} color={button2 ? Color.strongOrange : 'white'} onClick={() => setButton2(true)} />

                <ElevatorButton position={[-0.34, 0, -0.38]} color={button3 ? Color.strongOrange : 'white'} onClick={() => setButton3(true)} />
                <ElevatorButton position={[-0.34, 0, -0.52]} color={button4 ? Color.strongOrange : 'white'} onClick={() => setButton4(true)} />

                <ElevatorButton position={[-0.34, -0.12, -0.38]} color={button5 ? Color.strongOrange : 'white'} onClick={() => setButton5(true)} />
                <ElevatorButton position={[-0.34, -0.12, -0.52]} color={button6 ? Color.strongOrange : 'white'} onClick={() => setButton6(true)} />

                <ElevatorButton position={[-0.34, -0.24, -0.38]} color={button7 ? Color.strongOrange : 'white'} onClick={() => setButton7(true)} />
                <ElevatorButton position={[-0.34, -0.24, -0.52]} color={button8 ? Color.strongOrange : 'white'} onClick={() => setButton8(true)} />

                <ElevatorButton position={[-0.34, -0.36, -0.38]} color={button9 ? Color.strongOrange : 'white'} onClick={() => setButton9(true)} />
                <ElevatorButton position={[-0.34, -0.36, -0.52]} color={button10 ? Color.strongOrange : 'white'} onClick={() => setButton10(true)} />

                <ElevatorButton position={[-0.34, -0.55, -0.34]} color={button11 ? Color.strongOrange : '#00ff00'} onClick={() => setButton11(true)} />
                <ElevatorButton position={[-0.34, -0.55, -0.45]} color={button12 ? Color.strongOrange : '#ff0000'} onClick={() => setButton12(true)} />
                <ElevatorButton position={[-0.34, -0.55, -0.56]} color={button13 ? Color.strongOrange : '#00ff00'} onClick={() => setButton13(true)} />

                <EmergencyButton position={[-0.34, -0.77, -0.46]} color={emergencyButton} onClick={() => setEmergencyButton(true)} />

                <Physics iterations={6}>
                    {/* <Debug scale={1.1} color="black"> */}
                    <group>
                        {!isHide && <Player
                            dragPos={stickPosition.current}
                            playerAngle={playerAngle}
                            initPosition={[0, -2.9, 0]}
                            isMove={isPlayerMove.current}
                            playerPositionCallback={p => playerPosition.current = p}
                        />}
                        <Elevator isquakeTime={isquakeTime} />
                        <EmergencySupplyBox
                            isquakeTime={isquakeTime}
                            isOpenBox={isOpenBox}
                            emergencySupplyBoxRef={emergencySupplyBoxRef}
                            onClick={() => props.time < Buildings.elevator.afterTime && openBox(true)}
                        />
                        <EffectComposer multisampling={8} autoClear={false}>
                            {props.time < Buildings.elevator.afterTime &&
                                <Outline
                                    blur
                                    xRay={false}
                                    pulseSpeed={0.5}
                                    selection={buttonPanelRef}
                                    selectionLayer={2}
                                    visibleEdgeColor={"white"}
                                    edgeStrength={5}
                                    width={500}
                                />}
                            {props.time < Buildings.elevator.afterTime &&
                                <Outline
                                    blur
                                    xRay={false}
                                    pulseSpeed={0.5}
                                    selection={emergencySupplyBoxRef}
                                    selectionLayer={3}
                                    visibleEdgeColor={"white"}
                                    edgeStrength={5}
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
        decayRate: 0.05, // if decay = true this is the rate at which intensity will reduce at
        additive: true, // this should be used when your scene has orbit controls
    };
    if (props.isquakeTime == true)
        return <CameraShake {...config} />;
    else
        return null;
}

function CameraControl(props) {
    useFrame((state) => {
        if (props.isHide == true) {
            state.camera.lookAt(-0.5, -0.5, 0);
            state.camera.position.set(2, -0.5, 0);
        } else {
            state.camera.position.set(0.5, 4, 0);
            state.camera.lookAt(0.5, 0, 0);
        }
    });

    return <PerspectiveCamera makeDefault fov={45} />;
}


function Elevator({ isquakeTime }) {
    const { scene } = useGLTF("./Models/Elevator/Elevator.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            let objectColor;
            if (isquakeTime == true) {
                if (object.name == 'Cube006') {
                    objectColor = Color.deepRed;
                } else if (object.name == 'Cube006_1') {
                    objectColor = Color.vividRed;
                } else {
                    objectColor = Color.vividRed;;
                }
            } else {
                if (object.name == 'Cube006') {
                    objectColor = Color.dimGrayishGreen;
                } else if (object.name == 'Cube006_1') {
                    objectColor = Color.grayishYellowGreen;
                } else {
                    objectColor = Color.grayishYellowGreen;;
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
            { type: 'Plane', position: [0, -3, 0], rotation: [-Math.PI / 2, 0, 0], args: [3] },
            { type: 'Box', position: [1, -0.8, 2], args: [2.5, 4, 0.2] },
            { type: 'Box', position: [1, -0.8, -0.8], args: [2.5, 4, 0.2] },
            { type: 'Box', position: [2.3, -0.8, 0.6], args: [0.2, 4, 2.5] },
            { type: 'Box', position: [-0.5, -0.8, 0.6], args: [0.2, 4, 2.5] },
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
                    position={[0.7, -0.5, 0.6]}
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


function EmergencySupplyBox({ isquakeTime, isOpenBox, emergencySupplyBoxRef, onClick }) {
    const { scene } = useGLTF("./Models/Elevator/EmergencySupplyBox.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name)
            let objectColor;
            if (isquakeTime == true) {
                objectColor = Color.deepRed;
            } else {
                objectColor = Color.dimGrayishGreen;
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
        type: 'Box',
        position: [1.5, -2.6, 1.2],
        args: [0.5, 0.5, 0.5]
    }));


    return (
        <group
            ref={ref}
            onClick={onClick}
        >
            <mesh
                castShadow
                receiveShadow
                ref={emergencySupplyBoxRef}
                scale={Objects[0].scale}
                rotation={Objects[0].rotation}
                geometry={Objects[0].geometry}
            >
                <meshStandardMaterial color={Objects[0].color} />
            </mesh>
            {!isOpenBox &&
                <mesh
                    castShadow
                    receiveShadow
                    ref={emergencySupplyBoxRef}
                    scale={Objects[1].scale}
                    rotation={Objects[1].rotation}
                    geometry={Objects[1].geometry}
                >
                    <meshStandardMaterial color={Objects[1].color} />
                </mesh>}

        </group>
    )
}


function Structure(props) {
    const { scene } = useGLTF("./Models/Elevator/Structure.glb");

    const ref = useRef();
    const [vel, setVel] = useState(0.05);

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            let objectColor;
            if (props.isquakeTime == true) {
                if (object.name == 'Cube007') {
                    objectColor = Color.deepRed;
                } else {
                    objectColor = Color.vividRed;
                }
            } else {
                if (object.name == 'Cube007') {
                    objectColor = Color.strongOrange;
                } else {
                    objectColor = Color.white;
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

    useFrame(() => {
        // 地震前
        if (props.time > Buildings.elevator.quakeTime + Buildings.elevator.afterTime - 2) {
            ref.current.position.y -= 0.05;
            // ゲームオーバー回避後の時間
        } else if (props.time < Buildings.elevator.totalTime - Buildings.elevator.gameOverTime) {
            setVel(vel + 0.00025);
            ref.current.position.y += vel;
        } else {
            if (vel > 0) {
                ref.current.position.y -= vel;
                setVel(vel - 0.00025);
            }
        }
    });


    return (
        <group
            ref={ref}
            position={[0, 15, 0]}
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

function ElevatorButton({ position, color, onClick }) {
    const { scene } = useGLTF("./Models/Elevator/ElevatorButton.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            Objects.push(
                {
                    scale: object.scale,
                    rotation: [0, -Math.PI / 2, 0],
                    geometry: object.geometry,
                }
            );
        }
    });

    return (
        <group
            position={position}
        >
            {Objects.map((object, index) => (
                <mesh
                    castShadow
                    receiveShadow
                    onClick={onClick}
                    scale={object.scale}
                    rotation={object.rotation}
                    geometry={object.geometry}
                    key={index}
                >
                    <meshStandardMaterial color={color} />
                </mesh>
            ))}
        </group>
    )
}

function EmergencyButton({ position, color, onClick }) {
    const { scene } = useGLTF("./Models/Elevator/EmergencyButton.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            let objectColor;
            if (object.name == 'Cube_1') {
                if (color == true) {
                    objectColor = Color.softOrange;
                } else {
                    objectColor = 'yellow';
                }
            } else {
                objectColor = 'black';
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
        <group
            position={position}
        >
            {Objects.map((object, index) => (
                <mesh
                    castShadow
                    receiveShadow
                    onClick={onClick}
                    scale={0.15}
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

function ElevatorButtonPanel({ isquakeTime, buttonPanelRef, onClick }) {
    const { scene } = useGLTF("./Models/Elevator/ElevatorButtonPanel.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            let objectColor;
            if (isquakeTime == true) {
                objectColor = Color.vividRed;
            } else {
                objectColor = Color.grayishYellowGreen;
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
        <group>
            {Objects.map((object, index) => (
                <mesh
                    castShadow
                    receiveShadow
                    onClick={onClick}
                    position={[-0.36, -0.3, -0.45]}
                    ref={buttonPanelRef}
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

/**
 * ゲーム画面で使用するキャラクターを表示します
 * ※カメラを除いたもの
 * @param {{x: number, y:number}} dragPos 仮想パッドのXY座標
 * @param {number} playerAngle プレイヤーの向き(ラジアン)
 * @param {boolean} isMove プレイヤーが動いているかどうか
 * @param {[number, number, number]} initPosition プレイヤーの初期座標
 * @param {(callback: (value: Vector3) => void)} playerPositionCallback プレイヤーの座標を返すコールバック
 */
function Player({ dragPos, playerAngle, isMove, initPosition, playerPositionCallback }) {

    // キャラクターのモデルの読み込み
    const { scene, nodes, animations } = useGLTF("./Models/RobotExpressive.glb");

    // 現在のアニメーション
    const [action, setAction] = useState('Walking');

    // 当たり判定の設定
    const [physicsRef, api] = useSphere(() => ({
        args: [0.4], // 大きさ
        position: initPosition, // 座標
        mass: 1, // 重さ
        material: { friction: 0 }, // 材質 {摩擦：0に設定 }
        fixedRotation: true, // 回転を固定
        type: 'Dynamic', // 物理演算のタイプ
    }));

    // アニメーションの抽出
    const { ref, actions } = useAnimations(animations);

    // 影の設定(<primitive/>のみここで設定する)
    useMemo(() => Object.values(nodes).forEach(obj =>
        obj.isMesh && Object.assign(obj, {
            castShadow: true,
            receiveShadow: true
        })
    ), [nodes]);

    // isMoveが切り替わった時のみ実行する
    useEffect(() => {
        const actionName = isMove ? 'Walking' : 'Idle';
        changeAction(actionName);
    }, [isMove]);

    // アクションの切り替え
    const changeAction = (nextAction) => {
        actions[action].fadeOut(0.5);
        setAction(nextAction);
        actions[nextAction].reset().fadeIn(0.5).play();
    };

    // 毎フレーム実行する関数
    useFrame(() => {
        // プレイヤーに速度を与える
        api.velocity.set(dragPos.x, 0, -dragPos.y);
        // プレイヤーの座標を取得
        const p = new THREE.Vector3();
        physicsRef.current.getWorldPosition(p);
        playerPositionCallback(p);
    });

    return (
        <group ref={physicsRef} dispose={null}>
            <primitive
                ref={ref}
                position={[0, -0.5, 0]}
                rotation={[0, playerAngle, 0]}
                object={scene}
                scale={0.2}
            />
        </group>
    );
}
