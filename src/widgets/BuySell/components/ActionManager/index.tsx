import { FC } from 'react';
import { useBasketState } from 'src/pages/basket/context/BasketContext';
import InsertBasketAction from '../InsertBasketAction/InsertBasketAction';
import SetBasketAction from '../SetBasketAction';
import SetDraftAction from '../SetDraftAction';
import SetOrderAction from '../SetOrderAction';

interface IActionManagerType {}

const ActionManager: FC<IActionManagerType> = ({}) => {
    const basket = useBasketState();
    return (
        <div className="flex gap-3">
            {basket?.visible ? (
                <InsertBasketAction />
            ) : (
                <>
                    <SetOrderAction />
                    <SetDraftAction />
                    <SetBasketAction />
                </>
            )}
        </div>
    );
};

export default ActionManager;
