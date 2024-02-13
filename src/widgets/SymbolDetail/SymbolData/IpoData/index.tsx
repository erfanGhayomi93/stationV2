import { FC, useMemo, useState } from 'react'
import SymbolHeader from '../SymbolHeader'
import { IpoAction } from './IpoAction'
import SymbolTabsContext from '../context'
import TabsList, { ITabItemType } from 'src/common/components/TabsList'
import SameGroup from '../tabs/SameGroup'
import Messages from '../tabs/Messages'
import { useTranslation } from 'react-i18next'
import { FurtherInformation } from './FurtherInformation'
import { useAdditionalInfo } from 'src/app/queries/symbol'

export const IpoData: FC<{ selectedSymbol: string }> = ({ selectedSymbol }) => {
    const [activeTab, setActiveTab] = useState('FurtherInformation');
    const { t } = useTranslation();

    const { data : FurtherInformationData } = useAdditionalInfo(selectedSymbol)


    const items = useMemo<ITabItemType[]>(
        () => [
            {
                key: 'FurtherInformation',
                title: t('SymbolDetails.additionalData'),
                content: <FurtherInformation data={FurtherInformationData} />,
                tabClass: 'pt-4 outline-none',
                selectedButtonClass: 'border-b-2 font-semibold border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50',
            },
            {
                key: 'Messages',
                title: t('SymbolDetails.messages'),
                content: <Messages />,
                tabClass: 'pt-4 outline-none',
                selectedButtonClass: 'border-b-2 font-semibold border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50',
            },
            {
                key: 'SameGroup',
                title: t('SymbolDetails.sameGroup'),
                content: <SameGroup />,
                tabClass: 'pt-4 outline-none',
                selectedButtonClass: 'border-b-2 font-semibold border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50',
            },
        ],
        [FurtherInformationData],
    );



    return (
        <div className="rounded-md overflow-hidden h-full w-full flex flex-col gap-4 border border-L-gray-400 bg-L-basic dark:border-D-gray-400 dark:bg-D-basic p-3">
            <div className="text-1.2 flex flex-col gap-2">
                <SymbolHeader />
            </div>

            <div className='w-full'>
                <IpoAction />
            </div>

            <div className="flex flex-col h-full overflow-hidden">
                <SymbolTabsContext>
                    <TabsList
                        fill={true}
                        onChange={(idx) => setActiveTab(idx)}
                        selectedIndex={activeTab}
                        items={items}
                        buttonClass="text-L-gray-500 dark:text-D-gray-500 border-bottom-"
                        className="w-full grid text-1.2 grid-rows-min-one overflow-y-auto h-full bg-L-basic dark:bg-D-basic"
                        pannelClassName="overflow-y-auto h-full  bg-L-basic dark:bg-D-basic"
                        tabListClassName="bg-L-basic dark:bg-D-basic overflow-x-auto relative z-[0] text-xs"
                    />
                </SymbolTabsContext>
            </div>
        </div>
    )
}
