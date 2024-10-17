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
 
     const res = arr.filter((item) => {
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
