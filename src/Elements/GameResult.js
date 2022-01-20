import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber';
import { useGLTF, useAnimations, OrbitControls } from "@react-three/drei";
import styled from 'styled-components';
import Color from "../Constants/Color";

import Store from '../Utils/Store';
import Button from '../Utils/Button';
import StarScore from '../Utils/StarScore';
import Money from '../Utils/Money'
import HeaderText from '../Utils/HeaderText';
import { addCoin, getLatestScore } from '../Utils/LocalStorage';
import Buildings from '../Constants/Buildings';

import CoinImage from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-12.png';
import nextButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_NEW-33.png';
import retyrButton from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_NEW-34.png';
import resultBox from '../Assets/Images/QUIZ_BOX.png';
import failureResultBox from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-14.png';


/**
 * クリア後のリザルト画面を表示させるコンポーネントです
 * @param {(callback: () => void)} keyhandler リトライボタンを押した時のコールバック
 * @param {boolean} isClear ゲームをクリアしたかどうか
 * @param {boolean} getCoin 星１つあたりの獲得できるコイン枚数
 * @param {boolean} stageName ステージの名前
 * @param {boolean} tipsText ゲームオーバー画面に表示させるヒントのテキスト
 */
const GameResult = ({ keyhandler, isClear, getCoin, stageName, tipsText }) => {

    const resultText = isClear ? 'Game Clear' : 'Game Over';
    const [score, setScore] = useState([false, false, false]);

    // 最初の一回だけ実行する
    useEffect(() => {
        if (isClear == true) {
            const score = getLatestScore(Buildings.house.id);
            const totalCoin = getCoin * score.filter((s) => { return s === true }).length;
            addCoin(totalCoin);
            setScore(score);
        }
    }, []);

    return (
        <>
            <HeaderText text={resultText} />
            <Money />
            {isClear &&
                <>
                    <Result >
                        <StarScore
                            width={'8vw'}
                            star1={score[0]}
                            star2={score[1]}
                            star3={score[2]}
                        />
                        {'SURVIVED!!'}
                        <ObtainedCoinNumber>
                            {'+' + (getCoin * score.filter((s) => { return s === true }).length).toLocaleString()}
                        </ObtainedCoinNumber>
                    </Result>
                    <ButtonDiv>
                        <Button
                            handler={keyhandler}
                            src={retyrButton}
                            width={'15vw'}
                            height={'15vw'}
                            margin={'0'}
                        />
                        <Button
                            handler={() => Store.setScene('select')}
                            src={nextButton}
                            width={'15vw'}
                            height={'15vw'}
                            margin={'0'}
                        />
                    </ButtonDiv>
                </>
            }
            {!isClear &&
                <>
                    <FailureResult >
                        {tipsText}
                    </FailureResult>
                    <ButtonDiv>
                        <Button
                            handler={keyhandler}
                            src={retyrButton}
                            width={'15vw'}
                            height={'15vw'}
                            margin={'0'}
                        />
                        <Button
                            handler={() => Store.setScene('select')}
                            src={nextButton}
                            width={'15vw'}
                            height={'15vw'}
                            margin={'0'}
                        />
                    </ButtonDiv>
                </>
            }
            <ClearModelComponent isClear={isClear} stageName={stageName} />
        </>
    );
}

/**
    * クリア後に表示する3Dモデルです
    */
const ClearModelComponent = ({ isClear, stageName }) => {

    return (
        <Canvas camera={{ position: [1.3, 1.5, 1.5], fov: 45 }}>
            <OrbitControls />
            <ambientLight intensity={0.2} />
            <directionalLight position={[2, 4, 2]} intensity={0.8} />
            {isClear ? <ClearPlayer /> : <GameOverPlayer />}
            <Stage stageName={stageName} />
        </Canvas>
    );
}

const GameOverPlayer = () => {
    // 3Dモデルの読み込み
    const { scene, animations } = useGLTF("./Models/Result/RobotExpressive1.glb");
    // アニメーションの抽出
    const { ref, actions } = useAnimations(animations);

    // アニメーションの再生
    useEffect(() => {
        actions['Death'].reset().play();
    }, []);

    return (
        <primitive
            ref={ref}
            position={[0, 0, 0]}
            object={scene}
            scale={0.2}
        />
    );
}

const ClearPlayer = () => {
    // 3Dモデルの読み込み
    const { scene, animations } = useGLTF("./Models/Result/RobotExpressive2.glb");
    // アニメーションの抽出
    const { ref, actions } = useAnimations(animations);

    // アニメーションの再生
    useEffect(() => {
        actions['ThumbsUp'].reset().play();
    }, []);

    return (
        <primitive
            ref={ref}
            position={[0, 0, 0]}
            object={scene}
            scale={0.2}
        />
    );
}

const Stage = ({ stageName }) => {
    // 3Dモデルの読み込み
    const { scene } = useGLTF("./Models/Result/" + stageName + ".glb");

    var position;
    var rotation;
    var scale;
    switch (stageName) {
        case Buildings.house.name:
            position = [-1.5, -0.5, 2];
            rotation = [0, 0, 0];
            scale = 1;
            break;
        case Buildings.tallBuilding.name:
            position = [-1.5, -0.5, 0];
            rotation = [0, 0, 0];
            scale = 1;
            break;
        case Buildings.elevator.name:
            position = [0, 2.15, -0.2];
            rotation = [0, -Math.PI / 2, 0];
            scale = 0.6;
            break;
        default:
            break;
    }

    return (
        <primitive
            position={position}
            rotation={rotation}
            object={scene}
            scale={scale}
        />
    );
}

export default GameResult;

const Result = styled.div`
    display:flex;
    position: absolute;

    width: 40vw;
    height: 20vw;

    left: 0;
    right: 0;
    top: 40%;
    bottom: 10%;
    margin: auto;

    user-select: none;
    user-drag: none;

    background-image: url(${resultBox});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;

    opacity: 1;
    z-index: 500;

    align-items: center;
    justify-content: center;
    flex-direction: column;

    font-size: 4vw;
    text-align: center;
    color: ${Color.slightlyGrayishYellow};
    font-weight: bold;
`;

const ObtainedCoinNumber = styled.div`
    display: flex;
    
    font-size: 2vw;
    text-align: center;
    color: ${Color.slightlyGrayishYellow};
    font-weight: bold;
    
    user-select: none;
    user-drag: none;

    z-index: 999;

    &::before{
        content: "";
        display: inline-block;
        background: url(${CoinImage});
        background-position: center center;
        background-repeat: no-repeat;
        background-size: contain;
        width: 2.5vw;
        height: 2.5vw;
        margin-right: 1vw;
        vertical-align: middle;
    }
`;

const ButtonDiv = styled.div`
    display:flex;
    position: absolute;

    width: 38vw;
    height: 20vw;

    left: 0;
    right: 0;
    top: 80%;
    bottom: 0;
    margin: auto;

    user-select: none;
    user-drag: none;

    opacity: 1;
    z-index: 500;

    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const FailureResult = styled.div`
    display:flex;
    position: absolute;

    width: 40vw;
    height: 20vw;

    left: 0;
    right: 0;
    top: 40%;
    bottom: 10%;
    margin: auto;

    
    padding-top: 15vw;
    padding-left: 3vw;
    padding-right: 11vw;


    user-select: none;
    user-drag: none;

    background-image: url(${failureResultBox});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;

    opacity: 1;
    z-index: 500;

    align-items: center;
    justify-content: center;
    flex-direction: column;

    font-size: 1.5vw;
    overflow-wrap: break-word;
    align-items: flex-start;
    justify-content: flex-start;
    color: ${Color.slightlyGrayishYellow};
`;