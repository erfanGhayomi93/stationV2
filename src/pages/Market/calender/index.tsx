import clsx from "clsx";
import { useState, useMemo, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Radiobox from "src/common/components/Radiobox";
import classes from "./Calender.module.scss";
import { ArrowLeft, ArrowLeftSVG, ArrowRight, ArrowRightSVG, Check } from "src/common/icons";
import dayjs from "dayjs";
import CalenderDateTab from "./components/CalenderDateTab";
import CalenderLayoutTab from "./components/CalenderLayoutTab";
import TableDay from "./tables/TableDay";
import TableWeek from "./tables/TableWeek";
import TableMonth from "./tables/TableMonth";
import TableYear from "./tables/TableYear";
import { useWatchlistsQuery } from "src/app/queries/watchlist";
import Select from "src/common/components/SelectAsync";





const Calender = () => {
  const { t } = useTranslation()
  const [isMeetingFiltered, setIsMeetingFiltered] = useState<boolean>(true);
  const [isProfitPaymentFiltered, setIsProfitPaymentFiltered] = useState<boolean>(true);
  const [isAllSelected, setIsAllSelected] = useState<boolean>(true); // Initial selected option: true for "all" and false for "watchlist"

  const { data: watchlistListData } = useWatchlistsQuery()
  const [watchlist, setWatchlist] = useState<IWatchlistType | null>(null);

  const [activeDateTab, setActiveDateTab] = useState<calenderDateTab>("day")
  const [dateStep, setDateStep] = useState<number>(0);
  const [activeLayoutTab, setActiveLayoutTab] = useState<calenderLayoutTab>("list");
  const [date, setDate] = useState<dayjs.Dayjs | null>(null);

  const isTabNotDay = useMemo(() => {
    const validTabs = new Set(["week", "month", "year"]);

    return (tab: string) => validTabs.has(tab);
  }, []);

  useMemo(() => {
    const nowJalali = dayjs()
      .add(dateStep, activeDateTab)
      .calendar('jalali')
      .locale("fa");
    setDate(nowJalali);
  }, [dateStep]);

  const renderTable = useCallback(() => {

    const tableComponents = {
      day: TableDay,
      week: TableWeek,
      month: TableMonth,
      year: TableYear,
    };
    const SelectedTable = tableComponents[activeDateTab] || null;
    return <SelectedTable {...{ date, isMeetingFiltered, isProfitPaymentFiltered, isAllSelected, activeLayoutTab }} watchlistId={!isAllSelected ? watchlist?.id : 0} />;
  }, [activeDateTab, date, isMeetingFiltered, isProfitPaymentFiltered, isAllSelected, activeLayoutTab, watchlist?.id]);

  useEffect(() => {
    try {
      if (isAllSelected || watchlist !== null || !Array.isArray(watchlistListData)) return
      setWatchlist(watchlistListData[0]);
    } catch { }


    // 
    //       if (!Array.isArray(watchlistListData) || watchlistListData.length === 0) return;
    // 
    //       if (watchlist !== null) return;
    //       setWatchlist(watchlistListData[0]);
  }, [isAllSelected]);



  return (
    <div className="bg-L-basic dark:bg-D-basic p-6 gap-y-4 grid grid-rows-min-min-one">
      <h1 className="text-L-gray-700 dark:text-D-gray-700 font-medium text-lg">{t("bourseCalender.title")}</h1>

      <div className='grid grid-cols-3 gap-x-2'>

        <div className='flex font-normal text-sm gap-x-3 items-center whitespace-nowrap'>

          <button role="button" type='button' onClick={() => setIsMeetingFiltered(!isMeetingFiltered)} className={clsx('px-4 py-2 rounded-lg border flex justify-center items-center', {
            "border-L-info-100 dark:border-D-info-100 text-L-gray-700  dark:text-D-gray-700 bg-L-info-50 dark:bg-D-info-50": isMeetingFiltered,
            "border-L-info-50 dark:border-D-info-50 text-L-gray-600 dark:text-D-gray-600": !isMeetingFiltered,
          })}>
            <span className={clsx("w-[14.6px] h-[14.5px] rounded-full ml-3 flex items-center justify-center", {
              "bg-L-info-100 dark:bg-D-info-100": isMeetingFiltered,
              "bg-L-info-50 dark:bg-D-info-50": !isMeetingFiltered,
            })}>
              {isMeetingFiltered && <Check className="text-white" width={9} height={9} />}
            </span>
            <span>{t("bourseCalender.meeting")}</span>
          </button>

          <button role="button" type='button' onClick={() => setIsProfitPaymentFiltered(!isProfitPaymentFiltered)} className={clsx('px-4 py-2 rounded-lg border flex justify-center items-center', {
            "border-L-success-200 dark:border-D-success-200 text-L-gray-700  dark:text-D-gray-700 bg-L-success-100 dark:bg-D-success-100": isProfitPaymentFiltered,
            "border-L-success-100 dark:border-D-success-100 text-L-gray-600 dark:text-D-gray-600": !isProfitPaymentFiltered,
          })}>
            <span className={clsx("w-[14.6px] h-[14.5px] rounded-full flex items-center justify-center ml-3", {
              "bg-L-success-200  dark:bg-D-success-200 ": isProfitPaymentFiltered,
              "bg-L-success-100 dark:bg-D-success-100": !isProfitPaymentFiltered,
            })}>
              {isProfitPaymentFiltered && <Check className="text-white" width={9} height={9} />}
            </span>
            <span>{t("bourseCalender.profit_payment")}</span>
          </button>


          <div className='flex gap-x-8 mr-4'>
            <Radiobox checked={isAllSelected} label={t("bourseCalender.all_symbol")} onChange={() => setIsAllSelected(true)} />
            <Radiobox checked={!isAllSelected} label={t("bourseCalender.watchlist_symbol")} onChange={() => setIsAllSelected(false)} />
          </div>

          <div className="flex items-center gap-1">
            {
              <div className={clsx("min-w-[9.5rem] transition-opacity", {
                "opacity-0 invisible": isAllSelected,
                "opacity-100 visible": !isAllSelected,
              })}>
                <Select
                  classes={{
                    root: 'border rounded border-L-gray-200 dark:border-D-gray-200'
                  }}
                  options={watchlistListData ?? []}
                  value={watchlist}
                  onChange={(wl) => setWatchlist(wl)}
                  getOptionLabel={(wl) => wl.watchListName}
                  getOptionId={(wl) => wl.id}
                  placeholder={t('tv_chart.could_not_find_watchlist')}
                >
                  {(value) => (
                    <Select.Option option={value} />
                  )}
                </Select>

              </div>
            }
          </div>


        </div>


        <div className='flex justify-between items-center gap-x-12 justify-self-center'>
          <button role="button" onClick={() => setDateStep((prevDateStep) => prevDateStep - 1)} className='rounded border border-L-gray-700 dark:border-D-gray-700 p-1'>
            <ArrowRightSVG className="text-L-gray-700 dark:text-D-gray-700 w-4 h-4" />
          </button>
          <span className='text-lg font-medium text-L-gray-700 dark:text-D-gray-700'>
            {activeDateTab === "day" ? date?.format("DD MMMM YYYY") : activeDateTab === "week" ? `${date?.subtract(6, "day").format("DD")} الی ${date?.format("DD")} ${date?.format("MMMM")}` : activeDateTab === "month" ? date?.format("MMMM") : date?.format("YYYY")}
          </span>
          <button role="button" onClick={() => setDateStep((prevDateStep) => prevDateStep + 1)} className='rounded border border-L-gray-700 dark:border-D-gray-700 p-1'>
            <ArrowLeftSVG className="text-L-gray-700 dark:text-D-gray-700 w-4 h-4" />
          </button>
        </div>

        <div className='flex justify-center items-center gap-4 justify-self-end'>
          <CalenderDateTab
            activeTab={activeDateTab}
            setDateStep={setDateStep}
            setActiveTab={setActiveDateTab}
          />
          {isTabNotDay(activeDateTab) && <CalenderLayoutTab activeTab={activeLayoutTab} setActiveTab={setActiveLayoutTab} />}
        </div>

      </div>

      {
        renderTable()
      }

    </div>
  )
}


export default Calender
