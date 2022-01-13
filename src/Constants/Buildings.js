/**
 * 建物の定数を保存するファイルです.
 * 使用方法は，使用するファイル上部で
 *      import Buildings from '../Contants/Buildings'
 * を記述し，
 * 　Buildings.House.name や Buildings.School.price などで定数を呼び出します
 */
 import HouseTag from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-19.png';
 import TallBuildingTag from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-17.png';

export default {
    house: {
        name: 'House',
        id: 'house',
        price: 'FREE',
        model: './Models/House.glb',
        nameTagImage: HouseTag,
    },
    tallBuilding:
    {
        name: 'Tall Building',
        id: 'tallBuilding',
        price: "100,000",
        model: './Models/TallBuilding.glb',
        nameTagImage: TallBuildingTag,
    },
    elevator:
    {
        name: 'Elevator',
        id: 'elevator',
        price: "100,000",
        model: './Models/TallBuilding.glb',
        nameTagImage: TallBuildingTag,
    },
};