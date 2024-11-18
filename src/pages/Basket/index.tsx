import { Fragment, useEffect, useMemo, useState } from "react"
import LayoutReport from "./layout"
import BasketHeader from "./components/basketHeader"
import { ClockIcon, EditIcon, ExcelExportIcon, ExcelImportIcon, PlusIcon } from "@assets/icons"
import Button from "@uiKit/Button"
import CustomersSearch from "@components/customersSearch"
import SymbolSearch from "@components/searchSymbol"
import SelectInput from "@uiKit/Inputs/SelectInput"
import MainContent from "./components/mainContent"
import { useQueryCartList, useQueryDetailsCart } from "@api/basket"
import { cleanObjectOfFalsyValues } from "@methods/helper"
import { useCustomerStore } from "@store/customer"
import useUpdateEffect from "@hooks/useUpdateEffect"

export const initialDataFilterBasket: IDetailsCartFilter = {
  SymbolISIN: null,
  CustomerISINs: [],
  OrderSide: '',
  PageNumber: 1,
  PageSize: 10,
};

const Basket = () => {

  const [searchSymbol, setSearchSymbol] = useState<SearchSymbol | null>(null)

  const { data: cartList } = useQueryCartList()

  const { selectedCustomers } = useCustomerStore()

  const [selectedBasket, setSelectedBasket] = useState<number | null>(cartList ? cartList[0].id : null)

  const [filterData, setFilterData] = useState(initialDataFilterBasket)

  const [detailParams, setDetailParams] = useState(cleanObjectOfFalsyValues(filterData) as IDetailsCartReq);


  const { data: detailsCartData } = useQueryDetailsCart(detailParams)


  const onSubmitFilter = () => {
    setDetailParams(prev => ({ ...prev, ...filterData }))
  }

  const rightNodeHeader = useMemo(() => {

    const basketsHeader = (
      <Fragment>
        {
          cartList?.map(item => (
            <BasketHeader
              key={item.id}
              id={item.id}
              name={item.name}
              date={item.sendDate}
              isSelected={+item.id === Number(selectedBasket)}
              clickBasket={(id) => setSelectedBasket(id)}
            />
          ))
        }
      </Fragment>
    )


    return (
      <Fragment>
        {basketsHeader}

        <button className="p-2 text-icon-default bg-button-tab-deactive rounded-lg hover:text-button-primary-hover transition-colors">
          <PlusIcon width={24} height={24} />
        </button>

        <button className="p-2 text-icon-default bg-button-tab-deactive rounded-lg hover:text-button-primary-hover transition-colors">
          <EditIcon width={24} height={24} />
        </button>
      </Fragment>
    )
  }, [cartList, selectedBasket])

  const leftNodeHeader = useMemo(() => {
    const actions = (
      <Fragment>
        <Button
          variant="primary-darkness-outline"
          className="text-nowrap"
          icon={<ClockIcon width={22} height={22} />}
        >
          تعیین زمان ارسال
        </Button>
        <Button
          variant="primary-darkness"
          className="py-[9px]"
        >
          ارسال سبد اول
        </Button>
      </Fragment>
    )

    return (
      <Fragment>
        {actions}

        <button
          className="p-2 disabled:opacity-50 text-icon-default bg-button-tab-deactive rounded-lg hover:text-button-primary-hover transition-colors border border-dashed box-border"
          disabled={true}
        >
          <ExcelImportIcon width={23} height={23} />
        </button>


        <button
          disabled={true}
          className="p-2 disabled:opacity-50 text-icon-default bg-button-tab-deactive rounded-lg hover:text-button-primary-hover transition-colors ">
          <ExcelExportIcon width={24} height={24} />
        </button>


      </Fragment>
    )
  }, [])

  const leftNodeFilter = useMemo(() => {

    const items = [
      { id: "", label: "همه" },
      { id: "‌Buy", label: "خرید" },
      { id: "Sell", label: "فروش" },
    ]
    return (
      <div className="flex flex-col gap-y-6">
        <CustomersSearch />

        <SymbolSearch
          searchSymbol={searchSymbol}
          setSearchSymbol={setSearchSymbol}
        />

        <SelectInput
          value={items.find(item => item.id === filterData.OrderSide) || null}
          items={items}
          onChange={value => setFilterData(prev => ({ ...prev, OrderSide: (value.id as TSide) }))}
          placeholder="سمت"
        />
      </div>
    )
  }, [])

  useEffect(() => {
    if (cartList) {
      setSelectedBasket(cartList[0].id)
    }
  }, [cartList])

  useEffect(() => {
    if (selectedBasket) {
      setDetailParams(prev => ({
        ...prev,
        CartId: selectedBasket
      }))
    }
  }, [selectedBasket])


  useUpdateEffect(() => {
    if (selectedCustomers) {
      setFilterData(prev => ({ ...prev, CustomerISINs: selectedCustomers.map(customer => customer.customerISIN) }))
    }
  }, [selectedCustomers])

  useUpdateEffect(() => {
    if (searchSymbol) {
      setFilterData(prev => ({ ...prev, SymbolISIN: searchSymbol.symbolISIN }))
    }
  }, [searchSymbol])

  useEffect(() => {
    console.log({ filterData })
  }, [filterData])






  return (
    <div className="rtl h-full">
      <LayoutReport
        leftNodeFilter={leftNodeFilter}
        mainContent={<MainContent data={detailsCartData?.result} />}
        leftNodeHeader={leftNodeHeader}
        rightNodeHeader={rightNodeHeader}
        onSubmitFilter={onSubmitFilter}
        title={'دسته سفارش'}
      />
    </div>
  )
}

export default Basket;