import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Stage, PerspectiveCamera, useGLTF, OrbitControls } from "@react-three/drei";

import colors from '../Constants/Color';

function House(props) {
    const { scene } = useGLTF("./Models/House.glb");
    scene.traverse((object) => {
        if (object.isMesh) {
            console.log(object.name);
        }
    });

    return (
        <>
            <primitive object={scene} />
        </>
    )
}

function Tree(props) {
    const { scene } = useGLTF("./Models/Tree.glb");
    scene.traverse((object) => {
        if (object.isMesh) {
            console.log(object.name);
        }
    });

    return (
        <>
            <primitive object={scene} scale={1} position={[2, 0, 3]}/>
        </>
    )
}

export default function TitleHouse() {

    return (
        <Canvas>
            <Suspense fallback={null}>
                <PerspectiveCamera makeDefault />
                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                <Stage>
                    <House />
                    <Tree />
                </Stage>
            </Suspense>
        </Canvas>
    );
};