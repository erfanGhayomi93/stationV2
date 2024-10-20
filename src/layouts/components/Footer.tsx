import Dayjs from './../../libs/dayjs';
import MarketIndexes from './MarketIndexes';
import PinnedWatchlists from './PinnedWatchlists';
import PushEngineInfo from './PushEngineInfo';
import Time from './Time';

const Footer = () => {
     // Get current date and time
     const date = Dayjs();

     return (
          <div className="flex h-10 items-center justify-between rounded-t-md bg-back-surface px-4">
               <div className="flex-1">
                    <PinnedWatchlists />
               </div>
               <div className="flex items-center gap-x-8">
                    <div>
                         <MarketIndexes />
                    </div>

                    <div>
                         <Time date={date} />
                    </div>

                    <div>
                         <PushEngineInfo />
                    </div>
               </div>
          </div>
     );
};

export default Footer;
