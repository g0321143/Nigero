
import React, { useState, useEffect, useMemo } from "react";
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from "@react-three/drei";
import { useSphere } from '@react-three/cannon'

useGLTF.preload("./Models/RobotExpressive.glb");

/**
 * ゲーム画面で使用するキャラクターを表示します
 * @param {{x: number, y:number}} dragPos 仮想パッドのXY座標
 * @param {number} playerAngle プレイヤーの向き(ラジアン)
 * @param {boolean} isMove プレイヤーが動いているかどうか
 * @param {(callback: (value: Triplet) => void)} playerPositionCallback プレイヤーの座標を返すコールバック
 */
export default function Player(props) {

    // キャラクターのモデルの読み込み
    const { scene, nodes, animations } = useGLTF("./Models/RobotExpressive.glb");

    // 現在のアニメーション
    const [action, setAction] = useState('Walking');

    // 当たり判定の設定
    const [physicsRef, api] = useSphere(() => ({
        args: [0.4, 0.4, 0.4], // 大きさ
        position: [0, 0.4, 0], // 座標
        mass: 100, // 重さ
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

    // props.isMoveが切り替わった時のみ実行する
    useEffect(() => {
        const actionName = props.isMove ? 'Walking' : 'Idle';
        changeAction(actionName);
    }, [props.isMove])

    // アクションの切り替え
    const changeAction = (nextAction) => {
        actions[action].fadeOut(0.5);
        setAction(nextAction);
        actions[nextAction].reset().fadeIn(0.5).play();
    }

    // 毎フレーム実行する関数
    useFrame(() => {
        // プレイヤーに速度を与える
        api.velocity.set(props.dragPos.x, 0, -props.dragPos.y);
        // 現在の座標を格納
        api.position.subscribe(v => {
            props.playerPositionCallback(v);
        });
    });

    return (
        <group ref={physicsRef} dispose={null}>
            <primitive
                ref={ref}
                position={[0, -0.5, 0]}
                rotation={[0, props.playerAngle, 0]}
                object={scene}
                scale={0.2}
            />
        </group>
    );
}