import { useQuery } from '@tanstack/react-query';

export const mutateOrder = (param: IGetGroupInformationRequestType) => {
    // return useQuery(['GetGroupInformation', param], ({ queryKey }) => GetGroupInformation(queryKey[1] as IGetGroupInformationRequestType), {
    //     enabled: !!param.groupId,
    // });
};
