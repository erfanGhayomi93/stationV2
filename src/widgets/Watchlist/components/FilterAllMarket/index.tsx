import { useEffect } from 'react';
import { UseGetSector } from 'src/app/queries/watchlist';
import SelectType from 'src/common/components/SelectType';
import { ArrowLeftAlt } from 'src/common/icons';
import { useWatchListState } from '../../context/WatchlistContext';

export const FilterAllMarket = () => {
    const { data: dataSector } = UseGetSector();
    const {
        state: { sector, marketUnit },
        setState,
    } = useWatchListState();

    useEffect(() => {
        return () => {
            setState({ type: 'SET_PageNumber', value: 1 });
        };
    }, []);


    return (
        <div className="flex items-stretch">
            <div className="flex items-center ml-7">
                <p className="ml-1">نمایش بر اساس </p>
                <ArrowLeftAlt />
            </div>

            <div className="flex items-center gap-3 pl-3 border-l-2 border-L-gray-350 dark:border-D-gray-350">
                <p className="pl-1">نوع بازار:</p>

                {typeMarket.map((item, ind) => (
                    <div key={ind} className="flex">
                        <input
                            name="marketUnit"
                            id={item.type}
                            type="radio"
                            checked={marketUnit === item.type}
                            // onChange={() => handleOnchange('SET_MarketUnit_Filter', item.type)}
                            onChange={() => setState({ type: "SET_MarketUnit_Filter", value: item.type })}
                        />
                        <label htmlFor={item.type} className="pr-1.5 cursor-pointer">
                            {item.label}
                        </label>
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-1 px-3">
                <span>صنایع :</span>
                <div className="min-w-[12.5rem]">
                    <SelectType
                        value={sector}
                        onChange={(data) => setState({ type: "SET_Sector_Filter", value: data as ISectorList })}
                        options={dataSector || []}
                        placeholder="انواع صنعت"
                    />
                </div>
            </div>

            {/* <div className="flex items-center gap-1 px-3">
                <span>اوراق :</span>
                <div className=" min-w-[8.5rem]">
                    <Select
                        onChange={() => null}
                        inputClassName="bg-L-basic  dark:bg-D-basic border-L-gray-350 dark:border-D-gray-350 border rounded-md py-1.5 pr-3 pl-10"
                        placeholder="همه"
                    >
                        {industry.map((item, inx) => (
                            <SelectOption
                                key={inx}
                                // label={t('OrderState.' + item.value)}
                                // value={item.value}
                                label={item.label}
                                value=""
                                className="text-1.2 cursor-default select-none py-1.5 pl-10 pr-4 "
                            />
                        ))}
                    </Select>
                </div>
            </div> */}
        </div>
    );
};

const typeMarket = [
    {
        label: 'همه',
        type: '',
    },
    {
        label: 'بورس',
        type: 'Exchange',
    },
    {
        label: 'فرابورس',
        type: 'FaraBourse',
    },
];
