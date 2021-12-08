/**
 * Cookieに保存するための関数
 * @param  {String} name 保存する値の名前
 * @param  value 保存する値、文字列
 */
export function setCookie(name, value) {
    const days = 14; // 14日間Cookieを保存する
    let expires;
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    } else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

/**
 * Cookieに保存した値を返す関数
 * @param  {String} name ほしい値の名前
 * @return  {String}  保存した値
 */
export function getCookie(name) {
    const na = name + "=";
    const ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(na) == 0) { return c.substring(na.length, c.length); }
    }
    //console.log("getCookie");
    return "";
}

/**
 * Cookieに保存した値を削除する関数
 * @param  {String} name 削除したいCookieの名前
 */
 export function deleteCookie(name) {
    const d = new Date();
    d.setTime(d.getTime() - (1000 * 60 * 60 * 24));
    document.cookie = name + '=; expires=' + d.toUTCString() + "; path=/";
}

/**
 * Cookieに値を加算する関数
 * @param  {String} name 加算したい値の名前
 * @param  {Number} value 加算する値
 */
 export function addCookie(name, value) {
    const str = getCookie(name);
    if( typeof str !== "string" || str === "" ) return false;
    
    const num =  Number( str ); // 数値に変換できない場合はNaNが返る
    if(isNaN( num )) return false;

    setCookie(name, value+num);
    return true;
}

/**
 * Cookieに値を減算する関数
 * @param  {String} name 減算したい値の名前
 * @param  {Number} value 減算する値
 */
 export function subCookie(name, value) {
    const str = getCookie(name);
    if( typeof str !== "string" || str === "" ) return false;
    
    const num =  Number( str ); // 数値に変換できない場合はNaNが返る
    if(isNaN( num )) return false;

    setCookie(name, value-num);
    return true;
}