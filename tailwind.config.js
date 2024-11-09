/** @type {import('tailwindcss').Config} */
module.exports = {
     content: ['./src/**/*.{html,js,tsx}'],
     darkMode: 'class',
     theme: {
          extend: {
               gridTemplateColumns: {
                    'one-min': '1fr min-content;',
                    'min-one': 'min-content 1fr;',
               },
               gridTemplateRows: {
                    'min-one': 'min-content 1fr;',
                    'min-one-min': 'min-content 1fr min-content;',
                    'one-min-min': '1fr min-content min-content;',
                    'min-min-one': 'min-content min-content 1fr;',
                    'one-min': '1fr min-content;',
               },
               screens: {
                    laptop: { min: '1024px', max: '1440px' }, // Laptop screen size range
               },
               fontSize: {
                    base: '1rem',
               },
               boxShadow: {
                    none: '0 0 #0000',
                    E1: '0px -2px 8px 0px rgba(0, 0, 0, 0.08)',
                    E2: '0px 2px 10px 0px rgba(0, 0, 0, 0.05)',
                    E3: '0px 1px 8px 0px rgba(0, 0, 0, 0.08)',
                    E4: '0px 4px 10px 0px rgba(0, 0, 0, 0.10)',
                    E5: '0px 8px 12px 0px rgba(0, 0, 0, 0.12)',
                    E6: '0px 8px 16px 0px rgba(0, 0, 0, 0.16)',
                    E7: '0px 16px 24px 0px rgba(0, 0, 0, 0.16)',
                    E8: '0px 20px 24px 0px rgba(0, 0, 0, 0.24)',
               },
               borderRadius: {
                    LG: '32px',
               },
          },
          colors: {
               transparent: 'rgb(0,0,0,0)',
               black: 'rgb(0,0,0)',
               white: 'rgb(255,255,255)',
               'content-title': 'rgb(var(--color-content-title))',
               'icon-default': 'rgb(var(--color-icon-default))',
               'table-header': 'rgb(var(--color-table-header))',
               'table-row1': 'rgb(var(--color-table-row1))',
               'table-row2': 'rgb(var(--color-table-row2))',
               'line-div-1': 'rgb(var(--color-line-div-1))',
               'line-div-2': 'rgb(var(--color-line-div-2))',
               'line-div-3': 'rgb(var(--color-line-div-3))',
               'icon-disable': 'rgb(var(--color-icon-disable))',
               'content-paragraph': 'rgb(var(--color-content-paragraph))',
               'line-success': 'rgb(var(--color-line-success))',
               'content-deselecttab': 'rgb(var(--color-content-deselecttab))',
               'line-error': 'rgb(var(--color-line-error))',
               'content-placeholder': 'rgb(var(--color-content-placeholder))',
               'content-disable': 'rgb(var(--color-content-disable))',
               'content-success-buy': 'rgb(var(--color-content-success-buy))',
               'line-warning': 'rgb(var(--color-line-warning))',
               'content-error-sell': 'rgb(var(--color-content-error-sell))',
               'input-default': 'rgb(var(--color-input-defualt))',
               'input-active': 'rgb(var(--color-input-active))',
               'input-disable': 'rgb(var(--color-input-disable))',
               'input-focus': 'rgb(var(--color-input-focus))',
               'input-success': 'rgb(var(--color-input-success))',
               'input-error': 'rgb(var(--color-input-error))',
               'input-primary': 'rgb(var(--color-input-primary))',
               'back-surface': 'rgb(var(--color-back-surface))',
               'back-2': 'rgb(var(--color-back-2))',
               'back-modal': 'rgb(var(--color-back-modal))',
               'back-primary': 'rgb(var(--color-back-primary))',
               'back-green': 'rgb(var(--color-back-green))',
               'back-red': 'rgb(var(--color-back-red))',
               'back-info': 'rgb(var(--color-back-info))',
               'back-yellow': 'rgb(var(--color-back-yellow))',
               'button-neu': 'rgb(var(--color-button-neu))',
               'button-primary-default': 'rgb(var(--color-button-primary-default))',
               'button-primary-hover': 'rgb(var(--color-button-primary-hover))',
               'button-primary-pressing': 'rgb(var(--color-button-primary-pressing))',
               'button-primary-selected': 'rgb(var(--color-button-primary-selected))',
               'button-primary-bg-selected': 'rgb(var(--color-button-primary-bg-selected))',
               'button-success-default': 'rgb(var(--color-button-success-default))',
               'button-success-hover': 'rgb(var(--color-button-success-hover))',
               'button-success-pressing': 'rgb(var(--color-button-success-pressing))',
               'button-success-selected': 'rgb(var(--color-button-success-selected))',
               'button-success-bg-selected': 'rgb(var(--color-button-success-bg-selected))',
               'button-error-default': 'rgb(var(--color-button-error-default))',
               'button-error-hover': 'rgb(var(--color-button-error-hover))',
               'button-error-pressing': 'rgb(var(--color-button-error-pressing))',
               'button-error-selected': 'rgb(var(--color-button-error-selected))',
               'button-error-bg-selected': 'rgb(var(--color-button-error-bg-selected))',
               'button-disable-disable': 'rgb(var(--color-button-disable-disable))',
               'button-warning-default': 'rgb(var(--color-button-warning-default))',
               'button-tab-active': 'rgb(var(--color-button-tab-active))',
               'button-info-default': 'rgb(var(--color-button-info-default))',
               'button-info-hover': 'rgb(var(--color-button-info-hover))',
               'button-info-pressing': 'rgb(var(--color-button-info-pressing))',
               'button-info-selected': 'rgb(var(--color-button-info-selected))',
               'button-info-bg-selected': 'rgb(var(--color-button-info-bg-selected))',
               'button-tab-deactive': 'rgb(var(--color-button-tab-deactive))',
               'button-disable-hover': 'rgb(var(--color-button-disable-hover))',
               'button-warning-hover': 'rgb(var(--color-button-warning-hover))',
               'button-warning-pressing': 'rgb(var(--color-button-warning-pressing))',
               'button-warning-selected': 'rgb(var(--color-button-warning-selected))',
               'button-warning-bg-selected': 'rgb(var(--color-button-warning-bg-selected))',
               'notif-primary': 'rgb(var(--color-notif-primary))',
               'notif-red': 'rgb(var(--color-notif-red))',
               'content-white': 'rgb(var(--color-content-white))',
               'content-black': 'rgb(var(--color-content-black))',
               'content-selected': 'rgb(var(--color-content-selected))',
               'content-info': 'rgb(var(--color-content-info))',
               'content-warning': 'rgb(var(--color-content-warnning))',
               'nav-back-default': 'rgb(var(--color-nav-back-default))',
               'tooltip-back': 'rgb(var(--color-tooltip-back))',
               'progressbar-primary': 'rgb(var(--color-progressbar-primary))',
               'nav-back-pwa': 'rgb(var(--color-nav-back-pwa))',
               'tooltip-content': 'rgb(var(--color-tooltip-content))',
               'progressbar-primary-line': 'rgb(var(--color-progressbar-primary-line))',
               'progressbar-warning': 'rgb(var(--color-progressbar-warning))',
               'progressbar-warning-line': 'rgb(var(--color-progressbar-warning-line))',
               'progressbar-error': 'rgb(var(--color-progressbar-error))',
               'progressbar-error-line': 'rgb(var(--color-progressbar-error-line))',
               'progressbar-success': 'rgb(var(--color-progressbar-success))',
               'progressbar-success-line': 'rgb(var(--color-progressbar-success-line))',
               'nav-opened': 'rgb(var(--color-nav-opened))',
               'nav-back-primary': 'rgb(var(--color-nav-back-primary))',
               'nav-selected': 'rgb(var(--color-nav-selected))',
               'nav-default': 'rgb(var(--color-nav-default))',
               'icon-white': 'rgb(var(--color-icon-white))',
               'icon-success': 'rgb(var(--color-icon-success))',
               'icon-error': 'rgb(var(--color-icon-error))',
               'icon-warning': 'rgb(var(--color-icon-warning))',
               'icon-info': 'rgb(var(--color-icon-info))',
               'icon-primary': 'rgb(var(--color-icon-primary))',
               'icon-rivasp': 'rgb(var(--color-icon-rivasp))',
               'logo-ramand': 'rgb(var(--color-logo-ramand))',
               'scrollbar-thumb': 'rgb(var(--color-scrollbar-thumb))',
               'scrollbar-track': 'rgb(var(--color-scrollbar-track))',
          },
     },
};
