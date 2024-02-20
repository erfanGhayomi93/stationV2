import WorkflowChanger from 'src/common/components/WorkFlow';
import BrokerData from './BrokerData';
import Clock from './Clock';
import MarketIndexes from './MarketIndexes';
// import Messages from './Messages';
import UserActions from './UserActions';
import UserData from './UserData';
import ThemeChanger from './ThemeChanger';
import { IpoList } from './ipoList';

const Header = () => {
    //
    return (
        <div className="bg-L-basic dark:bg-D-basic border-b text-1.2 border-L-gray-400 dark:border-D-gray-400 text--gray-500 dark:text-D-gray-700 h-12 flex items-center justify-start px-4 py-2">
            <div>
                <BrokerData />
            </div>
            <div className="h-1/2  mx-1 " />
            <div>
                <UserData />
            </div>
            <div className='mr-auto ml-3'>
                <IpoList />
            </div>
            <div className="h-1/2  mx-1">
                <MarketIndexes />
            </div>
            <div className="h-1/2  mx-1" />
            <div>
                <WorkflowChanger />
            </div>
            <div className="h-1/2  mx-1" />
            <div>
                <ThemeChanger />
            </div>
            <div className="h-1/2 border mx-1 border-L-gray-400 dark:border-D-gray-400 " />
            <div>
                <Clock />
            </div>
            <div className="h-1/2 border mx-1 border-L-gray-400 dark:border-D-gray-400 " />
            <div>
                <UserActions />
            </div>
        </div>
    );
};

export default Header;
