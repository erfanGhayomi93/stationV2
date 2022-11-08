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
            <button className="flex items-center justify-center p-1 text-L-primary-50 dark:text-D-primary-50">
                <EyePlusIcon width={23} height={23} onClick={() => setIsOpen(true)} data-cy="add-symbol-to-watchlist" />
            </button>
            {isOpen && <AddToWatchlistModal {...{ isOpen, setIsOpen, symbolISIN }} />}
        </div>
    );
};

export default AddToWatchlistButton;
