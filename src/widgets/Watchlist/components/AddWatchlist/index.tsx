import { useQueryClient } from "@tanstack/react-query";
import { FC, useState, FormEvent, Dispatch, SetStateAction, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { createWatchListMutation } from "src/app/queries/watchlist";
import Input from "src/common/components/Input";
import { Check } from "src/common/icons";


type IAddWatchlistType = {
    isAddActive: boolean;
    setIsAddActive: Dispatch<SetStateAction<boolean>>
}


export const AddWatchList: FC<IAddWatchlistType> = (props) => {
    const { isAddActive, setIsAddActive } = props
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

    const AddWatchlist = (form: FormEvent<HTMLFormElement>) => {
        form.stopPropagation();
        form.preventDefault();
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
            onSubmit={AddWatchlist}
            onKeyDown={(event) => event.key === 'Escape' && setIsAddActive(false)}
            className="actived:scale-x-0 actived:absolute actived:duration-0 duration-150 ease-linear flex"
        >
            <Input
                data-cy="add-watchlist-input"
                className="border p-2 rounded-s outline-L-gray-400 dark:outline-D-gray-400 placeholder:text-xs h-[32px] w-full"
                value={watchlistName}
                onBlur={() => setIsAddActive(false)}
                placeholder={t("Input.placeholderWatchlist")}
                onChange={(e) => setWatchlistName(e.target.value)}
            // ref={inputElement}
            />

            <button
                data-actived={watchlistName.length > 1}
                className="bg-L-gray-400 dark:bg-D-gray-400 actived:bg-L-success-200  actived:dark:bg-D-success-200 h-[32px] w-[36px] flex justify-center items-center rounded-e relative left-[2px]"
                disabled={watchlistName.length <= 1}
            >
                <Check className="text-L-gray-50 dark:text-gray-text-L-gray-50 scale-[1.3]" />
            </button>

        </form>
    )
}
