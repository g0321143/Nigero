import React, { useRef, useState } from 'react'
import { useFrame, Canvas } from '@react-three/fiber'
import { Stage, PerspectiveCamera, useGLTF, OrbitControls } from "@react-three/drei";

import Store from '../Utils/Store';
import { Game_Canvas, Block_Column } from '../Utils/GlobalStyles';
import Button from '../Utils/Button';
import TitleHouse from '../Elements/TitleHouse';

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

    //const { scene } = useGLTF("../Assets/Models/House.glb");

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
                    width={'30%'}
                    height={'15%'}
                />
                <Button
                    handler={() => Store.setScene('option')}
                    src={optionButton}
                    width={'30%'}
                    height={'15%'}
                />
            </Block_Column>
            <TitleHouse />
        </Game_Canvas>
    );
}

