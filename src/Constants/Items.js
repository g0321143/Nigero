/**
 * アイテムの定数を保存するファイルです.
 * 使用方法は，使用するファイル上部で
 *      import {Light, AntiSeismicMat} from '../Contants/Items'
 * を記述し，
 *      Light.AQUMO_CANDLE.name や AntiSeismicMat.AntiSeismicGel.price
 * などで定数を呼び出します
 */

import NightStarJP_Image from '../Assets/Images/Items/NightStarJP.png';
import Helmet_Image from '../Assets/Images/Items/Helmet.jpg';
import AQUMOCANDLE_Image from '../Assets/Images/Items/AQUMOCANDLE.jpg';
import Emergencyrations_Image from '../Assets/Images/Items/Emergency rations.jpg';
import Emergencyrations2_Image from '../Assets/Images/Items/Emergency rations2.jpg';
import AntiSeismicGel_Image from '../Assets/Images/Items/AntiSeismicGel.jpg';
import Tensionrod_Image from '../Assets/Images/Items/Tension rod.jpg';
import PortableWaterPurifiers_Image from '../Assets/Images/Items/Portable Water Purifiers.jpg';
import Portabletoiletst_Image from '../Assets/Images/Items/Portable toiletst.jpg';
import EmergencyTablewareOrigami_Image from '../Assets/Images/Items/Emergency tableware origami.jpg';
import DisasterPreventionKit_Image from '../Assets/Images/Items/Disaster prevention kit.jpg';
export const Light = {
    NightStarJP: {
            name: 'NightStarJP',
            price: '8,778',
            image: NightStarJP_Image,
            info: 'this is light',
            url: 'https://www.daisaku-shoji.co.jp/p_nightstar_jp.html'
    },
    AQUMOCANDLE: {
        name: 'AQUMOCANDLE',
        price: '1111',
        image: AQUMOCANDLE_Image,
        info: 'this is light',
        url: 'https://www.amazon.co.jp/%E3%82%A2%E3%82%AF%E3%83%A2%E3%82%AD%E3%83%A3%E3%83%B3%E3%83%89%E3%83%AB-4562371210083%C3%972-%E3%82%A2%E3%82%AF%E3%83%A2%E3%82%AD%E3%83%A3%E3%83%B3%E3%83%89%E3%83%AB-2%E5%80%8B%E3%82%BB%E3%83%83%E3%83%88-%E6%B0%B4%E3%81%AB%E6%B5%B8%E3%81%91%E3%82%8B%E3%81%A8%E5%85%89%E3%82%8BLED%E3%83%A9%E3%82%A4%E3%83%88-%E9%98%B2%E7%81%BD%E7%94%A8%E7%81%AF/dp/B01DBO762G'
    },
    Helmet: {
        name: 'Helmet',
        price: '2222',
        image: Helmet_Image,
        info: 'this is light',
        url: 'https://www.amazon.co.jp/DIC%E3%83%97%E3%83%A9%E3%82%B9%E3%83%81%E3%83%83%E3%82%AF-%E6%8A%98%E3%82%8A%E3%81%9F%E3%81%9F%E3%81%BF%E3%83%98%E3%83%AB%E3%83%A1%E3%83%83%E3%83%88-IZANO2-%E3%83%9B%E3%83%AF%E3%82%A4%E3%83%88/dp/B094TW19M4/ref=sr_1_5?adgrpid=115087543439&hvadid=536110424611&hvdev=c&hvqmt=b&hvtargid=kwd-846233104240&hydadcr=10611_13442790&jp-ad-ap=0&keywords=%E9%98%B2%E7%81%BD%E7%94%A8%E3%83%98%E3%83%AB%E3%83%A1%E3%83%83%E3%83%88%E6%8A%98%E3%82%8A%E3%81%9F%E3%81%9F%E3%81%BF&qid=1642417886&sr=8-5&th=1'
    },

    PortableWaterPurifiers: {
        name: 'Portable water urifiers',
        price: '2222',
        image: PortableWaterPurifiers_Image,
        info: 'this is light',
        url: 'https://www.amazon.co.jp/SAKUTTO-%E6%90%BA%E5%B8%AF%E6%B5%84%E6%B0%B4%E5%99%A8-%E6%B5%84%E6%B0%B4%E5%99%A8-%E3%82%A2%E3%82%A6%E3%83%88%E3%83%89%E3%82%A2-%E3%80%90%E6%97%A5%E6%9C%AC%E6%AD%A3%E8%A6%8F%E5%93%81%E3%80%91/dp/B09GHBNG6Y/ref=sr_1_1_sspa?adgrpid=117589096484&hvadid=536111322715&hvdev=c&hvqmt=b&hvtargid=kwd-457954749598&hydadcr=27298_14464493&jp-ad-ap=0&keywords=%E6%90%BA%E5%B8%AF%E6%B5%84%E6%B0%B4%E5%99%A8+%E6%97%A5%E6%9C%AC%E8%A3%BD&qid=1642715898&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUExR0NNVTdXM1hJVTgzJmVuY3J5cHRlZElkPUEwMjA2MTM3MVVaT1gzWlk3MjNBQiZlbmNyeXB0ZWRBZElkPUEyME5UNUhOTFBEV01aJndpZGdldE5hbWU9c3BfYXRmJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ=='
    },
    PortableToiletst: {
        name: 'Portable toiletst',
        price: '2222',
        image: Portabletoiletst_Image,
        info: 'this is light',
        url: 'https://www.amazon.co.jp/%E3%83%96%E3%83%AC%E3%82%A4%E3%83%B3-BRAIN-BR-905-%E3%82%B5%E3%83%83%E3%81%A8%E5%9B%BA%E3%81%BE%E3%82%8B%E9%9D%9E%E5%B8%B8%E7%94%A8%E3%83%88%E3%82%A4%E3%83%AC%E8%A2%8B-%E7%81%BD%E5%AE%B3%E3%81%A7%E3%81%AE%E6%96%AD%E6%B0%B4%E6%99%82%E3%81%A7%E3%82%82%E3%83%88%E3%82%A4%E3%83%AC%E3%81%8C%E4%BD%BF%E3%81%88%E3%82%8B/dp/B002R5MR20?th=1'
    },
    DisasterPreventionKit: {
        name: 'Disaster prevention kit',
        price: '2222',
        image: DisasterPreventionKit_Image,
        info: 'this is light',
        url: 'https://www.amazon.co.jp/%E5%B1%B1%E5%96%84-YAMAZEN-%E9%81%BF%E9%9B%A3%E7%94%A8%E3%82%A2%E3%82%A4%E3%83%86%E3%83%A030%E7%82%B9%E5%85%A5%E3%82%8A-32%C3%9716%C3%9743cm-YBG-30R/dp/B07D28ZXP3?th=1'
    },
    TablewareOrigami: {
        name: 'Tableware origami',
        price: '2222',
        image: EmergencyTablewareOrigami_Image,
        info: 'this is light',
        url: 'https://www.amazon.co.jp/%E9%80%9A%E8%B2%A9%E3%83%91%E3%83%BC%E3%82%AF-%E9%9D%9E%E5%B8%B8%E7%94%A8%E9%A3%9F%E5%99%A8%E6%8A%98%E3%82%8A%E7%B4%99-3993/dp/B074JYFWX4/ref=sr_1_2?adgrpid=116162524036&hvadid=536185799672&hvdev=c&hvqmt=e&hvtargid=kwd-118663636866&hydadcr=26042_13446917&jp-ad-ap=0&keywords=%E9%9D%9E%E5%B8%B8%E7%94%A8%E9%A3%9F%E5%99%A8%E6%8A%98%E3%82%8A%E7%B4%99&qid=1642479132&sr=8-2'
    }
    
}

export const Food = {
    Emergencyrations:
        {
            name: 'Emergency rations',
            price: '3333',
            image: Emergencyrations_Image,
            info: 'this is Food',
            url: 'https://www.amazon.co.jp/%E9%9D%9E%E5%B8%B8%E9%A3%9F-%E3%83%96%E3%83%AB%E3%83%9C%E3%83%B3-%E7%BC%B6%E5%85%A5-%E4%BF%9D%E5%AD%98%E9%A3%9F-6%E7%BC%B6%E3%82%BB%E3%83%83%E3%83%88/dp/B00KR4W9DA?ref_=Oct_d_obs_d_2427752051&pd_rd_w=dZPg9&pf_rd_p=03b65386-84ce-4d82-8c83-dd9d2863fe54&pf_rd_r=M14NRWYJYQT29JV3MXE1&pd_rd_r=dfd053d7-9b88-49bb-92f8-9276d303809c&pd_rd_wg=48Nzw&pd_rd_i=B00KR4W9DA'
        },
    Emergencyrations2: 
        {
            name: 'Emergency rations2',
            price: '4444',
            image: Emergencyrations2_Image,
            info: 'this is Food',
            url: 'https://www.amazon.co.jp/%E5%B0%BE%E8%A5%BF%E9%A3%9F%E5%93%81-%E3%82%A2%E3%83%AB%E3%83%95%E3%82%A1%E7%B1%B312%E7%A8%AE%E9%A1%9E%E5%85%A8%E9%83%A8%E3%82%BB%E3%83%83%E3%83%88-%E9%9D%9E%E5%B8%B8%E9%A3%9F-5%E5%B9%B4%E4%BF%9D%E5%AD%98-%E5%90%84%E5%91%B31%E9%A3%9F%C3%9712%E7%A8%AE%E9%A1%9E/dp/B06XZM1RGH/ref=bmx_dp_j0cf2awn_1/357-8989515-5541443?pd_rd_w=J84gw&pf_rd_p=c9208997-d62b-40d1-b790-570695bae1e7&pf_rd_r=6CV8SVD7JE9M3RZMRSST&pd_rd_r=05ffdc35-bfed-44da-a069-6a12bf1c0414&pd_rd_wg=oDbDf&pd_rd_i=B06XZM1RGH&th=1'
        }
}

export const AntiSeismicMat = {
    AntiSeismicGel:
        {
            name: 'Anti-Seismic Gel',
            price: '5555',
            image: AntiSeismicGel_Image,
            info: 'this is Food',
            url: 'https://www.amazon.co.jp/%E3%82%B5%E3%83%B3%E3%83%AF%E3%83%80%E3%82%A4%E3%83%AC%E3%82%AF%E3%83%88-%E8%80%90%E9%9C%87%E3%82%B8%E3%82%A7%E3%83%AB-%E8%80%90%E9%9C%87%E3%83%9E%E3%83%83%E3%83%88-%E8%80%90%E8%8D%B7%E9%87%8D36kg-200-QL004/dp/B008JO6PYO/ref=sr_1_13?adgrpid=118596014369&hvadid=492518622640&hvdev=c&hvqmt=e&hvtargid=kwd-376951868309&hydadcr=15595_11400585&jp-ad-ap=0&keywords=%E8%80%90%E9%9C%87%2B%E3%82%B8%E3%82%A7%E3%83%AB%2B%E3%83%9E%E3%83%83%E3%83%88&qid=1642439981&sr=8-13&th=11'
        },
    Tensionrod:
        {
            name: 'Tension rod',
            price: '5555',
            image: Tensionrod_Image,
            info: 'this is Food',
            url: 'https://www.amazon.co.jp/%E5%B9%B3%E5%AE%89%E4%BC%B8%E9%8A%85%E5%B7%A5%E6%A5%AD-%E5%AE%B6%E5%85%B7%E8%BB%A2%E5%80%92%E9%98%B2%E6%AD%A2%E3%82%A4%E3%83%B3%E3%83%86%E3%83%AA%E3%82%A2%E3%83%9D%E3%83%BC%E3%83%AB-%E3%83%96%E3%83%A9%E3%83%83%E3%82%AF-%E5%8F%96%E4%BB%98%E9%AB%98%E3%81%9550-75cm-UEQ-50K/dp/B085RZGH8D?th=1'
        },
}
