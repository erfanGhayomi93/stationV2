import AdvancedDatepicker from '@components/Datepicker/AdvanceDatePicker';

const index = () => {
     return (
          <div>
               <AdvancedDatepicker open placement="bottom" value={new Date()} onChange={() => null} />
          </div>
     );
};

export default index;
