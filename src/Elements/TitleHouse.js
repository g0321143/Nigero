import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Plane, PerspectiveCamera, useGLTF, OrbitControls } from "@react-three/drei";

import colors from '../Constants/Color';

useGLTF.preload('./Models/House.glb');
useGLTF.preload('./Models/Rock.glb');
useGLTF.preload('./Models/Fence1.glb');
useGLTF.preload('./Models/Fence2.glb');
useGLTF.preload('./Models/Tree.glb');
useGLTF.preload('./Models/MailBox.glb');



function MailBox(props) {
    const { scene, nodes } = useGLTF("./Models/MailBox.glb");

    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                scale={nodes.Cube047.scale}
                geometry={nodes.Cube047.geometry}
            >
                <meshStandardMaterial color={'#F3D393'} />
            </mesh>
        </group>
    )
}

function House(props) {
    const { scene } = useGLTF('./Models/House.glb');

    let house = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            if (object.name == 'House_2') {
                house.push(
                    <mesh
                        castShadow
                        scale={object.scale}
                        rotation={object.rotation}
                        geometry={object.geometry}
                    >
                        <meshStandardMaterial color={'white'} />
                    </mesh>
                );
            } else {
                house.push(
                    <mesh
                        castShadow
                        scale={object.scale}
                        rotation={object.rotation}
                        geometry={object.geometry}
                    >
                        <meshStandardMaterial color={'#F3D393'} />
                    </mesh>
                );
            }
        }
    });


    return (
        <group {...props} dispose={null}>
            {house[0]}
            {house[1]}
        </group>
    )
}


function Rock(props) {
    const { scene, nodes } = useGLTF("./Models/Rock.glb");

    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                scale={nodes.Cube014.scale}
                geometry={nodes.Cube014.geometry}
            >
                <meshStandardMaterial color={'#F3D393'} />
            </mesh>
        </group>
    )
}

function Fence1(props) {
    const { nodes } = useGLTF("./Models/Fence1.glb");

    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                scale={nodes.Cube031.scale}
                rotation={nodes.Cube031.rotation}
                position={nodes.Cube031.position}
                geometry={nodes.Cube031.geometry}
            >
                <meshStandardMaterial color={'#F3D393'} />
            </mesh>
            <mesh
                castShadow
                scale={nodes.Cube032.scale}
                rotation={nodes.Cube031.rotation}
                position={nodes.Cube032.position}
                geometry={nodes.Cube032.geometry}
            >
                <meshStandardMaterial color={'#F3D393'} />
            </mesh>
        </group>
    )
}

function Fence2(props) {
    const { scene, nodes } = useGLTF("./Models/Fence2.glb");

    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                scale={nodes.Cube027.scale}
                rotation={nodes.Cube027.rotation}
                position={nodes.Cube027.position}
                geometry={nodes.Cube027.geometry}
            >
                <meshStandardMaterial color={'#F3D393'} />
            </mesh>
            <mesh
                castShadow
                scale={nodes.Cube028.scale}
                rotation={nodes.Cube028.rotation}
                position={nodes.Cube028.position}
                geometry={nodes.Cube028.geometry}
            >
                <meshStandardMaterial color={'#F3D393'} />
            </mesh>
        </group>
    )
}

function Tree(props) {
    const { scene, nodes } = useGLTF("./Models/Tree.glb");

    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                scale={nodes.Cylinder001.scale}
                position={nodes.Cylinder001.position}
                geometry={nodes.Cylinder001.geometry}
            >
                <meshStandardMaterial color={'#F3D393'} />
            </mesh>
        </group>
    )
}

function CameraAnimation() {
    // This one makes the camera move in and out
    useFrame(({ clock, camera }) => {
        camera.position.x = Math.abs(2 * Math.cos(clock.getElapsedTime() * 0.05));
        camera.position.z = -Math.abs(2 * Math.sin(clock.getElapsedTime() * 0.05));
    })
    return null
}

export default function TitleHouse() {

    return (
        <Suspense fallback={"Loading"}>
            <Canvas shadows camera={{ position: [4, 2, -2], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight
                    castShadow
                    position={[2.5, 8, 5]}
                    intensity={0.8}
                    shadow-mapSize-width={1024}
                    shadow-mapSize-height={1024}
                    shadow-camera-far={50}
                    shadow-camera-left={-10}
                    shadow-camera-right={10}
                    shadow-camera-top={10}
                    shadow-camera-bottom={-10}
                />
                <group position={[0, -0.5, 0]}>
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
                        <planeBufferGeometry attach="geometry" args={[100, 100]} />
                        <shadowMaterial attach="material" transparent opacity={0.4} />
                    </mesh>
                    <House position={[0, -0.5, 0]} />
                    <MailBox position={[0.5, -0.2, -0.8]} />
                    <Tree position={[0, -0.25, 0]} scale={[1, 1, 1]} />
                    <Tree position={[1, -0.2, 0.1]} scale={[1, 1.2, 1]} />
                    <Tree position={[2.3, -0.3, 0.1]} scale={[1, 0.8, 1]} />
                    <Tree position={[2.5, -0.25, -0.8]} scale={[1, 1, 1]} />
                    <Tree position={[2.7, -0.3, -2]} scale={[1, 0.8, 1]} />
                    <Tree position={[0.5, -0.3, -5]} scale={[1, 0.8, 1]} />
                    <Tree position={[0, -0.4, -5.4]} scale={[1, 0.6, 1]} />
                    <Tree position={[-2, -0.33, -5.4]} scale={[1, 0.8, 1]} />
                    <Tree position={[-3, -0.25, -5.4]} scale={[1, 1, 1]} />
                    <Tree position={[-2, -0.3, -3.4]} scale={[1, 0.8, 1]} />
                    <Tree position={[-3, -0.25, -3.6]} scale={[1, 1, 1]} />
                    <Tree position={[-1, -0.25, -6.5]} scale={[1, 1, 1]} />
                    <Rock position={[-0.4, -0.43, 4]} scale={1} rotation={[0, 0, 0]} />
                    <Rock position={[-0.4, -0.41, 3.6]} scale={1.5} rotation={[0, 0.5, 0]} />
                    <Rock position={[-0.1, -0.45, 2.4]} scale={0.8} rotation={[0, 0.2, 0]} />
                    <Rock position={[-0.3, -0.43, 2.4]} scale={1} rotation={[0, 0.1, 0]} />
                    <Rock position={[1.4, -0.46, 2]} scale={0.7} rotation={[0, 0.7, 0]} />
                    <Rock position={[0, -0.43, 1.4]} scale={1} rotation={[0, 0, 0]} />
                    <Rock position={[-1.6, -0.43, -0.6]} scale={1} rotation={[0, 0.9, 0]} />
                    <Rock position={[-1.8, -0.48, -0.7]} scale={0.6} rotation={[0, 0.1, 0]} />
                    <Rock position={[-0.2, -0.43, -1.5]} scale={1} rotation={[0, 0.5, 0]} />
                    <Rock position={[0, -0.46, -1.5]} scale={0.5} rotation={[0, 0, 0]} />
                    <Rock position={[-2.6, -0.43, -1.5]} scale={1} rotation={[0, 0.2, 0]} />
                    <Fence1 position={[0, -0.42, 0]} />
                    <Fence1 position={[-3, -0.42, -1.5]} />
                    <Fence2 position={[0, -0.42, 0]} />
                    <Fence2 position={[0, -0.42, 3]} />
                </group>
                <CameraAnimation />
            </Canvas>
        </Suspense>
    );
};