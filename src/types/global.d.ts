//

interface Window {
    APP_ENV: 'production' | 'development';
    baseURL: string;
}

declare module '*.svg' {
    import React = require('react');
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}
