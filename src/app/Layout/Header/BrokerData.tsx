import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getTheme, setAppTheme } from 'src/redux/slices/ui';

const BrokerData = () => {
    //
    const theme = useAppSelector(getTheme)

    const appDispatch = useAppDispatch();
    const BrokerCode = +window.REACT_APP_BROKER_CODE;

    const brokers = useMemo(
        () => [
            {
                id: BrokerCode,
                title: 'کارگزاری فارابی',
                src: `logo_${BrokerCode}.svg`,
            },
        ],
        [],
    );

    const userBroker = useMemo(() => brokers.find((broker) => broker.id === 189), []);
    const { t } = useTranslation();
    if (!userBroker) return <></>;

    return (
        <div className="flex items-center pl-5" onClick={() => appDispatch(setAppTheme(theme === 'dark' ? 'light' : 'dark'))}>
            <span className="ml-2">
                <img className="h-[45px] aspect-square" src={'/assets/images/' + userBroker.src} />
            </span>
            <span className="font-semibold">{t('headerSec.' + BrokerCode + '_LogoTitle')}</span>
        </div>
    );
};

export default BrokerData;
