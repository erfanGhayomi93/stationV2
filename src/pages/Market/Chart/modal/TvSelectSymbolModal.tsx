import { useEffect, useRef, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useTradingState } from '../context';
import { setSelectedSymbol } from 'src/redux/slices/option';
import { useAppDispatch } from 'src/redux/hooks';
import ipcMain from 'src/common/classes/IpcMain';
import Draggable from 'src/common/components/Draggable/Draggable';
import Loading from 'src/common/components/Loading/Loading';
import NoData from 'src/common/components/NoData/NoData';
import { CloseIcon, Search } from 'src/common/icons';
import { useRecentSymbolHistory, useSymbolSearchQuery } from 'src/app/queries/tradingView';

type RowType = {
    symbolTitle: string;
    companyTitle: string;
    exchange: string;
    onClick: () => void;
};

const Row = ({ symbolTitle, companyTitle, exchange, onClick }: RowType) => (
    <div
        onClick={onClick}
        style={{
            minHeight: '2.75rem',
            maxHeight: '2.75rem',
        }}
        tabIndex={-1}
        role="button"
        className="flex items-center cursor-pointer justify-between hover:bg-L-gray-200 dark:hover:bg-D-gray-200 odd:bg-L-gray-100 dark:odd:bg-D-gray-100 transition-colors px-6"
    >
        <div style={{ width: '5.6rem' }} className="overflow-hidden">
            <span className="truncate text-right text-sm font-normal text-L-gray-700 dark:text-D-gray-700">{symbolTitle}</span>
        </div>
        <div className="overflow-hidden flex-1">
            <span className="truncate text-sm font-normal text-L-gray-700 dark:text-D-gray-700">{companyTitle}</span>
        </div>
        <div style={{ width: '8rem' }} className="overflow-hidden">
            <span className="truncate text-sm font-normal text-L-gray-700 dark:text-D-gray-700">{exchange}</span>
        </div>
    </div>
);

type TvSelectSymbolModalProps = {
    actionId: 'compare' | 'symbol_search';
};

const TvSelectSymbolModal = ({ actionId }: TvSelectSymbolModalProps) => {
    const { t } = useTranslation();

    const location = useLocation();

    const timer = useRef<NodeJS.Timeout | undefined>(undefined);

    const [search, setSearch] = useState('');

    const { setState } = useTradingState();
    const dispatch = useAppDispatch();

    const {
        data: symbolData,
        refetch,
        isFetching,
        remove: removeSymbolData,
    } = useSymbolSearchQuery(search, {
        enabled: false,
    });

    const { data: recentSymbol } = useRecentSymbolHistory({type: "TradingView"});

    const symbols = useMemo(() => {
        if (!search.length) {
            removeSymbolData();
            return recentSymbol;
        }

        return symbolData;
    }, [symbolData, search]);

    const onClose = () => {
        /* both have to false*/
        if (actionId === 'symbol_search') {
            setState({ type: 'Toggle_Modal_TV', value: 'tvSymbolSearchModal' });
            return;
        }
        setState({ type: 'Toggle_Modal_TV', value: 'tvCompareModal' });
    };

    const onChangeInput = (value: string) => {
        setSearch(value);

        if (timer.current) clearTimeout(timer.current);

        if (!value || value.length < 2) return;

        timer.current = setTimeout(() => {
            refetch();
        }, 500);
    };

    const onClickRow = (symbol: SearchSymbolType) => {
        if (actionId === 'symbol_search') {
            dispatch(setSelectedSymbol(symbol.symbolISIN));
            return;
        }

        ipcMain.send('tv_chart:compare_symbol', symbol.symbolISIN);
    };

    useEffect(() => {
        const pathname = location.pathname.replace(/\/$/g, '');
        if (pathname !== '/Market/Chart') onClose();
    }, [location]);

    return (
        <Draggable>
            <div
                style={{
                    width: '50rem',
                    minHeight: '30rem',
                    maxHeight: '30rem',
                }}
                className="bg-L-basic dark:bg-D-basic flex flex-col shadow-md rounded overflow-hidden"
            >
                <div className="flex justify-between items-center bg-L-blue-50 dark:bg-D-blue-50 cursor-grab pr-4 py-3">
                    <div className="moveable flex items-center flex-1 h-full">
                        <span className="font-medium text-base text-white">{t(`tv_chart.tv_${actionId}_modal_title`)}</span>
                    </div>

                    <button role="button" type="button" onClick={onClose} className="flex items-center text-white justify-center px-4">
                        <CloseIcon />
                    </button>
                </div>

                <div className="flex flex-col flex-1 overflow-hidden gap-8">
                    <div className="relative w-full py-4 px-6">
                        <label className="relative flex bg-L-basic dark:bg-D-basic items-center rounded overflow-hidden border border-L-gray-500 dark:border-D-gray-500 text-L-gray-500 dark:text-D-gray-500">
                            <span className="flex items-center justify-center px-4 h-10">
                                <Search width="1.25rem" height="1.25rem" />
                            </span>

                            <input
                                type="text"
                                value={search}
                                autoFocus
                                onChange={(e) => onChangeInput(e.target.value)}
                                placeholder={t('tv_chart.tv_symbol_search_placeholder')}
                                className="rounded flex-1 bg-transparent text-sm font-normal h-10 outline-0"
                            />

                            <div className="flex items-center absolute text-L-gray-500 dark:text-D-gray-500 left-3">
                                {search.length > 2 && (
                                    <button role="button" type="button" className="cursor-pointer text-sm" onClick={() => setSearch('')}>
                                        <CloseIcon width="0.8rem" height="0.8rem" />
                                    </button>
                                )}

                                {search.length < 2 && <span className="pointer-events-none text-sm">{t('tv_chart.enter_less_than_two_char')}</span>}
                            </div>
                        </label>
                    </div>

                    <div className="flex relative flex-1 overflow-y-auto">
                        {!symbols || symbols.length === 0 ? (
                            <NoData />
                        ) : isFetching ? (
                            <Loading />
                        ) : (
                            <div className="flex overflow-hidden flex-col flex-1 gap-4">
                                <div className="flex items-center justify-between px-6">
                                    <div style={{ width: '9rem' }}>
                                        <span className="text-base font-normal text-L-gray-700 dark:text-D-gray-700">
                                            {t('tv_chart.tv_modal_symbol_column')}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <span className="text-base font-normal text-L-gray-700 dark:text-D-gray-700">
                                            {t('tv_chart.tv_modal_description_column')}
                                        </span>
                                    </div>
                                    <div style={{ width: '8rem' }}>
                                        <span className="text-base font-normal text-L-gray-700 dark:text-D-gray-700">
                                            {t('tv_chart.tv_modal_exchange_column')}
                                        </span>
                                    </div>
                                </div>

                                <div className="overflow-y-auto flex-1">
                                    <div className="flex overflow-auto h-full flex-col gap-1">
                                        {symbols.map((symbol) => (
                                            <Row
                                                key={symbol.symbolISIN}
                                                symbolTitle={symbol.symbolTitle}
                                                companyTitle={symbol.companyName}
                                                exchange={t('market_unit.' + symbol.marketUnit.toLowerCase())}
                                                onClick={() => onClickRow(symbol)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Draggable>
    );
};

export default TvSelectSymbolModal;
