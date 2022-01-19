
import React, { useState, useEffect, useMemo } from "react";
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations } from "@react-three/drei";
import { useSphere } from '@react-three/cannon'
import * as THREE from 'three';

useGLTF.preload("./Models/RobotExpressive.glb");

/**
 * ゲーム画面で使用するキャラクターを表示します
 * @param {{x: number, y:number}} dragPos 仮想パッドのXY座標
 * @param {number} playerAngle プレイヤーの向き(ラジアン)
 * @param {boolean} isMove プレイヤーが動いているかどうか
 * @param {boolean} isLighting ライトを点灯させるかどうか
 * @param {(callback: (value: Vector3) => void)} playerPositionCallback プレイヤーの座標を返すコールバック
 */
export default function Player({ dragPos, playerAngle, isMove, isLighting, playerPositionCallback, initPosition }) {

    // キャラクターのモデルの読み込み
    const { scene, nodes, animations } = useGLTF("./Models/RobotExpressive.glb");
    // ライトの読み込み
    const light = useMemo(() => new THREE.SpotLight(0xffffff), []);

    // 現在のアニメーション
    const [action, setAction] = useState('Walking');

    // 当たり判定の設定
    const [physicsRef, api] = useSphere(() => ({
        args: [0.4], // 大きさ
        position: initPosition, // 座標
        mass: 1, // 重さ
        material: { friction: 0 }, // 材質 {摩擦：0に設定 }
        fixedRotation: true, // 回転を固定
        type: 'Dynamic', // 物理演算のタイプ
    }));

    // アニメーションの抽出
    const { ref, actions } = useAnimations(animations);

    // 影の設定(<primitive/>のみここで設定する)
    useMemo(() => Object.values(nodes).forEach(obj =>
        obj.isMesh && Object.assign(obj, {
            castShadow: true,
            receiveShadow: true
        })
    ), [nodes]);

    // isMoveが切り替わった時のみ実行する
    useEffect(() => {
        const actionName = isMove ? 'Walking' : 'Idle';
        changeAction(actionName);
    }, [isMove]);

    // アクションの切り替え
    const changeAction = (nextAction) => {
        actions[action].fadeOut(0.5);
        setAction(nextAction);
        actions[nextAction].reset().fadeIn(0.5).play();
    };

    const { camera } = useThree();
    // 毎フレーム実行する関数
    useFrame(() => {
        // プレイヤーに速度を与える
        api.velocity.set(dragPos.x, 0, -dragPos.y);
        // カメラのをプレイヤーに合わせる
        physicsRef.current.getWorldPosition(camera.position);
        // プレイヤーの座標を格納
        playerPositionCallback(camera.position);
        camera.position.y = 10;
    });

    return (
        <group ref={physicsRef} dispose={null}>
            <primitive
                ref={ref}
                position={[0, -0.5, 0]}
                rotation={[0, playerAngle, 0]}
                object={scene}
                scale={0.2}
            />
            {isLighting && (
                <>
                    <primitive
                        object={light}
                        position={[0, 2, 0]}
                        intensity={1}
                        angle={0.4}
                        penumbra={0.5}
                        castShadow
                    />
                    <primitive
                        object={light.target}
                        position={[Math.sin(playerAngle), 0, Math.cos(playerAngle)]}
                    />
                </>
            )}
        </group>
    );
}