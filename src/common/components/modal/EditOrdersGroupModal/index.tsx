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

     const gridRef = useRef<AgGridReact<IOpenOrder>>(null);

     console.log(gridRef, 'gridRef');

     const dropdownRef = useRef<HTMLUListElement | null>(null);

     const { editOrdersGroupModalSheet, setEditOrdersGroupModalSheet } = useModalStore();

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

     const onChangeVolume = (value: string) => {
          const rowData = gridRef.current?.api.getRenderedNodes();

          rowData?.forEach(rowNode => rowNode.setDataValue('remainingQuantity', value.replace(/,/g, '')));
     };

     const onChangePrice = (value: string) => {
          const rowData = gridRef.current?.api.getRenderedNodes();

          rowData?.forEach(rowNode => rowNode.setDataValue('price', value.replace(/,/g, '')));
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
          >
               <div className="flex h-full flex-col gap-10">
                    <div className="flex items-center justify-between gap-8">
                         <div className="flex items-center gap-2">
                              <div className="flex basis-7/12 items-center gap-2">
                                   <span>{t('todayOrders.volume')}:</span>
                                   <SelectInput value="" placeholder="" items={TICK_ITEMS} onChange={() => null} />
                              </div>

                              <div className="basis-5/12">
                                   <FieldInput variant="simple" value="" onChangeValue={value => onChangeVolume(value)} />
                              </div>
                         </div>
                         <div className="flex items-center gap-2">
                              <div className="flex basis-7/12 items-center gap-2">
                                   <span>{t('todayOrders.price')}:</span>
                                   <SelectInput value="" placeholder="" items={TICK_ITEMS} onChange={() => null} />
                              </div>

                              <div className="basis-5/12">
                                   <FieldInput variant="simple" value="" onChangeValue={value => onChangePrice(value)} />
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
