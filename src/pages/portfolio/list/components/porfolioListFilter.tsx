import { Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import FilterBlock from "src/common/components/FilterBlock"
import Select from "src/common/components/Select"
import { customerTypeFieldOptions } from "../constant"
import CustomerMegaSelect from "src/common/components/CustomerMegaSelect"
import SymbolMiniSelect from "src/common/components/SymbolMiniSelect"
import { marketUnitTypeOption } from "src/constant/global"
import { useMarketUnit } from "src/app/queries/symbol"
// import AXIOS from "src/api/axiosInstance"

type portfolioListFilterType = {
    filterData: TPortfolioListFilter,
    setFilterData: Dispatch<SetStateAction<TPortfolioListFilter>>
    onSubmit: () => void;
    onClear: () => void;
}


export const PortfolioListFilter: FC<portfolioListFilterType> = ({ filterData, setFilterData, onSubmit, onClear }) => {
    const { t } = useTranslation()

    const { customerType, CustomerISIN, SymbolISIN, MarketUnitType, MarketType } = filterData

    const { data: marketUnitData } = useMarketUnit()

    const marketUnitOption = useMemo(() => {
        if (!marketUnitData?.result) return []

        const options = marketUnitData?.result
            .filter(item => item.code !== "067" && item.code !== "068" && item.code !== "069" && item.code !== "070")
            .map(item => ({
                value: item.type, label: item.title
            }))

        return [
            { value: "", label: t("common.all") },
            ...options
        ]
    }, [marketUnitData])




    const handleValueChange = <T extends keyof TPortfolioListFilter>(part: T, value: TPortfolioListFilter[T]) => {
        setFilterData((pre) => ({ ...pre, [part]: value }));
    };

    return (
        <div className="bg-L-gray-100 dark:bg-D-gray-100 rounded-md px-4 py-2 flex">
            <div className="w-full h-full grid grid-cols-16 gap-4">
                <FilterBlock label={t('FilterFieldLabel.CustomerType')} className='col-span-2'>
                    <Select
                        onChange={(selected) => handleValueChange('customerType', selected)}
                        value={customerType}
                        options={customerTypeFieldOptions}
                    />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.Customer')} className="col-span-3">
                    <CustomerMegaSelect
                        setSelected={(selected) => handleValueChange('CustomerISIN', selected)}
                        selected={CustomerISIN as any}
                    />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.Symbol')} className="col-span-3">
                    <SymbolMiniSelect multiple selected={SymbolISIN} setSelected={(selected) => handleValueChange('SymbolISIN', selected)} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.Market')} className="">
                    <Select value={MarketUnitType} onChange={(selected) => handleValueChange('MarketUnitType', selected)} options={marketUnitTypeOption} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.MarketUnit')} className="col-span-3">
                    <Select value={MarketType} onChange={(selected) => handleValueChange('MarketType', selected)} options={marketUnitOption} />
                </FilterBlock>

                <div className="flex gap-1 col-span-3">

                    <button
                        onClick={onSubmit}
                        className="bg-L-primary-50 w-[96px] block dark:bg-D-primary-50 py-1 border border-L-primary-50 dark:border-D-primary-50 text-L-basic dark:text-D-basic rounded"
                    >
                        {t('Action_Button.Search')}
                    </button>

                    <button
                        onClick={onClear}
                        className="bg-L-primary-100  whitespace-nowrap w-[72px] dark:bg-D-primary-100 py-1 border border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50 rounded"
                    >
                        {t('Action_Button.Remove')}
                    </button>
                </div>
            </div>
        </div>
    )
}
