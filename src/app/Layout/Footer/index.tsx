import React from 'react';
import PushEngineInfo from './PushEngineInfo';
import SymbolsPreview from './SymbolsPreview';

const Footer = () => {
    //
    return (
        <div className="bg-[#F8F8F8] h-[40px] max-h-[40px] max-w-full w-full items-center  px-4  grid grid-cols-min-one">
            <div className=" flex h-full overflow-x-auto  items-center  cursor-grab snap-x select-none " onScroll={(e) => console.log(e)}>
                <SymbolsPreview />
            </div>
            <div className="flex h-full  items-center whitespace-nowrap">
                <div className="h-full border mx-1 border-sky-200" />
                <PushEngineInfo />
            </div>
        </div>
    );
};

export default Footer;
