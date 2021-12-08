import React, { useRef, useState } from 'react'
import { useFrame, Canvas } from '@react-three/fiber'

import Store from '../Utils/Store';
import { addCookie, subCookie, deleteCookie } from '../Utils/Cookie';
import { Game_Canvas, Block_Column_Top, Block_Right_End, Block_Left_End, Block_Left_Top } from '../Utils/GlobalStyles';
import Button from '../Utils/Button';
import Coin from '../Utils/Coin'
import Score from '../Utils/Score';

import backButton from '../Assets/Images/Backward.png';
import hintButton from '../Assets/Images/HintIcon.png';
import homeButton from '../Assets/Images/HomeIcon.png';
import shopButton from '../Assets/Images/ItemShop.png';
import playButton from '../Assets/Images/PlayIcon.png';

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
        <Game_Canvas>
            <Coin />
            <Block_Column_Top>
                <Score
                    width={'200px'}
                    height={'200px'}
                    star1={true}
                    star2={true}
                    star3={true}
                />
            </Block_Column_Top>
            <Block_Right_End>
                <Button
                    handler={() => Store.setScene('title')}
                    src={backButton}
                    width={'6%'}
                    height={'10%'}
                    margin={'1%'}
                />
                <Button
                    handler={() => Store.setScene('game')}
                    src={playButton}
                    width={'6%'}
                    height={'10%'}
                    margin={'1%'}
                />
            </Block_Right_End>
            <Block_Left_End>
                <Button
                    handler={() => subCookie("coin", 255)}
                    src={shopButton}
                    width={'6%'}
                    height={'10%'}
                    margin={'1%'}
                />
                <Button
                    handler={() => addCookie("coin", 256)}
                    src={homeButton}
                    width={'6%'}
                    height={'10%'}
                    margin={'1%'}
                />
            </Block_Left_End>
            <Block_Left_Top>
                <Button
                    handler={() => deleteCookie("coin")}
                    src={hintButton}
                    width={'6%'}
                    height={'10%'}
                    margin={'1%'}
                />
            </Block_Left_Top>
            <Canvas>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                <Box position={[-1.2, 0, 0]} />
                <Box position={[1.2, 0, 0]} />
            </Canvas>
        </Game_Canvas>
    );
}

