interface SUpervisorMessageResult {
    dateOfEvent: string;
    id: number;
    messageBody: string;
    messageTitle: string;
    read: boolean;
    symbolISINs: string[];
    type: 'Oppening' | 'Stop' | 'Limitation' | 'Information';
}
