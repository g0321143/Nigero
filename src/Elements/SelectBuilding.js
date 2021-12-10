import React, { Suspense, useRef, forwardRef, useState } from "react";
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls } from "@react-three/drei";
import { gsap, Linear } from "gsap";

import { ArrowRight, ArrowLeft } from '../Utils/ArrowStyles';

const Box = forwardRef((props, fref) =>  {
    // この参照により、THREE.Meshオブジェクトに直接アクセスできます
    const ref = useRef();

    // hoveredおよびclickedイベントの状態を保持する
    const [hovered, hover] = useState(false);
    const [clicked, click] = useState(false);

    // このコンポーネントをレンダリングループに登録し、フレームごとにメッシュを回転させる
    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime();
        ref.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20;
        ref.current.rotation.x = Math.cos(t / 4) / 8;
        ref.current.rotation.y = Math.sin(t / 4) / 8;
        ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
    });

    // ビューを返すと、これらは通常のThreejsの要素をJSXで表現したものです。
    return (
        <mesh
            {...props}
            ref={fref, ref}
            scale={clicked ? 1.5 : 1}
            onClick={(event) => click(!clicked)}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
});

const Room = forwardRef((props, fref) =>  {
    const { scene } = useGLTF('./Models/Room.glb');

    const ref = useRef();

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime();
        ref.current.rotation.z = -0.2 - (1 + Math.sin(t / 1.5)) / 20;
        ref.current.rotation.x = Math.cos(t / 4) / 8;
        ref.current.rotation.y = Math.sin(t / 4) / 8;
        ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
    });


    return (
        <primitive
            {...props}
            ref={fref, ref}
            object={scene}
            scale={0.3}
        />
    )
});


export default function SelectBuilding(props){

    const BUILDING_MAX = 3;
    const BUILDING_MIN = 1;

    const buildingsRef = useRef();
    const building1Ref = useRef();
    const roomRef = useRef();
    const building3Ref = useRef();

    const [building, setBuilding] = useState(1);
    
    console.log(building);

    const changeBuilding = () => {
        gsap.to(buildingsRef.current.position,
            { x: building * 5, ease: Linear.easeOut }).duration(0.5);
    };

    return (
        <Suspense fallback={null}>
            <ArrowRight handler={() => {
                setBuilding(Math.min((building + 1), BUILDING_MAX));
                changeBuilding();
            }} />
           <ArrowLeft handler={() => {
                setBuilding(Math.max((building - 1), BUILDING_MIN));
                changeBuilding();
            }} />
            <Canvas camera={{ position: [0, 5, -5], fov: 90 }}>
                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />

                <ambientLight intensity={0.8} />
                <axesHelper scale={5} />
                <group ref={buildingsRef} position={[0, 2, 0]}>
                    <Box fref={building1Ref} position={[-5, 0, 0]} />
                    <Room fref={roomRef} position={[-1.5, 0, 0]} />
                    <Box fref={building3Ref} position={[5, 0, 0]} />
                </group>
            </Canvas>
        </Suspense>
    );
}

