import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { FC, useState, FormEvent, Dispatch, SetStateAction, useRef, useEffect, MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { createWatchListMutation } from "src/app/queries/watchlist";
import Input from "src/common/components/Input";
import { Check } from "src/common/icons";


type IAddWatchlistType = {
    isAddActive: boolean;
    setIsAddActive: Dispatch<SetStateAction<boolean>>;
    FromEditMode?: boolean;
}


export const AddWatchList: FC<IAddWatchlistType> = (props) => {
    const { isAddActive, setIsAddActive, FromEditMode } = props
    const inputElement = useRef<HTMLInputElement>(null)

    const { t } = useTranslation()

    const queryClient = useQueryClient();

    const [watchlistName, setWatchlistName] = useState('');

    const { mutate } = createWatchListMutation({
        onSuccess: () => {
            queryClient.invalidateQueries(['getWatchLists']);
            toast.success('دیده‌بان با موفقیت اضافه شد');
            setWatchlistName('');
        },
        onError: (err) => {
            toast.error(`${err}`);
        },
    });

    const AddWatchlist = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        mutate(watchlistName);
        setIsAddActive(false);
    };

    useEffect(() => {
        if (isAddActive) {
            inputElement.current?.focus()
        }
    }, [isAddActive])



    return (
        <form
            data-actived={!isAddActive}
            // onSubmit={AddWatchlist}
            onKeyDown={(event) => event.key === 'Escape' && setIsAddActive(false)}
            className="actived:scale-0 actived:absolute actived:duration-0 duration-150 ease-linear flex justify-between items-center"
        // onBlur={() => !FromEditMode && setIsAddActive(false)}
        >
            <div>
                <Input
                    data-cy="add-watchlist-input"
                    className={clsx("border p-2 rounded-s outline-L-gray-400 dark:outline-D-gray-400 placeholder:text-xs bg-L-basic dark:bg-D-basic text-L-gray-500 dark:text-D-gray-500", {
                        "h-[32px]": !FromEditMode,
                        "h-[40px] w-[256px]": FromEditMode,
                    })}
                    value={watchlistName}
                    placeholder={t("Input.placeholderWatchlist")}
                    onChange={(e) => setWatchlistName(e.target.value)}
                // ref={inputElement}
                />
            </div>
            {
                !FromEditMode ? (
                    <button
                        data-actived={watchlistName.length > 1}
                        className="bg-L-gray-400 dark:bg-D-gray-400 actived:bg-L-success-200  actived:dark:bg-D-success-200 h-[32px] w-[36px] flex justify-center items-center rounded-e relative left-[2px]"
                        disabled={watchlistName.length <= 1}
                        type="submit"
                        onClick={AddWatchlist}
                    >
                        <Check className="text-L-gray-50 dark:text-gray-text-L-gray-50 scale-[1.3]" />
                    </button>
                ) : (
                    <>

                        <button
                            data-actived={watchlistName.length > 1}
                            className="bg-L-gray-400 dark:bg-D-gray-400 actived:bg-L-success-200  actived:dark:bg-D-success-200 text-L-gray-50 dark:text-gray-text-L-gray-50 h-[40px] rounded whitespace-nowra px-2 py-2"
                            disabled={watchlistName.length <= 1}
                            onClick={AddWatchlist}
                        >
                            {t("Watchlist.submitAdd")}
                        </button>

                        <button
                            className="text-L-primary-50 dark:text-D-primary-50 border border-L-primary-50 dark:border-D-primary-50 h-[40px] rounded bg-L-basic dark:bg-D-basic px-2 py-2"
                            onClick={(e) => {
                                e.preventDefault()
                                setIsAddActive(false)
                            }}
                        >
                            {t("Watchlist.cancelAdd")}
                        </button>
                    </>
                )
            }

        </form>
    )
}
