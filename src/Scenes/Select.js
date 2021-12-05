import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

import store from '../Store';
import { Game, Block_Right, Block_Left_End, Block_Left_Top, Canvas } from '../GlobalStyles';
import Button from '../Components/Button';

import backButton from '../Assets/Images/GO_BACKWARD.png';
import hintButton from '../Assets/Images/HINT_ICON.png';
import homeButton from '../Assets/Images/HOME_ICON.png';
import shopButton from '../Assets/Images/ITEM_SHOP.png';
import playButton from '../Assets/Images/PLAY_ICON.png';

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

export default function Select() {

    return (
        <Game>
            <Block_Right>
                <Button
                    handler={() => store.setScene('select')}
                    src={playButton}
                    width={'80px'}
                    height={'80px'}
                />
                <Button
                    handler={() => store.setScene('title')}
                    src={backButton}
                    width={'80px'}
                    height={'80px'}
                />
            </Block_Right>
            <Block_Left_End>
                <Button
                    handler={() => store.setScene('select')}
                    src={homeButton}
                    width={'80px'}
                    height={'80px'}
                />
                <Button
                    handler={() => store.setScene('select')}
                    src={shopButton}
                    width={'80px'}
                    height={'80px'}
                />
            </Block_Left_End>
            <Block_Left_Top>
                <Button
                    handler={() => store.setPage('select')}
                    src={hintButton}
                    width={'80px'}
                    height={'80px'}
                />
            </Block_Left_Top>
            <Canvas>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                <Box position={[-1.2, 0, 0]} />
                <Box position={[1.2, 0, 0]} />
            </Canvas>
        </Game>
    );
}

