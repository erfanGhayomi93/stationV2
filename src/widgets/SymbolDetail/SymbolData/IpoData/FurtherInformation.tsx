import dayjs from 'dayjs';
import { FC, useEffect, useState } from 'react';
import { seprateNumber } from 'src/utils/helpers';


type briefDataType = {
    title: string;
    value: string | number;
    id: keyof IResponsiveAdditionalInfo;
    type?: string;
    formatter?: (data?: IResponsiveAdditionalInfo) => string | JSX.Element
}

export const FurtherInformation: FC<{ data: IResponsiveAdditionalInfo | undefined }> = ({ data }) => {

    const handleFormateDate = (data?: string) => {
        if (!data) return "-"
        const todayDate = dayjs(new Date())
        const ipoDate = dayjs(data)
        if (todayDate.isSame(ipoDate, "date")) return <span className='py-1 px-2 bg-L-error-50 dark:bg-D-error-50 text-L-error-200 dark:text-D-error-200 rounded-md'>امروز</span>
        return ipoDate.calendar("jalali").format("YYYY/MM/DD")
    }

    const handleFormateTime = (data?: IResponsiveAdditionalInfo) => {
        try {
            if (!data) return "-"

            const ipoFrom = data.ipoFromTime.split(":");
            const hoursAndMinutesFrom = ipoFrom[0] + ":" + ipoFrom[1];

            const ipoTo = data.ipoToTime.split(":");
            const hoursAndMinutesTo = ipoTo[0] + ":" + ipoTo[1];

            return `${hoursAndMinutesFrom} - ${hoursAndMinutesTo}`
        }
        catch {
            return "-"
        }

    }

    const briefData: briefDataType[] = [
        {
            title: 'تاریخ عرضه:',
            value: "-",
            type: "date",
            id: "ipoFromDate",
            formatter: (data) => handleFormateDate(data?.ipoFromDate)
        },
        {
            title: 'ساعت عرضه:',
            value: "-",
            type: "time",
            id: "ipoFromTime",
            formatter: handleFormateTime
        },
        {
            title: 'قیمت عرضه:',
            value: "-",
            id: "fromPrice",
            formatter: (date) => `${seprateNumber(date?.fromPrice) || 0} - ${seprateNumber(date?.toPrice) || 0}`
        },
        {
            title: 'حداکثر سهام قابل خرید (حقیقی):',
            value: "-",
            id: "individualToQuantity",
            formatter: (data) => <span className='flex' dir='ltr'><span className='text-L-gray-500 dark:text-D-gray-500 mr-1'>سهم</span>{data?.individualToQuantity || 0}</span>
        },
        {
            title: 'حداکثر سهام قابل خرید (حقوقی):',
            value: "-",
            id: "legalToQuantity",
            formatter: (data) => <span className='flex' dir='ltr'><span className='text-L-gray-500 dark:text-D-gray-500 mr-1'>سهم</span>{data?.legalToQuantity || 0}</span>
        },
        {
            title: 'تاریخ تخصیص سهم:',
            value: "-",
            type: "date",
            id: "assigneeDate",
            formatter: (data) => handleFormateDate(data?.assigneeDate)
        },
    ]

    const [state, setState] = useState<briefDataType[]>(briefData)


    useEffect(() => {
        if (!data) return

        const final = state.map(item => {
            return { ...item, value: data[item.id] }
        })

        setState(final)
    }, [data])


    return (
        <div className='px-4 shadow-md'>
            {state.map((item, index) => {
                return (
                    <div key={index} className='flex items-center justify-between text-xs py-4'>
                        <p className='text-L-gray-600 dark:text-D-gray-600'>{item.title}</p>
                        <p className='text-L-gray-700 dark:text-D-gray-700' dir='ltr'>

                            {item.formatter ? item.formatter(data) : item.value}
                        </p>
                    </div>
                )
            })}
        </div>
    )
}
