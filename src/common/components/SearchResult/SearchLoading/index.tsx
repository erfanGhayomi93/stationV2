import { SpinnerIcon } from 'src/common/icons';

function SearchLoading({ isFetching, isLoading }: { isLoading: boolean; isFetching?: boolean }) {
    return (
        <>
            {(isLoading || isFetching) && (
                <div className="p-5 flex items-center justify-center w-full h-full text-L-gray-500 dark:text-D-gray-500 text-1.2 bg-L-basic dark:bg-D-basic border-L-gray-350 dark:border-D-gray-350">
                    <div className="flex items-center justify-center gap-2 ">
                        <span>در حال بارگذاری</span>
                        <SpinnerIcon width={25} height={25} />
                    </div>
                </div>
            )}
        </>
    );
}

export default SearchLoading;
