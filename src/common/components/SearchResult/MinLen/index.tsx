function MinLen({ min }: { min: boolean }) {
    return (
        <>
            {min && (
                <div className="p-5 flex items-center justify-center w-full h-full text-L-gray-500 dark:text-D-gray-700 text-1.2 bg-L-basic dark:bg-D-basic border-L-gray-400 dark:border-D-gray-400">
                    حداقل دو کاراکتر وارد نمایید.
                </div>
            )}
        </>
    );
}

export default MinLen;
