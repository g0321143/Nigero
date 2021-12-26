import React, { Suspense } from "react";
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Plane } from "@react-three/drei";

import { gsap, Linear } from "gsap";

useGLTF.preload("./Models/Overall.glb");
useGLTF.preload("./Models/RobotExpressive.glb");

function Model({ url, ...props }) {
    const { scene } = useGLTF(url)
    // useGLTF is async, but by the time it returns the data is present.
    // Next time it is called with the same cache key (url)
    // it returns immediately because suspense and caching are the same.
    return <primitive object={scene} {...props} />
}


export default function HouseGameStage() {

    const { scene } = useGLTF('./Models/RobotExpressive.glb');

    var xx = 0;
    var zz = 1;

    const handleDoubleClick = (e) => {
        const p = e.point;
        var inner = xx * (p.x - scene.position.x) + zz * (p.z - scene.position.z);
        var outer = xx * (p.z - scene.position.z) - zz * (p.x - scene.position.x);
        var sqe = Math.sqrt(xx * xx + zz * zz);
        var sqv = Math.sqrt((p.x - scene.position.x) * (p.x - scene.position.x) + (p.z - scene.position.z) * (p.z - scene.position.z));
        var vcos = inner / (sqe * sqv);
      
        console.log(outer);
        xx = p.x - scene.position.x;
        zz = p.z - scene.position.z;
      
        if (outer < 0) {
            gsap.to(scene.rotation, { y: scene.rotation.y + Math.acos(vcos), ease: Linear.easeOut }).duration(0.01);
        } else {
            gsap.to(scene.rotation, { y: scene.rotation.y - Math.acos(vcos), ease: Linear.easeOut }).duration(0.01);
        }
        gsap.to(scene.position, { x: p.x, z: p.z, ease: Linear.easeOut }).duration(1);
    };

    return (
        <Suspense fallback={null}>
            <Canvas shadowMap camera={{ position: [0, 4, 0], fov: 45 }}>
                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                <ambientLight intensity={0.1} />
                <fog attach="fog" args={["white", 0, 40]} />
                <directionalLight
                    intensity={0.5}
                    castShadow
                    shadow-mapSize-height={512}
                    shadow-mapSize-width={512}
                />
                <Model position={[-3, -1, -2]} scale={[1, 1, 1]} url="./Models/Overall.glb"  onClick={handleDoubleClick} />
                <primitive object={scene} position={[0, 0, 0]} scale={0.2} />
            </Canvas>
        </Suspense>
    );
};