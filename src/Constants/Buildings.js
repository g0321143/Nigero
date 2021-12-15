/**
 * 建物の定数を保存するファイルです.
 * 使用方法は，使用するファイル上部で
 *      import Buildings from '../Contants/Buildings'
 * を記述し，
 * 　Buildings.House.name や Buildings.School.price などで定数を呼び出します
 */

export default {
    House: [
        {
            name: 'house',
            price: 0,
            model: './Models/House.glb',
            stage: [
                {
                    stage1:[
                        {
                            name: 'Magunitude 4',
                        }
                    ],
                    stage2:[
                        {
                            name: 'Magunitude 6',
                        }
                    ],
                    stage3:[
                        {
                            name: 'Magunitude 7',
                        }
                    ],
                    stage4:[
                        {
                            name: 'Magunitude 8',
                        }
                    ],
                }
            ],
        }
    ],
    School: [
        {
            name: 'school',
            price: 100000,
            model: './Models/School.glb',
            stage: [
                {
                    stage1:[
                        {
                            name: 'Magunitude 4',
                        }
                    ],
                    stage2:[
                        {
                            name: 'Magunitude 6',
                        }
                    ],
                    stage3:[
                        {
                            name: 'Magunitude 7',
                        }
                    ],
                    stage4:[
                        {
                            name: 'Magunitude 8',
                        }
                    ],
                }
            ],
        }
    ],
};