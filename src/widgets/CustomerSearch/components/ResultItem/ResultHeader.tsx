const ResultHeader = () => {
    return (
        <div className="flex bg-L-gray-300 dark:bg-D-gray-300 rounded-t-lg py-2 text-L-gray-600 dark:text-D-gray-600 font-semibold">
            <div className="w-full flex items-center justify-start">
                <span className="pr-12">نام</span>
            </div>
            <div className="w-4/6 flex items-center justify-center">کد بورسی</div>
            <div className="w-4/6 flex items-center justify-center">کدملی</div>
            <div className="w-4/6 flex items-center justify-center">قدرت خرید</div>
            <div className="w-4/6 flex items-center justify-center">اعتبار</div>
            <div className="w-4/6 flex items-center justify-center">عملیات</div>
        </div>
    );
};

export default ResultHeader;
