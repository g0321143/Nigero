import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

import { Block_Column, Canvas } from '../GlobalStyles';
import Button from '../Components/Button';

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

    const [scene, setScene] = useState('title');
    console.log(scene);

    return (
        <>
            <Block_Column>
                <Button
                    handler={() => setScene('select')}
                    src={playButton}
                    width={'300px'}
                    height={'80px'}
                />
                <Button
                    handler={() => setScene('option')}
                    src={optionButton}
                    width={'300px'}
                    height={'80px'}
                />
            </Block_Column>
            <Canvas>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                <Box position={[-1.2, 0, 0]} />
                <Box position={[1.2, 0, 0]} />
            </Canvas>
        </>
    );
}

