import { useMutation } from '@tanstack/react-query';
import { FC } from 'react';
import { setOrder } from 'src/app/queries/order';
import { ComeFromKeepDataEnum, ICustomerTypeEnum } from 'src/constant/enums';
import { onErrorNotif, onSuccessNotif } from 'src/handlers/notification';
import { useAppDispatch, useAppValues } from 'src/redux/hooks';
import { setSelectedCustomers } from 'src/redux/slices/option';
import { handleValidity, isPrimaryComeFrom } from 'src/utils/helpers';
import { useBuySellDispatch, useBuySellState } from '../../context/BuySellContext';

interface ISetOrderActionType {}

const SetOrderAction: FC<ISetOrderActionType> = ({}) => {
    const {
        side,
        amount,
        divide,
        isCalculatorEnabled,
        price,
        quantity,
        sequential,
        strategy,
        symbolISIN,
        validity,
        validityDate,
        percent,
        comeFrom,
    } = useBuySellState();
    const dispatch = useBuySellDispatch();
    const appDispatch = useAppDispatch();
    const { mutate } = useMutation(setOrder, {
        onSuccess: () => {
            onSuccessNotif();
            if (!sequential) {
                dispatch({ type: 'RESET' });
                appDispatch(setSelectedCustomers([]));
            }
        },
        onError: () => {
            onErrorNotif();
        },
    });
    const {
        option: { selectedCustomers },
    } = useAppValues();

    const handleSubmit = () => {
        handleOrder();
    };

    const handleOrder = () => {
        let customerISIN: ICustomerIsins = [];
        let CustomerTagId: ICustomerIsins = [];
        let GTTraderGroupId: ICustomerIsins = [];
        selectedCustomers.forEach((c: IGoMultiCustomerType) => {
            if (c.customerType === ICustomerTypeEnum.Legal || c.customerType === ICustomerTypeEnum.Natural) customerISIN.push(c.customerISIN);
            else if (c.customerType === ICustomerTypeEnum.CustomerTag) CustomerTagId.push(c.customerTitle);
            else if (c.customerType === ICustomerTypeEnum.TraderGroup) GTTraderGroupId.push(c.customerISIN);
        });
        mutate({
            customerISIN,
            CustomerTagId,
            GTTraderGroupId,
            orderSide: side,
            orderDraftId: undefined,
            orderStrategy: strategy,
            orderType: 'MarketOrder',
            percent: percent || 0,
            price: price,
            quantity: quantity,
            symbolISIN: symbolISIN,
            validity: handleValidity(validity),
            validityDate: validityDate,
        });
    };

    return (
        <>
            {side === 'Buy' ? (
                <button
                    onClick={handleSubmit}
                    className="bg-L-success-150 h-8 dark:bg-D-success-150 rounded text-L-basic flex items-center justify-center grow"
                >
                    {isPrimaryComeFrom(comeFrom) ? 'ارسال خرید' : 'ثبت تغییرات'}
                </button>
            ) : (
                <button
                    onClick={handleSubmit}
                    className="bg-L-error-150 h-8 dark:bg-D-error-150 rounded text-L-basic flex items-center justify-center grow"
                >
                    {isPrimaryComeFrom(comeFrom) ? ' ارسال فروش' : 'ثبت تغییرات'}
                </button>
            )}
        </>
    );
};

export default SetOrderAction;
