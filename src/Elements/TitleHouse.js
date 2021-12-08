import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Plane, PerspectiveCamera, useGLTF, OrbitControls } from "@react-three/drei";

import colors from '../Constants/Color';

useGLTF.preload('./Models/House.glb');

function Floor(props) {

    return (
        <group>
            <Plane
                castShadow
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -0.2, 0]}
                args={[1000, 1000]}
            >
                <meshStandardMaterial attach="material" color={colors.grayishYellowGreen} />
            </Plane>
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
                        receiveShadow
                        scale={object.scale}
                        position={object.position}
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
                        receiveShadow
                        scale={object.scale}
                        position={object.position}
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
                receiveShadow
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
                receiveShadow
                scale={nodes.Cube031.scale}
                rotation={nodes.Cube031.rotation}
                position={nodes.Cube031.position}
                geometry={nodes.Cube031.geometry}
            >
                <meshStandardMaterial color={'#F3D393'} />
            </mesh>
            <mesh
                castShadow
                receiveShadow
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
                receiveShadow
                scale={nodes.Cube027.scale}
                rotation={nodes.Cube027.rotation}
                position={nodes.Cube027.position}
                geometry={nodes.Cube027.geometry}
            >
                <meshStandardMaterial color={'#F3D393'} />
            </mesh>
            <mesh
                castShadow
                receiveShadow
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
                receiveShadow
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
        <Suspense fallback={null}>
            <Canvas colorManagement shadowMap camera={{ position: [-3, 2, 5], fov: 90 }}>
                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                <ambientLight intensity={0.1} />
                <spotLight
                    castShadow
                    intensity={0.5}
                    args={[0xffffff, 1, 100]}
                    position={[10, 10, 1]}
                />
                <Floor />
                <House position={[0, 0, 0]} />
                <Tree position={[0, 0.1, 0]} scale={[1, 1, 1]} />
                <Tree position={[1, 0.1, 0.1]} scale={[1, 1.2, 1]} />
                <Tree position={[2.3, 0.1, 0.1]} scale={[1, 0.8, 1]} />
                <Tree position={[2.5, 0.1, -0.8]} scale={[1, 1, 1]} />
                <Tree position={[2.7, 0.1, -2]} scale={[1, 0.8, 1]} />
                <Tree position={[0.5, 0.1, -5]} scale={[1, 0.8, 1]} />
                <Tree position={[0, 0.1, -5.4]} scale={[1, 0.6, 1]} />
                <Tree position={[-2, 0.1, -5.4]} scale={[1, 0.8, 1]} />
                <Tree position={[-3, 0.1, -5.4]} scale={[1, 1, 1]} />
                <Tree position={[-2, 0.1, -3.4]} scale={[1, 0.8, 1]} />
                <Tree position={[-3, 0.1, -3.6]} scale={[1, 1, 1]} />
                <Tree position={[-1, 0.1, -6.5]} scale={[1, 1, 1]} />
                <Rock position={[-0.4, 0, 4]} scale={1} rotation={[0, 0, 0]} />
                <Rock position={[-0.4, 0, 3.6]} scale={1.5} rotation={[0, 0.5, 0]} />
                <Rock position={[-0.1, 0, 2.4]} scale={0.8} rotation={[0, 0.2, 0]} />
                <Rock position={[-0.3, 0, 2.4]} scale={1} rotation={[0, 0.1, 0]} />
                <Rock position={[1.4, 0, 2]} scale={0.7} rotation={[0, 0.7, 0]} />
                <Rock position={[0, 0, 1.4]} scale={1} rotation={[0, 0, 0]} />
                <Rock position={[-1.6, 0, -0.6]} scale={1} rotation={[0, 0.9, 0]} />
                <Rock position={[-1.8, 0, -0.7]} scale={0.6} rotation={[0, 0.1, 0]} />
                <Rock position={[-0.2, 0, -1.5]} scale={1} rotation={[0, 0.5, 0]} />
                <Rock position={[0, 0, -1.5]} scale={0.5} rotation={[0, 0, 0]} />
                <Rock position={[-2.6, 0, -1.5]} scale={1} rotation={[0, 0.2, 0]} />
                <Fence1 position={[0, 0, 0]} />
                <Fence1 position={[-3, 0, -1.5]} />
                <Fence2 position={[0, 0, 0]} />
                <Fence2 position={[0, 0, 3]} />


            </Canvas>
        </Suspense>
    );
};