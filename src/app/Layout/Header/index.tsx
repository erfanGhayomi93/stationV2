import BrokerData from './BrokerData';
import Clock from './Clock';
import MarketIndexes from './MarketIndexes';
import Messages from './Messages';
import UserActions from './UserActions';
import UserData from './UserData';

const Header = () => {
    //
    return (
        <div className="bg-L-basic dark:bg-D-basic border-b border-L-gray-350 dark:border-D-gray-350 text--gray-500 dark:text-D-gray-500 h-[48px] flex items-center justify-start px-4 py-2">
            <div>
                <BrokerData />
            </div>
            <div className="h-1/2  mx-1 " />
            <div>
                <UserData />
            </div>
            <div className="mr-auto">
                <MarketIndexes />
            </div>
            <div className="h-1/2  mx-1 " />
            <div>
                <Messages />
            </div>
            <div className="h-1/2 border mx-1 border-L-gray-350 dark:border-D-gray-350 " />
            <div>
                <Clock />
            </div>
            <div className="h-1/2 border mx-1 border-L-gray-350 dark:border-D-gray-350 " />
            <div>
                <UserActions />
            </div>
        </div>
    );
};

export default Header;
