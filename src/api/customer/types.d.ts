type TcustomerType = 'Legal' | 'Natural';

interface ICustomerRemainAndOptionRemainDto {
     remain: number;
     purchasePower: number;
     stockDailyCredit: number;
}

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
     customerRemainAndOptionRemainDto: ICustomerRemainAndOptionRemainDto;
}

interface ICustomerInformationReq {
     customerISIN: number;
}

interface ICustomerInformationRes {
     blocked: number;
     bourseCode: string;
     branchName: string;
     brokerCredit: number;
     customerISIN: number;
     customerTag: string[];
     customerTitle: string;
     customerType: 'Natural' | 'Legal';
     fatherName: string;
     nationalCode: string;
     phoneNumber: string;
     registrationNo: boolean;
     remainT1: number;
     remainT2: number;
     stationCredit: number;
     stationName: string;
}
