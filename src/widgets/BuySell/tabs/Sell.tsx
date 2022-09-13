import React from 'react';
import Input from 'src/common/components/Input';
import Switcher from 'src/common/components/SwitchButton';

const Sell = () => {
    //
    return (
        <div className="flex flex-col text-1.2 p-2 h-full">
            {/*  */}
            <div className="flex flex-col py-2 gap-2">
                <div className="flex w-full gap-4">
                    <div className="w-full border-L-gray-350 dark:border-D-gray-350 border overflow-hidden rounded-md">
                        <Input placeholder=" مشتری" />
                    </div>
                    <div className="w-full border-L-gray-350 dark:border-D-gray-350 border overflow-hidden rounded-md">
                        <Input placeholder="نماد" />
                    </div>
                </div>
                <div className="flex w-full gap-4">
                    <div className="w-full border-L-gray-350 dark:border-D-gray-350 border overflow-hidden rounded-md">
                        <Input placeholder="قیمت (ريال)" />
                    </div>
                </div>
                <div className="flex w-full gap-4">
                    <div className="w-full border-L-gray-350 dark:border-D-gray-350 border overflow-hidden rounded-md">
                        <Input placeholder="تعداد" />
                    </div>
                    <div className="w-full border-L-gray-350 dark:border-D-gray-350 border overflow-hidden rounded-md">
                        <Input placeholder="حجم نمایشی" />
                    </div>
                </div>
                <div className="flex w-full gap-4">
                    <div className="w-full border-L-gray-350 dark:border-D-gray-350 border overflow-hidden rounded-md">
                        <Input placeholder="جستجوی مشتری" />
                    </div>
                </div>
                <div className="flex w-full gap-4">
                    <div className="w-full border-L-gray-350 dark:border-D-gray-350 border overflow-hidden rounded-md">
                        <Input placeholder="استراتژی" />
                    </div>
                </div>
            </div>

            {/*  */}
            <div className="border-t flex flex-col pt-2 border-L-gray-300 justify-between h-full grow ">
                <div className="flex  text-L-gray-400 px-2 gap-16">
                    <div className="flex justify-between items-center text-L-gray-400  w-full ">
                        <span>دارایی فعلی</span>
                        <span>51435435435</span>
                    </div>
                    <div className="flex justify-between items-center text-L-gray-400 w-full">
                        <span>ارزش معامله</span>
                        <span>51435435435</span>
                    </div>
                </div>
                <div className="flex  text-L-gray-400 px-2 gap-16">
                    <div className="flex justify-between items-center text-L-gray-400  w-full ">
                        <span>کارمزد معامله</span>
                        <span>51435435435</span>
                    </div>
                    <div className="flex justify-between items-center text-L-gray-400 w-full">
                        <span>قیمت سر به سر</span>
                        <span>51435435435</span>
                    </div>
                </div>
                <div className="flex text-L-gray-400  gap-16 px-2">
                    <div className="flex justify-between items-center text-L-gray-400  w-full ">
                        <span>سفارش پی در پی</span>
                        <Switcher />
                    </div>
                    <div className="flex justify-between items-center text-L-gray-400 w-full">
                        <span>تقسیم سفارش</span>
                        <Switcher />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sell;
