import TodayOrdersWidget from "../widget/TodayOrdersWidget"
import { MainSymbol } from "../widget/HeaderSymbol"
import SliderbarDetailsWidget from "../widget/sliderbarDetailsWidget";
import clsx from "clsx";
import IndividualLegalWidget from "../widget/individualLegalWidget";

const BoxClass = 'p-2 bg-back-surface shadow-sm rounded-lg';

const MainLayoutDashboard = () => {
  return (
    <div className="flex gap-2 rtl my-2 mx-2">
      <div className="w-1/2 flex flex-col gap-2">
        <div className={BoxClass}>
          <MainSymbol />
        </div>

        <div className={clsx(BoxClass, 'h-[15.75em] overflow-auto')}>
          <TodayOrdersWidget side={"Buy"} />
        </div>

        <div className={clsx(BoxClass, 'h-[15.75em]')}>
          <TodayOrdersWidget side={"Sell"} />
        </div>
      </div>

      <div className={"w-1/2"}>
        <div className="flex gap-2 text-sm">
          <div className={clsx(BoxClass, 'w-1/2')}>
            <SliderbarDetailsWidget />
          </div>
          <div className={clsx(BoxClass, 'w-1/2')}>
            <IndividualLegalWidget />
          </div>
        </div>

      </div>
    </div>
  )
}

export default MainLayoutDashboard