/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                L: {
                    basics: {
                        10: '#F5F5F5',
                        20: '#171840',
                    },
                    primary: {
                        10: '#254A6F',
                        20: '#2E4256',
                    },
                    menu: {
                        10: '#C5D6E7',
                        20: '#166BF3',
                    },
                    gray: {
                        5: '#DEDCE4',
                        10: '#F9FAFB',
                        20: '#F0F4F9',
                        30: '#EDF2F8',
                        40: '#D4E0ED',
                        50: '#ADB3C2',
                        60: '#969FB0',
                        70: '#7E89A0',
                        80: '#454C5E',
                    },
                    yellow: {
                        10: '#FFB11A',
                        20: '#F4A203',
                    },
                    red: {
                        10: '#F7CFCF',
                        20: '#E04040',
                    },
                    green: {
                        10: '#A7DFC1',
                        20: '#24AE64',
                    },
                    blue: {
                        10: '#939CAD',
                        20: '#254A6F',
                    },
                    black: {
                        10: '#333333',
                        20: '#130F26',
                    },
                },
                D: {
                    basics: {
                        10: '#1B1C22',
                        20: '#000000',
                    },
                    primary: {
                        10: '#254A6F',
                        20: '#2E4256',
                    },
                    menu: {
                        10: '#C5D6E7',
                    },
                    gray: {
                        10: '#F9FAFB',
                        20: '#F0F4F9',
                        30: '#EDF2F8',
                        40: '#D4E0ED',
                        50: '#ADB3C2',
                        60: '#969FB0',
                        70: '#7E89A0',
                        80: '#454C5E',
                    },
                    yellow: {
                        10: '#FFB11A',
                        20: '#F4A203',
                    },
                    red: {
                        10: '#F7CFCF',
                        20: '#E04040',
                    },
                    green: {
                        10: '#A7DFC1',
                        20: '#24AE64',
                    },
                    blue: {
                        10: '#939CAD',
                        20: '#254A6F',
                    },
                    black: {
                        10: '#333333',
                        20: '#130F26',
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
            },
        },
    },
    plugins: [
        plugin(function ({ addBase, theme }) {
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
        }),
    ],
};
