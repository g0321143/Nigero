import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Stage, PerspectiveCamera, useGLTF, OrbitControls } from "@react-three/drei";

import colors from '../Constants/Color';

useGLTF.preload('./Models/House.glb');

function House(props) {
    const { scene, nodes } = useGLTF('./Models/House.glb');

    let house = [];

    scene.traverse((object) => {
        if (object.isMesh) {
            if (object.name == "Cylinder011" || object.name == "Cube039_2" || object.name == "Cube041_2" ||
                object.name == "Cylinder012" || object.name == "Cube036_1" || object.name == "Cube026_1") {
                house.push(
                    <mesh
                        receiveShadow={true}
                        rotation={object.rotation}
                        scale={object.scale}
                        position={object.position}
                        geometry={object.geometry}
                    >
                        <meshStandardMaterial color={'white'} />
                    </mesh>
                );
            } else {
                house.push(
                    <mesh
                        receiveShadow={true}
                        rotation={object.rotation}
                        scale={object.scale}
                        position={object.position}
                        geometry={object.geometry}
                    >
                        <meshStandardMaterial color={'#F3D393'} />
                    </mesh>
                );
            }
        }
    });


    return (
        <primitive object={scene} scale={1} position={props.position} />
    )
}


function Rock(props) {
    const { scene, nodes } = useGLTF("./Models/Rock.glb");

    return (
        <group {...props} dispose={null}>
            <mesh
                receiveShadow={true}
                scale={nodes.Cube014.scale}
                geometry={nodes.Cube014.geometry}
            >
                <meshStandardMaterial color={'#F3D393'} />
            </mesh>
        </group>
    )
}

function Fence1(props) {
    const { scene, nodes } = useGLTF("./Models/Fence1.glb");
    scene.traverse((object) => {
        if (object.isMesh) {
            console.log(object.name);
        }
    });

    return (
        <group {...props} dispose={null}>
            <mesh
                receiveShadow={true}
                scale={nodes.Cube031.scale}
                position={nodes.Cube031.position}
                geometry={nodes.Cube031.geometry}
            >
                <meshStandardMaterial color={'#F3D393'} />
            </mesh>
            <mesh
                receiveShadow={true}
                scale={nodes.Cube032.scale}
                position={nodes.Cube032.position}
                geometry={nodes.Cube032.geometry}
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
                receiveShadow={true}
                scale={nodes.Cylinder001.scale}
                geometry={nodes.Cylinder001.geometry}
            >
                <meshStandardMaterial color={'#F3D393'} />
            </mesh>
        </group>
    )
}

export default function TitleHouse() {

    return (
        <Canvas>
            <Suspense fallback={null}>
                <PerspectiveCamera makeDefault />
                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                <Stage>
                    <House position={[0, 0, 0]} />
                    <Tree position={[0, 1.05, 0]} />
                    <Rock position={[5, 0, 0]} />
                    <Fence1 />
                </Stage>
            </Suspense>
        </Canvas>
    );
};