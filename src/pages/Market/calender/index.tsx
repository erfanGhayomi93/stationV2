import clsx from "clsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Radiobox from "src/common/components/Radiobox";
import classes from "./Calender.module.scss";





const Calender = () => {
  const { t } = useTranslation()
  const [isMeetingFiltered, setIsMeetingFiltered] = useState<boolean>(true);
  const [isProfitPaymentFiltered, setIsProfitPaymentFiltered] = useState<boolean>(true);
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false); // Initial selected option: true for "all" and false for "portfolio"



  return (
    <div className="bg-L-basic dark:bg-D-basic p-6 gap-5">
      <h1 className="dark:text-D-gray-700 font-medium text-2xl">{t("bourseCalender.title")}</h1>

      <div className="grid grid-rows-min">

        <div className='flex justify-between'>
          <div className='flex gap-16 font-normal text-base'>
            <button role="button" type='button' onClick={() => setIsMeetingFiltered(!isMeetingFiltered)} className={clsx('px-16 py-8 rounded-md border-2 border-blue-300 dark:border-dark-blue-300 flex gap-12 justify-center items-center', isMeetingFiltered ? "bg-blue-100 dark:bg-dark-blue-100" : "bg-transparent")}>
              <div className='w-4 h-4 rounded-circle bg-blue-300 dark:bg-dark-blue-300'></div>
              <span>{t("calender.meeting")}</span>
            </button>
            <button role="button" type='button' onClick={() => setIsProfitPaymentFiltered(!isProfitPaymentFiltered)} className={clsx('px-16 py-8 rounded-md border-2 border-success-300 dark:border-dark-success-400 flex gap-12 justify-center items-center', isProfitPaymentFiltered ? "bg-success-200 dark:bg-dark-success-200" : "bg-transparent")}>
              <div className='w-16 h-16 rounded-circle bg-success-300 dark:bg-dark-success-400'></div>
              <span>{t("calender.profit_payment")}</span>
            </button>
            <div className='flex gap-24'>
              <Radiobox checked={!isAllSelected} label={t("calender.all_symbol")} onChange={() => setIsAllSelected(false)} />
              <Radiobox checked={isAllSelected} label={t("calender.portfolio_symbol")} onChange={() => setIsAllSelected(true)} />
            </div>
          </div>
        </div>

        <div>

        </div>

      </div>

    </div>
  )
}


export default Calender
