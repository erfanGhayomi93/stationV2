import dayjs from "dayjs";
import i18next from "i18next";

export const initialState: IOrdersListStateType = {
    FromDate: dayjs().subtract(1, 'day').format(),
    ToDate: dayjs().format(),
    Side: 'Cross',
    SymbolISIN: [],
    CustomerISIN: [],
    PageNumber: 1,
    PageSize: 25,
    CustomerType: undefined,
    OrderStatus: undefined,
}

export const orderStatusFieldOptions = [
    { value: 'InOMSQueue', label: i18next.t("order_status.InOMSQueue") },
    { value: 'OnSending', label: i18next.t("order_status.OnSending") },
    { value: 'Error', label: i18next.t("order_status.Error") },
    { value: 'DeleteByEngine', label: i18next.t("order_status.DeleteByEngine") },
    { value: 'OnBoard', label: i18next.t("order_status.OnBoard") },
    { value: 'Canceled', label: i18next.t("order_status.Canceled") },
    { value: 'OnModifyFrom', label: i18next.t("order_status.OnModifyFrom") },
    { value: 'OnModifyTo', label: i18next.t("order_status.OnModifyTo") },
    { value: 'Modified', label: i18next.t("order_status.Modified") },
    { value: 'OnBoardModify', label: i18next.t("order_status.OnBoardModify") },
    { value: 'PartOfTheOrderDone', label: i18next.t("order_status.PartOfTheOrderDone") },
    { value: 'OrderDone', label: i18next.t("order_status.OrderDone") },
    { value: 'OnCanceling', label: i18next.t("order_status.OnCanceling") },
    { value: 'OnModifyError', label: i18next.t("order_status.OnModifyError") },
    { value: 'OnCancelError', label: i18next.t("order_status.OnCancelError") },
    { value: 'Expired', label: i18next.t("order_status.Expired") },
    { value: 'draft', label: i18next.t("order_status.draft") },
    { value: 'OnCancelingWithBroker', label: i18next.t("order_status.OnCancelingWithBroker") },
] 