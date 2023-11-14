import { useTranslation } from 'react-i18next';
// import { Logo173Icon, Logo189Icon } from 'src/common/icons';

function Logo() {
  const { t } = useTranslation();

  // const SelectLogo = (brokerCode: string) => {
  //   if (Number(brokerCode) === 189) {
  //     return <Logo189Icon />;
  //   } else if (Number(brokerCode) === 173) {
  //     return <Logo173Icon />;
  //   } else {
  //     return 1;
  //   }
  // };

  return (
    <div className="md:flex justify-center items-center hidden">
      <img className="h-[45px] aspect-square" src={'/assets/images/logo_' + window.REACT_APP_BROKER_CODE + ".svg"} />

      <span className="mr-1 text-L-gray-700 dark:text-D-gray-700 text-sm font-medium">
        {t(`BrokerCode_${window.REACT_APP_BROKER_CODE}.Title`)}
      </span>
    </div>
  );
}

export default Logo;
