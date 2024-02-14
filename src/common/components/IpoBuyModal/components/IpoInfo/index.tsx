import clsx from 'clsx';
import dayjs from 'dayjs';
import React from 'react';
import { seprateNumber } from 'src/utils/helpers';

interface IProps {
    info: TIpoInfo;
}

const IpoInfo = ({ info }: IProps) => {
    //
    const formatDate = (value: string) => dayjs(value).calendar('jalali').format('YYYY/MM/DD');
    const formatHour = (value: string) => dayjs('0000/00/00T' + (value.includes(':') ? value : '00:00:00')).format('HH:mm');

    const formatedInfo = {
        date: !info.ipoFromDate ? '-' : dayjs().isSame(info.ipoFromDate, 'day') ? 'امروز' : formatDate(info.ipoFromDate),
        hour: !info?.ipoToTime || !info?.ipoFromTime ? '-' : formatHour(info?.ipoToTime) + ' - ' + formatHour(info?.ipoFromTime),
        price: !info?.fromPrice || !info?.toPrice ? '-' : `${seprateNumber(info?.fromPrice) || 0} - ${seprateNumber(info?.toPrice) || 0}`,
        maxCountInd: !info?.individualToQuantity ? '-' : seprateNumber(info?.individualToQuantity || 0),
        maxCountLeg: !info?.legalToQuantity ? '-' : seprateNumber(info?.legalToQuantity || 0),
        assignDate: !info?.assigneeDate ? '-' : formatDate(info.assigneeDate),
    };

    return (
        <div className="flex flex-col py-6 px-6">
            <h3 className="flex text-L-gray-600 mb-4">{'اطلاعات عرضه اولیه'}</h3>
            <div className="w-full rounded-lg shadow-[0_2px_11px_0_rgba(0,0,0,0.05)] p-4 flex flex-col gap-6 text-xs">
                <Container>
                    <InfoLabel title="تاریخ عرضه" />
                    <h3 className={clsx('py-1 rounded-md', formatedInfo.date === 'امروز' && 'text-L-error-200 bg-L-error-50 px-2')}>
                        {formatedInfo.date}
                    </h3>
                </Container>
                <Container>
                    <InfoLabel title="ساعت عرضه" />
                    <h3>{formatedInfo.hour}</h3>
                </Container>
                <Container>
                    <InfoLabel title="قیمت عرضه" />
                    <h3>{formatedInfo.price}</h3>
                </Container>
                <Container>
                    <InfoLabel title="حداکثر سهام قابل خرید (حقیقی)" />
                    <div className="flex gap-1">
                        <h3>{formatedInfo.maxCountInd}</h3>
                        <h3 className="text-L-gray-600 ">{'سهم'}</h3>
                    </div>
                </Container>
                <Container>
                    <InfoLabel title="حداکثر سهام قابل خرید (حقوقی)" />
                    <div className="flex gap-1">
                        <h3>{formatedInfo.maxCountLeg}</h3>
                        <h3 className="text-L-gray-600 ">{'سهم'}</h3>
                    </div>
                </Container>
                <Container>
                    <InfoLabel title="تاریخ تخصیص سهم" />
                    <h3>{formatedInfo.assignDate}</h3>
                </Container>
            </div>
        </div>
    );
};

const Container = ({ children }: { children: React.ReactNode }) => <div className="w-full flex justify-between items-center">{children}</div>;

const InfoLabel = ({ title }: { title: string }) => <h3 className="text-L-gray-600 text-xs">{title + ':'}</h3>;

export default IpoInfo;
