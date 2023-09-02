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

    const handleValueCahnge = (part: keyof IOrdersListStateType, value: any) => {
        setParams((pre) => ({ ...pre, [part]: value }));
    };

    const toggleFilterBox = () => setIsFilterOpen(!isFilterOpen);

    return (
        <div className="bg-L-gray-100 dark:bg-D-gray-100 rounded-md px-4 py-2 flex">
            <div className="w-full h-full grid grid-cols-20 gap-4">
                <FilterBlock label={t('FilterFieldLabel.Customer')} className="col-span-3">
                    <CustomerMegaSelect
                        setSelected={(selected) => handleValueCahnge('CustomerISIN', selected)}
                        selected={params.CustomerISIN as any}
                    />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.Symbol')} className="col-span-3">
                    <SymbolMiniSelect multiple selected={params.SymbolISIN} setSelected={(selected) => handleValueCahnge('SymbolISIN', selected)} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.FromDate')}>
                    <AdvancedDatepicker value={params.FromDate} onChange={(v) => handleValueCahnge('FromDate', v)} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.ToDate')}>
                    <AdvancedDatepicker value={params.ToDate} onChange={(v) => handleValueCahnge('ToDate', v)} />
                </FilterBlock>
                <FilterBlock label={t('FilterFieldLabel.Side')}>
                    <Select onChange={(selected) => handleValueCahnge('Side', selected)} value={params.Side} options={sideFieldOptions} />
                </FilterBlock>
                {isFilterOpen && (
                    <>
                        <FilterBlock label={t('FilterFieldLabel.CustomerType')} className="col-span-3">
                            <Select
                                onChange={(selected) => handleValueCahnge('CustomerType', selected)}
                                value={params.CustomerType}
                                options={customerTypeFieldOptions}
                            />
                        </FilterBlock>
                        <FilterBlock label={t('FilterFieldLabel.Status')} className='col-span-3'>
                            <Select
                                onChange={(selected) => handleValueCahnge('OrderStatus', selected)}
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
