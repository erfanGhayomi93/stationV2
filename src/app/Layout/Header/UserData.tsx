import { UserIcon } from 'src/common/icons';
import { useAppSelector } from 'src/redux/hooks';
import { getUserData } from 'src/redux/slices/global';

const UserData = () => {
    //
    const userData = useAppSelector(getUserData)

    return (
        <div className="flex items-center ">
            <span className="ml-1">
                <UserIcon className="text-L-primary-50 dark:text-D-primary-50" width={'21px'} height={'21px'} />
            </span>
            <span className="font-bold">{`${userData?.firstName || ''} ${userData?.lastName || ''}`}</span>
        </div>
    );
};

export default UserData;
