import { ICellRendererParams } from 'ag-grid-community';

export type TButtonTypes = 'Info' | 'Send' | 'Edit' | 'Copy' | 'Delete';

export type TButtons = {
    buttonType: TButtonTypes;
    disabled?: boolean;
    onClick: () => void;
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    title: string;
    styles: React.CSSProperties;
    classes: string;
}[];

export interface IProps extends Partial<ICellRendererParams> {
    requiredButtons: TButtonTypes[];
    disableInfo?: boolean;
    disableSend?: boolean;
    disableEdit?: boolean;
    disableCopy?: boolean;
    disableDelete?: boolean;
    hideInfo?: boolean;
    hideSend?: boolean;
    hideEdit?: boolean;
    hideCopy?: boolean;
    hideDelete?: React.CSSProperties;
    infoStyle?: React.CSSProperties;
    sendStyle?: React.CSSProperties;
    editStyle?: React.CSSProperties;
    copyStyle?: React.CSSProperties;
    deleteStyle?: React.CSSProperties;
    infoClass?: string;
    sendClass?: string;
    editClass?: string;
    copyClass?: string;
    deleteClass?: string;
    onInfoClick?: (data: ICellRendererParams['data']) => void;
    onSendClick?: (data: ICellRendererParams['data']) => void;
    onEditClick?: (data: ICellRendererParams['data']) => void;
    onCopyClick?: (data: ICellRendererParams['data']) => void;
    onDeleteClick?: (data: ICellRendererParams['data']) => void;
    deleteModalTitle?: string;
    deleteModalDescription?: string;
}
