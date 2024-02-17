import { ICellRendererParams } from 'ag-grid-community';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Check, DeleteIcon, PlusIcon, SendIcon } from 'src/common/icons';
import { IData } from '../../..';
import Tippy from '@tippyjs/react';
import { isObjectContainsFalsy } from 'src/utils/helpers';
import { onErrorNotif } from 'src/handlers/notification';
import useSendOrdersV2 from '../../../hooks/useSendOrdersV2';
import dayjs from 'dayjs';

interface Props extends ICellRendererParams {
    dataSetter: Dispatch<SetStateAction<IData[]>>;
    symbolData: TIpoInfo;
}
interface TBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    size?: number;
    tooltipContent?: string;
}

type TOrder = {
    customerISIN: string;
    price: number;
    quantity: number;
    validity: 'GoodTillDate' | 'Day';
    validityDate: string;
    orderType: 'MarketOrder';
    orderStrategy: 'Normal';
};

const ActionCol = ({ data, dataSetter, symbolData }: Props) => {
    const [isDeleteBtnActive, setIsDeleteBtnActive] = useState(false);
    const { sendOrders, ordersLoading } = useSendOrdersV2();

    const handleCancel = () => setIsDeleteBtnActive(false);
    const handleDelete = () => dataSetter((prev) => prev.filter((item) => item.uniqId !== data?.rowNumber));

    const createSendRequest = () => {
        const validity: { validityDate: string; validity: 'Day' | 'GoodTillDate' } = {
            validityDate: symbolData?.assigneeDate,
            validity: dayjs(symbolData?.assigneeDate).isSame(dayjs(), 'day') ? 'Day' : 'GoodTillDate',
        };

        const orders: TOrder[] = [
            {
                customerISIN: data.customerISIN,
                price: data.price,
                quantity: data.count,
                validity: validity.validity,
                validityDate: validity.validityDate,
                orderType: 'MarketOrder',
                orderStrategy: 'Normal',
            },
        ];

        sendOrders({ items: orders, orderSide: 'Buy', symbolISIN: symbolData?.symbolISIN });
    };

    const handleSendRequest = () => {
        if (isObjectContainsFalsy(data, ['count', 'price', 'tradeValue', 'title'])) {
            onErrorNotif({ title: 'لطفا تمامی فیلد ها را کامل نمایید' });
        } else if (+data.tradeValue > +data.purchasePower) {
            onErrorNotif({ title: 'قدرت خرید کافی نیست' });
        } else {
            createSendRequest();
        }
    };

    return (
        <div className="flex justify-center items-center gap-2 py-3 h-full">
            {isDeleteBtnActive ? (
                <>
                    <CustomeBtn
                        Icon={Check}
                        className="flex justify-center items-center bg-L-gray-300 rounded-3xl w-7 h-7 text-L-success-300"
                        onClick={handleDelete}
                        size={13}
                    />
                    <CustomeBtn
                        className="rotate-45 flex justify-center items-center bg-L-gray-300 rounded-3xl w-7 h-7 text-L-error-200"
                        Icon={PlusIcon}
                        onClick={handleCancel}
                        size={20}
                    />
                </>
            ) : (
                <>
                    <CustomeBtn Icon={SendIcon} onClick={handleSendRequest} tooltipContent="ارسال تکی" />
                    <CustomeBtn Icon={DeleteIcon} onClick={() => setIsDeleteBtnActive(true)} tooltipContent="حذف" />
                </>
            )}
        </div>
    );
};

const CustomeBtn = ({ Icon, tooltipContent, size = 16, ...rest }: TBtnProps) => {
    return (
        <Tippy content={tooltipContent} className={tooltipContent ? '' : 'hidden'}>
            <button className="flex justify-center items-center bg-L-gray-300 rounded-3xl w-7 h-7 text-L-gray-600" {...rest}>
                <Icon height={size} width={size} />
            </button>
        </Tippy>
    );
};

export default ActionCol;
