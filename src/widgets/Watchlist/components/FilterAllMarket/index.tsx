import { useEffect } from 'react';
import { UseGetSector } from 'src/app/queries/watchlist';
import SelectType from 'src/common/components/SelectType';
import { ArrowLeftAlt } from 'src/common/icons';
import { useWatchListState } from '../../context/WatchlistContext';
import Select from 'src/common/components/Select';
// import Select from "src/common/components/SelectAsync";


export const FilterAllMarket = () => {
    const { data: dataSector } = UseGetSector({
        staleTime: 1000 * 60 * 60,
        select(data) {
            return data.map(item => ({ id: item.id, title: item.sectorName}))
        }
    });
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
                <p className="ml-1 text-sm text-L-gray-700 dark:text-D-gray-700">نمایش بر اساس: </p>
                {/* <ArrowLeftAlt /> */}
            </div>

            <div className="flex text-sm items-center gap-3 pl-3 my-1 border-l-2 border-L-gray-400 dark:border-D-gray-400">
                <p className="pl-1 text-L-gray-600 dark:text-D-gray-600">نوع بازار:</p>

                {marketTypeOptions.map((item, ind) => (
                    <div key={ind} className="flex">
                        <input
                            name="marketUnit"
                            id={item.type}
                            type="radio"
                            checked={marketUnit === item.type}
                            // onChange={() => handleOnchange('SET_MarketUnit_Filter', item.type)}
                            onChange={() => setState({ type: 'SET_MarketUnit_Filter', value: item.type })}
                        />
                        <label htmlFor={item.type} className="pr-1.5 cursor-pointer text-L-gray-700 dark:text-D-gray-700">
                            {item.label}
                        </label>
                    </div>
                ))}
            </div>

            <div className="flex text-sm items-center gap-1 px-3 ">
                <span className='text-L-gray-600 dark:text-D-gray-600'>صنایع :</span>
                <div className="min-w-[12.5rem]">
                    <SelectType
                        value={sector}
                        onChange={(data) => setState({ type: 'SET_Sector_Filter', value: data as ISectorList })}
                        options={dataSector || []}
                        placeholder="انواع صنعت"
                    />
                </div>
                {/* <Select
                    classes={{
                        root: 'border rounded border-L-gray-200 dark:border-D-gray-200 min-w-[12.5rem]'
                    }}
                    options={dataSector}
                    value={sector}
                    onChange={(wl) => setState({ type: 'SET_Sector_Filter', value: wl })}
                    getOptionLabel={(wl) => wl.sectorName}
                    getOptionId={(wl) => wl.id}
                    placeholder={'انواع صنعت'}
                >
                    {(value) => (
                        <Select.Option option={value} />
                    )}
                </Select> */}
            </div>

            {/* <div className="flex items-center gap-1 px-3 my-1  border-r-2 border-L-gray-400 dark:border-D-gray-400">
                <span>اوراق :</span>
                <div className="min-w-[12.5rem]">
                    <SelectType
                        value={sector}
                        onChange={(data) => setState({ type: 'SET_Sector_Filter', value: data as ISectorList })}
                        options={oraghOptions || []}
                        placeholder="انواع صنعت"
                    />
                </div>
            </div> */}

        </div>
    );
};

const marketTypeOptions = [
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

// const oraghOptions = [
//     {
//         title: 'خزانه',
//         id: '',
//     },
//     {
//         title: 'تبعی',
//         id: '',
//     },
//     {
//         title: 'در اختیار',
//         id: '',
//     },
// ];

