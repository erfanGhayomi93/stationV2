import clsx from 'clsx';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronIcon } from 'src/common/icons';

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
            <button className="p-4 pt-0 rounded-md flex items-center outline-none" onClick={onOpen} data-cy="toggle-sider">
                <img className="h-[45px] aspect-square brightness-0 invert" src={'/assets/images/' + src} />

                {type === 'close' && <span className="pr-2"> {t('headerSec.' + BrokerCode + '_LogoTitle')}</span>}
            </button>
            <div
                className={clsx('w-full flex items-center', {
                    relative: type === 'open',
                })}
            >
                <span className="bg-gray-500 w-[calc(100%-16px)] h-[1px] block ml-1 relative">
                    <span
                        onClick={type === 'close' ? onClose : onOpen}
                        className="cursor-pointer bg-L-blue-50 dark:bg-D-blue-50 w-5 h-6 absolute -left-[22px] -top-[12px] rounded-lg flex items-center justify-center"
                    >
                        <ChevronIcon className={`-rotate-90 w-2 h-3 ${type === 'close' ? 'rotate-90' : ''}`} />
                    </span>
                </span>
                {/* {type === 'open' && <ArrowLeft className="absolute left-[-12px] cursor-pointer z-10" width={24} height={24} onClick={onOpen} />} */}
                {/* {type === 'close' && <ArrowRight className="absolute left-0 cursor-pointer z-50" width={24} height={24} onClick={onClose} />} */}
            </div>
        </>
    );
};

export default ToggleSlider;
