import Items from "../Constants/Items";

const COIN_KEY = "coin_data";
const LANGUAGE_KEY = "language_data";
const BEST_SCORE_KEY = "best_score_data";
const LATEST_SCORE_KEY = "latest_score_data";
const BUILDINGS_KEY = "building_data";
const ITEMS_KEY = "items_data";

// コインの初期設定
const coinData = 0;

// 言語の初期設定
const languageData = 'en';

// スコアの初期設定
const bestScoreData = {
    house: [false, false, false],
    tallBuilding: [false, false, false],
    elevator: [false, false, false],
};

const latestScoreData = {
    house: [false, false, false],
    tallBuilding: [false, false, false],
    elevator: [false, false, false],
};

// 建物の初期設定
const buildingsData = {
    house:
    {
        isBuy: true,
    },
    tallBuilding:
    {
        isBuy: false,
    },
    elevator:
    {
        isBuy: false,
    },
};

// アイテムの初期設定
const itemsData = {
        NightStarJP:
        {
            isBuy: false,
        },
        AqumoCandle:
        {
            isBuy: false,
        },
        Helmet: 
        {
            isBuy: false,
        },
        PortableWaterPurifiers: {
            isBuy: false,
        },
        PortableToiletst: {
            isBuy: false,
        },
        DisasterPreventionKit: {
            isBuy: false,
        },
        TablewareOrigami: {
            isBuy: false,
        },
        Emergencyrations:
        {
            isBuy: false,
        },
        Emergencyrations2: 
        {
            isBuy: false,
        },
        AntiSeismicGel:
        {
            isBuy: false,
        },
        Tensionrod:
        {
            isBuy: false,
        },
        AntiShatteringFilm:
        {
            isBuy: false,
        },
};

/**
 * ゲームの初回起動時に，LocalStorageにデータがなければ，
 * データの初期設定を保管します.
 */
export function initLocalStorage() {
    // コインの初期設定
    const coinValue = localStorage.getItem(COIN_KEY);
    if (coinValue == null) {
        localStorage.setItem(COIN_KEY, coinData);
        console.log('set default coinData');
    }

    // 言語の初期設定
    const languageValue = localStorage.getItem(LANGUAGE_KEY);
    if (languageValue == null) {
        localStorage.setItem(LANGUAGE_KEY, languageData);
        console.log('set default languageData');
    }

    // スコアの初期設定
    const bestScoreList = JSON.parse(localStorage.getItem(BEST_SCORE_KEY));
    if (bestScoreList == null) {
        localStorage.setItem(BEST_SCORE_KEY, JSON.stringify(bestScoreData));
        console.log('set default bestScoreData');
    }
    const latestScoreList = JSON.parse(localStorage.getItem(LATEST_SCORE_KEY));
    if (latestScoreList == null) {
        localStorage.setItem(LATEST_SCORE_KEY, JSON.stringify(latestScoreData));
        console.log('set default latestScoreData');
    }

    // 建物の初期設定
    const buildingsList = JSON.parse(localStorage.getItem(BUILDINGS_KEY));
    console.log(buildingsList);
    if (buildingsList == null) {
        localStorage.setItem(BUILDINGS_KEY, JSON.stringify(buildingsData));
        console.log('set default buildingsData');
    }

    // アイテムの初期設定
    //const itemsData = {};
    //Object.keys(Items).forEach(item => itemsData[Items[item].id] = false);
    const itemsList = JSON.parse(localStorage.getItem(ITEMS_KEY));
    console.log(itemsList);
    if (itemsList == null) {
        localStorage.setItem(ITEMS_KEY, JSON.stringify(itemsData));
        console.log('set default itemsData');
    }
}

/**
 * 現在のコイン枚数を取得します.
 * @returns {number} 現在のコイン枚数
 */
export function getCoin() {
    const coinStr = localStorage.getItem(COIN_KEY);

    if (typeof coinStr !== "string" || coinStr === "") return 0;
    const coinNum = Number(coinStr); // 数値に変換できない場合はNaNが返る
    if (isNaN(coinNum)) return 0;

    return coinNum;
}

/**
 * コインを加算してローカルストレージに保存します.
 * @param {number} addend 加算する値
 */
export function addCoin(addend) {
    const coinStr = localStorage.getItem(COIN_KEY);

    if (typeof coinStr !== "string" || coinStr === "") return false;
    const coinNum = Number(coinStr); // 数値に変換できない場合はNaNが返る
    if (isNaN(coinNum)) return false;

    localStorage.setItem(COIN_KEY, coinNum + addend);
    console.log(`add coin : ${coinNum + addend}`);
}

/**
 * コインを減算してローカルストレージに保存します.
 * @param {number} subtract 減算する値
 */
export function subCoin(subtract) {
    const coinStr = localStorage.getItem(COIN_KEY);

    if (typeof coinStr !== "string" || coinStr === "") return false;
    const coinNum = Number(coinStr); // 数値に変換できない場合はNaNが返る
    if (isNaN(coinNum)) return false;

    localStorage.setItem(COIN_KEY, coinNum - subtract);
    console.log(`set coin : ${coinNum - subtract}`);
}

/**
 * 言語を設定します.
 * @param {String} 言語 'en' | 'ja'
 */
export function setLanguage(language) {
    localStorage.setItem(LANGUAGE_KEY, language);

    console.log(`set language : ${language}`);
}

/**
 * 言語を取得します.
 * @returns {String} 言語 'en' | 'ja'
 */
export function getLanguage() {
    return localStorage.getItem(LANGUAGE_KEY);
}


/**
 * スコアをローカルストレージに保存します.
 * @param {string} building 建物の名前
 * @param {[boolean, boolean, boolean]} score 星の状態
 */
export function setScore(building, score) {
    const bestScoreList = JSON.parse(localStorage.getItem(BEST_SCORE_KEY));
    const latestScoreList = JSON.parse(localStorage.getItem(LATEST_SCORE_KEY));

    for (let index = 0; index < score.length; index++) {
        if (score[index] == true) {
            bestScoreList[building][index] = score[index];
        }
        latestScoreList[building][index] = score[index];
    }

    localStorage.setItem(BEST_SCORE_KEY, JSON.stringify(bestScoreList));
    localStorage.setItem(LATEST_SCORE_KEY, JSON.stringify(latestScoreList));
    console.log(`set best score : ${building} ${bestScoreList[building]}`);
    console.log(`set latest score : ${building} ${latestScoreList[building]}`);
}

/**
 * 一番新しく記録したスコアを取得します．
 * @param {string} building 建物の名前
 * @returns {[boolean, boolean, boolean]} 星の状態
 */
export function getLatestScore(building) {
    const scoreList = JSON.parse(localStorage.getItem(LATEST_SCORE_KEY));
    const score = [];

    score.push(scoreList[building][0]);
    score.push(scoreList[building][1]);
    score.push(scoreList[building][2]);

    return score;
}

/**
 * 現在のベストスコアを取得します．
 * @param {string} building 建物の名前
 * @returns {[boolean, boolean, boolean]} 星の状態
 */
export function getScore(building) {
    const scoreList = JSON.parse(localStorage.getItem(BEST_SCORE_KEY));
    const score = [];

    score.push(scoreList[building][0]);
    score.push(scoreList[building][1]);
    score.push(scoreList[building][2]);

    return score;
}


/**
 * 建物の状態をローカルストレージに保存します.
 * @param {string} building 建物の名前
 * @param {boolean} isBuy 購入済みかどうか
 */
export function setBuilding(building, isBuy) {
    const buildingsList = JSON.parse(localStorage.getItem(BUILDINGS_KEY));

    console.log(buildingsList);
    buildingsList[building]['isBuy'] = isBuy;
    localStorage.setItem(BUILDINGS_KEY, JSON.stringify(buildingsList));
    console.log(`set building : ${building} isBuy=${isBuy}`);
}

/**
 * 現在の建物の状態を取得します．
 * @param {string} building 建物の名前
 * @returns {boolean} 建物の状態
 */
export function getBuilding(building) {
    const buildingsList = JSON.parse(localStorage.getItem(BUILDINGS_KEY));
    const isBuy = buildingsList[building]['isBuy'];

    return isBuy;
}

/**
 * アイテムの状態をローカルストレージに保存します.
 * @param {string} itemID アイテムのID(名前からスペース等を除いたもの)
 * @param {boolean} isBuy
 */
export function setitem(itemID, isBuy) {
    const itemsList = JSON.parse(localStorage.getItem(ITEMS_KEY));

    itemsList[itemID]['isBuy'] = isBuy;
    localStorage.setItem(ITEMS_KEY, JSON.stringify(itemsList));
    
    console.log(itemsList);

    //itemsList[itemName]['isLock'] = isLock;
    //itemsList[itemName]['isBuy'] = isBuy;

    localStorage.setItem(ITEMS_KEY, JSON.stringify(itemsList));
    console.log(`set item : name=${itemID} Buy=${true}`);
}

/**
 * アイテムが購入済みかどうかを取得します．
 * @param {string} itemID アイテムのID(名前からスペース等を除いたもの)
 */
export function getItemState(itemID) {
    const itemsList = JSON.parse(localStorage.getItem(ITEMS_KEY));
    const isBuy = itemsList[itemID]['isBuy'];
    return isBuy;
}

/**
 * 全てのデータを初期化します
 */
export function resetAllData() {
    const isDelete = confirm(getLanguage() == 'en' ? 'Delete all user data?' : '全てのユーザーデータを削除しますか？')

    if (isDelete == true) {
        localStorage.setItem(COIN_KEY, coinData);
        localStorage.setItem(BEST_SCORE_KEY, JSON.stringify(bestScoreData));
        localStorage.setItem(LATEST_SCORE_KEY, JSON.stringify(latestScoreData));
        localStorage.setItem(BUILDINGS_KEY, JSON.stringify(buildingsData));
        //const itemsData = {};
        //Object.keys(itemsData).forEach(item => itemsData[Items[item].id] = false);
        localStorage.setItem(ITEMS_KEY, JSON.stringify(itemsData));

        alert(getLanguage() == 'en' ? 'All User Data is initialized.' : '全てのユーザーデータを削除しました');
    }
}