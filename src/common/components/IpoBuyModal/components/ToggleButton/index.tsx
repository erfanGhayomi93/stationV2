import Tippy from '@tippyjs/react';
import { BuySellToggleCloseIcon, BuySellToggleOpenIcon } from 'src/common/icons';

type Props = { isOpen: boolean; onClick: () => void };

const ToggleButton = ({ isOpen, onClick }: Props) => {
    return (
        <Tippy content={isOpen ? 'بستن اطلاعات' : 'اطلاعات بیشتر'}>
            <button onClick={onClick} className="text-L-gray-600 bg-white h-12 w-full flex items-center rounded-l-lg">
                {isOpen ? <BuySellToggleCloseIcon /> : <BuySellToggleOpenIcon />}
            </button>
        </Tippy>
    );
};

export default ToggleButton;
