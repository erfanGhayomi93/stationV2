import {  useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useCustomerPortfolio } from 'src/app/queries/portfolio';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import Modal from 'src/common/components/Modal';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { CloseIcon } from 'src/common/icons';

const CustomerPortfolioModal = () => {
    //
    const { t } = useTranslation();

    const { data: rowData, isFetching } = useCustomerPortfolio({ CustomerISIN: '18994073477617' },{
        onSuccess: (result) => {},
    });

    const Columns = useMemo(
        (): ColDefType<IGTPortfolioResultType>[] => [
            { headerName: t('ag_columns_headerName.symbol'), field: 'symbolTitle' },
            { headerName: t('ag_columns_headerName.count'), field: 'asset', type: 'sepratedNumber' },
            { headerName: t('ag_columns_headerName.lastPriceAverage'), field: 'averagePrice', type: 'sepratedNumber', minWidth: 150 },
            { headerName: t('ag_columns_headerName.finalCost'), field: 'lastTradedPrice', type: 'sepratedNumber'},
            { headerName: t('ag_columns_headerName.pureDayValue'), field: 'dayValue', type: 'sepratedNumber' },
            { headerName: t('ag_columns_headerName.headToheadPrice'), field: 'bep', type: 'sepratedNumber' },
            { headerName: t('ag_columns_headerName.portfolioPercent'), field: 'totalValue', type: 'sepratedNumber' },
            { headerName: t('ag_columns_headerName.profitAndLossPrice'), field: 'lostProfitValue' },
            { headerName: t('ag_columns_headerName.profitAndLossPercent'), field: 'percentlostProfit' },
        ],
        [],
    );
    return (
        <Modal isOpen={false} onClose={()=>{}} className="min-h-[40rem] w-3/5 bg-L-basic dark:bg-D-basic  rounded-md h-full grid">
            <div className="grid grid-rows-min-one">
                <div className="w-full text-white font-semibold bg-L-blue-200 dark:bg-D-blue-200 h-10 flex items-center justify-between px-5">
                    <div>{t('common.customerPortfolio')}</div>
                    <CloseIcon onClick={() => {}} className="cursor-pointer" />
                </div>
                <WidgetLoading spining={isFetching}>
                    <div className="p-6">
                        <AGTable columnDefs={Columns} rowData={rowData} />
                    </div>
                </WidgetLoading>
            </div>
        </Modal>
    );
};

export default CustomerPortfolioModal;
