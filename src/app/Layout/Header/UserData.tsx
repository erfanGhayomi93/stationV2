import { UserIcon } from 'src/common/icons';
import { useAppSelector } from 'src/redux/hooks';
import { getUserData } from 'src/redux/slices/global';

const UserData = () => {
    //
    const userData = useAppSelector(getUserData)

    return (
        <div className="flex items-center ">
            <span className="ml-1">
                <UserIcon className="text-L-primary-50 dark:text-D-primary-50 w-5 h-5" />
            </span>
            <span className="font-bold">{userData.traderTitle}</span>
        </div>
    );
};

export default UserData;
