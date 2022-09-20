import { FC, useEffect } from 'react';
import { useSymbolGeneralInfo } from 'src/app/queries/symbol';
import Switcher from 'src/common/components/SwitchButton';
import { useBuyDetail } from 'src/common/hooks/useCommission/useCommissionValue';
import { useAppValues } from 'src/redux/hooks';
import { seprateNumber } from 'src/utils/helpers';
import { useBuySellDispatch, useBuySellState } from '../../context/BuySellContext';

interface IBuySellDetailType {}

const BuySellDetail: FC<IBuySellDetailType> = ({}) => {
    const {
        option: { selectedSymbol },
    } = useAppValues();

    const dispatch = useBuySellDispatch();
    const setSequential = (value: boolean) => dispatch({ type: 'SET_SEQUENTIAL', value });

    const { price, quantity, sequential } = useBuySellState();
    const { data: marketUnit } = useSymbolGeneralInfo(selectedSymbol, { select: (data) => data.symbolData.marketUnit });
    const { commision, cost, drawValue } = useBuyDetail({ quantity, price, marketUnit });

    return (
        <div className="border-t flex flex-col pt-4 border-L-gray-300  h-full gap-2 ">
            <div className="flex  text-L-gray-400 px-2 gap-16">
                <div className="flex justify-between items-center text-L-gray-400 w-full">
                    <span>ارزش معامله</span>
                    <span>{seprateNumber(cost)}</span>
                </div>
                <div className="flex justify-between items-center text-L-gray-400  w-full ">
                    <span>کارمزد معامله</span>
                    <span>{seprateNumber(commision)}</span>
                </div>
            </div>
            <div className="flex  text-L-gray-400 px-2 gap-16">
                <div className="flex justify-between items-center text-L-gray-400 w-full">
                    <span>قیمت سر به سر</span>
                    <span>{seprateNumber(drawValue)}</span>
                </div>
                <div className="flex justify-between items-center text-L-gray-400  w-full outline-none ">
                    <span>سفارش پی در پی</span>
                    <Switcher onCheck={setSequential} value={sequential} />
                </div>
            </div>
        </div>
    );
};

export default BuySellDetail;
