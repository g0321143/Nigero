import React, { useRef, useState, useEffect  } from 'react'
import {useFrame}  from '@react-three/fiber'

import Store from '../Utils/Store';
import { Game_Canvas, Block_Right_End, Block_Column_End, Block_Column_Top, Block_Left_End, Block_Left_Top } from '../Utils/GlobalStyles';
import Button from '../Utils/Button';
import Score from '../Utils/Score';

import backButton from '../Assets/Images/GO_BACKWARD.png';

import Coin from '../Utils/Coin'
import GameStage from '../Elements/GameStage';


function Clear(){
    return(
        <group>
            <Coin/>
            <Block_Column_End>
            <Score
                    width={'200px'}
                    height={'200px'}
                    star1={true}
                    star2={true}
                    star3={true}
                />
            </Block_Column_End>
        </group>
    );
}
/*******    ココ↓の引数がNaNになります．．．    *******/
function Playing({time}){
    
    return(
        <Block_Column_Top>
                {time/1000}
        </Block_Column_Top>
    );
}

function timecount({time}){
    time -= 1
    const timeoutId = setTimeout(timecount, 1000);
    if(time < 0){
      clearTimeout(timeoutId);  //timeoutIdをclearTimeoutで指定している
    }

}

//★ 関数 getRemainTime の定義

function GetRemainTime({time}){

    //★ 今現在の Date オブジェクトを作成
    var nowDate = new Date()
    //★ 残りミリ秒数を取得
    var ms = 5000 - (nowDate.getTime()-time);

    const countUp = () => {
        //★ 今現在の Date オブジェクトを作成
        var nowDate = new Date()
        //★ 残りミリ秒数を取得
        var ms = 5000 - (nowDate.getTime()-time);
        const timeoutId = setTimeout(countUp, 1000);
        if(ms < 0){
            clearTimeout(timeoutId);    //timeoutIdをclearTimeoutで指定している
        }
    }
    countUp();
   
  
    //★ 残り秒数がなくなれば
    if(ms <= 0){
        return(
            <group>
                <Coin/>
                <Block_Column_End>
                <Score
                        width={'200px'}
                        height={'200px'}
                        star1={true}
                        star2={true}
                        star3={true}
                    />
                </Block_Column_End>
            </group>
        );
    }

    return(
        <Block_Column_Top>
                {ms}
        </Block_Column_Top>
        
    );

}

function animate({timing, draw, duration}) {

    let start = performance.now();
  
    requestAnimationFrame(function animate(time) {
      // timeFraction は 0 から 1 になります
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;
  
      // 現在のアニメーションの状態を計算します
      let progress = timing(timeFraction)
  
      draw(progress); // 描画します
  
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
  
    });
}


export default function Game() {
    const [flag, setflag] = useState(true);
    var nowDate = new Date()
    const [count, settime] = useState(nowDate.getTime());

    return (
        <Game_Canvas>
            <GetRemainTime time = {count}/>
            <Block_Right_End>
                <Button
                    handler={() => Store.setScene('select')}
                    src={backButton}
                    width={'6%'}
                    height={'10%'}
                    margin={'1%'}
                />
            </Block_Right_End>
            <GameStage />
            
        </Game_Canvas>
    );
}
