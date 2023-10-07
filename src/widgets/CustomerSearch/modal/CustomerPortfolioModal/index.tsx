import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useCustomerPortfolio } from 'src/app/queries/portfolio';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import Modal from 'src/common/components/Modal';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { CloseIcon } from 'src/common/icons';
import { seprateNumber } from 'src/utils/helpers';
import { useCustomerSearchState } from '../../context/CustomerSearchContext';
import { pushEngine } from 'src/ls/pushEngine';
import { subscriptionPortfolio } from 'src/ls/subscribes';
import { useCommissionQuery } from 'src/app/queries/trade';

const CustomerPortfolioModal = () => {
    //
    const { t } = useTranslation();
    const { setState, state } = useCustomerSearchState();
    const closeModal = () => {
        setState((prev) => ({ ...prev, isPortfolioModalOpen: false, detailModalData: undefined }));
    };

    const { data: commission } = useCommissionQuery();

    const { data, isFetching } = useCustomerPortfolio({ CustomerISIN: state?.detailModalData?.customerISIN });
    const { result: rowData } = data || {};

    useEffect(() => {
        if (rowData && rowData.length) {
            const symbols = rowData.map(({ symbolISIN }) => symbolISIN);
            subscriptionPortfolio(symbols);
        }

        return () => pushEngine.unSubscribe('portfolioSymbols');
    }, [rowData]);

    const getCommission = (marketUnit: MarketUnit) => {
        return commission?.find((item) => item.marketUnitTitle === marketUnit)?.sellCommission;
    };

    const calcProfitAndLoss = (data?: IGTPortfolioResultType) => {
        if (!data || !data.averagePrice) return 0;
        const { asset, closingPrice, lastTradedPrice, symbolTradeState, marketUnitTypeTitle, averagePrice } = data! || {};
        const sellCommissionValue = getCommission(marketUnitTypeTitle);

        if (!sellCommissionValue) return null;

        const price = symbolTradeState === 'Open' ? lastTradedPrice : closingPrice;

        const value = (price - averagePrice) * asset;
        const valueWithCommission = Math.abs(value) - Math.ceil(price * asset * sellCommissionValue);

        return (value < 0 || valueWithCommission < 0 ? -1 : 1) * Math.abs(valueWithCommission);
    };

    const calcProfitAndLossPercent = (data?: IGTPortfolioResultType) => {
        if (!data || !data.averagePrice) return 0;
        const { asset, closingPrice, lastTradedPrice, symbolTradeState, marketUnitTypeTitle, averagePrice } = data! || {};
        const sellCommissionValue = getCommission(marketUnitTypeTitle);

        if (!sellCommissionValue) return null;

        const price = symbolTradeState === 'Open' ? lastTradedPrice : closingPrice;

        const profitLossPercent = ((Math.ceil(price * asset * (1 - sellCommissionValue)) - averagePrice * asset) / (averagePrice * asset)) * 100;

        return profitLossPercent;
    };

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
                cellClass: ({ value }) => (value > 0 ? 'text-L-success-200' : 'text-L-error-200'),
                valueGetter: ({ data }) => calcProfitAndLoss(data),
                valueFormatter: ({ value }) => (value ? seprateNumber(Math.abs(value)) : '-'),
            },
            {
                headerName: t('ag_columns_headerName.profitAndLossPercent'),
                field: '',
                cellClass: ({ value }) => (value > 0 ? 'text-L-success-200' : 'text-L-error-200'),
                valueGetter: ({ data }) => calcProfitAndLossPercent(data),
                valueFormatter: ({ value }) => (value ? Math.abs(value).toFixed(2) + '%' : '-'),
            },
        ],
        [commission],
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
