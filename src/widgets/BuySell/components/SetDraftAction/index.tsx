import { useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { useCreateDraft } from 'src/app/queries/draft';
import { ICustomerTypeEnum } from 'src/constant/enums';
import { onErrorNotif, onSuccessNotif } from 'src/handlers/notification';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { handleValidity, isPrimaryComeFrom } from 'src/utils/helpers';
import { resetByeSellData } from '../..';
import { useBuySellDispatch, useBuySellState } from '../../context/BuySellContext';
import { getSelectedCustomers } from 'src/redux/slices/option';
import { useTranslation } from 'react-i18next';
import { clearDataAction, getKeepDataBuySell } from 'src/redux/slices/keepDataBuySell';

interface ISetDraftActionType { }

const SetDraftAction: FC<ISetDraftActionType> = ({ }) => {
    const { side, price, quantity, sequential, strategy, symbolISIN, validity, validityDate, percent } = useBuySellState();
    const queryClient = useQueryClient();
    const dispatch = useBuySellDispatch();
    const appDispatch = useAppDispatch();
    const { t } = useTranslation();

    const { comeFrom } = useAppSelector(getKeepDataBuySell)


    const { mutate: mutateCreateDraft } = useCreateDraft({
        onSuccess: () => {
            onSuccessNotif();
            queryClient.invalidateQueries(['draftList']);
            if (sequential) resetByeSellData(dispatch, appDispatch);
        },
        onError: () => {
            onErrorNotif();
        },
    });
    const selectedCustomers = useAppSelector(getSelectedCustomers);

    const handleClick = () => {
        if (!isPrimaryComeFrom(comeFrom)) {
            resetByeSellData(dispatch, appDispatch);
            return;
        }
        handleCreateDraft();
    };

    const handleCreateDraft = () => {
        if (!selectedCustomers.length) {
            onErrorNotif({ title: t('common.notCustomerSelected') });
            return;
        }

        let customerISINs: ICustomerIsins = [];
        let customerTagTitles: ICustomerIsins = [];
        let gtTraderGroupId: ICustomerIsins = [];

        selectedCustomers.forEach((c: IGoMultiCustomerType) => {
            if (c.customerType === ICustomerTypeEnum.Legal || c.customerType === ICustomerTypeEnum.Natural) customerISINs.push(c.customerISIN);
            // else if (c.customerType === ICustomerTypeEnum.CustomerTag) customerTagTitles.push(c.title);
            // else if (c.customerType === ICustomerTypeEnum.TraderGroup) gtTraderGroupId.push(c.customerISIN);
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
            validityDate: validityDate || null,
            percent: percent || 0,
            orderStrategy: strategy,
            orderType: 'LimitOrder',
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
