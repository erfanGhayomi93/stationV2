import Tippy from '@tippyjs/react';
import { FC, useState } from 'react';
import { EyePlusIcon } from 'src/common/icons';
import { AddToWatchlistModal } from './AddToWatchlistModal';

interface IAddToWatchlistButtonType {
    symbolISIN: string;
}

const AddToWatchlistButton: FC<IAddToWatchlistButtonType> = ({ symbolISIN }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <Tippy content="افزودن نماد به دیده‌بان" className="text-xs">
                <button className='flex items-center'>
                    <EyePlusIcon
                        className='text-L-gray-600 dark:text-D-gray-600'
                        onClick={() => setIsOpen(true)} data-cy="add-symbol-to-watchlist"
                    />
                </button>
            </Tippy>
            {isOpen && <AddToWatchlistModal {...{ isOpen, setIsOpen, symbolISIN }} />}
        </div>
    );
};

export default AddToWatchlistButton;
