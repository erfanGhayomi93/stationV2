import Tippy from '@tippyjs/react';
import { HistoryIcon } from 'src/common/icons';

export const ExtraButtons = ({ onHistoryClick, onSettlementClick }: { onHistoryClick: () => void; onSettlementClick: () => void }) => (
    <>
        <button onClick={onSettlementClick} className="border rounded border-[#01BC8D] text-[#01BC8D] disabled:opacity-70 px-2 text-xs py-1">
            درخواست تسویه
        </button>
        <Tippy content={'تاریخچه'} className="text-xs">
            <button
                onClick={onHistoryClick}
                className={`text-L-gray-600 disabled:text-L-gray-400 dark:text-D-gray-600 disabled:dark:text-D-gray-400 disabled:cursor-not-allowed`}
            >
                <HistoryIcon height={20} width={20} />
            </button>
        </Tippy>
    </>
);
