import { ICellRendererParams } from 'ag-grid-community';
import { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
// import { Cell } from 'rsuite-table';
// import 'rsuite-table/dist/css/rsuite-table.css'; // or 'rsuite-table/dist/css/rsuite-table.css'
import { useGetOrders, useSingleDeleteOrders } from 'src/app/queries/order';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { ComeFromKeepDataEnum } from 'src/constant/enums';
import { useAppDispatch } from 'src/redux/hooks';
import { setDataBuySellAction } from 'src/redux/slices/keepDataBuySell';
import { valueFormatterSide, valueFormatterValidity } from 'src/utils/helpers';
import ActionCell, { TypeActionEnum } from '../components/actionCell';
import CellTextFilter from '../components/CellFilter/CellTextFilter';
import FilterTable from '../components/FilterTable';
import useHandleFilterOrder from '../components/useHandleFilterOrder';

type IOpenOrders = {
    ClickLeftNode: any;
};

const OpenOrders: FC<IOpenOrders> = ({ ClickLeftNode }) => {
    const { data: dataBeforeFilter, isFetching, refetch: refetchOpenOrders } = useGetOrders({ GtOrderStateRequestType: 'OnBoard' });
    const { FilterData, handleChangeFilterData, dataAfterfilter } = useHandleFilterOrder({ dataBeforeFilter });
    const { mutate } = useSingleDeleteOrders({
        onSuccess: ({response}) => {
            if(response === 'Ok') {
                refetchOpenOrders()
            }
        }
    });

    const appDispath = useAppDispatch();
    const { isFilter } = ClickLeftNode;

    const handleDelete = (data: IOrderGetType | undefined) => {
        data && mutate(data?.orderId);
    };

    const handleEdit = (data: IOrderGetType | undefined) => {
        appDispath(setDataBuySellAction({ data, comeFrom: ComeFromKeepDataEnum.OpenOrder }));
    };

    const columns = useMemo(
        (): ColDefType<IOrderGetType>[] => [
            {
                headerName: 'مشتری یا گروه مشتری',
                field: 'customerTitle',
                // width: 360,
                // headerComponent: () => (
                //     <CellTextFilter
                //         handleChangeFilterData={handleChangeFilterData}
                //         columnName="مشتری یا گروه مشتری"
                //         field="customerTitle"
                //         placeholder="مشتری :"
                //     />
                // ),
            },
            {
                headerName: 'نام نماد',
                field: 'symbolTitle',
                // width: 350,
                // headerComponent: () => (
                //     <CellTextFilter
                //         handleChangeFilterData={handleChangeFilterData}
                //         columnName="نام نماد"
                //         field="symbolTitle"
                //         placeholder="نام نماد:"
                //     />
                // ),
            },
            {
                headerName: 'سمت',
                field: 'orderSide',
                // width: 380,
                valueFormatter: valueFormatterSide,
                // headerComponent: () => <CellSideFilter handleChangeFilterData={handleChangeFilterData} />,
            },
            { headerName: 'تعداد', field: 'quantity', type: 'sepratedNumber' },
            { headerName: 'قیمت', field: 'price', type: 'sepratedNumber' },
            { headerName: 'ارزش معامله', field: 'value', type: 'abbreviatedNumber' },
            { headerName: 'تعداد انجام شده', field: 'sumExecuted', type: 'sepratedNumber' },
            { headerName: 'تعداد صف پیش رو', field: 'position', type: 'sepratedNumber' },
            { headerName: 'حجم پیش رو در صف', field: 'valuePosition', type: 'sepratedNumber' },
            { headerName: 'اعتبار درخواست', field: 'validity', valueFormatter: valueFormatterValidity },
            {
                headerName: 'عملیات',
                field: 'customTitle',
                cellRenderer: (row: ICellRendererParams<IOrderGetType>) => (
                    <ActionCell
                        data={row.data}
                        type={[TypeActionEnum.DELETE, TypeActionEnum.EDIT]}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                    />
                ),
            },
        ],
        [CellTextFilter],
    );

    const rowKey = 'orderId';
    // const ExpandCell = ({ rowData, dataKey, expandedRowKeys, onChange, ...props }: any) => (
    //     <Cell {...props}>
    //         <button
    //             onClick={() => {
    //                 onChange(rowData);
    //             }}
    //         >
    //             {expandedRowKeys.some((key: any) => key === rowData[rowKey]) ? (
    //                 <button className="border h-[20px] w-[20px] flex items-center justify-center rounded-md">
    //                     <PlusIcon className="rotate-45" />
    //                 </button>
    //             ) : (
    //                 <button className="border h-[20px] w-[20px] flex items-center justify-center rounded-md">
    //                     <PlusIcon />
    //                 </button>
    //             )}
    //         </button>
    //     </Cell>
    // );
    const [expandedRowKeys, setExpandedRowKeys] = useState([0]);

    const handleExpanded = (rowData: any, dataKey: any) => {
        let open = false;
        const nextExpandedRowKeys = [];

        expandedRowKeys.forEach((key) => {
            if (key === rowData[rowKey]) {
                open = true;
            } else {
                nextExpandedRowKeys.push(key);
            }
        });

        if (!open) {
            nextExpandedRowKeys.push(rowData[rowKey]);
        }

        setExpandedRowKeys(nextExpandedRowKeys);
    };

    const { t } = useTranslation();

    return (
        <div className={'grid grid-rows-min-one h-full p-3'}>
            <div data-actived={isFilter} className="h-0 actived:h-auto transition-all opacity-0 actived:opacity-100">
                <FilterTable {...{ FilterData, handleChangeFilterData }} />
            </div>
            <WidgetLoading spining={isFetching}>
                <AGTable rowData={dataBeforeFilter} columnDefs={columns} enableBrowserTooltips={false} />

                {/* <TableVirtuoso
                    data={dataAfterfilter}
                    useWindowScroll
                    //@ts-ignore
                    fixedHeaderContent={(index: any, user: any) => (
                        <>
                            <tr>
                                <th style={{ width: 150, background: 'blue', color: 'white' }}>Name</th>
                                <th style={{ background: 'blue', color: 'white' }}>Description</th>
                            </tr>
                        </>
                    )}
                    itemContent={(index, user) => (
                        <>
                            <td style={{ width: 150 }}>{user.name}</td>
                            <td>{user.description}</td>
                        </>
                    )}
                /> */}
            </WidgetLoading>
        </div>
    );
};

export default OpenOrders;
