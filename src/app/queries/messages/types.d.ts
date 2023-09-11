interface SUpervisorMessageResult {
    dateOfEvent: string;
    id: number;
    messageBody: string;
    messageTitle: string;
    read: boolean;
    symbolISINs: string[];
    type: 'Oppening' | 'Stop' | 'Limitation' | 'Information';
}


interface IMessageResult{
    id: number;
    title: string;
    body: string;
    saveDate: string;
    type: string;
    read: boolean;
    messageModel:string;
}

interface IMessageResponseType extends GlobalApiResponseType<IMessageResultp[]> {}