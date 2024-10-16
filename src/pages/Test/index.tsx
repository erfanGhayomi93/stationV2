import SearchInput from '@uiKit/Inputs/SearchInput';

const Test = () => {
     return (
          <div className="flex h-screen items-center justify-center">
               {/* <QuantityInput
                    onChangeValue={value => {
                         console.log(value);

                         console.log('ef');
                    }}
                    placeholder="تعداد"
               /> */}
               <SearchInput
                    values={['dfds', 'dfd', 'df']}
                    onChangeValue={value => {
                         console.log('hi');
                    }}
               />
          </div>
     );
};

export default Test;
