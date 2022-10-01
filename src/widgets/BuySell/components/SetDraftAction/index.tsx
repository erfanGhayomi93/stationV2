import { FC } from 'react';
import { useCreateDraft } from 'src/app/queries/draft';
import { useAppValues } from 'src/redux/hooks';
import { useBuySellState } from '../../context/BuySellContext';

interface ISetDraftActionType {}

const SetDraftAction: FC<ISetDraftActionType> = ({}) => {
    const { mutate } = useCreateDraft();
    const {
        option: { selectedCustomers },
    } = useAppValues();
    const { side, price, quantity, strategy, symbolISIN, validity, validityDate, percent } = useBuySellState();

    const handleValidity = () => {
        if (validity === 'Day' || validity === 'Week' || validity === 'Month') return 'GoodTillDate';
        return validity;
    };

    const handleDraft = () => {
        let isins = selectedCustomers.map((c) => c.customerISIN);
        let isinsCommaSeparator = String(isins);

        mutate({
            symbolISIN: symbolISIN,
            price: price,
            quantity: quantity,
            side: side,
            validity: handleValidity(),
            validityDate: validityDate,
            customerISINs: isinsCommaSeparator,
            percent: percent || 0,
            orderStrategy: strategy,
            orderType: 'MarketOrder',
        });
    };

    return (
        <>
            <button
                onClick={handleDraft}
                className="flex items-center h-8 justify-center w-2/6 rounded text-L-primary-50 dark:bg-D-primary-50 border-L-primary-50 dark:border-D-primary-50 border "
            >
                پیش نویس
            </button>
        </>
    );
};

export default SetDraftAction;
