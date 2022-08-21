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
