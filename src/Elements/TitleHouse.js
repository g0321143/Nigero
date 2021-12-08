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
    const { nodes } = useGLTF("./Models/Fence1.glb");

    return (
        <group {...props} dispose={null}>
            <mesh
                receiveShadow={true}
                scale={nodes.Cube031.scale}
                rotation={nodes.Cube031.rotation}
                position={nodes.Cube031.position}
                geometry={nodes.Cube031.geometry}
            >
                <meshStandardMaterial color={'#F3D393'} />
            </mesh>
            <mesh
                receiveShadow={true}
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
                receiveShadow={true}
                scale={nodes.Cube027.scale}
                rotation={nodes.Cube027.rotation}
                position={nodes.Cube027.position}
                geometry={nodes.Cube027.geometry}
            >
                <meshStandardMaterial color={'#F3D393'} />
            </mesh>
            <mesh
                receiveShadow={true}
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
                receiveShadow={true}
                scale={nodes.Cylinder001.scale}
                position={nodes.Cylinder001.position}
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
                    <Tree position={[0, 0.1, 0]} scale={[1, 1, 1]}/>
                    <Tree position={[1, 0.1, 0.1]} scale={[1, 1.2, 1]}/>
                    <Tree position={[2.3, 0.1, 0.1]} scale={[1, 0.8, 1]}/>
                    <Tree position={[2.5, 0.1, -0.8]} scale={[1, 1, 1]}/>
                    <Tree position={[2.7, 0.1, -2]} scale={[1, 0.8, 1]}/>
                    <Tree position={[0.5, 0.1, -5]} scale={[1, 0.8, 1]}/>
                    <Tree position={[0, 0.1, -5.4]} scale={[1, 0.6, 1]}/>
                    <Tree position={[-2, 0.1, -5.4]} scale={[1, 0.8, 1]}/>
                    <Tree position={[-3, 0.1, -5.4]} scale={[1, 1, 1]}/>
                    <Tree position={[-2, 0.1, -3.4]} scale={[1, 0.8, 1]}/>
                    <Tree position={[-3, 0.1, -3.6]} scale={[1, 1, 1]}/>
                    <Tree position={[-1, 0.1, -6.5]} scale={[1, 1, 1]}/>
                    <Rock position={[-0.4, 0, 4]} scale={1} rotation={[0, 0, 0]}/>
                    <Rock position={[-0.4, 0, 3.6]} scale={1.5} rotation={[0, 0.5, 0]}/>
                    <Rock position={[-0.1, 0, 2.4]} scale={0.8} rotation={[0, 0.2, 0]}/>
                    <Rock position={[-0.3, 0, 2.4]} scale={1} rotation={[0, 0.1, 0]}/>
                    <Rock position={[1.4, 0, 2]} scale={0.7} rotation={[0, 0.7, 0]}/>
                    <Rock position={[0, 0, 1.4]} scale={1} rotation={[0, 0, 0]}/>
                    <Rock position={[-1.6, 0, -0.6]} scale={1} rotation={[0, 0.9, 0]}/>
                    <Rock position={[-1.8, 0, -0.7]} scale={0.6} rotation={[0, 0.1, 0]}/>
                    <Rock position={[-0.2, 0, -1.5]} scale={1} rotation={[0, 0.5, 0]}/>
                    <Rock position={[0, 0, -1.5]} scale={0.5} rotation={[0, 0, 0]}/>
                    <Rock position={[-2.6, 0, -1.5]} scale={1} rotation={[0, 0.2, 0]}/>
                    <Fence1 position={[0, 0, 0]}/>
                    <Fence1 position={[-3, 0, -1.5]}/>
                    <Fence2 position={[0, 0, 0]}/>
                    <Fence2 position={[0, 0, 3]} />
                </Stage>
            </Suspense>
        </Canvas>
    );
};