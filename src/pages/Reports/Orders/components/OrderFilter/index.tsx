import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CustomerMegaSelect from 'src/common/components/CustomerMegaSelect';
import FilterActions from 'src/common/components/FilterActions';
import FilterBlock from 'src/common/components/FilterBlock';
import MultiSelect from 'src/common/components/MultiSelect';
import SymbolMiniSelect from 'src/common/components/SymbolMiniSelect';
import { OrdersFilterTypes } from '../..';
import AdvancedDatepicker from 'src/common/components/AdvancedDatePicker/AdvanceDatepicker';
import Select from 'src/common/components/Select';
import { customerTypeFieldOptions, sideFieldOptions } from 'src/pages/Reports/Trades/constant';
import { orderStatusFieldOptions } from '../../constant';
import dayjs from 'dayjs';

interface IProps {
    params: IOrdersListStateType;
    setParams: React.Dispatch<React.SetStateAction<IOrdersListStateType>>;
    onSubmit: () => void;
    onClear: () => void;
}

const OrdersFilter = ({ params, setParams, onSubmit, onClear }: IProps) => {
    //
    const { t } = useTranslation();
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const handleValueChange = <T extends keyof IOrdersListStateType>(part: T, value: IOrdersListStateType[T]) => {
        setParams((pre) => ({ ...pre, [part]: value }));
    };

    const toggleFilterBox = () => setIsFilterOpen(!isFilterOpen);

    return (
        <div className="bg-L-gray-100 dark:bg-D-gray-100 rounded-md px-4 py-2 flex">
            <div className="w-full h-full grid grid-cols-20 gap-4">
                <FilterBlock label={t('FilterFieldLabel.Customer')} className="col-span-3">
                    <CustomerMegaSelect
                        setSelected={(selected) => handleValueChange('CustomerISIN', selected)}
                        selected={params.CustomerISIN as any}
                    />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.Symbol')} className="col-span-3">
                    <SymbolMiniSelect multiple selected={params.SymbolISIN} setSelected={(selected) => handleValueChange('SymbolISIN', selected)} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.FromDate')}>
                    <AdvancedDatepicker
                        value={params.FromDate}
                        onChange={(value) => handleValueChange('FromDate', dayjs(value).format('YYYY-MM-DDT00:00:00'))}
                    />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.ToDate')}>
                    <AdvancedDatepicker
                        value={params.ToDate}
                        onChange={(value) => handleValueChange('ToDate', dayjs(value).format('YYYY-MM-DDT23:59:59'))}
                    />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.Side')}>
                    <Select onChange={(selected) => handleValueChange('Side', selected)} value={params.Side} options={sideFieldOptions} />
                </FilterBlock>
                {isFilterOpen && (
                    <>
                        <FilterBlock label={t('FilterFieldLabel.CustomerType')} className="col-span-3">
                            <Select
                                onChange={(selected) => handleValueChange('CustomerType', selected)}
                                value={params.CustomerType}
                                options={customerTypeFieldOptions}
                            />
                        </FilterBlock>
                        <FilterBlock label={t('FilterFieldLabel.Status')} className="col-span-3">
                            <Select
                                onChange={(selected) => handleValueChange('OrderStatus', selected)}
                                value={params.OrderStatus}
                                options={orderStatusFieldOptions}
                            />
                        </FilterBlock>
                    </>
                )}
                <div className="col-span-3">
                    <FilterActions isFilterBoxOpen={isFilterOpen} toggleFilterBox={toggleFilterBox} onSubmit={onSubmit} onClear={onClear} />
                </div>
            </div>
        </div>
    );
};

export default OrdersFilter;
