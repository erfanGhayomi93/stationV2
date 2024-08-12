import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useFreezeRequest, useGetMiniPortfolios } from 'src/app/queries/option'
import Checkbox from 'src/common/components/Checkbox/Checkbox'
import CustomerMiniSelect from 'src/common/components/CustomerMiniSelect'
import FilterBlock from 'src/common/components/FilterBlock'
import Input from 'src/common/components/Input'
import { onSuccessNotif } from 'src/handlers/notification'
import { useAppSelector } from 'src/redux/hooks'
import { getUserData } from 'src/redux/slices/global'

type dataType = {
    Symbol: string,
    Customer: IGoMultiCustomerType[]
}

export const FreezeTab: FC<{ closeModal: () => void }> = ({ closeModal }) => {
    //
    const { t } = useTranslation();

    const [data, setData] = useState<dataType>({
        Symbol: "",
        Customer: [],
    })

    const [selectedSymbol, setSelectedSymbol] = useState<IResponseMiniPortfolios[]>([]);


    const { data: FreezeList } = useGetMiniPortfolios({
        customerISIN: data.Customer.map(item => item.customerISIN)
    }, {
        enabled: data.Customer.length > 0
    })

    const { mutate } = useFreezeRequest({
        onSuccess() {
            onSuccessNotif({ title: "با موفقیت انجام شد" })
            closeModal()
        },
    })

    const { userName } = useAppSelector(getUserData)

    const handleChangeCheckbox = (checked: boolean, row: IResponseMiniPortfolios) => {
        if (checked) {
            setSelectedSymbol(prev => [...prev, { ...row }]);
        } else {
            setSelectedSymbol(prev => prev.filter(item => !(item.symbol.symbolISIN === row.symbol.symbolISIN && item.customerISIN === row.customerISIN)));
        }
    };

    const handleSubmit = () => {

        const payload = {
            symbolISIN: selectedSymbol?.map(item => item.symbol.symbolISIN),
            type: "Freeze",
            userName: userName,
            customerISIN: data?.Customer[0]?.customerISIN,
        }

        mutate(payload)
    }



    return (
        <div className='p-2 flex flex-col h-full'>
            <div className='flex-1 flex flex-col gap-4'>
                <FilterBlock label={t('FilterFieldLabel.Customer')} className="col-span-3 text-right" viewCol>
                    <CustomerMiniSelect
                        selected={data.Customer}
                        setSelected={(value) => setData(prev => ({ ...prev, Customer: value }))}
                        filterCustomerType={false}
                    />
                </FilterBlock>

                <FilterBlock label={t('FilterFieldLabel.Symbol')} className="col-span-3 text-right" viewCol>
                    <Input
                        value={data.Symbol}
                        onChange={(e) => setData(prev => ({ ...prev, Symbol: e?.target?.value }))}
                        placeholder="جستجوی نماد"
                        inputClassName="placeholder:text-xs"
                    />
                </FilterBlock>
            </div>

            <div className="mt-3 overflow-y-auto grid grid-rows-min-one">
                <div className="flex h-8 bg-L-gray-200 dark:bg-D-gray-200 rounded-t-lg font-semibold text-sm gap-y-1">
                    <div className="flex items-center justify-start border-l border-L-basic dark:border-D-basic pr-3 w-1/3">
                        نماد
                    </div>
                    <div className="flex items-center justify-center text-L-gray-500 dark:text-D-gray-700 border-l border-L-basic dark:border-D-basic pr-3 w-1/3">
                        مشتری
                    </div>
                    <div className='flex items-center justify-center text-L-gray-500 dark:text-D-gray-700 pr-3 w-1/3'>
                        دارایی
                    </div>
                </div>

                <div className="flex flex-col h-48 mb-1 overflow-y-auto">
                    {FreezeList
                        ?.filter(item => {
                            if(item.isFreezed) return false;
                            else if (!data.Symbol) return true;
                            return item.symbol.symbolTitle.includes(data.Symbol);
                        })
                        ?.map((item, ind) => (
                            <div className="flex even:bg-L-gray-200 even:dark:bg-D-gray-200 hover:bg-L-gray-300 hover:dark:bg-D-gray-300 py-2 text-xs" key={ind}>
                                <div className="w-1/3 mr-2">
                                    <Checkbox
                                        checked={!!item?.symbol.symbolISIN && selectedSymbol.some(s => s.symbol.symbolISIN === item.symbol.symbolISIN && s.customerISIN === item.customerISIN)}
                                        onChange={(checked) => handleChangeCheckbox(checked, item)}
                                        label={item.symbol.symbolTitle}
                                        classes={{ text: '!text-L-gray-500 !dark:text-D-gray-700' }}
                                    />
                                </div>
                                <div className="w-1/3 mr-2">
                                    {item.customerTitle}
                                </div>
                                <div className="w-1/3 mr-2">
                                    {item.asset}
                                </div>
                            </div>
                        ))}
                </div>
            </div>


            <button
                className='px-4 py-2 bg-L-success-200 dark:bg-D-success-200 text-L-basic dark:text-D-basic rounded disabled:opacity-50'
                onClick={handleSubmit}
                disabled={selectedSymbol.length === 0}
            >
                درخواست فریز
            </button>
        </div>
    )
}
