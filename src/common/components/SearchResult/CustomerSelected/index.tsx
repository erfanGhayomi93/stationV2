import { FC, Fragment } from 'react';
import Combo from '../../ComboSelect';

interface ICustomerSelectedType {
    selected: IGoMultiCustomerType[];
}

const CustomerSelected: FC<ICustomerSelectedType> = ({ selected }) => {
    return (
        <>
            {selected?.map((item, inx) => (
                <Fragment key={inx}>
                    <Combo.DataSet
                        key={inx}
                        className="even:bg-L-gray-100 even:dark:bg-D-gray-100 border-b last:border-none bg-L-basic dark:bg-D-basic  py-2 flex items-center gap-2 hover:bg-sky-100 cursor-pointer px-2"
                        label={item.title}
                        value={item}
                    >
                        <div className="flex justify-between w-full">
                            {item.title}
                            <span>{item.bourseCode}</span>
                        </div>
                    </Combo.DataSet>
                </Fragment>
            ))}
        </>
    );
};

export default CustomerSelected;
