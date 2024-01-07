import Tippy from '@tippyjs/react';
import { HistoryIcon } from 'src/common/icons';

export const ExtraButtons = ({
    onHistoryClick,
    onSettlementClick,
    disableSettlement,
}: {
    onHistoryClick: () => void;
    onSettlementClick: () => void;
    disableSettlement?: boolean;
}) => (
    <>
        <button
            disabled={disableSettlement}
            onClick={onSettlementClick}
            className="border rounded border-[#01BC8D] text-[#01BC8D] disabled:opacity-30 disabled:cursor-not-allowed px-2 text-xs py-1"
        >
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
