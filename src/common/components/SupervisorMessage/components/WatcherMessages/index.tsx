import { FC, useEffect } from 'react';
import { CardMessage } from '../CardMassage';
import { useMessagesSuppervisor } from 'src/app/queries/messages';
import { useSliderDispatch } from 'src/app/Layout/Sider/context';
import { COuntNumberSupervisorEnum } from 'src/app/Layout/Sider/context/types';

type WHacherMesaage = {
    searchValue: string;
};

export const WatcherMessages: FC<WHacherMesaage> = ({ searchValue }) => {
    const { data } = useMessagesSuppervisor();

    const dispatch = useSliderDispatch();

    useEffect(() => {
        let counter = 0;
        data?.forEach((item) => {
            if (!item.read) ++counter;
        });

        dispatch({ type: COuntNumberSupervisorEnum.COUNT_NUMBER, payload: counter });
    }, [data]);


    return (
        <div className="px-4">
            <div className="border   dark:  rounded-lg w-full h-[29rem] overflow-auto">
                {
                    data
                        ?.filter((item) => item.messageTitle.includes(searchValue.trim()))
                        .map((item) => <CardMessage data={item} key={item.id} />)
                }
            </div>
        </div>
    );
};
