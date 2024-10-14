import { ColDef } from '@ag-grid-community/core';
import { AgGridReact } from '@ag-grid-community/react';
import { XCircleOutlineIcon } from '@assets/icons';
import Dropdown from '@components/Dropdown';
import AgGridTable from '@components/Table/AgGrid';
import useInputs from '@hooks/useInputs';
import { dateFormatter, sepNumbers } from '@methods/helper';
import clsx from 'clsx';
import { useMemo, useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useModalStore } from 'store/modal';
import Modal from '..';

type TTickItems = 'constant' | 'increase' | 'decrease';

type TInputs = {
     volume: string;
     tickVolume: {
          id: TTickItems;
          label: string;
     };
     price: string;
     tickPrice: {
          id: TTickItems;
          label: string;
     };
};

const EditOrdersGroupModal = () => {
     const { t } = useTranslation();

     const gridRef = useRef<AgGridReact<IOpenOrder>>(null); // Ref to access grid API

     const dropdownRef = useRef<HTMLUListElement | null>(null);

     const { editOrdersGroupModalSheet, setEditOrdersGroupModalSheet } = useModalStore();

     console.log(editOrdersGroupModalSheet, 'editOrdersGroupModalSheet');

     const { inputs, setFieldValue } = useInputs<TInputs>({
          volume: '',
          tickVolume: {
               id: 'constant',
               label: t('todayOrders.constant'),
          },
          price: '',
          tickPrice: {
               id: 'constant',
               label: t('todayOrders.constant'),
          },
     });

     const onCloseModal = () => {
          setEditOrdersGroupModalSheet(null);
     };

     const columnDefs = useMemo<ColDef<IOpenOrder>[]>(
          () => [
               {
                    field: 'position',
                    headerName: t('todayOrders.orderPlaceInPriceColumn'),
                    valueGetter: ({ data }) => sepNumbers(data?.position),
               },
               {
                    field: 'customerTitle',
                    headerName: t('todayOrders.customerTitleColumn'),
                    valueGetter: ({ data }) => data?.customerTitle ?? '-',
               },
               {
                    field: 'bourseCode',
                    headerName: t('todayOrders.bourseCodeColumn'),
                    valueGetter: ({ data }) => data?.bourseCode ?? '-',
               },
               {
                    field: 'remainingQuantity',
                    headerName: t('todayOrders.volumeColumn'),
                    valueGetter: ({ data }) => sepNumbers(data?.remainingQuantity),
               },
               {
                    field: 'price',
                    headerName: t('todayOrders.priceColumn'),
                    valueGetter: ({ data }) => sepNumbers(data?.price),
               },
               {
                    field: 'requestDate',
                    headerName: t('todayOrders.requestDateColumn'),
                    valueGetter: ({ data }) => (data?.requestDate ? dateFormatter(data?.requestDate, 'date') : '-'),
                    cellClass: 'ltr',
               },
          ],
          []
     );

     const TICK_ITEMS = useMemo<
          {
               id: TTickItems;
               label: string;
          }[]
     >(() => {
          return [
               {
                    id: 'constant',
                    label: t('todayOrders.constant'),
               },
               {
                    id: 'increase',
                    label: t('todayOrders.increase'),
               },
               {
                    id: 'decrease',
                    label: t('todayOrders.decrease'),
               },
          ];
     }, []);

     const history = useMemo(() => {
          if (!editOrdersGroupModalSheet) return [];
          return editOrdersGroupModalSheet.data;
     }, [editOrdersGroupModalSheet]);

     return (
          <Modal
               title={
                    <Trans
                         i18nKey="todayOrders.edit_order_group"
                         components={{
                              span1: (
                                   <span
                                        className={clsx('font-bold', {
                                             'text-content-success-buy': editOrdersGroupModalSheet?.side === 'Buy',
                                             'text-content-error-sell': editOrdersGroupModalSheet?.side === 'Sell',
                                        })}
                                   />
                              ),
                              span2: <span className="font-bold" />,
                         }}
                         values={{
                              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                              //@ts-expect-error
                              side: t(`common.${editOrdersGroupModalSheet?.side.toLowerCase() ?? 'Buy'}`),
                              symbol: editOrdersGroupModalSheet?.symbolTitle,
                         }}
                    />
               }
               onCloseModal={onCloseModal}
               dependencies={[dropdownRef]}
          >
               <div className="flex h-full flex-col gap-10">
                    <div className="flex items-center justify-between">
                         <div className="flex items-center gap-2">
                              <div className="flex items-center gap-2">
                                   <span>{t('todayOrders.volume')}:</span>
                                   <Dropdown
                                        ref={dropdownRef}
                                        items={TICK_ITEMS}
                                        onChange={value => {
                                             setFieldValue(
                                                  'tickVolume',
                                                  value as {
                                                       id: TTickItems;
                                                       label: string;
                                                  }
                                             );
                                        }}
                                        defaultSelected={{
                                             id: 'constant',
                                             label: t('todayOrders.constant'),
                                        }}
                                   />
                              </div>
                              <div
                                   style={{ width: '7rem' }}
                                   className="rtl flex items-center justify-between gap-2 rounded-lg border border-input-default bg-back-surface p-2 text-content-title"
                              >
                                   <button
                                        onClick={() => {
                                             setFieldValue('volume', '');
                                        }}
                                   >
                                        <XCircleOutlineIcon width="1.2rem" height="1.2rem" />
                                   </button>
                                   <input
                                        placeholder={t('todayOrders.amount')}
                                        value={inputs.volume}
                                        onChange={e => {
                                             const value = e.target.value;
                                             console.log(value, 'value');

                                             setFieldValue('volume', value);

                                             const gridApi = gridRef.current?.api; // Access grid API

                                             //  console.log(gridRef.current, 'rowNode');

                                             if (gridApi) {
                                                  // Update row data using setRowData API method
                                                  gridApi.forEachNode(rowNode => {
                                                       const calcValue =
                                                            inputs.tickVolume.id === 'constant'
                                                                 ? value || Number(value)
                                                                 : inputs.tickVolume.id === 'increase'
                                                                   ? Number(inputs.volume) + Number(value)
                                                                   : Number(inputs.price) - Number(value);
                                                       rowNode.setDataValue('remainingQuantity', calcValue);
                                                  });
                                             }
                                        }}
                                        className="ltr w-full border-none bg-transparent outline-none placeholder:text-right"
                                   />
                              </div>
                         </div>
                         <div className="flex items-center gap-2">
                              <div className="flex items-center gap-2">
                                   <span>{t('todayOrders.price')}:</span>
                                   {/* <Dropdown
                                        ref={dropdownRef}
                                        items={TICK_ITEMS}
                                        onChange={value => {
                                             setFieldValue(
                                                  'tickPrice',
                                                  value as {
                                                       id: TTickItems;
                                                       label: string;
                                                  }
                                             );
                                        }}
                                   /> */}
                              </div>
                              <div
                                   style={{ width: '7rem' }}
                                   className="flex items-center justify-between gap-2 rounded-lg border border-input-default bg-back-surface p-2 text-content-title"
                              >
                                   <XCircleOutlineIcon width="1.2rem" height="1.2rem" />
                                   <input
                                        placeholder={t('todayOrders.amount')}
                                        value={inputs.price}
                                        onChange={e => {
                                             setFieldValue('price', e.target.value);
                                        }}
                                        className="ltr w-full border-none bg-transparent outline-none placeholder:text-right"
                                   />
                              </div>
                         </div>
                    </div>

                    <div className="flex-1">
                         <AgGridTable
                              readOnlyEdit={false}
                              ref={gridRef}
                              tableHeight="10rem"
                              columnDefs={columnDefs}
                              rowData={history}
                              getRowId={params => String(params.data.orderId)}
                         />
                    </div>
               </div>
          </Modal>
     );
};

export default EditOrdersGroupModal;
