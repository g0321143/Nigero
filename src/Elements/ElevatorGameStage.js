import React, { useState, useRef, useEffect } from "react";
import * as THREE from 'three';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { useGLTF, CameraShake, Stats, Plane, Billboard, OrbitControls } from "@react-three/drei";
import { Physics, Debug, useBox, useCompoundBody } from '@react-three/cannon'
import { EffectComposer, Outline } from '@react-three/postprocessing'

import Color from "../Constants/Color";
import Buildings from "../Constants/Buildings";
import Player from "../Utils/Player";
import Inventory from '../Utils/Inventory';
import MissionBox from '../Utils/MissionBox';
import VirtualStick from "../Utils/VirtualStick";
import { setScore } from '../Utils/LocalStorage';

const missionText = [
    "Use the light",
    "Use slippers",
    "Apply protective film to the glass door shelf",
];

import slippersIcon from '../Assets/Images/Items/Icon/slipper-37.png';
import lightIcon from '../Assets/Images/Items/Icon/GEL_MAT-37.png';
import glassFilmIcon from '../Assets/Images/Items/Icon/tension_rod-37.png';
import hideIcon from '../Assets/Images/HideImage.png';



const GlassDoorShelfPosition = { x: 4.8, z: -4.2 };
/**
 * Elevatorステージで使用する3Dモデルを描画します
 * @param {number} time 現在の時間
 * @param {boolean} isGameOver ゲームオーバーかどうか
 * @param {boolean} isCompleted ゲームが終了したかどうか
 */
export default function ElevatorGameStage(props) {

    // 3Dモデルについての情報
    const [update, setUpdata] = useState(false);
    const playerPosition = useRef(null);
    const playerInitPosition = useRef([0.5, 0.4, 0]);
    const [playerAngle, setPlayerAngle] = useState(0);
    const isPlayerMove = useRef(false);
    const stickPosition = useRef({ x: 0, y: 0 });
    const buttonPanelRef = useRef();
    const emergencySupplyBoxRef = useRef();
    const [isHide, hide] = useState(false);

    // ミッションの達成状況
    const mission = useRef([false, false, false]);


    // 時間に関する状態
    const localTime = useRef(props.time);
    localTime.current = props.time;
    const isquakeTime = props.time < Buildings.elevator.totalTime - Buildings.elevator.beforeTime && props.time > Buildings.elevator.afterTime;

    useEffect(() => {
        // ゲームオーバーの処理
        if (props.time == Buildings.elevator.totalTime - Buildings.elevator.gameOverTime && !isHide) {
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
            //playerInitPosition.current = [-0.5, 0.4, 4.6];
            //hide(false);
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

    const clickButtonPanel = () => {
        hide(false);
    };

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
                items={[]}
            />
            <Canvas shadows camera={{ position: [0, 5, 0], fov: 45 }}>
                <Stats />
                <WobbleCamera isquakeTime={isquakeTime} />
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
                <OrbitControls />
                <fog attach="fog" args={[Color.grayishYellowGreen, 10, 30]} />
                <Structure isquakeTime={isquakeTime} time={props.time} />
                <ElevatorButtonPanel isquakeTime={isquakeTime} buttonPanelRef={buttonPanelRef} onClick={(e) => console.log("click")}/>

                <ElevatorButton position={[-0.34, 0.12, -0.38]} color={'white'} onClick={(e) => console.log("click")}/>
                <ElevatorButton position={[-0.34, 0.12, -0.52]} color={'white'} onClick={(e) => console.log("click")}/>

                <ElevatorButton position={[-0.34, 0, -0.38]} color={'white'} onClick={(e) => console.log("click")}/>
                <ElevatorButton position={[-0.34, 0, -0.52]} color={'white'} onClick={(e) => console.log("click")}/>

                <ElevatorButton position={[-0.34, -0.12, -0.38]} color={'white'} onClick={(e) => console.log("click")}/>
                <ElevatorButton position={[-0.34, -0.12, -0.52]} color={'white'} onClick={(e) => console.log("click")}/>

                <ElevatorButton position={[-0.34, -0.24, -0.38]} color={'white'} onClick={(e) => console.log("click")}/>
                <ElevatorButton position={[-0.34, -0.24, -0.52]} color={'white'} onClick={(e) => console.log("click")}/>

                <ElevatorButton position={[-0.34, -0.36, -0.38]} color={'white'} onClick={(e) => console.log("click")}/>
                <ElevatorButton position={[-0.34, -0.36, -0.52]} color={'white'} onClick={(e) => console.log("click")}/>
                
                <ElevatorButton position={[-0.34, -0.55, -0.34]} color={'#00ff00'} onClick={(e) => console.log("click")}/>
                <ElevatorButton position={[-0.34, -0.55, -0.45]} color={'#ff0000'} onClick={(e) => console.log("click")}/>
                <ElevatorButton position={[-0.34, -0.55, -0.56]} color={'#00ff00'} onClick={(e) => console.log("click")}/>

                <Physics iterations={6}>
                    {/* <Debug scale={1.1} color="black"> */}
                    <group>
                        {/* <Player
                                dragPos={stickPosition.current}
                                playerAngle={playerAngle}
                                initPosition={[0, -2.9, 0]}
                                cameraPositionY={4}
                                isMove={isPlayerMove.current}
                                isLighting={false}
                                playerPositionCallback={p => playerPosition.current = p}
                            /> */}
                        <Elevator isquakeTime={isquakeTime} />
                        <EmergencySupplyBox isquakeTime={isquakeTime} emergencySupplyBoxRef={emergencySupplyBoxRef} onClick={(e) => console.log("click")}/>
                        <EffectComposer multisampling={8} autoClear={false}>
                            <Outline
                                blur
                                xRay={false}
                                pulseSpeed={0.5}
                                selection={buttonPanelRef}
                                selectionLayer={2}
                                visibleEdgeColor={"white"}
                                edgeStrength={5}
                                width={500}
                            />
                            <Outline
                                blur
                                xRay={false}
                                pulseSpeed={0.5}
                                selection={emergencySupplyBoxRef}
                                selectionLayer={3}
                                visibleEdgeColor={"white"}
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


function Elevator({ isquakeTime }) {
    const { scene } = useGLTF("./Models/Elevator/Elevator1.glb");

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


function EmergencySupplyBox({ isquakeTime, emergencySupplyBoxRef, onClick }) {
    const { scene } = useGLTF("./Models/Elevator/EmergencySupplyBox.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
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
        >
            {Objects.map((object, index) => (
                <mesh
                    castShadow
                    receiveShadow
                    onClick={onClick}
                    ref={emergencySupplyBoxRef}
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
        if (props.time > Buildings.elevator.quakeTime + Buildings.elevator.afterTime - 2) {
            ref.current.position.y -= 0.05;
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
