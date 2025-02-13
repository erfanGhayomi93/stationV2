import { ColDef } from '@ag-grid-community/core';
import { AgGridReact } from '@ag-grid-community/react';
import { useModifyGroupOrder } from '@api/order';
import AgGridTable from '@components/Table/AgGrid';
import useInputs from '@hooks/useInputs';
import { dateFormatter, sepNumbers } from '@methods/helper';
import Button from '@uiKit/Button';
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

     const initialEditOrdersGroupModalSheet = useRef([...(editOrdersGroupModalSheet?.data ?? [])]);

     const { mutate: mutateModifyGroupOrder, isPending } = useModifyGroupOrder();

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

          return JSON.parse(JSON.stringify(editOrdersGroupModalSheet.data));
     }, [editOrdersGroupModalSheet]);

     const onChangeVolume = (value: number) => {
          setFieldValue('volume', value);

          const rowData = gridRef.current?.api?.getRenderedNodes();

          rowData?.forEach(rowNode => {
               const initialRowData = [...(initialEditOrdersGroupModalSheet.current ?? [])].find(
                    item => item.orderId === rowNode?.data?.orderId
               );

               if (inputs.tickVolume.id === 'constant') {
                    rowNode.setDataValue('remainingQuantity', value || initialRowData?.remainingQuantity);
               }
               if (inputs.tickVolume.id === 'increase') {
                    const newValue = (initialRowData?.remainingQuantity ?? 0) + Number(value);

                    rowNode.setDataValue('remainingQuantity', newValue);
               }
               if (inputs.tickVolume.id === 'decrease') {
                    const newValue = (initialRowData?.remainingQuantity ?? 0) - Number(value);
                    rowNode.setDataValue('remainingQuantity', newValue > 0 ? newValue : (initialRowData?.remainingQuantity ?? 0));
               }
          });
     };

     const onChangePrice = (value: number) => {
          setFieldValue('price', value);

          const rowData = gridRef.current?.api?.getRenderedNodes();

          rowData?.forEach(rowNode => {
               const initialRowData = [...(editOrdersGroupModalSheet?.data ?? [])].find(
                    item => item.orderId === rowNode?.data?.orderId
               );

               if (inputs.tickPrice.id === 'constant') {
                    rowNode.setDataValue('price', value || initialRowData?.price);
               }
               if (inputs.tickPrice.id === 'increase') {
                    const newValue = (initialRowData?.price ?? 0) + Number(value);

                    rowNode.setDataValue('price', newValue);
               }
               if (inputs.tickPrice.id === 'decrease') {
                    const newValue = (initialRowData?.price ?? 0) - Number(value);
                    rowNode.setDataValue('price', newValue > 0 ? newValue : (initialRowData?.price ?? 0));
               }
          });
     };

     const handleEditSelected = () => {
          const rowData = gridRef.current?.api?.getRenderedNodes();

          if (!rowData) return;

          const payload = rowData.map(item => ({
               id: item.data?.orderId ?? 0,
               price: Number(item.data?.price),
               quantity: Number(item.data?.remainingQuantity),
               validity: item.data?.validity,
               validityDate: item.data?.validityDate ?? null,
          }));

          mutateModifyGroupOrder(payload);

          onCloseModal();
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
               size="lg"
          >
               <div ref={dropdownRef} className="flex h-full flex-col gap-10">
                    <div className="flex items-center justify-between gap-8">
                         <div className="flex flex-1 items-center gap-2">
                              <div className="flex basis-7/12 items-center gap-2">
                                   <span className="text-content-paragraph">{t('todayOrders.volume')}:</span>
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
                                        type="number"
                                        variant="simple"
                                        value={inputs.volume}
                                        onChangeValue={value => onChangeVolume(Number(value))}
                                   />
                              </div>
                         </div>
                         <div className="flex flex-1 items-center gap-2">
                              <div className="flex basis-7/12 items-center gap-2">
                                   <span className="text-content-paragraph">{t('todayOrders.price')}:</span>
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
                                        type="number"
                                        variant="simple"
                                        value={inputs.price}
                                        onChangeValue={value => onChangePrice(Number(value))}
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
                              defaultColDef={{
                                   flex: 1,
                              }}
                         />
                    </div>

                    <div className="flex items-center justify-end text-content-white">
                         <Button variant="primary" className="h-10 basis-6/12" isLoading={isPending} onClick={handleEditSelected}>
                              ثبت تغیرات
                         </Button>
                    </div>
               </div>
          </Modal>
     );
};

export default EditOrdersGroupModal;
