import { FC, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import { useGetTodayDoneTrades } from 'src/app/queries/order';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { abbreviateNumber, dateTimeFormatter, valueFormatterSide, valueFormatterValidity } from 'src/utils/helpers';
import { ICellRendererParams } from 'ag-grid-community';
import AGActionCell from 'src/common/components/AGActionCell';
import clsx from 'clsx';
import { InfoDoneOrders } from './modals/info';
import AGHeaderSearchInput from 'src/common/components/AGTable/HeaderSearchInput';
import ipcMain from 'src/common/classes/IpcMain';


type IDoneOrders = {
    aggregateType: IAggregate
};

let timeOut: NodeJS.Timeout | undefined = undefined;

const DoneOrders: FC<IDoneOrders> = ({ aggregateType }) => {

    const onOMSMessageHandlerRef = useRef<(message: Record<number, string>) => void>(() => { });

    const { data: todayDoneTrades, isFetching, refetch } = useGetTodayDoneTrades(aggregateType);

    const [, render] = useReducer(p => !p, false)

    const [infoModalState, setInfoModalState] = useState<{ isOpen: boolean; data?: IOrderGetType }>({ isOpen: false, data: undefined });

    const rowIndexHover = useRef<number | null>(null)

    const handleInfoClose = () => setInfoModalState({ isOpen: false, data: undefined });

    const handleInfoClick = (data: IOrderGetType | undefined) => {
        setInfoModalState({ isOpen: true, data: data });
    }

    const refetchOnboard = () => {
        timeOut = setTimeout(() => {
            refetch();
            clearTimeout(timeOut);
        }, 1000);
    };



    onOMSMessageHandlerRef.current = useMemo(
        () => (message: Record<number, string>) => {
            const omsOrderStatus = message[22] as OrderStatusType;

            if (['DeleteByEngine', 'PartOfTheOrderDone', 'OrderDone', 'OnCancelingWithBroker'].includes(omsOrderStatus)) {
                clearTimeout(timeOut);
                refetchOnboard();
            }
        },
        [],
    );

    useEffect(() => {
        ipcMain.handle('onOMSMessageReceived', onOMSMessageHandlerRef.current);
    }, []);

    const columns = useMemo(
        (): ColDefType<IOrderGetType>[] => [
            {
                headerName: 'مشتری یا گروه مشتری',
                field: 'customerTitle',
                headerComponent: AGHeaderSearchInput,
                minWidth: 200,
                cellRenderer: (row: ICellRendererParams<IOrderGetType>) => (
                    <div>
                        <span>{row.value}</span>
                        {
                            aggregateType === 'Customer' && (
                                <span className="pr-1">({row.data?.iterationCount})</span>
                            )
                        }
                    </div>
                )
            },
            {
                headerName: 'نماد',
                field: 'symbolTitle',
                headerComponent: AGHeaderSearchInput,
                cellRenderer: (row: ICellRendererParams<IOrderGetType>) => (
                    <div>
                        <span>{row.value}</span>
                        {
                            (aggregateType === 'Symbol' || aggregateType === 'Both') && (
                                <span className="pr-1">({row.data?.iterationCount})</span>
                            )
                        }
                    </div>
                )
            },
            {
                headerName: 'تاریخ',
                field: 'requestDate',
                valueFormatter: ({ value }) => dateTimeFormatter(value),
                minWidth: 120,
                cellClass: 'ltr',
            },
            {
                headerName: 'مبدا',
                field: 'orderFrom',
            },
            {
                headerName: 'نوع',
                field: 'orderSide',
                valueFormatter: (data) => valueFormatterSide(data),
                cellClassRules: {
                    'bg-L-success-101 dark:bg-D-success-101': ({ value }) => value === 'Buy',
                    'bg-L-error-101 dark:bg-D-error-101': ({ value }) => value === 'Sell',
                },
                minWidth: 80
            },
            {
                headerName: 'تعداد',
                field: 'quantity',
                type: 'sepratedNumber',
                maxWidth: 80
            },
            {
                headerName: 'قیمت',
                field: 'price',
                type: 'sepratedNumber',
                maxWidth: 80
            },
            {
                headerName: 'کارمزد کل',
                field: 'commission',
                type: 'sepratedNumber'
            },
            {
                headerName: 'بهای تمام شده',
                field: 'totalPrice',
                type: 'abbreviatedNumber',
                maxWidth: 170,
                cellRenderer: (row: ICellRendererParams<IOrderGetType>) => (
                    <div className='flex justify-start ml-4 gap-x-5'>
                        <div className='flex-1 text-left'>
                            <span>{abbreviateNumber(row.value)}</span>
                        </div>
                        <div>
                            <AGActionCell
                                data={row.data}
                                requiredButtons={['Info']}
                                onInfoClick={handleInfoClick}
                                infoClass={clsx("opacity-0 invisible transition-opacity", { "text-L-info-100 dark:text-L-info-100 transition-opacity !visible !opacity-100": row.rowIndex === rowIndexHover.current && row?.data?.iterationCount && row.data.iterationCount > 1 })}
                            />
                        </div>
                    </div >
                ),
            },
        ],
        [rowIndexHover.current, aggregateType],

    );

    return (
        <div className={'flex h-full p-3'}>
            <WidgetLoading spining={isFetching}>
                <AGTable
                    rowData={todayDoneTrades}
                    columnDefs={columns}
                    enableBrowserTooltips={true}
                    onCellMouseOver={(event) => {
                        if (rowIndexHover.current !== event.rowIndex) {
                            rowIndexHover.current = event.rowIndex
                            render()
                        }
                    }}
                    suppressRowVirtualisation={true}
                />
            </WidgetLoading>
            {
                infoModalState.isOpen && (
                    <InfoDoneOrders
                        isOpen={infoModalState.isOpen}
                        modalData={infoModalState?.data}
                        onClose={handleInfoClose}
                        aggregateType={aggregateType}
                    />
                )
            }
        </div>
    );
};

export default DoneOrders;
