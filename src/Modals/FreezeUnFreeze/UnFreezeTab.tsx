import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFreezeRequest, useListFreeze } from "src/app/queries/option";
import Checkbox from "src/common/components/Checkbox/Checkbox";
import CustomerMiniSelect from "src/common/components/CustomerMiniSelect";
import FilterBlock from "src/common/components/FilterBlock";
import Input from "src/common/components/Input";
import { onSuccessNotif } from "src/handlers/notification";
import { useAppSelector } from "src/redux/hooks";
import { getUserData } from "src/redux/slices/global";

type dataType = {
  symbol: string;
  Customer: IGoMultiCustomerType[];
};

type SelectedSymbolType = {
  customerISIN: string;
  symbolISIN: string;
};

export const UnFreezeTab: FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const { t } = useTranslation();

  const [data, setData] = useState<dataType>({
    symbol: '',
    Customer: []
  });

  const { userName } = useAppSelector(getUserData);

  const { data: FreezeList } = useListFreeze({
    customerISIN: data.Customer.length ? data.Customer.map(item => item.customerISIN) : undefined
  });

  const { mutate } = useFreezeRequest({
    onSuccess() {
      onSuccessNotif({ title: "با موفقیت انجام شد" })
      closeModal()
    },
  });

  const [selectedSymbol, setSelectedSymbol] = useState<SelectedSymbolType[]>([]);

  const handleChangeCheckbox = (checked: boolean, symbolISIN: string, customerISIN: string) => {
    if (checked) {
      setSelectedSymbol(prev => [...prev, { customerISIN, symbolISIN }]);
    } else {
      setSelectedSymbol(prev => prev.filter(item => item.symbolISIN !== symbolISIN || item.customerISIN !== customerISIN));
    }
  };

  const handleSubmit = () => {
    const payload = {
      symbolISIN: selectedSymbol.map(item => item.symbolISIN),
      type: "UnFreeze",
      userName: userName,
      customerISIN: selectedSymbol[0]?.customerISIN,
    };

    mutate(payload);
  };

  return (
    <div className='p-2 h-full grid grid-rows-min-one-min'>
      <div className='flex flex-col gap-4'>

        <FilterBlock label={t('FilterFieldLabel.Customer')} className="col-span-3 text-right" viewCol>
          <CustomerMiniSelect
            selected={data.Customer}
            setSelected={(value) => setData(prev => ({ ...prev, Customer: value }))}
            filterCustomerType={false}
          />
        </FilterBlock>
        
        <FilterBlock label={t('FilterFieldLabel.Symbol')} className="col-span-3 text-right" viewCol>
          <Input
            value={data.symbol}
            onChange={(e) => setData(prev => ({ ...prev, symbol: e?.target?.value }))}
            placeholder="جستجوی نماد"
            inputClassName="placeholder:text-xs"
          />
        </FilterBlock>
      </div>

      <div className="mt-3 overflow-y-auto grid grid-rows-min-one">
        <div className="flex h-8 bg-L-gray-200 dark:bg-D-gray-200 rounded-t-lg font-semibold text-sm gap-y-1">
          <div className="flex items-center justify-start border-l border-L-basic dark:border-D-basic pr-3 w-1/2">
            نماد
          </div>
          <div className="flex items-center justify-center text-L-gray-500 dark:text-D-gray-700 pr-3">
            مشتری
          </div>
        </div>

        <div className="flex flex-col h-48 overflow-y-auto">
          {FreezeList
            ?.filter(item => {
              if (!data.symbol) return item;
              return item.symbolTitle.includes(data.symbol);
            })
            ?.map((item, ind) => (
              <div className="flex even:bg-L-gray-200 even:dark:bg-D-gray-200 hover:bg-L-gray-300 hover:dark:bg-D-gray-300 py-2 text-xs" key={ind}>
                <div className="w-1/2 mr-2">
                  <Checkbox
                    checked={!!item?.symbolISIN && selectedSymbol.some(s => s.symbolISIN === item.symbolISIN && s.customerISIN === item.customerISIN)}
                    onChange={(checked) => handleChangeCheckbox(checked, item.symbolISIN, item.customerISIN)}
                    label={item.symbolTitle}
                    classes={{ text: '!text-L-gray-500 !dark:text-D-gray-700' }}
                  />
                </div>
                <div className="mr-2">
                  {item.customerTitle}
                </div>
              </div>
            ))}
        </div>
      </div>

      <button
        className='px-4 py-2 bg-L-success-200 dark:bg-D-success-200 text-L-basic dark:text-D-basic rounded disabled:opacity-50'
        onClick={handleSubmit}
        disabled={selectedSymbol.length === 0}
      >
        درخواست رفع فریز
      </button>
    </div>
  );
};
