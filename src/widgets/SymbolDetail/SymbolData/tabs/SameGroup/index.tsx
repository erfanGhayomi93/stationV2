import { useEffect } from 'react';
import ResultHeader from './components/ResultHeader';
import ResultItems from './components/ResultItems';
import { useAppSelector } from 'src/redux/hooks';
import { useGetSameSectorSymbols } from 'src/app/queries/symbol';
import { subscriptionCoGroupSymbol } from 'src/ls/subscribes';
import { pushEngine } from 'src/ls/pushEngine';
import { getSelectedSymbol } from 'src/redux/slices/option';

const SameGroup = () => {
    const selectedSymbol = useAppSelector(getSelectedSymbol)

    const { data } = useGetSameSectorSymbols(selectedSymbol, {
        onSuccess: (data) => {
            if (!!data && !!data.length) {
                subscriptionCoGroupSymbol(data, selectedSymbol)
            }
        }
    })

    useEffect(() => {
        return () => {
            pushEngine.unSubscribe("CoGroupSymbol")
        }
    }, [])



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
