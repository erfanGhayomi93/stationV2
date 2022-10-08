/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                menu: {
                    DEFAULT: '#ECF4FE',
                },
                L: {
                    primary: {
                        50: '#135CA4',
                        100: '#D6E9FF',
                    },
                    secondary: {
                        50: '#0C73E9',
                        100: '#1E52B0',
                        150: '#133F8E',
                        200: '#04264E',
                    },
                    gray: {
                        50: '#F0F6FF',
                        100: '#F3F7FB',
                        150: '#F1F5F9',
                        200: '#F0F5FA',
                        250: '#E2EBF3',
                        300: '#DFEBF5',
                        350: '#C6D8E7',
                        400: '#939CAD',
                        450: '#566978',
                        500: '#333333',
                    },
                    error: {
                        50: '#FFF4F4',
                        100: '#F7CFCF',
                        150: '#E84830',
                    },
                    success: {
                        50: '#F3FFF9',
                        100: '#A7DFC1',
                        150: '#15B761',
                    },
                    warning: {
                        DEFAULT: '#F5A300',
                    },
                    basic: {
                        DEFAULT: '#FFFFFF',
                    },
                    info: {
                        50: '#A1DDFF',
                        100: '#4895EF',
                    },
                },
                D: {
                    primary: {
                        50: '#A9BDEC',
                        100: '#202A41',
                    },
                    secondary: {
                        50: '#0C73E9',
                        100: '#1E52B0',
                        150: '#133F8E',
                        200: '#04264E',
                    },
                    gray: {
                        50: '#111418',
                        100: '#262F39',
                        150: '#2A323C',
                        200: '#2D3640',
                        250: '#3B4654',
                        300: '#394656',
                        350: '#546478',
                        400: '#ABB6C4',
                        450: '#BBCEDD',
                        500: '#F0F3FA',
                    },
                    error: {
                        50: '#110303',
                        100: '#6E3437',
                        150: '#ED5454',
                    },
                    success: {
                        50: '#03110A',
                        100: '#175B3C',
                        150: '#15B761',
                    },
                    warning: {
                        DEFAULT: '#F5A300',
                    },
                    basic: {
                        DEFAULT: '#191E24',
                    },
                    info: {
                        50: '#A1DDFF',
                        100: '#4895EF',
                    },
                },
            },
            fontSize: {
                0.5: '0.3125rem',
                0.6: '0.375rem',
                0.7: '0.4375rem',
                0.8: '0.5rem',
                0.9: '0.5625rem',
                1: '0.625rem',
                1.1: '0.6875rem',
                1.2: '0.75rem',
                1.3: '0.8125rem',
                1.4: '0.875rem',
                1.5: '0.938rem',
                1.6: '1rem',
                1.7: '1.063rem',
                1.8: '1.125rem',
                1.9: '1.188rem',
                2: '1.25rem',
                2.1: '1.313rem',
                2.2: '1.375rem',
                2.3: '1.438rem',
                2.4: '1.5rem',
            },
            gridTemplateColumns: {
                'min-one': '1fr min-content;',
                'one-min': 'min-content 1fr;',
            },
            gridTemplateRows: {
                'min-one': 'min-content 1fr;',
                'min-one-min': 'min-content 1fr min-content;',
                'one-min': '1fr min-content;',
                '60-40': '60fr 40fr',
            },
        },
    },
    plugins: [
        plugin(function ({ addBase, theme, addVariant }) {
            addBase({
                '.bar': {
                    overflowY: 'auto',
                    scrollbarColor: `${theme('colors.slate.600')} ${theme('colors.slate.200')}`,
                    scrollbarWidth: 'thin',
                },
                '.bar::-webkit-scrollbar': {
                    height: '5px',
                    width: '5px',
                },
                '.bar::-webkit-scrollbar-thumb': {
                    backgroundColor: theme('colors.slate.400'),
                    borderRadius: '100vh',
                },
                '.bar::-webkit-scrollbar-track-piece': {
                    backgroundColor: theme('colors.slate.200'),
                },
            });
            addVariant('actived', '&[data-actived="true"]');
        }),
    ],
};
