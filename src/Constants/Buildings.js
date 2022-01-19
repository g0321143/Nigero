/**
 * 建物の定数を保存するファイルです.
 * 使用方法は，使用するファイル上部で
 *      import Buildings from '../Contants/Buildings'
 * を記述し，
 * 　Buildings.House.name や Buildings.School.price などで定数を呼び出します
 */
 import HouseTag from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-19.png';
 import TallBuildingTag from '../Assets/Images/BUTTONS_EARTHQUAKE_GAME_3-17.png';
 import ElevatorTag from '../Assets/Images/ELEVATOR_BUTTON-50.png';

export default {
    house: {
        name: 'House',
        id: 'house',
        price: 'FREE',
        model: './Models/House.glb',
        nameTagImage: HouseTag,
        beforeTime: 30,
        quakeTime: 15,
        afterTime: 0,
        totalTime: 45,
        gameOverTime: 40
    },
    tallBuilding:
    {
        name: 'Tall Building',
        id: 'tallBuilding',
        price: "100,000",
        model: './Models/TallBuilding.glb',
        nameTagImage: TallBuildingTag,
        beforeTime: 30,
        quakeTime: 15,
        afterTime: 60,
        totalTime: 105,
        gameOverTime: 40
    },
    elevator:
    {
        name: 'Elevator',
        id: 'elevator',
        price: "100,000",
        model: './Models/Elevator.glb',
        nameTagImage: ElevatorTag,
        beforeTime: 10,
        quakeTime: 10,
        afterTime: 120,
        totalTime: 140,
    },
};