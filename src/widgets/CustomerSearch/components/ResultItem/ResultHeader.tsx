import React from 'react';

const ResultHeader = () => {
    return (
        <div className="flex bg-L-gray-200 dark:bg-D-gray-200 rounded-t-lg py-2 text-L-gray-450 dark:text-D-gray-450 font-semibold">
            <span className="flex items-center justify-center px-4"> </span>
            <div className="w-full flex items-center justify-center">نام</div>
            <div className=" w-3/6 flex items-center justify-center">دارایی</div>
            <div className=" w-3/6 flex items-center justify-center">عملیات</div>
        </div>
    );
};

export default ResultHeader;
