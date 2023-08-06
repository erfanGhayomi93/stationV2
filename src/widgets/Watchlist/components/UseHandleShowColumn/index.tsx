import { ICellRendererParams } from 'ag-grid-community';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ColDefType } from 'src/common/components/AGTable';
import ChangeCellRenderer from 'src/common/components/AGTable/CellRenderer/ChangeCellRenderer';
import useLocalStorage from 'src/common/hooks/useLocalStorage';
import { useSetState, useWatchListState } from '../../context/WatchlistContext';
import ActionCellRenderer from '../ActionCellRenderer/ActionCellRenderer';
import { ClosingPrice, LastTradedPrice } from '../CellRenderer';

export const UseHandleShowColumn = () => {
    const {
        state: { listShowColumn },
    } = useWatchListState();

    const setState = useSetState();

    const { t } = useTranslation();

    const [watchListTableLocal, setWatchListTableLocal] = useLocalStorage<string[] | null>('watchListTable', null);

    const handleIsSHowColumn = (field: string) => {
        return !listShowColumn.includes(field);
    };

      ////////////////////initialState listShowColumn//////////////////////////////////////////
      const setDefaultColumn = () => {
        setState({ type: 'CHANGE_IS_SHOW_COLUMN', value: Columns.filter((item) => item.hasOwnProperty('hide')).map((item: any) => item?.field) });
    };
    
    useEffect(() => {
        if (!watchListTableLocal) setDefaultColumn();
        else setState({ type: 'CHANGE_IS_SHOW_COLUMN', value: watchListTableLocal });
    }, []);

    ///////////////////////listener for set localStorage///////////////////////
    useEffect(() => {
        setWatchListTableLocal(listShowColumn);
    }, [listShowColumn]);


    const Columns = useMemo(
        (): ColDefType<ISymbolType>[] => [
            { headerName: 'نماد', field: 'symbolTitle' },
            {
                headerName: 'آخرین قیمت',
                field: 'lastTradedPrice',
                cellRenderer: LastTradedPrice,
                hide: handleIsSHowColumn('lastTradedPrice'),
            },
            {
                headerName: 'قیمت پایانی',
                field: 'closingPrice',
                cellRenderer: ClosingPrice,
                hide: handleIsSHowColumn('closingPrice'),
            },
            {
                headerName: 'حجم تقاضا',
                field: 'bestBuyLimitQuantity_1',
                type: 'abbreviatedNumber',
                cellClass: 'bg-L-success-101 dark:bg-D-success-101',
                hide: handleIsSHowColumn('bestBuyLimitQuantity_1'),
            },
            {
                headerName: 'قیمت تقاضا',
                field: 'bestBuyLimitPrice_1',
                type: 'sepratedNumber',
                cellClass: 'bg-L-success-101 dark:bg-D-success-101',
                hide: handleIsSHowColumn('bestBuyLimitPrice_1'),
            },
            {
                headerName: 'قیمت عرضه',
                field: 'bestSellLimitPrice_1',
                type: 'sepratedNumber',
                hide: handleIsSHowColumn('bestSellLimitPrice_1'),
                // cellRenderer: ChangeCellRenderer,
                cellClass: 'bg-L-error-101 dark:bg-D-error-101',
            },
            {
                headerName: 'حجم عرضه',
                field: 'bestSellLimitQuantity_1',
                type: 'abbreviatedNumber',
                // cellRenderer: ChangeCellRenderer,
                cellClass: 'bg-L-error-101 dark:bg-D-error-101',
                hide: handleIsSHowColumn('bestSellLimitQuantity_1'),
            },
            {
                headerName: 'حجم',
                field: 'totalNumberOfSharesTraded',
                type: 'abbreviatedNumber',
                cellRenderer: ChangeCellRenderer,
                hide: handleIsSHowColumn('totalNumberOfSharesTraded'),
            },
            {
                headerName: 'ارزش',
                field: 'totalTradeValue',
                type: 'abbreviatedNumber',
                cellRenderer: ChangeCellRenderer,
                hide: handleIsSHowColumn('totalTradeValue'),
            },
            {
                headerName: 'بیشترین',
                field: 'highestTradePriceOfTradingDay',
                type: 'sepratedNumber',
                cellRenderer: ChangeCellRenderer,
                hide: handleIsSHowColumn('highestTradePriceOfTradingDay'),
            },
            {
                headerName: 'کمترین',
                field: 'lowestTradePriceOfTradingDay',
                type: 'sepratedNumber',
                cellRenderer: ChangeCellRenderer,
                hide: handleIsSHowColumn('lowestTradePriceOfTradingDay'),
            },
            // {
            //     headerName: 'نوع بازار',
            //     field: 'exchange',
            //     valueFormatter: ({ data }) => t('exchange_type.' + data?.exchange) || '-',
            //     cellRenderer: ChangeCellRenderer,
            //     hide: handleIsSHowColumn('exchange'),
            // },
            {
                headerName: 'عملیات',
                cellRenderer: ({ data }: ICellRendererParams<ISymbolType>) => <ActionCellRenderer {...(data as any)} />,
                field: 'actions',
            },
        ],
        [listShowColumn],
    );


    return { columns: Columns };
};
