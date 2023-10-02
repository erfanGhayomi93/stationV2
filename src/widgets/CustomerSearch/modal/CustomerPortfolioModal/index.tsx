import { ICellRendererParams } from 'ag-grid-community';
import clsx from 'clsx';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCustomerPortfolio } from 'src/app/queries/portfolio';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import Modal from 'src/common/components/Modal';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { CloseIcon } from 'src/common/icons';
import { seprateNumber } from 'src/utils/helpers';
import { useCustomerSearchState } from '../../context/CustomerSearchContext';
import { pushEngine } from 'src/ls/pushEngine';
import { useCommissionValue } from 'src/common/hooks/useCommission/useCommissionValue';
import { subscriptionPortfolio } from 'src/ls/subscribes';


const CustomerPortfolioModal = () => {
    //
    const { t } = useTranslation();
    const { setState, state } = useCustomerSearchState();
    const closeModal = () => {
        setState((prev) => ({ ...prev, isPortfolioModalOpen: false, detailModalData: undefined }));
    };

    const { data, isFetching } = useCustomerPortfolio({ CustomerISIN: state?.detailModalData?.customerISIN });
    const { result: rowData } = data || {};

    useEffect(() => {
        if (rowData && rowData.length) {
            const symbols = rowData.map(({ symbolISIN }) => symbolISIN);
            subscriptionPortfolio(symbols);
        }

        return () => pushEngine.unSubscribe('portfolioSymbols');
    }, [rowData]);

    const Columns = useMemo(
        (): ColDefType<IGTPortfolioResultType>[] => [
            { headerName: t('ag_columns_headerName.symbol'), field: 'symbolTitle', cellClass: 'font-bold' },
            { headerName: t('ag_columns_headerName.count'), field: 'asset', type: 'sepratedNumber' },
            { headerName: t('ag_columns_headerName.lastPriceAverage'), field: 'averagePrice', type: 'sepratedNumber', minWidth: 150 },
            { headerName: t('ag_columns_headerName.finalCost'), field: 'bep', type: 'sepratedNumber' },
            { headerName: t('ag_columns_headerName.pureDayValue'), field: 'dayValue', type: 'sepratedNumber' },
            { headerName: t('ag_columns_headerName.headToheadPrice'), field: 'bepPrice', type: 'sepratedNumber' },
            {
                headerName: t('ag_columns_headerName.profitAndLoss'),
                field: 'lostProfitValue',
                cellRenderer: ProfitAndLoss,
            },
        ],
        [],
    );

    return (
        <Modal
            isOpen={!!state.isPortfolioModalOpen}
            onClose={closeModal}
            className="min-h-[40rem] w-3/5 bg-L-basic dark:bg-D-basic  rounded-md h-full grid"
        >
            <div className="grid grid-rows-min-one">
                <div className="w-full text-white font-semibold bg-L-blue-200 dark:bg-D-blue-200 h-10 flex items-center justify-between px-5">
                    <div>{`${t('common.customerPortfolio')} (${state.detailModalData?.title || ''})`}</div>
                    <CloseIcon onClick={closeModal} className="cursor-pointer" />
                </div>
                <WidgetLoading spining={isFetching}>
                    <div className="p-6 h-full">
                        <AGTable columnDefs={Columns} rowData={rowData || []} />
                    </div>
                </WidgetLoading>
            </div>
        </Modal>
    );
};

export default CustomerPortfolioModal;

const ProfitAndLoss = React.memo(({ data }: ICellRendererParams<IGTPortfolioResultType>) => {
    //

    const [profitLoss, setProfitLoss] = useState(0);
    const [profitLossPercent, setProfitLossPercent] = useState(0);
    const { asset, closingPrice, lastTradedPrice, symbolTradeState, marketUnitTypeTitle, averagePrice } = data! || {};
    const price = useMemo(() => (symbolTradeState === 'Open' ? lastTradedPrice : closingPrice), [symbolTradeState]);

    const { sellCommission } = useCommissionValue({ marketUnit: marketUnitTypeTitle });
    const sellCommissionValue = sellCommission ?? price * asset;

    const profitAndLossCalculator = () => {
        const profitLoss = Math.abs((price - averagePrice) * asset) - Math.ceil(price * asset * sellCommissionValue);
        const profitLossPercent = ((Math.ceil(price * asset * (1 - sellCommissionValue)) - averagePrice * asset) / (averagePrice * asset)) * 100;

        setProfitLoss(isNaN(profitLoss) ? 0 : profitLoss);
        setProfitLossPercent(isNaN(profitLossPercent) ? 0 : profitLossPercent);
    };

    useEffect(() => {
        profitAndLossCalculator();
    }, [price, sellCommissionValue]);

    return (
        <div className={clsx('flex justify-around', profitLossPercent > 0 ? 'text-L-success-200' : 'text-L-error-200')}>
            <span>{Math.abs(profitLossPercent).toFixed(2)}%</span>
            <span>{seprateNumber(Math.abs(profitLoss))}</span>
        </div>
    );
});

ProfitAndLoss.displayName = 'ProfitAndLoss';
