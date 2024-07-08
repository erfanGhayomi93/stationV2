import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { FC, useState, Dispatch, SetStateAction, useRef, useEffect, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutationCreateMyGroup } from 'src/app/queries/customer';
import Input from 'src/common/components/Input';
import { Check } from 'src/common/icons';
import { onErrorNotif, onSuccessNotif } from 'src/handlers/notification';
import { isFieldEmpty } from 'src/utils/helpers';

type AddGroupProps = {
    isAddActive: boolean;
    setIsAddActive: Dispatch<SetStateAction<boolean>>;
    FromEditMode?: boolean;
};

export const AddGroup: FC<AddGroupProps> = (props) => {
    const { isAddActive, setIsAddActive, FromEditMode } = props;
    const inputElement = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLInputElement>(null);

    const { t } = useTranslation();

    const queryClient = useQueryClient();

    const [groupName, setGroupName] = useState('');

    const { mutate } = useMutationCreateMyGroup({
        onSuccess: (ـ, variables) => {
            queryClient.invalidateQueries(['getMyGroup']);
            onSuccessNotif({ title: `${variables.groupName} با موفقیت اضافه شد` });
            setGroupName('');
        },
    })

    const AddWatchlist = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();

        if (!isFieldEmpty(groupName)) {
            mutate({
                groupName,
                customerISINs: []
            });

            setIsAddActive(false);
        } else {
            onErrorNotif({ title: 'وارد کردن نام الزامی است' });
        }
    };

    useEffect(() => {
        if (isAddActive) {
            inputElement.current?.focus();
        }
    }, [isAddActive]);

    const handleOutSideClick = (event: any) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setIsAddActive(false);
        }
    };

    useEffect(() => {
        if (isAddActive) {
            document.addEventListener('click', handleOutSideClick);
        } else {
            document.removeEventListener('click', handleOutSideClick);
        }
        return () => {
            setGroupName('');
            document.removeEventListener('click', handleOutSideClick);
        };
    }, [isAddActive]);

    return (
        <div ref={containerRef}>
            <form
                data-actived={!isAddActive}
                onKeyDown={(event) => event.key === 'Escape' && setIsAddActive(false)}
                className="actived:scale-0 actived:absolute actived:duration-0 duration-150 ease-linear flex justify-between items-center"
            >
                <div>
                    <Input
                        data-cy="add-watchlist-input"
                        className={clsx('flex-1 text-sm px-2 h-8 outline-none bg-L-basic dark:bg-D-basic text-L-gray-700 dark:text-L-gray-700', {
                            'h-8': !FromEditMode,
                            'h-10 w-64': FromEditMode,
                        })}
                        value={groupName}
                        placeholder={'نام گروه (حدااقل دو حرف)'}
                        onChange={(e) => setGroupName(e.target.value)}
                        ref={inputElement}
                    />
                </div>
                {!FromEditMode ? (
                    <button
                        data-actived={!!groupName.length}
                        className="bg-L-gray-400 dark:bg-D-gray-400 actived:bg-L-success-200  actived:dark:bg-D-success-200 h-8 w-8 flex justify-center items-center rounded-e relative left-[2px]"
                        disabled={!!!groupName.length}
                        type="submit"
                        onClick={AddWatchlist}
                    >
                        <Check className="text-L-gray-50 dark:text-gray-text-L-gray-50 scale-[1.3]" />
                    </button>
                ) : (
                    <span className="flex gap-2">
                        <button
                            data-actived={!!groupName.length}
                            className="bg-L-gray-400 dark:bg-D-gray-400 actived:bg-L-success-200  actived:dark:bg-D-success-200 text-L-gray-50 dark:text-gray-text-L-gray-50 rounded whitespace-nowra text-md px-2 py-1"
                            disabled={!!!groupName.length}
                            onClick={AddWatchlist}
                        >
                            ثبت گروه
                        </button>

                        <button
                            className="text-L-primary-50 dark:text-D-primary-50 border border-L-primary-50 dark:border-D-primary-50 rounded text-md px-2 py-1 bg-L-basic dark:bg-D-basic"
                            onClick={(e) => {
                                e.preventDefault();
                                setIsAddActive(false);
                            }}
                        >
                            {t('Watchlist.cancelAdd')}
                        </button>
                    </span>
                )}
            </form>
        </div>
    );
};
