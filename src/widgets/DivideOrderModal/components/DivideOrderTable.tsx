import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import ActionCell, { TypeActionEnum } from 'src/widgets/Reports/components/actionCell';
import TableHeader from './TableHeader';
import { Check, UnCheck } from 'src/common/icons';
import { set } from 'cypress/types/lodash';
import TradeInput from 'src/widgets/BuySell/components/Input';

const DivideOrderTable = () => {
    //
    const [editingRow, setEditingRow] = useState<{ id: number; type: 'delete' | 'edit' } | undefined>(undefined);
    const data = [
        { name: 'سهیل خسروی', count: 1000, price: 102020200, status: 'done', id: 1 },
        { name: 'سهیل خسروی', count: 1000, price: 102020200, status: 'reject', id: 2 },
        { name: 'سهیل خسروی', count: 1000, price: 102020200, status: 'feild', id: 3 },
        { name: 'سهیل خسروی', count: 1000, price: 102020200, status: 'registered', id: 4 },
    ];

    const handleEditOrder = (id: number) => {
        console.log('edit', id);
        setEditingRow(undefined);
    };
    const handleDeleteOrder = (id: number) => {
        console.log('delete', id);
        setEditingRow(undefined);
    };

    return (
        <div className="flex flex-col h-full">
            <div className="sticky top-0">
                <TableHeader />
            </div>
            <div className="h-full overflow-y-auto">
                {data.map((item) => (
                    <div key={item.id} className="grid grid-cols-5 h-8 text-xs even:bg-L-gray-100 even:dark:bg-D-gray-100">
                        <div className="flex items-center justify-center text-D-basic dark:text-L-basic">{item.name}</div>
                        <div className="flex items-center px-2 justify-center text-D-basic dark:text-L-basic">
                            {editingRow?.type === 'edit' && editingRow?.id === item.id ? (
                                <div className="border border-L-info-100 h-full rounded">
                                    <TradeInput value={item.count} onChange={() => {}} />
                                </div>
                            ) : (
                                item.count
                            )}
                        </div>
                        <div className="flex px-2 items-center justify-center text-D-basic dark:text-L-basic">
                            {editingRow?.type === 'edit' && editingRow?.id === item.id ? (
                                <div className="border border-L-info-100 h-full rounded">
                                    <TradeInput value={item.price} onChange={() => {}} />
                                </div>
                            ) : (
                                item.price
                            )}
                        </div>
                        <div className="flex items-center justify-center text-D-basic dark:text-L-basic">{item.status}</div>
                        <div className="flex items-center justify-center text-D-basic dark:text-L-basic">
                            {editingRow?.id === item.id ? (
                                <div className="flex gap-3">
                                    <div
                                        className="p-1 border border-L-success-200 dark:border-D-success-200 rounded-xl cursor-pointer"
                                        onClick={() => {
                                            editingRow.type === 'delete' ? handleDeleteOrder(item.id) : handleEditOrder(item.id);
                                        }}
                                    >
                                        <Check className="text-L-success-200 dark:text-D-success-200" />
                                    </div>
                                    <div
                                        className="p-1 border border-L-error-200 dark:border-D-error-200 rounded-xl cursor-pointer"
                                        onClick={() => setEditingRow(undefined)}
                                    >
                                        <UnCheck className="text-L-error-200 dark:text-D-error-200" />
                                    </div>
                                </div>
                            ) : (
                                <ActionCell
                                    data={item}
                                    type={[TypeActionEnum.DELETE, TypeActionEnum.EDIT, TypeActionEnum.SEND]}
                                    handleDelete={({ id }: any) => setEditingRow({ id, type: 'delete' })}
                                    handleEdit={({ id }: any) => setEditingRow({ id, type: 'edit' })}
                                    handleSend={() => {}}
                                />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DivideOrderTable;
