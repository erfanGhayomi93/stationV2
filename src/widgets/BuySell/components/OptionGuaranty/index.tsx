import { useTranslation } from "react-i18next"
import { useGetSumPrice, useGetSymbolBaseAssetsByOption, useListAvailableCustomerPositions } from "src/app/queries/option"
import { ArrowDropDown, ArrowDropUp, CloseIcon, MoreDotsIcon } from "src/common/icons"
import { useAppSelector } from "src/redux/hooks"
import { getUserData } from "src/redux/slices/global"
import { getSelectedCustomers, getSelectedSymbol } from "src/redux/slices/option"
import { useBuySellDispatch, useBuySellState } from "../../context/BuySellContext"
import { FC, useMemo, useState } from "react"
import { seprateNumber } from "src/utils/helpers"
import Modal from "src/common/components/Modal"
import Radiobox from "src/common/components/Radiobox"
import clsx from "clsx"
import { onErrorNotif, onInfoNotif } from "src/handlers/notification"
import useDebounce from "src/common/hooks/useDebounce"
import { Disclosure, Transition } from '@headlessui/react';




interface IOptionGuarantyProps {
    symbolData: SymbolData
}


export const OptionGuaranty: FC<IOptionGuarantyProps> = ({ symbolData }) => {

    const { t } = useTranslation()

    const [openModal, setOpenModal] = useState(false)

    const { brokerCode } = useAppSelector(getUserData);

    const customers = useAppSelector(getSelectedCustomers)

    const { price, quantity, side, source } = useBuySellState();

    const dispatch = useBuySellDispatch();

    const setSource = (value: string) => dispatch({ type: 'SET_SOURCE', value });

    const selectedSymbol = useAppSelector(getSelectedSymbol)

    const [isOpenPosition, setIsOpenPosition] = useState(false);

    const contractSize = symbolData?.contractSize || 1;
    const optionContractType = symbolData?.optionContractType;


    const priceDebounce = useDebounce(price, 1000)
    const quantityDebounce = useDebounce(quantity, 1000)


    const { data } = useGetSumPrice({
        brokerCode: brokerCode || "",
        customerISIN: !!customers[0] ? customers[0].customerISIN : "18990069635676",
        orderSide: side,
        price: priceDebounce,
        quantity: quantityDebounce,
        symbolISIN: selectedSymbol
    }, {
        enabled: symbolData?.isOption && !!priceDebounce && !!quantityDebounce && side === 'Sell'
    })

    const { data: baseAssets } = useGetSymbolBaseAssetsByOption({
        customerISIN: !!customers[0] ? customers[0].customerISIN : undefined,
        symbolISIN: selectedSymbol
    }, {
        enabled: openModal && !!customers[0]
    })

    const { data: dataAvailableCustomerPositions } = useListAvailableCustomerPositions({
        customerISIN: !!customers[0] ? customers[0].customerISIN : "",
        symbolISIN: selectedSymbol
    }, {
        enabled: isOpenPosition
    })

    const closeModal = () => {
        setOpenModal(false)
    }

    const handleCheckCustomerSelected = () => {
        if (!customers.length) {
            onInfoNotif({ title: t('common.notCustomerSelected') });
            return true
        }
        else if (customers.length > 1) {
            onInfoNotif({ title: t('alerts.just_selected_one_customer') })
            return true
        }
        return false
    }


    const canGuarantyWithPortfolio = useMemo(() => Boolean(baseAssets?.asset && baseAssets?.asset >= (quantity * contractSize)), [baseAssets?.asset, quantity]);

    const handleCheckPortfolioChange = () => {
        if (handleCheckCustomerSelected()) return

        else if (!canGuarantyWithPortfolio) {
            onInfoNotif({ title: t('alerts.bs_baseSymbol_is_not_exist', { n: seprateNumber((quantity * contractSize) - (baseAssets?.asset ?? 0)) }) })
            return
        }

        else if (!baseAssets?.isFreeze) {
            onInfoNotif({ title: t('alerts.bs_baseSymbol_is_not_freezed') })
            return
        }

        setSource('Portfolio')
    }

    const handleChangeOpenPosition = () => {
        if (handleCheckCustomerSelected()) return

        setIsOpenPosition(!isOpenPosition)
    }

    const handleOpenModal = () => {
        if (!price || price <= 0) {
            onErrorNotif({ title: t('common.invalidOrderPrice') });
            return
        }

        else if (!quantity || quantity <= 0) {
            onErrorNotif({ title: t('common.invalidOrderQuantity') });
            return
        }

        setOpenModal(true)
    }


    return (
        <div>
            <div className="flex">
                <div className="flex items-center flex-1 box-border">
                    <span className="w-[72px] pr-1 whitespace-nowrap">{t('options.lable_quaranty')}</span>

                    <div
                        className="px-2 h-8 flex-1 flex items-center justify-between bg-L-basic dark:bg-D-basic border border-L-gray-400 dark:border-D-gray-400 rounded-md box-border cursor-pointer"
                        onClick={handleOpenModal}
                    >

                        <span className="text-gray-700 dark:text-D-gray-700">
                            {
                                source === "Account" ? t('option_blockType.Account') : source === "Portfolio" ? t('option_blockType.Portfolio') : t('option_blockType.Position') + " " + source?.split('-')[2]
                            }
                        </span>

                        <button className="flex gap-x-4 items-center justify-center text-gray-700 dark:text-D-gray-700 box-border">
                            <span>
                                {source === "Account" ? seprateNumber(data?.totalBlock || 0) : source === "Portfolio" ? seprateNumber(quantity * contractSize) : quantity}
                            </span>

                            <MoreDotsIcon />
                        </button>

                    </div>
                </div>
            </div>


            <Modal
                isOpen={openModal}
                onClose={closeModal}
                className="w-[400px]"
            >

                <div className="bg-L-basic dark:bg-D-basic">
                    <div className="w-full font-semibold  bg-L-primary-50 dark:bg-D-primary-50 text-L-basic dark:text-D-basic h-10 flex items-center justify-between px-5">
                        <div>{t('options.choose_guaranty_method')}</div>
                        <CloseIcon onClick={closeModal} className="cursor-pointer" />
                    </div>

                    <div className="p-4">
                        <div className={clsx('rounded-md p-2 flex items-center justify-between text-L-gray-600 dark:text-D-gray-600', {
                            'bg-L-gray-300 dark:bg-D-gray-300': source === 'Account'
                        })}>
                            <Radiobox
                                checked={source === 'Account'}
                                label={t('option_blockType.Account')}
                                onChange={() => setSource('Account')}
                                classes={{ label: "text-sm" }}
                            />

                            <span>
                                {seprateNumber(data?.totalBlock || 0) + " "}
                                {t('common.rial')}
                            </span>
                        </div>
                        <p className="text-L-gray-600 dark:text-D-gray-600 mt-2 mb-4 text-right text-xs">
                            مبلغ فوق جهت وجه تضمین برای اخذ موقعیت فروش لازم است.
                        </p>

                        {
                            optionContractType === 'Call' && (
                                <>
                                    <div className={clsx('rounded-md p-2 flex items-center justify-between mt-2 text-L-gray-600 dark:text-D-gray-600', {
                                        'bg-L-gray-300 dark:bg-D-gray-300': source === 'Portfolio'
                                    })}>
                                        <Radiobox
                                            checked={source === 'Portfolio'}
                                            label={t('option_blockType.Portfolio')}
                                            onChange={() => handleCheckPortfolioChange()}
                                            classes={{ label: "text-sm" }}
                                        />

                                        <span>
                                            {seprateNumber(quantity * contractSize)}
                                            {" "}
                                            {t('common.share')}
                                        </span>
                                    </div>

                                    <p className="text-L-gray-600 dark:text-D-gray-600 text-right text-xs">{t('symbol_option.baseSymbol_required', { n: !canGuarantyWithPortfolio ? seprateNumber((quantity * contractSize) - (baseAssets?.asset ?? 0)) : 'فوق' })}</p>
                                </>
                            )
                        }


                        <Disclosure>
                            <Disclosure.Button
                                onClick={handleChangeOpenPosition}
                                className='w-full text-L-gray-600 dark:text-D-gray-600 px-2'
                            >
                                <div className="text-right flex justify-between w-full mt-5">
                                    <div className="flex">
                                        {!isOpenPosition && <ArrowDropDown width={18} height={18} />}
                                        {isOpenPosition && <ArrowDropUp width={18} height={18} />}
                                        <span>{t('option_blockType.Position')}</span>
                                    </div>
                                    <span>
                                        {quantity}
                                        {" "}
                                        موقعیت
                                    </span>
                                </div>
                            </Disclosure.Button>
                            <Transition
                                show={isOpenPosition}
                                enter="transition-height duration-500 ease-out"
                                enterFrom="height-0"
                                enterTo="height-auto"
                                leave="transition-height duration-150 ease-out"
                                leaveFrom="height-auto"
                                leaveTo="height-0"
                            >
                                {isOpenPosition && (
                                    <Disclosure.Panel>
                                        <CustomerPositions
                                            dataAvailableCustomerPositions={dataAvailableCustomerPositions?.result || []}
                                            quantity={quantity}
                                            source={source || ""}
                                            setSource={setSource}
                                        />
                                    </Disclosure.Panel>
                                )}
                            </Transition>
                        </Disclosure>


                        <button
                            className="bg-L-blue-200 dark:bg-D-blue-200 w-full text-L-basic dark:text-L-basic py-2 rounded-md mt-7"
                            onClick={closeModal}
                        >
                            تایید
                        </button>
                    </div>
                </div>

            </Modal >

        </div >
    )
}




interface CustomerPositionsProps {
    dataAvailableCustomerPositions: IResponseAvailableCustomerPositions[];
    quantity: number;
    source: string;
    setSource: (source: string) => void;
}

const CustomerPositions: React.FC<CustomerPositionsProps> = ({ dataAvailableCustomerPositions, quantity, source, setSource }) => {
    const { t } = useTranslation();

    const sortedPositions = dataAvailableCustomerPositions.sort((a, b) => b.customersOpenPositions - a.customersOpenPositions);

    const renderPositionItem = (item: IResponseAvailableCustomerPositions, ind: number) => {
        const isSelected = source === `Position-${item.symbolISIN}-${item.symbolTitle}`;
        const meetsQuantityRequirement = item.customersOpenPositions >= quantity && quantity !== 0;

        if (meetsQuantityRequirement) {
            return (
                <div key={ind} className={clsx('flex justify-between px-1 py-2 text-L-gray-600 dark:text-D-gray-600', {
                    'bg-L-gray-300 dark:bg-D-gray-300': isSelected
                })}>
                    <Radiobox
                        checked={isSelected}
                        label={item.symbolTitle}
                        onChange={() => setSource(`Position-${item.symbolISIN}-${item.symbolTitle}`)}
                        classes={{ label: "text-xs text-L-gray-600 dark:text-D-gray-600" }}
                    />
                    <span className="px-1">{item.customersOpenPositions}</span>
                </div>
            );
        }

        return (
            <p key={ind} className="px-1 py-2 odd:bg-L-gray-100 odd:dark:bg-D-gray-100 text-right text-L-gray-600 dark:text-D-gray-600 rounded-md text-xs">
                {item.symbolTitle}
            </p>
        );
    };

    return (
        <div className="flex flex-col gap-y-1 max-h-24 min-h-10 overflow-y-auto">
            {sortedPositions?.map(renderPositionItem)}
            {!dataAvailableCustomerPositions.length && (
                <p className="text-xs text-right text-L-gray-600 dark:text-D-gray-600">
                    {t('options.blocked_position_info')}
                </p>
            )}
        </div>
    );
};

