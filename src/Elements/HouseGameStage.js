import React, { Suspense } from "react";
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from "@react-three/drei";

import Color from "../Constants/Color";

useGLTF.preload("./Models/Structure.glb");
useGLTF.preload("./Models/RobotExpressive.glb");
useGLTF.preload("./Models/Lamp.glb");

/**
 * ハウスステージで使用する3Dモデルを描画します
 * @param {Type} name
 */
export default function HouseGameStage() {

    return (
        <Suspense fallback={"Loading"}>
            <Canvas shadows camera={{ position: [4, 2, -2], fov: 45 }}>
                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
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
                    <Lamp />
                </group>
            </Canvas>
        </Suspense>
    );
};

function Structure(props) {
    const { scene } = useGLTF("./Models/Structure.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let color;
            // ここの条件式に名前追加して色変更して下さい
            if (object.name == '') {
                color = 'black';
            } else {
                color = Color.softOrange;
            }
            Objects.push(
                <mesh
                    castShadow
                    receiveShadow
                    scale={object.scale}
                    rotation={object.rotation}
                    geometry={object.geometry}
                >
                    <meshStandardMaterial color={color} />
                </mesh>
            );
        }
    });

    return (
        <group {...props} dispose={null}>
            {Objects.map((object) => (
                <>{object}</>
            ))}
        </group>
    )
}

function Lamp(props) {
    const { scene } = useGLTF("./Models/Lamp.glb");

    let Objects = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            //console.log(object.name);
            let color;
            // ここの条件式に名前追加して色変更して下さい
            if (object.name == '') {
                color = 'black';
            } else {
                color = Color.softOrange;
            }
            Objects.push(
                <mesh
                    castShadow
                    receiveShadow
                    scale={object.scale}
                    rotation={object.rotation}
                    geometry={object.geometry}
                >
                    <meshStandardMaterial color={color} />
                </mesh>
            );
        }
    });

    return (
        <group {...props} dispose={null} position={[1.4, 1.2, 2.2]}>
            {Objects.map((object) => (
                <>{object}</>
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