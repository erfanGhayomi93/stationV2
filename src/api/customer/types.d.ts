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
     groupId: number;
}

interface ICustomerRemainAndOptionRemainDto {
     blockedValue: number;
     credit: number;
     creditOption: number;
     customerISIN: string;
     optionBlockValue: number;
     optionDailyCredit: number;
     optionRemainT0: number;
     optionRemainT1: number;
     optionRemainT2: number;
     optionRemainT3: number;
     paymentBlockValue: number;
     purchaseOptionPower: number;
     purchasePower: number;
     purchasePowerT1: number;
     purchasePowerT2: number;
     remain: number;
     remainT0: number;
     remainT1: number;
     remainT2: number;
     remainT3: number;
     settlementBlock: number;
     stockBlockValue: number;
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
     customerISIN: string;
     customerRemainAndOptionRemainDto: {
          marginValue: number;
          blockedValue: number;
          credit: number;
          creditOption: number;
          customerISIN: string;
          optionBlockValue: number;
          optionDailyCredit: number;
          optionRemainT0: number;
          optionRemainT1: number;
          optionRemainT2: number;
          optionRemainT3: number;
          paymentBlockValue: number;
          purchaseOptionPower: number;
          purchasePower: number;
          purchasePowerT1: number;
          purchasePowerT2: number;
          remain: number;
          remainT0: number;
          remainT1: number;
          remainT2: number;
          remainT3: number;
          settlementBlock: number;
          stockBlockValue: number;
          stockDailyCredit: number;
     };

     customerTitle: string;
     nationalCode: string;
     orderBlockValue: number;
     paymentRequestBlockValue: number;
     saveDate: string;
     status: 'Normal' | 'CallMargin' | 'AtRisk';
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
     children: IMyGroupsCustomerInformation[];
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

interface IDeleteCustomerFromGroupReq {
     customerISINs: string[];
     groupId: number;
}
