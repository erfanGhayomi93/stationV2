import { useState } from 'react';
import { InfoFillIcon, InfoIcon } from 'src/common/icons';

type PanelType = 'Trade' | 'Withdrawal' | 'Broker' | null;

const FinancialTab = () => {
    //
    const [activePanel, setActivePanel] = useState<PanelType>(null);

    const handleChangePanel = (p: PanelType) => {
        setActivePanel(p);
    };

    return (
        <div className="px-4 py-6 flex flex-col gap-5">
            <div className="flex flex-col gap-4">
                <div className="w-fit flex gap-2 items-center cursor-pointer" onClick={() => handleChangePanel('Trade')}>
                    {activePanel === 'Trade' ? <InfoFillIcon /> : <InfoIcon />}
                    <span className="text-sm font-medium ">مانده قابل معامله</span>
                </div>
                {activePanel === 'Trade' ? (
                    <div className="bg-L-gray-200 dark:bg-D-gray-200 rounded-lg p-4 text-right duration-200">
                        وجوه حاصل از فروش، امتیازات و مسدودی مشتری در این مانده تاثیر گذار است.
                    </div>
                ) : null}
                <div className="border-L-gray-400 dark:border-D-gray-400 border rounded-lg overflow-hidden">
                    <div className="odd:bg-L-gray-100 dark:odd:bg-D-gray-100 dark:text-L-basic text-D-basic py-2 px-4 border-b border-L-gray-400 dark:border-D-gray-400 last:border-none">
                        <div className="flex justify-between w-full">
                            <span>{'برای خرید نمادهای با تسویه یک روز کاری (T+1)'}</span>
                            <span>32156</span>
                        </div>
                    </div>
                    <div className="odd:bg-L-gray-100 dark:odd:bg-D-gray-100 dark:text-L-basic text-D-basic py-2 px-4 border-b border-L-gray-400 dark:border-D-gray-400 last:border-none">
                        <div className="flex justify-between w-full">
                            <span>{'برای خرید نمادهای با تسویه یک روز کاری (T+1)'}</span>
                            <span>32156</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="w-fit flex gap-2 items-center cursor-pointer" onClick={() => handleChangePanel('Withdrawal')}>
                    {activePanel === 'Withdrawal' ? <InfoFillIcon /> : <InfoIcon />}
                    <span className="text-sm font-medium ">مانده قابل برداشت</span>
                </div>
                {activePanel === 'Withdrawal' ? (
                    <div className="bg-L-gray-200 dark:bg-D-gray-200 rounded-lg p-4 text-right">
                        مقدار وجهی است که مشتری می تواند درخواست آن را برای واریز به حساب بانکی خود در دو روز کاری آینده ثبت نماید. لازم به ذکر است در
                        این مقدار، مسدودی مشتری نیز در نظر گرفته شده و از آن کسر شده است. منظور از مسدودی مقدار وجهی است که به علت درخواست های تقاضای
                        وجه قبلی یا درخواست های خرید مدت دار (تعهدات جاری مشتری) که در سامانه وجود دارد.
                    </div>
                ) : null}
                <div className="border-L-gray-400 dark:border-D-gray-400 border rounded-lg overflow-hidden">
                    <div className="odd:bg-L-gray-100 dark:odd:bg-D-gray-100 dark:text-L-basic text-D-basic py-2 px-4 border-b border-L-gray-400 dark:border-D-gray-400 last:border-none">
                        <div className="flex justify-between w-full">
                            <span>{'در تاریخ 1401/04/20 (T+1)'}</span>
                            <span>32156</span>
                        </div>
                    </div>
                    <div className="odd:bg-L-gray-100 dark:odd:bg-D-gray-100 dark:text-L-basic text-D-basic py-2 px-4 border-b border-L-gray-400 dark:border-D-gray-400 last:border-none">
                        <div className="flex justify-between w-full">
                            <span>{'در تاریخ 1401/04/21 (T+2)'}</span>
                            <span>32156</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="w-fit flex gap-2 items-center cursor-pointer" onClick={() => handleChangePanel('Broker')}>
                    {activePanel === 'Broker' ? <InfoFillIcon /> : <InfoIcon />}
                    <span className="text-sm font-medium ">مانده نزد کارگزاری</span>
                </div>
                {activePanel === 'Broker' ? (
                    <div className="bg-L-gray-200 dark:bg-D-gray-200 rounded-lg p-4 text-right">
                        مانده گردش حساب مشتری، پس از اعمال تمامی تراکنش های خرید، فروش، دریافت و پرداخت است. در این مانده تاریخ های تسویه و اعتبارات و
                        مسدودی ها در نظر گرفته نخواهد شد.
                    </div>
                ) : null}
                <div className="border-L-gray-400 dark:border-D-gray-400 border rounded-lg overflow-hidden">
                    <div className="odd:bg-L-gray-100 dark:odd:bg-D-gray-100 dark:text-L-basic text-D-basic py-2 px-4 border-b border-L-gray-400 dark:border-D-gray-400 last:border-none">
                        <div className="flex justify-between w-full">
                            <span>{'مانده نهایی :'}</span>
                            <span>32156</span>
                        </div>
                    </div>
                    <div className="odd:bg-L-gray-100 dark:odd:bg-D-gray-100 dark:text-L-basic text-D-basic py-2 px-4 border-b border-L-gray-400 dark:border-D-gray-400 last:border-none">
                        <div className="flex justify-between w-full">
                            <span>{'مجموع اعتبارات باشگاه :'}</span>
                            <span>32156</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FinancialTab;
