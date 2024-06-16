import { useBuySellDispatch, useBuySellState } from '../../context/BuySellContext';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'src/redux/hooks';
import { getSelectedCustomers, getSelectedSymbol } from 'src/redux/slices/option';
import { handleValidity, seprateNumber } from 'src/utils/helpers';
import clsx from 'clsx';
import { useQueryClient } from '@tanstack/react-query';
import { onSuccessNotif } from 'src/handlers/notification';
import { useCreateBulkDetailBasket, useCreateDetailsBasket } from 'src/app/queries/basket';

type Props = {
    basketID: number;
    basketName: string;
    onCancel: () => void;
};

const ConfirmOrder = ({ basketID, basketName, onCancel }: Props) => {
    //
    const { t } = useTranslation();

    const selectedCustomers = useAppSelector(getSelectedCustomers);

    const selectedSymbol = useAppSelector(getSelectedSymbol);

    const queryClient = useQueryClient();

    const dispatch = useBuySellDispatch();

    // const appDispatch = useAppDispatch();

    const symbolData = queryClient.getQueryData<SymbolGeneralInfoType>(['SymbolGeneralInfo', selectedSymbol])?.symbolData;

    const selectedCustomersName = selectedCustomers.map(({ title }) => title);

    const { side, price, quantity, symbolISIN, validity, validityDate, percent } = useBuySellState();

    const { mutate: mutateCreateBulk } = useCreateBulkDetailBasket({
        onSuccess: () => {
            onSuccessNotif({ title: 'سفارش با موفقیت به سبد اضافه شد' });
            onCancel();
            dispatch({ type: 'RESET' });
        }
    })


    const handleSetBasket = () => {
        //
        const result = selectedCustomers.map(item => ({
            cartID: basketID,
            symbolISIN: symbolISIN,
            price: price,
            quantity: quantity,
            percent: percent,
            side: side,
            validity: handleValidity(validity),
            validityDate: validityDate,
            customerISIN: item.customerISIN,
            orderStrategy: 'Normal',
        }))

        mutateCreateBulk(result)
    };
    return (
        <div className="flex flex-col justify-between p-6">
            <div className="flex flex-col gap-6 text-right text-xs text-L-gray-700 dark:text-D-gray-700">
                <p className="">
                    ثبت سفارش
                    <span
                        className={clsx('mx-1 font-bold', { 'text-L-success-200': side === 'Buy' }, { 'text-L-error-200': side === 'Sell' })}
                    >{` ${t('orderSide.' + side)} `}</span>
                    نماد
                    <span className="mx-1 font-bold">{` ${symbolData?.symbolTitle || '-'} `}</span>
                    {`در سبد ${basketName}`}
                </p>
                <p>{`برای مشتری ( ${selectedCustomersName.join(' - ')} )`}</p>
                <p>{`تعداد ${seprateNumber(quantity)}`}</p>
                <p>{`قیمت ${seprateNumber(price)} ریال`}</p>
            </div>
            <div dir="ltr" className="flex gap-2 items-center">
                <button
                    onClick={onCancel}
                    className="px-4 py-1 rounded border border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50 bg-L-primary-100 dark:bg-D-primary-100"
                >
                    انصراف
                </button>
                <button
                    data-cy="basket-create-new"
                    onClick={handleSetBasket}
                    disabled={!quantity || !price}
                    className="px-10 py-1 rounded border border-L-primary-50 dark:border-D-primary-50 text-L-basic dark:text-D-basic bg-L-primary-50 dark:bg-D-primary-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    ثبت
                </button>
                {(!quantity || !price) && <p className=" text-L-error-200 ml-auto">{'تعداد یا قیمت نمیتواند صفر باشد *'}</p>}
            </div>
        </div>
    );
};

export default ConfirmOrder;
