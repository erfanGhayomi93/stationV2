import Seperator from '../Seperator';
import { isObjectContainsFalsy, seprateNumber } from 'src/utils/helpers';
import clsx from 'clsx';
import { IData } from '../..';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { onErrorNotif } from 'src/handlers/notification';
import useSendOrdersV2 from '../../hooks/useSendOrdersV2';
import dayjs from 'dayjs';

type TInfoFieldParams = {
    label: string;
    value: string | number;
    preFix?: boolean;
    preFixText?: string;
};

type TOrder = {
    customerISIN: string;
    price: number;
    quantity: number;
    validity: 'GoodTillDate' | 'Day';
    validityDate: string;
    orderType: 'MarketOrder';
    orderStrategy: 'Normal';
};

const Footer = ({ data, symbolData }: { data: IData[]; symbolData: TIpoInfo }) => {
    const { sendOrders, ordersLoading } = useSendOrdersV2();

    const createSendRequest = () => {
        if (!symbolData?.symbolISIN) {
            onErrorNotif({ title: 'مشکلی در دریافت اطلاعات نماد وجود دارد' });
            return;
        }
        const validity: { validityDate: string; validity: TOrder['validity'] } = {
            validityDate: symbolData?.assigneeDate,
            validity: dayjs(symbolData?.assigneeDate).isSame(dayjs(), 'day') ? 'Day' : 'GoodTillDate',
        };
        const orders: TOrder[] = data?.map((item) => ({
            customerISIN: item.customerISIN,
            price: item.price,
            quantity: item.count,
            validity: validity.validity,
            validityDate: validity.validityDate,
            orderType: 'MarketOrder',
            orderStrategy: 'Normal',
        }));
        sendOrders({ items: orders, orderSide: 'Buy', symbolISIN: symbolData?.symbolISIN });
    };

    const handleSendOrders = () => {
        let error = false;
        for (let i = 0; i < data.length; i++) {
            if (isObjectContainsFalsy(data[i], ['count', 'price', 'tradeValue', 'title'])) {
                onErrorNotif({ title: 'لطفا تمامی فیلد ها را کامل نمایید' });
                error = true;
                break;
            } else if (+data[i].tradeValue > +data[i].purchasePower) {
                onErrorNotif({ title: 'قدرت خرید کافی نیست' });
                error = true;
                break;
            }
        }

        !error && createSendRequest();
    };

    return (
        <div className="flex justify-between w-full items-center border-L-gray-200 border-t-[1px] px-6 py-3">
            <PurchaseInfo data={data} />
            <SendAllButton onClick={handleSendOrders} />
        </div>
    );
};

const SendAllButton = (props: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
    return (
        <button className="bg-L-success-300 text-white py-3 px-12 h-[45px] rounded-md" {...props}>
            {'ارسال خرید'}
        </button>
    );
};

const PurchaseInfo = ({ data }: { data: IData[] }) => {
    const values = data.reduce(
        (initialValue, item, index) => {
            initialValue.count += item.count;
            initialValue.sumPrice += item.price;
            initialValue.averagePrice = initialValue.sumPrice / (index + 1);
            initialValue.tradeValue += item.tradeValue;
            return initialValue;
        },
        { count: 0, averagePrice: 0, tradeValue: 0, sumPrice: 0 },
    );

    return (
        <div className="flex items-center gap-4 h-full">
            <InfoField label="ردیف" value={data?.length} />
            <Seperator height={'50%'} />
            <InfoField label="تعداد" value={values.count} />
            <Seperator height={'50%'} />
            <InfoField label="میانگین قیمت" value={values.averagePrice} preFix preFixText="ریال" />
            <Seperator height={'50%'} />
            <InfoField label="ارزش معامله" value={values.tradeValue} preFix preFixText="ریال" />
        </div>
    );
};

const InfoField = ({ label, value, preFix, preFixText = '' }: TInfoFieldParams) => {
    return (
        <div className={clsx('flex gap-2 text-xs font-bold')}>
            <h5 className="text-L-gray-600">{label + ':'}</h5>
            <h5>{seprateNumber(+value)}</h5>
            {preFix ? <h5 className="text-L-gray-500">{preFixText}</h5> : null}
        </div>
    );
};

export default Footer;
