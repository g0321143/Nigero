import React, { useRef } from 'react'
import styled from 'styled-components'

import inventoryImage from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-27.png';

/**
 * アイテム欄（インベントリ）を表示します
 * 引数に表示したいアイテムの<img />タグの配列を入れると，
 * 自動でアイテム欄に並べられます  
 * @param {<img />の配列}  items
 */
const Inventory = ({ items }) => {

    // Reactではタグをfor文などで並べる時に，特有のkey設定をしないとエラーになります
    // [a-v]と[0-9]の間でランダムな文字列を生成
    const randomStr = () => Math.random().toString(32).substring(2);
    // タブのIDを格納する配列
    const randomId = useRef([]);
    // レンダリングされた回数
    const renderCount = useRef(0);
    // 要素を追加
    if (renderCount.current === 0) {
        for (let i = 0, len = items.length; i < len; i++) {
            randomId.current.push(`inventory-${randomStr()}`);
        }
        renderCount.current++;
    }

    return (
        <InventorySC>
            <div>
                {items.map((item, index) => (
                    <div
                        key={randomId.current[index]}
                    >
                        {item}
                    </div>
                ))}
            </div>
        </InventorySC>
    )
};

const InventorySC = styled.div`
    display:flex;
    position: absolute;

    width: 20vw;
    height: 32vw;

    top 20%;
    right 2%;

    justify-content: center;

    background-image: url(${inventoryImage});
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    opacity: 0.9;

    z-index: 500;

    user-select: none;
    user-drag: none;

    :hover {
        opacity: 1;
    }

    div {
        display:flex;

        width: 85%;
        height: 75%;

        padding-top 30%;
        
        flex-direction: row;
        flex-wrap: wrap;
        align-content: flex-start;
        justify-content: flex-start;

        div {
            all: initial;
        }
    }

    img {
        margin-top 1vw;
        margin-left: 1vw;
        margin-right: 0.5vw;
        margin-bottom: 0vw;
        object-fit: cover;
        width: 7vw;
        height: 7vw;
        user-select: none;
        user-drag: none;

        :hover {
            cursor: pointer;
            opacity: 1;
        }
    }
    
`;

export default Inventory