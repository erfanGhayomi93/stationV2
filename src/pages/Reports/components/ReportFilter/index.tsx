import { useState, useEffect, useMemo, FormEvent } from 'react';
import { DateObject } from 'react-multi-date-picker';
import AdvancedDatePicker from 'src/common/components/AdvancedDatePicker';
import CustomerMiniSelect from 'src/common/components/CustomerMiniSelect';
import Input from 'src/common/components/Input';
import { ExcelIcon, FilterIcon } from 'src/common/icons';
import { useReportsDispatch, useReportsState } from '../../Context/ReportsContext';
import useReportDispatch from '../../hooks/useReportDispatch';
import Select, { SelectOption } from 'src/common/components/Select';
import { REPORT_SIDE_OPTIONS } from 'src/constant/report';
import clsx from 'clsx';
import { HTMLAttributes } from 'react';
import SymbolMiniSelect from 'src/common/components/SymbolMiniSelect';
interface IFilterBlockType extends HTMLAttributes<HTMLLabelElement> {
    label?: string;
    children: JSX.Element;
}

const FilterBlock = ({ children, label, className }: IFilterBlockType) => {
    return (
        <label className={clsx('flex flex-col gap-2 text-1.4 grow', className)}>
            <span className="text-1.3 pr-0.5">{label}</span>
            <div className="grow ">{children}</div>
        </label>
    );
};
export const ReportFilter = () => {
    const [selectedCustomer, setSelectedCustomer] = useState<IGoCustomerSearchResult[]>([]);
    const [selectedSymbol, setSelectedSymbol] = useState<SymbolSearchResult[]>([]);
    const { setStartDate, setSide, setTillDate, setStatus, setSymbol, setCustomer } = useReportDispatch();

    const { startDate, customerISIN, side, status, symbolISIN, tillData } = useReportsState();
    const [isShowFilter, setisShowFilter] = useState(true);
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log({ startDate, customerISIN, side, status, symbolISIN, tillData });
    };

    const resetForm = () => {
        setStartDate(undefined);
        setSide(undefined);
        setTillDate(undefined);
        setStatus(undefined);
        setSymbol(undefined);
        setCustomer(undefined);
        setSelectedCustomer([]);
        setSelectedSymbol([]);
    };

    const handleCustomerSelected = (value: IGoCustomerSearchResult[]) => {
        setSelectedCustomer(value);
        setCustomer(value[0].customerISIN);
    };
    const handleSymbolSelected = (value: SymbolSearchResult[]) => {
        setSelectedSymbol(value);
        setSymbol(value[0].symbolTitle);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="gap-6">
                <div className="flex justify-between items-center">
                    <div className="bg-L-primary-50 dark:bg-D-primary-50 rounded w-fit px-[6px] py-[7px] cursor-pointer">
                        <FilterIcon
                            className="text-L-basic dark:text-D-basic"
                            width={20}
                            height={18}
                            onClick={() => setisShowFilter((prev) => !prev)}
                        />
                    </div>
                    <div className="bg-L-primary-50 dark:bg-D-primary-50 rounded w-fit px-[6px] py-[7px] cursor-pointer border border-L-primary-50 dark:border-D-primary-50">
                        <ExcelIcon className="text-L-basic dark:text-D-basic" width={20} height={18} />
                    </div>
                </div>

                <div
                    data-actived={!isShowFilter}
                    className="actived:opacity-0 h-auto !actived:h-0 transition-opacity gap-14 py-2.5 flex justify-between items-end border border-L-gray-350 dark:border-D-gray-350 bg-L-basic dark:bg-D-basic px-4 rounded-lg my-6"
                >
                    <div className="grow h-full grid grid-cols-7 gap-3">
                        <FilterBlock label="نماد">
                            <SymbolMiniSelect setSelected={handleSymbolSelected} selected={selectedSymbol} />
                        </FilterBlock>
                        <FilterBlock label="مشتری :" className="col-span-2">
                            <CustomerMiniSelect setSelected={handleCustomerSelected} selected={selectedCustomer} />
                        </FilterBlock>
                        <FilterBlock label="از تاریخ :">
                            <AdvancedDatePicker
                                value={startDate}
                                onChange={(selectedDates) => setStartDate(selectedDates as string)}
                                className="text-L-gray-400 dark:text-D-gray-400 py-1.5 w-full"
                            />
                        </FilterBlock>
                        <FilterBlock label="تا تاریخ :">
                            <AdvancedDatePicker
                                value={tillData}
                                onChange={(selectedDates) => setTillDate(selectedDates as string)}
                                className="text-L-gray-400 dark:text-D-gray-400 py-1.5 w-full"
                            />
                        </FilterBlock>
                        <FilterBlock label="وضعیت سفارش :">
                            <Select
                                onChange={(selected: typeof REPORT_SIDE_OPTIONS[0]) => setStatus(selected.value as strategy)}
                                // value={i18next.t('BSModal.strategy_' + strategy)}
                                inputClassName="bg-L-basic  dark:bg-D-basic border-L-gray-350 dark:border-D-gray-350 border rounded-md py-1.5 pr-3 pl-10"
                                value={status}
                            >
                                {REPORT_SIDE_OPTIONS.map((item, inx) => (
                                    <SelectOption
                                        key={inx}
                                        label={item.name}
                                        value={item}
                                        className="text-1.2 cursor-default select-none py-1.5 pl-10 pr-4"
                                    />
                                ))}
                            </Select>
                        </FilterBlock>
                        <FilterBlock label="سمت سفارش :">
                            <Select
                                onChange={(selected: typeof REPORT_SIDE_OPTIONS[0]) => setSide(selected.value as strategy)}
                                // value={i18next.t('BSModal.strategy_' + strategy)}
                                value={side}
                                inputClassName="bg-L-basic  dark:bg-D-basic border-L-gray-350 dark:border-D-gray-350 border rounded-md  py-1.5 pr-3 pl-10"
                            >
                                {REPORT_SIDE_OPTIONS.map((item, inx) => (
                                    <SelectOption
                                        key={inx}
                                        label={item.name}
                                        value={item}
                                        className="text-1.2 cursor-default select-none py-1.5 pl-10 pr-4"
                                    />
                                ))}
                            </Select>
                        </FilterBlock>
                    </div>
                    <div className="grid   text-1.3  gap-2 grid-cols-2 auto-rows-min  ">
                        <button className="bg-L-primary-50  w-full dark:bg-D-primary-50 py-1.5 px-10 ml-4 border border-L-primary-50 dark:border-D-primary-50 text-L-basic dark:text-D-basic rounded">
                            جستجو
                        </button>

                        <button
                            onClick={resetForm}
                            className="bg-L-primary-100  whitespace-nowrap w-full dark:bg-D-primary-100 py-1.5 px-4 border border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50 rounded"
                        >
                            پیش فرض
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
};
