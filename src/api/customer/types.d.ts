type TcustomerType = 'Legal' | 'Natural';

interface ICustomerAdvancedSearchRes {
     id: number;
     bourseCode: string;
     children: ICustomerAdvancedSearchRes[];
     creditValue: number;
     customerISIN: string;
     customerType: ICustomerMultiTypeType;
     nationalCode: string;
     purchasePower: number;
     title: string;
     isFavorite: boolean;
     parentId?: number;
}
