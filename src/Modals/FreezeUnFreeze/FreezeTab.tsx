import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useFreezeRequest } from 'src/app/queries/option'
import CustomerMiniSelect from 'src/common/components/CustomerMiniSelect'
import FilterBlock from 'src/common/components/FilterBlock'
import SymbolMiniSelect from 'src/common/components/SymbolMiniSelect'
import { onSuccessNotif } from 'src/handlers/notification'
import { useAppSelector } from 'src/redux/hooks'
import { getUserData } from 'src/redux/slices/global'

type dataType = {
    Symbol: SymbolSearchResult[],
    Customer: IGoMultiCustomerType[]
}

export const FreezeTab: FC<{ closeModal: () => void }> = ({ closeModal }) => {
    //
    const { t } = useTranslation();

    const [data, setData] = useState<dataType>({
        Symbol: [],
        Customer: [],
    })

    const { mutate } = useFreezeRequest({
        onSuccess() {
            onSuccessNotif({ title: "با موفقیت انجام شد" })
            closeModal()
        },
    })

    const { userName } = useAppSelector(getUserData)

    const handleSubmit = () => {

        const payload = {
            symbolISIN: data.Symbol?.map(item => item.symbolISIN),
            type: "Freeze",
            userName: userName,
            customerISIN: data?.Customer[0]?.customerISIN,
        }

        mutate(payload)
    }



    return (
        <div className='p-2 flex flex-col h-full'>
            <div className='flex-1 flex flex-col gap-4'>
                <FilterBlock label={t('FilterFieldLabel.Symbol')} className="col-span-3 text-right" viewCol>
                    <SymbolMiniSelect
                        selected={data?.Symbol}
                        setSelected={(selected) => setData(prev => ({ ...prev, Symbol: selected }))}
                    />
                </FilterBlock>


                <FilterBlock label={t('FilterFieldLabel.Customer')} className="col-span-3 text-right" viewCol>
                    <CustomerMiniSelect
                        selected={data.Customer}
                        setSelected={(value) => setData(prev => ({ ...prev, Customer: value }))}
                        filterCustomerType={false}
                    />
                </FilterBlock>
            </div>

            <button
                className='px-4 py-2 bg-L-success-200 dark:bg-D-success-200 text-L-basic dark:text-D-basic rounded disabled:opacity-50'
                onClick={handleSubmit}
                disabled={!data.Symbol.length || !data.Customer.length}
            >
                درخواست فریز
            </button>
        </div>
    )
}
