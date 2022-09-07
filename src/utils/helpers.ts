import { onSuccessNotif } from 'src/handlers/notification';

//
export const sepNumbers = (num: number): any => {
    if (num && !isNaN(num)) {
        let sepCode = String(num);
        return sepCode.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    } else return num;
};

export const downloadBlobFile = (blob: Blob, fileName: string) => {
    //
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    link.click();
};

export const makeArrayUniqueByKey = (arr: any[], key: string) => {
    return arr.filter((item, index, self) => {
        return index === self.findIndex((t) => t[key] === item[key]);
    });
};

export const jsonParseSafely = (jsonString: string, onFail: any): any => {
    //
    try {
        const data = JSON.parse(jsonString);
        return data;
    } catch (error) {
        console.error('JSON.parse Failed');
        return onFail;
    }
};

export const getUniqId = (): string => (Math.random() + 1).toString(36).substring(2);

export const copyTextToClipboard = (text: string) => {
    //
    if (!text) return;

    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        successful &&
            onSuccessNotif({
                message: 'کپی',
                description: 'متن مورد نظر در حافظه کپی شد',
            });

        if (!successful) console.error('Fallback: unable to copy', 'document.execCommand');
        //
    } catch (err) {
        console.error('Fallback: unable to copy', err);
    }

    document.body.removeChild(textArea);
};

// a function to retry loading a chunk to avoid chunk load error for out of date code
export const safeLazyImport = function (componentImport: any): any {
    return new Promise((resolve, reject) => {
        //
        // check if the window has already been refreshed
        const hasRefreshed = JSON.parse(window.sessionStorage.getItem('safeLazyImport') || 'false');

        // try to import the component
        componentImport()
            .then((component: any) => {
                window.sessionStorage.removeItem('safeLazyImport'); // success so reset the refresh
                resolve(component);
            })
            .catch((error: any) => {
                if (!hasRefreshed) {
                    // not been refreshed yet
                    window.sessionStorage.setItem('safeLazyImport', 'true'); // we are now going to refresh
                    return window.location.reload(); // refresh the page
                }
                reject(error); // Default error behaviour as already tried refresh
            });
    });
};

export const getWindowHistoryState = (propertyName: string, onFail: any) => {
    return window?.history?.state?.PgDt?.[propertyName] || onFail;
};

export const setWindowHistoryState = (propertyName: string, value: any) => {
    //
    if (!window?.history || !window?.history.replaceState) return;

    const currentState = window.history.state || {};
    const currentPgDt = window.history.state?.PgDt || {};

    window.history.replaceState({ ...currentState, PgDt: { ...currentPgDt, [propertyName]: value } }, '');
};

export const deepFreeze = (object: any) => {
    const propNames = Object.getOwnPropertyNames(object);

    for (const name of propNames) {
        const value = object[name];
        if (value && typeof value === 'object') {
            deepFreeze(value);
        }
    }

    return Object.freeze(object);
};

export const base64 = {
    _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
    encode: function (e: any) {
        var t = '';
        var n, r, i, s, o, u, a;
        var f = 0;
        e = base64._utf8_encode(e);
        while (f < e.length) {
            n = e.charCodeAt(f++);
            r = e.charCodeAt(f++);
            i = e.charCodeAt(f++);
            s = n >> 2;
            o = ((n & 3) << 4) | (r >> 4);
            u = ((r & 15) << 2) | (i >> 6);
            a = i & 63;
            if (isNaN(r)) {
                u = a = 64;
            } else if (isNaN(i)) {
                a = 64;
            }
            t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a);
        }
        return t;
    },
    decode: function (e: any) {
        var t = '';
        var n, r, i;
        var s, o, u, a;
        var f = 0;
        e = e.replace(/[^A-Za-z0-9\+\/\=]/g, '');
        while (f < e.length) {
            s = this._keyStr.indexOf(e.charAt(f++));
            o = this._keyStr.indexOf(e.charAt(f++));
            u = this._keyStr.indexOf(e.charAt(f++));
            a = this._keyStr.indexOf(e.charAt(f++));
            n = (s << 2) | (o >> 4);
            r = ((o & 15) << 4) | (u >> 2);
            i = ((u & 3) << 6) | a;
            t = t + String.fromCharCode(n);
            if (u != 64) {
                t = t + String.fromCharCode(r);
            }
            if (a != 64) {
                t = t + String.fromCharCode(i);
            }
        }
        t = base64._utf8_decode(t);
        return t;
    },
    _utf8_encode: function (e: any) {
        e = e.replace(/\r\n/g, '\n');
        var t = '';
        for (var n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
            } else if (r > 127 && r < 2048) {
                t += String.fromCharCode((r >> 6) | 192);
                t += String.fromCharCode((r & 63) | 128);
            } else {
                t += String.fromCharCode((r >> 12) | 224);
                t += String.fromCharCode(((r >> 6) & 63) | 128);
                t += String.fromCharCode((r & 63) | 128);
            }
        }
        return t;
    },
    _utf8_decode: function (e: any) {
        var t = '';
        var n = 0;
        // @ts-ignore
        var r = (c1 = c2 = 0);
        while (n < e.length) {
            r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
                n++;
            } else if (r > 191 && r < 224) {
                // @ts-ignore
                c2 = e.charCodeAt(n + 1);
                // @ts-ignore
                t += String.fromCharCode(((r & 31) << 6) | (c2 & 63));
                n += 2;
            } else {
                // @ts-ignore
                c2 = e.charCodeAt(n + 1);
                // @ts-ignore
                c3 = e.charCodeAt(n + 2);
                // @ts-ignore
                t += String.fromCharCode(((r & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                n += 3;
            }
        }
        return t;
    },
};

export const abbreviateNumber = (number: number) => {
    //

    if (isNaN(number)) return number;

    const SI_SYMBOL = ['', 'K', 'M', 'B', 'T', 'P', 'E'];

    // what tier? (determines SI symbol)
    const tier = (Math.log10(Math.abs(Number(number))) / 3) | 0;

    // if zero, we don't need a suffix
    if (tier === 0) return number;

    // get suffix and determine scale
    const suffix = SI_SYMBOL[tier];
    const scale = Math.pow(10, tier * 3);

    // scale the number
    const scaled = number / scale;

    // format number and add suffix
    return scaled.toFixed(2) + suffix;
};
