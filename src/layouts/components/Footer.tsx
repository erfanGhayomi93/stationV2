import Dayjs from "./../../libs/dayjs";
import PushEngineInfo from "./PushEngineInfo"
import Time from "./Time"
import MarketIndexes from "./MarketIndexes";
import PinnedWatchlists from "./PinnedWatchlists";

const Footer = () => {
    // Get current date and time
    const date = Dayjs();


    return (
        <div className="h-10 bg-back-surface rounded-t-md flex justify-between items-center px-4">
            <div className="flex gap-x-8 items-center rtl">

                <div>
                    <MarketIndexes />
                </div>

                <div>
                    <Time
                        date={date}
                    />
                </div>

                <div>
                    <PushEngineInfo />
                </div>
            </div>

            <div className="flex-1 rtl">
                <PinnedWatchlists />
            </div>
        </div>
    )
}

export default Footer