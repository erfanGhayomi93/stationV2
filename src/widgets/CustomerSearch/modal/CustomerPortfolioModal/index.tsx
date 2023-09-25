import { ICellRendererParams } from 'ag-grid-community';
import clsx from 'clsx';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useCustomerPortfolio } from 'src/app/queries/portfolio';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import Modal from 'src/common/components/Modal';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { CloseIcon } from 'src/common/icons';
import { seprateNumber } from 'src/utils/helpers';
import { useCustomerSearchState } from '../../context/CustomerSearchContext';

const CustomerPortfolioModal = () => {
    //
    const { t } = useTranslation();
    const { setState, state } = useCustomerSearchState();
    const closeModal = () => {
        setState((prev) => ({ ...prev, isPortfolioModalOpen: false, detailModalData: undefined }));
    };

    const { data: rowData, isFetching } = useCustomerPortfolio(
        { CustomerISIN: state?.detailModalData?.customerISIN },
        {
            onSuccess: (result) => {},
        },
    );

    const Columns = useMemo(
        (): ColDefType<IGTPortfolioResultType>[] => [
            { headerName: t('ag_columns_headerName.symbol'), field: 'symbolTitle', cellClass: 'font-bold' },
            { headerName: t('ag_columns_headerName.count'), field: 'asset', type: 'sepratedNumber' },
            { headerName: t('ag_columns_headerName.lastPriceAverage'), field: 'averagePrice', type: 'sepratedNumber', minWidth: 150 },
            { headerName: t('ag_columns_headerName.finalCost'), field: 'lastTradedPrice', type: 'sepratedNumber' },
            { headerName: t('ag_columns_headerName.pureDayValue'), field: 'dayValue', type: 'sepratedNumber' },
            { headerName: t('ag_columns_headerName.headToheadPrice'), field: 'bep', type: 'sepratedNumber' },
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
                        <AGTable columnDefs={Columns} rowData={rowData} />
                    </div>
                </WidgetLoading>
            </div>
        </Modal>
    );
};

export default CustomerPortfolioModal;

const ProfitAndLoss = ({ data }: ICellRendererParams<IGTPortfolioResultType>) => {
    //
    if (!data?.lostProfitValue || !data?.percentlostProfit) return '-';
    return (
        <div className={clsx(data?.lostProfitValue > 0 ? 'text-L-success-200' : 'text-L-error-200')}>
            <span>{` (%${Math.abs(+data?.percentlostProfit).toFixed(1)}) `}</span>
            <span>{seprateNumber(Math.abs(data?.lostProfitValue))}</span>
        </div>
    );
};
