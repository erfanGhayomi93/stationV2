import { useState } from "react"
import LayoutReport from "./layout"


const Basket = () => {
  const [isOpenFilter, setIsOpenFilter] = useState(true)

  const onSubmitFilter = () => {

  }

  return (
    <div className="rtl h-full">
      <LayoutReport
        isOpenFilter={isOpenFilter}
        leftNodeFilter={'filetr'}
        mainContent={<div>main contetnt</div>}
        leftNodeHeader={<div>left herader</div>}
        rightNodeHeader={<div>right herader</div>}
        onSubmitFilter={onSubmitFilter}
      />
    </div>
  )
}

export default Basket