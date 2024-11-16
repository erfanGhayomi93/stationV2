import Button from "@uiKit/Button"
import clsx from "clsx"
import { FC, ReactNode } from "react"

interface ILayoutReportProps {
    isOpenFilter: boolean,
    rightNodeHeader: ReactNode | string,
    leftNodeHeader: ReactNode | string,
    mainContent: ReactNode,
    leftNodeFilter: ReactNode | string,
    onSubmitFilter: () => void
}

const LayoutReport: FC<ILayoutReportProps> = ({ isOpenFilter, rightNodeHeader, leftNodeHeader, mainContent, leftNodeFilter, onSubmitFilter }) => {
    return (
        <div className={clsx('w-full h-full', {
            'grid grid-cols-one-min gap-x-4': isOpenFilter
        })}>
            <div className="grid grid-rows-min-one gap-y-6 p-6 bg-back-surface rounded-lg">
                <div className="flex justify-between items-baseline">
                    <div>{rightNodeHeader}</div>
                    <div>{leftNodeHeader}</div>
                </div>
                <div>
                    {mainContent}
                </div>
            </div>

            {
                isOpenFilter && (
                    <div className="grid grid-rows-min-one-min p-4 bg-back-surface min-w-48 rounded-lg">
                        <div className="flex justify-between items-center">
                            <span>حذف فیلترها</span>
                            <span>ic on</span>
                        </div>
                        <div>
                            {leftNodeFilter}
                        </div>
                        <div className="pt-6 pb-2 border-t border-line-div-2">
                            <Button
                                variant="primary-darkness"
                                onClick={onSubmitFilter}
                            >
                                اعمال فیلتر
                            </Button>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default LayoutReport