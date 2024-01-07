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

    const handleClick = () => (type === 'close' ? onClose?.() : onOpen?.());

    return (
        <>
            <button className="w-full flex justify-center items-center mb-1" onClick={handleClick} data-cy="toggle-sider">
                <img className="h-[45px] aspect-square brightness-0 invert" src={'/assets/images/' + src} />
                {type === 'close' && <span className="pr-2"> {t('headerSec.' + BrokerCode + '_LogoTitle')}</span>}
            </button>
            <button
                onClick={handleClick}
                className="w-[calc(100%+6px)] h-7 pl-2 gap-2 self-start rounded-l-lg flex items-center bg-L-blue-50 dark:bg-D-blue-50"
            >
                <span className="h-[1px] flex-1 bg-gray-500"></span>
                <ChevronIcon className={`-rotate-90 w-2 h-3 ${type === 'close' ? 'rotate-90' : ''}`} />
            </button>
        </>
    );
};

export default ToggleSlider;
