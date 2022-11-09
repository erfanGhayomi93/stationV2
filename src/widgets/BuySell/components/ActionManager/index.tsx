import { FC } from 'react';
import { ComeFromKeepDataEnum } from 'src/constant/enums';
import { useBuySellState } from '../../context/BuySellContext';
import InsertBasketAction from '../InsertBasketAction/InsertBasketAction';
import SetBasketAction from '../SetBasketAction';
import SetDraftAction from '../SetDraftAction';
import SetOrderAction from '../SetOrderAction';

interface IActionManagerType {}

const ActionManager: FC<IActionManagerType> = ({}) => {
    const { extra } = useBuySellState() as { extra: IBuySellExtra };

    return (
        <div className="flex gap-3  ">
            {extra && extra.from === ComeFromKeepDataEnum.Basket ? (
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
