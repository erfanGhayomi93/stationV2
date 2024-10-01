import { useEffect, useMemo, useState } from 'react';
// import { Signal } from 'src/common/icons';
// import { pushEngine } from 'src/ls/pushEngine';
import { useTranslation } from 'react-i18next';
import { SignalIcon } from '@assets/icons';
import { pushEngine } from '@LS/pushEngine';

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
        if (redStatus.includes(pushEngineState)) return { colorClass: 'text-content-error-sell', text: t('serverConnection.DISCONNECTED') };
        else if (greenStatus.includes(pushEngineState)) return { colorClass: 'text-content-success-buy', text: t('serverConnection.CONNECTED') };
        else return { colorClass: 'text-content-warnning', text: t('serverConnection.CONNECTING') };
    }, [pushEngineState]);

    useEffect(() => {
        if (pushEngine.client) pushEngine.client.addListener({
            onStatusChange: (s: PushEngineStatusType) => {
                setPushEngineState(s)
            }
        });
    }, [pushEngine.client]);


    return (
        <div className={`flex ${signalData.colorClass}`}>
            <span className="mx-2 text-xs">
                {signalData.text}
            </span>

            <SignalIcon />
        </div>
    );
};

export default PushEngineInfo;
