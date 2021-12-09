import React, { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from '@react-three/fiber';
import { Plane, Stage, useGLTF, OrbitControls } from "@react-three/drei";

import colors from '../Constants/Color';

function Box(props) {
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
            ref={ref}
            scale={clicked ? 1.5 : 1}
            onClick={(event) => click(!clicked)}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
}

function BuildingGroup(props) {

    // 半径
    const radius = 7;
    // 間隔（角度）
    const angle = 2 * Math.PI / 5

    return (
        <group>
            <Box position={[-5,0,0]}/>
            <Room position={[0,0,0]} />
            <Box position={[5,0,0]}/>
        </group>
    )
}

function Floor(props) {

    return (
        <group>
            <Plane
                castShadow
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -1, 0]}
                args={[1000, 1000]}
            >
                <meshStandardMaterial attach="material" color={colors.grayishYellowGreen} />
            </Plane>
        </group>
    )
}

function Room(props) {
    const { scene } = useGLTF('./Models/Room.glb');

    const ref = useRef();

    // hoveredおよびclickedイベントの状態を保持する
    const [hovered, hover] = useState(false);
    const [clicked, click] = useState(false);

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
            ref={ref}
            object={scene}
            scale={clicked ? 0.5 : 0.3}
            onClick={(event) => click(!clicked)}
        />
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

export default function SelectBuilding() {

    return (
        <Suspense fallback={null}>
            <Canvas colorManagement shadowMap camera={{ position: [4, 3, -3], fov: 45 }}>
                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />

                <ambientLight intensity={0.8} />
                <axesHelper scale={5} />
                <BuildingGroup />
            </Canvas>
        </Suspense>
    );
};