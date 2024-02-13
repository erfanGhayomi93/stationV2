import Seperator from '../Seperator';
import { seprateNumber } from 'src/utils/helpers';
import clsx from 'clsx';


type TInfoFieldParams = {
    label: string;
    value: string;
    preFix?: boolean;
    preFixText?: string;
};

const Footer = () => {
    return (
        <div className="flex justify-between w-full items-center border-L-gray-200 border-t-[1px] px-6 py-3">
            <PurchaseInfo />
            <SendAllButton />
        </div>
    );
};

const SendAllButton = () => {
    return (
        <button className="bg-L-success-300 text-white py-3 px-12 h-[45px] rounded-md" onClick={() => {}}>
            {'ارسال خرید'}
        </button>
    );
};

const PurchaseInfo = () => {
    return (
        <div className="flex items-center gap-4 h-full">
            <InfoField label="ردیف" value={'3'} />
            <Seperator height={'50%'} />
            <InfoField label="تعداد" value={'4730'} />
            <Seperator height={'50%'} />
            <InfoField label="میانگین قیمت" value={'907000'} preFix preFixText="ریال" />
            <Seperator height={'50%'} />
            <InfoField label="ارزش معامله" value={'313680000'} preFix preFixText="ریال" />
        </div>
    );
};

const InfoField = ({ label, value, preFix, preFixText = '' }: TInfoFieldParams) => {
    return (
        <div className={clsx('flex gap-2 text-xs font-bold')}>
            <h5 className="text-L-gray-600">{label + ':'}</h5>
            <h5>{seprateNumber(+value)}</h5>
            {preFix ? <h5 className="text-L-gray-500">{preFixText}</h5> : null}
        </div>
    );
};

export default Footer;
