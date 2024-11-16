import { Fragment, useMemo } from "react"
import LayoutReport from "./layout"
import BasketHeader from "./components/basketHeader"
import { PlusIcon } from "@assets/icons"


const Basket = () => {

  const onSubmitFilter = () => {

  }

  const rightNodeHeader = useMemo(() => {

    const basketsHeader = (
      <Fragment>
        <BasketHeader
          name="سبد اول"
          date="1403/02/25T11:35"
          isSelected={true}
          clickBasket={() => null}
        />

        <BasketHeader
          name="سبد اول"
          date="1403/02/25  11:35"
          clickBasket={() => null}
        />
      </Fragment>
    )

    return (
      <Fragment>
        {basketsHeader}

        <button>
          <PlusIcon />
        </button>
      </Fragment>
    )
  }, [])

  return (
    <div className="rtl h-full">
      <LayoutReport
        leftNodeFilter={'filetr'}
        mainContent={<div>main contetnt</div>}
        leftNodeHeader={<div>left herader</div>}
        rightNodeHeader={rightNodeHeader}
        onSubmitFilter={onSubmitFilter}
        title={'دسته سفارش'}
      />
    </div>
  )
}

export default Basket