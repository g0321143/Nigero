import React, { Suspense, useState, useRef, useEffect } from "react";
import * as THREE from 'three';
import { Canvas, useLoader } from '@react-three/fiber';
import { useGLTF, MapControls, CameraShake, Stats, Plane, Billboard } from "@react-three/drei";
import { EffectComposer, Outline } from '@react-three/postprocessing'

import Color from "../Constants/Color";

import itemImage from '../Assets/Images/Items/NightStarJP.png';

useGLTF.preload("./Models/Structure.glb");
useGLTF.preload("./Models/RobotExpressive.glb");
useGLTF.preload("./Models/Lamp.glb");

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
                <MapControls enablePan={true} enableZoom={true} enableRotate={false} />
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
                <group>
                    <Ground />
                    <axesHelper scale={3} />
                    <Structure />
                    <Lamp lampRef={lampRef} />
                    {props.isUseItem1 ? null :  <UseItemBillboard position={[0.8,1.6,2.2]} url={BillboardMap}/>}
                    <EffectComposer multisampling={8} autoClear={false}>
                        <Outline blur selection={selected} visibleEdgeColor="white" edgeStrength={100} width={500} />
                    </EffectComposer>
                </group>
            </Canvas>
        </Suspense>
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

function Ground(props) {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.23, 0]} receiveShadow>
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <shadowMaterial attach="material" transparent opacity={0.4} />
        </mesh>
    )
}