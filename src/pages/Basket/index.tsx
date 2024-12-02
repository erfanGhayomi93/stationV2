import { Fragment, useEffect, useMemo, useState } from 'react';
import LayoutReport from './layout';
import BasketHeader from './components/basketHeader';
import { ClockIcon, EditIcon, ExcelExportIcon, ExcelImportIcon, PlusIcon } from '@assets/icons';
import Button from '@uiKit/Button';
import CustomersSearch from '@components/customersSearch';
import SymbolSearch from '@components/searchSymbol';
import SelectInput from '@uiKit/Inputs/SelectInput';
import MainContent from './components/mainContent';
import { useQueryCartList, useQueryDetailsCart } from '@api/basket';
import { cleanObjectOfFalsyValues } from '@methods/helper';
import { useCustomerStore } from '@store/customer';
import useUpdateEffect from '@hooks/useUpdateEffect';
import ScrollableSlider from '@components/scrollableSlider';
import { useModalStore } from '@store/modal';
import { useTranslation } from 'react-i18next';

export const initialDataFilterBasket: IDetailsCartFilter = {
     SymbolISIN: null,
     CustomerISINs: [],
     OrderSide: '',
     PageNumber: 1,
     PageSize: 10,
};

const Basket = () => {
     const { t } = useTranslation();

     const [searchSymbol, setSearchSymbol] = useState<SearchSymbol | null>(null);

     const { data: cartList } = useQueryCartList();

     const { selectedCustomers } = useCustomerStore();

     const { setManageBasketOrderModal, setCreateNewBasketModal } = useModalStore();

     const [selectedBasket, setSelectedBasket] = useState<number | null>(cartList ? cartList[0].id : null);

     const [filterData, setFilterData] = useState(initialDataFilterBasket);

     const [detailParams, setDetailParams] = useState(cleanObjectOfFalsyValues(filterData) as IDetailsCartReq);

     const { data: detailsCartData } = useQueryDetailsCart(detailParams);

     const onSubmitFilter = () => {
          setDetailParams(prev => ({ ...prev, ...filterData }));
     };

     const onManageBaskets = () => {
          setManageBasketOrderModal(true);
     };

     const onCreateNewBasket = () => {
          setCreateNewBasketModal(true);
     };

     const rightNodeHeader = useMemo(() => {
          const basketsHeader = (
               <ScrollableSlider pixelsToScroll={150}>
                    <div className="flex gap-x-4">
                         {cartList?.map(item => (
                              <BasketHeader
                                   key={item.id}
                                   id={item.id}
                                   name={item.name}
                                   date={item.sendDate}
                                   isSelected={+item.id === Number(selectedBasket)}
                                   clickBasket={id => setSelectedBasket(id)}
                              />
                         ))}
                    </div>
               </ScrollableSlider>
          );

          return (
               <div className="flex gap-x-2">
                    <div className="w-4/6">{basketsHeader}</div>

                    <button
                         onClick={onCreateNewBasket}
                         className="rounded-lg bg-button-tab-deactive p-2 text-icon-default transition-colors hover:text-button-primary-hover"
                    >
                         <PlusIcon width={24} height={24} />
                    </button>

                    <button
                         onClick={onManageBaskets}
                         className="rounded-lg bg-button-tab-deactive p-2 text-icon-default transition-colors hover:text-button-primary-hover"
                    >
                         <EditIcon width={24} height={24} />
                    </button>
               </div>
          );
     }, [cartList, selectedBasket]);

     const leftNodeHeader = useMemo(() => {
          const actions = (
               <Fragment>
                    <Button
                         variant="primary-darkness-outline"
                         className="text-nowrap"
                         icon={<ClockIcon width={22} height={22} />}
                         disabled={true}
                    >
                         تعیین زمان ارسال
                    </Button>
                    <Button variant="primary-darkness" className="py-[9px]" disabled={true}>
                         ارسال سبد اول
                    </Button>
               </Fragment>
          );

          return (
               <Fragment>
                    {actions}

                    <button
                         className="box-border rounded-lg border border-dashed bg-button-tab-deactive p-2 text-icon-default transition-colors hover:text-button-primary-hover disabled:opacity-50"
                         disabled={true}
                    >
                         <ExcelImportIcon width={23} height={23} />
                    </button>

                    <button
                         disabled={true}
                         className="rounded-lg bg-button-tab-deactive p-2 text-icon-default transition-colors hover:text-button-primary-hover disabled:opacity-50"
                    >
                         <ExcelExportIcon width={24} height={24} />
                    </button>
               </Fragment>
          );
     }, []);

     const leftNodeFilter = useMemo(() => {
          const items = [
               { id: '', label: 'همه' },
               { id: '‌Buy', label: 'خرید' },
               { id: 'Sell', label: 'فروش' },
          ];
          return (
               <div className="flex flex-col gap-y-6">
                    <CustomersSearch />

                    <SymbolSearch searchSymbol={searchSymbol} setSearchSymbol={setSearchSymbol} />

                    <SelectInput
                         value={items.find(item => item.id === filterData.OrderSide) || null}
                         items={items}
                         onChange={value => setFilterData(prev => ({ ...prev, OrderSide: value.id as TSide }))}
                         placeholder="سمت"
                    />
               </div>
          );
     }, []);

     useEffect(() => {
          if (cartList) {
               setSelectedBasket(cartList[0].id);
          }
     }, [cartList]);

     useEffect(() => {
          if (selectedBasket) {
               setDetailParams(prev => ({
                    ...prev,
                    CartId: selectedBasket,
               }));
          }
     }, [selectedBasket]);

     useUpdateEffect(() => {
          if (selectedCustomers) {
               setFilterData(prev => ({ ...prev, CustomerISINs: selectedCustomers.map(customer => customer.customerISIN) }));
          }
     }, [selectedCustomers]);

     useUpdateEffect(() => {
          if (searchSymbol) {
               setFilterData(prev => ({ ...prev, SymbolISIN: searchSymbol.symbolISIN }));
          }
     }, [searchSymbol]);

     return (
          <div className="rtl flex h-full flex-col gap-6">
               <LayoutReport
                    leftNodeFilter={leftNodeFilter}
                    mainContent={<MainContent data={detailsCartData?.result} />}
                    leftNodeHeader={leftNodeHeader}
                    rightNodeHeader={rightNodeHeader}
                    onSubmitFilter={onSubmitFilter}
                    title={t('basketOrder.title')}
               />
          </div>
     );
};

export default Basket;
