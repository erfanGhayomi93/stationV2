import financialCalculationPath from '@assets/images/financial-calculation.png';
import { useTranslation } from 'react-i18next';

const EmptyCustomerInformation = () => {
     const { t } = useTranslation();

     return (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-20">
               <div>
                    <img
                         style={{ minWidth: '27rem' }}
                         className="w-full"
                         alt="financial-calculation"
                         src={financialCalculationPath}
                    />
               </div>
               <div className="min-w-full px-12">
                    <div className="min-h-[1px] min-w-full bg-line-div-2" />
               </div>
               <div className="flex flex-col items-center whitespace-nowrap text-sm font-medium text-content-paragraph">
                    <div className="flex flex-col items-center justify-center gap-1">
                         {t('customersManage.emptyCustomersSelectHelper')
                              .split('\n')
                              .map((text, index) => (
                                   <span key={index}>
                                        {text}
                                        <br />
                                   </span>
                              ))}
                    </div>
               </div>
          </div>
     );
};

export default EmptyCustomerInformation;
