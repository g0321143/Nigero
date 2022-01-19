const COIN_KEY = "coin_data";
const SCORE_KEY = "score_data";
const BUILDINGS_KEY = "building_data";
const ITEMS_KEY = "items_data";

const coinData = 0;

// スコアの初期設定
const scoreData = {
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
    light:
    {
        AQUMO_CANDLE:
        {
            isLock: false,
            isBuy: false,
        },
        XXX_Light:
        {
            isLock: false,
            isBuy: false,
        }
    }
    ,
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

    // スコアの初期設定
    const scoreList = JSON.parse(localStorage.getItem(SCORE_KEY));
    if (scoreList == null) {
        localStorage.setItem(SCORE_KEY, JSON.stringify(scoreData));
        console.log('set default scoreData');
    }

    // 建物の初期設定
    const buildingsList = JSON.parse(localStorage.getItem(BUILDINGS_KEY));
    if (buildingsList == null) {
        localStorage.setItem(BUILDINGS_KEY, JSON.stringify(buildingsData));
        console.log('set default buildingsData');
    }

    // スコアの初期設定
    const itemsList = JSON.parse(localStorage.getItem(ITEMS_KEY));
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
 * スコアをローカルストレージに保存します.
 * @param {string} building 建物の名前
 * @param {[boolean, boolean, boolean]} score 星の状態
 */
export function setScore(building, score) {
    const scoreList = JSON.parse(localStorage.getItem(SCORE_KEY));

    for (let index = 0; index < score.length; index++) {
        if (score[index] == true)
            scoreList[building][index] = score[index];
    }

    localStorage.setItem(SCORE_KEY, JSON.stringify(scoreList));
    console.log(`set score : ${building} ${scoreList[building]}`);
}

/**
 * 現在のスコアを取得します．
 * @param {string} building 建物の名前
 * @returns {[boolean, boolean, boolean]} 星の状態
 */
export function getScore(building) {
    const scoreList = JSON.parse(localStorage.getItem(SCORE_KEY));
    const score = [];

    score.push(scoreList[building][0]);
    score.push(scoreList[building][1]);
    score.push(scoreList[building][2]);

    return score;
}

/**
 * ミッションスコアをローカルストレージに保存します.
 * @param {string} building 建物の名前
 * @param {boolean} mission1 星1
 * @param {boolean} mission2 星2
 * @param {boolean} mission3 星3
 */
export function setMissionScore(building, mission1, mission2, mission3) {
    const missionList = JSON.parse(localStorage.getItem(SCORE_KEY));

    missionList[building][0] = mission1;
    missionList[building][1] = mission2;
    missionList[building][2] = mission3;

    localStorage.setItem(SCORE_KEY, JSON.stringify(missionList));
    //console.log(`set mission score : ${building} (${mission1},${mission2},${mission3})`);
}

/**
 * 現在のミッションスコアを取得します．
 * @param {string} building 建物の名前
 * @returns {[boolean, boolean, boolean]} 星の状態
 */
export function getMissionScore(building) {
    const missionList = JSON.parse(localStorage.getItem(SCORE_KEY));
    const score = [];

    score.push(missionList[building][0]);
    score.push(missionList[building][1]);
    score.push(missionList[building][2]);

    return score;
}




/**
 * 建物の状態をローカルストレージに保存します.
 * @param {string} building 建物の名前
 * @param {boolean} isBuy 購入済みかどうか
 */
export function setBuilding(building, isBuy) {
    const buildingsList = JSON.parse(localStorage.getItem(BUILDINGS_KEY));

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
 * @param {string} itemCategory アイテムの種類
 * @param {string} itemName アイテムの名前
 * @param {boolean} isLock ロックされているかどうか
 * @param {boolean} isBuy 購入済みかどうか
 */
export function setItem(itemCategory, itemName, isLock, isBuy) {
    const itemsList = JSON.parse(localStorage.getItem(ITEMS_KEY));

    itemsList[itemCategory][itemName]['isLock'] = isLock;
    itemsList[itemCategory][itemName]['isBuy'] = isBuy;

    localStorage.setItem(ITEMS_KEY, JSON.stringify(itemsList));
    console.log(`set item : ${itemCategory}->${itemName} Lock=${isLock} Buy=${isBuy}`);
}

/**
 * アイテムがロックされているかどうかを取得します．
 * @param {string} itemCategory アイテムの種類
 * @param {string} itemName アイテムの名前
 * @returns {boolean} ロックされているかどうか
 */
export function getItemLock(itemCategory, itemName) {
    const itemsList = JSON.parse(localStorage.getItem(ITEMS_KEY));
    const isLock = itemsList[itemCategory][itemName]['isLock'];

    return isLock;
}

/**
 * アイテムが購入済みかどうかを取得します．
 * @param {string} itemCategory アイテムの種類
 * @param {string} itemName アイテムの名前
 * @returns {boolean} 購入済みかどうか
 */
export function getItemBuy(itemCategory, itemName) {
    const itemsList = JSON.parse(localStorage.getItem(ITEMS_KEY));
    const isBuy = itemsList[itemCategory][itemName]['isBuy'];

    return isBuy;
}

/**
 * 全てのデータを初期化します
 */
export function resetAllData() {
    localStorage.setItem(COIN_KEY, coinData);
    localStorage.setItem(SCORE_KEY, JSON.stringify(scoreData));
    localStorage.setItem(BUILDINGS_KEY, JSON.stringify(buildingsData));
    localStorage.setItem(ITEMS_KEY, JSON.stringify(itemsData));

    alert('All User Data is initialized.');
}