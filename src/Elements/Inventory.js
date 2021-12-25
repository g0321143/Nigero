import React from 'react'
import styled from 'styled-components'

import inventoryImage from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-27.png';

/**
 * アイテム欄（インベントリ）を表示します
 * 引数に表示したいアイテムの<img />タグの配列を入れると，
 * 自動でアイテム欄に並べられます  
 * @param {<img />の配列}  items
 */
const Inventory = ({ items }) => {

    return (
        <InventorySC>
            <div>
                {items.map((item) => (
                    <>
                        {item}
                    </>
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

    :hover {
    cursor: pointer;
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
    }

    img {
        margin-top 1.1vw;
        margin-bottom 0.7vw;
        margin-left: 1.5vw;
        margin-right: 0.9vw;
        object-fit: cover;
        width: 6vw;
        height: 6vw;
    }
    
`;

export default Inventory