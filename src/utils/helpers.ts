import dayjs from 'dayjs';
import i18next from 'i18next';
import { ComeFromKeepDataEnum } from 'src/constant/enums';
import { onSuccessNotif } from 'src/handlers/notification';

//
export const seprateNumber = (num: number | undefined): any => {
    if (num && !isNaN(num)) {
        let sepCode = String(num);
        return sepCode.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    } else return num;
};

export const isBetween = (min: number, value: number, max: number): boolean => value >= min && value <= max;

export const validNumber = (value: string | number) => {
    return +String(value).replace(/[^0-9]/gi, '');
};

export const downloadBlobFile = (blob: Blob, fileName: string) => {
    //
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    link.click();
};

export const isPrimaryComeFrom = (comeFrom: string | undefined): boolean => {
    return comeFrom === '' || comeFrom === ComeFromKeepDataEnum.FailedOrder || !comeFrom;
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

export const calcExpireDate = (ExpireDate: number | undefined) => {
    if (!ExpireDate)
        return {
            minutes: 0,
            seconds: 0,
        };
    let minutes = Math.floor(ExpireDate / 60);
    let seconds = ExpireDate - minutes * 60;
    return {
        minutes,
        seconds,
    };
};

export const getUniqId = (): string => (Math.random() + 1).toString(36).substring(2);

export const factoryQueryKey = <T extends object>(obj: T): string => {
    let sortObj = {} as T;

    (Object.keys(obj) as Array<keyof T>).sort().forEach((k) => {
        sortObj[k] = obj[k];
    });

    return JSON.stringify(sortObj);
};

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
                title: 'متن مورد نظر در حافظه کپی شد',
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

export const zeroPad = (number: any, length = 2) => {
    number = String(number);

    while (number.length < length) {
        number = `0${number}`;
    }

    return number;
};

export const parseEnglish = (input: any) => {
    const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
    const arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];

    for (let i = 0; i < 10; i++) {
        input = input.toString().replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
    }

    return input;
};

export const getFarsiDate = (timeStamp: string) => {
    const days = ['یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنج شنبه', 'جمعه', 'شنبه'];

    const months = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];

    let time = Number(`${timeStamp}`) ? new Date(timeStamp) : new Date(`${timeStamp}`);

    const hr = zeroPad(time.getHours());

    const min = zeroPad(time.getMinutes());

    const seconds = zeroPad(time.getSeconds());

    const dayOfWeek = days[time.getDay()];

    const farsiDate = parseEnglish(time.toLocaleDateString('fa-IR')).split('/');

    const farsiMonth = months[Number(farsiDate[1]) - 1];

    return {
        time: `${hr}:${min}`,
        seconds,
        dayOfWeek,
        farsiMonth,
        farsiDate: `${farsiDate[0]}/${farsiDate[1] < 10 ? `0${farsiDate[1]}` : farsiDate[1]}/${
            farsiDate[2] < 10 ? `0${farsiDate[2]}` : farsiDate[2]
        }`,
        farsiDayMonth: `${farsiDate[1] < 10 ? `0${farsiDate[1]}` : farsiDate[1]}/${farsiDate[2] < 10 ? `0${farsiDate[2]}` : farsiDate[2]}`,
    };
};

export const howLongAgo = (timeStamp: any) => {
    const now = new Date().getTime();
    const diff = (now - timeStamp) / 1000;
    let result = '';
    let timeAgo;

    if (diff <= 60) {
        result = 'همین الان';
    }
    if (diff > 60) {
        timeAgo = Math.floor(diff / 60);
        result = `${timeAgo} دقیقه پیش`;
    }
    if (diff > 3600) {
        timeAgo = Math.floor(diff / 3600);
        result = `${timeAgo} ساعت پیش`;
    }
    if (diff > 86400) {
        timeAgo = Math.floor(diff / 86400);
        result = `${timeAgo} روز پیش`;
    }
    if (diff > 2592000) {
        timeAgo = Math.floor(diff / 2592000);
        result = `${timeAgo} ماه پیش`;
    }

    return result;
};

export const orderStatusValueFormatter = (data: any) => {
    return i18next.t('order_status.' + data.value);
};

export const valueFormatterSide = (data: any): string => {
    return i18next.t('orderSide.' + data.value);
};

export const valueFormatterValidity = (data: any) => {
    if (data.data.validity === 'Week' || data.data.validity === 'Month' || data.data.validity === 'GoodTillDate')
        return getFarsiDate(data.data.validityDate).farsiDate;
    return i18next.t('BSModal.validity_' + data.value);
};

export const valueFormatterState = (data: any) => {
    return i18next.t('OrderState.' + data.value);
};

export const valueFormatterDate = (data: any) => {
    return getFarsiDate(data.value).farsiDate;
};

export const valueFormatterCustomerTitle = (data: any) => {
    const customerTitle = data.value.map((item: any) => item.customerTitle);

    return String(customerTitle);
};

export const valueFormatterIndex = (data: any, pageNumber?: number, pageSize?: number): string => {
    if (pageNumber && pageSize) {
        return ((pageNumber - 1) * pageSize + (data.node.rowIndex + 1)).toString();
    }
    return data.node.rowIndex + 1;
};

export const handleValidity = (validity: validity): validity => {
    if (validity === 'Week' || validity === 'Month') return 'GoodTillDate';
    return validity;
};

const isDecimal = (number: number) => {
    return String(number).indexOf('.') < 0 ? false : true;
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

    // format number and add suffi

    return isDecimal(scaled) ? scaled.toFixed(1) + suffix : scaled + suffix;
};

export const getValidDate = (value: number | string | Date): Date => {
    if (value instanceof Date) return value;

    return new Date(value as string);
};

export const toEnglishNumber = (str: string): string => {
    const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
    const arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];

    for (let i = 0; i < 10; i++) {
        str = str.replace(persianNumbers[i], String(i)).replace(arabicNumbers[i], String(i));
    }

    return str;
};

export const dateFormatter = (value: string) => {
    const dateRegex = /([0-9]{4})([0-9]{1,2})?([0-9]{1,2})?/g;

    value = toEnglishNumber(value).replace(/[^0-9]/g, '');
    const res = dateRegex.exec(value);
    if (!res) return value;

    const [, ...matchs] = res;

    if (matchs[1] === '00' || Number(matchs[1]) > 12) {
        return matchs[0];
    } else if (
        matchs[2] === '00' ||
        Number(matchs[2]) >
            dayjs(matchs[0] + '/' + matchs[1] + '/' + '01', { jalali: true } as any)
                .calendar('jalali')
                .daysInMonth()
    ) {
        return [matchs[0], matchs[1]].filter(Boolean).join('/');
    }

    return matchs.filter(Boolean).join('/');
};

export const findTitlePage = (pathname: string) => {
    let path = '';
    if (pathname === '/') {
        path = 'home';
    } else {
        path = pathname.replace(/^\//, '').toString();
    }

    document.title = 'آنلاین گروهی - ' + i18next.t(`titlePage.${path}`);
};

export const getURL = (address: string, params?: Record<string, string>) => {
    const url = new URL(address);

    const searchParams = new URLSearchParams();

    for (const property in params) {
        searchParams.append(property, params[property]);
    }

    url.search = searchParams.toString();
    return url.toString();
};

export const downloadCanvasAsImage = (canvas: HTMLCanvasElement, name: string) => {
    const canvasImage = canvas.toDataURL('image/png');

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';

    xhr.onload = () => {
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(xhr.response);
        a.download = `${name}.png`;
        a.style.display = 'none';
        document.body.appendChild(a);

        a.click();
        a.remove();
    };

    xhr.open('GET', canvasImage); // This is to download the canvas Image

    xhr.send();
};

export const getAverageDates = (startDate: number, endDate: number, n: number) => {
    const averageInterval = Math.floor((endDate - startDate) / n);
    const averageDates: number[] = [];

    const startDateAsTimestamp = new Date(startDate).getTime();
    for (let i = 0; i < n; i++) {
        averageDates.push(startDateAsTimestamp + i * averageInterval);
    }

    return averageDates;
};

export const rgbToRgba = (rgb: string, opacity = 1): string => {
    const rgbValues = rgb.slice(4, rgb.length - 1);

    return `rgba(${rgbValues},${opacity})`;
};

export const cleanObjectOfFalsyValues = (object: { [key: string]: any }) => {
    let obj: { [key: string]: any } = {};
    for (const [key, value] of Object.entries(object)) {
        if (value) {
            obj[key] = value;
        }
    }

    return obj;
};

export const removeDuplicatesInArray = (arr: any[]) => arr.filter((item, index) => arr.indexOf(item) === index);

export const datePeriodValidator = (fromDate: string, toDate: string) => {
    return fromDate && toDate && dayjs(toDate).diff(fromDate) < 0 ? false : true;
};

export const disableTillYesterday = (date: Date) => {
    return dayjs(date).diff(dayjs().format('YYYY/MM/DD')) < 0;
};

export const disableCustomPeriod = (date: Date, customeDate: string, mode: 'Till' | 'From') => {
    if (mode === 'Till') {
        return dayjs(date).diff(dayjs(customeDate).format('YYYY/MM/DD')) < 0;
    } else {
        return dayjs(date).diff(dayjs().format('YYYY/MM/DD')) > 0;
    }
};

export const excelDownloader = ({
    contentType,
    fileContent,
    fileDownloadName,
}: {
    fileContent: string;
    contentType: string;
    fileDownloadName: string;
}) => {
    const decodedContent = atob(fileContent);
    const uint8Array = new Uint8Array(decodedContent.length);
    for (let i = 0; i < decodedContent.length; i++) {
        uint8Array[i] = decodedContent.charCodeAt(i);
    }
    const blob = new Blob([uint8Array], { type: contentType });
    const link = document.createElement('a');
    link.download = fileDownloadName;
    link.href = URL.createObjectURL(blob);
    link.click();
};
