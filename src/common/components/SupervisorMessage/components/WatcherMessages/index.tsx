import { FC } from 'react';
import { CardMessage } from '../CardMassage';

type WHacherMesaage = {
    data: SUpervisorMessageResult[] | undefined;
    searchValue: string;
};

export const WatcherMessages: FC<WHacherMesaage> = ({ data, searchValue }) => {
    return (
        <div className="px-4">
            <div className="border border-L-gray-300 dark:border-D-gray-300 rounded-lg w-full h-[29rem] overflow-auto">
                {data &&
                    data.filter((item) => item.messageTitle.includes(searchValue.trim())).map((item) => <CardMessage data={item} key={item.id} />)}
            </div>
        </div>
    );
};
