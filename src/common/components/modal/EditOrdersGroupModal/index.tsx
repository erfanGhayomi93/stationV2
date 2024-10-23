import { ColDef } from '@ag-grid-community/core';
import { AgGridReact } from '@ag-grid-community/react';
import AgGridTable from '@components/Table/AgGrid';
import useInputs from '@hooks/useInputs';
import { dateFormatter, sepNumbers } from '@methods/helper';
import FieldInput from '@uiKit/Inputs/FieldInput';
import SelectInput from '@uiKit/Inputs/SelectInput';
import clsx from 'clsx';
import { useMemo, useRef } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useModalStore } from 'store/modal';
import Modal from '..';

type TTickItems = {
     id: 'constant' | 'increase' | 'decrease';
     label: string;
};

type TInputs = {
     volume: number;
     tickVolume: TTickItems;
     price: number;
     tickPrice: TTickItems;
};

const EditOrdersGroupModal = () => {
     const { t } = useTranslation();

     const gridRef = useRef<AgGridReact<IOpenOrder>>(null);

     const dropdownRef = useRef<HTMLDivElement | null>(null);

     const { editOrdersGroupModalSheet, setEditOrdersGroupModalSheet } = useModalStore();

     const { inputs, setFieldValue } = useInputs<TInputs>({
          volume: 0,
          tickVolume: {
               id: 'constant',
               label: t('todayOrders.constant'),
          },
          price: 0,
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

     const TICK_ITEMS = useMemo<TTickItems[]>(() => {
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

     const onChangeVolume = (value: number) => {
          console.log(value, 'value');
          setFieldValue('volume', value);

          const rowData = gridRef.current?.api.getRenderedNodes();

          if (inputs.tickVolume.id === 'constant') {
               rowData?.forEach(rowNode => {
                    rowNode.setDataValue('remainingQuantity', String(value).replace(/,/g, ''));
               });
          }
     };

     const onChangePrice = (value: number) => {
          setFieldValue('price', value);

          const rowData = gridRef.current?.api.getRenderedNodes();

          if (inputs.tickPrice.id === 'constant') {
               rowData?.forEach(rowNode => rowNode.setDataValue('price', String(value).replace(/,/g, '')));
          }
     };

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
                              side: t(`common.${editOrdersGroupModalSheet?.side ?? 'Buy'}`),
                              symbol: editOrdersGroupModalSheet?.symbolTitle,
                         }}
                    />
               }
               onCloseModal={onCloseModal}
               dependencies={[dropdownRef]}
               size="md"
          >
               <div ref={dropdownRef} className="flex h-full flex-col gap-10">
                    <div className="flex items-center justify-between gap-8">
                         <div className="flex items-center gap-2">
                              <div className="flex basis-7/12 items-center gap-2">
                                   <span>{t('todayOrders.volume')}:</span>
                                   <SelectInput
                                        value={{
                                             id: 'constant',
                                             label: t('todayOrders.constant'),
                                        }}
                                        placeholder=""
                                        items={TICK_ITEMS}
                                        onChange={value => setFieldValue('tickVolume', value as TTickItems)}
                                   />
                              </div>

                              <div className="basis-5/12">
                                   <FieldInput
                                        variant="simple"
                                        value={inputs.volume}
                                        onChangeValue={value => onChangeVolume(+value)}
                                        type='number'
                                   />
                              </div>
                         </div>
                         <div className="flex items-center gap-2">
                              <div className="flex basis-7/12 items-center gap-2">
                                   <span>{t('todayOrders.price')}:</span>
                                   <SelectInput
                                        value={{
                                             id: 'constant',
                                             label: t('todayOrders.constant'),
                                        }}
                                        placeholder=""
                                        items={TICK_ITEMS}
                                        onChange={value => setFieldValue('tickPrice', value as TTickItems)}
                                   />
                              </div>

                              <div className="basis-5/12">
                                   <FieldInput
                                        variant="simple"
                                        value={inputs.price}
                                        onChangeValue={value => onChangePrice(+value)}
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

                    <div className="flex items-center justify-end text-content-white">
                         <button
                              className={clsx('basis-5/12 rounded-md py-2 text-sm', {
                                   'bg-button-success-default': editOrdersGroupModalSheet?.side === 'Buy',
                                   'bg-button-error-default': editOrdersGroupModalSheet?.side === 'Sell',
                              })}
                         >
                              ثبت تغییرات
                         </button>
                    </div>
               </div>
          </Modal>
     );
};

export default EditOrdersGroupModal;
