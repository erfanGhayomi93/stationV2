import PushEngineInfo from './PushEngineInfo';
import SymbolsPreview from './SymbolsPreview';

const Footer = () => {
    //
    return (
        <div className="bg-L-basic text-1.2 dark:bg-D-basic dark:text-L-basic text-D-basic border-L-gray-400 dark:border-D-gray-400 h-[40px] max-h-[40px] max-w-full w-full items-center  px-4  grid grid-cols-min-one border-t">
            <div className=" flex h-full overflow-x-auto  items-center  cursor-grab snap-x select-none ">
                <SymbolsPreview />
            </div>
            <div className="flex h-full  items-center whitespace-nowrap">
                <div className="h-full mx-1 " />
                <PushEngineInfo />
            </div>
        </div>
    );
};

export default Footer;
