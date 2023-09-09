import { useEffect } from 'react';
import ResultHeader from './components/ResultHeader';
import ResultItems from './components/ResultItems';
import { useAppValues } from 'src/redux/hooks';
import { useGetSameSectorSymbols } from 'src/app/queries/symbol';
import { subscriptionCoGroupSymbol } from 'src/ls/subscribes';
import { pushEngine } from 'src/ls/pushEngine';

const SameGroup = () => {
    const {
        option: { selectedSymbol },
    } = useAppValues();

    const { data } = useGetSameSectorSymbols(selectedSymbol)

    useEffect(() => {
        if (!!data && !!data.length) {
            subscriptionCoGroupSymbol(data, selectedSymbol)
        }
        return () => {
            pushEngine.unSubscribe("CoGroupSymbol")
        }
    }, [data])



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
    );
};

export default SameGroup;
