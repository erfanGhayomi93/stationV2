import i18n from 'i18next';
import HttpApi from 'i18next-http-backend';
import { I18nextProvider, initReactI18next } from 'react-i18next';

// Initialize i18next
i18n.use(initReactI18next)
    .use(HttpApi)
    .init({
        backend: {
            loadPath: 'https://resource.ramandtech.com/JsonResource/RamandTrader_Fa_00.json',
        },
        load: 'languageOnly',
        lng: 'fa',
        fallbackLng: 'fa',
    });

const TranslatorProvider = ({ children }: any) => <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;

export default TranslatorProvider;
