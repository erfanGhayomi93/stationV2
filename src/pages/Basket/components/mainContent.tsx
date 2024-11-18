import { ColDef } from "@ag-grid-community/core";
import AgGrid from "@components/Table/AgGrid";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";

interface IMainContentProps {
    data?: IDetailsCartRes[]
}

export const valueFormatterCustomerTitle = (data: any) => {
    const customerTitle = data.value.map((item: any) => item.customerTitle);


    return String(customerTitle);
};


const MainContent: FC<IMainContentProps> = ({ data }) => {
    const { t } = useTranslation()


    const columns = useMemo(
        (): ColDef<IDetailsCartRes>[] => [
            { headerName: 'مشتری', field: 'customers', valueFormatter: valueFormatterCustomerTitle },
            { headerName: 'نماد', field: 'symbolTitle' },
            { headerName: 'سمت', field: 'side', valueFormatter: ({ value }) => t(`common.${value as TSide}`) },
            { headerName: 'قیمت', field: 'price', type: 'sepratedNumber' },
            {
                headerName: 'آخرین قیمت',
                field: 'lastTradedPrice',
                // cellRenderer: LastTradedPrice,
                type: 'sepratedNumber',
                maxWidth: 140
            },
            { headerName: 'درصد', field: 'percent' },
            { headerName: 'تعداد', field: 'quantity', type: 'sepratedNumber' },
            // {
            //     headerName: 'عملیات',
            //     field: 'cartID',
            //     sortable: false,
            //     lockVisible: true,
            //     pinned: 'left',
            //     cellRenderer: (row: any) => (
            //         <ActionCell
            //             data={row.data}
            //             type={[TypeActionEnum.DELETE, TypeActionEnum.EDIT]}
            //             handleDelete={handleDelete}
            //             handleEdit={handleEdit}
            //         />
            //     ),
            // },
        ],
        [],
    );

    return (
        <div className="h-full">
            <AgGrid
                columnDefs={columns}
                rowData={data}
                rowSelection={{
                    mode: 'multiRow',
                }}
            // onSelectionChanged={onRowSelected}
            />
        </div>
    )
}


export default MainContent;
