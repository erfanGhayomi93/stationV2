//

interface Window {
    APP_ENV: 'production' | 'development';
    baseURL: string;
}

declare module '*.svg' {
    const content: any;
    export default content;
}
