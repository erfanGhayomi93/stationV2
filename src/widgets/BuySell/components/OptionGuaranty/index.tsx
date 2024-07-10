import { useTranslation } from "react-i18next"
import { useGetSumPrice, useGetSymbolBaseAssetsByOption } from "src/app/queries/option"
import { CloseIcon, MoreDotsIcon } from "src/common/icons"
import { useAppSelector } from "src/redux/hooks"
import { getUserData } from "src/redux/slices/global"
import { getSelectedCustomers, getSelectedSymbol } from "src/redux/slices/option"
import { useBuySellDispatch, useBuySellState } from "../../context/BuySellContext"
import { FC, useMemo, useState } from "react"
import { seprateNumber } from "src/utils/helpers"
import Modal from "src/common/components/Modal"
import Radiobox from "src/common/components/Radiobox"
import clsx from "clsx"
import { onInfoNotif } from "src/handlers/notification"
import useDebounce from "src/common/hooks/useDebounce"



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

    const contractSize = symbolData.contractSize || 1;
    const optionContractType = symbolData.optionContractType;

    const dataDebounce = useDebounce({ price, quantity }, 1000)

    const { data } = useGetSumPrice({
        brokerCode: brokerCode || "",
        customerISIN: !!customers[0] ? customers[0].customerISIN : "18990069635676",
        orderSide: side,
        price: dataDebounce.price,
        quantity: dataDebounce.quantity,
        symbolISIN: selectedSymbol
    }, {
        enabled: symbolData?.isOption && !!dataDebounce.price && !!dataDebounce.quantity && side === 'Sell'
    })

    const { data: baseAssets } = useGetSymbolBaseAssetsByOption({
        customerISIN: !!customers[0] ? customers[0].customerISIN : undefined,
        symbolISIN: selectedSymbol
    }, {
        enabled: openModal && !!customers[0]
    })

    const closeModal = () => {
        setOpenModal(false)
    }


    const canGuarantyWithPortfolio = useMemo(() => Boolean(baseAssets?.asset && baseAssets?.asset >= (quantity * contractSize)), [baseAssets?.asset, quantity]);

    const handleCheckPortfolioChange = () => {
        if (!customers.length) {
            onInfoNotif({ title: t('common.notCustomerSelected') });
            return
        }
        else if (customers.length > 1) {
            onInfoNotif({ title: t('alerts.just_selected_one_customer') })
            return
        }
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


    return (
        <div>
            <div className="flex">
                <div className="flex items-center flex-1 box-border">
                    <span className="w-[72px] pr-1 whitespace-nowrap">{t('options.lable_quaranty')}</span>

                    <div
                        className="px-2 h-8 flex-1 flex items-center justify-between bg-L-basic dark:bg-D-basic border border-L-gray-400 dark:border-D-gray-400 rounded-md box-border cursor-pointer"
                        onClick={() => setOpenModal(true)}
                    >

                        <span className="text-gray-700 dark:text-D-gray-700">
                            {
                                source === "Account" ? t('option_blockType.Account') : source === "Portfolio" ? t('option_blockType.Portfolio') : ""
                            }
                        </span>

                        <button className="flex gap-x-4 items-center justify-center text-gray-700 dark:text-D-gray-700 box-border">
                            <span>
                                {source === "Account" ? seprateNumber(data?.totalBlock || 0) : seprateNumber(quantity * contractSize)}
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
                            'bg-L-gray-100 dark:bg-D-gray-100': source === 'Account'
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
                                        'bg-L-gray-100 dark:bg-D-gray-100': source === ' '
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


                        <button
                            className="bg-L-blue-200 dark:bg-D-blue-200 w-full text-L-basic dark:text-L-basic py-2 rounded-md mt-7"
                            onClick={closeModal}
                        >
                            تایید
                        </button>
                    </div>
                </div>

            </Modal>

        </div>
    )
}
