import clsx from 'clsx';
// import SymbolState from 'src/common/components/SymbolState';
import { CloseIcon } from 'src/common/icons';
import { IBuySellGroup } from 'src/redux/slices/BuySellGroupSlice';

interface IProps {
    handleClose: () => void;
    symbolTitle: string;
    mode: IBuySellGroup["mode"]
}

const Header = ({ handleClose, symbolTitle, mode }: IProps) => {
    return (
        <div className={clsx('ltr grid grid-cols-3 items-center border-L-gray-200 border-b-[1px] py-3 px-6 rounded-t-2xl bg-L-basic dark:bg-D-basic')}>
            <HeaderActions handleClose={handleClose} />
            <HeaderTitle symbolTitle={symbolTitle} mode={mode} />
        </div>
    );
};

const HeaderTitle = ({ symbolTitle, mode }: Pick<IProps, 'symbolTitle' | 'mode'>) => {

    return (
        <div className="w-full flex justify-center items-center gap-1 text-L-gray-700 dark:text-D-gray-700">
            <h4 className={clsx({
                "text-L-info-100": mode === "EDIT",
                "text-L-error-200": mode === "DELETE",
            })}>{symbolTitle || ''}</h4>
        </div>
    );
};

const HeaderActions = ({ handleClose }: Partial<IProps>) => {
    return (
        <div className="w-full h-full flex items-center gap-4 text-L-gray-600 ">
            <button onClick={handleClose}>
                <CloseIcon />
            </button>
            {/* <Seperator /> */}
            {/* <button onClick={() => {}}>
                <UploadExcelIcon />
            </button> */}
        </div>
    );
};

export default Header;
