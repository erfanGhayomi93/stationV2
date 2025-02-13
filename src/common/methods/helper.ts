import clsx from 'clsx';
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';
import { getDateMilliseconds } from '@constant/date.ts';

export const sepNumbers = (num: number | string | undefined): string => {
     if (typeof num === 'number') num = String(num);
     if (!num) return '−';

     try {
          if (num.length <= 3) return num;

          const objRegex = /(-?\d+)(\d{3})/;
          while (objRegex.test(num)) {
               num = num.replace(objRegex, '$1,$2');
          }

          return num;
     } catch (e) {
          // Handle potential errors if necessary
          console.error('Error in sepNumbers:', e);
     }

     return num;
};

export const cn = (...args: ClassesValue[]) => {
     return twMerge(clsx(args));
};

export const toFixed = (v: number, l = 3, round = true) => {
     if (isNaN(v) || v === Infinity) return '−';

     if (l === 0) return sepNumbers(v.toFixed(0));

     const value = v.toFixed(l);
     const [integer, decimal] = value.split('.');

     const decimalAsNumber = Number(`.${decimal}`) * 1;
     if (!decimalAsNumber) return sepNumbers(integer);

     return sepNumbers(integer) + '.' + (round ? String(decimalAsNumber).slice(2) : decimal);
};

export const zeroPad = (num: string, length = 2): string => {
     while (num.length < length) {
          num = `0${num}`;
     }

     return num;
};

export const numFormatter = (num: number, formatNavigateNumber = true, isScale = true) => {
     try {
          let originalName = num;
          if (isNaN(num)) return '−';

          const suffixes = ['', ' K', ' M', ' B'];
          const divisor = 1e3;
          let index = 0;
          let isNegative = false;

          if (num < 0) {
               isNegative = true;
               num = Math.abs(num);
               originalName = Math.abs(originalName);
          }

          while (num >= divisor && index < suffixes.length - 1) {
               num /= divisor;
               index++;
          }

          let formattedNum = isScale ? num.toFixed(3).replace(/\.?0+$/, '') + suffixes[index] : sepNumbers(originalName);

          if (isNegative) {
               formattedNum = formatNavigateNumber ? `(${formattedNum})` : `-${formattedNum}`;
          }

          return `\u200e${formattedNum}`;
     } catch (error) {
          console.error(error);
          return '−';
     }
};

export const dateFormatter = (v: string | number, format: 'date' | 'time' | 'datetime' | 'datetimeSec') => {
     const formats: Record<typeof format, string> = {
          time: 'HH:mm',
          date: 'YYYY/MM/DD',
          datetime: 'YYYY/MM/DD HH:mm',
          datetimeSec: 'YYYY/MM/DD HH:mm:ss',
     };

     const d = dayjs(v ?? new Date()).calendar('jalali');
     if (d.isValid()) return d.format(formats[format]);

     return '−';
};

export const isBetween = (min: number, value: number, max: number): boolean => value >= min && value <= max;

export const getHeightsForTables = (): Record<'rowHeight' | 'headerHeight', number> => {
     try {
          const rowHeight = 40;
          const headerHeight = 32;

          return { rowHeight, headerHeight };
     } catch (error) {
          console.error(error);
          return { rowHeight: 40, headerHeight: 32 };
     }
};

export const isObjectNotNull = <T>(obj: T | null): obj is T => {
     return typeof obj === 'object' && obj !== null;
};
export const uid = () => {
     return Date.now().toString(36) + Math.random().toString(36).slice(2);
};

export const toEnglishNumber = (str: string): string => {
     const persianNumbers = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
     const arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];

     for (let i = 0; i < 10; i++) {
          str = str.replace(persianNumbers[i], String(i)).replace(arabicNumbers[i], String(i));
     }

     return str;
};

export const convertStringToInteger = (inputString: string): string => toEnglishNumber(inputString).replace(/[^\d]/g, '');
export const getColorClassBasedAmount = (
     value: number,
     positiveColor: boolean | undefined = true,
     variant: 'text' | 'bg' = 'text'
) => {
     const colorMappings = {
          positive: `${variant}-content-success-buy`,
          negative: `${variant}-content-error-sell`,
          neutral: `${variant}-content-title`,
     };
     if (value > 0 && positiveColor) {
          return colorMappings.positive;
     } else if (value < 0) {
          return colorMappings.negative;
     } else {
          return colorMappings.neutral;
     }
};

export const removeDuplicatesCustomerISINs = <T extends { customerISIN: string }>(arr: T[]): T[] => {
     const array: string[] = [];

     const res = arr.filter(item => {
          if (!array.includes(item.customerISIN)) {
               array.push(item.customerISIN);
               return true;
          }
          return false;
     });

     return res;
};

export const getCodalLink = (title?: string): string => {
     return title ? `http://www.codal.ir/ReportList.aspx?search&Symbol=${title}` : 'http://www.codal.ir';
};

export const getTSELink = (insCode?: string | number): string => {
     return insCode ? `http://tsetmc.com/Loader.aspx?ParTree=151311&i=${insCode}` : 'http://tsetmc.com';
};

// temporary add use in login page
export const base64 = {
     _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
     encode: function (e: string) {
          let t = '';
          let n, r, i, s, o, u, a;
          let f = 0;
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
     decode: function (e: string) {
          let t = '';
          let n, r, i;
          let s, o, u, a;
          let f = 0;
          // eslint-disable-next-line no-useless-escape
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
     _utf8_encode: function (e: string) {
          e = e.replace(/\r\n/g, '\n');
          let t = '';
          for (let n = 0; n < e.length; n++) {
               const r = e.charCodeAt(n);
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
     _utf8_decode: function (e: string) {
          let t = '';
          let n = 0;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          let r = (c1 = c2 = 0);
          while (n < e.length) {
               r = e.charCodeAt(n);
               if (r < 128) {
                    t += String.fromCharCode(r);
                    n++;
               } else if (r > 191 && r < 224) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    c2 = e.charCodeAt(n + 1);
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    t += String.fromCharCode(((r & 31) << 6) | (c2 & 63));
                    n += 2;
               } else {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    c2 = e.charCodeAt(n + 1);
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    c3 = e.charCodeAt(n + 2);
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    t += String.fromCharCode(((r & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    n += 3;
               }
          }
          return t;
     },
};

export const handleValidity = (validity: TValidity): TValidity => {
     if (validity === 'Week' || validity === 'Month') return 'GoodTillDate';
     return validity;
};

export const generateSourceOrder = (source: string, side: TSide) => {
     try {
          const sourcePosition = source?.split('-')[0];
          // if (side === 'Sell' && symbolData?.isOption) {
          if (side === 'Sell') {
               if (sourcePosition === 'Position') return sourcePosition;
               return source;
          }
          return undefined;
     } catch {
          return undefined;
     }
};

export const createQueryKeyByParams = <T>(params: T) => {
     return Object.entries(params as Record<string, unknown>)
          .filter(
               ([, value]) =>
                    value !== undefined &&
                    value !== null &&
                    (typeof value === 'number' ||
                         (typeof value === 'string' && value !== '') ||
                         (Array.isArray(value) && value.length > 0))
          )
          .map(([key, value]) => ({ [key]: value }));
};

export const cleanObjectOfFalsyValues = <T extends Record<string, any>>(object: T): Partial<T> => {
     const result: Partial<T> = {};
     for (const [key, value] of Object.entries(object)) {
          if (value) {
               result[key as keyof T] = value as T[keyof T]; // Ensure type alignment
          }
     }
     return result;
};

export const dayAsJalali = (v: dayjs.ConfigType) => {
     return dayjs(v, {
          // @ts-expect-error: dayjs does not recognize jalali
          jalali: true,
     });
};

// DatePicker Helper
export const isBefore = (date1: Date, date2 = new Date()): boolean => {
     const year1 = date1.getFullYear();
     const month1 = date1.getMonth();
     const day1 = date1.getDate();

     const year2 = date2.getFullYear();
     const month2 = date2.getMonth();
     const day2 = date2.getDate();

     return year1 < year2 || (year1 === year2 && (month1 < month2 || (month1 === month2 && day1 < day2)));
};

export const isSameOrAfter = (date1: Date, date2 = new Date()): boolean => {
     const year1 = date1.getFullYear();
     const month1 = date1.getMonth();
     const day1 = date1.getDate();

     const year2 = date2.getFullYear();
     const month2 = date2.getMonth();
     const day2 = date2.getDate();

     return year1 > year2 || (year1 === year2 && (month1 > month2 || (month1 === month2 && day1 >= day2)));
};

export const isSameOrBefore = (date1: Date, date2 = new Date()): boolean => {
     const year1 = date1.getFullYear();
     const month1 = date1.getMonth();
     const day1 = date1.getDate();

     const year2 = date2.getFullYear();
     const month2 = date2.getMonth();
     const day2 = date2.getDate();

     return year1 < year2 || (year1 === year2 && (month1 < month2 || (month1 === month2 && day1 <= day2)));
};

export const factoryQueryKey = <T extends object>(obj: T): string => {
     const sortObj = {} as T;

     (Object.keys(obj) as Array<keyof T>).sort().forEach(k => {
          sortObj[k] = obj[k];
     });

     return JSON.stringify(sortObj);
};

export const oneDayAgo = () => {
     let date: number | Date = new Date();

     date = date.getTime();

     return new Date(date - getDateMilliseconds.Day);
};

export const oneMonthAgo = (n = 1): Date => {
     let d: number | Date = new Date();

     d.setHours(0, 0, 0, 0);
     d = d.getTime();

     return new Date(d - getDateMilliseconds.Month * n);
};

export const today = (): Date => {
     let d: number | Date = new Date();

     d.setHours(23, 59, 59, 0);
     d = d.getTime();

     return new Date(d);
};

export const calculateDateRange = (date: Exclude<TDate, 'custom'>, reverse = false): Record<'fromDate' | 'toDate', Date> => {
     if (reverse === true) {
          const fromDate = today();

          let toDate: Date | number = new Date(fromDate);
          toDate.setHours(0, 0, 0, 0);
          toDate = toDate.getTime();

          if (date === 'day') toDate += getDateMilliseconds.Day;
          if (date === 'week') toDate += getDateMilliseconds.Week;
          if (date === 'month') toDate += getDateMilliseconds.Month;
          if (date === 'year') toDate += getDateMilliseconds.Year;

          return { fromDate: new Date(fromDate), toDate: new Date(toDate) };
     }

     const toDate = today();

     let fromDate: Date | number = new Date(toDate);
     fromDate.setHours(0, 0, 0, 0);
     fromDate = fromDate.getTime();

     if (date === 'day') fromDate -= getDateMilliseconds.Day;
     if (date === 'week') fromDate -= getDateMilliseconds.Week;
     if (date === 'month') fromDate -= getDateMilliseconds.Month;
     if (date === 'year') fromDate -= getDateMilliseconds.Year;

     return { fromDate: new Date(fromDate), toDate: new Date(toDate) };
};
