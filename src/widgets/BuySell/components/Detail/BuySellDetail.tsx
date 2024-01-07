import { FC, useMemo } from 'react';
import { useSymbolGeneralInfo } from 'src/app/queries/symbol';
import Switcher from 'src/common/components/SwitchButton';
import { useBuySellDetail } from 'src/common/hooks/useCommission/useCommissionValue';
import { useAppSelector } from 'src/redux/hooks';
import { seprateNumber } from 'src/utils/helpers';
import { useBuySellDispatch, useBuySellState } from '../../context/BuySellContext';
import { getSelectedSymbol } from 'src/redux/slices/option';
import { MoreInfo } from 'src/common/icons';
import Tippy from '@tippyjs/react';

interface IBuySellDetailType { }

const BuySellDetail: FC<IBuySellDetailType> = ({ }) => {
    const selectedSymbol = useAppSelector(getSelectedSymbol)

    const dispatch = useBuySellDispatch();
    const setSequential = useMemo(() => (value: boolean) => dispatch({ type: 'SET_SEQUENTIAL', value }), []);
    const setDivide = (value: boolean) => dispatch({ type: 'SET_DIVIDE', value });

    const { price, quantity, sequential, divide, side } = useBuySellState();
    const { data: marketUnit } = useSymbolGeneralInfo(selectedSymbol, { select: (data) => data.symbolData.marketUnit });
    const { commission, cost, drawValue } = useBuySellDetail({ quantity, price, marketUnit, side });

    return (
        <div className="border-t flex flex-col pt-2    h-full gap-2 ">
            <div className="flex  text-L-gray-500 px-2 gap-16 min-h-[1.5rem]">
                {/* <div className="flex justify-between items-center text-L-gray-500 w-full">
                    <span>دارایی فعلی</span>
                    <span>999,999,999,999</span>
                </div> */}
                <div className="flex justify-between items-center text-L-gray-500 w-full">
                    <div className='flex gap-x-1'>
                        {/* <Tippy
                            content={
                                <div className="flex flex-col gap-1">
                                        das
                                </div>
                            }
                        >
                            <MoreInfo className='text-L-info-100 dark:text-D-info-100' />
                        </Tippy> */}
                        <span>ارزش معامله</span>
                    </div>
                    <span>{seprateNumber(cost)}</span>
                </div>
                <div className="flex justify-between items-center text-L-gray-500  w-full ">
                    <span>کارمزد معامله</span>
                    <span>{seprateNumber(Math.floor(commission))}</span>
                </div>
            </div>
            <div className="flex  text-L-gray-500 px-2 gap-16 min-h-[1.5rem]">
                {side === 'Buy' ? (
                    <>
                        <div className="flex justify-between items-center text-L-gray-500 w-full">
                            <span>قیمت سر به سر</span>
                            <span>{seprateNumber(drawValue)}</span>
                        </div>
                        <div className="flex justify-between items-center text-L-gray-500  w-full outline-none">
                            <span>سفارش پی در پی</span>
                            <Switcher onCheck={setSequential} value={sequential} />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex justify-between items-center text-L-gray-500  w-full outline-none">
                            <span>سفارش پی در پی</span>
                            <Switcher onCheck={setSequential} value={sequential} />
                        </div>
                        <div className="w-full"></div>
                    </>
                )}
            </div>
            {/* <div className="flex  text-L-gray-500 px-2 gap-16 ">
               
                <div className="flex justify-between items-center text-L-gray-500  w-full outline-none">
                    <span>تقسیم سفارش</span>
                    <Switcher onCheck={setDivide} value={divide} />
                </div>
            </div> */}
        </div>
    );
};

export default BuySellDetail;
