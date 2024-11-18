type TcustomerType = 'Legal' | 'Natural';

interface IMyGroupsCustomerInformation {
     bourseCode: string;
     credit: number;
     customerISIN: string;
     customerRemainAndOptionRemainDto: ICustomerRemainAndOptionRemainDto;
     customerType: ICustomerMultiTypeType;
     nationalCode: string;
     purchasePower: number;
     title: string;
}

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
     customerISIN: string;
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

interface ICustomerFinancialReq {
     customerISIN: string;
}

interface ICustomerFinancialRes {
     bourseCode: string;
     credit: number;
     creditDebt: number;
     customerISIN: string;
     customerTitle: string;
     marginValue: number;
     nationalCode: string;
     orderBlockValue: number;
     paymentRequestBlockValue: number;
     saveDate: string;
     status: 'Normal' | 'AtRisk' | 'CallMargin';
     t1: number;
     t2: number;
}

interface ICustomerContractsReq {
     customerISIN: string;
}

interface ICustomerContractsRes {
     agreementId: number;
     approveBySMS: boolean;
     attachmentUrl: string;
     canChangeByCustomer: boolean;
     changeDate: string;
     description: string;
     state: 'Accepted' | 'NotSpecified' | 'expired';
     title: string;
     type: string;
}

interface IMyGroupsInformationRes {
     children: IMyGroupCustomerInformation[];
     customerISINs: string;
     groupName: string;
     id: number;
}

interface ICreateCustomerGroupReq {
     customerISINs?: string[];
     groupName: string;
}

interface IAddCustomersToGroupsReq {
     customerISINs: string[];
     groupId: number[];
}

interface IEditCustomerGroupNameReq {
     groupName: string;
     id: number;
}

interface IDeleteCustomerGroupReq {
     groupId: number;
}
