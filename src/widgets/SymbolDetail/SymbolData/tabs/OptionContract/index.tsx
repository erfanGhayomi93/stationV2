import React from 'react'
import { useGetOptionContract } from 'src/app/queries/symbol'
import { useAppSelector } from 'src/redux/hooks'
import { getSelectedSymbol } from 'src/redux/slices/option'
import ResultHeader from '../SameGroup/components/ResultHeader'
import ResultItems from '../SameGroup/components/ResultItems'

export const OptionContract = () => {
    const selectedSymbol = useAppSelector(getSelectedSymbol)

    const { data } = useGetOptionContract(selectedSymbol)

    return (
        <div className="flex flex-col h-full">
            <div className="sticky top-0">
                <ResultHeader />
            </div>
            <div className="overflow-y-auto">
                {data?.map((item, ind) => (
                    <ResultItems data={item} key={ind} />
                ))}
            </div>
        </div>
    )
}
