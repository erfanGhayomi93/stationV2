import clsx from 'clsx';
import SymbolState from 'src/common/components/SymbolState';
import { CloseIcon, UploadExcelIcon } from 'src/common/icons';
import Seperator from '../Seperator';


const Header = () => {
    return (
        <div className={clsx('ltr grid grid-cols-3 items-center bg-L-gray-100 border-L-gray-200 border-b-[1px] py-3 px-6 rounded-t-2xl')}>
            <HeaderActions />
            <HeaderTitle />
        </div>
    );
};

const HeaderTitle = () => {
    return (
        <div className="w-full flex justify-center items-center gap-1">
            <h4 className="text-L-info-100">{'زفجرا'}</h4>
            <h4 className="mr-1">{'ارسال خرید عرضه اولیه نماد'}</h4>
            <SymbolState symbolState="OrderEntryAuthorized_Open" />
        </div>
    );
};

const HeaderActions = () => {
    return (
        <div className="w-full h-full flex items-center gap-4 text-L-gray-600">
            <button onClick={() => {}}>
                <CloseIcon />
            </button>
            <Seperator />
            <button onClick={() => {}}>
                <UploadExcelIcon />
            </button>
        </div>
    );
};

export default Header;
