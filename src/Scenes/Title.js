import React, { useRef, useState } from 'react'
import {useFrame}  from '@react-three/fiber'
import { ContactShadows, Environment, useGLTF, OrbitControls } from "@react-three/drei"

import Store from '../Utils/Store';
import { Game_Canvas, Block_Column, Canvas_Three } from '../Utils/GlobalStyles';
import Button from '../Utils/Button';

import playButton from '../Assets/Images/ENTER_PLAY.png';
import optionButton from '../Assets/Images/ENTER_OPTION.png';

function Box(props) {
    // この参照により、THREE.Meshオブジェクトに直接アクセスできます
    const ref = useRef();

    // hoveredおよびclickedイベントの状態を保持する
    const [hovered, hover] = useState(false);
    const [clicked, click] = useState(false);

    // このコンポーネントをレンダリングループに登録し、フレームごとにメッシュを回転させる
    useFrame((state, delta) => (ref.current.rotation.x += 0.01));

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

export default function Title() {
    
    return (
        <Game_Canvas>
            <Block_Column>
                <Button
                    handler={() => Store.setScene('select')}
                    src={playButton}
                    width={'200px'}
                    height={'80px'}
                />
                <Button
                    handler={() => Store.setScene('option')}
                    src={optionButton}
                    width={'200px'}
                    height={'80px'}
                />
            </Block_Column>
            <Canvas_Three>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                <Box position={[-1.2, 0, 0]} />
                <Box position={[1.2, 0, 0]} />
            </Canvas_Three>
        </Game_Canvas>
    );
}

