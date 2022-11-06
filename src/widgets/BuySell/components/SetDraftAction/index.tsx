import { useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { useCreateDraft } from 'src/app/queries/draft';
import { ComeFromKeepDataEnum, ICustomerTypeEnum } from 'src/constant/enums';
import { onErrorNotif, onSuccessNotif } from 'src/handlers/notification';
import { useAppDispatch, useAppValues } from 'src/redux/hooks';
import { setSelectedCustomers } from 'src/redux/slices/option';
import { handleValidity, isPrimaryComeFrom } from 'src/utils/helpers';
import { useBuySellDispatch, useBuySellState } from '../../context/BuySellContext';

interface ISetDraftActionType {}

const SetDraftAction: FC<ISetDraftActionType> = ({}) => {
    const { side, price, quantity, sequential, strategy, symbolISIN, validity, validityDate, percent, comeFrom } = useBuySellState();
    const queryClient = useQueryClient();
    const dispatch = useBuySellDispatch();
    const appDispatch = useAppDispatch();
    const resetContextData = () => {
        if (!sequential) {
            dispatch({ type: 'RESET' });
            appDispatch(setSelectedCustomers([]));
        }
    };
    const { mutate: mutateCreateDraft } = useCreateDraft({
        onSuccess: () => {
            onSuccessNotif();
            queryClient.invalidateQueries(['draftList']);
            resetContextData();
        },
        onError: () => {
            onErrorNotif();
        },
    });
    const {
        option: { selectedCustomers },
    } = useAppValues();

    const handleClick = () => {
        if (!isPrimaryComeFrom(comeFrom)) {
            resetContextData();
            return;
        }
        handleCreateDraft();
    };

    const handleCreateDraft = () => {
        let customerISINs: ICustomerIsins = [];
        let customerTagTitles: ICustomerIsins = [];
        let gtTraderGroupId: ICustomerIsins = [];

        selectedCustomers.forEach((c: IGoMultiCustomerType) => {
            if (c.customerType === ICustomerTypeEnum.Legal || c.customerType === ICustomerTypeEnum.Natural) customerISINs.push(c.customerISIN);
            else if (c.customerType === ICustomerTypeEnum.CustomerTag) customerTagTitles.push(c.customerTitle);
            else if (c.customerType === ICustomerTypeEnum.TraderGroup) gtTraderGroupId.push(c.customerISIN);
        });

        mutateCreateDraft({
            customerISINs: String(customerISINs),
            customerTagTitles: String(customerTagTitles),
            gtTraderGroupId: String(gtTraderGroupId),
            symbolISIN: symbolISIN,
            price: price,
            quantity: quantity,
            side: side,
            validity: handleValidity(validity),
            validityDate: validityDate,
            percent: percent || 0,
            orderStrategy: strategy,
            orderType: 'MarketOrder',
            customerTitles: '',
        });
    };

    return (
        <>
            <button
                onClick={handleClick}
                className="flex items-center h-8 justify-center w-2/6 rounded text-L-primary-50 dark:bg-D-primary-50 border-L-primary-50 dark:border-D-primary-50 border "
            >
                {isPrimaryComeFrom(comeFrom) ? 'پیش نویس' : 'انصراف'}
            </button>
        </>
    );
};

export default SetDraftAction;