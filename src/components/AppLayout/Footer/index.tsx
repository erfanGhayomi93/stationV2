import React from 'react';
import PushEngineInfo from './PushEngineInfo';
import SymbolsPreview from './SymbolsPreview';

const Footer = () => {
    //
    return (
        <div className="bg-[#F8F8F8] h-[40px] flex flex-row-reverse items-center justify-start px-4 py-2">
            <div>
                <PushEngineInfo />
            </div>
            <div className="h-full border mx-1 border-sky-200" />
            <div className="grow">
                <SymbolsPreview />
            </div>
        </div>
    );
};

export default Footer;
