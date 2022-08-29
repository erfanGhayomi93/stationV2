import React, { useEffect, useMemo, useState } from 'react';
import { Signal } from 'src/components/Icons';
import { pushEngine } from 'src/api/pushEngine';
import { useTranslation } from 'react-i18next';

// https://sdk.lightstreamer.com/ls-web-client/8.0.5/api/StatusWidget.html#onStatusChange
type PushEngineStatusType =
    | 'CONNECTING'
    | 'CONNECTED:STREAM-SENSING'
    | 'CONNECTED:WS-STREAMING'
    | 'CONNECTED:HTTP-STREAMING'
    | 'CONNECTED:WS-POLLING'
    | 'CONNECTED:HTTP-POLLING'
    | 'STALLED'
    | 'DISCONNECTED:WILL-RETRY'
    | 'DISCONNECTED:TRYING-RECOVERY'
    | 'DISCONNECTED';

const PushEngineInfo = () => {
    //
    const [pushEngineState, setPushEngineState] = useState<PushEngineStatusType>('DISCONNECTED'); // move to app context if needed

    const { t } = useTranslation();

    const redStatus = useMemo(() => ['DISCONNECTED', 'DISCONNECTED:WILL-RETRY', 'DISCONNECTED:TRYING-RECOVERY'], []);
    const greenStatus = useMemo(() => ['CONNECTED:WS-STREAMING', 'CONNECTED:HTTP-STREAMING', 'CONNECTED:WS-POLLING', 'CONNECTED:HTTP-POLLING'], []);

    const signalData = useMemo(() => {
        if (redStatus.includes(pushEngineState)) return { colorClass: 'text-red-500', text: t('PushEngine.Disconnected') };
        else if (greenStatus.includes(pushEngineState)) return { colorClass: 'text-green-500', text: t('PushEngine.Connected') };
        else return { colorClass: 'text-yellow-500', text: t('PushEngine.Stalled') };
    }, [pushEngineState]);

    useEffect(() => {
        if (pushEngine.client) pushEngine.client.addListener({ onStatusChange: (s: PushEngineStatusType) => setPushEngineState(s) });
    }, []);

    return (
        <div className={`flex ${signalData.colorClass}`}>
            <span className="mx-2" style={{ fontSize: '12px' }}>
                {signalData.text}
            </span>
            <Signal />
        </div>
    );
};

export default PushEngineInfo;
