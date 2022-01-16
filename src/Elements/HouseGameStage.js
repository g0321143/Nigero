import React, { useState, useRef, useEffect, useMemo } from "react";
import * as THREE from 'three';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { useGLTF, MapControls, OrbitControls, CameraShake, Stats, Plane, Billboard, useAnimations } from "@react-three/drei";
import { Physics, Debug, usePlane, useBox, useSphere, useCompoundBody } from '@react-three/cannon'
import { EffectComposer, Outline } from '@react-three/postprocessing'
import { Joystick } from "react-joystick-component";

import Color from "../Constants/Color";
import styled from 'styled-components';
//import Player from "../Utils/Player";

import itemImage from '../Assets/Images/Items/NightStarJP.png';

useGLTF.preload("./Models/Structure.glb");
useGLTF.preload("./Models/RobotExpressive.glb");
useGLTF.preload("./Models/Lamp.glb");
useGLTF.preload("./Models/Chair2.glb");

/**
 * ハウスステージで使用する3Dモデルを描画します
 * @param {Type} name
 */
export default function HouseGameStage(props) {
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
                {/* ↓消すとカメラが正常に動きます */}
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
                    <Debug scale={1.1} color="black">
                    <group>
                        <Ground />
                        <axesHelper scale={3} />
                        <Player
                            dragPos={dragPos}
                            playerAngle={angle}
                            isMove={isMove}
                        />
                        <Structure time={props.time}/>
                        <Table2 position={[0,0.2,1]} time={props.time}/>
                        <Sofa position={[-0.15,0.3,2.2]} time={props.time}/>
                        <Lamp position={[1.5, 0.9, 2.35]} time={props.time} /*lampRef={lampRef}*/ />
                        <SmallChair time={props.time}/>
                        <Picframe position={[-0.1,1.4,2.6]} time={props.time}/>
                        <Book4 position={[0.9, 0.5, 2.1]} time={props.time}/>
                        <Book4 position={[0.3,0.28,1]} time={props.time}/>
                        <Carpet time={props.time}/>
                        <Trash2 position={[-1.2, 0, 2.3]} time={props.time} />
                        <Tv position={[0.16,0.5,-2.4]} time={props.time}/>
                        <Tvshelf2 position={[1.3,0.8,-2.4]} time={props.time}/>
                        <Tvshelf1 position={[0.8,1.68,-2.4]} time={props.time}/>
                        <Book1 position={[1,1.8,-2.48]} time={props.time}/>
                        <Book1 position={[1.4,1.8,-2.48]} time={props.time}/>
                        <Book1 position={[1.2,1.8,-2.48]} time={props.time}/>
                        <Book1 position={[1.1,2,-2.48]} time={props.time}/>
                        <Book1 position={[1.3,2,-2.48]} time={props.time}/>
                        <Book1 position={[1.5,2,-2.48]} time={props.time}/>
                        <Book1 position={[0.5,2,-2.48]} time={props.time}/>
                        <Book1 position={[0.4,1.8,-2.48]} time={props.time}/>
                        <Book4 position={[0,1.6,-2.5]} time={props.time}/>
                        <Prop1 position={[-0.35,1.6,-2.5]} time={props.time}/>
                        <Tvcabinet position={[0.4,0.1,-2.2]} time={props.time}/>
                        <Trash1 position={[-2.8,0.45,-2]} time={props.time}/>
                        <Table1 position={[-4.3,0.45,-1.4]} time={props.time}/>
                        <Shelf position={[-2.3,0.7,-1.8]} time={props.time}/>
                        <Book1 position={[-2.3,1.17,-2]} rotation={[0,3.14,0]} time={props.time}/>
                        <Book1 position={[-2.3,0.85,-2.1]} rotation={[0,3.14,0]} time={props.time}/>
                        <Book1 position={[-2.3,0.85,-1.8]} rotation={[0,3.14,0]} time={props.time}/>
                        <Book1 position={[-2.3,0.5,-1.5]} rotation={[0,3.14,0]} time={props.time}/>
                        <Book1 position={[-2.3,0.5,-2]} rotation={[0,3.14,0]} time={props.time}/>
                        <Computer position={[-4.6,0.98,-1.1]} time={props.time}/>
                        <Lamp2 position={[-4.53, 1.35, -0.1]} time={props.time} /*lampRef={lampRef}*/ />
                        <Cabinet position={[-4.45,1.2,1.37]} time={props.time}/>
                        <Book1 position={[-4.45,0.85,1]} rotation={[0,3.14,0]} time={props.time}/>
                        <Book1 position={[-4.45,1.8,0.5]} rotation={[0,3.14,0]} time={props.time}/>
                        <Book1 position={[-4.45,1.3,0.4]} rotation={[0,3.14,0]} time={props.time}/>
                        <Book3 position={[-4.45,1.3,0.8]} rotation={[0,3.14,0]} time={props.time}/>
                        <Prop1 position={[-4.45,1.8,0.9]} time={props.time}/>
                        <Bed position={[-3,0.65,2.1]} time={props.time}/>
                        <Sidetable position={[-2.2,0.35,2.3]} time={props.time}/>
                        <Sidetable position={[-3.8,0.35,2.3]} time={props.time}/>
                        <Sidelamp position={[-2.22,0.8,2.35]} time={props.time}/>
                        <Sidelamp position={[-3.8,0.8,2.35]} time={props.time}/>
                        <Bench position={[-3,0.4,0.3]} rotation={[0,0.3,0]} time={props.time}/>
                        <Chair1 position={[-4,0.55,-0.75]} rotation={[0,-1,0]} time={props.time}/>
                        {props.isUseItem1 ? null : <UseItemBillboard position={[0.8, 1.6, 2.2]} url={BillboardMap} />}
                        <EffectComposer multisampling={8} autoClear={false}>
                            <Outline blur selection={selected} visibleEdgeColor="white" edgeStrength={100} width={500} />
                        </EffectComposer>
                    </group>
                    </ Debug>
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

function Player(props) {

    const playerPos = useRef([0, 0, 0]);

    const { scene, nodes, animations } = useGLTF("./Models/RobotExpressive.glb");

    // 現在のアニメーション
    const [action, setAction] = useState('Walking');

    // 当たり判定の設定
    const [physicsRef, api] = useSphere(() => ({
        args: [0.4, 0.4, 0.4],
        position: [0, 0.4, 0],
        mass: 0.8,
        material: { friction: 0.4 },
        fixedRotation: true,
        type: 'Dynamic',
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

    // props.isMoveが切り替わった時のみ実行する
    useEffect(() => {
        const actionName = props.isMove ? 'Walking' : 'Idle';
        changeAction(actionName);
    }, [props.isMove])
    
    // アクションの切り替え
    const changeAction = (nextAction) => {
        actions[action].fadeOut(0.5);
        setAction(nextAction);
        actions[nextAction].reset().fadeIn(0.5).play();
    }

    // 毎フレーム実行する関数
    useFrame(() => {
        const force = {
            x: Math.min(Math.max(props.dragPos.x, -4), 4),
            z: Math.min(Math.max(props.dragPos.y, -4), 4)
        };
        
        api.applyForce([force.x, 0, -force.z], [0, 0, 0]);
        api.position.subscribe(v => playerPos.current = v);
        //api.angularVelocity.subscribe(v => console.log(v));
    });

    return (
        <group ref={physicsRef} {...props} dispose={null}>
            <primitive
                ref={ref}
                position={[0, -0.45, 0]}
                rotation={[0, props.playerAngle, 0]}
                object={scene}
                scale={0.2}
            />
        </group>
    );
}

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

function Structure(props) {
    const { scene } = useGLTF("./Models/Structure.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            // ここの条件式に名前追加して色変更して下さい
            if (props.time < 500 - 15) {
                if (object.name == 'Cube096' || object.name == 'Cube096_10') {
                    objectColor = Color.softOrange;
                } else {
                    objectColor = 'vividRed';
                }
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
        mass: 12,
        material:{friction: 0.01, restitution: -1},
        type: 'Static',
        shapes: [
            //壁　右ー上ー左ー下
            { type: 'Box', position: [1.85, 1, -1.8], rotation: [0, 0, 0], args: [0.2, 2.1, 1.5] },
            { type: 'Box', position: [1.85, 1, 1.3], rotation: [0, 0, 0], args: [0.2, 2.1, 2.6] },

            { type: 'Box', position: [0.6, 1, -2.6], rotation: [0, 0, 0], args: [2.2, 2.1, 0.2] },
            { type: 'Box', position: [-3.2, 1, -2.6], rotation: [0, 0, 0], args: [3.3, 2.1, 0.2] },

            { type: 'Box', position: [-4.9, 1, 0], rotation: [0, 0, 0], args: [0.2, 2.1, 4.8] },

            { type: 'Box', position: [-1.6, 1, 2.7], rotation: [0, 0, 0], args: [6.2, 2.1, 0.2] },
            //仕切り
            { type: 'Box', position: [-1.55, 1, 1.5], rotation: [0, 0, 0], args: [0.1, 1.8, 2] }, 
            //床
            { type: 'Box', position: [-1.5, -0.1, 0.1], rotation: [0, 0, 0], args: [6.2, 0.1, 5] }, 
            { type: 'Box', position: [-3.1, -0.05, 0.2], rotation: [0, 0, 0], args: [3.1, 0.2, 4.8] }, 
            { type: 'Box', position: [-3.3, 0, 0.2], rotation: [0, 0, 0], args: [3, 0.25, 4.8] },
            { type: 'Box', position: [-3.5, 0.05, 0.2], rotation: [0, 0, 0], args: [2.8, 0.3, 4.8] }
        ]
    }))


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
function Lamp2(props) {
    //const ref = useRef()

    const { scene } = useGLTF("./Models/Lamp2.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            // ここの条件式に名前追加して色変更して下さい
            
            if(props.time < 500 - 15){
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
            { type: 'Box', position: [0,0.06,0], rotation: [0, 0, 0], args: [0.4,0.85,0.4] },
            { type: 'Box', position: [0,-0.8,0], rotation: [0, 0, 0], args: [0.4,0.7,0.4] }
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
function Book1(props) {
    const [ref] = useCompoundBody(() => ({
        mass: 4,
        ...props,
        shapes: [
            //壁　右ー上ー左ー下
            { type: 'Box', position: [0.01,0,0.065], rotation: [0, 0, 0], args: [0.15, 0.24, 0.2] }
        ]
      }))
    const { scene } = useGLTF("./Models/Book1.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            // ここの条件式に名前追加して色変更して下さい
            if(props.time < 500 - 15){
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
function Book3(props) {
    const [ref] = useCompoundBody(() => ({
        mass: 1,
        ...props,
        shapes: [
            //壁　右ー上ー左ー下
            { type: 'Box', position: [0,0,0], rotation: [0, 0, 0], args: [0.24, 0.1, 0.2] }
        ]
      }))
    const { scene } = useGLTF("./Models/Book3.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            // ここの条件式に名前追加して色変更して下さい
            if(props.time < 500 - 15){
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
function Book4(props) {

    const [ref] = useBox(() => ({
        args: [0.2, 0.15, 0.2],
        position: [0.9, 0.5, 2.1],
        mass: 1,
        ...props,
    }));
    const { scene } = useGLTF("./Models/Book4.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            // ここの条件式に名前追加して色変更して下さい
            if(props.time < 500 - 15){
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
function Trash1(props) {

    const [ref] = useBox(() => ({
        args: [0.3, 0.6, 0.3],
        position: [-1.2, 0.18, 2.3],
        mass: 1,
        ...props,
    }));
    const { scene } = useGLTF("./Models/Trash1.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            // ここの条件式に名前追加して色変更して下さい
            if(props.time < 500 - 15){
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
function Trash2(props) {
    const [ref] = useCompoundBody(() => ({
        mass: 1,
        ...props,
        shapes: [
            { type: 'Box', position: [0,0.1,0], rotation: [0, 0, 0], args: [0.3, 0.3, 0.3] }
        ]
      }))
    const { scene } = useGLTF("./Models/Trash2.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            // ここの条件式に名前追加して色変更して下さい
            if(props.time < 500 - 15){
                
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
function Carpet(props) {

    const [ref] = useBox(() => ({
        args: [1.8, 0, 1.8],
        position: [0,0,1.4],
        mass: 10,
    }));
    const { scene } = useGLTF("./Models/Carpet.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            // ここの条件式に名前追加して色変更して下さい
            if(props.time < 500 - 15){
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
function Table1(props) {
    const [ref] = useCompoundBody(() => ({
        mass: 12,
        type: 'Static',
        ...props,
        shapes: [
            //壁　右ー上ー左ー下
            { type: 'Box', position: [-0.25,0.3,0], rotation: [0, 0, 0], args: [0.5,0.1,1.9] },
            { type: 'Box', position: [0.35,0.3,-0.8], rotation: [0, 0, 0], args: [1.5,0.1,0.5] }
        ]
      }))
    const { scene } = useGLTF("./Models/Table1.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            // ここの条件式に名前追加して色変更して下さい
            if(props.time < 500 - 15){
                objectColor = Color.softOrange;
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
function Table2(props) {
    const [ref] = useCompoundBody(() => ({
        mass: 12,
        ...props,
        shapes: [
            //壁　右ー上ー左ー下
            { type: 'Box', position: [-0.25,-0.05,0.1], rotation: [0, 0, 0], args: [0.7,0.35,0.7] },
            { type: 'Box', position: [0.25,-0.05,-0.1], rotation: [0, 0, 0], args: [0.5,0.2,0.5] }
        ]
      }))
    const { scene } = useGLTF("./Models/Table2.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            // ここの条件式に名前追加して色変更して下さい
            if(props.time < 500 - 15){
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
function Tvcabinet(props) {
    const [ref] = useCompoundBody(() => ({
        mass: 1,
        ...props,
        shapes: [
            //壁　右ー上ー左ー下
            { type: 'Box', position: [0.23,0.05,0], rotation: [0, 0, 0], args: [2.0,0.4,0.5] }
        ]
      }))
    const { scene } = useGLTF("./Models/Tv cabinet.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            // ここの条件式に名前追加して色変更して下さい
            if(props.time < 500 - 15){
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
function Tv(props) {
    const { scene } = useGLTF("./Models/Tv.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            // ここの条件式に名前追加して色変更して下さい
            if(props.time < 500 - 15){
                objectColor = Color.softOrange;
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
        mass: 1,
        type: 'Static',
        ...props,
        shapes: [
            //壁　右ー上ー左ー下
            { type: 'Box', position: [0,0.4,0], rotation: [0, 0, 0], args: [1.3,0.88,0.05] }
        ]
      }))
    return (
        <group
            //position={[0.16,0.5,-2.4]}
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
function Picframe(props) {
    const { scene } = useGLTF("./Models/Pic Frame.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            // ここの条件式に名前追加して色変更して下さい
            if(props.time < 500 - 15){
                objectColor = Color.softOrange;
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
        mass: 1,
        type: 'Static',
        ...props,
        shapes: [
            //壁　右ー上ー左ー下
            { type: 'Box', position: [0,0,0], rotation: [0, 0, 0], args: [1.5,0.7,0.05] }
        ]
      }))
    return (
        <group
            //position={[0.16,0.5,-2.4]}
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
function Tvshelf2(props) {
    const { scene } = useGLTF("./Models/Tv shelf2.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            // ここの条件式に名前追加して色変更して下さい
            if(props.time < 500 - 15){
                objectColor = Color.softOrange;
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
        mass: 1,
        type: 'Static',
        ...props,
        shapes: [
            { type: 'Box', position: [0,0,0], rotation: [0, 0, 0], args: [0.65,0.55,0.3] }
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
function Tvshelf1(props) {
    const { scene } = useGLTF("./Models/Tv shelf1.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            // ここの条件式に名前追加して色変更して下さい
            if(props.time < 500 - 15){
                objectColor = Color.softOrange;
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
        mass: 1,
        type: 'Static',
        ...props,
        shapes: [
            { type: 'Box', position: [0.2,0.17,0], rotation: [0, 0, 0], args: [1.45,0.07,0.3] },
            { type: 'Box', position: [-0.2,-0.18,0], rotation: [0, 0, 0], args: [2.1,0.07,0.3] }
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
function Prop1(props) {

    const [ref] = useBox(() => ({
        args: [0.2, 0.15, 0.2],
        position: [0.9, 0.5, 2.1],
        mass: 1,
        ...props,
    }));
    const { scene } = useGLTF("./Models/Prop1.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            // ここの条件式に名前追加して色変更して下さい
            if(props.time < 500 - 15){
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
function Computer(props) {
    const [ref] = useCompoundBody(() => ({
        mass: 1,
        ...props,
        shapes: [
            { type: 'Box', position: [0,0.08,0], rotation: [0, 0, 0], args: [0.25,0.5,0.65] }
        ]
      }))
    const { scene } = useGLTF("./Models/Computer.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            // ここの条件式に名前追加して色変更して下さい
            if(props.time < 500 - 15){
                
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
function Cabinet(props) {
    const [ref] = useCompoundBody(() => ({
        mass: 1,
        type: 'Static',
        ...props,
        shapes: [
            { type: 'Box', position: [-0.1,0,0.47], rotation: [0, 0, 0], args: [0.42,1.85,1.1] },
            { type: 'Box', position: [-0.1,0.45,-0.67], rotation: [0, 0, 0], args: [0.42,0.1,1] },
            { type: 'Box', position: [-0.1,0.96,-0.67], rotation: [0, 0, 0], args: [0.42,0.1,1] },
            { type: 'Box', position: [-0.1,-0.04,-0.67], rotation: [0, 0, 0], args: [0.42,0.1,1] },
            { type: 'Box', position: [-0.12,-0.72,-0.1], rotation: [0, 0, 0], args: [0.42,0.55,2.17] },
            { type: 'Box', position: [-0.25,0,-0.08], rotation: [0, 0, 0], args: [0.1,1.8,2.17] },
            { type: 'Box', position: [-0.1,0.13,-1.23], rotation: [0, 0, 0], args: [0.42,1.6,0.08] }

        ]
      }))
    const { scene } = useGLTF("./Models/Cabinet.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            // ここの条件式に名前追加して色変更して下さい
            if(props.time < 500 - 15){
                objectColor = Color.softOrange;
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
function Shelf(props) {
    const { scene } = useGLTF("./Models/Shelf.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            // ここの条件式に名前追加して色変更して下さい
            if(props.time < 500 - 15){
                objectColor = Color.softOrange;
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
        mass: 10,
        type: 'Static',
        ...props,
        shapes: [
            { type: 'Box', position: [0,0.03,0], rotation: [0, 0, 0], args: [0.3,0.05,1.1] },
            { type: 'Box', position: [0,-0.4,0.12], rotation: [0, 0, 0], args: [0.3,0.22,1.4] },
            { type: 'Box', position: [0,0.33,-0.2], rotation: [0, 0, 0], args: [0.3,0.05,0.7] }
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
function Sofa(props) {
    const [ref] = useCompoundBody(() => ({
        mass: 12,
        ...props,
        shapes: [
            //壁　右ー上ー左ー下
            { type: 'Box', position: [0,0,0], rotation: [0, 0, 0], args: [1.2,0.85,0.7] },
            { type: 'Box', position: [0.23,-0.24,0], rotation: [0, 0, 0], args: [2,0.2,0.7] }
        ]
      }))
    const { scene } = useGLTF("./Models/sofa.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            // ここの条件式に名前追加して色変更して下さい
            if(props.time < 500 - 15){
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
function Bed(props) {
    const [ref] = useCompoundBody(() => ({
        mass: 1,
        ...props,
        shapes: [
            //壁　右ー上ー左ー下
            { type: 'Box', position: [0,-0.1,-0.35], rotation: [0, 0, 0], args: [1,0.7,1.5] }
        ]
      }))
    const { scene } = useGLTF("./Models/Bed.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            // ここの条件式に名前追加して色変更して下さい
            if(props.time < 500 - 15){
                objectColor = Color.softOrange;
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
function Sidelamp(props) {
    const [ref] = useCompoundBody(() => ({
        mass: 1,
        ...props,
        shapes: [
            { type: 'Box', position: [0,-0.1,0], rotation: [0, 0, 0], args: [0.3,0.4,0.3] }
        ]
      }))
    const { scene } = useGLTF("./Models/Side lamp.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            // ここの条件式に名前追加して色変更して下さい
            if(props.time < 500 - 15){
                objectColor = Color.softOrange;
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
function Sidetable(props) {
    const [ref] = useCompoundBody(() => ({
        mass: 1,
        type: 'Static',
        ...props,
        shapes: [
            { type: 'Box', position: [0,0,0], rotation: [0, 0, 0], args: [0.38,0.33,0.38] }
        ]
      }))
    const { scene } = useGLTF("./Models/Side table.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            // ここの条件式に名前追加して色変更して下さい
            if(props.time < 500 - 15){
                objectColor = Color.softOrange;
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
function Chair1(props) {
    const [ref] = useCompoundBody(() => ({
        mass: 1,
        ...props,
        shapes: [
            { type: 'Box', position: [-0.05,0.05,0], rotation: [0, 0, 0], args: [0.38,0.83,0.38] }
        ]
      }))
    const { scene } = useGLTF("./Models/Chair1.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            // ここの条件式に名前追加して色変更して下さい
            if(props.time < 500 - 15){
                objectColor = Color.softOrange;
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
function Bench(props) {
    const [ref] = useCompoundBody(() => ({
        mass: 1,
        ...props,
        shapes: [
            { type: 'Box', position: [0,0,0.03], rotation: [0, 0, 0], args: [0.76,0.4,0.33] }
        ]
      }))
    const { scene } = useGLTF("./Models/Bench.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            // ここの条件式に名前追加して色変更して下さい
            if(props.time < 500 - 15){
                objectColor = Color.softOrange;
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

const JoystickCanvas = styled.div`
    position: absolute;

    width: 10vw;
    height: 10vw;

    bottom: 10%;
    left: 45%;

    z-index: 999;
`;