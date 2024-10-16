import QuantityInput from '@uiKit/Inputs/QuantityInput';

const Test = () => {
     return (
          <div className="flex h-screen items-center justify-center">
               <QuantityInput
                    onChangeValue={value => {
                         console.log(value);

                         console.log('ef');
                    }}
               />
          </div>
     );
};

export default Test;
