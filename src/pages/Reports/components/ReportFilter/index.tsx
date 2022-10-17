import { useState, FormEvent } from 'react';
import AdvancedDatePicker from 'src/common/components/AdvancedDatePicker';
import CustomerMiniSelect from 'src/common/components/CustomerMiniSelect';
import { ExcelIcon, FilterIcon } from 'src/common/icons';
import { useReportsState } from '../../Context/ReportsContext';
import useReportDispatch from '../../hooks/useReportDispatch';
import Select, { SelectOption } from 'src/common/components/Select';
import { REPORT_SIDE_OPTIONS, REPORT_STATUS_OPTIONS } from 'src/constant/report';
import clsx from 'clsx';
import { HTMLAttributes } from 'react';
import SymbolMiniSelect from 'src/common/components/SymbolMiniSelect';
import { useOrderLists } from 'src/app/queries/order';
import dayjs from 'dayjs';
import i18next from 'i18next';
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

    const { FromDate, customerISIN, side, status, symbolISIN, ToDate } = useReportsState();

    const [isShowFilter, setisShowFilter] = useState(true);
    const { refetch } = useOrderLists({
        CustomerISIN: customerISIN,
        FromDate: FromDate,
        OrderStatus: status,
        PageNumber: 1,
        PageSize: 5,
        Side: side,
        symbolISIN,
        ToDate,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        refetch();
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
        const timeout = setTimeout(() => {
            refetch();
            clearTimeout(timeout);
        }, 300);
    };

    const handleCustomerSelected = (value: IGoCustomerSearchResult[]) => {
        setSelectedCustomer(value);
        setCustomer(value.length ? value[0].customerISIN : undefined);
        // FIXME:double request after set term
    };
    const handleSymbolSelected = (value: SymbolSearchResult[]) => {
        setSelectedSymbol(value);
        setSymbol(value.length ? value[0].symbolISIN : undefined);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="gap-6 py-2.5 relative z-40">
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
                    data-actived={isShowFilter}
                    className="actived:opacity-100 opacity-0 actived:static  absolute duration-100  actived:scale-100 scale-y-0 origin-top  gap-14 py-2.5 flex justify-between items-end border border-L-gray-350 dark:border-D-gray-350 bg-L-basic dark:bg-D-basic px-4 rounded-lg my-6"
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
                                value={FromDate}
                                onChange={(selectedDates) => setStartDate(dayjs(selectedDates as any).format('YYYY-MM-DDTHH:mm:ss'))}
                                className="text-L-gray-400 dark:text-D-gray-400 py-1.5 w-full"
                            />
                        </FilterBlock>
                        <FilterBlock label="تا تاریخ :">
                            <AdvancedDatePicker
                                value={ToDate}
                                onChange={(selectedDates) => setTillDate(dayjs(selectedDates as any).format('YYYY-MM-DDTHH:mm:ss'))}
                                className="text-L-gray-400 dark:text-D-gray-400 py-1.5 w-full"
                            />
                        </FilterBlock>
                        <FilterBlock label="وضعیت سفارش :">
                            <Select
                                onChange={(selected: string) => setStatus(selected as unknown as OrderStatus)}
                                value={status ? i18next.t('OrderState.' + status) : undefined}
                                inputClassName="bg-L-basic  dark:bg-D-basic border-L-gray-350 dark:border-D-gray-350 border rounded-md py-1.5 pr-3 pl-10"
                                // value={status}
                            >
                                {REPORT_STATUS_OPTIONS.map((item, inx) => (
                                    <SelectOption
                                        key={inx}
                                        label={i18next.t('OrderState.' + item.value)}
                                        value={item.value}
                                        className="text-1.2 cursor-default select-none py-1.5 pl-10 pr-4"
                                    />
                                ))}
                            </Select>
                        </FilterBlock>
                        <FilterBlock label="سمت سفارش :">
                            <Select
                                onChange={(selected: string) => setSide(selected as unknown as OrderSideType)}
                                value={side ? i18next.t('OrderSide.' + side) : undefined}
                                // value={side}
                                inputClassName="bg-L-basic  dark:bg-D-basic border-L-gray-350 dark:border-D-gray-350 border rounded-md  py-1.5 pr-3 pl-10"
                            >
                                {REPORT_SIDE_OPTIONS.map((item, inx) => (
                                    <SelectOption
                                        key={inx}
                                        label={i18next.t('OrderSide.' + item.value)}
                                        value={item.value}
                                        className="text-1.2 cursor-default select-none py-1.5 pl-10 pr-4"
                                    />
                                ))}
                            </Select>
                        </FilterBlock>
                    </div>
                    <div className="grid   text-1.3  gap-2 grid-cols-2 auto-rows-min  ">
                        <FilterAction />
                    </div>
                </div>
            </div>
        </form>
    );

    function FilterAction() {
        return (
            <>
                <button className="bg-L-primary-50  w-full dark:bg-D-primary-50 py-1.5 px-10 ml-4 border border-L-primary-50 dark:border-D-primary-50 text-L-basic dark:text-D-basic rounded">
                    جستجو
                </button>

                <button
                    onClick={resetForm}
                    className="bg-L-primary-100  whitespace-nowrap w-full dark:bg-D-primary-100 py-1.5 px-4 border border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50 rounded"
                >
                    پیش فرض
                </button>
            </>
        );
    }
};
