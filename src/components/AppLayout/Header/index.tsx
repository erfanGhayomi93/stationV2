import BrokerData from './BrokerData';
import Clock from './Clock';
import MarketIndexes from './MarketIndexes';
import Messages from './Messages';
import UserActions from './UserActions';
import UserData from './UserData';

const Header = () => {
    //
    return (
        <div className="bg-white h-[72px] flex items-center justify-start px-4 py-2">
            <div>
                <BrokerData />
            </div>
            <div className="h-1/2 border mx-1 border-sky-200" />
            <div>
                <UserData />
            </div>
            <div className="mr-auto">
                <MarketIndexes />
            </div>
            <div className="h-1/2 border mx-1 border-sky-200" />
            <div>
                <Messages />
            </div>
            <div className="h-1/2 border mx-1 border-sky-200" />
            <div>
                <Clock />
            </div>
            <div className="h-1/2 border mx-1 border-sky-200" />
            <div>
                <UserActions />
            </div>
        </div>
    );
};

export default Header;
