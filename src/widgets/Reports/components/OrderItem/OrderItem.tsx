import { Disclosure } from '@headlessui/react';
import { FC, Fragment, memo } from 'react';
import { ColDefType } from 'src/common/components/AGTable';
import { ChevronIcon } from 'src/common/icons';
import ActionCell, { TypeActionEnum } from '../actionCell';
import InnerTable from '../InnerTable';
interface IOrderItemType {
    data: IOrderGetType;
    columns: ColDefType<IOrderGetType>[];
    editFn: (data: IOrderGetType) => void;
    deleteFn: (data: IOrderGetType) => void;
}
const OrderItem: FC<IOrderItemType> = ({ columns, data, deleteFn, editFn }) => {
    return (
        <Disclosure as={Fragment}>
            <div
                style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
                className="grid grid-rows-1 py-1.5 text-L-gray-450 dark:text-D-gray-450 h-[35px] "
            >
                {columns.map((col, inx) => {
                    return inx < columns.length - 1 ? (
                        <div key={inx} className="  flex items-center justify-center">
                            {inx === 0 ? (
                                <div className="w-full flex">
                                    <Disclosure.Button className="w-[20px] flex items-center justify-center">
                                        <ChevronIcon className="-rotate-90" width={10} height={10} />
                                    </Disclosure.Button>
                                    {
                                        //@ts-ignore
                                        data[col.field]
                                    }
                                </div>
                            ) : (
                                //@ts-ignore
                                data[col.field]
                            )}
                        </div>
                    ) : (
                        <></>
                    );
                })}
                <div className=" w-full  flex items-center justify-center">
                    <ActionCell
                        data={data}
                        type={[TypeActionEnum.DELETE, TypeActionEnum.EDIT]}
                        handleDelete={() => deleteFn(data)}
                        handleEdit={() => editFn(data)}
                    />
                </div>
            </div>

            <Disclosure.Panel className=" h-[200px] p-3">
                <InnerTable />
            </Disclosure.Panel>
        </Disclosure>
    );
};

export default memo(OrderItem);
