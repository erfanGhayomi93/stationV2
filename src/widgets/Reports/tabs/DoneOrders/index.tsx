import { FC, useMemo, useReducer, useRef, useState } from 'react';
import { useGetTodayDoneTrades } from 'src/app/queries/order';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { abbreviateNumber, valueFormatterSide, valueFormatterValidity } from 'src/utils/helpers';
import { ICellRendererParams } from 'ag-grid-community';
import AGActionCell from 'src/common/components/AGActionCell';
import clsx from 'clsx';
import { InfoDoneOrders } from './modals/info';

type IDoneOrders = {
    aggregateType: IAggregate
};
const DoneOrders: FC<IDoneOrders> = ({ aggregateType }) => {
    const { data: todayDoneTrades, isFetching } = useGetTodayDoneTrades(aggregateType);
    const [, render] = useReducer(p => !p, false)
    const [infoModalState, setInfoModalState] = useState<{ isOpen: boolean; data?: IOrderGetType }>({ isOpen: false, data: undefined });


    const rowIndexHover = useRef<number | null>(null)

    const handleInfoClose = () => setInfoModalState({ isOpen: false, data: undefined });


    const handleInfoClick = (data: IOrderGetType | undefined) => {
        setInfoModalState({ isOpen: true, data: data });
    }

    const columns = useMemo(
        (): ColDefType<IOrderGetType>[] => [
            {
                headerName: 'مشتری یا گروه مشتری',
                field: 'customerTitle',
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
                headerName: 'نام نماد',
                field: 'symbolTitle',
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
            { headerName: 'سمت', field: 'orderSide', valueFormatter: valueFormatterSide },
            { headerName: 'تعداد', field: 'quantity', type: 'sepratedNumber' },
            { headerName: 'میانگین قیمت', field: 'price', type: 'sepratedNumber' },
            {
                headerName: 'ارزش معامله',
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
