//
interface IGetGroupInformationRequestType {
    groupId: number | undefined;
}

interface IGroupInformationResultType {
    customer: ICustomerInformationResultType[];
}
