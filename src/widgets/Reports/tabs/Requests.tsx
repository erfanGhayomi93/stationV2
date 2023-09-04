import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetOfflineRequests } from 'src/app/queries/order';
// import { useGetOrders } from 'src/app/queries/order';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import AGHeaderSearchInput from 'src/common/components/AGTable/HeaderSearchInput';
import { valueFormatterSide } from 'src/utils/helpers';
import ActionCell, { TypeActionEnum } from '../components/actionCell';
import { ICellRendererParams } from 'ag-grid-community';
import WidgetLoading from 'src/common/components/WidgetLoading';

type RequestData = {
    customerTitle: string;
    symbolISIN: string;
    orderSide: string;
    quantity: number;
    sumExecuted: number;
    price: number;
    valuePosition: number;
    // creditRequest: Boolean;
};

const Requests = () => {
    //
    const { t } = useTranslation();
    const { data, isLoading } = useGetOfflineRequests(
        {},
        {
            onSuccess: (data) => {
                console.log(data);
            },
        },
    );

    const columns = useMemo(
        (): ColDefType<IGTOfflineTradesResult>[] => [
            { headerName: t('ag_columns_headerName.customer'), field: 'customerTitle', headerComponent: AGHeaderSearchInput },
            { headerName: t('ag_columns_headerName.symbol'), field: 'symbolName', headerComponent: AGHeaderSearchInput },
            { headerName: t('ag_columns_headerName.side'), field: 'side', valueFormatter: valueFormatterSide },
            { headerName: t('ag_columns_headerName.count'), field: 'quantity', type: 'sepratedNumber' },
            { headerName: t('ag_columns_headerName.requestType'), field: 'requestType' },
            { headerName: t('ag_columns_headerName.fund'), field: 'fund', type: 'sepratedNumber' },
            { headerName: t('ag_columns_headerName.price'), field: 'price' },
            { headerName: t('ag_columns_headerName.validity'), field: 'requestExpiration', type: "date" },
            {
                headerName: t('ag_columns_headerName.actions'),
                field: 'customTitle',
                cellRenderer: (row: ICellRendererParams<IGTOfflineTradesResult>) => (
                    <ActionCell
                        data={row.data}
                        type={[TypeActionEnum.SEND, TypeActionEnum.DELETE]}
                        handleDelete={(data) => console.log('delete', data)}
                        handleSend={(data) => console.log('send', data)}
                    />
                ),
            },
        ],
        [],
    );

    return (
        <WidgetLoading spining={isLoading}>

        <div className={'grid h-full p-3'}>
            <AGTable agGridTheme="balham" rowData={data?.result || []} columnDefs={columns} />
        </div>
        </WidgetLoading>
    );
};

export default Requests;
