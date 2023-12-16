import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getTheme, setAppTheme } from 'src/redux/slices/ui';

const BrokerData = () => {
    const { t } = useTranslation();
    const theme = useAppSelector(getTheme)

    const appDispatch = useAppDispatch();
    const BrokerCode = +window.REACT_APP_BROKER_CODE;

    // const brokers = useMemo(
    //     () => [
    //         {
    //             id: 347,
    //             title: 'کارگزاری فارابی',
    //             src: `logo_${BrokerCode}.svg`,
    //         },
    //         {
    //             id: 189,
    //             title: 'کارگزاری توسعه سهند',
    //             src: `logo_${BrokerCode}.svg`,
    //         },
    //     ],
    //     [],
    // );

    // const userBroker = useMemo(() => brokers.find((broker) => broker.id === BrokerCode), []);
    // if (!userBroker) return <></>;

    return (
        <div className="flex items-center pl-5">
            <span className="ml-2">
                <img className="h-[45px] aspect-square" src={'/assets/images/logo_' + BrokerCode + ".svg"} />
            </span>
            <span className="font-semibold">{t('headerSec.' + BrokerCode + '_LogoTitle')}</span>
        </div>
    );
};

export default BrokerData;
