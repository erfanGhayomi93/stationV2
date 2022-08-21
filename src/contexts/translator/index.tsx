import React from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import { I18nextProvider } from 'react-i18next';

// Initialize i18next
i18n.use(initReactI18next)
    .use(HttpApi)
    .init({
        backend: {
            loadPath: './assets/json/appResources.json',
        },
        load: 'languageOnly',
        // debug: true,
        lng: 'fa',
        fallbackLng: 'fa',
        // react: {
        //     useSuspense: false, //   <---- this will do the magic
        // },
    });

const TranslatorProvider = ({ children }: any) => {
    //
    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default TranslatorProvider;
