import { FC, MutableRefObject, RefObject, useMemo, useRef } from 'react';
import { useSymbolGeneralInfo } from 'src/app/queries/symbol';
import Switcher from 'src/common/components/SwitchButton';
import { useBuySellDetail } from 'src/common/hooks/useCommission/useCommissionValue';
import { useAppSelector } from 'src/redux/hooks';
import { seprateNumber } from 'src/utils/helpers';
import { useBuySellDispatch, useBuySellState } from '../../context/BuySellContext';
import { getSelectedCustomers, getSelectedSymbol } from 'src/redux/slices/option';
import { MoreInfo } from 'src/common/icons';
import Tippy from '@tippyjs/react';
import { useGetSumPrice } from 'src/app/queries/option';
import { useGetCustomers } from 'src/app/queries/customer';
import { getUserData } from 'src/redux/slices/global';
import useUpdateEffect from 'src/common/hooks/useUpdateEffect';

let timeOut: NodeJS.Timeout

interface IBuySellDetailType { }

const BuySellDetail: FC<IBuySellDetailType> = ({ }) => {
    const selectedSymbol = useAppSelector(getSelectedSymbol)
    const customers = useAppSelector(getSelectedCustomers)
    const { brokerCode } = useAppSelector(getUserData);






    const dispatch = useBuySellDispatch();
    const setSequential = useMemo(() => (value: boolean) => dispatch({ type: 'SET_SEQUENTIAL', value }), []);
    const setDivide = (value: boolean) => dispatch({ type: 'SET_DIVIDE', value });

    const { price, quantity, sequential, side } = useBuySellState();
    const { data: symbolData } = useSymbolGeneralInfo(selectedSymbol, { select: (data) => ({ marketUnit: data.symbolData.marketUnit, isOption: data.symbolData.isOption, contractSize: data.symbolData.contractSize }) });
    const { commission, cost, drawValue, totalValue } = useBuySellDetail({ quantity, price, marketUnit: symbolData?.marketUnit, side });

    const { data, refetch } = useGetSumPrice({
        brokerCode: brokerCode || "",
        customerISIN: !!customers[0] ? customers[0].customerISIN : "",
        orderSide: side,
        price: price,
        quantity: quantity,
        symbolISIN: selectedSymbol
    })

    useUpdateEffect(() => {
        if (side === 'Sell') {
            clearTimeout(timeOut)
            timeOut = setTimeout(() => {
                refetch()
                clearTimeout(timeOut)
            }, 1000);
        }
    }, [price, quantity, side])

    return (
        <div className="border-t flex flex-col pt-2    h-full gap-2 ">
            <div className="flex  text-L-gray-500 px-2 gap-16 min-h-[1.5rem]">
                {/* <div className="flex justify-between items-center text-L-gray-500 w-full">
                    <span>دارایی فعلی</span>
                    <span>999,999,999,999</span>
                </div> */}
                <div className="flex justify-between items-center text-L-gray-500 w-full">
                    <div className='flex gap-x-1'>
                        {
                            symbolData?.isOption && (
                                <Tippy
                                    placement='bottom-end'
                                    content={
                                        <div className="flex flex-col gap-2 min-w-[270px] p-2">
                                            {
                                                side === "Sell" && (
                                                    <div className='flex justify-between gap-2'>
                                                        <span>وجه تضمین:</span>
                                                        <span>{seprateNumber(data?.totalBlock)}</span>
                                                    </div>
                                                )
                                            }
                                            <div className='flex justify-between gap-2'>
                                                <span>کارمزد:</span>
                                                <span>{seprateNumber(commission)}</span>
                                            </div>
                                            <div className='flex justify-between gap-2'>
                                                <span>ارزش (تعداد * قیمت * اندازه قرارداد):</span>
                                                <span>{seprateNumber(cost * Number(symbolData.contractSize))}</span>
                                            </div>
                                        </div>
                                    }
                                >
                                    <MoreInfo className='text-L-info-100 dark:text-D-info-100' />
                                </Tippy>
                            )
                        }
                        <span>مبلغ کل سفارش:</span>
                    </div>
                    <span>
                        {
                            (side === 'Sell' && !!symbolData?.isOption) ?
                                seprateNumber(data?.totalBlock || 0) :
                                seprateNumber(totalValue)
                        }
                    </span>
                </div>
                <div className="flex justify-between items-center text-L-gray-500  w-full ">
                    <span>کارمزد معامله</span>
                    <span>{seprateNumber(commission)}</span>
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
