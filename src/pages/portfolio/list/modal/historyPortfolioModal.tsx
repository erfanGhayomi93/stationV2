import { Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import Modal from 'src/common/components/Modal';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { CloseIcon } from 'src/common/icons';
import { HistoryFilter } from '../components/historyFilter';
import { initHistoryFilter } from '../constant';
import { useCardexHistoryPortfolio } from 'src/app/queries/portfolio';
import { abbreviateNumber, datePeriodValidator } from 'src/utils/helpers';
import dayjs, { ManipulateType } from 'dayjs';
import { toast } from 'react-toastify';

type HistoryPortfolioModalType = {
    isOpen: boolean;
    setClose: Dispatch<SetStateAction<boolean>>;
    dataModal?: IGTPortfolioResultType;
    setDataModal: Dispatch<SetStateAction<IGTPortfolioResultType | undefined>>;
};

export const HistoryPortfolioModal: FC<HistoryPortfolioModalType> = ({ isOpen, setClose, dataModal, setDataModal }) => {
    const { t } = useTranslation();

    const [filterData, setFilterData] = useState<THistoryFilter>(initHistoryFilter);
    const [params, setParams] = useState<THistoryFilter>(filterData);

    const factoryParams = () => {
        return {
            customerISIN: dataModal?.customerIsin,
            symbolISIN: dataModal?.symbolISIN,
            fromDate: params.fromDate,
            toDate: params.toDate,
            type: !!params.type ? params.type : undefined,
        };
    };

    const { data, isFetching } = useCardexHistoryPortfolio(factoryParams(), {
        keepPreviousData: true,
    });

    const onSubmit = () => {
        if (datePeriodValidator(filterData.fromDate, filterData.toDate)) {
            setParams(filterData);
        } else {
            toast.error('بازه انتخابی صحیح نیست');
        }
    };

    const onClear = () => {
        setFilterData(initHistoryFilter);
        setParams(initHistoryFilter);
    };

    const onTimeChangeHandler = (time: string | undefined) => {
        if (!time || time === 'custom') return;

        const toDate = dayjs().format('YYYY-MM-DDT23:59:59');
        const fromDate = dayjs()
            .subtract(1, time as ManipulateType)
            .format('YYYY-MM-DDT00:00:00');

        setFilterData((pre) => ({
            ...pre,
            fromDate,
            toDate,
        }));
    };

    useEffect(() => {
        onTimeChangeHandler(filterData.time);
    }, [filterData.time]);

    useEffect(() => {
        console.log('filterData.time', filterData.time);
    }, [filterData.time]);

    const columns = useMemo(
        (): ColDefType<ICardexPortfolioResult>[] => [
            {
                headerName: t('ag_columns_headerName.date'),
                field: 'date',
                type: 'date',
                minWidth: 150,
            },
            {
                headerName: t('ag_columns_headerName.portfolioType'),
                field: 'type',
                maxWidth: 120,
                sortable: false,
                valueFormatter: ({ value }) => t(`portfolioCardexType.${value}`),
            },
            {
                headerName: t('table_columns.quantity'),
                field: 'quantity',
                type: 'sepratedNumber',
            },
            {
                headerName: t('table_columns.asset'),
                field: 'asset',
                type: 'sepratedNumber',
            },
            {
                headerName: t('ag_columns_headerName.price'),
                field: 'price',
                type: 'abbreviatedNumber',
            },
            {
                headerName: t('ag_columns_headerName.commissionPrice'),
                field: 'commissionPrice',
                type: 'abbreviatedNumber',
            },
            {
                headerName: t('table_columns.value'),
                field: 'totalValue',
                type: 'abbreviatedNumber',
            },
            {
                headerName: t('table_columns.averagePrice'),
                field: 'averagePrice',
                type: 'abbreviatedNumber',
                minWidth: 120,
            },
            {
                headerName: t('ag_columns_headerName.profit'),
                field: 'profit',
                valueFormatter: ({ value }) => '\u200E' + abbreviateNumber(value),
                cellClass: ({ value }) => (value > 0 ? 'text-L-success-200' : 'text-L-error-200'),

                // cellRenderer: ({ data }: ICellRendererParams<IGTPortfolioResultType>) => <ActionsCell data={data} historyModalAction={historyModalAction} setDataModal={setDataModal}/>
            },
            {
                headerName: t('ag_columns_headerName.bep'),
                field: 'bep',
                type: 'abbreviatedNumber',
                // cellRenderer: ({ data }: ICellRendererParams<IGTPortfolioResultType>) => <ActionsCell data={data} historyModalAction={historyModalAction} setDataModal={setDataModal}/>
            },
        ],
        [],
    );

    useEffect(() => {
        return () => setDataModal(undefined);
    }, []);

    return (
        <Modal isOpen={isOpen} onClose={setClose} className="min-h-[40rem] w-3/5 bg-L-basic dark:bg-D-basic rounded-md h-full grid">
            <div className="grid grid-rows-min-min-one">
                <div className="w-full text-white font-semibold bg-L-blue-200 dark:bg-D-blue-200 h-10 flex items-center justify-between px-5">
                    <div>عملکرد نماد {dataModal?.symbolTitle}</div>
                    <CloseIcon onClick={() => setClose(false)} className="cursor-pointer" />
                </div>

                <div className="mt-6 mx-6">
                    <HistoryFilter onSubmit={onSubmit} onClear={onClear} filterData={filterData} setFilterData={setFilterData} />
                </div>

                <WidgetLoading spining={isFetching}>
                    <div className="p-6 pt-2 h-full">
                        <AGTable columnDefs={columns} rowData={data?.result} />
                    </div>
                </WidgetLoading>
            </div>
        </Modal>
    );
};
