import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Plane, PerspectiveCamera, useGLTF, OrbitControls } from "@react-three/drei";

import colors from '../Constants/Color';
//url = "/models/0.Overall.glb";
useGLTF.preload("./Models/House.glb");

function Floor(props) {

    const boxRef = useRef();
    useFrame(() => {
        boxRef.current.rotation.y += 0.004;
        boxRef.current.rotation.x += 0.004;
        boxRef.current.rotation.z += 0.004;
    });

    return (
        <group>
            <Box castShadow receiveShadow ref={boxRef} position={[0, 0.5, 0]}>
                <meshStandardMaterial attach="material" color="white" />
            </Box>
            <Plane
            castShadow
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -1, 0]}
                args={[1000, 1000]}
            >
                <meshStandardMaterial attach="material" color="white" />
            </Plane>
        </group>
    )
}

function House(props) {
    const { scene } = useGLTF("./Models/House.glb");

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
                <fog attach="fog" args={["white", 0, 40]} />
                <directionalLight
                    intensity={0.5}
                    castShadow
                    shadow-mapSize-height={512}
                    shadow-mapSize-width={512}
                /><Floor />
                <House position={[0, 0, 0]} />
            </Canvas>
        </Suspense>
    );
};
