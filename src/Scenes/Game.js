import React, { useRef, useState, useEffect  } from 'react'
import {useFrame}  from '@react-three/fiber'

import store from '../Store';
import { Game_Canvas, Block_Right, Canvas_Three, Block_Column } from '../GlobalStyles';
import Button from '../Components/Button';
import Score from '../Components/Score';

import { useGLTF } from '@react-three/drei'
import { Suspense } from 'react'

import backButton from '../Assets/Images/GO_BACKWARD.png';
import survivedButton from '../Assets/Images/SURVIVED.png';

/**********     変更点      ***********/
function Model({ url, ...props }) {
    const { scene } = useGLTF(url)
    // useGLTF is async, but by the time it returns the data is present.
    // Next time it is called with the same cache key (url)
    // it returns immediately because suspense and caching are the same.
    return <primitive object={scene} {...props} />
  }
/*
function Example() {
    //const [count, setCount] = useState(0);
    const count = 1;
    const time = cal_time();
  return (
    <div>
      <p>You clicked {time} times</p>
    </div>
  );
}

function sleep(waitMsec) {
    var startMsec = new Date();
   
    // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
    while (new Date() - startMsec < waitMsec);
  }

function cal_time() {
    const start = performance.now();
    sleep(5000);
    const end = performance.now();
    return (
        (end - start) / 1000
      );
}
*/
function Start(){
    const start = performance.now();
    return (start);
}
function End(start){
    const end = performance.now();
    return (
        <div>
            <p>Time is {end - start} </p>
        </div>
    );
}
function Clear(){
    return(
        <Block_Column>
            <Button
                handler={() => store.setScene('game')}
                src={survivedButton}
                width={'300px'}
                height={'80px'}
            />
        </Block_Column>
    );
}

function Playing(){
    const [time, settime] = useState(5000);

    return(
        <div>
            <p>Time is {time / 1000} </p>
        </div>
    );
}
/**********     ↑↑↑↑変更点      ***********/


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



export default function Game() {
    const [flag, setflag] = useState(true);
    return (
        <Game_Canvas>
            <h1>ゲーム画面　未実装</h1>
            <Block_Right>
                <Button
                    handler={() => store.setScene('select')}
                    src={backButton}
                    width={'80px'}
                    height={'80px'}
                />
            </Block_Right>
            
            
            
            <Canvas_Three>
                <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <pointLight position={[-10, -10, -10]} />
                    <Model position-x={1} position-y={-10} position-z={-20} scale={[1, 1, 1]} url="/models/0.Overall.glb" />
                    <Box position={[1.2, 0, 0]} />                    
                </Suspense>
            </Canvas_Three>
        {flag ? <Playing/> : <Clear/>}
        </Game_Canvas>
    );
}

