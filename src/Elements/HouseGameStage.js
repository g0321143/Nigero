import React, { Suspense, useState, useRef, useEffect } from "react";
import * as THREE from 'three';
import { Canvas, useLoader } from '@react-three/fiber';
import { useGLTF, MapControls, OrbitControls, CameraShake, Stats, Plane, Billboard, useAnimations } from "@react-three/drei";
import { Physics, Debug, usePlane, useBox, useSphere, useCompoundBody } from '@react-three/cannon'
import { EffectComposer, Outline } from '@react-three/postprocessing'
import { Joystick } from "react-joystick-component";

import Color from "../Constants/Color";
import styled from 'styled-components';

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

    const BillboardMap = useLoader(THREE.TextureLoader, itemImage);


    return (
        <Suspense fallback={"Loading"}>
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
                    <Debug scale={1.1} color="black">
                        <group>
                            <Ground />
                            <axesHelper scale={3} />
                            <Player />
                            <Structure />
                            <Lamp lampRef={lampRef} />
                            <SmallChair />
                            {props.isUseItem1 ? null : <UseItemBillboard position={[0.8, 1.6, 2.2]} url={BillboardMap} />}
                            <EffectComposer multisampling={8} autoClear={false}>
                                <Outline blur selection={selected} visibleEdgeColor="white" edgeStrength={100} width={500} />
                            </EffectComposer>
                        </group>
                    </Debug>
                </Physics>
            </Canvas>
            <JoystickCanvas>
                <Joystick
                    size={100}
                    stop={() => {
                        console.log("se detiene el Joystick");
                    }}
                    move={(event) => {
                        const direction = event.direction;
                        console.log(direction);
                        // backward down
                        const newDirection =
                            direction === "forward"
                                ? "top"
                                : direction === "backward"
                                    ? "down"
                                    : direction;
                    }}
                />
            </JoystickCanvas>

        </Suspense>
    );
};


function Player(props) {
    const group = useRef();
    const { scene, nodes, animations } = useGLTF("./Models/RobotExpressive.glb");

    const [ref] = useBox(() => ({
        args: [0.6, 0.9, 0.4],
        position: [0, 0.4, 0],
        mass: 100,
    }));

    const { actions } = useAnimations(animations, group);
    useEffect(() => {
        actions.Walking.play();
    });

    return (
        <group ref={group} position={[0, -0.5, 0]} {...props} dispose={null}>
            <primitive
                ref={ref}
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
            if (object.name == '') {
                objectColor = 'black';
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
    const ref = useRef()

    const { scene } = useGLTF("./Models/Lamp.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let objectColor;
            // ここの条件式に名前追加して色変更して下さい
            if (object.name == '') {
                objectColor = 'black';
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
            position={[1.4, 1.2, 2.2]}
        >
            {Objects.map((object, index) => (
                <mesh
                    ref={ref}
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
        args: [-0.35, 0.35, 0.35],
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
            if (object.name == '') {
                objectColor = 'black';
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
        type: 'Static'
    }))
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.23, 0]} receiveShadow ref={ref}>
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