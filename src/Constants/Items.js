/**
 * アイテムの定数を保存するファイルです.
 * 使用方法は，使用するファイル上部で
 *      import {Light, AntiSeismicMat} from '../Contants/Items'
 * を記述し，
 *      Light.AQUMO_CANDLE.name や AntiSeismicMat.AntiSeismicGel.price
 * などで定数を呼び出します
 */

import NightStarJP_Image from '../Assets/Images/Items/NightStarJP.png';

export const Light = {
    NightStarJP: {
            name: 'NightStarJP',
            price: '8,778',
            image: NightStarJP_Image,
            info: 'this is light',
            url: 'https://www.daisaku-shoji.co.jp/p_nightstar_jp.html'
    },
    XXX_Light: [
        {
            name: '',
            price: 0,
            image: '',
            url: ''
        }
    ]
}


export const AntiSeismicMat = {
    AntiSeismicGel: [
        {
            name: 'Anti-Seismic Gel',
            price: 1280,
            image: '',
            url: ''
        }
    ],
}
