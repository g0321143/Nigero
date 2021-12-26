import React from 'react'

import Buildings from '../Constants/Buildings';
import Store from '../Utils/Store';

import HouseGame from '../Elements/HouseGame';
import TallBuildingGame from '../Elements/TallBuildingGame';

/**
 * 選択された建物から，各ステージのモジュールへ分岐させます
 * 
 * @param {String} building 選択された建物ID 
 * @param {String} stage 選択されたステージID ※現在使ってません
 */
export default function Game({ building, stage }) {
    console.log(building);

    const renderComponent = () => {
        switch (building) {
            case Buildings.house.id: return <HouseGame />;
            case Buildings.tallBuilding.id: return <TallBuildingGame />;

            default: () => {
                console.error(`"${building}" は存在しない画面です.`);
                return Store.setScene('title');
            };
        }

    }

    return (
        <>
            {renderComponent()}
        </>
    );
}
