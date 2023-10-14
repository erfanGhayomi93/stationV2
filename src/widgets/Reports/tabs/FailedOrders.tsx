import clsx from 'clsx';
import { FC, useMemo } from 'react';
import { useGetOrders } from 'src/app/queries/order';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { ComeFromKeepDataEnum } from 'src/constant/enums';
import { useAppDispatch } from 'src/redux/hooks';
import { setDataBuySellAction } from 'src/redux/slices/keepDataBuySell';
import { valueFormatterSide } from 'src/utils/helpers';
import ActionCell, { TypeActionEnum } from '../components/actionCell';
import FilterTable from '../components/FilterTable';
import useHandleFilterOrder from '../components/useHandleFilterOrder';
import { useTranslation } from 'react-i18next';
type IFailedOrders = {
    ClickLeftNode: any;
};
const FailedOrders: FC<IFailedOrders> = ({ ClickLeftNode }) => {
    const { t } = useTranslation()
    const { data: dataBeforeFilter, isFetching } = useGetOrders({ GtOrderStateRequestType: 'Error' });
    const { FilterData, handleChangeFilterData, dataAfterfilter } = useHandleFilterOrder({ dataBeforeFilter });
    const appDispath = useAppDispatch();
    const { isFilter } = ClickLeftNode;

    const handleCopy = (data?: IOrderGetType) => {
        appDispath(setDataBuySellAction({ data, comeFrom: ComeFromKeepDataEnum.FailedOrder }));
    };

    const columns = useMemo(
        (): ColDefType<IOrderGetType>[] => [
            { headerName: 'مشتری یا گروه مشتری', field: 'customerTitle' },
            { headerName: 'نام نماد', field: 'symbolTitle' },
            { headerName: 'سمت', field: 'orderSide', valueFormatter: valueFormatterSide },
            { headerName: 'تعداد', field: 'quantity', type: 'sepratedNumber' },
            { headerName: 'قیمت', field: 'price', type: 'sepratedNumber' },
            { headerName: 'ارزش معامله', field: 'value', type: 'abbreviatedNumber' },
            { headerName: 'توضیحات', field: 'lastErrorCode', valueFormatter:({value}) => t('order_errors.' + value) },
            // { headerName: 'تعداد صف پیش رو', field: 'position', type: 'sepratedNumber' },
            // { headerName: 'حجم پیش رو در صف', field: 'valuePosition', type: 'sepratedNumber' },
            // { headerName: 'اعتبار درخواست', field: 'validity', valueFormatter: valueFormatterValidity },
            {
                headerName: 'عملیات',
                field: 'customTitle',
                cellRenderer: (row: any) => <ActionCell data={row.data} type={[TypeActionEnum.COPY]} handleCopy={handleCopy} />,
            },
        ],
        [],
    );
    return (
        <div className={'grid grid-rows-min-one h-full p-3'}>
            <div data-actived={isFilter} className="h-0 actived:h-auto transition-all opacity-0 actived:opacity-100">
                <FilterTable {...{ FilterData, handleChangeFilterData }} />
            </div>
            <WidgetLoading spining={isFetching}>
                <AGTable rowData={dataAfterfilter as undefined} columnDefs={columns} enableBrowserTooltips={false} />
            </WidgetLoading>
        </div>
    );
};

export default FailedOrders;
