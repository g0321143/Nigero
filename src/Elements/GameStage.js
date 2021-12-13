import React, { Suspense } from "react";
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls } from "@react-three/drei";

useGLTF.preload("./Models/Overall.glb");

function Model({ url, ...props }) {
    const { scene } = useGLTF(url)
    // useGLTF is async, but by the time it returns the data is present.
    // Next time it is called with the same cache key (url)
    // it returns immediately because suspense and caching are the same.
    return <primitive object={scene} {...props} />
}


function Player(props) {
    const { scene } = useGLTF('./Models/RobotExpressive.glb');

    return (
        <primitive
            object={scene}
            scale={0.3}
        />
    );
}


export default function TitleHouse() {

    return (
        <Suspense fallback={null}>
            <Canvas shadowMap camera={{ position: [-3, 2, 5], fov: 45 }}>
                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                <ambientLight intensity={0.1} />
                <fog attach="fog" args={["white", 0, 40]} />
                <directionalLight
                    intensity={0.5}
                    castShadow
                    shadow-mapSize-height={512}
                    shadow-mapSize-width={512}
                />
                <Model position={[-3, -1, -2]} rotation={[1, -0.3, 0.55]} scale={[1, 1, 1]} url="./Models/Overall.glb" />
                <Player />
            </Canvas>
        </Suspense>
    );
};