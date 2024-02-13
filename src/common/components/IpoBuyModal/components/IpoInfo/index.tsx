import React from 'react';
import { seprateNumber } from 'src/utils/helpers';


const IpoInfo = () => {
    return (
        <div className="flex flex-col py-6 px-6">
            <h3 className="flex text-L-gray-600 mb-4">{'اطلاعات عرضه اولیه'}</h3>
            <div className="w-full rounded-lg shadow-[0_2px_11px_0_rgba(0,0,0,0.05)] p-4 flex flex-col gap-6 text-xs">
                <Container>
                    <InfoLabel title="تاریخ عرضه" />
                    <h3 className="text-L-error-200 bg-L-error-50 px-2 py-1 rounded-md ">{'امروز'}</h3>
                </Container>
                <Container>
                    <InfoLabel title="ساعت عرضه" />
                    <h3>{'12:35 - 11:35'}</h3>
                </Container>
                <Container>
                    <InfoLabel title="قیمت عرضه" />
                    <h3>{'قیمت کشف شده در مرحله اول'}</h3>
                </Container>
                <Container>
                    <InfoLabel title="حداکثر سهام قابل خرید (حقیقی)" />
                    <div className="flex gap-1">
                        <h3>{seprateNumber(225)}</h3>
                        <h3 className="text-L-gray-600 ">{'سهم'}</h3>
                    </div>
                </Container>
                <Container>
                    <InfoLabel title="حداکثر سهام قابل خرید (حقوقی)" />
                    <div className="flex gap-1">
                        <h3>{seprateNumber(225)}</h3>
                        <h3 className="text-L-gray-600 ">{'سهم'}</h3>
                    </div>
                </Container>
                <Container>
                    <InfoLabel title="تاریخ تخصیص سهم" />
                    <h3>{'1402/02/25'}</h3>
                </Container>
            </div>
        </div>
    );
};

const Container = ({ children }: { children: React.ReactNode }) => <div className="w-full flex justify-between items-center">{children}</div>;

const InfoLabel = ({ title }: { title: string }) => <h3 className="text-L-gray-600 text-xs">{title + ':'}</h3>;

export default IpoInfo;
