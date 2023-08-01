import { useQuery } from '@tanstack/react-query';
import AXIOS from 'src/api/axiosInstance';
import PriceView from 'src/common/components/PriceView';
import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';

const MarketIndexes = () => {
    //

    const { isLoading, data } = useQuery(['MarketIndexes'], fetchIndexes, {
        select: (data) => {
            const kol = data?.find((x) => x.symbolISIN === 'IRX6XTPI0006');
            const hamVazn = data?.find((x) => x.symbolISIN === 'IRX6XTPI0026');
            return { kol, hamVazn };
        },
    });

    return (
        <div className="flex items-center ">
            <div className="flex items-center">
                <span className="ml-1">{data?.kol?.symbolTitle || ''}:</span>
                <PriceView price={data?.kol?.lastIndexValueInDay || 0} percentage={data?.kol?.changePercent || 0} />
            </div>
            <div className="flex items-center ml-2 mr-3">
                <span className="ml-1">{data?.hamVazn?.symbolTitle || ''}:</span>
                <PriceView price={data?.hamVazn?.lastIndexValueInDay || 0} percentage={data?.hamVazn?.changePercent || 0} />
            </div>
        </div>
    );
};

type IndexType = {
    symbolISIN: string;
    symbolTitle: string;
    lastIndexValueInDay: number;
    changePercent: number;
};

const fetchIndexes = async () => {
    const { data } = await AXIOS.get<GlobalApiResponseType<IndexType[]>>(Apis().Index.Symbols as string);
    return data?.result || {};
};

export default MarketIndexes;
