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
                        50: '#81D4FA',
                    },
                    gray: {
                        50: '#F0F6FF',
                        100: '#F3F7FB',
                        200: '#EBF0F5',
                        300: '#E2EBF3',
                        400: '#C6D8E7',
                        500: '#939CAD',
                        600: '#5E6781',
                        700: '#333333',
                    },
                    error: {
                        50: '#FFF4F4',
                        100: '#F7CFCF',
                        200: '#E84830',
                        101: "rgb(224, 64, 64 , 0.3)",//must be deleted 
                        300: '#CE3636',
                    },
                    success: {
                        50: '#F3FFF9',
                        100: '#C3E9D5',
                        200: '#15B761',
                        101: 'rgba(167, 223, 193, 0.3)',// must be deleted
                        300: '#0A9E50',
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
                    blue: {
                        50: '#07294A',
                        100: '#041D37',
                        200: '#0C4073',
                        300: '#133F8E',
                    }
                },
                D: {
                    primary: {
                        50: '#A9BDEC', 
                        100: '#202A41',
                    },
                    secondary: {
                        50: '#81D4FA',
                    },
                    gray: {
                        50: '#111418',
                        100: '#262F39',
                        200: '#2F333D',
                        300: '#3B4654',
                        400: '#546478',
                        500: '#ABB6C4',
                        600: '#BBCEDD',
                        700: '#F0F3FA',
                    },
                    error: {
                        50: '#110303',
                        100: '#6E3437',
                        200: '#ED5454',
                        300: '#CE3636',
                    },
                    success: {
                        50: '#03110A',
                        100: '#143D2A',
                        200: '#15B761',
                        300: '#0A9E50', 
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
                    blue: {
                        50: '#07294A',
                        100: '#041D37',
                        200: '#3F455B ',
                        300: '#8AA3DE',
                    }
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
                '14': 'repeat(14, minmax(0, 1fr))',
                '16': 'repeat(16, minmax(0, 1fr))',
                '18': 'repeat(18, minmax(0, 1fr))',
                '20': 'repeat(20, minmax(0, 1fr))',
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
