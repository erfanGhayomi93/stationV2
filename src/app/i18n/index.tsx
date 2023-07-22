import i18n from 'i18next';
import Backend, { ChainedBackendOptions } from 'i18next-chained-backend';
import HttpApi from 'i18next-http-backend';
import resourcesToBackend from 'i18next-resources-to-backend';
import { I18nextProvider } from 'react-i18next';
import faTranslation from "./fa/fa.json";

const localResources = {
    fa: {
        translation: faTranslation,
    },
};

i18n.use(Backend).init<ChainedBackendOptions>({
    backend: {
        backends: [
            HttpApi, //primary
            resourcesToBackend(localResources), // fallback ,
        ],
        backendOptions: [
            {
                // loadPath: 'https://resource.ramandtech.com/JsonResource/RamandTrader_Fa_00.json',
                loadPath: '',
            },
        ],
    },
    fallbackLng: 'fa',
    lng: 'fa',
    preload: ['fa'],
});


const TranslatorProvider = ({ children }: any) => <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;

export default TranslatorProvider;