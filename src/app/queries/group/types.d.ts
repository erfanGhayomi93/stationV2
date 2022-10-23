//
interface IGetGroupInformationRequestType {
    groupId: string | undefined;
}

interface IGroupInformationResultType {
    customer: ICustomerInformationResultType[];
}
