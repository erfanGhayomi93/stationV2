import { Disclosure, Transition } from "@headlessui/react";
import { ColDef } from "ag-grid-community";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useListStrategiesReport } from "src/app/queries/option";
import AGTable from "src/common/components/AGTable";
import CustomerMegaSelect from "src/common/components/CustomerMegaSelect";
import FilterBlock from "src/common/components/FilterBlock";
import NoData from "src/common/components/NoData/NoData";
import { ArrowDropUp } from "src/common/icons";
import { seprateNumber } from "src/utils/helpers";



const StrategiesReportPage = () => {
  const { t } = useTranslation();

  const [strategies, setStrategies] = useState(['CoveredCall', 'BullCall', 'BearPut']);

  const [activeStrategies, setActiveStrategies] = useState(['BearPut', 'BullCall', 'CoveredCall']);

  const [customerISIN, setCustomerISIN] = useState<IGoCustomerSearchResult[]>([])

  const { data: strategyData } = useListStrategiesReport({
    customerISIN: customerISIN.map(x => x.customerISIN)
  })


  const showStrategy = (type: string) => {
    const isOpen = activeStrategies.find((x) => x === type);

    if (isOpen) {
      setActiveStrategies(pre => pre.filter(x => x !== type));
    }
    else setActiveStrategies(pre => [...pre, type]);
  };


  const COLUMNS = useMemo<ColDef<IResponseStrategiesReport>[]>(() => [
    {
      headerName: "ردیف",
      maxWidth: 112,
      valueGetter: ({ node }) => String((node?.childIndex ?? 0) + 1),
    },
    {
      headerName: 'مشتری',
      field: "customerTitle",
      minWidth: 112,
      valueFormatter: ({ value }) => value ?? "",
    },
    {
      headerName: 'پایه اول',
      field: 'positionBlockTitle',
      valueGetter: ({ data }) => data?.strategyType !== 'CoveredCall' ? data?.positionBlockTitle : data?.baseSymbolTitle,
      minWidth: 220
    },
    {
      headerName: 'مانده تعداد دارایی پایه اول',
      valueGetter: ({ data }) => data?.strategyType !== 'CoveredCall' ? data?.totalRemainPositionContract : data?.baseSymbolRemainAsset,
      valueFormatter: ({ data, value }) => seprateNumber(value ?? 0) + ' ' + (data?.strategyType !== 'CoveredCall' ? 'موقعیت' : 'سهم'),
      minWidth: 220
    },
    {
      headerName: 'پایه دوم',
      field: 'symbolTitle',
      minWidth: 220
    },
    {
      headerName: 'تعداد موقعیت باز فروش پایه دوم',
      field: 'sellOpenPositionCount',
      minWidth: 220,
      type: "sepratedNumber"
    },
    {
      headerName: 'تعداد قرارداد استراتژی',
      valueGetter: ({ data }) => {
        return data?.strategyType === 'BearPut' ? data.totalBearPutCount :
          data?.strategyType === 'BullCall' ? data.totalBullCallCount :
            data?.strategyType === 'CoveredCall' ? data.totalCoveredCallCount : 0;
      },
      type: "sepratedNumber",
      minWidth: 220
    }
  ], []);



  return (
    <div className="flex-1 p-2">
      <div className='flex flex-col bg-L-basic dark:bg-D-basic rounded pt-4 px-4 gap-4 h-full overflow-auto'>

        <div className="flex justify-between items-center h-8">
          <h1 className='text-xl font-bold text-L-gray-700 dark:text-D-gray-700'>استراتژی ها</h1>
        </div>

        <div className="w-60" >
          <FilterBlock label={t('FilterFieldLabel.Customer')}>
            <CustomerMegaSelect
              selected={customerISIN}
              setSelected={(value) => setCustomerISIN(value)}
            />
          </FilterBlock>
        </div>

        <div className="flex-1 flex flex-col relative">
          {
            strategies.map((strategy) => (
              <Disclosure key={strategy}>
                <Disclosure.Button
                  onClick={() => showStrategy(strategy)}
                  style={{ width: '30rem' }}
                  className="btn-primary h-10 px-4 text-base mb-3 rounded flex items-center justify-between"
                >
                  <span>
                    {t('options.strategyType_' + strategy)}
                    {` (${strategy === 'BullCall' ? 'Bull Call Spread' : strategy === 'CoveredCall' ? 'Covered Call' : strategy === 'BearPut' ? 'Bear Put Spread' : '-'})`}
                  </span>
                  <span className={clsx('duration-200', { 'rotate-180': activeStrategies.includes(strategy) })}>
                    <ArrowDropUp width={'1rem'} height={'1rem'} />
                  </span>
                </Disclosure.Button>
                <Transition
                  show={activeStrategies.includes(strategy)}
                  enter="transition-height duration-500 ease-out"
                  enterFrom="height-0"
                  enterTo="height-auto"
                  leave="transition-height duration-150 ease-out"
                  leaveFrom="height-auto"
                  leaveTo="height-0"
                >
                  {
                    activeStrategies.includes(strategy) && (
                      <Disclosure.Panel>
                        <div style={{ minHeight: '15rem', height: '15rem' }} className="relative">
                          <AGTable
                            columnDefs={COLUMNS}
                            rowData={strategyData?.filter(({ strategyType }) => strategyType === strategy)}
                            defaultColDef={{
                              flex: 1
                            }}

                          />

                          {/* {!isFetching && strategyData && !strategyData.find(({ strategyType }) => strategyType === strategy) && <NoData />} */}
                        </div>
                      </Disclosure.Panel>
                    )
                  }
                </Transition>
              </Disclosure>
            ))
          }
        </div>
      </div>
    </div >
  )
}


export default StrategiesReportPage;
