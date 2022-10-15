import { useQuery, useMutation } from '@tanstack/react-query';
import { FC, FormEvent } from 'react';
import AXIOS from 'src/api/axiosInstance';
import { SpinnerIcon } from 'src/common/icons';
import { queryClient } from 'src/app/queryClient';

interface IHelpType {}

interface ResJson {
    [key: string]: ResJsonLvl2;
}
interface ResJsonLvl2 {
    [key: string]: string;
}
interface IRes {
    applicationName: string;
    section: string;
    resourceKey: string;
    resourceValue: string;
    lan: string;
}

const Help: FC<IHelpType> = ({}) => {
    const { data, isLoading } = useQuery(['res'], () => AXIOS.get<ResJson>('https://resource.ramandtech.com/JsonResource/MobileTrader_Fa_01.json'), {
        select: (data) => data.data,
        cacheTime: 0,
        staleTime: 0,
    });

    const { mutate } = useMutation((data: IRes) => AXIOS.post('https://resource.ramandtech.com/Resource', data), {
        onSuccess: () => queryClient.invalidateQueries(['res']),
    });

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const applicationName = e.currentTarget.elements.namedItem('applicationName') as HTMLInputElement;
        const section = e.currentTarget.elements.namedItem('section') as HTMLInputElement;
        const resourceKey = e.currentTarget.elements.namedItem('resourceKey') as HTMLInputElement;
        const resourceValue = e.currentTarget.elements.namedItem('resourceValue') as HTMLInputElement;
        const lan = e.currentTarget.elements.namedItem('lan') as HTMLInputElement;
        mutate({
            applicationName: applicationName.value,
            section: section.value,
            resourceKey: resourceKey.value,
            resourceValue: resourceValue.value,
            lan: lan.value,
        });
    };

    return (
        <div className="grid gap-2 relative grid-cols-2 overflow-auto">
            <div className="bg-slate-100 relative border rounded-lg w-full h-full  p-10 overflow-y-auto">
                {isLoading ? (
                    <div className="bg-slate-50 w-full h-full bg-opacity-80 absolute left-0 top-0 flex items-center justify-center">
                        <SpinnerIcon className="text-L-primary-50" width={40} height={40} />
                    </div>
                ) : (
                    <></>
                )}
                {data &&
                    Object.entries(data).map((item, inx) => (
                        <details key={inx} className="even:bg-slate-200 py-2 px-3">
                            <summary>{item[0]}</summary>
                            <div className=" divide-y border-t bg-white   pr-10 ">
                                {item[1] &&
                                    Object.entries(item[1]).map((value, inx) => (
                                        <div key={inx} className="flex py-2">
                                            <strong>{value[0]} : </strong>
                                            <p>{value[1]}</p>
                                        </div>
                                    ))}
                            </div>
                        </details>
                    ))}
            </div>
            <div className="bg-slate-100 border rounded-lg w-full  p-10">
                <form onSubmit={onSubmit} className="flex flex-col gap-2">
                    <label className="w-full items-center justify-between  gap-2 flex">
                        applicationName:
                        <select name="applicationName" className="border w-[42rem] rounded-sm py-2 px-2">
                            <option value={'Admin'}>Admin</option>
                            <option value={'RamandTrader'}>RamandTrader</option>
                            <option value={'RamandExchangeTrader'}>RamandExchangeTrader</option>
                            <option value={'RamandExchangeAdmin'}>RamandExchangeAdmin</option>
                            <option value={'MobileTrader'}>MobileTrader</option>
                            <option value={'RamandExchangeMarketAdmin'}>RamandExchangeMarketAdmin</option>
                        </select>
                    </label>
                    <label className="w-full items-center justify-between  gap-2 flex">
                        section:
                        <input name="section" placeholder="section" className="border w-[42rem] rounded-sm py-2 px-2" />
                    </label>
                    <label className="w-full items-center justify-between  gap-2 flex">
                        resourceKey:
                        <input name="resourceKey" placeholder="resourceKey" className="border w-[42rem] rounded-sm py-2 px-2" />
                    </label>
                    <label className="w-full items-center justify-between  gap-2 flex">
                        resourceValue:
                        <input name="resourceValue" placeholder="resourceValue" className="border w-[42rem] rounded-sm py-2 px-2" />
                    </label>
                    <label className="w-full items-center justify-between  gap-2 flex">
                        language:
                        <input name="lan" placeholder="language" value={'Fa'} className="border w-[42rem] rounded-sm py-2 px-2" />
                    </label>

                    <button type={'submit'} className="bg-L-primary-50 text-white rounded-md py-2">
                        ذخیره
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Help;
