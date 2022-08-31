import { useMemo } from 'react';
import { Broker_173 } from 'src/common/icons';

const BrokerData = () => {
    //
    const brokers = useMemo(
        () => [
            {
                id: 173,
                title: 'کارگزاری تدبیرگر سرمایه',
                icon: Broker_173,
            },
        ],
        [],
    );

    const userBroker = useMemo(() => brokers.find((broker) => broker.id === 173), []);

    if (!userBroker) return <></>;

    const Icon = userBroker.icon;

    return (
        <div className="flex items-center pl-5">
            <span className="ml-2">
                <Icon />
            </span>
            <span className="font-semibold">{userBroker.title}</span>
        </div>
    );
};

export default BrokerData;
