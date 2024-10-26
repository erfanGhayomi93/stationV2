import clsx from 'clsx';
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';

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

export const numFormatter = (num: number, formatNavigateNumber = true) => {
     try {
          if (isNaN(num)) return '−';

          const suffixes = ['', ' K', ' M', ' B', ' T'];
          const divisor = 1e3;
          let index = 0;
          let isNegative = false;

          if (num < 0) {
               isNegative = true;
               num = Math.abs(num);
          }

          while (num >= divisor && index < suffixes.length - 1) {
               num /= divisor;
               index++;
          }

          let formattedNum = num.toFixed(3).replace(/\.?0+$/, '') + suffixes[index];

          if (isNegative) {
               formattedNum = formatNavigateNumber ? `(${formattedNum})` : `-${formattedNum}`;
          }

          return `\u200e${formattedNum}`;
     } catch (e) {
          return '−';
     }
};

export const dateFormatter = (v: string | number, format: 'date' | 'time' | 'datetime' = 'datetime') => {
     const formats: Record<typeof format, string> = {
          time: 'HH:mm',
          date: 'YYYY/MM/DD',
          datetime: 'YYYY/MM/DD HH:mm',
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
     } catch (e) {
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
     encode: function (e: any) {
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
     decode: function (e: any) {
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
     _utf8_encode: function (e: any) {
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
     _utf8_decode: function (e: any) {
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
