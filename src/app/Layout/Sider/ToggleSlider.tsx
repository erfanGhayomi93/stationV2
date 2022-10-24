import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight } from 'src/common/icons';

type TOggleSlider = {
    onOpen?: () => void;
    onClose?: () => void;
    type: 'open' | 'close';
};

const ToggleSlider: FC<TOggleSlider> = ({ type, onOpen, onClose }) => {
    const BrokerCode = +window.REACT_APP_BROKER_CODE;
    const src = `logo_${BrokerCode}.svg`;
    const { t } = useTranslation();
    return (
        <>
            <button className="p-3 rounded-md flex items-center outline-none" onClick={onOpen}>
                <img className="h-[45px] aspect-square brightness-0 invert" src={'/assets/images/' + src} />

                {type === 'close' && <span className="pr-2">کارگزاری {t('brokerName.' + BrokerCode)}</span>}
            </button>
            <div
                className={clsx('w-full flex items-center', {
                    relative: type === 'open',
                })}
            >
                <span className="bg-gray-500 w-[calc(100%-16px)] h-[1px] block ml-1" />
                {type === 'open' && <ArrowLeft className="absolute left-[-12px] cursor-pointer z-10" width={24} height={24} onClick={onOpen} />}
                {type === 'close' && <ArrowRight className="absolute left-0 cursor-pointer z-50" width={24} height={24} onClick={onClose} />}
            </div>
        </>
    );
};

export default ToggleSlider;
