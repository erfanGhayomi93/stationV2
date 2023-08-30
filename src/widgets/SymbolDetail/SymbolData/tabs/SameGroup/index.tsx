import React from 'react';
import ResultHeader from './components/ResultHeader';
import ResultItems from './components/ResultItems';
import { useAppValues } from 'src/redux/hooks';
import { useGetSameSectorSymbols } from 'src/app/queries/symbol';

const SameGroup = () => {
  //
  const {
    option: { selectedSymbol },
} = useAppValues();

    const { data } = useGetSameSectorSymbols(selectedSymbol,)
    
    return (
        <div className="flex flex-col h-full">
            <div className="sticky top-0">
                <ResultHeader />
            </div>
            <div className="overflow-y-auto">
                {Array.apply(null, Array(10)).map((x, ind) => (
                    <ResultItems key={ind} volume={ind} />
                ))}
            </div>
        </div>
    );
};

export default SameGroup;
